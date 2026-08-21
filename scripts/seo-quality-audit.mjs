#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const buildRoot = path.resolve(".next/server/app");
const sitemapFile = path.join(buildRoot, "sitemap.xml.body");
const titleLimit = 60;
const descriptionLimit = 160;

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return findHtmlFiles(absolutePath);
      return entry.isFile() && entry.name.endsWith(".html") ? [absolutePath] : [];
    })
  );
  return files.flat();
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function firstMatch(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1].trim());
  }
  return "";
}

function routeFromFile(file) {
  const relative = path.relative(buildRoot, file).replaceAll(path.sep, "/");
  const withoutExtension = relative.slice(0, -".html".length);
  if (withoutExtension === "index") return "/";
  return `/${withoutExtension.replace(/\/index$/, "")}`;
}

function addDuplicateFailures(pages, field, label, failures) {
  const grouped = new Map();
  for (const page of pages) {
    if (!page[field]) continue;
    const routes = grouped.get(page[field]) ?? [];
    routes.push(page.route);
    grouped.set(page[field], routes);
  }
  for (const [value, routes] of grouped) {
    if (routes.length > 1) {
      failures.push(`${label} is duplicated on ${routes.join(", ")}: ${value}`);
    }
  }
}

let htmlFiles;
let sitemapPaths;
let sitemapUrls;
try {
  htmlFiles = await findHtmlFiles(buildRoot);
  const sitemap = await readFile(sitemapFile, "utf8");
  sitemapUrls = new Map(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
      const url = new URL(match[1]);
      return [url.pathname, url.href];
    })
  );
  sitemapPaths = new Set(sitemapUrls.keys());
} catch {
  console.error(
    "SEO audit requires a completed Next.js build with a generated sitemap. Run `npm run build` first."
  );
  process.exit(1);
}

const pages = [];
for (const file of htmlFiles) {
  const route = routeFromFile(file);
  if (!sitemapPaths.has(route)) continue;

  const html = await readFile(file, "utf8");
  pages.push({
    route,
    title: firstMatch(html, [/<title[^>]*>([\s\S]*?)<\/title>/i]),
    description: firstMatch(html, [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
    ]),
    h1: firstMatch(html, [/<h1[^>]*>([\s\S]*?)<\/h1>/i]).replace(
      /<[^>]+>/g,
      ""
    ),
    canonical: firstMatch(html, [
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i,
      /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i,
    ]),
    jsonLdCount: (html.match(/application\/ld\+json/g) ?? []).length,
  });
}

const failures = [];
for (const page of pages) {
  if (!page.title) failures.push(`${page.route}: missing title`);
  if (!page.description) failures.push(`${page.route}: missing meta description`);
  if (!page.h1) failures.push(`${page.route}: missing H1`);
  if (!page.canonical) failures.push(`${page.route}: missing canonical URL`);
  if (
    page.canonical &&
    page.canonical.replace(/\/$/, "") !==
      sitemapUrls.get(page.route)?.replace(/\/$/, "")
  ) {
    failures.push(
      `${page.route}: canonical URL does not match its sitemap URL (${page.canonical})`
    );
  }
  if (!page.jsonLdCount) failures.push(`${page.route}: missing JSON-LD`);
  if (page.title.length > titleLimit) {
    failures.push(
      `${page.route}: title is ${page.title.length} characters (limit ${titleLimit})`
    );
  }
  if (page.description.length > descriptionLimit) {
    failures.push(
      `${page.route}: description is ${page.description.length} characters (limit ${descriptionLimit})`
    );
  }
}

addDuplicateFailures(pages, "title", "Title", failures);
addDuplicateFailures(pages, "description", "Meta description", failures);

if (failures.length) {
  console.error(`SEO quality audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO quality audit passed for ${pages.length} canonical rendered sitemap pages: required metadata, H1, canonical URLs, JSON-LD, length limits, and uniqueness. ${sitemapPaths.size - pages.length} dynamic sitemap page(s) require runtime crawl verification.`
);

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
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(
    (match) => match[0]
  );
  pages.push({
    route,
    html,
    title: firstMatch(html, [/<title[^>]*>([\s\S]*?)<\/title>/i]),
    description: firstMatch(html, [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
    ]),
    h1: firstMatch(html, [/<h1[^>]*>([\s\S]*?)<\/h1>/i]).replace(
      /<[^>]+>/g,
      ""
    ),
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    canonical: firstMatch(html, [
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)/i,
      /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i,
    ]),
    jsonLdCount: (html.match(/application\/ld\+json/g) ?? []).length,
    imageCount: imageTags.length,
    imagesMissingAltCount: imageTags.filter((tag) => !/\balt=["'][^"']*["']/i.test(tag))
      .length,
  });
}

const failures = [];
for (const page of pages) {
  if (!page.title) failures.push(`${page.route}: missing title`);
  if (!page.description) failures.push(`${page.route}: missing meta description`);
  if (!page.h1) failures.push(`${page.route}: missing H1`);
  if (page.h1Count !== 1) {
    failures.push(`${page.route}: expected exactly one H1, found ${page.h1Count}`);
  }
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
  if (page.imagesMissingAltCount) {
    failures.push(
      `${page.route}: ${page.imagesMissingAltCount} rendered image(s) are missing alt attributes`
    );
  }
  if (!page.html.includes("<!--email_off-->")) {
    failures.push(`${page.route}: missing Cloudflare email-obfuscation exemption`);
  }
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

const semanticPageContracts = new Map([
  [
    "/contact",
    [
      ">Send a message</h2>",
      ">Contact our sales team directly</h2>",
      ">Ready to start a project?</h2>",
    ],
  ],
]);

for (const [route, markers] of semanticPageContracts) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered semantic contract page`);
    continue;
  }
  for (const marker of markers) {
    if (!page.html.includes(marker)) {
      failures.push(`${route}: missing semantic heading marker ${marker}`);
    }
  }
}

const nativeFormContracts = new Map([
  ["/contact", "/api/contact"],
]);

for (const [route, action] of nativeFormContracts) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered native-form contract page`);
    continue;
  }
  if (!page.html.includes(`action="${action}"`)) {
    failures.push(`${route}: missing native form action ${action}`);
  }
  if (!page.html.includes('method="post"')) {
    failures.push(`${route}: missing native POST form method`);
  }
}

const sourceContracts = [
  {
    file: "src/components/quote-form.tsx",
    label: "/get-a-quote native form",
    markers: [
      'action="/api/quote"',
      'method="post"',
      'type="number"',
      "min={PLANNING_MOQ_UNITS}",
      "250 units or more",
    ],
  },
  {
    file: "src/app/api/quote/route.ts",
    label: "/api/quote quantity qualification",
    markers: ["validatePlanningQuantity", "quantityValidation.label"],
  },
];

for (const contract of sourceContracts) {
  const source = await readFile(path.resolve(contract.file), "utf8");
  for (const marker of contract.markers) {
    if (!source.includes(marker)) {
      failures.push(`${contract.label}: missing source marker ${marker}`);
    }
  }
}

const contextualInboundContracts = [
  "/cosmetics/serum-boxes",
  "/cosmetics/lotion-boxes",
  "/cosmetics/lipstick-boxes",
  "/blog/what-is-moq-custom-packaging",
  "/blog/corrugated-vs-rigid-boxes",
];

for (const route of contextualInboundContracts) {
  const inboundPageCount = pages.filter(
    (candidate) =>
      candidate.route !== route && candidate.html.includes(`href="${route}"`)
  ).length;
  if (inboundPageCount < 2) {
    failures.push(
      `${route}: only ${inboundPageCount} inbound sitemap page(s); expected at least 2`
    );
  }
}

const blogRoutes = [...sitemapPaths].filter((route) =>
  /^\/blog\/[^/]+$/.test(route)
);
const blogHub = pages.find((page) => page.route === "/blog");

if (blogRoutes.length < 10) {
  failures.push(
    `Buyer-guide cluster has ${blogRoutes.length} route(s); expected at least 10`
  );
}

if (!blogHub) {
  failures.push("/blog: missing rendered buyer-guide hub");
} else {
  for (const schemaType of ["CollectionPage", "ItemList", "BreadcrumbList"]) {
    if (!blogHub.html.includes(`\"@type\":\"${schemaType}\"`)) {
      failures.push(`/blog: missing ${schemaType} JSON-LD`);
    }
  }
  if (blogHub.imageCount < blogRoutes.length) {
    failures.push(
      `/blog: only ${blogHub.imageCount} rendered image(s); expected at least one visual per buyer guide`
    );
  }
  for (const route of blogRoutes) {
    if (!blogHub.html.includes(`href=\"${route}\"`)) {
      failures.push(`/blog: missing internal link to ${route}`);
    }
  }
}

for (const route of blogRoutes) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered blog page`);
    continue;
  }
  for (const schemaType of ["BlogPosting", "FAQPage", "BreadcrumbList"]) {
    if (!page.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`${route}: missing ${schemaType} JSON-LD`);
    }
  }
  if (!page.html.includes("Prepared by Universal Packaging Group")) {
    failures.push(`${route}: missing visible editorial responsibility`);
  }
  if (!page.html.includes(">Related packaging guides</h2>")) {
    failures.push(`${route}: missing related-guide section`);
  }
  if (!page.html.includes("Direct answer")) {
    failures.push(`${route}: missing visible direct-answer block`);
  }
  if (!page.html.includes("Representative packaging concept or capability reference")) {
    failures.push(`${route}: missing visible concept-image disclosure`);
  }
  if (page.imageCount < 4) {
    failures.push(
      `${route}: only ${page.imageCount} rendered image(s); expected visual hero plus related guides`
    );
  }
}

const colorGuide = pages.find(
  (page) => page.route === "/blog/cmyk-vs-pantone-packaging-printing"
);
if (!colorGuide) {
  failures.push("CMYK vs Pantone buyer guide is missing");
} else {
  for (const source of ["pantone.com", "helpx.adobe.com"]) {
    if (!colorGuide.html.includes(source)) {
      failures.push(`/blog/cmyk-vs-pantone-packaging-printing: missing primary source ${source}`);
    }
  }
}

const comparisonRoutes = [...sitemapPaths].filter((route) =>
  /^\/compare\/[^/]+$/.test(route)
);
const comparisonHub = pages.find((page) => page.route === "/compare");

if (comparisonRoutes.length < 8) {
  failures.push(
    `Comparison cluster has ${comparisonRoutes.length} guide route(s); expected at least 8`
  );
}

if (!comparisonHub) {
  failures.push("/compare: missing rendered comparison hub");
} else {
  for (const route of comparisonRoutes) {
    if (!comparisonHub.html.includes(`href="${route}"`)) {
      failures.push(`/compare: missing internal link to ${route}`);
    }
  }
}

for (const route of comparisonRoutes) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered comparison page`);
    continue;
  }
  if (!page.html.includes('id="comparison-table"')) {
    failures.push(`${route}: missing side-by-side comparison table anchor`);
  }
  if (!page.html.includes('"@type":"ItemList"')) {
    failures.push(`${route}: missing ItemList JSON-LD`);
  }
  if (!page.html.includes('"@type":"FAQPage"')) {
    failures.push(`${route}: missing FAQPage JSON-LD`);
  }
  if (!page.html.includes('href="/get-a-quote?')) {
    failures.push(`${route}: missing prefilled quote path`);
  }

  const inboundLinkCount = pages.reduce(
    (count, candidate) =>
      count + (candidate.html.match(new RegExp(`href="${route}"`, "g")) ?? []).length,
    0
  );
  if (inboundLinkCount < 2) {
    failures.push(
      `${route}: only ${inboundLinkCount} rendered internal link(s); expected at least 2`
    );
  }
}

const coreProductContracts = new Map([
  ["/products/custom-tuck-boxes", ["/packaging-styles/", "/compare/", "/industries/"]],
  ["/products/custom-mailer-boxes", ["/applications/", "/compare/"]],
  ["/products/custom-magnetic-boxes", ["/compare/", "/industries/"]],
  ["/products/custom-collapsible-magnetic-boxes", ["/compare/", "/industries/"]],
  ["/products/custom-mylar-bags", ["/packaging-styles/", "/compare/", "/industries/"]],
]);
const productsHub = pages.find((page) => page.route === "/products");

if (!productsHub) {
  failures.push("/products: missing rendered product hub");
} else {
  if (!productsHub.html.includes('id="core-product-catalog"')) {
    failures.push("/products: missing core product catalog anchor");
  }
  if (!productsHub.html.includes("/products#core-product-catalog")) {
    failures.push("/products: missing core product ItemList JSON-LD");
  }
  for (const route of coreProductContracts.keys()) {
    if (!productsHub.html.includes(`href="${route}"`)) {
      failures.push(`/products: missing core product link to ${route}`);
    }
  }
}

for (const [route, requiredPrefixes] of coreProductContracts) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered core product page`);
    continue;
  }
  for (const schemaType of ["Service", "BreadcrumbList", "FAQPage"]) {
    if (!page.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`${route}: missing ${schemaType} JSON-LD`);
    }
  }
  for (const prefix of requiredPrefixes) {
    if (!page.html.includes(`href="${prefix}`)) {
      failures.push(`${route}: missing contextual link to ${prefix}`);
    }
  }
  if (!page.title.includes("250-Unit MOQ")) {
    failures.push(`${route}: title is missing the 250-Unit MOQ click signal`);
  }
}

const moqContractRoutes = [
  ...coreProductContracts.keys(),
  "/faq",
  "/custom-packaging-pricing",
];

for (const route of moqContractRoutes) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered MOQ contract page`);
    continue;
  }
  if (!page.html.includes("250 units")) {
    failures.push(`${route}: missing 250-unit planning MOQ`);
  }
  for (const staleMoq of ["1,000 units", "500 units", "size-based MOQ"]) {
    if (page.html.includes(staleMoq)) {
      failures.push(`${route}: contains stale MOQ copy (${staleMoq})`);
    }
  }
}

const commercialTermsPage = pages.find(
  (page) => page.route === "/custom-packaging-pricing"
);

if (!commercialTermsPage) {
  failures.push(
    "/custom-packaging-pricing: missing rendered commercial terms page"
  );
} else {
  for (const schemaType of ["WebPage", "ItemList", "FAQPage", "BreadcrumbList"]) {
    if (!commercialTermsPage.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(
        `/custom-packaging-pricing: missing ${schemaType} JSON-LD`
      );
    }
  }
  for (const marker of [
    "250 units",
    "Structure and dimensions",
    "Delivery destination",
    "final written quote",
  ]) {
    if (!commercialTermsPage.html.includes(marker)) {
      failures.push(
        `/custom-packaging-pricing: missing commercial marker "${marker}"`
      );
    }
  }
  if (!commercialTermsPage.html.includes('type="text/markdown"')) {
    failures.push(
      "/custom-packaging-pricing: missing Markdown alternate discovery link"
    );
  }
  for (const route of coreProductContracts.keys()) {
    if (!commercialTermsPage.html.includes(`href="${route}"`)) {
      failures.push(
        `/custom-packaging-pricing: missing product source link to ${route}`
      );
    }
  }
}

for (const route of coreProductContracts.keys()) {
  const page = pages.find((candidate) => candidate.route === route);
  if (page && !page.html.includes('href="/custom-packaging-pricing"')) {
    failures.push(`${route}: missing pricing and MOQ guide link`);
  }
}

const packagingStyleRoutes = [...sitemapPaths].filter((route) =>
  /^\/packaging-styles\/[^/]+$/.test(route)
);

if (packagingStyleRoutes.length < 12) {
  failures.push(
    `Packaging style library has ${packagingStyleRoutes.length} route(s); expected at least 12`
  );
}

for (const route of packagingStyleRoutes) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered packaging style page`);
    continue;
  }
  if (!page.html.includes('id="industry-applications"')) {
    failures.push(`${route}: missing reciprocal industry-application section`);
  }
  if (!page.html.includes(`${route}#industry-applications`)) {
    failures.push(`${route}: missing industry-application ItemList JSON-LD`);
  }
  if (!page.html.includes('href="/industries"')) {
    failures.push(`${route}: missing industries directory link`);
  }

  const industryInboundCount = pages.filter(
    (candidate) =>
      /^\/industries\/[^/]+$/.test(candidate.route) &&
      candidate.html.includes(`href="${route}"`)
  ).length;
  if (industryInboundCount < 1) {
    failures.push(
      `${route}: no industry page links back to this source-of-truth style`
    );
  }
}

const industryHubRoutes = [...sitemapPaths].filter((route) =>
  /^\/industries\/(?:food-beverage|beauty-personal-care|supplement|fashion-jewelry-luxury|electronics-consumer-goods|home-candle-gift)-packaging$/.test(
    route
  )
);
const industriesHub = pages.find((page) => page.route === "/industries");

if (industryHubRoutes.length < 6) {
  failures.push(
    `Commercial industry cluster has ${industryHubRoutes.length} hub route(s); expected at least 6`
  );
}

if (!industriesHub) {
  failures.push("/industries: missing rendered industry hub");
} else {
  for (const schemaType of ["CollectionPage", "ItemList", "BreadcrumbList"]) {
    if (!industriesHub.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`/industries: missing ${schemaType} JSON-LD`);
    }
  }
  if (!industriesHub.html.includes("primaryImageOfPage")) {
    failures.push("/industries: missing primary image schema");
  }
  if (industriesHub.imageCount < 12) {
    failures.push(
      `/industries: only ${industriesHub.imageCount} rendered image(s); expected at least 12 for the visual industry directory`
    );
  }
  for (const route of industryHubRoutes) {
    if (!industriesHub.html.includes(`href="${route}"`)) {
      failures.push(`/industries: missing internal link to ${route}`);
    }
  }
}

for (const route of industryHubRoutes) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered commercial industry hub`);
    continue;
  }
  for (const schemaType of [
    "CollectionPage",
    "ItemList",
    "BreadcrumbList",
    "FAQPage",
  ]) {
    if (!page.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`${route}: missing ${schemaType} JSON-LD`);
    }
  }
  if (!page.html.includes('href="/get-a-quote?')) {
    failures.push(`${route}: missing prefilled quote path`);
  }
  if (!page.html.includes('href="/industries"')) {
    failures.push(`${route}: missing parent industry-hub link`);
  }
  if (!page.html.includes("primaryImageOfPage")) {
    failures.push(`${route}: missing primary image schema`);
  }
  if (page.imageCount < 6) {
    failures.push(
      `${route}: only ${page.imageCount} rendered image(s); expected at least 6 for a visual-first industry hub`
    );
  }
}

const homepage = pages.find((page) => page.route === "/");

if (!homepage) {
  failures.push("/: missing rendered homepage");
} else {
  if (!homepage.html.includes('id="buyer-proof"')) {
    failures.push("/: missing visible buyer-proof section");
  }
  if (!homepage.html.includes('href="/custom-packaging-pricing"')) {
    failures.push("/: missing contextual pricing and MOQ link");
  }
  if (!homepage.html.includes('id="industry-paths"')) {
    failures.push("/: missing visible industry-path section");
  }
  for (const schemaType of ["WebPage", "ItemList"]) {
    if (!homepage.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`/: missing ${schemaType} JSON-LD`);
    }
  }
  for (const route of industryHubRoutes) {
    if (!homepage.html.includes(`href="${route}"`)) {
      failures.push(`/: missing contextual industry-hub link to ${route}`);
    }
  }
}

const industryGuideRoutes = [...sitemapPaths].filter(
  (route) =>
    /^\/industries\/[^/]+$/.test(route) && !industryHubRoutes.includes(route)
);

if (industryGuideRoutes.length < 15) {
  failures.push(
    `Industry application cluster has ${industryGuideRoutes.length} guide route(s); expected at least 15`
  );
}

for (const route of industryGuideRoutes) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered industry application guide`);
    continue;
  }
  for (const schemaType of [
    "WebPage",
    "Service",
    "ItemList",
    "BreadcrumbList",
    "FAQPage",
  ]) {
    if (!page.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`${route}: missing ${schemaType} JSON-LD`);
    }
  }
  for (const marker of [
    'id="approved-formats"',
    'href="/get-a-quote?',
    'href="/products/',
    "primaryImageOfPage",
    "Reviewed ",
  ]) {
    if (!page.html.includes(marker)) {
      failures.push(`${route}: missing industry-guide marker ${marker}`);
    }
  }
  if (page.imageCount < 4) {
    failures.push(
      `${route}: only ${page.imageCount} rendered image(s); expected at least 4 for a visual-first application guide`
    );
  }
  const inboundPageCount = pages.filter(
    (candidate) =>
      candidate.route !== route && candidate.html.includes(`href="${route}"`)
  ).length;
  if (inboundPageCount < 2) {
    failures.push(
      `${route}: only ${inboundPageCount} inbound sitemap page(s); expected parent-hub and directory links`
    );
  }
}

const planningToolContracts = new Map([
  [
    "/tools/packaging-format-finder",
    {
      schemaTypes: ["WebApplication", "FAQPage", "BreadcrumbList"],
      scopeMarkers: ["planning guidance", "not structural approval"],
    },
  ],
]);
const toolsHub = pages.find((page) => page.route === "/tools");

if (!toolsHub) {
  failures.push("/tools: missing rendered planning-tools hub");
}

for (const [route, contract] of planningToolContracts) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered planning tool`);
    continue;
  }
  if (!toolsHub?.html.includes(`href="${route}"`)) {
    failures.push(`/tools: missing internal link to ${route}`);
  }
  for (const schemaType of contract.schemaTypes) {
    if (!page.html.includes(`"@type":"${schemaType}"`)) {
      failures.push(`${route}: missing ${schemaType} JSON-LD`);
    }
  }
  for (const marker of contract.scopeMarkers) {
    if (!page.html.toLowerCase().includes(marker)) {
      failures.push(`${route}: missing scope marker "${marker}"`);
    }
  }
}

const approvedLiveToolRoutes = new Set(["/tools/packaging-format-finder"]);
const toolSourceEntries = await readdir(path.resolve("src/app/tools"), {
  withFileTypes: true,
});

for (const entry of toolSourceEntries) {
  if (!entry.isDirectory()) continue;
  const route = `/tools/${entry.name}`;
  let hasPage = true;
  try {
    await readFile(path.resolve("src/app/tools", entry.name, "page.tsx"), "utf8");
  } catch {
    hasPage = false;
  }
  if (hasPage && !approvedLiveToolRoutes.has(route)) {
    failures.push(
      `${route}: tool route is not approved for production; obtain Umar's explicit preview-test approval before adding it to main`
    );
  }
}

const retiredToolRoutes = [
  "/tools/packing-cbm-weight-calculator",
  "/tools/packaging-spec-builder",
  "/tools/packaging-artwork-preflight",
];

for (const route of retiredToolRoutes) {
  if (pages.some((candidate) => candidate.route === route)) {
    failures.push(`${route}: retired tool remains in the canonical sitemap`);
  }
  if (toolsHub?.html.includes(`href="${route}"`)) {
    failures.push(`/tools: retired tool remains linked from the tools hub: ${route}`);
  }
}

for (const page of pages) {
  for (const unsupportedSchemaMarker of [
    '\"@type\":\"Review\"',
    '\"aggregateRating\"',
  ]) {
    if (page.html.includes(unsupportedSchemaMarker)) {
      failures.push(
        `${page.route}: unsupported review or rating schema marker ${unsupportedSchemaMarker}`
      );
    }
  }
  if (page.route === "/") continue;
  const inboundPageCount = pages.filter(
    (candidate) =>
      candidate.route !== page.route &&
      candidate.html.includes(`href="${page.route}"`)
  ).length;
  if (inboundPageCount < 2) {
    failures.push(
      `${page.route}: only ${inboundPageCount} inbound sitemap page(s); expected at least 2`
    );
  }
}

const aiDiscoverySource = await readFile(
  path.resolve("src/lib/ai-discovery.ts"),
  "utf8"
);
for (const marker of [
  'schemaVersion: "3.0"',
  "minimumQuantityUnits: 250",
  "buyerGuides: blogPosts.map",
  "## Packaging buyer guides",
  "industryApplications: industryApplicationsForStyle",
  "approvedStyleUrls: (guide.formatSlugs ?? []).map",
]) {
  if (!aiDiscoverySource.includes(marker)) {
    failures.push(`AI discovery source is missing buyer-guide marker ${marker}`);
  }
}

const nextConfigSource = await readFile(path.resolve("next.config.ts"), "utf8");
for (const marker of ["</llms.txt>", "</llms-full.txt>", "</agents.md>", "</product-catalog.json>"]) {
  if (!nextConfigSource.includes(marker)) {
    failures.push(`next.config.ts: missing homepage discovery Link header for ${marker}`);
  }
}

for (const file of [
  "src/app/sitemap.ts",
  "src/app/tools/page.tsx",
  "src/lib/ai-discovery.ts",
]) {
  const source = await readFile(path.resolve(file), "utf8");
  for (const route of retiredToolRoutes) {
    if (source.includes(route)) {
      failures.push(`${file}: retired tool remains in public discovery source: ${route}`);
    }
  }
}

const organicIntentContracts = new Map([
  ["/products/custom-tuck-boxes", { scopeMarker: "regular shipping carton", statusMarker: "Outside current offer" }],
  ["/products/custom-mailer-boxes", { scopeMarker: "master carton", statusMarker: "Outside current offer" }],
  ["/products/custom-magnetic-boxes", { scopeMarker: "fold-flat", statusMarker: "Related route" }],
  ["/products/custom-collapsible-magnetic-boxes", { scopeMarker: "assembled rigid", statusMarker: "Related route" }],
  ["/products/custom-mylar-bags", { scopeMarker: "packing or converting machinery", statusMarker: "Outside current offer" }],
  ["/cosmetics", { scopeMarker: "primary cosmetic packaging", statusMarker: "Outside current offer" }],
  ["/cosmetics/lipstick-boxes", { scopeMarker: "lipstick tube, casing", statusMarker: "Outside current offer" }],
  ["/cosmetics/serum-boxes", { scopeMarker: "bottle, jar, dropper", statusMarker: "Outside current offer" }],
  ["/applications/influencer-kits", { scopeMarker: "campaign fulfillment", statusMarker: "Outside current offer" }],
  ["/packaging-styles/printed-rollstock-film", { scopeMarker: "packing and converting machinery", statusMarker: "Outside current offer" }],
  ["/samples/box-sample-kit", { scopeMarker: "$19.99 finished box sample kit", statusMarker: "Related route" }],
]);

for (const [route, { scopeMarker, statusMarker }] of organicIntentContracts) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) {
    failures.push(`${route}: missing rendered organic-intent page`);
    continue;
  }
  if (!page.html.includes('id="buyer-intent-routes"')) {
    failures.push(`${route}: missing buyer-intent route bridge`);
  }
  if (!page.html.includes(`${route}#buyer-intent-routes`)) {
    failures.push(`${route}: missing buyer-intent ItemList JSON-LD`);
  }
  if (!page.html.includes(statusMarker)) {
    failures.push(`${route}: missing visible qualification status "${statusMarker}"`);
  }
  if (!page.html.includes('href="/get-a-quote?')) {
    failures.push(`${route}: missing prefilled buyer-intent quote path`);
  }
  if (!page.html.toLowerCase().includes(scopeMarker)) {
    failures.push(`${route}: missing scope marker "${scopeMarker}"`);
  }
}

if (failures.length) {
  console.error(`SEO quality audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO quality audit passed for ${pages.length} canonical rendered sitemap pages: required metadata, exactly one H1, canonical URLs, JSON-LD, image alt attributes, length limits, uniqueness, semantic headings, native form actions, sitewide inbound-link coverage, homepage industry discovery, ${blogRoutes.length} blog contracts, ${comparisonRoutes.length} comparison-guide contracts, ${coreProductContracts.size} core-product contracts, ${packagingStyleRoutes.length} reciprocal style-industry contracts, ${industryHubRoutes.length} commercial industry-hub contracts, ${planningToolContracts.size} planning-tool contract, and ${organicIntentContracts.size} organic-intent contracts. ${sitemapPaths.size - pages.length} dynamic sitemap page(s) require runtime crawl verification.`
);

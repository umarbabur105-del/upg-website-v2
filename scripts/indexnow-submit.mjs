#!/usr/bin/env node

const SITE_ORIGIN = "https://universalpackaginggroup.com";
const SITE_HOST = new URL(SITE_ORIGIN).host;
const INDEXNOW_KEY = "75e2b2f10c82e360acc19a29a8670919";
const INDEXNOW_KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const DEFAULT_SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
const MAX_URLS_PER_REQUEST = 10_000;

function argumentValues(name) {
  const values = [];

  for (let index = 0; index < process.argv.length; index += 1) {
    const argument = process.argv[index];

    if (argument === name) {
      const value = process.argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`${name} requires a value.`);
      }
      values.push(value);
      index += 1;
    } else if (argument.startsWith(`${name}=`)) {
      values.push(argument.slice(name.length + 1));
    }
  }

  return values;
}

function singleArgumentValue(name, fallback) {
  const values = argumentValues(name);

  if (values.length > 1) {
    throw new Error(`${name} can only be supplied once.`);
  }

  return values[0] ?? fallback;
}

function normalizeSiteUrl(value) {
  const url = new URL(value, `${SITE_ORIGIN}/`);

  if (url.origin !== SITE_ORIGIN) {
    throw new Error(`IndexNow URL must use ${SITE_ORIGIN}: ${value}`);
  }

  url.hash = "";
  return url.toString();
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function urlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    normalizeSiteUrl(decodeXml(match[1].trim()))
  );
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 45_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "UPG-IndexNow/1.0 (+https://universalpackaginggroup.com)",
        ...options.headers,
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function readSitemap(sitemapUrl) {
  const response = await fetchWithTimeout(sitemapUrl);

  if (!response.ok) {
    throw new Error(`Sitemap request failed with HTTP ${response.status}.`);
  }

  const urls = urlsFromSitemap(await response.text());

  if (urls.length === 0) {
    throw new Error("No <loc> URLs were found in the sitemap.");
  }

  return urls;
}

async function verifyPublishedKey() {
  const response = await fetchWithTimeout(INDEXNOW_KEY_LOCATION);

  if (!response.ok) {
    throw new Error(
      `IndexNow key is not published yet: ${INDEXNOW_KEY_LOCATION} returned HTTP ${response.status}.`
    );
  }

  const publishedKey = (await response.text()).trim();
  if (publishedKey !== INDEXNOW_KEY) {
    throw new Error("The published IndexNow key file does not match the configured key.");
  }
}

async function submitUrls(urls) {
  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`IndexNow accepts at most ${MAX_URLS_PER_REQUEST} URLs per request.`);
  }

  const response = await fetchWithTimeout(
    INDEXNOW_ENDPOINT,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: urls,
      }),
    },
    30_000
  );

  if (response.status !== 200 && response.status !== 202) {
    const detail = (await response.text()).trim().slice(0, 500);
    throw new Error(
      `IndexNow rejected the request with HTTP ${response.status}${detail ? `: ${detail}` : "."}`
    );
  }

  return response.status;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const explicitUrls = argumentValues("--url");
  const sitemapUrl = normalizeSiteUrl(
    singleArgumentValue("--sitemap", DEFAULT_SITEMAP_URL)
  );

  const rawUrls =
    explicitUrls.length > 0
      ? explicitUrls.map(normalizeSiteUrl)
      : await readSitemap(sitemapUrl);
  const urls = [...new Set(rawUrls)];

  if (dryRun) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          endpoint: INDEXNOW_ENDPOINT,
          keyLocation: INDEXNOW_KEY_LOCATION,
          urlCount: urls.length,
          urls,
        },
        null,
        2
      )
    );
    return;
  }

  await verifyPublishedKey();
  const status = await submitUrls(urls);
  console.log(
    JSON.stringify(
      {
        submitted: true,
        status,
        urlCount: urls.length,
        keyLocation: INDEXNOW_KEY_LOCATION,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

# WithUPG Brand-Alias Integration

Last verified: 2026-09-03

## Role of the domain

`withupg.com` is a short marketing address for Universal Packaging Group. It is
not a second company, storefront, or SEO property. All public content, quotes,
policies, structured data, checkout flows, and Merchant landing pages remain on
the canonical `https://universalpackaginggroup.com` website.

## Redirect contract

- Apex and `www` requests use a permanent `301` redirect.
- The requested path is preserved.
- Existing query strings are preserved exactly so campaign-specific links keep
  their original attribution.
- Requests without a query string receive the default campaign parameters
  `utm_source=withupg`, `utm_medium=vanity_url`, and
  `utm_campaign=brand_alias`.

The default parameters let GA4 and the existing first-touch lead-attribution
flow distinguish a typed or printed WithUPG visit from ordinary direct traffic.
Quote, contact, sample-request, and sample-kit checkout paths already carry the
captured attribution into the existing CRM or order metadata.

## Search and commerce boundaries

- Search Console stays on `sc-domain:universalpackaginggroup.com`.
- The XML sitemap, canonicals, Open Graph URLs, JSON-LD IDs, and AI-readable
  discovery files stay on `universalpackaginggroup.com`.
- Merchant Center keeps the two real fixed-price sample-kit landing pages on
  `universalpackaginggroup.com`.
- No WithUPG sitemap, Merchant feed, GA4 property, duplicate page, or Change of
  Address action is created.

## Identity disclosure

The global Organization schema lists `UPG` and `With UPG` as alternate names
while retaining `Universal Packaging Group` as the organization name and the
canonical site as its URL. The About page explains that `withupg.com` is the
company's short web address.

## Reporting

The aggregate acquisition report exposes WithUPG sessions separately and maps
matching CRM attribution to `brand_alias`. This preserves the existing organic,
Merchant, AI-referral, and direct classifications.

## Verification boundary

Redirect behavior, live schema, Google integrations, and reporting must be
rechecked after release. A successful redirect or sitemap submission does not
prove indexing, ranking, recommendation, or a lead.

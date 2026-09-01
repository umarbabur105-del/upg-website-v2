# UPG Organic Lead Engine

Last reviewed: 2026-09-01

## Business objective

Generate qualified custom-packaging enquiries without waiting for paid ads or Google Merchant approval. Merchant is one acquisition lane for real fixed-price sample kits; it is not the organic growth strategy.

UPG's first commercial scope remains:

1. Tuck Boxes
2. Corrugated Ear-Lock Mailer Boxes
3. Magnetic Boxes
4. Collapsible Magnetic Boxes
5. Mylar Bags and approved flexible-packaging formats

Standard shipping cartons, master cartons, and RSC cases remain outside the offer.

## Competitor pattern: Teal Packaging

Public sitemap inventory captured on 2026-08-13:

| Sitemap group | Public URLs |
| --- | ---: |
| Main | 30 |
| Products | 1,249 |
| Products secondary | 86 |
| Categories | 35 |
| Blog | 99 |
| Programmatic SEO | 1,207 |
| Programmatic SEO secondary | 1,032 |
| Shop | 82 |
| Unique URLs across these groups | 3,820 |

The visible acquisition model combines:

- a very large product and search-intent footprint;
- a quote form embedded across commercial pages;
- a $19.99 sample-kit entry offer;
- low-MOQ, turnaround, design, and shipping hooks;
- planning tools such as a dimensional-weight calculator and material selector;
- product, category, industry, comparison, location, blog, and shop pages;
- extensive internal linking between pages, tools, samples, and quote forms.

Public sources:

- <https://tealpackaging.com/sitemap.php>
- <https://tealpackaging.com/sitemap-products.php>
- <https://tealpackaging.com/sitemap-pseo.php>
- <https://tealpackaging.com/box-size-dimensional-weight-calculator/>
- <https://tealpackaging.com/eco-friendly-packaging-material-selector/>

The user has reported that Teal receives and converts Merchant leads. That performance is not independently verifiable from public data. UPG will copy the useful acquisition architecture, not unsupported commercial claims, misleading prices, or low-value page volume.

## UPG strategy

### Lane 1: Commercial search coverage

Build visible, navigable pages only for real products, styles, industries, applications, and decisions UPG can support. Every page must answer a distinct buyer question and lead to a prefilled enquiry.

Initial style cluster:

- Straight Tuck End Boxes
- Reverse Tuck End Boxes
- Auto-Lock Bottom Boxes
- Interlock Boxes
- Seal End Boxes, including cereal-style cartons
- Stand-Up Pouches
- Flat Bottom Bags
- Three-Side Seal Bags
- Spout Pouches
- Child-Resistant Bags
- Coffee Bags
- Printed Rollstock Film

### Lane 2: Useful tools and original data

UPG should earn links and AI-search citations through practical resources rather than generic articles:

- Packaging Format Finder
- Packaging Style Library
- Future: dieline briefing tool, landed-project checklist, print-finish decision tool, and anonymized packaging-planning benchmarks after enough first-party enquiries exist

### Lane 3: Industry and application clusters

Expand only where a real UPG product can answer the intent. The next clusters should use verified search demand and UPG product knowledge:

- Cosmetics and beauty outer boxes
- PR and influencer mailer boxes
- Subscription mailer boxes
- Ecommerce mailer boxes
- Coffee bags
- Supplement and specialty-food outer packaging
- Product-launch and gift packaging

Technical specifications, claims, certifications, product compatibility, and final material recommendations require Umar's product approval before publication.

### Lane 4: Merchant and fixed-price entry products

Merchant remains limited to products that can be purchased at the submitted price. Current sample kits continue through review. Custom production pages remain quote-led unless UPG creates a real preconfigured variant with a matching landing page, minimum-order total, image, checkout, and delivery terms.

### Lane 5: Authority and backlinks

Backlinks should come from useful resources and real business relationships:

- packaging and printing trade associations or supplier directories with editorial review;
- manufacturer and material-partner profile pages where the relationship is real;
- packaging design, ecommerce, beauty, coffee, and startup resources that can cite a UPG tool or original planning dataset;
- customer case studies and launch stories after permission is available;
- expert contributions based on Umar's packaging experience;
- verified company profiles and review platforms with consistent company details.

Do not buy ranking links, automate directory submissions, exchange links at scale, or publish guest posts solely for optimized anchors. Google classifies those patterns as link spam.

### Lane 6: Conversion and measurement

Every organic landing page should preserve:

- source URL and UTM parameters;
- selected product family and style;
- project note prefill;
- quote-start and quote-submit events;
- qualified, quoted, won, lost, and spam outcomes in the CRM.

Weekly decision metrics:

1. Indexed useful pages
2. Non-brand impressions and clicks
3. Queries entering positions 1-20
4. Organic quote starts and submissions
5. Qualified-lead rate by landing page and product family
6. Referring domains and links earned by tools or original resources
7. Quotes and won orders attributed to organic search, AI referrals, Merchant, and direct traffic

The aggregate report also exposes two operating views:

- zero-click commercial-packaging query-to-page opportunities at average position 50 or better, scored from observed impressions and ranking proximity while suppressing known shipping-carton and master-carton noise;
- privacy-safe lead, qualified, and won counts grouped by landing page, without printing customer identity or project notes.

After a page is materially changed, compare it over a full 28-day Search Console window before rewriting it again. New pages should not be judged from same-day or same-week rankings.

Run the rendered-page quality gate after every production build:

```bash
npm run build
npm run audit:seo
```

The gate checks rendered pages for required and unique titles and descriptions, title and description length limits, H1s, canonical URLs, and JSON-LD.

## Release sequence

### Current implementation status — 2026-08-30

- Phase 1 style cluster: implemented with 12 visible style pages.
- Phase 2 first commercial cluster: implemented with 12 visible industry and product-application guides.
- Demand evidence: Search Console baseline and Teal public-coverage proxy recorded in `docs/keyword-demand-map.md`.
- Exact monthly volume: pending a real Google Ads account, developer token, customer ID, and OAuth `adwords` scope. The Google Ads API service itself is enabled.
- Phase 3 authority assets: the Packaging Format Finder remains live. The Packaging Spec & MOQ Builder, Packaging Artwork Preflight Checker, and Packing CBM & Weight Calculator were archived on 2026-09-01. No new tool may reach production before Umar tests its exact preview URL and explicitly approves it.
- Phase 3 prospecting: 50 prospects and approval-gated outreach drafts recorded in `docs/backlink-prospects.csv`, `docs/backlink-outreach-drafts.md`, and `docs/backlink-personalized-drafts.md`; two individually approved editorial emails were sent on 2026-08-21. Further outreach is paused by owner instruction.
- Measurement: aggregate-only Search Console, GA4, and CRM report available through `npm run report:organic`; it includes form starts, successful lead submissions, sample-kit checkout starts, purchases, and authority-tool events. Brand filtering now treats `universal packing` as a UPG brand variant, and the action queue excludes known similarly named packaging companies without removing valid commercial packaging queries from the raw evidence.

### Current acquisition evidence — 2026-08-30

- Google operator OAuth was reauthorized after an `invalid_rapt` reauthentication failure; all core Google API probes passed afterwards.
- The 2026-08-30 release snapshot contained 86 canonical URLs and every URL returned HTTP 200. Fresh Search Console URL Inspection at that time reported 83 of the prior 85 URLs indexed; `/industries/beauty-personal-care-packaging` was unknown to Google and `/industries/supplement-packaging` was discovered but not indexed. The calculator added in that snapshot was later archived on 2026-09-01.
- The latest 90-day report contains 1,125 Search Console impressions, 580 correctly filtered non-brand impressions, 0 non-brand clicks, and 12 queries observed in positions 1-20. GA4 recorded 8 Organic Search sessions and 2 Organic Shopping sessions in the corresponding operating window.
- GA4 recorded 4 enquiry-form starts and 2 successful lead submissions. Sample-kit checkout starts and purchases were 0 in this window.
- The CRM contains 3 genuine leads in the period, all still New; 2 did not record a product family. Qualified and won counts remain 0.
- Both Merchant sample kits are approved for Free Listings in all 32 configured countries, but Merchant performance reports contain no impressions, clicks, or conversions for 2026-08-11 through 2026-08-20.
- The protected Stripe sandbox lane is proven end to end without charging real money: a US$19.99 test payment completed with `livemode=false`, and the hardened deployment's next event returned HTTP 200 on its first delivery. CRM stored the record as `Stripe Test Order` / `Spam` / `System Test`, and the clearly labeled no-real-payment notification reached the UPG inbox. Live payment and physical fulfillment remain approval-gated. Sandbox analytics uses `stripe_test_purchase`, not the real `purchase` event; GA4 receipt still needs confirmation after reporting latency.
- Backlink distribution has started: 50 researched prospects, 13 still marked ready for a personalized pitch, and 2 individually approved editorial emails sent and awaiting response (FDPP and Packaging World). Further outreach is on hold.

The immediate constraints are non-brand click-through, authority, incomplete lead qualification, and live physical-fulfillment readiness. Crawlability and the protected sandbox payment pipeline are healthy, but indexing is not described as complete without URL Inspection proof. While outreach is paused, the active lane is measurement, query-led content improvement, accurate planning tools, and conversion-path verification.

### Sitewide organic and AI readiness — production release, 2026-09-01

Commits `7ad3009` and `5282fa9` strengthen the owned website rather than treating Merchant Center as the organic strategy:

- the MOQ and corrugated-versus-magnetic guides now give direct answers, comparison tables, planning boundaries, required buyer inputs, visible editorial responsibility, BlogPosting and breadcrumb schema, and reciprocal guide links;
- the blog hub routes buyers into pricing, comparison, and planning-tool sources;
- cosmetics pages and the pricing page add reciprocal contextual routes for previously weak internal-link targets without rewriting the recently changed zero-click target copy;
- About and Contact publish truthful AboutPage, ContactPage, and breadcrumb schema, while the organization graph names the two visible legal entities without inventing social profiles, ratings, reviews, or credentials;
- quote and contact forms now retain native same-origin HTML POST actions when JavaScript is unavailable, accept JSON or URL-encoded input, reject foreign browser origins, and keep all pricing and follow-up human reviewed;
- `/agents.md` and product catalog schema `2.7` document the quote and contact action contracts, required fields, encodings, and non-autonomous success meaning;
- the pricing source advertises its Markdown alternate through an HTTP `Link` header;
- Cloudflare email obfuscation is narrowly disabled around UPG's public email in rendered HTML using Cloudflare's documented `email_off` comments. Live pages retain direct `mailto:` links and no longer expose `data-cfemail` or `/cdn-cgi/l/email-protection` links to crawlers.

Release proof passed for exact remote-main commit `5282fa9f007b521483f41ee5d6afe2cd205e3911`: Vercel production status `READY`, ESLint, TypeScript, 16 regression tests, a 107-page Next.js build, the expanded 84-page rendered SEO audit, 87/87 production sitemap URLs with HTTP 200, exactly one H1, matching canonical URLs, JSON-LD, AI action discovery, native-form and origin-protection checks, Markdown discovery, and the crawler-readable email contract. IndexNow accepted all 87 canonical URLs with HTTP 200.

Fresh Search Console URL Inspection on 2026-09-01 reports both former gaps—`/industries/beauty-personal-care-packaging` and `/industries/supplement-packaging`—as indexed. `/custom-packaging-pricing` is discovered but currently not indexed, and Search Console accepted it into the priority crawl queue after fresh owner confirmation. The calculator request returned Google's temporary submission error on two controlled attempts before the tool was archived later that day. Rankings, AI citations, recommendations, and leads remain measurement outcomes rather than release claims.

### Site-first pricing and MOQ authority page — production release, 2026-08-31

Commit `5c9f3a1` adds an owned-site commercial source at `/custom-packaging-pricing`; it does not depend on Merchant Center eligibility. The page gives buyers and retrieval systems one answer-first reference for:

- the 250-unit planning MOQ across all five custom product families;
- the six inputs that can change a custom-production quote;
- the project details needed for a useful first review;
- the commercial, artwork, proofing, freight, tax, and delivery details that the final written quote controls;
- the truthful boundary between quote-led custom production and the two separate $19.99 fixed-price sample kits.

The route includes WebPage, ItemList, FAQPage, and BreadcrumbList structured data, direct links to all five product sources, a `text/markdown` alternate at `/custom-packaging-pricing.md`, global footer discovery, and backlinks from every core product page. `llms.txt`, `llms-full.txt`, `agents.md`, and `product-catalog.json` expose the same source without changing the quote-led commercial model.

Release proof passed: ESLint, TypeScript, 11 regression tests, a 107-page Next.js production build, 84 canonical rendered sitemap pages plus 3 dynamic pages, the expanded commercial-page audit contract, production-mode HTTP checks, exact remote-main SHA, Vercel success, and live apex checks for HTML, canonical metadata, schema, Markdown content type, product backlinks, sitemap, `llms.txt`, and catalog discovery. IndexNow accepted the new route and five changed product pages with HTTP 200. Google indexing, rankings, AI citations, recommendations, and leads remain measurement outcomes rather than release claims.

### Buyer-decision cluster — production release, 2026-08-23

The buyer-decision cluster is live from commit `961825e`:

- one indexable `/compare` hub;
- eight distinct side-by-side buyer guides spanning box families, tuck directions, flexible formats, rollstock versus finished pouches, and the corrugated-mailer scope boundary;
- prefilled quote handoffs for every available UPG path;
- product-page and style-page cross-links plus global navigation and footer discovery;
- WebPage, ItemList, BreadcrumbList, and FAQPage structured data;
- sitemap, `llms.txt`, `llms-full.txt`, `agents.md`, and product-catalog JSON coverage;
- an expanded rendered SEO gate that requires at least eight comparison pages, hub links, table anchors, ItemList and FAQ schema, quote paths, and at least two rendered internal links per guide.

Fresh aggregate evidence through the available reporting windows: 1,100 Search Console impressions, 567 non-brand impressions, 8 total clicks, 0 non-brand clicks, 13 queries observed in positions 1-20, 6 GA4 Organic Search sessions, 1 Organic Shopping session, and 3 genuine CRM leads. The comparison cluster addresses decision-intent coverage and internal relevance; it does not replace the paused authority and backlink lane.

Release proof passed: ESLint with zero warnings, TypeScript, diff check, Next.js build with 95/95 generated pages, 73 canonical rendered sitemap pages, 8 comparison-guide contracts, 76/76 runtime sitemap URLs after the later production batches, 4/4 AI discovery endpoints, quote-prefill browser proof, and mobile Lighthouse 100 for accessibility, best practices, and SEO on both the hub and a representative guide.

### Zero-click query-to-page batch — production release, 2026-08-23

The next organic-conversion batch focuses on six existing commercial pages that collectively received 443 of the latest 567 measured non-brand impressions, or about 78.1%, while producing no non-brand click in the available 90-day window.

- Lipstick and serum pages now define UPG's outer-carton offer and visibly exclude tubes, casings, bottles, formulas, and filling.
- The cosmetics hub routes retail cartons, premium presentation boxes, and PR mailers without implying primary cosmetic packaging.
- The influencer page sells the ear-lock mailer and insert without implying campaign fulfillment.
- The rollstock page separates printed film on roll, finished pouches, and machinery intent.
- The box sample page separates the paid finished kit, free project review, Mylar samples, and custom production.
- All six pages have visible buyer-intent cards, contextual links, prefilled enquiry routes, ItemList structured data, sitemap review dates, AI-readable entries, and rendered audit contracts.
- The weekly opportunity report filters known fulfillment, overwrap, primary lipstick-component, filling, shipping-carton, master-carton, and RSC noise from the action queue while preserving the raw source data.

Detailed query evidence, exclusions, and the full 28-day measurement rule are recorded in `docs/zero-click-opportunity-plan.md`. Commits `20ff81a` and `8d46330` are live with exact-SHA Vercel success, 76/76 sitemap proof, six target-page contracts, working AI discovery and quote-prefill routes, and representative live Lighthouse scores of 100 for accessibility, best practices, and SEO.

### Five-product authority cluster — production release, 2026-08-23

Commit `adfde6c` released the five-product authority cluster, consolidating authority around the five approved money pages instead of publishing more URLs:

- one visible four-route buyer-intent bridge on every core product page;
- separate structure, application, comparison, scope, and prefilled enquiry paths based on the actual product family;
- explicit shipping-carton filtration on tuck and mailer routes without removing broad corrugated-box relevance;
- assembled-versus-fold-flat magnetic guidance without unsupported savings claims;
- finished-pouch, rollstock, format-comparison, and machinery boundaries for Mylar;
- one five-product catalog on `/products`, with CollectionPage and ItemList schema;
- product-specific search terms and buyer FAQs for magnetic, collapsible magnetic, and Mylar pages;
- product catalog schema version 2.3 plus AI-readable coverage across all buyer-intent routes;
- rendered contracts for the Products hub, five Service pages, FAQ and breadcrumb schema, contextual links, scope qualification, and quote handoffs.

Search Console recorded only 10 non-brand impressions and 0 clicks across the five product pages in the available 90-day window. Existing internal-link volume is already high, so the batch focuses on page differentiation and buyer routing rather than adding duplicate pages or indiscriminate links. Release proof passed with exact-SHA Vercel success, 76/76 live sitemap URLs, five product contracts, four AI discovery endpoints, and live Lighthouse scores of 100 for accessibility, best practices, and SEO on three representative pages. Full evidence is recorded in `docs/core-product-authority-plan.md`.

### Commercial industry hubs — production release, 2026-08-25

The top navigation already grouped seven industry markets, but only three groups had a dedicated overview page. This batch turns the three remaining multi-guide commercial groups into real buyer-decision hubs:

- Fashion, Jewelry & Luxury Packaging
- Electronics & Consumer Goods Packaging
- Home, Candle & Gift Packaging

Each hub reuses current UPG product families and existing reviewed guides; it does not add a new packaging style. The pages compare available starting formats, preserve project-review boundaries, link to a prefilled enquiry, and join the sitemap, structured-data, product-page, navigation, and AI-discovery systems through the shared industry-hub dataset.

Pet Products remains an anchor group on `/industries` because it currently has only one underlying guide. Publishing a second overview page for the same single path would add duplication rather than buyer value.

Fresh Search Console evidence for 2026-07-25 through 2026-08-21 contains 408 impressions, 291 non-brand impressions, 3 total clicks, and 0 non-brand clicks. Recently changed lipstick and cosmetics pages are not rewritten again in this batch; their material changes require a full 28-day comparison window. The commercial industry hubs expand coherent discovery paths without disrupting that measurement.

Commit `ee942ce` released the hubs with exact-SHA Vercel success and 85/85 live sitemap URLs returning HTTP 200. Fresh URL Inspection on 2026-08-30 reports 83 of those 85 URLs indexed; the beauty and supplement industry hubs remain the two explicit indexing follow-ups.

### Packing CBM & Weight Calculator — released 2026-08-30, archived 2026-09-01

The calculator was removed from the active site because UPG packaging products
are commonly supplied flat, folded, collapsed, or nested. Its assembled-item and
manual master-carton assumptions could therefore produce a shipping estimate
that did not match the actual supplied form. The old route permanently redirects
to `/tools`; active discovery and sitemap references were removed. See
`docs/archived-tools.md`.

The original release added one planning route at `/tools/packing-cbm-weight-calculator` and a visible discovery card on `/tools`. It used only buyer-entered packed-unit dimensions, manual carton layout, quantity, allowance, dimensional-weight divisor, and optional measured weights. It did not guess material, board grade, carrier approval, freight price, or final carton construction.

Commit `daa69df` released WebApplication, FAQPage, and BreadcrumbList structured data; sitemap and AI-discovery coverage; copy and complete prefilled quote handoffs; unit conversion; a pure calculation library; four deterministic calculation tests; and a rendered SEO contract. Production proof passed with exact-SHA Vercel success, 4/4 calculation tests, 3/3 organic-report regression tests, ESLint, TypeScript, a 105-page Next.js build, 83 canonical rendered audit pages plus 3 dynamic runtime pages, 86/86 live sitemap URLs returning HTTP 200, all four AI-discovery endpoints, product catalog schema 2.6, desktop and mobile browser verification, zero horizontal overflow at 375px, and HTTP 200 IndexNow acceptance for four changed or pending URLs.

### Phase 1 — Product-style lead cluster

- Publish the 12 approved style pages and the Style Library.
- Link them from the global navigation, footer, Products hub, and parent product pages.
- Add prefilled quote routing, structured data, sitemap entries, and AI-readable catalog entries.
- Submit the new URLs through IndexNow after production verification.
- Request Google indexing through the existing Search Console operating workflow without claiming indexing or ranking.

### Phase 2 — Demand map and high-intent expansion

- Connect a source that returns reliable keyword volume and difficulty data. Search Console alone only measures existing visibility; Google Ads Keyword Planner requires a Google Ads account, Ads API access, and a developer token.
- Score candidate pages by buyer intent, demand, UPG fit, competition, commercial value, and the amount of approved technical information available.
- Publish the next 20-30 pages in small reviewed clusters, not thousands of templated pages.

### Phase 3 — Backlink distribution

- Build a reviewed prospect list for each linkable asset.
- Prepare personalized outreach drafts and partner/profile submissions.
- Obtain approval before sending external messages or creating third-party listings.
- Track each live referring URL and the page it supports.

### Phase 4 — First-party data moat

- Aggregate anonymized enquiry data only after enough records exist.
- Publish original benchmarks such as requested quantities, format demand, artwork readiness gaps, or size-bracket distribution when the sample is defensible.
- Use the dataset to improve tools, earn citations, and strengthen UPG's expertise signals.

## Search-quality guardrails

UPG will not create hidden pages, doorway pages, city pages without genuine local value, or thousands of near-duplicate AI pages. Google's current policies treat scaled low-value content and substantially similar funnel pages as spam risks.

Primary guidance:

- <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- <https://developers.google.com/search/docs/essentials/spam-policies>
- <https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>
- <https://support.google.com/merchants/answer/7162856>
- <https://support.google.com/merchants/answer/6324371>

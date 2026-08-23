# UPG Organic Lead Engine

Last reviewed: 2026-08-23

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
- Packaging Spec & MOQ Builder using UPG's approved MOQ rules
- Packaging Artwork Preflight Checker
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

### Current implementation status — 2026-08-13

- Phase 1 style cluster: implemented with 12 visible style pages.
- Phase 2 first commercial cluster: implemented with 12 visible industry and product-application guides.
- Demand evidence: Search Console baseline and Teal public-coverage proxy recorded in `docs/keyword-demand-map.md`.
- Exact monthly volume: pending a real Google Ads account, developer token, customer ID, and OAuth `adwords` scope. The Google Ads API service itself is enabled.
- Phase 3 authority asset: the Packaging Spec & MOQ Builder now creates shareable, downloadable, and print-ready planning briefs, shows exact 5-inch and 10-inch boundary examples, measures brief completeness, and carries specifications into the enquiry form.
- Phase 3 prospecting: 50 prospects and approval-gated outreach drafts recorded in `docs/backlink-prospects.csv`, `docs/backlink-outreach-drafts.md`, and `docs/backlink-personalized-drafts.md`; two individually approved editorial emails were sent on 2026-08-21. Further outreach is paused by owner instruction.
- Measurement: aggregate-only Search Console, GA4, and CRM report available through `npm run report:organic`; it now includes form starts, successful lead submissions, sample-kit checkout starts, purchases, and authority-tool events.

### Current acquisition evidence — 2026-08-21

- Google operator OAuth was reauthorized after an `invalid_rapt` reauthentication failure; all core Google API probes passed afterwards.
- Search Console URL Inspection reports all 67 live sitemap URLs as submitted and indexed, with indexing allowed, robots allowed, and successful page fetches.
- The latest 30-day report contains 427 Search Console impressions, 292 non-brand impressions, 6 total clicks, 0 non-brand clicks, and 4 GA4 Organic Search sessions.
- Non-brand impressions increased from 140 to 292 versus the previous comparison period, but the current visibility has not yet produced a dependable non-brand click flow.
- The CRM contains 3 genuine leads in the period, all still New: 2 AI referrals and 1 direct or unattributed. Qualified and won counts remain 0.
- Both Merchant sample kits are approved for Free Listings in all 32 configured countries, but Merchant performance reports contain no impressions, clicks, or conversions for 2026-08-11 through 2026-08-20.
- The protected Stripe sandbox lane is proven end to end without charging real money: a US$19.99 test payment completed with `livemode=false`, and the hardened deployment's next event returned HTTP 200 on its first delivery. CRM stored the record as `Stripe Test Order` / `Spam` / `System Test`, and the clearly labeled no-real-payment notification reached the UPG inbox. Live payment and physical fulfillment remain approval-gated. Sandbox analytics uses `stripe_test_purchase`, not the real `purchase` event; GA4 receipt still needs confirmation after reporting latency.
- Backlink distribution has started: 50 researched prospects, 13 still marked ready for a personalized pitch, and 2 individually approved editorial emails sent and awaiting response (FDPP and Packaging World). Further outreach is on hold.

The immediate constraints are non-brand click-through, authority, and live physical-fulfillment readiness; crawlability, sitemap indexing, checkout-session creation, and the protected sandbox payment pipeline are healthy. While outreach is paused, the active lane is measurement, query-led content improvement, and conversion-path verification.

### Buyer-decision cluster — local release candidate, 2026-08-23

The next large organic batch is implemented locally and remains unreleased pending owner approval:

- one indexable `/compare` hub;
- eight distinct side-by-side buyer guides spanning box families, tuck directions, flexible formats, rollstock versus finished pouches, and the corrugated-mailer scope boundary;
- prefilled quote handoffs for every available UPG path;
- product-page and style-page cross-links plus global navigation and footer discovery;
- WebPage, ItemList, BreadcrumbList, and FAQPage structured data;
- sitemap, `llms.txt`, `llms-full.txt`, `agents.md`, and product-catalog JSON coverage;
- an expanded rendered SEO gate that requires at least eight comparison pages, hub links, table anchors, ItemList and FAQ schema, quote paths, and at least two rendered internal links per guide.

Fresh aggregate evidence through the available reporting windows: 1,100 Search Console impressions, 567 non-brand impressions, 8 total clicks, 0 non-brand clicks, 13 queries observed in positions 1-20, 6 GA4 Organic Search sessions, 1 Organic Shopping session, and 3 genuine CRM leads. The comparison cluster addresses decision-intent coverage and internal relevance; it does not replace the paused authority and backlink lane.

Local proof currently passed: ESLint with zero warnings, TypeScript, diff check, Next.js build with 95/95 generated pages, 73 canonical rendered sitemap pages, 8 comparison-guide contracts, 76/76 local runtime sitemap URLs, 4/4 AI discovery endpoints, quote-prefill browser proof, and mobile Lighthouse 100 for accessibility, best practices, and SEO on both the hub and a representative guide.

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

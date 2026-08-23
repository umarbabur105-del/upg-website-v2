# UPG Zero-Click Opportunity Plan

Last reviewed: 2026-08-23

## Objective

Turn the commercial searches that already expose UPG into qualified page visits and enquiries. This is a query-to-page improvement batch, not a claim that rankings or leads will change immediately.

## Evidence boundary

The latest 90-day Search Console window available during this review runs through 2026-08-20:

- 1,100 total impressions
- 567 non-brand impressions
- 8 total clicks
- 0 non-brand clicks
- 6 GA4 Organic Search sessions
- 1 GA4 Organic Shopping session
- 3 genuine CRM leads, with 0 qualified and 0 won at the reporting cutoff

The six selected commercial pages account for 443 of 567 measured non-brand impressions, or about 78.1%. The homepage is deliberately excluded from this batch because its visible queries contain UPG and other name collisions rather than one stable packaging intent.

## Query-to-page release candidate

| Page | Non-brand impressions | Observed demand | Page response | Explicitly filtered intent |
| --- | ---: | --- | --- | --- |
| `/cosmetics/lipstick-boxes` | 261 | lipstick packaging, packaging of lipstick, lipstick boxes, matte and glossy finish terms | Clarify individual lipstick outer cartons versus premium presentation sets; route both to the matching UPG product | lipstick tubes, casings, mechanisms, formulas, filling, and other primary components |
| `/cosmetics` | 67 | cosmetic and beauty packaging terms, plus adjacent component and overwrap noise | Define UPG as an outer-packaging manufacturer and route retail cartons, premium sets, and PR mailers separately | bottles, jars, tubes, mechanisms, applicators, filling, fulfillment, and overwrap services |
| `/applications/influencer-kits` | 53 | influencer mailer, influencer kit, custom influencer box, creator seeding terms | Position the ear-lock corrugated mailer and approved insert as the manufactured product | campaign fulfillment, creator lists, product sourcing, warehousing, and individual dispatch |
| `/packaging-styles/printed-rollstock-film` | 25 | custom printed rollstock, printed roll stock, roll stock film | Separate film-on-roll from finished-pouch buying paths and collect the correct project inputs | filling, sealing, and pouch-making machinery |
| `/cosmetics/serum-boxes` | 19 | serum packaging and serum box packaging | Clarify individual serum outer cartons versus premium serum sets | serum bottles, jars, droppers, formulas, filling, and fulfillment |
| `/samples/box-sample-kit` | 18 | custom box sample, box samples, sample packaging boxes | Separate the paid finished box kit, free project review, Mylar kit, and custom-production enquiry | combined box-and-bag kits or an implied custom-production price |

## What this batch changes

Each selected page receives:

1. Search-result metadata aligned to the observed commercial query without claiming unsupported products.
2. A visible buyer-intent bridge that separates available, related, and out-of-scope routes.
3. Contextual internal links and prefilled enquiry paths that preserve the buyer's intent.
4. ItemList structured data describing the same visible choices.
5. Matching AI-readable coverage in `llms.txt`, `llms-full.txt`, `agents.md`, and `product-catalog.json`.
6. A rendered SEO contract so the intent bridge, qualification boundary, JSON-LD, and enquiry handoff cannot disappear silently.

The aggregate reporting script also suppresses known fulfillment, overwrap, primary lipstick-component, and filling noise from the zero-click opportunity queue. The raw Search Console data remains unchanged.

## Measurement decision

After production release, compare full 28-day windows for:

1. Non-brand impressions and average position on each selected page.
2. Non-brand clicks and click-through rate.
3. Organic enquiry starts and successful submissions.
4. Qualified-lead rate by landing page and selected product family.
5. New query classes that indicate either a useful expansion or an out-of-scope mismatch.

Do not rewrite the pages from same-day or same-week ranking movement. No outreach is included in this batch; owner instruction keeps that lane paused.

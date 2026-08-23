# UPG Keyword Demand and Competitor Gap Map

Last reviewed: 2026-08-23

## Evidence boundary

This map does not invent monthly search volume. It combines three currently verifiable signals:

1. UPG Search Console query evidence from 2026-05-01 through 2026-08-10.
2. Public Teal Packaging sitemap coverage captured on 2026-08-13.
3. Commercial intent and exact fit with UPG's five approved product families.

Google Ads API is now enabled on the `upg-leads-crm` Cloud project. Exact Keyword Planner historical metrics remain blocked because the signed-in Google account does not yet have a Google Ads account, developer token, customer ID, or OAuth `adwords` scope. The monthly-volume field must remain pending until that access exists.

## Current UPG search baseline

The latest aggregate 90-day report covers Search Console data through 2026-08-20. It contains 1,100 total impressions, 567 non-brand impressions, 8 total clicks, 0 non-brand clicks, and 13 queries with observed average positions from 1 through 20. GA4 recorded 6 Organic Search sessions and 1 Organic Shopping session in the corresponding operating window.

This confirms that discovery is expanding, but commercial non-brand click-through remains the immediate constraint. New comparison pages are therefore treated as buyer-decision assets and internal-link bridges, not as an instant traffic claim.

Search Console query clusters, 2026-05-01 to 2026-08-10:

| Query cluster | Clicks | Impressions | Weighted position |
| --- | ---: | ---: | ---: |
| Lipstick and lip-stick packaging | 0 | 226 | 63.5 |
| Serum packaging | 0 | 20 | 75.2 |
| Cosmetic or beauty packaging | 0 | 18 | 74.4 |
| Influencer, seeding, or PR-box intent | 0 | 7 | 58.9 |
| Mailer or ear-lock intent | 0 | 3 | 72.3 |
| Tuck, Mylar, cereal, supplement, soap, candle, apparel, jewelry, electronics, retail, beverage, or gift intent | 0 | 0 | No measured evidence yet |

The current evidence says UPG is being discovered, but its commercial non-brand visibility is still too low to generate dependable clicks. New pages need indexing, internal links, useful backlinks, and enough time to accumulate search evidence.

## Competitor coverage proxy

Teal public-URL matches are a competitor-coverage proxy, not monthly search volume and not proof that every Teal page ranks or converts.

| Cluster | Teal public URL matches | UPG action | Priority |
| --- | ---: | --- | --- |
| Corrugated and other mailer terms | 168 | Strengthen existing mailer product and four application guides; keep standard shipping cartons outside UPG scope | P0 |
| Gift terms | 136 | Publish the magnetic and collapsible magnetic luxury-gift guide | P0 |
| Food terms | 122 | Publish the reviewed Mylar food-pouch guide; never infer food-contact or compatibility approval | P0 |
| Mylar terms | 80 | Strengthen the existing Mylar family and style library | P0 |
| Candle terms | 71 | Publish tuck-versus-magnetic candle packaging guidance | P0 |
| Subscription terms | 67 | Strengthen the existing subscription mailer guide | P1 |
| Retail terms | 65 | Publish the retail tuck-box guide | P0 |
| Soap terms | 61 | Publish the soap tuck-box guide | P0 |
| Coffee terms | 55 | Strengthen the existing coffee-bag style page before adding another overlapping page | P1 |
| Cosmetic terms | 55 | Improve the existing cosmetics cluster rather than duplicate it | P0 |
| Rigid terms | 54 | Strengthen magnetic and collapsible product/category relationships | P0 |
| Tuck terms | 34 | Strengthen the existing five tuck-style guides | P0 |
| Pouch terms | 28 | Publish food, supplement, and beverage application guides | P0 |
| Beverage terms | 28 | Publish the beverage-pouch guide with compatibility review | P1 |
| Supplement terms | 21 | Publish separate outer-carton and flexible-pouch guides | P0 |
| Jewelry terms | 21 | Publish the magnetic presentation guide | P1 |
| Cereal terms | 18 | Publish the cereal-style seal-end guide | P0 |
| Skincare terms | 17 | Improve the existing cosmetics guide rather than duplicate it | P1 |
| Apparel terms | 13 | Publish the magnetic/collapsible presentation guide | P1 |
| Magnetic terms | 9 | Strengthen both magnetic product pages and application links | P0 |
| Electronics terms | 9 | Publish the presentation-box guide with protection boundaries | P1 |
| Influencer terms | 7 | Strengthen the existing influencer-kit guide | P0 |
| PR-box terms | 5 | Strengthen the existing PR-box guide | P0 |

## Page decision score

The release queue uses a 100-point score:

- Buyer intent: 30 points
- Exact UPG product fit: 30 points
- Competitor coverage evidence: 20 points
- Approved product and content readiness: 20 points

| Target | Score | Decision |
| --- | ---: | --- |
| `/industries/custom-retail-boxes` | 94 | Publish |
| `/industries/custom-food-pouches` | 93 | Publish with compatibility boundary |
| `/industries/custom-luxury-gift-boxes` | 92 | Publish |
| `/industries/custom-candle-boxes` | 91 | Publish |
| `/industries/custom-soap-boxes` | 90 | Publish |
| `/industries/custom-supplement-boxes` | 89 | Publish with outer-carton boundary |
| `/industries/custom-supplement-pouches` | 88 | Publish with compatibility boundary |
| `/industries/custom-cereal-boxes` | 88 | Publish as cereal-style seal-end carton |
| `/industries/custom-jewelry-boxes` | 85 | Publish as presentation packaging |
| `/industries/custom-beverage-pouches` | 84 | Publish with contents/process review |
| `/industries/custom-apparel-boxes` | 83 | Publish as presentation packaging |
| `/industries/custom-electronics-boxes` | 81 | Publish with protection/testing boundary |
| Another coffee-bag page | 58 | Do not publish; strengthen the existing style page |
| More cosmetics keyword variants | 55 | Do not publish as thin duplicates; improve current pages from Search Console evidence |
| Shipping-carton, master-carton, or RSC pages | 0 | Never publish inside current UPG offer |

## Buyer-comparison expansion — production release, 2026-08-23

Current search results contain active publisher and manufacturer coverage for stand-up versus flat-bottom pouches, rollstock versus finished pouches, and tuck boxes versus mailer boxes. That is a SERP-coverage signal, not monthly volume or proof that each query will convert.

The local release candidate adds one visible comparison hub plus eight distinct buyer guides:

1. Tuck Boxes vs Mailer Boxes
2. Magnetic Boxes vs Collapsible Magnetic Boxes
3. Tuck Boxes vs Magnetic Boxes
4. Mailer Boxes vs Magnetic Boxes
5. Straight Tuck vs Reverse Tuck Boxes
6. Stand-Up Pouches vs Flat Bottom Bags
7. Rollstock Film vs Finished Pouches
8. Corrugated Mailer Boxes vs Shipping Cartons

The last page is deliberately a scope filter: it keeps broad corrugated-box language discoverable while excluding standard shipping cartons, master cartons, and RSC cases from the quote path.

Each page uses approved UPG product facts, visible side-by-side decisions, prefilled quote routing, FAQ and ItemList structured data, product and style cross-links, sitemap inclusion, and AI-readable catalog entries. The cluster is live from commit `961825e`; later production verification confirmed it inside the 76/76 live sitemap crawl.

## Zero-click query-to-page batch — production release, 2026-08-23

The latest available 90-day Search Console evidence shows 567 non-brand impressions and 0 non-brand clicks. Six existing commercial pages account for 443 of those impressions, or about 78.1%:

| Page | Non-brand impressions | Decision |
| --- | ---: | --- |
| `/cosmetics/lipstick-boxes` | 261 | Clarify lipstick outer cartons and filter primary components |
| `/cosmetics` | 67 | Define cosmetic outer-packaging scope and route three buying paths |
| `/applications/influencer-kits` | 53 | Sell ear-lock mailer manufacturing without implying fulfillment |
| `/packaging-styles/printed-rollstock-film` | 25 | Separate film-on-roll from finished pouches and machinery searches |
| `/cosmetics/serum-boxes` | 19 | Clarify serum outer cartons and filter bottles, formulas, and filling |
| `/samples/box-sample-kit` | 18 | Separate paid kit, free review, Mylar samples, and production enquiry |

The production release improves metadata, visible buyer routing, internal links, prefilled enquiry paths, ItemList structured data, AI-readable discovery files, and rendered SEO contracts on these pages. It does not create duplicate pages for every query variant, and it does not treat adjacent component, overwrap, fulfillment, or machinery impressions as valid UPG demand. Commits `20ff81a` and `8d46330` were deployed with Vercel success, 76/76 live sitemap proof, and 100 Lighthouse scores for accessibility, best practices, and SEO on the representative lipstick and box-sample pages. The detailed evidence and 28-day measurement rule are recorded in `docs/zero-click-opportunity-plan.md`.

## Five-product authority batch — production release, 2026-08-23

The five canonical product pages collectively produced 10 non-brand impressions and 0 clicks in the available 90-day Search Console window. A production crawl found 88–117 rendered inbound-link occurrences per product page, so this batch does not respond by adding more global links or duplicate URLs.

Instead, each money page receives a distinct visible buying-route section, product-specific search language, qualification boundaries, structured data, and conversion handoffs. The Products hub becomes one five-family catalog with explicit CollectionPage and ItemList schema. Commit `adfde6c` is live with exact-SHA Vercel success, 76/76 live sitemap proof, all five product contracts, all four AI discovery endpoints, and representative live Lighthouse scores of 100 for accessibility, best practices, and SEO. Full evidence, query rows, scope decisions, and the 28-day measurement rule are recorded in `docs/core-product-authority-plan.md`.

## Monthly volume completion path

When a Google Ads account is available:

1. Obtain the developer token from a Google Ads manager account.
2. Add OAuth scope `https://www.googleapis.com/auth/adwords` to the UPG automation credential.
3. Configure the Ads customer ID and, where required, manager login customer ID.
4. Call `KeywordPlanIdeaService.GenerateKeywordHistoricalMetrics` for the seed file in `docs/google-keyword-planner-seeds.csv`.
5. Record US, Canada, UK, and selected European markets separately instead of blending them into one misleading number.
6. Re-score the queue using average monthly searches, competition, and bid ranges without treating ad competition as organic-ranking difficulty.

Official references:

- <https://developers.google.com/google-ads/api/docs/keyword-planning/generate-historical-metrics>
- <https://developers.google.com/google-ads/api/docs/api-policy/developer-token>
- <https://developers.google.com/google-ads/api/docs/api-policy/access-levels>
- <https://support.google.com/google-ads/answer/7337243>

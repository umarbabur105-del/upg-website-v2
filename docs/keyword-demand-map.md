# UPG Keyword Demand and Competitor Gap Map

Last reviewed: 2026-09-04

## Evidence boundary

This map combines four currently verifiable signals:

1. A live Google Ads Keyword Planner US English historical-metrics snapshot from 2026-09-04.
2. UPG Search Console query and page evidence through 2026-09-01.
3. Public Teal Packaging sitemap coverage captured on 2026-08-13.
4. Commercial intent and exact fit with UPG's five approved product families.

Google approved and activated Basic Access for the UPG developer token on 2026-09-04. The OAuth `adwords` scope, Ads customer, manager login, API service, and developer token are configured. A production `GenerateKeywordHistoricalMetrics` request returned HTTP 200 with metrics, so the former monthly-volume blocker is closed.

Keyword Planner values are rounded planning estimates, not exact market size. Closely related keywords can overlap and must not be added together as unique demand. Google Ads competition and bid estimates describe paid-ad auctions; they are not organic-ranking difficulty scores.

## Current UPG search baseline

The fresh aggregate 90-day report covers Search Console data through 2026-09-01. It contains 1,129 total impressions, 597 correctly filtered non-brand impressions, 0 non-brand clicks, and 13 queries with observed average positions from 1 through 20. GA4 recorded 10 Organic Search sessions and 5 Organic Shopping sessions in the corresponding operating window. Four form starts and two `generate_lead` events were recorded across all channels; those events are not attributed to organic search without row-level attribution proof.

This confirms that discovery is expanding, but commercial non-brand click-through remains the immediate constraint. New comparison pages are therefore treated as buyer-decision assets and internal-link bridges, not as an instant traffic claim.

## Live US keyword demand snapshot

The approved seed set now contains 84 commercially relevant terms. Google returned non-zero average monthly search estimates for 72 terms. The table below records the highest-value existing-page mappings; it is intentionally not a recommendation to create one page per keyword.

| Keyword | Avg monthly searches | Ad competition | Existing target | Decision |
| --- | ---: | --- | --- | --- |
| custom boxes | 8,100 | High | `/` and `/products` | Strengthen the existing umbrella route; do not create a duplicate generic page |
| custom mylar bags | 3,600 | High | `/products/custom-mylar-bags` | P0 exact product-family opportunity |
| custom mailer boxes | 2,900 | High | `/products/custom-mailer-boxes` | P0 exact product-family opportunity |
| custom jewelry boxes | 2,900 | High | `/industries/custom-jewelry-boxes` | Use branded presentation-packaging qualifiers to filter consumer storage-box intent |
| custom packaging boxes | 2,400 | High | `/` and `/products` | P0 umbrella intent; improve existing routes only |
| cosmetic packaging | 1,900 | High | `/cosmetics` | P0 cluster opportunity with visible outer-packaging scope |
| custom printed boxes | 1,600 | High | `/` and `/products` | Support umbrella messaging without keyword stuffing |
| custom subscription boxes | 1,600 | High | `/applications/custom-subscription-boxes` | Keep mailer-manufacturing scope visible; exclude subscription-service intent |
| custom rigid boxes | 1,600 | Low | Magnetic and collapsible magnetic product pages | Use as a qualified parent term, not a promise that every rigid-box construction is offered |
| custom pouches | 1,000 | High | `/products/custom-mylar-bags` | Route broad flexible-packaging intent into finished-bag choices |
| custom product boxes | 1,000 | High | `/products` | Existing catalog hub, not a new thin page |
| custom soap boxes | 1,000 | Medium | `/industries/custom-soap-boxes` | P1 exact industry guide |
| custom candle boxes | 1,000 | Low | `/industries/custom-candle-boxes` | P1 exact industry guide |
| custom coffee bags | 880 | High | `/packaging-styles/coffee-bags` | Strengthen existing style page; do not create another coffee page |
| custom cereal boxes | 880 | High | `/industries/custom-cereal-boxes` | Strengthen existing seal-end application guide |
| custom packaging for small business | 720 | High | `/custom-packaging-pricing` | Address MOQ, artwork, sampling, and landed-quote expectations |
| custom perfume boxes | 480 | High | `/cosmetics/perfume-boxes` | Existing cosmetics subcategory |
| custom stand up pouches | 480 | High | `/packaging-styles/stand-up-pouches` | Existing style route; preserve finished-pouch scope |
| custom tuck boxes | 390 | Medium | `/products/custom-tuck-boxes` | P0 exact product-family opportunity |
| custom PR boxes | 320 | High | `/applications/custom-pr-boxes` | High commercial CPC; keep manufacturing separate from fulfillment |
| custom cosmetic boxes | 320 | Low | `/cosmetics` | Consolidate into the existing cosmetics hub |
| custom magnetic boxes | 260 | High | `/products/custom-magnetic-boxes` | P1 exact product-family opportunity |

High bid estimates reinforce commercial intent on several exact-fit terms: custom PR boxes averaged $28.04 CPC, custom influencer boxes $29.27, custom mailer boxes $21.96, custom printed boxes $20.40, custom packaging company $20.17, and custom rigid boxes $18.43. These figures do not justify paid spend by themselves; conversion measurement and landing-page fit remain required.

## Search Console and demand intersection

| Existing route | Fresh 90-day GSC evidence | Keyword Planner evidence | Priority decision |
| --- | --- | --- | --- |
| `/` and `/products` | Homepage: 64 non-brand impressions, position 45.6, 0 clicks | `custom boxes` 8,100; `custom packaging boxes` 2,400; `custom printed boxes` 1,600 | P0 improve umbrella relevance and buyer routing; no new generic page |
| `/products/custom-mylar-bags` | 0 measured impressions | `custom mylar bags` 3,600; `custom printed mylar bags` 320 | P0 diagnose discovery/internal relevance before adding content |
| `/products/custom-mailer-boxes` | 13 impressions, position 67.6, 0 clicks | `custom mailer boxes` 2,900 | P0 improve the existing money page and supporting application links |
| `/cosmetics` | 68 impressions, position 56.5, 0 clicks | `cosmetic packaging` 1,900; `custom cosmetic boxes` 320 | P0 strengthen outer-packaging clarity and commercial snippet language |
| `/cosmetics/lipstick-boxes` | 247 impressions, position 63.5, 0 clicks | `custom lipstick boxes` 140; `lipstick packaging` 110 | P0 preserve the existing route and filter primary-container/casing intent |
| `/products/custom-tuck-boxes` | 8 impressions, position 81.4, 0 clicks | `custom tuck boxes` 390 | P0 improve the existing exact product page |
| `/products/custom-magnetic-boxes` | 0 measured impressions | `custom magnetic boxes` 260; qualified parent `custom rigid boxes` 1,600 | P1 strengthen exact construction and presentation use cases |
| `/industries/custom-jewelry-boxes` | No measured top-page evidence | `custom jewelry boxes` 2,900 | P1 investigate intent and SERP composition before changing copy |

## Intent and scope safeguards

- `custom bags with logo` has 1,600 estimated searches but mixes totes, shopping bags, poly bags, and other products outside the approved Mylar scope. Do not target it as a core page.
- `custom jewelry boxes` and `custom subscription boxes` have substantial demand but mixed consumer/service intent. Existing pages must qualify manufacturing, branding, order quantity, and packaging construction.
- `lipstick packaging` includes primary containers, mechanisms, and casing intent. The existing page must remain explicitly about printed outer cartons.
- Zero-volume exact modifiers do not prove zero market demand. They should be consolidated under stronger parent pages rather than deleted or expanded into thin pages.
- Broad generic terms are highly competitive and expensive. They belong on the homepage or catalog hub, not on a network of near-duplicate landing pages.

## Approved next execution queue

1. Keep this phase read-only for the website: retain the current URL architecture and do not launch campaigns.
2. Prepare page-specific briefs for the six P0 targets above, using the existing title, H1, copy, internal links, schema, and quote routing as the starting point.
3. Review SERP intent for the mixed jewelry, subscription, rigid-box, and broad generic terms before any copy change.
4. After approval, update existing pages in one bounded batch and verify rendered metadata, schema, links, build, and live URLs.
5. Measure a clean 28-day Search Console and GA4 window; judge progress by qualified clicks, form starts, submitted leads, and CRM outcomes, not impressions alone.

## Bounded website integration — 2026-09-04

The source and rendered review found that the homepage, Mailer, Cosmetics, Lipstick, and Tuck pages already own their intended queries with one H1, indexable self-canonicals, visible scope boundaries, contextual links, and rendered JSON-LD. Those recently reviewed pages are not rewritten again from same-week data.

The bounded integration changes only two justified surfaces:

1. `/products` becomes the distinct catalog owner for `custom packaging boxes`, `custom printed boxes`, and product-format comparison intent. Its title, description, H1, CollectionPage description, and visible five-format decision guide now separate the catalog role from the manufacturer-led homepage.
2. `/products/custom-mylar-bags` retains the exact `custom Mylar bags` H1 while its title and opening product description add the broader `printed pouches` parent intent. The page still separates finished bags from printed rollstock and does not imply compatibility or regulatory approval.

No URL, product family, planning MOQ, quote route, analytics event, Merchant configuration, WithUPG attribution, or product/offer schema is changed in this batch. The rendered SEO gate now protects the Products catalog ownership and format-decision module.

### Local production-candidate proof

- ESLint and TypeScript passed.
- All 32 focused Python and Node regression checks passed.
- The Next.js production build compiled and generated 112 pages.
- The rendered SEO audit passed 91 canonical static sitemap pages; one dynamic sitemap page remains a runtime-only check.
- Local browser verification confirmed the Products title is 50 characters, its description is 137 characters, it has one H1, five visible format-decision cards, CollectionPage and ItemList JSON-LD, a production canonical, and no horizontal overflow at desktop or 390-pixel mobile viewports.
- Local mobile verification confirmed the Mylar title is 56 characters, its description is 150 characters, it has one H1, Service, BreadcrumbList, FAQPage, and ItemList JSON-LD, the intended production canonical, and no horizontal overflow.
- The checked local pages produced no browser-console warnings or errors.

This proof applies only to the isolated local production candidate. No push, deployment, recrawl request, indexing change, ranking, traffic, or lead is claimed.

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

The production release added one visible comparison hub plus eight distinct buyer guides:

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

## Commercial industry-hub completion — production release, 2026-08-25

The industry navigation now maps six multi-guide markets to dedicated overview pages. Three new hubs consolidate already-published guides instead of creating keyword-variant product pages:

| Hub | Existing guides consolidated | Product families kept in scope |
| --- | --- | --- |
| `/industries/fashion-jewelry-luxury-packaging` | Apparel, jewelry, and a contextual luxury-gift path | Magnetic and collapsible magnetic boxes |
| `/industries/electronics-consumer-goods-packaging` | Electronics, retail products, games, toys, and collectibles | Tuck, ear-lock mailer, magnetic, and collapsible magnetic boxes |
| `/industries/home-candle-gift-packaging` | Candle and luxury gift boxes | Tuck, magnetic, and collapsible magnetic boxes |

This follows the earlier competitor-coverage proxy for gift, candle, jewelry, retail, electronics, apparel, and toy intent while keeping the five approved product families unchanged. Pet Products stays on the industry index with its existing guide; a one-child hub is not published.

Commit `ee942ce` released the three hubs with exact-SHA Vercel success and 85/85 live sitemap URLs returning HTTP 200. Fresh Search Console URL Inspection on 2026-08-30 reports 83 of 85 indexed. `/industries/beauty-personal-care-packaging` remains unknown to Google and `/industries/supplement-packaging` is discovered but not indexed; neither URL is treated as indexed until the API confirms it.

## Packing calculator authority asset — released 2026-08-30, archived 2026-09-01

The calculator was released as a practical planning asset, then archived after
review showed that its assembled-item and master-carton model did not reliably
represent UPG products commonly shipped flat, folded, collapsed, or nested. The
former route now permanently redirects to the tools hub and is excluded from
active sitemap and discovery surfaces. Historical release proof remains in Git
history and `docs/archived-tools.md`; the tool must not be treated as a current
keyword target.

## Monthly volume refresh path

The former access blocker is complete. Refresh US evidence with:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 scripts/google-keyword-demand.py --market US --format markdown
```

Canada and the United Kingdom are supported as separate runs with `--market CA` and `--market GB`. Do not blend countries into one market-size number. Re-score decisions using average monthly searches, commercial fit, Search Console evidence, and conversion outcomes without treating ad competition as organic-ranking difficulty.

Official references:

- <https://developers.google.com/google-ads/api/docs/keyword-planning/generate-historical-metrics>
- <https://developers.google.com/google-ads/api/docs/api-policy/developer-token>
- <https://developers.google.com/google-ads/api/docs/api-policy/access-levels>
- <https://support.google.com/google-ads/answer/7337243>

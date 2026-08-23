# UPG Core Product Authority Plan

Last reviewed: 2026-08-23

## Objective

Make the five approved product pages the clearest commercial sources for UPG's actual manufacturing offer, without publishing thin keyword variants or unsupported technical claims.

## Evidence boundary

Search Console evidence from 2026-05-23 through 2026-08-20 shows that the five core product pages have almost no non-brand search visibility:

| Core page | Clicks | Impressions | Weighted position | Observed query evidence |
| --- | ---: | ---: | ---: | --- |
| `/products/custom-tuck-boxes` | 0 | 3 | 75.0 | custom tuck boxes wholesale, tuck in box manufacturers, tuck mailer boxes |
| `/products/custom-mailer-boxes` | 0 | 5 | 68.4 | ear lock mailer box, custom ear lock mailer boxes, ear lock mailer |
| `/products/custom-magnetic-boxes` | 0 | 0 | No evidence | No measured query evidence yet |
| `/products/custom-collapsible-magnetic-boxes` | 0 | 2 | 67.5 | collapsible box with magnetic flap |
| `/products/custom-mylar-bags` | 0 | 0 | No evidence | No measured query evidence yet |

A rendered crawl of the 76-page production sitemap found 88–117 inbound-link occurrences for every core product page. Each page also already linked to 17–25 distinct product, style, application, comparison, industry, sample, or tool routes.

The immediate on-site weakness is therefore not a raw shortage of links. It is the absence of a concise, product-specific route that separates the manufactured product from adjacent or ambiguous searches and carries the buyer into the correct next action.

## Production release

Commit `adfde6c` released this batch to production. It keeps the five existing canonical product URLs and adds no thin landing pages.

1. Every core product page receives a visible buyer-intent bridge with four distinct routes.
2. Tuck and mailer pages preserve broad corrugated language while explicitly excluding regular shipping cartons, master cartons, and RSC cases.
3. Magnetic and collapsible pages separate assembled and fold-flat structures without making an unsupported cost-saving claim.
4. Mylar separates finished pouches, printed rollstock, format comparisons, and out-of-scope filling or converting machinery.
5. Magnetic, collapsible, and Mylar pages receive reviewed search terms and a product-specific buyer-decision FAQ.
6. The Products hub becomes one five-product catalog with CollectionPage and ItemList structured data instead of splitting the catalog into two arbitrary visual groups.
7. Product cards replace repeated production-timing text with a concise best-fit application.
8. AI discovery expands the same visible buyer routes through `llms.txt`, `llms-full.txt`, `agents.md`, and product-catalog schema version 2.3.
9. The rendered SEO gate requires all five product pages, the five-product hub, Service, BreadcrumbList and FAQPage schema, contextual authority links, buyer-intent JSON-LD, scope markers, and prefilled enquiry paths.
10. The aggregate weekly organic report keeps a fixed five-page visibility scoreboard, including pages with zero impressions, so early movement cannot disappear behind a top-pages cutoff.

## Measurement rule

After the 2026-08-23 production release, compare full 28-day windows for:

1. Non-brand impressions, clicks, click-through rate, and average position for each core product URL.
2. Queries that move from a style, application, or comparison page into a core product page.
3. Organic enquiry starts, successful submissions, and qualified-lead rate by product family.
4. New query mismatches that require a visible scope correction instead of another page.

Release proof passed for the exact commit: Vercel deployment success, 76/76 live sitemap URLs returning HTTP 200, all five product contracts, all four AI discovery endpoints, and live Lighthouse scores of 100 for accessibility, best practices, and SEO on the Products hub, tuck-box page, and Mylar page.

This batch cannot replace external authority. Outreach remains paused by owner instruction, so no ranking or lead guarantee is attached to the release.

# Heavy SEO Sprint 1 — Low-MOQ and Priority Industry Intent

Last reviewed: 2026-09-03

## Objective

Improve the owned website for high-intent custom-packaging searches without
waiting for Merchant Center, creating thin keyword variants, or changing the
five approved product families. Product and packaging-style pages remain the
source of truth; commercial and industry pages translate those facts into
clear buyer decisions.

## Evidence boundary

- The existing 2026-09-02 Search Console closure confirms that the Beauty and
  Supplement industry hubs were submitted and indexed at that check.
- The 2026-09-03 Google API health check could not refresh current performance
  data because the saved operator credential returned `invalid_grant` with an
  `invalid_rapt` reauthentication requirement. No older impressions, clicks,
  positions, indexing status, or leads are presented as current evidence.
- A fresh public search check covered `custom packaging boxes low MOQ`,
  `custom boxes minimum order 250`, `custom supplement packaging`, and
  `custom cosmetic packaging boxes`. UPG did not appear in the returned result
  set. Visible competing pages led with the exact category, starting quantity,
  specifications, or a direct quote path.
- Competitor statements were used only as a result-page pattern check. Their
  prices, turnaround times, reviews, certifications, and scope were not copied
  or treated as UPG facts.

## Changes in this sprint

1. `/custom-packaging-pricing` owns the low-MOQ query theme with a precise
   250-unit title, H1, description, first-paragraph answer, and four compact
   cards explaining what the planning minimum does and does not mean.
2. The pricing FAQ answers whether a buyer can order 250 units and clarifies
   that separate sizes, structures, or artworks must not be assumed to combine
   into one minimum.
3. `/industries/beauty-personal-care-packaging` targets beauty packaging boxes
   for retail products, PR kits, and premium sets while keeping tuck, mailer,
   magnetic, and collapsible product sources authoritative.
4. `/industries/supplement-packaging` targets supplement boxes, pouches, and
   rollstock while keeping tuck-box and Mylar-family sources authoritative.
5. The two regulated-market pages link to the relevant official FDA labeling
   guide as a buyer reference. UPG still does not create or approve regulatory
   copy, compatibility, or market approval.
6. The rendered SEO gate protects the new titles, direct answers, variant-MOQ
   boundary, and official-source links from silent regression.
7. The Markdown guide, `llms.txt`, `llms-full.txt`, `agents.md`, and product
   catalog now repeat the same MOQ clarification and official buyer sources.
   The additive catalog contract is versioned as `3.1`.

## Truth and conversion rules

- The 250-unit figure is a planning MOQ, not a fixed unit price.
- Custom production remains quote-led and human reviewed.
- No review, rating, client story, certification, customer photograph, public
  dieline, material-suitability claim, or regulatory approval is invented.
- Copy stays compact and decision-led; existing product visuals remain the
  visual explanation of the approved styles.
- Publication can improve relevance and extractability but cannot prove a
  ranking, AI citation, recommendation, or lead.

## Source references

- FDA Cosmetics Labeling Guide:
  <https://www.fda.gov/cosmetics/cosmetics-labeling-regulations/cosmetics-labeling-guide>
- FDA Dietary Supplement Labeling Guide:
  <https://www.fda.gov/food/dietary-supplements-guidance-documents-regulatory-information/dietary-supplement-labeling-guide>

## Release gate

Before release, require ESLint, TypeScript, all regression tests, a fresh
production build, the rendered SEO audit, desktop and mobile browser review,
and a diff check. After owner approval to push, require exact remote-main SHA,
Vercel production readiness, live canonical-page checks, and recrawl
notification. Those later steps do not prove indexing or ranking.

## Local production-candidate proof

- ESLint passed with no reported errors.
- TypeScript passed after removing three exact-hash duplicate files from the
  generated `.next/types` cache. The duplicates were not source files.
- All 28 regression checks passed across MOQ, form security, format finder,
  quote-form UX, regional analytics consent, and aggregate organic reporting.
- The Next.js production build compiled, type-checked, and generated 111 pages.
- The rendered SEO audit passed 90 canonical static sitemap pages and reported
  one dynamic sitemap route for runtime verification.
- Runtime checks passed for the pricing Markdown, `llms.txt`, `llms-full.txt`,
  `agents.md`, and product-catalog JSON. The catalog returned schema `3.1`,
  four MOQ clarifications, and one official reference for each regulated hub.
- Desktop browser proof on the pricing page found one H1, the intended title
  and description, four equal-height MOQ cards, and no horizontal overflow.
- Mobile proof at the browser's 360-pixel content width found the four MOQ
  cards stacked inside the viewport with no horizontal overflow.
- Desktop and mobile proof on both priority industry hubs found one H1, the
  intended title, visible official FDA links, the `2026-09-03` review date,
  complete image alternative text, and no horizontal overflow.
- The local browser console returned no warnings or errors across the checked
  pages.

This proof applies only to the local production candidate. No commit, push,
deployment, live-page change, recrawl notification, ranking, citation, or lead
is claimed by this document.

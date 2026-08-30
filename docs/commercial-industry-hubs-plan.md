# UPG Commercial Industry Hubs

Last reviewed: 2026-08-30

## Objective

Turn the strongest multi-guide industry groups in UPG's visible navigation into useful search landing pages without adding product styles, thin keyword variants, or unsupported technical claims.

## Evidence and restraint

- Search Console for 2026-07-25 through 2026-08-21 recorded 408 impressions, 291 non-brand impressions, 3 total clicks, and 0 non-brand clicks.
- Previously recorded competitor coverage is strongest around gift, candle, retail, jewelry, electronics, apparel, and related presentation-box terms.
- UPG already has reviewed guides for these applications. The missing layer is a market-level page that helps a buyer choose among the current five product families.
- Lipstick and cosmetics pages were materially changed on 2026-08-24 and need a full 28-day comparison window before another rewrite.

## Published hubs

1. Fashion, Jewelry & Luxury Packaging
   - Magnetic and collapsible magnetic boxes
   - Apparel and jewelry guides
   - Contextual luxury-gift and fixed-versus-collapsible decisions
2. Electronics & Consumer Goods Packaging
   - Tuck, corrugated ear-lock mailer, magnetic, and collapsible magnetic boxes
   - Electronics, retail, and games/toys/collectibles guides
   - Explicit exclusion of standard shipping cartons, master cartons, and RSC cases
3. Home, Candle & Gift Packaging
   - Tuck, magnetic, and collapsible magnetic boxes
   - Candle and luxury-gift guides
   - Retail-carton versus premium-presentation decision path

Pet Products remains a section on `/industries` with its existing guide. A separate hub is deferred until it can answer more than the same single buyer path.

## Production and indexing status

- Commit `ee942ce` was released with exact-SHA Vercel success.
- The production sitemap contained 85 canonical URLs and all 85 returned HTTP 200 at release verification.
- Fresh Search Console URL Inspection on 2026-08-30 reports 83 of 85 URLs indexed.
- `/industries/beauty-personal-care-packaging` is unknown to Google.
- `/industries/supplement-packaging` is discovered but not indexed.
- Both pending URLs are live, canonical, allowed for indexing, and remain explicit follow-ups rather than being reported as indexed.

## Search and conversion contract

Every published hub must have:

- unique title, description, H1, and canonical URL;
- CollectionPage, ItemList, BreadcrumbList, and FAQPage structured data;
- direct discovery from `/industries` and the By Industry navigation;
- contextual paths into current product and application pages;
- a prefilled quote handoff;
- matching sitemap and AI-discovery coverage;
- no new product style, fixed custom-production price, or unsupported certification or compatibility claim.

## Measurement

Compare full 28-day windows after production release for non-brand impressions, clicks, average position, enquiry starts, successful leads, and qualified outcomes by landing page. Do not treat same-day indexing or early impressions as a ranking result.

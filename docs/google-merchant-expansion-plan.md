# Google Merchant Audit and Expansion Plan

Last verified: 2026-08-21

This document defines the safe operating model for Universal Packaging Group in Google Merchant Center. It separates directly purchasable sample products from custom production work that requires a project-specific quotation.

No Merchant product, feed, or account setting was changed during this audit. The production sample-kit checkout was repaired after live diagnostics identified a Stripe compatibility error.

## Decision

Use a hybrid acquisition model:

1. **Google Merchant Center:** advertise only real, fixed-price physical sample products that can be purchased at the submitted price.
2. **Organic search and AI discovery:** promote the five custom-production families through accurate product pages, technical content, structured metadata, and quote conversion paths.

Do not submit a dummy price, deposit, component price, or unsupported "starting at" price for a custom production order. Google requires the submitted price to match the landing page and checkout price, and customized products sold in minimum quantities must show the full price for the minimum purchasable quantity.

Official references:

- [Google price requirements](https://support.google.com/merchants/answer/6324371?hl=en)
- [Price mismatch policy](https://support.google.com/merchants/answer/12159029?hl=en)
- [Customized product requirements](https://support.google.com/merchants/answer/7162856?hl=en)
- [Abuse of the ad network](https://support.google.com/merchants/answer/13641286?hl=en)
- [Landing-page requirements](https://support.google.com/merchants/answer/4752265?hl=en)

## Current Merchant Center snapshot

| Area | Verified state |
| --- | --- |
| Merchant account | `5837241168` — Universal Packaging Group |
| Primary data source | `10705133304` — `PRODUCTS SOURCE 1` |
| Feed URL | `https://universalpackaginggroup.com/feeds/google-merchant.tsv` |
| Destination | Free listings |
| Feed label | `SAMPLE_KITS` |
| Latest file processing | Succeeded; 2 items processed |
| Processed products | 2 |
| Target markets | United States, Canada, United Kingdom, and 29 supported European countries |
| Shipping | USD 0; 0–1 handling day plus 3–6 transit days |
| Account-level issues | None returned by the Merchant API at audit time |
| Product status | Both products approved for Free Listings in all 32 configured countries; no item-level issue returned |
| Performance data | No impressions, clicks, or conversions returned for 2026-08-11 through 2026-08-20 |
| Conversion sources | GA4 property `548846712` linked and `ACTIVE` |
| Claimed website | `https://universalpackaginggroup.com` |
| Customer service details | Support URL, `quotes@universalpackaginggroup.com`, and `+1 786 885 8825` are configured |
| Business phone | Separate account-level phone is absent and the verification state is `UNVERIFIED` |

The initial Free Listings review is complete. The Merchant API now returns all 32 configured countries under `approvedCountries` for both products and returns no item-level issue. Approval confirms eligibility; it does not guarantee impressions, clicks, or leads.

## Current product audit

| Merchant product | Submitted offer | Result |
| --- | --- | --- |
| `upg-box-sample-kit-001` — UPG Custom Box Sample Kit | USD 19.99, in stock, shipping included | Approved for Free Listings in all 32 configured countries. Feed, landing page, initial-HTML Product/Offer schema, and Stripe checkout use the same price and availability. |
| `upg-mylar-bag-sample-kit-001` — UPG Mylar Bag Sample Kit | USD 19.99, in stock, shipping included | Approved for Free Listings in all 32 configured countries. Feed, landing page, initial-HTML Product/Offer schema, and Stripe checkout use the same price and availability. |

Both products are physical paid sample kits. They are not quote placeholders, custom-order deposits, or partial prices. The full USD 19.99 is also credited toward a later UPG production order, but the customer receives the sample kit even if no production order follows.

## What is already strong

- Product, feed, structured data, and checkout values are generated from the same sample-kit source.
- Each kit has its own SKU, Merchant ID, landing page, image, content boundary, and Stripe checkout flow.
- Box and flexible-packaging samples remain separate products.
- The customer can buy at the submitted USD 19.99 price without requesting a quotation.
- Shipping terms are consistent across the product pages, structured data, checkout, feed markets, and Merchant account.
- The product offer and structured data are present in the landing page's initial HTML.
- Feed URLs include source attribution for Google organic Shopping traffic.

## Risks and required actions

| Priority | Risk | Required action |
| --- | --- | --- |
| P0 | Both products are approved but Merchant performance reports still return no impressions, clicks, or conversions. Approval alone does not create distribution. | Keep the compliant offers stable, monitor fetch and performance data, and improve only accurate titles, images, taxonomy, and supporting authority after a measured baseline exists. |
| P0 | The protected Stripe sandbox lane is now proven end to end without a real charge: a USD 19.99 test payment completed with `livemode=false`, the webhook recovered to HTTP 200, the order was stored in CRM as `Stripe Test Order` / `Spam` / `System Test`, and the test-only notification reached the UPG inbox. Live payment and physical fulfillment remain deliberately unproven. | Keep live payment testing approval-gated. Before accepting public orders, confirm that the physical kit, stock, packing, courier handoff, and customer communication can fulfill the exact Merchant promise; then separately approve the first live order. |
| P1 | Repeated audit requests from the operator environment observed roughly 20–21 seconds of server wait before the first byte, despite a Vercel cache hit. PageSpeed also produced intermittent document-request failures. The latest authenticated PageSpeed run succeeded with a mobile score of 83, so the slow operator path is not proof of worldwide latency. | Monitor PageSpeed and Merchant fetches, then re-test from independent regions before expanding the feed. Treat repeated Google-side fetch failures as a release blocker. |
| P1 | The GA4 `purchase` event previously sent transaction, currency, value, SKU, and name but not the recommended ecommerce `items` array. | The standard `items` payload is implemented and has passed TypeScript, ESLint, and production-build verification. Sandbox checkout uses the separate `stripe_test_purchase` event so it cannot pollute real revenue; confirm that event in GA4 after reporting latency before treating analytics delivery as proven. |
| P1 | Current Merchant images are AI-generated representations. A product image must accurately represent what is shipped, and visual mismatch can reduce approval confidence and conversion quality. | Use real photographs of the completed physical kits as soon as fulfillment-ready samples exist. Until then, keep landing-page disclosures and do not promise unguaranteed contents. |
| P2 | Customer-service contacts are complete, but the separate account-level business phone remains absent/unverified. Merchant API v1 exposes that phone as output-only and does not accept it in the update mask. | Complete phone verification in Merchant Center UI when convenient; this is not a feed or product-approval blocker. |
| P2 | Google's automatic category placed the box kit under `Office Supplies`; the Mylar kit has no automatic level-one category yet. | Do not change taxonomy during initial review. After approval, test the nearest accurate taxonomy only if it improves classification without attracting master-carton enquiries. |

## Five-family Merchant expansion

The end state can contain one fixed-price sample product for each UPG production family, but only when each sample is a genuinely different physical item with its own guaranteed fulfillment contract.

| Family | Safe Merchant product | Required boundary |
| --- | --- | --- |
| Tuck Boxes | Tuck Box Sample Pack | Finished tuck-box samples only; state the guaranteed styles and finishes actually shipped. |
| Mailer Boxes | Corrugated Ear-Lock Mailer Box Sample Pack | Ear-lock presentation/mailer structures only. Explicitly exclude RSC shipping cartons, master cartons, and commodity shipping cartons. |
| Magnetic Boxes | Magnetic Rigid Box Sample | A finished non-collapsible rigid magnetic box sample with the structure accurately shown. |
| Collapsible Magnetic Boxes | Collapsible Magnetic Box Sample | A finished flat-shipping collapsible magnetic box sample with the correct foldable structure accurately shown. |
| Mylar Bags | Mylar Bag Sample Kit | Keep the current five guaranteed formats unless the physical kit changes. |

For every new Merchant product, all of the following must exist before feed submission:

- a unique SKU and stable Merchant ID;
- genuinely different physical contents from every other listed product;
- a fixed full price approved for that exact sample product;
- a dedicated landing page and direct checkout at that price;
- a product image that accurately represents the shipped item;
- exact title, description, contents, availability, delivery, and return terms;
- matching Product/Offer structured data in initial HTML;
- matching feed, shipping policy, checkout, and CRM attribution;
- an order-fulfillment process that can deliver what the listing promises.

### Transition from the current two products

The existing Box Sample Kit is an umbrella product covering several finished box structures. When the four family-specific box sample products are physically ready, choose one of these valid models:

1. Replace the umbrella Box Sample Kit with four distinct family sample products, leaving five Merchant products in total including Mylar; or
2. Retain the umbrella kit only if it remains a genuinely separate mixed assortment with distinct contents and customer value, resulting in six Merchant products.

Do not create four keyword variants that lead to the same Box Sample Kit and identical fulfillment. That would create duplicate, misleading offers rather than additional products.

## Custom production pages outside Merchant Center

The five production families should remain quote-led because size, style, material, quantity, printing, finishes, and other specifications change the price. Their acquisition path is:

1. Search- and AI-readable family page.
2. Accurate variants, use cases, material/finish choices, and MOQ guidance approved by UPG.
3. Clear worldwide custom-production positioning.
4. Quote form with product-family attribution.
5. CRM capture and follow-up.

Do not add a fixed Product Offer price to these custom-production pages unless UPG creates an exact, directly purchasable standard SKU.

## Conversion and reporting plan

The Merchant Conversions v1 API supports linking an existing GA4 property by creating a Google Analytics conversion source. The live link created on 2026-08-11 is:

- Merchant account: `5837241168`
- GA4 property: `548846712`
- State: `ACTIVE`
- Controller: `MERCHANT`
- Attribution: cross-channel data-driven, 90-day lookback
- Reported conversions: `purchase`, `generate_lead`, `qualify_lead`, and `close_convert_lead`

Official API reference: [Manage Merchant conversion sources](https://developers.google.com/merchant/api/guides/conversion-sources/overview)

The API link is complete. Remaining verification after the local analytics change is released:

1. sample-kit purchases carry transaction ID, value, currency, and item data;
2. Merchant reports begin returning impressions, clicks, and conversions after products are approved and traffic arrives;
3. CRM entries preserve `utm_source=google`, `utm_medium=organic_shopping`, and `utm_campaign=merchant_free_listings`.

## Release gates

No family-specific Merchant product should be submitted until every gate is green:

1. Current two-product initial review has completed. **Green as of 2026-08-21.**
2. Crawl and landing-page response reliability has been independently verified.
3. Exact physical kit contents and fixed price have UPG approval.
4. Product image has visual approval and accurately represents the shipped sample.
5. Feed, page, structured data, checkout, shipping, and returns are identical in substance.
6. Test checkout reaches a successful Stripe test payment without changing production data.
7. Merchant API preview/audit returns no deterministic mismatch.
8. Live submission receives explicit approval.

## Competitive claims

A competitor's public Shopping presence does not reveal its complete Merchant feed or prove that a visible price is deliberately false. Without access to its account or feed, exact product count and policy state cannot be confirmed. UPG should not copy an apparent pricing bypass: current visibility is not evidence of long-term compliance, and price mismatch or review circumvention can lead to product disapproval or account suspension.

The defensible advantage is a compliant fixed-price sample catalog that generates qualified leads, followed by accurate quote-led custom production pages for the higher-value order.

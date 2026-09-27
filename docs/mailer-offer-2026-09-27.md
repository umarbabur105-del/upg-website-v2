# Mailer commercial offer consistency

The buyer flow is an existing mailer product or application page → clear ordering facts and cost comparisons → the existing quote form with the selected product and optional comparison brief.

`src/data/mailer-offer.ts` supplies the mailer ordering summary, Service properties, JSON catalog, TSV reference and Markdown discovery files. `mailerCommercialTerms` in `src/data/products.ts` also supplies the visible FAQ and its markup. Umar clarified the benchmark-derived offer on 2026-09-27: shipping is part of the quoted cost, revisions concern design/proof files, and production duration starts with approval of the final design file. The offer uses:

- A 250-unit planning minimum, with 250/500/1,000 quantity comparisons on the same specification.
- An initial-response target of one business day; final pricing can require specification review.
- Free dieline, basic artwork preparation/checks, a digital proof file and two rounds of design-file revisions. This describes file preparation and revision, not physical samples or production reruns.
- Standard production takes approximately seven business days after the customer approves the final design file; complex/high-volume work can take longer. Qualified rush jobs may take four to seven business days from the same approval point, subject to capacity, specification and any rush charge. Production duration excludes shipping.
- Shipping costs are included in the quoted total for the agreed destination and service; this is not a free-shipping offer. Estimated standard US transit remains two to five business days after dispatch, subject to destination/service confirmation. The quote specifies duty/tax inclusion and any additional charges. Sample-kit delivery timing is not used for custom production.

The product page adds three optional quote handoffs for kraft/white exterior print, inside/outside printing and fitted inserts. Four existing mailer application pages show a compact summary; the pricing page shows the complete summary. Quote validation and required fields are unchanged. Other custom product families retain their existing summaries.

The existing 250-unit minimum and sample-kit offer remain. No competitor unit price, certification, manufacturing location or fulfillment service is copied. There is no defined UPG configuration supporting Teal's generic bulk price. The general TSV catalog is a discovery reference, not an approved Google or OpenAI shopping feed.

Commercial benchmark references, checked 2026-09-27:
- https://tealpackaging.com/product/mailer-boxes/
- https://tealpackaging.com/product/custom-corrugated-mailer-boxes/
- https://tealpackaging.com/rush-order/

Acceptance: production build, TypeScript, lint, relevant discovery/quote regression tests, rendered SEO audit, visible HTML/catalog/Markdown/TSV parity, accurate quote context, and desktop/mobile browser checks. Deployment, recrawl notification, search indexing and traffic are separate outcomes. Detailed verification logs remain outside the repository.

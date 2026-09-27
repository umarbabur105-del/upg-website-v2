# Mailer commercial offer consistency

The buyer flow is an existing mailer product or application page → clear ordering facts and cost comparisons → the existing quote form with the selected product and optional comparison brief.

`src/data/mailer-offer.ts` supplies the mailer ordering summary, Service properties, JSON catalog, TSV reference and Markdown discovery files. `mailerCommercialTerms` in `src/data/products.ts` also supplies the visible FAQ and its markup. Umar instructed the team to adopt Teal's normal/rush timing, support and shipping offer on 2026-09-27; those are owner-selected UPG policies, not an independent verification of production capacity. The offer uses:

- A 250-unit planning minimum, with 250/500/1,000 quantity comparisons on the same specification.
- An initial-response target of one business day; final pricing can require specification review.
- Free dieline, basic artwork preparation/checks, a digital proof and two revision rounds.
- Eligible standard production from approximately seven business days after proof approval and order confirmation; complex/high-volume work can take longer. Qualified ready-to-print rush jobs may take four to seven business days, subject to capacity, specification and any rush charge.
- Standard US shipping included, with approximate two-to-five-business-day transit after dispatch and final destination/service confirmation. Expedited/international freight, duties and taxes are identified separately. Sample-kit delivery timing is not used for custom production.

The product page adds three optional quote handoffs for kraft/white exterior print, inside/outside printing and fitted inserts. Four existing mailer application pages show a compact summary; the pricing page shows the complete summary. Quote validation and required fields are unchanged. Other custom product families retain their existing summaries.

The existing 250-unit minimum and sample-kit offer remain. No competitor unit price, certification, manufacturing location or fulfillment service is copied. There is no defined UPG configuration supporting Teal's generic bulk price. The general TSV catalog is a discovery reference, not an approved Google or OpenAI shopping feed.

Commercial benchmark references, checked 2026-09-27:
- https://tealpackaging.com/product/mailer-boxes/
- https://tealpackaging.com/product/custom-corrugated-mailer-boxes/
- https://tealpackaging.com/rush-order/

Acceptance: production build, TypeScript, lint, relevant discovery/quote regression tests, rendered SEO audit, visible HTML/catalog/Markdown/TSV parity, accurate quote context, and desktop/mobile browser checks. Deployment, recrawl notification, search indexing and traffic are separate outcomes. Detailed verification logs remain outside the repository.

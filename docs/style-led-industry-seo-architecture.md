# Style-Led Industry SEO Architecture

Last reviewed: 2026-09-01

## Source-of-truth rule

UPG's current product and packaging-style pages define what can be offered.
Industry pages are an SEO and buying-context layer around those approved
sources. An industry page may explain where a style is used, what the buyer
should compare, and which project details matter; it must not create a new
structure, material claim, MOQ, or production promise.

The authority model is:

1. Product family controls the commercial and manufacturing boundary.
2. Packaging style controls the structural or flexible-format vocabulary.
3. Industry hub controls broad market intent.
4. Industry detail controls one market or application keyword theme.
5. Buyer guide answers supporting questions and links back to the commercial
   source.

User journeys remain reciprocal. A buyer may start from an industry or a style,
but every route must resolve back to the same approved source data.

## Keyword ownership

| Layer | Owns | Example | Must not target |
| --- | --- | --- | --- |
| Product family | Broad commercial product intent | custom tuck boxes | Every industry variation |
| Packaging style | Exact format and structure intent | seal-end boxes | Cereal, snack, pet, or beauty terms as its primary target |
| Industry hub | Broad market intent | food and beverage packaging | Exact style terms already owned by style pages |
| Industry detail | Style-plus-use-case intent | custom cereal boxes | Generic seal-end-box ranking intent |
| Buyer guide | Question and decision intent | how custom packaging ships | Transactional product intent |

This split prevents the style page and its industry children from competing for
the same primary query. Industry pages can name and link the style naturally,
while the canonical style page retains the full structural explanation.

## Current approved style-to-industry map

| Source style | Approved industry/application paths |
| --- | --- |
| Straight tuck end | Retail products; games, toys, and collectibles |
| Reverse tuck end | Retail products; games, toys, and collectibles |
| Auto-lock bottom | Retail products; games, toys, and collectibles |
| Interlock | Retail products; games, toys, and collectibles |
| Seal end | Cereal; retail products; snacks and confectionery; games, toys, and collectibles |
| Stand-up pouch | Food; supplements; pet food and treats; snacks and confectionery |
| Flat-bottom bag | Food; supplements; pet food and treats; snacks and confectionery |
| Three-side-seal bag | Food; supplements; pet food and treats; snacks and confectionery |
| Spout pouch | Food; beverage |
| Child-resistant bag | Supplements |
| Coffee bag | Food and beverage |
| Printed rollstock film | Food; supplements; pet food and treats; snacks and confectionery |

Mailer, magnetic, and collapsible-magnetic industry paths currently resolve to
their canonical product-family sources because UPG has not approved separate
nested style pages for those families. The site must not invent those pages only
to increase URL count.

## Implementation contract

- Every industry page must link to its approved product source.
- When a reviewed nested style exists, the industry page must link to it.
- Every nested style page must link back to at least one approved industry
  application and expose those relationships in ItemList structured data.
- AI-readable sources must expose both directions: style to industry and
  industry to approved style URLs.
- Any unknown style slug, missing parent product, or style with no approved
  industry application must fail the build-time data contract.
- Titles, H1s, descriptions, and main copy must preserve one primary keyword
  owner per page.
- No public dielines, fabricated reviews, customer stories, or unsupported
  suitability claims may be added to close a content gap.

## Production release proof

Implementation commit `c16c6ca9f900c0659653ff963c98ce58f34903c8`
reached remote `main`. Vercel production deployment
`dpl_UY3DmoiCEAmQj5JxrTGYRQkr8Foi` reached Ready for that release, and the
canonical domain and public production alias both resolved to it.

Fresh proof established:

- ESLint, TypeScript, 12 regression tests, and the 111-page Next.js production
  build passed;
- the rendered SEO audit passed all 12 reciprocal style-industry contracts;
- the local production runtime returned HTTP 200 for all 91 sitemap URLs;
- rendered browser checks passed for the industries hub, seal-end style, and
  spout-pouch style with one H1, reciprocal links, ItemList data, complete image
  alternatives, and no horizontal overflow;
- representative mobile Lighthouse scored 97 performance and 100 for
  accessibility, best practices, and SEO, with zero CLS and zero blocking time;
- the exact public production alias returned HTTP 200 for all 91 sitemap URLs;
- canonical style, industry, sitemap, and product-catalog URLs returned complete
  HTTP 200 responses with the new relationships;
- product catalog schema 2.9 returned valid JSON with 12 style-to-industry lists
  and 15 industry-to-style lists;
- `www` permanently redirected the representative style URL to the apex URL
  with HTTP 308;
- IndexNow accepted the 12 style pages, industries hub, and beverage guide in a
  14-URL submission with HTTP 200.

The Cloudflare edge again delayed initial bytes by about 21-22 seconds during
canonical verification, while the direct production alias responded in about
1-3 seconds. That latency remains an operations follow-up. Publication does not
prove indexing, ranking, AI citation, recommendation, or leads.

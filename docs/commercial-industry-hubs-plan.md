# UPG Commercial Industry Hubs

Last reviewed: 2026-09-01

## Objective

Turn UPG's reviewed styles into visual, commercially useful industry clusters without changing product URLs, inventing product styles, publishing thin keyword variants, or adding unsupported technical claims. Product and style pages remain the manufacturing source of truth; industry pages provide market-specific buying context and keyword ownership around them.

## Evidence and restraint

- Search Console for 2026-07-25 through 2026-08-21 recorded 408 impressions, 291 non-brand impressions, 3 total clicks, and 0 non-brand clicks.
- Previously recorded competitor coverage is strongest around gift, candle, retail, jewelry, electronics, apparel, and related presentation-box terms.
- UPG already has reviewed guides for these applications. The missing layer is a market-level page that helps a buyer choose among the current five product families.
- Lipstick and cosmetics pages were materially changed on 2026-08-24. Their transactional intent remains separate from the broad Beauty & Personal Care industry hub.

## Keyword and page ownership

| Search intent | Owning page type | Example | Boundary |
| --- | --- | --- | --- |
| Broad market packaging | Industry hub | `/industries/beauty-personal-care-packaging` | Helps a buyer choose among current UPG product families. |
| Product or application in a market | Industry guide | `/industries/custom-soap-boxes` | Covers one reviewed use case and links to the relevant current products and styles. |
| Transactional cosmetic outer packaging | Category hub | `/cosmetics` | Owns cosmetic outer-packaging selection and links to cosmetic subcategories. |
| Specific cosmetic pack | Cosmetic detail | `/cosmetics/lipstick-boxes` | Owns the exact product intent; it does not duplicate the broad industry hub. |
| Structural format | Product or style page | `/products/custom-tuck-boxes` | Owns format specifications, selection guidance, and quote inputs across industries. |

The source hierarchy is product family → packaging style → industry hub or detail → supporting buyer guide. Navigation is reciprocal: `/industries` still lets a buyer browse by market, but every application resolves to a current product or style source, and every nested style links back to its approved industry uses. Existing canonical product and style URLs remain the source of truth.

## Visual-first page standard

- Use one compact hero answer, a relevant lead visual, two supporting product visuals, and a direct quote action above the first long-form section.
- The `/industries` directory must render at least 12 meaningful images, every industry hub at least 6, and every application guide at least 4.
- Product, format, and related-guide cards use the existing UPG image library with descriptive alternative text and nearby explanatory copy.
- Keep technical boundaries and compatibility caveats visible, but place them in short review blocks instead of long undifferentiated prose.
- Do not fabricate factories, customers, reviews, certifications, performance statistics, or finished-project photography. Representative concepts remain labelled as representative.
- No new calculator, configurator, or interactive planning tool is included in this program.

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

## Historical indexing baseline

- The 2026-08-30 release verification recorded 83 of 85 canonical URLs indexed.
- `/industries/beauty-personal-care-packaging` was unknown to Google at that check.
- `/industries/supplement-packaging` was discovered but not indexed at that check.
- This is a historical baseline, not a current indexing claim. Fresh Google evidence requires working Search Console authorization.

## Search and conversion contract

Every published hub must have:

- unique title, description, H1, and canonical URL;
- CollectionPage, ItemList, BreadcrumbList, and FAQPage structured data;
- direct discovery from `/industries` and the By Industry navigation;
- contextual paths into current product and application pages;
- a prefilled quote handoff;
- matching sitemap and AI-discovery coverage;
- a primary image in visible content and accurate image references in JSON-LD;
- no new product style, fixed custom-production price, or unsupported certification or compatibility claim.

Every published application guide must also have:

- WebPage, Service, ItemList, BreadcrumbList, and FAQPage structured data that matches visible content;
- a visible approved-formats anchor with direct product links;
- at least two inbound sitemap-page links;
- a human-readable content review date;
- a prefilled quote route and no fake instant-pricing promise.

Every nested packaging-style page must also have:

- a visible style-led industry section;
- at least one reciprocal link from an approved industry page;
- ItemList structured data for its approved industry applications;
- AI-readable industry relationships generated from the same mapping;
- no industry keyword that replaces the style page's structural keyword owner.

## Release gate

1. Lint, application tests, production build, and the rendered SEO audit must pass.
2. The complete sitemap must be crawled in a production-mode runtime with no non-200 canonical route.
3. Representative directory, hub, and application pages must be visually checked on desktop and mobile.
4. JSON-LD must parse from rendered HTML and match the visible page.
5. Only then may the exact commit be pushed to `main`; Vercel must report the same SHA as Ready before the live domain is claimed as updated.
6. Search Console indexing or performance must not be claimed when Google OAuth is unavailable.

## Measurement

Compare full 28-day windows after production release for non-brand impressions, clicks, average position, enquiry starts, successful leads, and qualified outcomes by landing page. Do not treat same-day indexing or early impressions as a ranking result.

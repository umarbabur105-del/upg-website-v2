import {
  mailerApplications,
  type MailerApplication,
} from "@/data/mailer-applications";
import {
  comparisonGuides,
  type ComparisonGuide,
} from "@/data/comparison-guides";
import {
  industryGuides,
  type IndustryGuide,
} from "@/data/industry-guides";
import { industryHubs, type IndustryHub } from "@/data/industry-hubs";
import { organicIntentRoutes } from "@/data/organic-intent-routes";
import { cosmeticsPackagingScope } from "@/data/catalog";
import {
  productStyleGuides,
  type ProductStyleGuide,
} from "@/data/product-styles";
import { products, type Product } from "@/data/products";
import {
  commercialPricingFaqs,
  commercialTerms,
} from "@/data/commercial-terms";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { boxSampleKit, sampleKits } from "@/data/sample-kit";
import { siteConfig } from "@/data/site";

const quoteUrl = `${siteConfig.url}/get-a-quote`;
const quoteActionUrl = `${siteConfig.url}/api/quote`;
const contactActionUrl = `${siteConfig.url}/api/contact`;
const catalogUrl = `${siteConfig.url}/product-catalog.json`;
const toolsUrl = `${siteConfig.url}/tools`;
const styleLibraryUrl = `${siteConfig.url}/packaging-styles`;
const comparisonLibraryUrl = `${siteConfig.url}/compare`;
const industriesUrl = `${siteConfig.url}/industries`;
const guidesUrl = `${siteConfig.url}/blog`;
const commercialTermsUrl = `${siteConfig.url}${commercialTerms.path}`;
const commercialTermsMarkdownUrl = `${siteConfig.url}${commercialTerms.markdownPath}`;
const formatFinderUrl = `${siteConfig.url}/tools/packaging-format-finder`;
const catalogUpdatedAt = siteConfig.contentReviewedAt;

function productUrl(product: Product) {
  return `${siteConfig.url}/products/${product.slug}`;
}

function styleUrl(guide: ProductStyleGuide) {
  return `${styleLibraryUrl}/${guide.slug}`;
}

function applicationUrl(application: MailerApplication) {
  return `${siteConfig.url}/applications/${application.slug}`;
}

function industryUrl(guide: IndustryGuide) {
  return `${industriesUrl}/${guide.slug}`;
}

function industryHubUrl(hub: IndustryHub) {
  return `${industriesUrl}/${hub.slug}`;
}

function comparisonUrl(guide: ComparisonGuide) {
  return `${comparisonLibraryUrl}/${guide.slug}`;
}

function blogUrl(post: BlogPost) {
  return `${guidesUrl}/${post.slug}`;
}

function intentRouteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

function intentOptionUrl(path: string, href?: string) {
  if (!href) return null;
  if (href.startsWith("#")) return `${siteConfig.url}${path}${href}`;
  if (href.startsWith("/")) return `${siteConfig.url}${href}`;
  return href;
}

function sampleKitCatalogEntry(kit: (typeof sampleKits)[number]) {
  return {
    id: kit.merchantId,
    sku: kit.sku,
    name: kit.name,
    description: kit.description,
    assortment: kit.selectionNote,
    productBoundary: kit.productBoundary,
    price: kit.price,
    currency: kit.currency,
    availability: kit.availability,
    shippingCountries: kit.shippingCountries,
    shipping: kit.shippingLabel,
    productionOrderCredit: kit.creditText,
    url: kit.url,
    image: `${siteConfig.url}${kit.image}`,
  };
}

export function buildCommercialTermsMarkdown() {
  const productLines = products
    .map(
      (product) =>
        `- [${product.name}](${productUrl(product)}): planning MOQ ${product.moq}. Best for: ${product.bestFor}.`
    )
    .join("\n");
  const factorLines = commercialTerms.pricingFactors
    .map((factor) => `- **${factor.title}:** ${factor.description}`)
    .join("\n");
  const inputLines = commercialTerms.quoteInputs
    .map((input, index) => `${index + 1}. ${input}`)
    .join("\n");
  const controlLines = commercialTerms.writtenQuoteControls
    .map((item) => `- ${item}`)
    .join("\n");
  const faqSections = commercialPricingFaqs
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join("\n\n");
  const sampleKitLines = sampleKits
    .map(
      (kit) =>
        `- [${kit.name}](${kit.url}): $${kit.price.toFixed(2)} ${kit.currency}. ${kit.creditText}`
    )
    .join("\n");

  return `# Custom Packaging Pricing, MOQ, and Quote Process

Canonical page: ${commercialTermsUrl}
Content reviewed: ${commercialTerms.reviewedAt}
Provider: ${siteConfig.name}
Market: ${siteConfig.market}

## Direct answer

${commercialTerms.quickAnswer}

## What changes a custom-packaging quote

${factorLines}

## What to send for quote review

${inputLines}

## Planning MOQ by product family

${productLines}

## What the final written quote controls

${controlLines}

## Fixed-price sample kits

${sampleKitLines}

The two kits are purchased separately. Custom production pricing remains separate and requires a written quote.

## Frequently asked questions

${faqSections}

## Public actions

- Request a custom quote: ${quoteUrl}
- Compare product families: ${formatFinderUrl}
- Browse all products: ${siteConfig.url}/products
`;
}

export function buildLlmsText() {
  const productLines = products
    .map(
      (product) =>
        `- [${product.name}](${productUrl(product)}): ${product.summary} Planning MOQ: ${product.moq}.`
    )
    .join("\n");

  const applicationLines = mailerApplications
    .map(
      (application) =>
        `- [${application.title}](${applicationUrl(application)}): ${application.quickAnswer}`
    )
    .join("\n");

  const styleLines = productStyleGuides
    .map(
      (guide) =>
        `- [${guide.name}](${styleUrl(guide)}): ${guide.quickAnswer}`
    )
    .join("\n");

  const industryLines = industryGuides
    .map(
      (guide) =>
        `- [${guide.name}](${industryUrl(guide)}): ${guide.quickAnswer}`
    )
    .join("\n");

  const industryHubLines = industryHubs
    .map(
      (hub) =>
        `- [${hub.name}](${industryHubUrl(hub)}): ${hub.quickAnswer}`
    )
    .join("\n");

  const comparisonLines = comparisonGuides
    .map(
      (guide) =>
        `- [${guide.name}](${comparisonUrl(guide)}): ${guide.quickAnswer}`
    )
    .join("\n");

  const buyerGuideLines = blogPosts
    .map(
      (post) =>
        `- [${post.title}](${blogUrl(post)}): ${post.quickAnswer}`
    )
    .join("\n");

  const intentRouteLines = organicIntentRoutes
    .map(
      (route) =>
        `- [${route.title}](${intentRouteUrl(route.path)}): ${route.intro} ${route.options
          .map((option) => `${option.title} — ${option.status}`)
          .join("; ")}.`
    )
    .join("\n");

  const sampleKitLines = sampleKits
    .map(
      (kit) =>
        `- [${kit.name}](${kit.url}): ${kit.price.toFixed(2)} ${kit.currency}; ${kit.shippingLabel}; ${kit.selectionNote} ${kit.productBoundary}`
    )
    .join("\n");

  return `# ${siteConfig.name} (${siteConfig.shortName})

> ${siteConfig.description}

- Canonical website: ${siteConfig.url}
- Sales email: ${siteConfig.email}
- Sales phone: ${siteConfig.phoneNumber}
- WhatsApp: ${siteConfig.whatsappUrl}
- Markets served: ${siteConfig.market}
- Content reviewed: ${siteConfig.contentReviewedAt}
- Full reference: ${siteConfig.url}/llms-full.txt
- Product catalog JSON: ${catalogUrl}
- Product catalog TSV: ${siteConfig.url}/feeds/products.tsv
- Google Merchant Sample Kit feed: ${siteConfig.url}/feeds/google-merchant.tsv
- Agent guidance: ${siteConfig.url}/agents.md
- Custom packaging pricing and MOQ: ${commercialTermsUrl}
- Pricing and MOQ Markdown: ${commercialTermsMarkdownUrl}
- Packaging Format Finder: ${formatFinderUrl}
- Packaging Style Library: ${styleLibraryUrl}
- Packaging Comparison Library: ${comparisonLibraryUrl}
- Industry and application guides: ${industriesUrl}
- Packaging buyer guides: ${guidesUrl}

## Approved product range

${productLines}

## Available tuck box and Mylar bag styles

${styleLines}

## Corrugated mailer application guides

${applicationLines}

## Industry packaging hubs

${industryHubLines}

## Industry and product application guides

${industryLines}

## Packaging comparison guides

${comparisonLines}

## Packaging buyer guides

${buyerGuideLines}

## Qualified buyer-intent routes

${intentRouteLines}

## Commercial model

${siteConfig.businessModel}
${siteConfig.pricingModel}
${siteConfig.responseTarget}

## Fixed-price sample kits

${sampleKitLines}

Each kit is purchased separately. The full $19.99 price of the purchased kit is credited toward the buyer's first UPG custom packaging production order.

## Scope boundary

${siteConfig.scopeBoundary}

Cosmetics scope: ${cosmeticsPackagingScope.included} ${cosmeticsPackagingScope.excluded}

Final dimensions remain subject to structural feasibility. Product compatibility, food-contact, child-resistant, barrier, and market-specific requirements must be confirmed where applicable. Final specifications, pricing, production timing, and delivery terms are confirmed for each project.

## Reliable source pages

- Product catalog: ${siteConfig.url}/products
- Packaging style library: ${styleLibraryUrl}
- Packaging comparison library: ${comparisonLibraryUrl}
- Packaging buyer guides: ${guidesUrl}
- Packaging planning tools: ${toolsUrl}
- Packaging Format Finder: ${formatFinderUrl}
- Start a project: ${quoteUrl}
- Custom packaging pricing and MOQ: ${commercialTermsUrl}
- Cosmetic packaging hub: ${siteConfig.url}/cosmetics
- Materials and finishes: ${siteConfig.url}/materials-finishes
- Sample Kit hub: ${siteConfig.url}/samples
${sampleKits.map((kit) => `- ${kit.name}: ${kit.url}`).join("\n")}
- Sample Kit shipping and returns: ${siteConfig.url}/shipping-returns
- FAQ: ${siteConfig.url}/faq
- Company and operating model: ${siteConfig.url}/about

## Image policy

${siteConfig.imagePolicy}
`;
}

export function buildLlmsFullText() {
  const productSections = products
    .map(
      (product) => `### ${product.name}

Canonical page: ${productUrl(product)}
SKU: ${product.sku}
Category: ${product.category}
Summary: ${product.longSummary}
Best for: ${product.bestFor}
Planning MOQ: ${product.moq}
Sizes: ${product.sizes}
Common formats and applications: ${product.useCases.join("; ")}
Materials: ${product.materials.join("; ")}
Print options: ${product.prints.join("; ")}
Finish options: ${product.finishes.join("; ")}
Qualification note: ${product.screeningNote}
`
    )
    .join("\n");

  const applicationSections = mailerApplications
    .map(
      (application) => `### ${application.title}

Canonical page: ${applicationUrl(application)}
Parent product: ${siteConfig.url}/products/custom-mailer-boxes
Quick answer: ${application.quickAnswer}
Best for: ${application.bestFor.join("; ")}
Planning priorities: ${application.planningPriorities
        .map((item) => `${item.title}: ${item.description}`)
        .join("; ")}
Project inputs: ${application.projectInputs.join("; ")}
Content reviewed: ${application.reviewedAt}
`
    )
    .join("\n");

  const styleSections = productStyleGuides
    .map(
      (guide) => `### ${guide.name}

Canonical page: ${styleUrl(guide)}
Parent product: ${siteConfig.url}/products/${guide.parentProductSlug}
Product family: ${guide.family}
Search terms: ${guide.searchTerms.join("; ")}
Quick answer: ${guide.quickAnswer}
Selection note: ${guide.selectionNote}
Project inputs: ${guide.projectInputs.join("; ")}
Compliance or compatibility note: ${guide.complianceNote ?? "Final structure and specification require project review."}
Content reviewed: ${guide.reviewedAt}
`
    )
    .join("\n");

  const industrySections = industryGuides
    .map(
      (guide) => `### ${guide.name}

Canonical page: ${industryUrl(guide)}
Primary product family: ${guide.primaryFamily}
Approved product pages: ${guide.productSlugs
        .map((slug) => `${siteConfig.url}/products/${slug}`)
        .join("; ")}
Search terms: ${guide.keywords.join("; ")}
Quick answer: ${guide.quickAnswer}
Best for: ${guide.bestFor.join("; ")}
Project inputs: ${guide.projectInputs.join("; ")}
Scope note: ${guide.scopeNote}
Compatibility or market note: ${
        guide.compatibilityNote ??
        "Final structure and specification require project review."
      }
Content reviewed: ${guide.reviewedAt}
`
    )
    .join("\n");

  const industryHubSections = industryHubs
    .map(
      (hub) => `### ${hub.name}

Canonical page: ${industryHubUrl(hub)}
Approved product pages: ${hub.productSlugs
        .map((slug) => `${siteConfig.url}/products/${slug}`)
        .join("; ")}
Search terms: ${hub.keywords.join("; ")}
Quick answer: ${hub.quickAnswer}
Specific buyer paths: ${hub.guideLinks
        .map((item) => `${item.label}: ${siteConfig.url}${item.href}`)
        .join("; ")}
Project inputs: ${hub.projectInputs.join("; ")}
Scope note: ${hub.scopeNote}
Compatibility or market note: ${hub.compatibilityNote}
Content reviewed: ${hub.reviewedAt}
`
    )
    .join("\n");

  const comparisonSections = comparisonGuides
    .map(
      (guide) => `### ${guide.name}

Canonical page: ${comparisonUrl(guide)}
Quick answer: ${guide.quickAnswer}
Option one: ${guide.first.title}. ${guide.first.summary} Planning MOQ: ${guide.first.planningMoq}.
Option two: ${guide.second.title}. ${guide.second.summary} Planning MOQ: ${guide.second.planningMoq}.
Decision factors: ${guide.rows
        .map(
          (row) =>
            `${row.criterion}: ${guide.first.title} — ${row.first}; ${guide.second.title} — ${row.second}`
        )
        .join("; ")}
Project inputs: ${guide.projectInputs.join("; ")}
Scope note: ${guide.scopeNote}
Content reviewed: ${guide.reviewedAt}
`
    )
    .join("\n");

  const buyerGuideSections = blogPosts
    .map(
      (post) => `### ${post.title}

Canonical page: ${blogUrl(post)}
Category: ${post.category}
Direct answer: ${post.quickAnswer}
Buyer decisions: ${post.keyDecisions
        .map((decision) => `${decision.title}: ${decision.description}`)
        .join("; ")}
Questions answered: ${post.faqs.map((item) => item.question).join("; ")}
Content reviewed: ${post.updatedAt ?? post.date}
`
    )
    .join("\n");

  const intentRouteSections = organicIntentRoutes
    .map(
      (route) => `### ${route.title}

Canonical page: ${intentRouteUrl(route.path)}
Scope: ${route.intro}
Buyer routes: ${route.options
        .map(
          (option) =>
            `${option.title} (${option.status}): ${option.description}${
              option.href ? ` Route: ${option.href}` : ""
            }`
        )
        .join("; ")}
Content reviewed: ${route.reviewedAt}
`
    )
    .join("\n");

  const sampleKitSections = sampleKits
    .map(
      (kit) => `### ${kit.name}

Canonical page: ${kit.url}
SKU: ${kit.sku}
Price: ${kit.price.toFixed(2)} ${kit.currency}
Shipping: ${kit.shippingLabel}
Credit: ${kit.creditText}
Assortment: ${kit.selectionNote}
Product boundary: ${kit.productBoundary}
`
    )
    .join("\n");

  return `# ${siteConfig.name}: full machine-readable reference

Canonical entity name: ${siteConfig.name}
Short name: ${siteConfig.shortName}
Canonical domain: ${siteConfig.url}
Sales contact: ${siteConfig.email}
Sales phone: ${siteConfig.phoneNumber}
WhatsApp: ${siteConfig.whatsappUrl}
Markets served: ${siteConfig.market}
Business model: ${siteConfig.businessModel}
Pricing model: ${siteConfig.pricingModel}
Content reviewed: ${siteConfig.contentReviewedAt}

## What UPG does

UPG manufactures custom boxes and flexible packaging for brands worldwide. UPG turns a packaging brief into an approved structure, production specification, pricing, proofing, manufacturing, and delivery plan. Custom production is not an instant-price store because every production project is made to specification. The UPG Box Sample Kit and Mylar Bag Sample Kit are separate fixed-price products.

For beauty and cosmetics projects, ${cosmeticsPackagingScope.included} ${cosmeticsPackagingScope.excluded}

The free Packaging Format Finder at ${formatFinderUrl} uses four guided questions to recommend a starting format from the five approved UPG product families. It can show an alternate when two formats deserve comparison. The result is planning guidance, not structural approval.

The commercial guide at ${commercialTermsUrl} explains the 250-unit planning MOQ, the factors that change custom-production pricing, the inputs needed for review, and the written terms that control each project. A Markdown alternate is available at ${commercialTermsMarkdownUrl}.

## Fixed-price sample kits

${sampleKitSections}
The two kits are purchased separately. Box and flexible-packaging samples are not combined.
Free sample requests are reviewed manually and do not guarantee shipment.

## Approved products

${productSections}
## Available tuck box and Mylar bag styles

These pages cover real formats inside UPG's current product range. They are visible, browseable pages with format-specific planning inputs and do not represent fixed-price Merchant products.

${styleSections}
## Corrugated mailer application guides

These guides answer distinct buyer intents while remaining within UPG's approved corrugated ear-lock mailer product range.

${applicationSections}
## Industry packaging hubs

These guides answer distinct commercial searches while staying inside UPG's five approved product families. They do not add a new manufacturing category or an instant-price promise.

${industryHubSections}
## Industry and product application guides

${industrySections}
## Packaging comparison guides

These pages answer side-by-side buyer decisions using approved UPG product facts, clear quote inputs, and explicit scope boundaries.

${comparisonSections}
## Packaging buyer guides

These visual, people-first guides answer common planning questions without publishing generic dielines, fabricated reviews, customer stories, or instant custom-production claims.

${buyerGuideSections}
## Qualified buyer-intent routes

These routes separate products UPG manufactures from adjacent components, machinery, logistics, or fulfillment searches that are outside the current offer.

${intentRouteSections}
## Corrugated-box search intent

UPG uses the broad term corrugated boxes because buyers use it when researching corrugated mailer packaging. The commercial offer remains limited to corrugated tuck boxes and ear-lock mailer boxes. Regular slotted containers, master cartons, standard shipping cartons, and RSC cases are outside the product range.

## Project process

1. If the product family is not clear, use the Packaging Format Finder at ${formatFinderUrl}.
2. Submit the known product details directly at ${quoteUrl}.
3. ${siteConfig.responseTarget}
4. Structure, materials, finishes, artwork, pricing, manufacturing, packing, and delivery details are confirmed as required.
5. Manufacturing starts only after the applicable commercial, artwork, and proof approvals.

## Commercial qualifications

- Final written quotes control price, minimum quantity, scope, freight, duties, taxes, documentation, payment, and delivery terms.
- Dielines are structure-specific and should be confirmed before final artwork.
- Production begins only after the required commercial, artwork, and proof approvals.
- ${siteConfig.scopeBoundary}

## Machine-readable sources

- Concise reference: ${siteConfig.url}/llms.txt
- Product catalog JSON: ${catalogUrl}
- Product catalog TSV: ${siteConfig.url}/feeds/products.tsv
- Google Merchant Sample Kit feed: ${siteConfig.url}/feeds/google-merchant.tsv
- Agent guidance: ${siteConfig.url}/agents.md
- Custom packaging pricing and MOQ: ${commercialTermsUrl}
- Pricing and MOQ Markdown: ${commercialTermsMarkdownUrl}
- Packaging planning tools: ${toolsUrl}
- Packaging Format Finder: ${formatFinderUrl}
- Packaging Style Library: ${styleLibraryUrl}
- Packaging Comparison Library: ${comparisonLibraryUrl}
- Packaging buyer guides: ${guidesUrl}
- Industry and application guides: ${industriesUrl}
- Cosmetics outer-packaging hub: ${siteConfig.url}/cosmetics
- Sitemap: ${siteConfig.url}/sitemap.xml

## Image policy

${siteConfig.imagePolicy}
`;
}

export function buildAgentsMarkdown() {
  const productLines = products
    .map(
      (product) =>
        `- ${product.name}: ${product.summary} MOQ: ${product.moq}. Source: ${productUrl(product)}`
    )
    .join("\n");

  const applicationLines = mailerApplications
    .map(
      (application) =>
        `- ${application.title}: ${application.quickAnswer} Source: ${applicationUrl(application)}`
    )
    .join("\n");

  const styleLines = productStyleGuides
    .map(
      (guide) =>
        `- ${guide.name}: ${guide.quickAnswer} Source: ${styleUrl(guide)}`
    )
    .join("\n");

  const industryLines = industryGuides
    .map(
      (guide) =>
        `- ${guide.name}: ${guide.quickAnswer} Source: ${industryUrl(guide)}`
    )
    .join("\n");

  const industryHubLines = industryHubs
    .map(
      (hub) =>
        `- ${hub.name}: ${hub.quickAnswer} Source: ${industryHubUrl(hub)}`
    )
    .join("\n");

  const comparisonLines = comparisonGuides
    .map(
      (guide) =>
        `- ${guide.name}: ${guide.quickAnswer} Source: ${comparisonUrl(guide)}`
    )
    .join("\n");

  const buyerGuideLines = blogPosts
    .map(
      (post) =>
        `- ${post.title}: ${post.quickAnswer} Source: ${blogUrl(post)}`
    )
    .join("\n");

  const intentRouteLines = organicIntentRoutes
    .map(
      (route) =>
        `- ${route.title}: ${route.options
          .map((option) => `${option.title} — ${option.status}`)
          .join("; ")}. Source: ${intentRouteUrl(route.path)}`
    )
    .join("\n");

  const sampleKitLines = sampleKits
    .map(
      (kit) =>
        `- ${kit.name}: $${kit.price.toFixed(2)}, ${kit.shippingLabel}. ${kit.selectionNote} ${kit.productBoundary} Source: ${kit.url}`
    )
    .join("\n");

  return `# Agent guidance for ${siteConfig.name}

Last reviewed: ${siteConfig.contentReviewedAt}
Canonical entity: ${siteConfig.url}

## Supported discovery

Agents may read the public product catalog, compare the five approved product families, direct an undecided buyer to the Packaging Format Finder, and then continue to the human-reviewed project enquiry form.

${productLines}

## Available tuck box and Mylar bag styles

${styleLines}

## Corrugated mailer application guides

${applicationLines}

## Industry packaging hubs

${industryHubLines}

## Industry and product application guides

${industryLines}

## Packaging comparison guides

${comparisonLines}

## Packaging buyer guides

${buyerGuideLines}

## Qualified buyer-intent routes

${intentRouteLines}

## Important operating rules

- UPG serves brands worldwide.
- UPG manufactures made-to-spec packaging and does not publish instant custom-production pricing.
- Cosmetics pages describe the custom printed box around the beauty product. ${cosmeticsPackagingScope.excluded}
- UPG offers two separate $19.99 fixed-price products: the Box Sample Kit and Mylar Bag Sample Kit. They are not combined.
- Fixed-price sample-kit details:
${sampleKitLines}
- ${siteConfig.scopeBoundary}
- Do not present AI-generated concept imagery as completed customer work.
- Do not state that a quote, order, sample, payment, or production slot has been created unless the website explicitly confirms the completed action.
- Product compatibility, food-contact, child-resistant, barrier, and market-specific requirements require project review where applicable.

## Public actions

- Read product catalog: ${catalogUrl}
- Browse real packaging styles: ${styleLibraryUrl}
- Compare packaging formats and buying paths: ${comparisonLibraryUrl}
- Browse industry and product application guides: ${industriesUrl}
- Read packaging buyer guides: ${guidesUrl}
- Review custom packaging pricing and the 250-unit planning MOQ: ${commercialTermsUrl}
- Compare approved product families: ${formatFinderUrl}
- Explore custom cosmetic boxes and outer packaging: ${siteConfig.url}/cosmetics
- Start a project enquiry: ${quoteUrl}
- Contact UPG: ${siteConfig.url}/contact
- Compare and buy sample kits or request a sample review: ${siteConfig.url}/samples
- Email UPG: mailto:${siteConfig.email}
- Call UPG: tel:${siteConfig.phoneNumber}
- WhatsApp UPG: ${siteConfig.whatsappUrl}

## Human-reviewed enquiry actions

Use these actions only after the buyer explicitly asks to contact UPG and has approved the details being submitted.

### Request a custom packaging quote

- Buyer-facing form: ${quoteUrl}
- HTTP action: ${quoteActionUrl}
- Method: POST
- Accepted content types: application/json or application/x-www-form-urlencoded
- Required fields: product_family, quantity, name, email, company
- Supported product_family values: Tuck Boxes, Mailer Boxes, Magnetic Boxes, Collapsible Magnetic Boxes, Mylar Bags, Not sure yet
- Optional fields include product_style, intended_end_use, shipping_country, shipping_state_or_province, target_delivery_timing, artwork_status, phone, website, dimensions, material_preference, finish_preference, and notes
- A successful JSON response has accepted: true. It confirms receipt for human review; it does not create a price, order, payment, production slot, or delivery commitment.

### Send a general contact message

- Buyer-facing form: ${siteConfig.url}/contact
- HTTP action: ${contactActionUrl}
- Method: POST
- Accepted content types: application/json or application/x-www-form-urlencoded
- Required fields: name, email, message
- Optional fields: company, phone, product_family
- A successful JSON response has accepted: true and confirms receipt for human follow-up.

UPG does not currently advertise a public MCP, A2A, agent checkout, or autonomous purchasing endpoint. Use the website enquiry flow for human-reviewed custom projects.
`;
}

export function buildProductCatalog() {
  return {
    schemaVersion: "2.8",
    updatedAt: catalogUpdatedAt,
    entity: {
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: siteConfig.url,
      email: siteConfig.email,
      phone: siteConfig.phoneNumber,
      whatsapp: siteConfig.whatsappUrl,
      market: siteConfig.market,
    },
    commercialModel: {
      ordering: "Made to specification; human-reviewed project enquiry",
      pricing: siteConfig.pricingModel,
      responseTarget: siteConfig.responseTarget,
      planningMoq: "250 units for every custom product family",
      guideUrl: commercialTermsUrl,
      markdownGuideUrl: commercialTermsMarkdownUrl,
      requestQuoteUrl: quoteUrl,
    },
    actions: {
      requestQuote: {
        name: "Request a human-reviewed custom packaging quote",
        formUrl: quoteUrl,
        endpoint: quoteActionUrl,
        method: "POST",
        acceptedContentTypes: [
          "application/json",
          "application/x-www-form-urlencoded",
        ],
        requiredFields: [
          "product_family",
          "quantity",
          "name",
          "email",
          "company",
        ],
        successContract: {
          contentType: "application/json",
          acceptedField: true,
          meaning: "Received for human review; no quote, order, payment, or production commitment is created automatically.",
        },
      },
      contact: {
        name: "Send a general message for human follow-up",
        formUrl: `${siteConfig.url}/contact`,
        endpoint: contactActionUrl,
        method: "POST",
        acceptedContentTypes: [
          "application/json",
          "application/x-www-form-urlencoded",
        ],
        requiredFields: ["name", "email", "message"],
        successContract: {
          contentType: "application/json",
          acceptedField: true,
          meaning: "Received for human follow-up.",
        },
      },
    },
    planningTool: {
      name: "UPG Packaging Format Finder",
      url: formatFinderUrl,
      purpose:
        "Use four guided questions to recommend a starting format from the five approved product families and identify an alternate when relevant.",
      pricingOutput: false,
    },
    planningTools: [
      {
        name: "UPG Packaging Format Finder",
        url: formatFinderUrl,
        purpose:
          "Use four guided questions to recommend a starting format from the five approved product families and identify an alternate when relevant.",
        pricingOutput: false,
        structuralApproval: false,
      },
    ],
    boxSampleKit: {
      ...sampleKitCatalogEntry(boxSampleKit),
    },
    sampleKits: sampleKits.map(sampleKitCatalogEntry),
    scopeBoundary: siteConfig.scopeBoundary,
    cosmeticsPackagingScope,
    imagePolicy: siteConfig.imagePolicy,
    products: products.map((product) => ({
      id: product.sku,
      slug: product.slug,
      name: product.name,
      productFamily: product.family,
      category: product.category,
      summary: product.summary,
      description: product.longSummary,
      planningMoq: product.moq,
      productionTiming: product.leadTime,
      bestFor: product.bestFor,
      stylesAndApplications: product.useCases,
      industries: product.industries,
      materials: product.materials,
      printOptions: product.prints,
      finishOptions: product.finishes,
      sizeGuidance: product.sizes,
      qualificationNote: product.screeningNote,
      url: productUrl(product),
      image: `${siteConfig.url}${product.heroImage}`,
      requestQuoteUrl: `${quoteUrl}?product=${encodeURIComponent(product.family)}`,
    })),
    productStyleGuides: productStyleGuides.map((guide) => ({
      slug: guide.slug,
      name: guide.name,
      productFamily: guide.family,
      parentProductUrl: `${siteConfig.url}/products/${guide.parentProductSlug}`,
      summary: guide.quickAnswer,
      searchTerms: guide.searchTerms,
      selectionNote: guide.selectionNote,
      projectInputs: guide.projectInputs,
      complianceOrCompatibilityNote: guide.complianceNote ?? null,
      contentReviewed: guide.reviewedAt,
      url: styleUrl(guide),
      requestQuoteUrl: `${quoteUrl}?product=${encodeURIComponent(
        guide.family
      )}&builder_note=${encodeURIComponent(`Packaging style: ${guide.shortName}.`)}`,
    })),
    applicationGuides: mailerApplications.map((application) => ({
      slug: application.slug,
      name: application.title,
      productFamily: "Mailer Boxes",
      parentProductUrl: `${siteConfig.url}/products/custom-mailer-boxes`,
      summary: application.quickAnswer,
      bestFor: application.bestFor,
      planningMoq: "250 units, regardless of finished size",
      projectInputs: application.projectInputs,
      contentReviewed: application.reviewedAt,
      url: applicationUrl(application),
      requestQuoteUrl: `${quoteUrl}?product=${encodeURIComponent("Mailer Boxes")}`,
    })),
    industryGuides: industryGuides.map((guide) => ({
      slug: guide.slug,
      name: guide.name,
      primaryProductFamily: guide.primaryFamily,
      approvedProductUrls: guide.productSlugs.map(
        (slug) => `${siteConfig.url}/products/${slug}`
      ),
      summary: guide.quickAnswer,
      searchTerms: guide.keywords,
      bestFor: guide.bestFor,
      projectInputs: guide.projectInputs,
      scopeNote: guide.scopeNote,
      compatibilityOrMarketNote: guide.compatibilityNote ?? null,
      contentReviewed: guide.reviewedAt,
      url: industryUrl(guide),
      requestQuoteUrl: `${quoteUrl}?product=${encodeURIComponent(
        guide.primaryFamily
      )}&builder_note=${encodeURIComponent(
        `Industry or application: ${guide.shortName}.`
      )}`,
    })),
    industryHubs: industryHubs.map((hub) => ({
      slug: hub.slug,
      name: hub.name,
      approvedProductUrls: hub.productSlugs.map(
        (slug) => `${siteConfig.url}/products/${slug}`
      ),
      summary: hub.quickAnswer,
      searchTerms: hub.keywords,
      buyerPaths: hub.guideLinks.map((item) => ({
        name: item.label,
        description: item.description,
        url: `${siteConfig.url}${item.href}`,
      })),
      projectInputs: hub.projectInputs,
      scopeNote: hub.scopeNote,
      compatibilityOrMarketNote: hub.compatibilityNote,
      contentReviewed: hub.reviewedAt,
      url: industryHubUrl(hub),
      requestQuoteUrl: `${quoteUrl}?builder_note=${encodeURIComponent(
        `Industry: ${hub.shortName}. Please recommend the right packaging format.`
      )}`,
    })),
    comparisonGuides: comparisonGuides.map((guide) => ({
      slug: guide.slug,
      name: guide.name,
      summary: guide.quickAnswer,
      searchTerms: guide.keywords,
      optionOne: {
        name: guide.first.title,
        summary: guide.first.summary,
        planningMoq: guide.first.planningMoq,
        url: guide.first.href ? `${siteConfig.url}${guide.first.href}` : null,
      },
      optionTwo: {
        name: guide.second.title,
        summary: guide.second.summary,
        planningMoq: guide.second.planningMoq,
        url: guide.second.href ? `${siteConfig.url}${guide.second.href}` : null,
      },
      decisionFactors: guide.rows,
      projectInputs: guide.projectInputs,
      scopeNote: guide.scopeNote,
      contentReviewed: guide.reviewedAt,
      url: comparisonUrl(guide),
    })),
    buyerGuides: blogPosts.map((post) => ({
      slug: post.slug,
      name: post.title,
      category: post.category,
      summary: post.quickAnswer,
      searchTerms: post.keywords,
      buyerDecisions: post.keyDecisions,
      questionsAnswered: post.faqs.map((item) => item.question),
      contentReviewed: post.updatedAt ?? post.date,
      url: blogUrl(post),
      nextSources: post.resources.map((resource) => ({
        name: resource.title,
        url: resource.href.startsWith("/")
          ? `${siteConfig.url}${resource.href}`
          : resource.href,
      })),
    })),
    buyerIntentRoutes: organicIntentRoutes.map((route) => ({
      path: route.path,
      url: intentRouteUrl(route.path),
      title: route.title,
      scope: route.intro,
      options: route.options.map((option) => ({
        label: option.label,
        name: option.title,
        status: option.status,
        description: option.description,
        url: intentOptionUrl(route.path, option.href),
      })),
      contentReviewed: route.reviewedAt,
    })),
    sources: {
      conciseReference: `${siteConfig.url}/llms.txt`,
      fullReference: `${siteConfig.url}/llms-full.txt`,
      agentGuidance: `${siteConfig.url}/agents.md`,
      commercialTerms: commercialTermsUrl,
      commercialTermsMarkdown: commercialTermsMarkdownUrl,
      toolsHub: toolsUrl,
      packagingStyleLibrary: styleLibraryUrl,
      packagingComparisonLibrary: comparisonLibraryUrl,
      industries: industriesUrl,
      packagingFormatFinder: formatFinderUrl,
      cosmeticsHub: `${siteConfig.url}/cosmetics`,
      sitemap: `${siteConfig.url}/sitemap.xml`,
      googleMerchantFeed: `${siteConfig.url}/feeds/google-merchant.tsv`,
    },
  };
}

function tsvValue(value: string | string[]) {
  return (Array.isArray(value) ? value.join(" | ") : value)
    .replaceAll("\t", " ")
    .replaceAll("\r", " ")
    .replaceAll("\n", " ");
}

export function buildProductCatalogTsv() {
  const header = [
    "id",
    "name",
    "product_family",
    "category",
    "description",
    "planning_moq",
    "best_for",
    "styles_and_applications",
    "market",
    "ordering_model",
    "url",
    "image_url",
    "request_quote_url",
  ];

  const rows = products.map((product) => [
    product.sku,
    product.name,
    product.family,
    product.category,
    product.longSummary,
    product.moq,
    product.bestFor,
    product.useCases,
    siteConfig.market,
    "Made to specification; human-reviewed project enquiry",
    productUrl(product),
    `${siteConfig.url}${product.heroImage}`,
    `${quoteUrl}?product=${encodeURIComponent(product.family)}`,
  ]);

  return [header, ...rows]
    .map((row) => row.map((value) => tsvValue(value)).join("\t"))
    .join("\n");
}

export function buildRobotsText() {
  const aiUserAgents = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
  ];

  const rules = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /crm",
    "",
    "# Explicit access for AI search, retrieval, and user-request agents",
    ...aiUserAgents.flatMap((userAgent) => [
      `User-agent: ${userAgent}`,
      "Allow: /",
      "Disallow: /api/",
      "Disallow: /crm",
      "",
    ]),
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    `Host: ${new URL(siteConfig.url).host}`,
  ];

  return `${rules.join("\n")}\n`;
}

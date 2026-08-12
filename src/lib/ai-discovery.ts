import {
  mailerApplications,
  type MailerApplication,
} from "@/data/mailer-applications";
import { products, type Product } from "@/data/products";
import { boxSampleKit, sampleKits } from "@/data/sample-kit";
import { siteConfig } from "@/data/site";

const quoteUrl = `${siteConfig.url}/get-a-quote`;
const catalogUrl = `${siteConfig.url}/product-catalog.json`;
const toolsUrl = `${siteConfig.url}/tools`;
const formatFinderUrl = `${siteConfig.url}/tools/packaging-format-finder`;
const specBuilderUrl = `${siteConfig.url}/tools/packaging-spec-builder`;
const catalogUpdatedAt = "2026-08-12";

function productUrl(product: Product) {
  return `${siteConfig.url}/products/${product.slug}`;
}

function applicationUrl(application: MailerApplication) {
  return `${siteConfig.url}/applications/${application.slug}`;
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
- Packaging Format Finder: ${formatFinderUrl}
- Packaging Spec & MOQ Builder: ${specBuilderUrl}

## Approved product range

${productLines}

## Corrugated mailer application guides

${applicationLines}

## Commercial model

${siteConfig.businessModel}
${siteConfig.pricingModel}
${siteConfig.responseTarget}

## Fixed-price sample kits

${sampleKitLines}

Each kit is purchased separately. The full $19.99 price of the purchased kit is credited toward the buyer's first UPG custom packaging production order.

## Scope boundary

${siteConfig.scopeBoundary}

Final dimensions remain subject to structural feasibility. Product compatibility, food-contact, child-resistant, barrier, and market-specific requirements must be confirmed where applicable. Final specifications, pricing, production timing, and delivery terms are confirmed for each project.

## Reliable source pages

- Product catalog: ${siteConfig.url}/products
- Packaging planning tools: ${toolsUrl}
- Packaging Format Finder: ${formatFinderUrl}
- Packaging Spec & MOQ Builder: ${specBuilderUrl}
- Start a project: ${quoteUrl}
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

The free Packaging Format Finder at ${formatFinderUrl} uses four guided questions to recommend a starting format from the five approved UPG product families. It can show an alternate when two formats deserve comparison. The result is planning guidance, not structural approval.

The free Packaging Spec & MOQ Builder at ${specBuilderUrl} calculates the applicable planning MOQ and carries known project details into the human-reviewed enquiry form. Neither tool estimates custom-production pricing.

## Fixed-price sample kits

${sampleKitSections}
The two kits are purchased separately. Box and flexible-packaging samples are not combined.
Free sample requests are reviewed manually and do not guarantee shipment.

## Approved products

${productSections}
## Corrugated mailer application guides

These guides answer distinct buyer intents while remaining within UPG's approved corrugated ear-lock mailer product range.

${applicationSections}
## Corrugated-box search intent

UPG uses the broad term corrugated boxes because buyers use it when researching corrugated mailer packaging. The commercial offer remains limited to corrugated tuck boxes and ear-lock mailer boxes. Regular slotted containers, master cartons, standard shipping cartons, and RSC cases are outside the product range.

## Project process

1. If the product family is not clear, use the Packaging Format Finder at ${formatFinderUrl}.
2. Build a planning specification at ${specBuilderUrl}, or submit the known product details directly at ${quoteUrl}.
3. ${siteConfig.responseTarget}
4. Structure, materials, finishes, artwork, pricing, manufacturing, and delivery details are confirmed as required.
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
- Packaging planning tools: ${toolsUrl}
- Packaging Format Finder: ${formatFinderUrl}
- Packaging Spec & MOQ Builder: ${specBuilderUrl}
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

Agents may read the public product catalog, compare the five approved product families, direct an undecided buyer to the Packaging Format Finder, continue to the Packaging Spec & MOQ Builder, and then continue to the project enquiry form.

${productLines}

## Corrugated mailer application guides

${applicationLines}

## Important operating rules

- UPG serves brands worldwide.
- UPG manufactures made-to-spec packaging and does not publish instant custom-production pricing.
- UPG offers two separate $19.99 fixed-price products: the Box Sample Kit and Mylar Bag Sample Kit. They are not combined.
- Fixed-price sample-kit details:
${sampleKitLines}
- ${siteConfig.scopeBoundary}
- Do not present AI-generated concept imagery as completed customer work.
- Do not state that a quote, order, sample, payment, or production slot has been created unless the website explicitly confirms the completed action.
- Product compatibility, food-contact, child-resistant, barrier, and market-specific requirements require project review where applicable.

## Public actions

- Read product catalog: ${catalogUrl}
- Compare approved product families: ${formatFinderUrl}
- Build a packaging specification and check the planning MOQ: ${specBuilderUrl}
- Start a project enquiry: ${quoteUrl}
- Contact UPG: ${siteConfig.url}/contact
- Compare and buy sample kits or request a sample review: ${siteConfig.url}/samples
- Email UPG: mailto:${siteConfig.email}
- Call UPG: tel:${siteConfig.phoneNumber}
- WhatsApp UPG: ${siteConfig.whatsappUrl}

UPG does not currently advertise a public MCP, A2A, agent checkout, or autonomous purchasing endpoint. Use the website enquiry flow for human-reviewed custom projects.
`;
}

export function buildProductCatalog() {
  return {
    schemaVersion: "1.6",
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
      requestQuoteUrl: quoteUrl,
    },
    planningTool: {
      name: "UPG Packaging Spec & MOQ Builder",
      url: specBuilderUrl,
      purpose:
        "Calculate the planning MOQ and carry known specifications into a human-reviewed project enquiry.",
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
      {
        name: "UPG Packaging Spec & MOQ Builder",
        url: specBuilderUrl,
        purpose:
          "Calculate the planning MOQ and carry known specifications into a human-reviewed project enquiry.",
        pricingOutput: false,
        structuralApproval: false,
      },
    ],
    boxSampleKit: {
      ...sampleKitCatalogEntry(boxSampleKit),
    },
    sampleKits: sampleKits.map(sampleKitCatalogEntry),
    scopeBoundary: siteConfig.scopeBoundary,
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
    applicationGuides: mailerApplications.map((application) => ({
      slug: application.slug,
      name: application.title,
      productFamily: "Mailer Boxes",
      parentProductUrl: `${siteConfig.url}/products/custom-mailer-boxes`,
      summary: application.quickAnswer,
      bestFor: application.bestFor,
      planningMoq: "250–1,000 units, based on finished size",
      projectInputs: application.projectInputs,
      contentReviewed: application.reviewedAt,
      url: applicationUrl(application),
      requestQuoteUrl: `${quoteUrl}?product=${encodeURIComponent("Mailer Boxes")}`,
    })),
    sources: {
      conciseReference: `${siteConfig.url}/llms.txt`,
      fullReference: `${siteConfig.url}/llms-full.txt`,
      agentGuidance: `${siteConfig.url}/agents.md`,
      toolsHub: toolsUrl,
      packagingFormatFinder: formatFinderUrl,
      packagingSpecBuilder: specBuilderUrl,
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

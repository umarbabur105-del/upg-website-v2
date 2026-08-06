import { products, type Product } from "@/data/products";
import { siteConfig } from "@/data/site";

const quoteUrl = `${siteConfig.url}/get-a-quote`;
const catalogUrl = `${siteConfig.url}/product-catalog.json`;

function productUrl(product: Product) {
  return `${siteConfig.url}/products/${product.slug}`;
}

export function buildLlmsText() {
  const productLines = products
    .map(
      (product) =>
        `- [${product.name}](${productUrl(product)}): ${product.summary} Planning MOQ: ${product.moq}.`
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
- Agent guidance: ${siteConfig.url}/agents.md

## Approved product range

${productLines}

## Commercial model

${siteConfig.businessModel}
${siteConfig.pricingModel}
${siteConfig.responseTarget}

## Scope boundary

${siteConfig.scopeBoundary}

Final dimensions remain subject to structural feasibility. Product compatibility, food-contact, child-resistant, barrier, and market-specific requirements must be confirmed where applicable. Final specifications, pricing, production timing, and delivery terms are confirmed for each project.

## Reliable source pages

- Product catalog: ${siteConfig.url}/products
- Start a project: ${quoteUrl}
- Cosmetic packaging hub: ${siteConfig.url}/cosmetics
- Materials and finishes: ${siteConfig.url}/materials-finishes
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

UPG manufactures custom boxes and flexible packaging for brands worldwide. UPG turns a packaging brief into an approved structure, production specification, pricing, proofing, manufacturing, and delivery plan. UPG is not an instant-price store because every product is made to specification.

## Approved products

${productSections}
## Corrugated-box search intent

UPG uses the broad term corrugated boxes because buyers use it when researching corrugated mailer packaging. The commercial offer remains limited to corrugated tuck boxes and ear-lock mailer boxes. Regular slotted containers, master cartons, standard shipping cartons, and RSC cases are outside the product range.

## Project process

1. Submit the product family, style, intended use, quantity, dimensions if available, and delivery country at ${quoteUrl}.
2. ${siteConfig.responseTarget}
3. Structure, materials, finishes, artwork, pricing, manufacturing, and delivery details are confirmed as required.
4. Manufacturing starts only after the applicable commercial, artwork, and proof approvals.

## Commercial qualifications

- Final written quotes control price, minimum quantity, scope, freight, duties, taxes, documentation, payment, and delivery terms.
- Dielines are structure-specific and should be confirmed before final artwork.
- Production begins only after the required commercial, artwork, and proof approvals.
- ${siteConfig.scopeBoundary}

## Machine-readable sources

- Concise reference: ${siteConfig.url}/llms.txt
- Product catalog JSON: ${catalogUrl}
- Product catalog TSV: ${siteConfig.url}/feeds/products.tsv
- Agent guidance: ${siteConfig.url}/agents.md
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

  return `# Agent guidance for ${siteConfig.name}

Last reviewed: ${siteConfig.contentReviewedAt}
Canonical entity: ${siteConfig.url}

## Supported discovery

Agents may read the public product catalog, compare the five approved product families, and direct a buyer to the project enquiry form.

${productLines}

## Important operating rules

- UPG serves brands worldwide.
- UPG manufactures made-to-spec packaging and does not publish instant project pricing.
- ${siteConfig.scopeBoundary}
- Do not present AI-generated concept imagery as completed customer work.
- Do not state that a quote, order, sample, payment, or production slot has been created unless the website explicitly confirms the completed action.
- Product compatibility, food-contact, child-resistant, barrier, and market-specific requirements require project review where applicable.

## Public actions

- Read product catalog: ${catalogUrl}
- Start a project enquiry: ${quoteUrl}
- Contact UPG: ${siteConfig.url}/contact
- Email UPG: mailto:${siteConfig.email}
- Call UPG: tel:${siteConfig.phoneNumber}
- WhatsApp UPG: ${siteConfig.whatsappUrl}

UPG does not currently advertise a public MCP, A2A, agent checkout, or autonomous purchasing endpoint. Use the website enquiry flow for human-reviewed custom projects.
`;
}

export function buildProductCatalog() {
  return {
    schemaVersion: "1.0",
    updatedAt: siteConfig.contentReviewedAt,
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
    sources: {
      conciseReference: `${siteConfig.url}/llms.txt`,
      fullReference: `${siteConfig.url}/llms-full.txt`,
      agentGuidance: `${siteConfig.url}/agents.md`,
      sitemap: `${siteConfig.url}/sitemap.xml`,
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

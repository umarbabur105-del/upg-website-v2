import { getProductBySlug, mailerCommercialTerms } from "@/data/products";
import { siteConfig } from "@/data/site";

// Keep the visible offer and the agent/catalog descriptions on the same facts.
// Commercial terms follow Umar's 2026-09-27 instruction to adopt the benchmark offer.
// The existing 250-unit minimum remains; unit prices require a defined specification.
export const mailerOffer = {
  reviewedAt: "2026-09-27",
  productSlug: "custom-mailer-boxes",
  heading: "Your mailer order, from first brief to print.",
  summary:
    "Custom printed corrugated mailer boxes from 250 units, with kraft or white surfaces, outside or inside-and-outside printing, and fitted inserts. Start with what you know; we help work out the size, artwork and production details.",
  orderingModel: "custom_quote",
  priceStatus: "project_quote_required",
  minimumQuantity: 250,
  quantityOptions: [250, 500, 1000],
  facts: [
    {
      key: "response",
      label: "First response",
      value: "One-business-day response target",
      detail: siteConfig.responseTarget,
    },
    {
      key: "artwork",
      label: "Artwork support",
      value: "Free dieline, proof & two revisions",
      detail: mailerCommercialTerms.artwork,
    },
    {
      key: "pricing",
      label: "Quantity comparison",
      value: "250, 500 or 1,000 units",
      detail:
        "Compare the same size, board, artwork and insert at each quantity. Your written quote sets out the price and included services.",
    },
    {
      key: "schedule",
      label: "Standard production",
      value: "From about 7 business days",
      detail: mailerCommercialTerms.production,
    },
    {
      key: "rush",
      label: "Rush production",
      value: "4–7 business days when eligible",
      detail: mailerCommercialTerms.rush,
    },
    {
      key: "shipping",
      label: "Shipping",
      value: "Free standard US shipping",
      detail: mailerCommercialTerms.shipping,
    },
    {
      key: "sample",
      label: "Fit & print samples",
      value: "Choose what you need to check",
      detail:
        "Use a finished Box Sample Kit to explore construction and print. For your exact product fit, ask about a project-specific sample and its cost and timing.",
    },
  ],
  comparisons: [
    {
      title: "Keep the print outside",
      description:
        "Compare kraft and white on the same box size, with your logo or artwork on the exterior. Keep the quantity and board specification the same to see the effect on price.",
      quoteNote:
        "Please compare kraft and white corrugated ear-lock mailers with exterior printing, using the same size, board specification and quantity.",
    },
    {
      title: "Add an inside reveal",
      description:
        "Compare exterior-only with inside-and-outside printing. Keep the size, board and quantity unchanged so the extra print scope is clear.",
      quoteNote:
        "Please compare exterior-only and inside-and-outside printing on the same corrugated ear-lock mailer size, board and quantity.",
    },
    {
      title: "Hold a product set in place",
      description:
        "Plan a fitted insert around each item's dimensions, weight and arrangement. The insert can change the required box size, material use and production cost.",
      quoteNote:
        "I need a corrugated ear-lock mailer with a fitted insert. Please help plan the product arrangement, insert, box size and price.",
    },
  ],
} as const;

export function buildMailerOfferCatalog() {
  const product = getProductBySlug(mailerOffer.productSlug)!;
  return {
    productUrl: `${siteConfig.url}/products/${product.slug}`,
    reviewedAt: mailerOffer.reviewedAt,
    description: mailerOffer.summary,
    orderingModel: mailerOffer.orderingModel,
    priceStatus: mailerOffer.priceStatus,
    minimumQuantityUnits: mailerOffer.minimumQuantity,
    quantityComparisons: [...mailerOffer.quantityOptions],
    productionTiming: product.leadTime,
    responseTarget: siteConfig.responseTarget,
    facts: mailerOffer.facts.map((fact) => ({
      name: fact.label,
      value: fact.value,
      description: fact.detail,
    })),
    requestQuoteUrl: `${siteConfig.url}/get-a-quote?product=Mailer%20Boxes`,
    sampleKitUrl: `${siteConfig.url}/samples/box-sample-kit`,
  };
}

export function buildMailerOfferMarkdown(headingLevel: 2 | 4 = 2) {
  return `${"#".repeat(headingLevel)} Custom mailer box ordering

${mailerOffer.summary}

${mailerOffer.facts.map((fact) => `- **${fact.label}:** ${fact.detail}`).join("\n")}

Product: ${siteConfig.url}/products/${mailerOffer.productSlug}
Quote: ${siteConfig.url}/get-a-quote?product=Mailer%20Boxes
Price status: project-specific quotation; no fixed custom-production price or stock offer.
`;
}

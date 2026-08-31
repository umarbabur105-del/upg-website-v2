import type { FaqItem } from "@/data/faq";
import { siteConfig } from "@/data/site";

export const commercialTerms = {
  path: "/custom-packaging-pricing",
  markdownPath: "/custom-packaging-pricing.md",
  reviewedAt: siteConfig.contentReviewedAt,
  quickAnswer:
    "UPG custom-production pricing is quote-based because structure, dimensions, material, print, finish, quantity, and delivery destination change the manufacturing plan. The planning MOQ is 250 units for every custom product family. The final written quote confirms price, scope, freight, duties, taxes, payment, production timing, and delivery terms.",
  pricingFactors: [
    {
      title: "Structure and dimensions",
      description:
        "The packaging format, finished size, closure, insert, and assembly method affect material use and production setup.",
    },
    {
      title: "Material and construction",
      description:
        "Paperboard, kraft, corrugated board, rigid-board construction, flexible film, and required performance are reviewed for the chosen format.",
    },
    {
      title: "Print and finishes",
      description:
        "Print coverage, interior printing, foil, spot UV, embossing, debossing, windows, and other details can change production requirements.",
    },
    {
      title: "Production quantity",
      description:
        "The planning minimum is 250 units. The quoted quantity and any requested quantity breaks are priced against the approved specification.",
    },
    {
      title: "Delivery destination",
      description:
        "Freight service, destination, duties, taxes, import requirements, documentation, and delivery terms are confirmed per project.",
    },
    {
      title: "Proofing and project requirements",
      description:
        "Artwork readiness, samples, proofing, compatibility, compliance, and market-specific requirements are reviewed where applicable.",
    },
  ],
  quoteInputs: [
    "Packaging type or the product that needs packaging",
    "Finished dimensions, or product dimensions if the box size is not known",
    "Target quantity, starting from the 250-unit planning MOQ",
    "Material, print, and finish preferences",
    "Intended use and any compatibility or market requirements",
    "Delivery country, city, and postal code",
    "Artwork, reference images, dielines, or an existing sample when available",
  ],
  writtenQuoteControls: [
    "Approved packaging structure, dimensions, and production specification",
    "Quoted quantity, price, and the items expressly included in that price",
    "Artwork, sample, proof, and approval requirements where applicable",
    "Payment, production timing, packing, freight, and delivery terms",
    "Duties, taxes, documentation, and other project-specific conditions",
  ],
} as const;

export const commercialPricingFaqs: FaqItem[] = [
  {
    question: "What is the minimum order quantity for UPG custom packaging?",
    answer:
      "The planning MOQ is 250 units for every UPG custom product family, regardless of finished size. Final structure, dimensions, materials, and specifications remain subject to project review.",
  },
  {
    question: "Why does UPG not publish instant custom-packaging prices?",
    answer:
      "Custom packaging is made to specification. Structure, dimensions, material, print, finish, quantity, intended use, and delivery destination can change the production and delivery plan, so a human-reviewed written quote is required.",
  },
  {
    question: "Can I request a quote before every specification is final?",
    answer:
      "Yes. Incomplete briefs are welcome. Share the product, known dimensions, quantity, intended use, and destination. UPG targets an initial response within one business day, while final pricing may require further specification review.",
  },
  {
    question: "Does a custom-packaging quote include freight, duties, and taxes?",
    answer:
      "Only the accepted written quote determines what is included. Freight, duties, taxes, import requirements, documentation, and delivery terms must not be assumed unless they are expressly confirmed for the project.",
  },
  {
    question: "Are UPG sample kits priced separately from custom production?",
    answer:
      "Yes. The Box Sample Kit and Mylar Bag Sample Kit are separate fixed-price products at $19.99 each. The full price of the purchased kit is credited toward the buyer's first UPG custom packaging production order. Custom production pricing remains separate.",
  },
  {
    question: "When can custom packaging production begin?",
    answer:
      "Manufacturing starts only after the applicable commercial, artwork, and proof approvals are complete. The accepted written quote or agreement controls the final project terms.",
  },
];

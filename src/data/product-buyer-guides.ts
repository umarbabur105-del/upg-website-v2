import type { ProductFamily } from "./products";

interface BuyerExample {
  image: string;
  title: string;
  description: string;
  quoteNote: string;
}

export interface ProductBuyerGuide {
  priceHeading: string;
  priceIntro: string;
  quoteNote: string;
  pricingFactors: Array<{ title: string; description: string }>;
  briefChecklist: string[];
  examples: BuyerExample[];
}

// Commercial facts follow products.ts and commercial-terms.ts. These visuals
// are generated concepts, not photographs of completed customer orders.
const guides: Partial<Record<string, ProductBuyerGuide>> = {
  "custom-mailer-boxes": {
    priceHeading: "Custom mailer box pricing.",
    priceIntro:
      "Plan your custom mailer order from 250 units. Choose your size, printing and inserts, then compare quantities to find the right fit for your budget.",
    quoteNote:
      "Custom corrugated ear-lock mailer enquiry. Please review structure, print, insert options and pricing for my product.",
    pricingFactors: [
      {
        title: "Box size and product arrangement",
        description:
          "Send the product dimensions, weight and how the items should sit together. The box and corrugated construction are reviewed around that arrangement; a larger box or a different layout changes the specification.",
      },
      {
        title: "Outside print or inside and outside",
        description:
          "Exterior-only artwork and a printed interior are different production briefs. Ask for both on the same box size if you want to compare an unboxing feature against your budget.",
      },
      {
        title: "Insert and finish choices",
        description:
          "A custom insert, foil or spot UV changes the production requirements. Identify which details are essential, and ask for an alternative without optional finishes for a useful comparison.",
      },
      {
        title: "Order quantity and delivery",
        description:
          "Request quantity breaks on one specification and supply the delivery country and postal code. Check the total order price and exactly which freight, duties and taxes the written quote includes.",
      },
    ],
    briefChecklist: [
      "What goes in the box: product dimensions, weight and item count, if known.",
      "PR launch, subscription or ecommerce use; inside print and insert preferences.",
      "Quantity, destination and target delivery date. Artwork or a reference can follow.",
    ],
    examples: [
      {
        image: "/images/generated/mailer-boxes/mailer-boxes-inside-print-v1.png",
        title: "Inside printing for launch kits",
        description:
          "For PR and beauty launches where the lid interior carries the message. Compare outside-only printing with inside-and-outside printing using the same box and artwork scope.",
        quoteNote:
          "I am planning a PR or product-launch ear-lock mailer. Please compare exterior-only and interior-plus-exterior printing on the same specification.",
      },
      {
        image: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
        title: "Custom inserts for product sets",
        description:
          "For a set that needs a planned arrangement. Share each item's dimensions and weight so the insert layout and product fit can be reviewed before final artwork.",
        quoteNote:
          "I am planning a multi-item corrugated ear-lock presentation kit with a custom insert. Please review product fit, arrangement and insert options.",
      },
      {
        image: "/images/generated/mailer-boxes/mailer-boxes-sizes-v1.png",
        title: "Mailer sizes for subscription boxes",
        description:
          "For a repeat program with changing contents. Compare the smallest and largest planned assortments before choosing a box size; separate sizes or artworks need their own MOQ review.",
        quoteNote:
          "I am planning a recurring subscription ear-lock mailer. Please review the planned product assortments, box size and any artwork variants.",
      },
    ],
  },
  "custom-collapsible-magnetic-boxes": {
    priceHeading: "Collapsible magnetic box pricing.",
    priceIntro:
      "Plan your magnetic gift box order from 250 units. Your size, wrap, printing, inserts and finishes shape the price. Compare quantities and delivery options around your launch or gifting program.",
    quoteNote:
      "Custom collapsible magnetic box enquiry. Please review the fold-flat construction, assembly, insert options and pricing for my product.",
    pricingFactors: [
      {
        title: "Finished size and folding construction",
        description:
          "Provide the product or gift-set dimensions and desired arrangement. The folding method, closure and construction must work together at the approved size before the specification can be priced.",
      },
      {
        title: "Wrap, print and presentation finish",
        description:
          "Exterior and interior branding, foil, embossing, spot UV and soft-touch are options to review. Ask for a simpler finish alongside the preferred version if budget is a deciding factor.",
      },
      {
        title: "Insert and assembly plan",
        description:
          "An insert changes the fit and packing sequence. Explain who will assemble the boxes, where products will be packed and how inserts should be supplied so the complete configuration can be reviewed.",
      },
      {
        title: "Quantity, packed volume and freight",
        description:
          "Compare quantities on one specification. Fold-flat construction can reduce box storage volume before assembly, but freight savings depend on the full packing configuration, destination and delivery terms.",
      },
    ],
    briefChecklist: [
      "Product or gift-set dimensions, weight and arrangement; insert preferences.",
      "Who will assemble and pack the boxes, plus the intended print and finishes.",
      "Quantity, delivery destination and target date; flat storage or freight priorities.",
    ],
    examples: [
      {
        image: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-overhead-v1.png",
        title: "Magnetic gift boxes for beauty sets",
        description:
          "For beauty or seasonal gifting programs that assemble boxes before packing. Review the product arrangement and assembly sequence together, including any insert.",
        quoteNote:
          "I am planning a collapsible magnetic gift-set box assembled at the packing site. Please review the product arrangement, insert and assembly plan.",
      },
      {
        image: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-corner-fold-v1.png",
        title: "Fold-flat construction",
        description:
          "A folding structure makes the box easier to store before packing. Share your product dimensions so we can plan the folds, closure and assembly around your set.",
        quoteNote:
          "Please review the folding method, magnetic closure and assembly requirements for my collapsible box dimensions.",
      },
      {
        image: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-side-v1.png",
        title: "Premium presentation, compact storage",
        description:
          "For apparel or premium gifting where boxes are stored before use. Compare the collapsible configuration with an assembled magnetic box using the same product and destination.",
        quoteNote:
          "I need premium magnetic presentation with storage before use. Please compare collapsible and assembled magnetic box options for the same product, quantity and destination.",
      },
    ],
  },
};

export function getProductBuyerGuide(slug: string) {
  return guides[slug];
}

export function productBriefHref(
  family: ProductFamily,
  note: string,
  quantity?: number,
) {
  const params = new URLSearchParams({ product: family, builder_note: note });
  if (quantity !== undefined) params.set("quantity", String(quantity));
  return `/get-a-quote?${params.toString()}`;
}

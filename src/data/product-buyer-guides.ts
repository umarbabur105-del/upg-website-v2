import type { ProductFamily } from "./products";

interface BuyerExample {
  image: string;
  title: string;
  description: string;
  quoteNote: string;
}

export interface ProductBuyerGuide {
  galleryHeading?: string;
  quantityLabel?: string;
  priceHeading: string;
  priceIntro: string;
  quoteNote: string;
  pricingFactors: Array<{ title: string; description: string }>;
  briefChecklist: string[];
  examples: BuyerExample[];
}

const guides: Partial<Record<string, ProductBuyerGuide>> = {
  "custom-tuck-boxes": {
    galleryHeading: "Explore tuck box structures.",
    priceHeading: "Custom tuck box pricing.",
    priceIntro:
      "Plan your custom tuck box order from 250 units. The structure, dimensions, board, printing and finish are reviewed together so the written quote matches the carton your product needs.",
    quoteNote:
      "Custom tuck box enquiry. Please review the carton structure, dimensions, board, printing, finish and pricing for my product.",
    pricingFactors: [
      {
        title: "Carton structure and dimensions",
        description:
          "Straight tuck, reverse tuck, auto-lock, interlock and seal-end cartons have different construction requirements. Share the product dimensions, weight and opening or packing needs so the right structure can be reviewed.",
      },
      {
        title: "Board, printing and coverage",
        description:
          "SBS, kraft, CCNB, chipboard and corrugated board suit different briefs. One-sided or two-sided printing is planned around the selected stock and carton structure.",
      },
      {
        title: "Finishes and windows",
        description:
          "Matte, gloss, foil, spot UV, embossing, debossing and window options can change the production specification. Identify the details that are essential and any version you would like to compare.",
      },
      {
        title: "Quantity and delivery destination",
        description:
          "Compare quantity breaks on one approved specification and provide the delivery country and postal code. The written quote confirms the manufacturing scope and any freight, duties or taxes included.",
      },
    ],
    briefChecklist: [
      "Product dimensions, weight and intended carton structure or opening preference, if known.",
      "Board, printing sides, finish or window preferences; artwork or a reference can follow.",
      "Quantity, delivery destination and target date, including any planned size or artwork variants.",
    ],
    examples: [
      {
        image: "/images/generated/tuck-boxes/tuck-boxes-straight-reverse-v1.png",
        title: "Straight and reverse tuck cartons",
        description:
          "For retail cartons where the opening direction and panel layout need to suit the product. Share the product dimensions and packing method so the tuck orientation can be reviewed.",
        quoteNote:
          "I am planning a straight or reverse tuck carton. Please review the product dimensions, opening direction, board, print and quantity.",
      },
      {
        image: "/images/generated/tuck-boxes/tuck-boxes-autolock-v1.png",
        title: "Auto-lock bottom cartons",
        description:
          "For a tuck box brief that already calls for an auto-lock base. Include the product weight and how the carton will be packed so the construction can be assessed.",
        quoteNote:
          "I am planning an auto-lock bottom tuck box. Please review the product dimensions, weight, packing method, board and print requirements.",
      },
      {
        image: "/images/generated/tuck-boxes/tuck-boxes-seal-end-v1.png",
        title: "Seal-end and cereal-style cartons",
        description:
          "For a seal-end or cereal-style format. Explain how the carton will be filled and sealed, then we can review the structure, material and artwork layout.",
        quoteNote:
          "I am planning a seal-end or cereal-style folding carton. Please review the filling and sealing method, dimensions, board, print and quantity.",
      },
    ],
  },
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
  "custom-magnetic-boxes": {
    galleryHeading: "Explore magnetic box presentation options.",
    priceHeading: "Custom magnetic box pricing.",
    priceIntro:
      "Plan your custom magnetic box order from 250 units. Finished size, rigid construction, wrap, inserts and presentation finishes are reviewed around the product before the written quote is confirmed.",
    quoteNote:
      "Custom magnetic box enquiry. Please review the rigid construction, dimensions, closure, insert, finishes and pricing for my product.",
    pricingFactors: [
      {
        title: "Finished size and product arrangement",
        description:
          "Share the product or gift-set dimensions, weight and intended arrangement. The rigid box, magnetic closure and insert layout are developed around that presentation.",
      },
      {
        title: "Wrap and branding scope",
        description:
          "Exterior, interior and insert branding can be planned around the approved structure. Describe the intended artwork coverage and any printed or specialty wrap preference.",
      },
      {
        title: "Insert and presentation finishes",
        description:
          "Custom inserts, foil, embossing, debossing, spot UV and soft-touch are options to review. Ask for a simpler version alongside your preferred finish when comparing the project scope.",
      },
      {
        title: "Quantity and delivery destination",
        description:
          "Request quantity breaks using the same approved configuration, then provide the delivery country and postal code. The written quote confirms the production scope and included delivery terms.",
      },
    ],
    briefChecklist: [
      "Product or gift-set dimensions, weight and the intended arrangement inside the box.",
      "Exterior, interior, insert and finish preferences; artwork or a reference can follow.",
      "Quantity, delivery destination and target date, plus any alternative size or finish to compare.",
    ],
    examples: [
      {
        image: "/images/generated/magnetic-boxes/magnetic-boxes-open-v1.png",
        title: "Magnetic boxes for gift presentation",
        description:
          "For a premium gift, launch or collection where the opening presentation matters. Share the product arrangement so the finished box and magnetic closure can be reviewed together.",
        quoteNote:
          "I am planning a rigid magnetic presentation box. Please review the product arrangement, finished dimensions, closure, wrap and quantity.",
      },
      {
        image: "/images/generated/magnetic-boxes/magnetic-boxes-insert-v1.png",
        title: "Fitted inserts for product sets",
        description:
          "For a set that needs a planned position inside the rigid box. Provide each item’s dimensions and weight so the insert layout and presentation can be assessed.",
        quoteNote:
          "I am planning a rigid magnetic box with a fitted insert. Please review the item dimensions, weight, arrangement, insert and finish options.",
      },
      {
        image: "/images/generated/magnetic-boxes/magnetic-boxes-sizes-v1.png",
        title: "Magnetic boxes in custom sizes",
        description:
          "For a product range or gifting program with a defined box size. Separate sizes or artwork versions need their own MOQ review, so share the planned mix with the enquiry.",
        quoteNote:
          "I am planning custom-size rigid magnetic boxes. Please review the product dimensions, proposed size or artwork variants, quantity and delivery destination.",
      },
    ],
  },
  "custom-mylar-bags": {
    galleryHeading: "Explore flexible packaging formats.",
    quantityLabel: "For finished bag and pouch enquiries",
    priceHeading: "Custom Mylar bag pricing.",
    priceIntro:
      "Plan your finished custom pouch or bag order from 250 units. Bag format, dimensions, film, product compatibility, print, features and destination shape the written quote. Printed rollstock is reviewed separately for the packing plan.",
    quoteNote:
      "Custom Mylar bag or pouch enquiry. Please review the finished bag format, dimensions, film, print, features and pricing for my product.",
    pricingFactors: [
      {
        title: "Finished bag format and dimensions",
        description:
          "Stand-up, three-side-seal, flat-bottom, spout, coffee and child-resistant bag routes have different requirements. Share the product, fill format and finished dimensions so the right pouch path can be reviewed.",
      },
      {
        title: "Film, compatibility and performance needs",
        description:
          "Flexible-film structure, barrier needs and product compatibility are reviewed for the specific project. Food-contact, child-resistant and market-specific requirements require confirmation before approval.",
      },
      {
        title: "Print and functional features",
        description:
          "Matte, gloss, metallic, windows, zippers, valves and spouts can be specified where the chosen format supports them. Identify the features needed for the product and packing plan.",
      },
      {
        title: "Finished pouches or printed rollstock",
        description:
          "Use this quantity comparison for finished bag and pouch enquiries. Printed rollstock is a separate format: share the machine, web, repeat, sealing, order quantity or unit, and destination details for its own review.",
      },
    ],
    briefChecklist: [
      "Product, intended use, finished pouch format and dimensions; fill or closure details if known.",
      "Film, print, zipper, valve, window or spout preferences, plus compatibility or market requirements.",
      "Finished pouch quantity, delivery destination and target date; for rollstock, include machine, web, repeat and sealing details separately.",
    ],
    examples: [
      {
        image: "/images/generated/mylar-bags/mylar-bags-pouch-formats-v1.png",
        title: "Stand-up and three-side-seal pouches",
        description:
          "For a finished pouch brief where the product, fill format and closure need to guide the selection. Share the product and dimensions so the right pouch format can be reviewed.",
        quoteNote:
          "I am planning finished stand-up or three-side-seal pouches. Please review the product, fill format, dimensions, film, closure and quantity.",
      },
      {
        image: "/images/generated/mylar-bags/mylar-bags-flat-bottom-v1.png",
        title: "Flat-bottom bags for coffee and retail products",
        description:
          "For a flat-bottom flexible packaging format with a defined product and presentation need. Tell us whether a valve, zipper, window or finish is part of the brief.",
        quoteNote:
          "I am planning flat-bottom bags. Please review the product, dimensions, film, valve, zipper, window or finish requirements and quantity.",
      },
      {
        image: "/images/generated/mylar-bags/mylar-bags-spout-rollstock-v1.png",
        title: "Spout pouches and rollstock planning",
        description:
          "For a finished spout pouch where the product, fill format and closure guide the brief. Share the product and dimensions so the pouch specification can be reviewed.",
        quoteNote:
          "I am planning finished spout pouches. Please review the product, fill format, dimensions, film, spout and quantity.",
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

export function productBriefComparisonNote(quoteNote: string) {
  return `${quoteNote} Start with 250 units and also quote 500 and 1,000 units on the same specification. Please identify freight and other charges for each quantity.`;
}

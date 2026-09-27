import type { ProductFamily } from "./products";

interface BuyerExample {
  image: string;
  title: string;
  description: string;
  quoteNote: string;
}

export interface ProductBuyerGuide {
  selectionGuide?: {
    heading: string;
    intro: string;
    decisions: Array<{ title: string; description: string; quoteNote: string }>;
    resources: Array<{ label: string; href: string }>;
  };
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
    selectionGuide: {
      heading: "Choose a folding carton that fits your product.",
      intro: "Compare the opening, packing method and print surface before choosing a custom printed tuck box.",
      decisions: [
        {
          title: "Straight tuck or reverse tuck?",
          description: "Straight tuck end cartons have top and bottom closures that tuck in the same direction. Reverse tuck end cartons tuck in opposite directions. Match the opening to the front panel and how customers will remove the product.",
          quoteNote: "Please compare straight and reverse tuck end boxes for the same product, size, print and quantity. Help me choose the opening direction and front panel.",
        },
        {
          title: "Auto-lock or manual locking base?",
          description: "An auto-lock bottom has a pre-glued base that opens into position as the carton is erected. An interlock base is folded and locked by hand. Choose around the packing workflow, then check the board and base against the product weight.",
          quoteNote: "Please compare auto-lock and interlock carton bases for my product weight and packing workflow, keeping size, printing and quantity consistent.",
        },
        {
          title: "White SBS or brown kraft?",
          description: "White SBS gives full-color graphics a light printing surface. Brown kraft adds its own color and texture to the design. Compare the artwork on the intended stock before approving brand colors, especially light colors and fine detail.",
          quoteNote: "Please compare white SBS and brown kraft tuck boxes for the same product, size and quantity. Review how my artwork and brand colors will appear on each stock.",
        },
      ],
      resources: [
        { label: "Compare carton structures", href: "/packaging-styles/straight-tuck-end-boxes" },
        { label: "Cardstock thickness & finishes", href: "/materials-finishes" },
        { label: "Measure your product", href: "/blog/how-to-measure-product-for-custom-packaging" },
      ],
    },
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
          "Compare quantity breaks on one specification and provide the delivery country and postal code. Shipping costs are included in the quoted total for the agreed destination and service; the quote states how duties and taxes are handled.",
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
          "A pre-glued bottom opens into position when the carton is erected. Compare this packing method with a manual locking base, then choose the board and construction for the product weight.",
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
      "Plan your custom corrugated mailer order from 250 units. Review internal size, packed product, corrugated construction, printing, inserts, and delivery details together, then compare quantities on one specification.",
    quoteNote:
      "Custom corrugated ear-lock mailer enquiry. Please review structure, print, insert options and pricing for my product.",
    pricingFactors: [
      {
        title: "Box size and product arrangement",
        description:
          "Send the packed product's outside length, width, and height, plus weight and arrangement. State any requested internal mailer dimensions separately. A larger box or different layout changes the specification.",
      },
      {
        title: "Outside print or inside and outside",
        description:
          "Exterior-only artwork and a printed interior are different production briefs. Ask for both on the same box size when you want to compare an unboxing feature against your budget. CMYK and spot-color routing is confirmed in the written specification.",
      },
      {
        title: "Insert and finish choices",
        description:
          "A custom insert, foil, or spot UV changes fit and production requirements. Identify essential details, and request an alternative without optional finishes for a useful comparison. Confirm product fit with the applicable sample path.",
      },
      {
        title: "Order quantity and delivery",
        description:
          "Request quantity breaks on one specification and supply the delivery country and postal code. The written quote confirms price, production timing, and which freight, duties, and taxes are included. Carrier billing depends on the actual parcel and service.",
      },
    ],
    briefChecklist: [
      "Packed product outside dimensions, weight, item count, arrangement, and any protective layer or insert; requested internal mailer dimensions if known.",
      "PR launch, subscription, or ecommerce use; kraft or white presentation, inside print, flute, and insert preferences where known.",
      "Quantity, destination, and target delivery date. Artwork, a proof reference, or an existing sample can follow.",
    ],
    examples: [
      {
        image: "/images/generated/mailer-boxes/mailer-boxes-inside-print-v1.png",
        title: "Inside printing for launch kits",
        description:
          "For PR and beauty launches where the lid interior carries the message. Compare exterior-only and inside-and-outside printing using the same box, artwork scope, and quantity.",
        quoteNote:
          "I am planning a PR or product-launch ear-lock mailer. Please compare exterior-only and interior-plus-exterior printing on the same specification.",
      },
      {
        image: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
        title: "Custom inserts for product sets",
        description:
          "For a set that needs a planned arrangement. Share each item's packed dimensions and weight so the insert layout and product fit can be reviewed before final artwork.",
        quoteNote:
          "I am planning a multi-item corrugated ear-lock presentation kit with a custom insert. Please review product fit, arrangement and insert options.",
      },
      {
        image: "/images/generated/mailer-boxes/mailer-boxes-sizes-v1.png",
        title: "Mailer sizes for subscription boxes",
        description:
          "For a repeat program with changing contents. Compare the smallest and largest planned assortments before choosing an internal size; separate sizes or artworks need their own MOQ review.",
        quoteNote:
          "I am planning a recurring subscription ear-lock mailer. Please review the planned product assortments, box size and any artwork variants.",
      },
    ],
  },
  "custom-collapsible-magnetic-boxes": {
    selectionGuide: {
      heading: "Plan your fold-flat magnetic gift box.",
      intro: "Collapsible rigid boxes combine magnetic presentation with flat storage before assembly. Plan the packing steps alongside the design.",
      decisions: [
        {
          title: "Fold-flat or assembled rigid?",
          description: "Choose fold-flat boxes when space before packing matters and your team can erect the boxes. Compare an assembled magnetic box when the presentation structure needs to arrive ready for product packing.",
          quoteNote: "Please compare collapsible and assembled magnetic boxes for the same product arrangement, print, quantity and destination. Include the supply configuration and assembly requirements.",
        },
        {
          title: "Box and insert packing plan",
          description: "A box that folds flat does not mean its insert does too. Check how the insert is supplied, where it is stored and when it is fitted. Compare the complete packed shipment, including inserts, when evaluating freight.",
          quoteNote: "Please review a collapsible magnetic box with an insert, including how each component is supplied, stored and assembled. Include shipping costs for the complete configuration.",
        },
        {
          title: "Printed wrap or added finishes?",
          description: "Custom printing carries the main artwork; foil, embossing and spot UV add separate production steps. Compare a printed version with one accent finish while keeping the box size, insert and quantity the same.",
          quoteNote: "Please compare a printed collapsible magnetic box with and without my preferred accent finish, using the same size, insert and quantity.",
        },
      ],
      resources: [
        { label: "Compare assembled magnetic boxes", href: "/products/custom-magnetic-boxes" },
        { label: "Explore materials & finishes", href: "/materials-finishes" },
        { label: "Digital proofs & physical samples", href: "/blog/packaging-proof-vs-sample" },
      ],
    },
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
          "Fold-flat construction reduces box storage volume before assembly. Compare the full packing configuration, including inserts. Shipping costs are included in the quoted total for the agreed destination and service; savings depend on the shipment.",
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
    selectionGuide: {
      heading: "Build your magnetic box around the presentation.",
      intro: "Choose the structure, product arrangement and branding for a custom rigid gift box that works at the packing table and when opened.",
      decisions: [
        {
          title: "Assembled rigid or fold-flat?",
          description: "A standard magnetic box keeps its assembled shape before packing. A collapsible magnetic box stores flat and needs assembly. Compare the formats using the same contents and quantity, with storage space and packing labor in mind.",
          quoteNote: "Please compare assembled and collapsible magnetic boxes for the same contents, quantity, print and destination. Review storage space and packing requirements.",
        },
        {
          title: "One product or a fitted set?",
          description: "For a beauty kit, gift set or electronics bundle, plan each item's position before sizing the box. An insert takes up space of its own. Product dimensions, access for removal and the insert layout determine the usable interior.",
          quoteNote: "Please review a custom magnetic box and fitted insert for my product arrangement. Account for item dimensions, weight, removal space and the finished internal size.",
        },
        {
          title: "Outside branding or inside too?",
          description: "Exterior branding introduces the product; inside-lid printing can carry instructions or a gift message. Compare exterior-only printing with an interior design on the same structure before adding foil or other accent finishes.",
          quoteNote: "Please compare exterior-only and interior-plus-exterior branding for the same magnetic box size, insert and quantity. Price any accent finish separately in the comparison.",
        },
      ],
      resources: [
        { label: "Explore fold-flat magnetic boxes", href: "/products/custom-collapsible-magnetic-boxes" },
        { label: "Measure your product", href: "/blog/how-to-measure-product-for-custom-packaging" },
        { label: "Compare printing & finishes", href: "/materials-finishes" },
      ],
    },
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
          "Request quantity breaks using the same configuration and delivery postal code. Shipping costs are included in the quoted total for the agreed destination and service; the quote confirms production timing and how duties and taxes are handled.",
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
    selectionGuide: {
      heading: "Choose a pouch around how you fill and sell it.",
      intro: "Match the format, usable capacity, film and closure to the product before preparing the pouch artwork.",
      decisions: [
        {
          title: "Stand-up, flat-bottom or flat pouch?",
          description: "Stand-up pouches use an expanding bottom gusset for upright display. Flat-bottom bags have a defined base and additional panels. Three-side-seal pouches offer a flat format. Compare shelf presentation, filling method and usable capacity together.",
          quoteNote: "Please compare stand-up, flat-bottom and three-side-seal pouch options for my product and fill amount. Review shelf presentation, dimensions, closure and quantity.",
        },
        {
          title: "Fill weight is only the starting point",
          description: "The same weight of coffee beans and powder can occupy different volumes. Pouch width, height, gusset, seals and closure all affect usable space. Check a fill sample with the actual product before settling on the finished dimensions.",
          quoteNote: "Please help size a custom pouch for my product and target fill weight or volume, allowing for the gusset, seals and closure. Review suitable sample options before final approval.",
        },
        {
          title: "Finished pouches or printed rollstock?",
          description: "Finished pouches arrive formed for filling and sealing. Printed rollstock is film supplied on a roll for compatible form-fill-seal equipment. Choose around your packing line; rollstock needs its own web width, print repeat, sealing and quantity review.",
          quoteNote: "Please help choose between finished pouches and printed rollstock for my product and packing method. Review the film, dimensions, sealing and appropriate order quantity for each format.",
        },
      ],
      resources: [
        { label: "Explore stand-up pouches", href: "/packaging-styles/stand-up-pouches" },
        { label: "Coffee bag options", href: "/packaging-styles/coffee-bags" },
        { label: "Printed rollstock requirements", href: "/packaging-styles/printed-rollstock-film" },
      ],
    },
    galleryHeading: "Explore flexible packaging formats.",
    quantityLabel: "For finished bag and pouch enquiries",
    priceHeading: "Custom Mylar bag pricing.",
    priceIntro:
      "Finished custom pouch orders start at 250 units. Format, size, film, print and features shape the price, with shipping costs included for the agreed destination and service. Your quote states how duties and taxes are handled. Printed rollstock is quoted separately for your packing plan.",
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
        title: "Spout pouches for liquid products",
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

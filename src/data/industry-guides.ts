import type { ProductFamily } from "@/data/products";
import { productStyleGuides } from "@/data/product-styles";

export interface IndustryGuideVisual {
  src: string;
  alt: string;
  objectPosition?: string;
  zoom?: number;
}

export interface IndustryGuide {
  slug: string;
  name: string;
  shortName: string;
  primaryFamily: ProductFamily;
  productSlugs: string[];
  formatSlugs?: string[];
  heroTitle: string;
  heroDescription: string;
  metaDescription: string;
  keywords: string[];
  image: { src: string; alt: string; objectFit?: "contain" };
  heroLayout?: "full-scene";
  heroMobileImage?: string;
  heroCompanionImages?: IndustryGuideVisual[];
  quickAnswer: string;
  bestFor: string[];
  planningQuestions: Array<{ title: string; description: string }>;
  projectInputs: string[];
  scopeNote: string;
  compatibilityNote?: string;
  reviewedAt: string;
}

const reviewedAt = "2026-08-31";

export const industryGuides: IndustryGuide[] = [
  {
    slug: "custom-cereal-boxes",
    name: "Custom Cereal Boxes",
    shortName: "Cereal Boxes",
    primaryFamily: "Tuck Boxes",
    productSlugs: ["custom-tuck-boxes"],
    formatSlugs: ["seal-end-boxes"],
    heroTitle: "Custom cereal boxes developed as printed seal-end cartons.",
    heroDescription:
      "Plan a cereal-style outer carton around the finished size, quantity, board direction, artwork, packing method, and destination. UPG includes cereal-style seal-end boxes within its custom tuck box range.",
    metaDescription:
      "Custom printed cereal boxes and cereal-style seal-end cartons with UPG's 250-unit planning MOQ, approved tuck-box options, and project-specific pricing.",
    keywords: [
      "custom cereal boxes",
      "custom printed cereal boxes",
      "cereal box packaging",
      "cereal-style seal end cartons",
    ],
    image: {
      src: "/images/generated/tuck-boxes/tuck-boxes-seal-end-v1.png",
      alt: "Representative custom seal-end cereal-style carton concept",
    },
    quickAnswer:
      "UPG manufactures custom cereal boxes as part of its seal-end tuck box range. A useful quote requires the finished dimensions, quantity, intended packing and sealing method, board and print direction, artwork status, and delivery destination.",
    bestFor: [
      "Cereal-style retail cartons",
      "Printed seal-end product boxes",
      "Branded outer cartons",
      "Projects requiring custom dimensions and artwork",
    ],
    planningQuestions: [
      {
        title: "Confirm the finished structure",
        description:
          "State that the project is a cereal-style seal-end carton and share an existing box, dieline, or structural reference when one is available.",
      },
      {
        title: "Describe the packing process",
        description:
          "Explain how the carton will be filled and closed so the final structure can be reviewed before artwork is approved.",
      },
      {
        title: "Separate the carton from its contents",
        description:
          "UPG quotes the custom printed outer carton. Product filling and compatibility requirements remain part of the project review.",
      },
    ],
    projectInputs: [
      "Finished length, width, and depth",
      "Required quantity and delivery country",
      "Packing and sealing method",
      "Board, print, and finish direction",
      "Artwork, an existing dieline, or a reference carton",
    ],
    scopeNote:
      "This guide covers custom printed cereal-style outer cartons within UPG's tuck box range.",
    compatibilityNote:
      "The intended contents, liner or inner pack, packing process, and market requirements must be reviewed before the final carton specification is approved.",
    reviewedAt,
  },
  {
    slug: "custom-supplement-boxes",
    name: "Custom Supplement Boxes",
    shortName: "Supplement Boxes",
    primaryFamily: "Tuck Boxes",
    productSlugs: ["custom-tuck-boxes"],
    heroTitle: "Custom supplement boxes for branded outer-carton presentation.",
    heroDescription:
      "Develop a printed tuck box around the supplement container, finished dimensions, panel content, quantity, artwork, and destination without treating the outer carton as the filled product.",
    metaDescription:
      "Custom supplement boxes and printed outer cartons with UPG's 250-unit planning MOQ, tuck-box structures, premium finishes, and project review.",
    keywords: [
      "custom supplement boxes",
      "supplement packaging boxes",
      "vitamin packaging boxes",
      "custom supplement cartons",
    ],
    image: {
      src: "/images/generated/industry-guides/custom-supplement-boxes-theme-v1.webp",
      alt: "Representative custom printed tuck box concept for a supplement outer carton",
    },
    heroMobileImage: "/images/generated/industry-guides/custom-supplement-boxes-mobile-v1.webp",
    heroCompanionImages: [
      {
        src: "/images/generated/industry-guides/custom-supplement-boxes-theme-v1.webp",
        alt: "Open supplement outer carton showing its tuck flap and ivory and olive print",
        objectPosition: "76% 50%",
      },
      {
        src: "/images/generated/industry-guides/custom-supplement-boxes-theme-v1.webp",
        alt: "Closed supplement outer carton with ivory, olive, and charcoal geometric artwork",
        objectPosition: "20% 75%",
        zoom: 1.4,
      },
    ],
    quickAnswer:
      "UPG can manufacture custom printed tuck boxes for supplement outer packaging. The container dimensions, carton style, quantity, required panel content, artwork status, intended market, and destination are reviewed before pricing and production details are confirmed.",
    bestFor: [
      "Bottle and jar outer cartons",
      "Single-product retail boxes",
      "Branded supplement presentation",
      "Custom printed folding cartons",
    ],
    planningQuestions: [
      {
        title: "Build around the container",
        description:
          "Share the packed container dimensions and orientation so the outer carton starts from the actual product format.",
      },
      {
        title: "Reserve the required panels",
        description:
          "Identify the content and variable information that must fit on the approved panels before final artwork is placed.",
      },
      {
        title: "Confirm market requirements",
        description:
          "UPG does not infer regulatory copy or compliance. The buyer supplies or approves the content required for the intended market.",
      },
    ],
    projectInputs: [
      "Packed container dimensions and orientation",
      "Preferred tuck-box style or a reference box",
      "Quantity and delivery destination",
      "Panel-content and artwork status",
      "Board, print, and finish preferences",
    ],
    scopeNote:
      "This guide covers the custom printed outer carton around the supplement container, not the supplement, filling, bottle, jar, or label application.",
    compatibilityNote:
      "Buyer-supplied regulatory content, container fit, and market-specific requirements must be confirmed before final approval.",
    reviewedAt,
  },
  {
    slug: "custom-soap-boxes",
    name: "Custom Soap Boxes",
    shortName: "Soap Boxes",
    primaryFamily: "Tuck Boxes",
    productSlugs: ["custom-tuck-boxes"],
    heroTitle: "Custom soap boxes built around the bar, wrap, and shelf presentation.",
    heroDescription:
      "Plan a printed tuck box around the finished soap dimensions, any inner wrap, artwork, quantity, opening direction, and destination.",
    metaDescription:
      "Custom printed soap boxes with UPG's 250-unit planning MOQ, tuck-box style choices, board and finish options, and human-reviewed pricing.",
    keywords: [
      "custom soap boxes",
      "custom printed soap boxes",
      "soap packaging boxes",
      "soap boxes wholesale",
    ],
    image: {
      src: "/images/generated/industry-guides/custom-soap-boxes-theme-v1.webp",
      alt: "Representative custom printed tuck boxes for soap outer packaging",
    },
    heroCompanionImages: [
      {
        src: "/images/generated/industry-guides/custom-soap-boxes-theme-v1.webp",
        alt: "Representative closed soap outer carton with ivory, olive, and charcoal artwork",
        objectPosition: "32% 66%",
        zoom: 1.8,
      },
      {
        src: "/images/generated/industry-guides/custom-soap-boxes-theme-v1.webp",
        alt: "Representative open soap outer carton showing its tuck flap and printed panels",
        objectPosition: "64% 50%",
        zoom: 1.8,
      },
    ],
    quickAnswer:
      "UPG manufactures custom tuck boxes that can be developed around a finished soap product and its inner wrap. Pricing depends on the approved structure, dimensions, board, printing, finishes, quantity, and delivery destination.",
    bestFor: [
      "Single-bar outer cartons",
      "Printed retail soap boxes",
      "Branded personal-care packaging",
      "Giftable soap presentation",
    ],
    planningQuestions: [
      {
        title: "Measure the finished pack",
        description:
          "Use the dimensions of the soap with any intended inner wrap rather than relying only on the product name.",
      },
      {
        title: "Choose the opening direction",
        description:
          "Compare straight tuck, reverse tuck, and other approved tuck-box structures before the final dieline is prepared.",
      },
      {
        title: "Plan the artwork panels",
        description:
          "Provide the required copy, brand assets, and finish direction so the visual plan aligns with the approved structure.",
      },
    ],
    projectInputs: [
      "Finished soap dimensions with any inner wrap",
      "Preferred structure or reference packaging",
      "Quantity and delivery country",
      "Artwork and panel-content status",
      "Board, print, and finish preferences",
    ],
    scopeNote:
      "This guide covers the custom printed outer box. Soap production, wrapping, filling, and product formulation are outside this offer.",
    reviewedAt,
  },
  {
    slug: "custom-candle-boxes",
    name: "Custom Candle Boxes",
    shortName: "Candle Boxes",
    primaryFamily: "Tuck Boxes",
    productSlugs: ["custom-tuck-boxes", "custom-magnetic-boxes"],
    heroTitle: "Custom candle boxes for retail cartons and premium presentation.",
    heroDescription:
      "Compare a printed tuck box with a premium magnetic presentation box around the candle container, intended unboxing, insert needs, quantity, and destination.",
    metaDescription:
      "Custom candle boxes in printed tuck and premium magnetic formats, with UPG MOQ guidance, insert options, finishes, and project-specific pricing.",
    keywords: [
      "custom candle boxes",
      "custom printed candle boxes",
      "luxury candle packaging",
      "candle gift boxes",
    ],
    image: {
      src: "/images/generated/industry-guides/custom-candle-boxes-theme-v1.webp",
      alt: "Representative candle tuck carton and magnetic presentation box with candle jar props",
      objectFit: "contain",
    },
    heroLayout: "full-scene",
    heroCompanionImages: [
      {
        src: "/images/generated/industry-guides/custom-candle-boxes-theme-v1.webp",
        alt: "Detail of the representative candle tuck carton and its folded top closure",
        objectPosition: "10% 20%",
        zoom: 1.7,
      },
      {
        src: "/images/generated/industry-guides/custom-candle-boxes-theme-v1.webp",
        alt: "Detail of candle jar props in the representative magnetic box insert",
        objectPosition: "85% 75%",
        zoom: 1.5,
      },
    ],
    quickAnswer:
      "UPG can develop a tuck box for an individual retail candle or a magnetic box for premium presentation. The final recommendation depends on the candle container, product arrangement, desired opening experience, insert plan, quantity, artwork, and destination.",
    bestFor: [
      "Individual candle outer cartons",
      "Premium candle presentation",
      "Gift sets and launch collections",
      "Insert-led rigid boxes",
    ],
    planningQuestions: [
      {
        title: "Choose retail or presentation packaging",
        description:
          "Use a tuck box brief for an individual outer carton and compare a magnetic box when a premium set or presentation format is required.",
      },
      {
        title: "Share the complete product format",
        description:
          "Provide the container dimensions, orientation, and any intended set arrangement before the structure and insert are approved.",
      },
      {
        title: "Coordinate finishes with structure",
        description:
          "Finish options are reviewed against the selected product family rather than assumed from a visual reference alone.",
      },
    ],
    projectInputs: [
      "Candle container dimensions and orientation",
      "Single-product or set arrangement",
      "Quantity and destination",
      "Preferred product family or reference box",
      "Artwork, finish, and insert requirements",
    ],
    scopeNote:
      "This guide covers custom printed outer boxes and presentation packaging, not candle containers, candle production, filling, or fulfillment.",
    reviewedAt,
  },
  {
    slug: "custom-apparel-boxes",
    name: "Custom Apparel Boxes",
    shortName: "Apparel Boxes",
    primaryFamily: "Collapsible Magnetic Boxes",
    productSlugs: ["custom-collapsible-magnetic-boxes", "custom-magnetic-boxes"],
    heroTitle: "Custom apparel boxes for premium gifting and branded presentation.",
    heroDescription:
      "Compare magnetic and collapsible magnetic boxes around the folded product dimensions, presentation goal, storage and freight priorities, quantity, finishes, and destination.",
    metaDescription:
      "Custom apparel gift boxes in magnetic and collapsible magnetic formats, with a 250-unit UPG MOQ, finish options, and project review.",
    keywords: [
      "custom apparel boxes",
      "custom clothing boxes",
      "luxury apparel packaging",
      "magnetic apparel boxes",
    ],
    image: {
      src: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-hero-v1.png",
      alt: "Representative custom collapsible magnetic apparel presentation box",
    },
    quickAnswer:
      "UPG manufactures custom magnetic and collapsible magnetic boxes for apparel presentation. The box is developed around the folded product size, arrangement, opening experience, insert or tissue plan, quantity, artwork, and delivery destination.",
    bestFor: [
      "Premium folded apparel",
      "Gift and launch collections",
      "Branded retail presentation",
      "Projects prioritizing flat storage before assembly",
    ],
    planningQuestions: [
      {
        title: "Compare fixed and collapsible structures",
        description:
          "Choose a standard magnetic presentation or evaluate a collapsible magnetic box when storage and freight volume matter.",
      },
      {
        title: "Define the folded arrangement",
        description:
          "Share the folded product dimensions, number of items, and intended presentation before final dimensions are confirmed.",
      },
      {
        title: "Plan branded surfaces",
        description:
          "Coordinate exterior, interior, and insert branding with the approved structure and finish direction.",
      },
    ],
    projectInputs: [
      "Folded product dimensions and item count",
      "Preferred fixed or collapsible structure",
      "Quantity and delivery destination",
      "Insert, tissue, or presentation arrangement",
      "Artwork and finish references",
    ],
    scopeNote:
      "This guide covers custom presentation boxes. Garment production, folding, packout, warehousing, and fulfillment require separate written confirmation if requested.",
    reviewedAt,
  },
  {
    slug: "custom-jewelry-boxes",
    name: "Custom Jewelry Presentation Boxes",
    shortName: "Jewelry Presentation Boxes",
    primaryFamily: "Magnetic Boxes",
    productSlugs: ["custom-magnetic-boxes", "custom-collapsible-magnetic-boxes"],
    heroTitle: "Custom jewelry presentation boxes developed around the product arrangement.",
    heroDescription:
      "Plan a magnetic or collapsible magnetic presentation box around the jewelry set, intended insert, opening experience, branding, quantity, and destination.",
    metaDescription:
      "Custom jewelry presentation boxes in magnetic and collapsible magnetic formats with a 250-unit UPG MOQ, inserts, finishes, and project review.",
    keywords: [
      "custom jewelry boxes",
      "custom jewelry packaging",
      "luxury jewelry gift boxes",
      "magnetic jewelry boxes",
    ],
    image: {
      src: "/images/generated/magnetic-boxes/magnetic-boxes-open-v1.png",
      alt: "Representative open custom magnetic presentation box",
    },
    quickAnswer:
      "UPG manufactures magnetic and collapsible magnetic presentation boxes that can be planned around a jewelry product or set. Final dimensions, closure, insert layout, wraps, artwork, finishes, quantity, and destination require project review.",
    bestFor: [
      "Jewelry gift presentation",
      "Launch collections",
      "Multi-piece sets",
      "Premium branded unboxing",
    ],
    planningQuestions: [
      {
        title: "Define the set",
        description:
          "List every item and its orientation so the presentation box and insert start from the actual arrangement.",
      },
      {
        title: "Choose the storage model",
        description:
          "Compare a fixed magnetic box with a collapsible magnetic format when pre-assembly storage volume is important.",
      },
      {
        title: "Review the insert separately",
        description:
          "The insert is planned around the approved product arrangement and is not inferred from the outer box dimensions alone.",
      },
    ],
    projectInputs: [
      "Jewelry item count, dimensions, and arrangement",
      "Insert and presentation requirements",
      "Fixed or collapsible structure preference",
      "Quantity and delivery destination",
      "Artwork, wrap, and finish direction",
    ],
    scopeNote:
      "This guide covers the branded outer presentation box and approved insert. Jewelry, display fixtures, product assembly, and fulfillment are outside the standard offer.",
    reviewedAt,
  },
  {
    slug: "custom-electronics-boxes",
    name: "Custom Electronics Presentation Boxes",
    shortName: "Electronics Presentation Boxes",
    primaryFamily: "Magnetic Boxes",
    productSlugs: ["custom-magnetic-boxes", "custom-collapsible-magnetic-boxes"],
    heroTitle: "Custom electronics presentation boxes built around the device and accessories.",
    heroDescription:
      "Develop a magnetic or collapsible magnetic box around the complete device set, intended insert, presentation sequence, quantity, artwork, and destination.",
    metaDescription:
      "Custom electronics presentation boxes in magnetic and collapsible magnetic formats with a 250-unit UPG MOQ, inserts, and premium finishes.",
    keywords: [
      "custom electronics boxes",
      "electronics packaging boxes",
      "custom rigid electronics packaging",
      "magnetic electronics boxes",
    ],
    image: {
      src: "/images/generated/magnetic-boxes/magnetic-boxes-sizes-v1.png",
      alt: "Representative custom magnetic presentation boxes in multiple sizes",
    },
    quickAnswer:
      "UPG can manufacture magnetic and collapsible magnetic presentation boxes for electronics projects. The device, accessories, arrangement, insert, closure, dimensions, artwork, quantity, and destination are reviewed before the structure and pricing are confirmed.",
    bestFor: [
      "Device and accessory sets",
      "Product launches",
      "Premium retail presentation",
      "Branded technology gifting",
    ],
    planningQuestions: [
      {
        title: "List the complete packout",
        description:
          "Include the device, accessories, cables, documents, and intended arrangement before the outer box and insert are developed.",
      },
      {
        title: "Define presentation versus protection",
        description:
          "State the intended use and handling requirements so the project can be qualified instead of assuming a presentation box replaces every transport requirement.",
      },
      {
        title: "Confirm the insert plan",
        description:
          "The approved product arrangement drives the insert layout, artwork zones, and final dimensions.",
      },
    ],
    projectInputs: [
      "Device and accessory dimensions and weights",
      "Complete product arrangement",
      "Insert and opening-sequence requirements",
      "Quantity and delivery destination",
      "Artwork and finish references",
    ],
    scopeNote:
      "This guide covers custom branded presentation packaging. Product certification, device protection testing, electronics assembly, and fulfillment require separate project review and written confirmation.",
    compatibilityNote:
      "Protection, transport, static-control, battery, and market requirements must be supplied and reviewed when they apply to the project.",
    reviewedAt,
  },
  {
    slug: "custom-retail-boxes",
    name: "Custom Retail Product Boxes",
    shortName: "Retail Product Boxes",
    primaryFamily: "Tuck Boxes",
    productSlugs: ["custom-tuck-boxes"],
    formatSlugs: [
      "straight-tuck-end-boxes",
      "reverse-tuck-end-boxes",
      "auto-lock-bottom-boxes",
      "interlock-boxes",
      "seal-end-boxes",
    ],
    heroTitle: "Custom retail boxes planned around the product and shelf presentation.",
    heroDescription:
      "Select an approved tuck-box structure around the product dimensions, packing process, panel layout, quantity, printing, finishes, and destination.",
    metaDescription:
      "Custom retail product boxes with UPG's tuck-box styles, 250-unit planning MOQ, board, print and finish options, and project-specific pricing.",
    keywords: [
      "custom retail boxes",
      "custom retail packaging boxes",
      "custom product boxes",
      "printed retail boxes",
    ],
    image: {
      src: "/images/generated/tuck-boxes/tuck-boxes-hero-v1.png",
      alt: "Representative custom printed retail tuck boxes",
    },
    quickAnswer:
      "UPG manufactures custom printed retail boxes across straight tuck, reverse tuck, auto-lock, interlock, and seal-end structures. The right starting structure depends on the product, dimensions, packing method, panel layout, quantity, artwork, and destination.",
    bestFor: [
      "Branded consumer products",
      "Shelf-facing outer cartons",
      "Single-product retail packaging",
      "Custom printed folding cartons",
    ],
    planningQuestions: [
      {
        title: "Start with the packed product",
        description:
          "Use the dimensions and orientation of the product as it will sit inside the carton.",
      },
      {
        title: "Compare structures before artwork",
        description:
          "Review the available tuck-box styles before artwork is finalized on a production dieline.",
      },
      {
        title: "Map the panel content",
        description:
          "List the required copy, brand elements, and finish zones so the artwork plan fits the approved structure.",
      },
    ],
    projectInputs: [
      "Packed product dimensions and orientation",
      "Preferred style or a reference box",
      "Quantity and delivery country",
      "Artwork and panel-content status",
      "Board, print, and finish requirements",
    ],
    scopeNote:
      "This guide covers custom printed retail outer cartons within UPG's tuck box range.",
    reviewedAt,
  },
  {
    slug: "custom-food-pouches",
    name: "Custom Food Pouches",
    shortName: "Food Pouches",
    primaryFamily: "Mylar Bags",
    productSlugs: ["custom-mylar-bags"],
    formatSlugs: [
      "stand-up-pouches",
      "flat-bottom-bags",
      "three-side-seal-bags",
      "spout-pouches",
      "coffee-bags",
      "printed-rollstock-film",
    ],
    heroTitle: "Custom food pouches selected around the product and intended market.",
    heroDescription:
      "Compare stand-up, flat-bottom, three-side seal, spout, and rollstock formats while keeping film structure, compatibility, filling, quantity, and market requirements subject to project review.",
    metaDescription:
      "Custom printed food pouches across stand-up, flat-bottom, three-side seal, spout and rollstock formats, with a 250-unit MOQ and compatibility review.",
    keywords: [
      "custom food pouches",
      "custom printed food bags",
      "food mylar bags",
      "flexible food packaging",
    ],
    image: {
      src: "/images/generated/industry-guides/custom-food-pouches-theme-v1.webp",
      alt: "Stand-up, flat-bottom, and three-side-seal custom food pouch formats in the UPG visual theme",
    },
    quickAnswer:
      "UPG offers custom printed flexible packaging in stand-up, flat-bottom, three-side seal, spout, coffee bag, and rollstock formats. The contents, fill, intended market, film and barrier requirements, closure, dimensions, printing, quantity, and destination must be reviewed before the final specification is approved.",
    bestFor: [
      "Printed stand-up pouches",
      "Flat-bottom and three-side seal formats",
      "Spout pouch projects",
      "Printed rollstock projects",
    ],
    planningQuestions: [
      {
        title: "Identify the contents and process",
        description:
          "Share the product contents, target fill, and intended filling and sealing process before a film or format is approved.",
      },
      {
        title: "Choose the format from the filled pack",
        description:
          "Compare pouch styles using the target filled shape, opening method, closure, display goal, and packing setup.",
      },
      {
        title: "Confirm requirements, not assumptions",
        description:
          "Food-contact, barrier, storage, testing, and market requirements are reviewed from the buyer's project brief and required documentation.",
      },
    ],
    projectInputs: [
      "Product contents, target fill, and intended market",
      "Preferred pouch or rollstock format",
      "Filling and sealing process",
      "Quantity, dimensions, and delivery destination",
      "Closure, window, valve, spout, print, and finish requirements",
      "Required compatibility, barrier, or market documentation",
    ],
    scopeNote:
      "This guide covers custom printed flexible packaging. Product formulation, filling, shelf-life validation, and market approval are not automatic parts of the packaging quote.",
    compatibilityNote:
      "Film structure, contents, process, barrier, food-contact, storage, and destination-market requirements must be confirmed before approval.",
    reviewedAt,
  },
  {
    slug: "custom-supplement-pouches",
    name: "Custom Supplement Pouches",
    shortName: "Supplement Pouches",
    primaryFamily: "Mylar Bags",
    productSlugs: ["custom-mylar-bags"],
    formatSlugs: [
      "stand-up-pouches",
      "flat-bottom-bags",
      "three-side-seal-bags",
      "child-resistant-bags",
      "printed-rollstock-film",
    ],
    heroTitle: "Custom supplement pouches planned around the contents and fill format.",
    heroDescription:
      "Compare approved flexible formats around the contents, target fill, closure, film and barrier brief, artwork, quantity, intended market, and destination.",
    metaDescription:
      "Custom printed supplement pouches with a 250-unit UPG planning MOQ, stand-up, flat-bottom, three-side seal and rollstock options, and compatibility review.",
    keywords: [
      "custom supplement pouches",
      "supplement mylar bags",
      "custom vitamin pouches",
      "printed supplement bags",
    ],
    image: {
      src: "/images/generated/industry-guides/custom-supplement-pouches-theme-v1.webp",
      alt: "Custom supplement pouches with capsule and powder props",
    },
    heroCompanionImages: [
      {
        src: "/images/generated/industry-guides/custom-supplement-pouches-detail-flat-bottom-v1.webp",
        alt: "Close-up of an ivory, olive, and charcoal flat-bottom supplement pouch",
      },
      {
        src: "/images/generated/industry-guides/custom-supplement-pouches-detail-props-v1.webp",
        alt: "Supplement pouch beside a capsule dish and powder scoop",
      },
    ],
    quickAnswer:
      "UPG can develop custom printed flexible packaging for supplement projects in approved pouch or rollstock formats. Product contents, fill, intended market, film and barrier requirements, closure, dimensions, artwork, quantity, and destination require review before final approval.",
    bestFor: [
      "Stand-up supplement pouches",
      "Flat-bottom flexible packs",
      "Three-side seal projects",
      "Printed rollstock requirements",
    ],
    planningQuestions: [
      {
        title: "Describe the actual contents",
        description:
          "Share the form of the contents, target fill, storage expectations, and intended market rather than selecting film from a product name alone.",
      },
      {
        title: "Separate format from approval",
        description:
          "A pouch style is a starting point. Film structure, compatibility, required evidence, and filling process still require review.",
      },
      {
        title: "Plan the required copy",
        description:
          "The buyer supplies and approves the regulatory and variable content required for the intended market.",
      },
    ],
    projectInputs: [
      "Product contents, target fill, and intended market",
      "Preferred pouch or rollstock format",
      "Closure, dimensions, and filling process",
      "Quantity and delivery destination",
      "Artwork and required panel content",
      "Compatibility, barrier, or documentation requirements",
    ],
    scopeNote:
      "This guide covers custom printed flexible packaging. Supplement production, filling, regulatory copy creation, and market approval are outside the standard offer.",
    compatibilityNote:
      "Film structure, contents, filling process, barrier, storage, and market requirements must be confirmed before approval.",
    reviewedAt,
  },
  {
    slug: "custom-beverage-pouches",
    name: "Custom Beverage Pouches",
    shortName: "Beverage Pouches",
    primaryFamily: "Mylar Bags",
    productSlugs: ["custom-mylar-bags"],
    formatSlugs: ["spout-pouches"],
    heroTitle: "Custom beverage pouches developed around the contents and filling process.",
    heroDescription:
      "Plan a spout or other approved flexible format around the beverage contents, fill volume, spout, film and barrier brief, process, artwork, quantity, intended market, and destination.",
    metaDescription:
      "Custom printed beverage and spout pouches with a 250-unit UPG planning MOQ, project-specific film, spout, print, finish, and compatibility review.",
    keywords: [
      "custom beverage pouches",
      "custom spout pouches",
      "printed drink pouches",
      "flexible beverage packaging",
    ],
    image: {
      src: "/images/generated/mylar-bags/mylar-bags-spout-rollstock-v1.png",
      alt: "Representative custom spout pouch and printed flexible rollstock",
    },
    quickAnswer:
      "UPG offers custom spout pouches and other approved flexible formats for beverage projects after the contents, fill volume, filling process, spout, film and barrier requirements, seals, printing, quantity, intended market, and destination are reviewed.",
    bestFor: [
      "Custom spout pouch projects",
      "Printed flexible beverage packs",
      "Single-serve or multi-serve concepts",
      "Projects requiring a reviewed fill and closure brief",
    ],
    planningQuestions: [
      {
        title: "Start with contents and process",
        description:
          "The beverage, fill volume, filling method, sealing process, and storage conditions shape the technical review.",
      },
      {
        title: "Define the spout requirement",
        description:
          "Share the preferred spout position and reference pack when available; final components require confirmation.",
      },
      {
        title: "Confirm required evidence",
        description:
          "Compatibility, barrier, food-contact, testing, and market requirements are not inferred and must be supplied for review when applicable.",
      },
    ],
    projectInputs: [
      "Beverage contents, fill volume, and intended market",
      "Filling, sealing, and storage process",
      "Preferred pouch and spout reference",
      "Quantity, dimensions, and destination",
      "Artwork, print, and finish requirements",
      "Compatibility, barrier, testing, or documentation requirements",
    ],
    scopeNote:
      "This guide covers custom printed flexible packaging. Beverage production, filling, shelf-life validation, and market approval are not included unless separately reviewed and confirmed in writing.",
    compatibilityNote:
      "Spout, film, contents, process, barrier, food-contact, storage, and destination-market requirements must be confirmed before approval.",
    reviewedAt,
  },
  {
    slug: "custom-luxury-gift-boxes",
    name: "Custom Luxury Gift Boxes",
    shortName: "Luxury Gift Boxes",
    primaryFamily: "Magnetic Boxes",
    productSlugs: ["custom-magnetic-boxes", "custom-collapsible-magnetic-boxes"],
    heroTitle: "Custom luxury gift boxes in magnetic and collapsible formats.",
    heroDescription:
      "Compare fixed and collapsible magnetic boxes around the products, arrangement, insert, opening experience, storage priorities, artwork, finishes, quantity, and destination.",
    metaDescription:
      "Custom luxury gift boxes in magnetic and collapsible magnetic formats, with a 250-unit UPG MOQ, inserts, branding, and premium finish options.",
    keywords: [
      "custom luxury gift boxes",
      "custom magnetic gift boxes",
      "collapsible magnetic gift boxes",
      "premium custom gift boxes",
    ],
    image: {
      src: "/images/generated/magnetic-boxes/magnetic-boxes-hero-v1.png",
      alt: "Representative custom premium magnetic gift box",
    },
    quickAnswer:
      "UPG manufactures custom magnetic and collapsible magnetic gift boxes with approved branding, insert, and premium finish options. The final structure is developed around the products, arrangement, presentation goal, quantity, artwork, and destination.",
    bestFor: [
      "Premium gift sets",
      "Launch and seasonal collections",
      "Corporate and branded gifting",
      "Presentation-led retail packaging",
    ],
    planningQuestions: [
      {
        title: "Choose fixed or collapsible",
        description:
          "Compare the established presentation of a fixed magnetic box with a collapsible format when freight and pre-assembly storage volume matter.",
      },
      {
        title: "Plan the complete set",
        description:
          "List every product and its arrangement before the box dimensions and insert are finalized.",
      },
      {
        title: "Coordinate the finish system",
        description:
          "Exterior, interior, insert branding, and selected finishes should be planned together on the approved structure.",
      },
    ],
    projectInputs: [
      "Product count, dimensions, and arrangement",
      "Fixed or collapsible magnetic preference",
      "Insert and opening-experience requirements",
      "Quantity and delivery destination",
      "Artwork, wrap, and finish references",
    ],
    scopeNote:
      "This guide covers the custom branded presentation box and approved insert. Product sourcing, assembly, packout, warehousing, and fulfillment require separate written confirmation if requested.",
    reviewedAt,
  },
  {
    slug: "custom-pet-food-packaging",
    name: "Custom Pet Food & Treat Packaging",
    shortName: "Pet Food & Treat Packaging",
    primaryFamily: "Mylar Bags",
    productSlugs: ["custom-mylar-bags"],
    formatSlugs: [
      "stand-up-pouches",
      "flat-bottom-bags",
      "three-side-seal-bags",
      "printed-rollstock-film",
    ],
    heroTitle: "Custom pet food and treat packaging.",
    heroDescription:
      "Compare UPG's current pouch and rollstock formats around the contents, target fill, closure, filling process, artwork, quantity, intended market, and delivery destination.",
    metaDescription:
      "Custom pet food and treat packaging in stand-up, flat-bottom, three-side seal, and rollstock formats, with a 250-unit planning MOQ and project review.",
    keywords: [
      "custom pet food packaging",
      "custom dog treat bags",
      "custom pet treat packaging",
      "printed pet food pouches",
    ],
    image: {
      src: "/images/generated/mylar-bags/mylar-bags-hero-v1.png",
      alt: "Representative custom printed flexible pouch concepts",
    },
    quickAnswer:
      "UPG can develop custom printed Mylar bags for pet food and treat projects in its current stand-up, flat-bottom, three-side seal, and rollstock formats. The contents, fill, closure, film brief, process, artwork, quantity, intended market, and destination must be reviewed before the final specification is approved.",
    bestFor: [
      "Printed pet treat pouches",
      "Stand-up and flat-bottom pack concepts",
      "Three-side seal projects",
      "Printed rollstock requirements",
    ],
    planningQuestions: [
      {
        title: "Describe the contents and target fill",
        description:
          "Share what will be packed, the target fill, storage expectations, and intended market before a film structure or format is approved.",
      },
      {
        title: "Choose the format from the packing plan",
        description:
          "Compare the current pouch and rollstock formats using the intended filling, sealing, opening, closure, and display requirements.",
      },
      {
        title: "Confirm compatibility requirements",
        description:
          "Required compatibility, barrier, storage, testing, and market documentation must come from the project brief rather than from a general product category.",
      },
    ],
    projectInputs: [
      "Product contents, target fill, and intended market",
      "Preferred pouch or rollstock format",
      "Filling, sealing, storage, and closure requirements",
      "Quantity, dimensions, and delivery destination",
      "Artwork, print, and finish direction",
      "Required compatibility, barrier, testing, or market documentation",
    ],
    scopeNote:
      "This guide covers custom printed flexible packaging. Pet food or treat production, filling, product claims, shelf-life validation, and market approval are outside the standard packaging quote.",
    compatibilityNote:
      "Film structure, contents, process, barrier, storage, testing, and destination-market requirements must be confirmed before final approval.",
    reviewedAt,
  },
  {
    slug: "custom-snack-packaging",
    name: "Custom Snack & Confectionery Packaging",
    shortName: "Snack & Confectionery Packaging",
    primaryFamily: "Mylar Bags",
    productSlugs: ["custom-mylar-bags", "custom-tuck-boxes"],
    formatSlugs: [
      "stand-up-pouches",
      "flat-bottom-bags",
      "three-side-seal-bags",
      "printed-rollstock-film",
      "seal-end-boxes",
    ],
    heroTitle: "Custom snack and confectionery packaging.",
    heroDescription:
      "Compare current UPG pouch, rollstock, and seal-end carton formats around the contents, target fill, packing method, retail presentation, quantity, artwork, intended market, and destination.",
    metaDescription:
      "Custom printed snack and confectionery packaging across pouches, rollstock, and seal-end cartons, with UPG MOQ guidance and project review.",
    keywords: [
      "custom snack packaging",
      "custom candy packaging",
      "custom confectionery packaging",
      "printed snack bags",
    ],
    image: {
      src: "/images/generated/mylar-bags/mylar-bags-pouch-formats-v1.png",
      alt: "Representative custom printed flexible pouch formats",
    },
    quickAnswer:
      "UPG can quote current Mylar bag formats for snack and confectionery projects and can also review a custom seal-end outer carton when that structure fits the brief. Contents, fill, packing process, film or board specification, closure, artwork, quantity, intended market, and destination require review before approval.",
    bestFor: [
      "Printed snack and candy pouches",
      "Stand-up and flat-bottom pack concepts",
      "Three-side seal and rollstock projects",
      "Seal-end retail outer cartons",
    ],
    planningQuestions: [
      {
        title: "Choose the pack role first",
        description:
          "State whether the project needs a flexible primary pack, printed rollstock, or an outer retail carton so the correct UPG family is reviewed.",
      },
      {
        title: "Share the filling and sealing process",
        description:
          "The contents, target fill, packing equipment or method, closure, and storage expectations shape the specification review.",
      },
      {
        title: "Keep artwork tied to the approved structure",
        description:
          "Final artwork should be placed only after the pouch, rollstock, or carton format and its production template are confirmed.",
      },
    ],
    projectInputs: [
      "Product contents, target fill, and intended market",
      "Flexible pack, rollstock, or outer-carton requirement",
      "Filling, sealing, closure, and storage process",
      "Quantity, dimensions, and delivery destination",
      "Artwork and print direction",
      "Required compatibility, barrier, testing, or market documentation",
    ],
    scopeNote:
      "This guide covers custom printed flexible packaging and approved tuck-box outer cartons. Product manufacture, filling, wrapping, shelf-life validation, and market approval are outside the standard packaging quote.",
    compatibilityNote:
      "Contents, film or board structure, filling process, barrier, storage, testing, and destination-market requirements must be confirmed before final approval.",
    reviewedAt,
  },
  {
    slug: "custom-toy-packaging",
    name: "Custom Packaging for Games, Toys & Collectibles",
    shortName: "Games, Toys & Collectibles",
    primaryFamily: "Tuck Boxes",
    productSlugs: [
      "custom-tuck-boxes",
      "custom-mailer-boxes",
      "custom-magnetic-boxes",
      "custom-collapsible-magnetic-boxes",
    ],
    formatSlugs: [
      "straight-tuck-end-boxes",
      "reverse-tuck-end-boxes",
      "auto-lock-bottom-boxes",
      "interlock-boxes",
      "seal-end-boxes",
    ],
    heroTitle: "Custom packaging for games, toys, and collectible product sets.",
    heroDescription:
      "Compare current UPG tuck, ear-lock mailer, magnetic, and collapsible magnetic boxes around the product arrangement, retail or presentation role, insert needs, artwork, quantity, and destination.",
    metaDescription:
      "Custom packaging for games, toys, and collectibles across tuck, ear-lock mailer, magnetic, and collapsible magnetic box formats.",
    keywords: [
      "custom toy packaging",
      "custom game boxes",
      "custom collectible packaging",
      "custom toy boxes",
    ],
    image: {
      src: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
      alt: "Representative corrugated ear-lock presentation mailer with a custom insert",
    },
    quickAnswer:
      "UPG can review tuck boxes for individual retail products, corrugated ear-lock mailers for branded presentation, and fixed or collapsible magnetic boxes for premium sets. The complete product arrangement, dimensions, weights, insert plan, opening sequence, artwork, quantity, and destination determine the correct starting structure.",
    bestFor: [
      "Individual retail toy cartons",
      "Game and collectible sets",
      "Branded ear-lock presentation mailers",
      "Premium magnetic-box editions",
    ],
    planningQuestions: [
      {
        title: "Define retail, presentation, or premium gifting",
        description:
          "The packaging role narrows the choice between a tuck carton, branded ear-lock mailer, and a fixed or collapsible magnetic presentation box.",
      },
      {
        title: "List every packed component",
        description:
          "Share the product pieces, dimensions, weights, documents, accessories, and intended arrangement before the outer box and insert are finalized.",
      },
      {
        title: "Separate presentation from transport requirements",
        description:
          "State the handling and protection requirements explicitly. UPG's corrugated offer on this page is an ear-lock presentation mailer, not a standard shipping carton or master carton.",
      },
    ],
    projectInputs: [
      "Complete product and accessory list",
      "Dimensions, weights, and intended arrangement",
      "Retail, presentation, or premium-gift role",
      "Insert and opening-sequence requirements",
      "Quantity and delivery destination",
      "Artwork, print, and finish references",
    ],
    scopeNote:
      "This guide covers custom printed tuck boxes, branded corrugated ear-lock mailers, and magnetic presentation boxes. Standard shipping cartons, master cartons, RSC cases, product assembly, packout, and fulfillment are outside the standard offer.",
    compatibilityNote:
      "Product fit, insert performance, handling, transport, testing, and destination-market requirements must be supplied and reviewed when they apply.",
    reviewedAt,
  },
];

const productStyleBySlug = new Map(
  productStyleGuides.map((style) => [style.slug, style])
);

for (const guide of industryGuides) {
  for (const formatSlug of guide.formatSlugs ?? []) {
    const style = productStyleBySlug.get(formatSlug);

    if (!style) {
      throw new Error(
        `Industry guide ${guide.slug} references unknown packaging style ${formatSlug}.`
      );
    }

    if (!guide.productSlugs.includes(style.parentProductSlug)) {
      throw new Error(
        `Industry guide ${guide.slug} must include parent product ${style.parentProductSlug} for packaging style ${formatSlug}.`
      );
    }
  }
}

for (const style of productStyleGuides) {
  const hasIndustryApplication = industryGuides.some((guide) =>
    guide.formatSlugs?.includes(style.slug)
  );

  if (!hasIndustryApplication) {
    throw new Error(
      `Packaging style ${style.slug} has no approved industry application.`
    );
  }
}

export function getIndustryGuideBySlug(slug: string) {
  return industryGuides.find((guide) => guide.slug === slug);
}

export function getIndustryGuidesByProduct(productSlug: string) {
  return industryGuides.filter((guide) => guide.productSlugs.includes(productSlug));
}

export function getIndustryGuidesByStyleSlug(styleSlug: string) {
  return industryGuides.filter((guide) =>
    guide.formatSlugs?.includes(styleSlug)
  );
}

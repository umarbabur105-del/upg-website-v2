export type ProductFamily =
  | "Tuck Boxes"
  | "Mailer Boxes"
  | "Magnetic Boxes"
  | "Collapsible Magnetic Boxes"
  | "Mylar Bags";

export type ProductCategory =
  | "Tuck Boxes"
  | "Corrugated Mailers"
  | "Rigid Boxes"
  | "Flexible Packaging";

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  family: ProductFamily;
  category: ProductCategory;
  sku: string;
  bestFor: string;
  summary: string;
  longSummary: string;
  metaDescription: string;
  moq: string;
  leadTime: string;
  image: string;
  heroImage: string;
  galleryImages: Array<{ src: string; alt: string }>;
  materials: string[];
  prints: string[];
  finishes: string[];
  sizes: string;
  sizeFlexibility: string;
  useCases: string[];
  industries: string[];
  materialOptions: string;
  printOptions: string;
  finishOptions: string;
  artworkRequirements: string;
  screeningNote: string;
  quoteCta: string;
}

export const products: Product[] = [
  {
    slug: "custom-tuck-boxes",
    name: "Custom Tuck Boxes",
    shortName: "Tuck Boxes",
    family: "Tuck Boxes",
    category: "Tuck Boxes",
    sku: "UPG-TUCK",
    bestFor: "Retail products, cosmetics, food cartons, and everyday secondary packaging",
    summary:
      "Custom printed tuck boxes across the core folding-carton styles, materials, and premium finish options.",
    longSummary:
      "Choose straight tuck end, reverse tuck end, auto-lock, interlock, or seal-end boxes for products that need a printed retail carton. Cereal-style seal-end boxes are included in this family.",
    metaDescription:
      "Custom tuck boxes in straight tuck, reverse tuck, auto-lock, interlock, seal-end, and cereal-style formats, manufactured for brands worldwide.",
    moq: "250–1,000 units, based on finished size",
    leadTime: "Confirmed after specification review",
    image: "/images/generated/tuck-boxes/tuck-boxes-hero-v1.png",
    heroImage: "/images/generated/tuck-boxes/tuck-boxes-hero-v1.png",
    galleryImages: [
      {
        src: "/images/generated/tuck-boxes/tuck-boxes-straight-reverse-v1.png",
        alt: "Custom straight tuck and reverse tuck boxes",
      },
      {
        src: "/images/generated/tuck-boxes/tuck-boxes-autolock-v1.png",
        alt: "Custom auto-lock tuck box construction",
      },
      {
        src: "/images/generated/tuck-boxes/tuck-boxes-seal-end-v1.png",
        alt: "Custom seal-end folding carton box",
      },
    ],
    materials: [
      "SBS C1S for one-sided printing",
      "SBS C2S for printing on both sides",
      "Brown, white, or black kraft",
      "CCNB and chipboard",
      "Corrugated board with flute selected for the structure",
    ],
    prints: ["One-sided printing", "Printing on both sides", "Interior printing where the selected stock supports it"],
    finishes: [
      "Matte or gloss",
      "Foil stamping",
      "Spot UV",
      "Embossing or debossing",
      "Window",
    ],
    sizes:
      "Custom sizes. MOQ is 1,000 units when every finished dimension is 5 in or less, 500 units when the largest dimension is over 5 in through 10 in, and 250 units when it is over 10 in.",
    sizeFlexibility:
      "The final minimum is confirmed from the finished dimensions and selected structure.",
    useCases: [
      "Straight tuck end boxes",
      "Reverse tuck end boxes",
      "Auto-lock and interlock boxes",
      "Seal-end and cereal-style boxes",
    ],
    industries: ["Cosmetics", "Food & Beverage", "Supplements", "Retail", "Personal Care"],
    materialOptions:
      "SBS C1S or C2S, kraft in brown, white or black, CCNB, chipboard, and corrugated board.",
    printOptions:
      "One-sided or two-sided printing is planned around the selected material and carton structure.",
    finishOptions:
      "Matte, gloss, foil, spot UV, embossing, debossing, and window options are available.",
    artworkRequirements:
      "Final artwork is prepared on the approved dieline. Share existing files or references with the project enquiry.",
    screeningNote:
      "MOQ depends on finished size. Additional materials, calipers, and finishes can be reviewed for the specific project.",
    quoteCta: "Start a tuck box project",
  },
  {
    slug: "custom-mailer-boxes",
    name: "Custom Corrugated Mailer Boxes",
    shortName: "Mailer Boxes",
    family: "Mailer Boxes",
    category: "Corrugated Mailers",
    sku: "UPG-MAILER",
    bestFor: "PR kits, subscription boxes, ecommerce packaging, and branded presentation",
    summary:
      "Ear-lock corrugated boxes built for branded unboxing, product presentation, and repeat programs.",
    longSummary:
      "Custom corrugated mailer boxes use an ear-lock structure for PR kits, subscription programs, ecommerce orders, and branded product presentation. Exterior printing, interior printing, custom inserts, and specialty finishes are available.",
    metaDescription:
      "Custom corrugated ear-lock mailer boxes for PR kits, subscriptions, ecommerce, and presentation, manufactured worldwide with size-based MOQs.",
    moq: "250–1,000 units, based on finished size",
    leadTime: "Confirmed after specification review",
    image: "/images/generated/mailer-boxes/mailer-boxes-hero-v1.png",
    heroImage: "/images/generated/mailer-boxes/mailer-boxes-hero-v1.png",
    galleryImages: [
      {
        src: "/images/generated/mailer-boxes/mailer-boxes-inside-print-v1.png",
        alt: "Corrugated ear-lock mailer box with inside print",
      },
      {
        src: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
        alt: "Corrugated ear-lock mailer box with custom insert",
      },
      {
        src: "/images/generated/mailer-boxes/mailer-boxes-sizes-v1.png",
        alt: "Custom corrugated mailer boxes in multiple sizes",
      },
    ],
    materials: ["Corrugated board", "Exterior printing", "Interior printing", "Custom inserts"],
    prints: ["Exterior print", "Interior and exterior print"],
    finishes: ["Matte or gloss", "Foil stamping", "Spot UV", "Custom inserts"],
    sizes:
      "Custom sizes. MOQ is 1,000 units when every finished dimension is 5 in or less, 500 units when the largest dimension is over 5 in through 10 in, and 250 units when it is over 10 in.",
    sizeFlexibility:
      "The final minimum is confirmed from the finished dimensions and ear-lock mailer structure.",
    useCases: [
      "PR and influencer kits",
      "Subscription mailers",
      "Branded ecommerce packaging",
      "Product launch and presentation boxes",
    ],
    industries: ["Ecommerce", "Cosmetics", "Subscription", "Gifting", "Consumer Products"],
    materialOptions:
      "Corrugated construction with print and insert options planned around the product and presentation goal.",
    printOptions:
      "Exterior-only printing or exterior and interior printing for a branded unboxing experience.",
    finishOptions:
      "Matte, gloss, foil, spot UV, and custom inserts are available for the approved structure.",
    artworkRequirements:
      "Final artwork is prepared on the approved mailer dieline. Insert artwork is coordinated with the planned product arrangement.",
    screeningNote:
      "UPG supplies ear-lock mailer boxes, not regular slotted shipping cartons, master cartons, or RSC cases.",
    quoteCta: "Start a mailer box project",
  },
  {
    slug: "custom-magnetic-boxes",
    name: "Custom Magnetic Boxes",
    shortName: "Magnetic Boxes",
    family: "Magnetic Boxes",
    category: "Rigid Boxes",
    sku: "UPG-MAGNETIC",
    bestFor: "Premium gifts, beauty, apparel, electronics, and launch collections",
    summary:
      "Premium rigid boxes with a magnetic closure, custom inserts, and presentation-led finishes.",
    longSummary:
      "Custom magnetic boxes create a premium presentation for gifts, beauty products, apparel, electronics, and launch collections. The structure can be paired with custom inserts and premium finish options.",
    metaDescription:
      "Custom magnetic rigid boxes with premium finishes and inserts for brands worldwide. Minimum order 250 units; specifications are confirmed per project.",
    moq: "250 units",
    leadTime: "Confirmed after specification review",
    image: "/images/generated/magnetic-boxes/magnetic-boxes-hero-v1.png",
    heroImage: "/images/generated/magnetic-boxes/magnetic-boxes-hero-v1.png",
    galleryImages: [
      {
        src: "/images/generated/magnetic-boxes/magnetic-boxes-open-v1.png",
        alt: "Open custom magnetic rigid presentation box",
      },
      {
        src: "/images/generated/magnetic-boxes/magnetic-boxes-insert-v1.png",
        alt: "Custom magnetic rigid box with fitted insert",
      },
      {
        src: "/images/generated/magnetic-boxes/magnetic-boxes-sizes-v1.png",
        alt: "Custom magnetic rigid boxes in multiple sizes",
      },
    ],
    materials: ["Rigid box construction", "Custom inserts", "Printed or specialty wraps"],
    prints: ["Exterior branding", "Interior branding", "Insert branding where required"],
    finishes: ["Foil", "Embossing or debossing", "Spot UV", "Soft-touch"],
    sizes: "250-unit MOQ; final dimensions are confirmed after structural feasibility review.",
    sizeFlexibility:
      "Dimensions, closure, and insert layout are developed around the product presentation.",
    useCases: ["Premium gift boxes", "Beauty sets", "Apparel presentation", "Electronics packaging"],
    industries: ["Gifting", "Beauty", "Apparel", "Electronics", "Luxury Retail"],
    materialOptions:
      "Rigid construction with wrap and insert options selected for the approved presentation.",
    printOptions:
      "Exterior, interior, and insert branding can be planned around the chosen structure.",
    finishOptions:
      "Foil, embossing, debossing, spot UV, soft-touch, and custom inserts are available.",
    artworkRequirements:
      "Final artwork is prepared on the approved wrapped-box and insert dielines.",
    screeningNote:
      "The magnetic closure and insert plan are confirmed before final artwork and production approval.",
    quoteCta: "Start a magnetic box project",
  },
  {
    slug: "custom-collapsible-magnetic-boxes",
    name: "Custom Collapsible Magnetic Boxes",
    shortName: "Collapsible Magnetic Boxes",
    family: "Collapsible Magnetic Boxes",
    category: "Rigid Boxes",
    sku: "UPG-COLLAPSIBLE-MAGNETIC",
    bestFor: "Premium gifting and branded presentation with lower freight and storage volume",
    summary:
      "A premium magnetic rigid box that folds flat to reduce freight and storage space.",
    longSummary:
      "Custom collapsible magnetic boxes deliver the premium presentation of a magnetic box while folding flat for more efficient freight and storage. Custom inserts and premium finishes are available.",
    metaDescription:
      "Custom collapsible magnetic boxes that fold flat for efficient storage and freight. Worldwide manufacturing with a 250-unit minimum order.",
    moq: "250 units",
    leadTime: "Confirmed after specification review",
    image:
      "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-hero-v1.png",
    heroImage:
      "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-hero-v1.png",
    galleryImages: [
      {
        src: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-overhead-v1.png",
        alt: "Overhead view of a collapsible magnetic box being assembled",
      },
      {
        src: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-corner-fold-v1.png",
        alt: "Collapsible magnetic box corner-fold construction",
      },
      {
        src: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-side-v1.png",
        alt: "Side view of a collapsible magnetic rigid box",
      },
    ],
    materials: ["Collapsible rigid construction", "Magnetic closure", "Custom inserts"],
    prints: ["Exterior branding", "Interior branding", "Insert branding where required"],
    finishes: ["Foil", "Embossing or debossing", "Spot UV", "Soft-touch"],
    sizes: "250-unit MOQ; final dimensions are confirmed after structural feasibility review.",
    sizeFlexibility:
      "Dimensions, folding structure, closure, and insert layout are developed around the product.",
    useCases: ["Premium gift sets", "Beauty launches", "Apparel presentation", "Seasonal collections"],
    industries: ["Gifting", "Beauty", "Apparel", "Luxury Retail", "Subscription"],
    materialOptions:
      "Collapsible rigid construction with wrap and insert options selected for the approved presentation.",
    printOptions:
      "Exterior, interior, and insert branding can be planned around the chosen structure.",
    finishOptions:
      "Foil, embossing, debossing, spot UV, soft-touch, and custom inserts are available.",
    artworkRequirements:
      "Final artwork is prepared on the approved collapsible-box and insert dielines.",
    screeningNote:
      "The folding method, magnetic closure, and insert plan are confirmed before final approval.",
    quoteCta: "Start a collapsible box project",
  },
  {
    slug: "custom-mylar-bags",
    name: "Custom Mylar Bags",
    shortName: "Mylar Bags",
    family: "Mylar Bags",
    category: "Flexible Packaging",
    sku: "UPG-MYLAR",
    bestFor: "Coffee, packaged food, supplements, liquid-product formats, child-resistant options, and flexible packaging",
    summary:
      "Custom printed flexible packaging across pouches, bags, and rollstock film formats.",
    longSummary:
      "Custom Mylar bags include three-side seal bags, flat-bottom bags, stand-up pouches, spout bags, child-resistant bags, coffee bags, and rollstock film. Depending on the format, options can include zippers, valves, windows, and matte, gloss, or metallic finishes.",
    metaDescription:
      "Custom Mylar bags in stand-up, flat-bottom, three-side-seal, spout, child-resistant, coffee, and rollstock formats. Minimum order 500 units.",
    moq: "500 units",
    leadTime: "Confirmed after specification review",
    image: "/images/generated/mylar-bags/mylar-bags-hero-v1.png",
    heroImage: "/images/generated/mylar-bags/mylar-bags-hero-v1.png",
    galleryImages: [
      {
        src: "/images/generated/mylar-bags/mylar-bags-pouch-formats-v1.png",
        alt: "Custom stand-up, three-side-seal, and child-resistant pouches",
      },
      {
        src: "/images/generated/mylar-bags/mylar-bags-flat-bottom-v1.png",
        alt: "Custom flat-bottom flexible packaging bags",
      },
      {
        src: "/images/generated/mylar-bags/mylar-bags-spout-rollstock-v1.png",
        alt: "Custom spout pouch and printed flexible rollstock film",
      },
    ],
    materials: ["Flexible film structures", "Rollstock film", "Window options"],
    prints: ["Custom printed bags", "Custom printed pouches", "Printed rollstock film"],
    finishes: ["Matte", "Gloss", "Metallic", "Window", "Zipper", "Valve"],
    sizes: "Custom sizes with a 500-unit MOQ.",
    sizeFlexibility:
      "Bag format, dimensions, closure, valve, spout, and rollstock requirements are reviewed per project.",
    useCases: [
      "Three-side seal and stand-up pouches",
      "Flat-bottom and coffee bags",
      "Spout and child-resistant bags",
      "Rollstock film",
    ],
    industries: ["Coffee & Beverage", "Food", "Supplements", "Personal Care", "Consumer Products"],
    materialOptions:
      "Flexible-film structures are selected after the bag format and intended product use are reviewed.",
    printOptions:
      "Custom print is available across approved bag, pouch, and rollstock formats.",
    finishOptions:
      "Zippers, valves, windows, and matte, gloss, or metallic finishes can be specified where the selected format supports them.",
    artworkRequirements:
      "Final artwork is prepared on the approved bag or rollstock template with seal and feature areas marked.",
    screeningNote:
      "Product compatibility, barrier needs, food-contact requirements, and any child-resistant or market-specific compliance must be confirmed before the final specification is approved.",
    quoteCta: "Start a Mylar bag project",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  return products.filter((product) => product.slug !== currentSlug).slice(0, limit);
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export function getProductFaqs(product: Product): ProductFaq[] {
  return [
    {
      question: `What is the minimum order for ${product.name}?`,
      answer: product.sizes,
    },
    {
      question: `What are ${product.name.toLowerCase()} best used for?`,
      answer: `${product.bestFor}. ${product.longSummary}`,
    },
    {
      question: `What information should I include in my ${product.shortName.toLowerCase()} enquiry?`,
      answer:
        `Share the intended use, quantity, dimensions if available, delivery country, artwork status, and any material or finish preferences. ${product.artworkRequirements}`,
    },
    {
      question: `What must be confirmed before production?`,
      answer:
        `${product.screeningNote} Final pricing, production timing, and delivery terms are confirmed for the approved project specification.`,
    },
  ];
}

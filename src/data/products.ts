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
  metaTitle: string;
  metaDescription: string;
  searchTerms?: string[];
  reviewedAt?: string;
  buyerDecisionFaq?: {
    question: string;
    answer: string;
  };
  styleDecisionGuide?: {
    eyebrow: string;
    title: string;
    intro: string;
    faqQuestion: string;
    quoteNote: string;
    groups: Array<{
      title: string;
      description: string;
      styleSlugs: string[];
    }>;
  };
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
      "Custom printed tuck boxes and folding cartons across the core structures, materials, and premium finish options.",
    longSummary:
      "Custom tuck boxes are printed folding cartons available in straight tuck end, reverse tuck end, auto-lock, interlock, and seal-end structures. Cereal-style seal-end boxes are included in this family.",
    metaTitle: "Custom Tuck Boxes & Printed Folding Cartons",
    metaDescription:
      "Custom printed tuck boxes and folding cartons in straight tuck, reverse tuck, auto-lock, interlock, seal-end and cereal-style formats. Worldwide delivery.",
    searchTerms: [
      "custom tuck boxes",
      "custom printed tuck boxes",
      "custom folding cartons",
      "custom tuck boxes wholesale",
      "straight tuck end boxes",
      "reverse tuck end boxes",
      "auto-lock bottom boxes",
      "seal end boxes",
    ],
    reviewedAt: "2026-08-31",
    styleDecisionGuide: {
      eyebrow: "Tuck box structure comparison",
      title: "Compare five real structures before final artwork begins.",
      intro:
        "Use the style name as the start of the brief. UPG confirms the final structure after the product, dimensions, packing method, board, artwork, quantity, and destination have been reviewed.",
      faqQuestion: "Which custom tuck box style should I compare first?",
      quoteNote: "Please review and recommend the tuck box structure.",
      groups: [
        {
          title: "Straight or reverse tuck end",
          description:
            "Start here when opening direction and panel layout are the main comparison. Final flap orientation is confirmed before artwork is placed on the approved dieline.",
          styleSlugs: ["straight-tuck-end-boxes", "reverse-tuck-end-boxes"],
        },
        {
          title: "Auto-lock or interlock brief",
          description:
            "Start here when one of these locking structures is already in the brief. Share product dimensions and weight, packing method, or a reference structure for review.",
          styleSlugs: ["auto-lock-bottom-boxes", "interlock-boxes"],
        },
        {
          title: "Seal-end or cereal-style brief",
          description:
            "Start here for a cereal-style carton or another seal-end enquiry. Share the intended format and how the carton will be filled and sealed.",
          styleSlugs: ["seal-end-boxes"],
        },
      ],
    },
    moq: "250 units",
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
      "Custom sizes with a 250-unit planning MOQ; final dimensions remain subject to structural feasibility review.",
    sizeFlexibility:
      "Dimensions and structure are confirmed for feasibility and pricing; the planning MOQ remains 250 units.",
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
      "Additional materials, calipers, and finishes can be reviewed for the specific project.",
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
      "Custom printed corrugated ear-lock mailer boxes for branded unboxing, product presentation, and repeat programs.",
    longSummary:
      "UPG's custom corrugated mailer boxes use an ear-lock structure for PR kits, influencer campaigns, subscription programs, ecommerce presentation, and branded product launches. Exterior printing, interior printing, custom inserts, and specialty finishes are available.",
    metaTitle: "Custom Corrugated Mailer & Ear-Lock Boxes",
    metaDescription:
      "Custom printed corrugated mailer boxes and ear-lock boxes for PR kits, subscriptions, ecommerce and branded presentation. Worldwide delivery.",
    searchTerms: [
      "custom corrugated mailer boxes",
      "custom mailer boxes",
      "custom printed mailer boxes",
      "ear lock mailer boxes",
      "corrugated boxes",
      "custom PR boxes",
      "custom subscription boxes",
      "branded ecommerce mailer boxes",
    ],
    reviewedAt: "2026-08-31",
    buyerDecisionFaq: {
      question: "Which corrugated mailer box path should I use?",
      answer:
        "Use the PR box guide for launches, press, media kits, events, or broad brand presentations; the influencer guide for creator seeding; the subscription guide for recurring assortments; and the ecommerce guide for branded online-order presentation. Every path stays inside UPG's custom ear-lock corrugated mailer offer. Standard shipping cartons, master cartons, and RSC cases are not supplied.",
    },
    moq: "250 units",
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
      "Custom sizes with a 250-unit planning MOQ; final dimensions remain subject to structural feasibility review.",
    sizeFlexibility:
      "Dimensions and the ear-lock structure are confirmed for feasibility and pricing; the planning MOQ remains 250 units.",
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
    metaTitle: "Custom Magnetic Rigid Boxes with Inserts",
    metaDescription:
      "Custom magnetic rigid boxes with premium finishes and inserts for brands worldwide. Minimum order 250 units; specifications are confirmed per project.",
    searchTerms: [
      "custom magnetic boxes",
      "custom magnetic closure boxes",
      "custom rigid magnetic boxes",
      "magnetic gift boxes",
      "premium magnetic boxes",
    ],
    reviewedAt: "2026-08-31",
    buyerDecisionFaq: {
      question: "Should I choose a standard or collapsible magnetic box?",
      answer:
        "A standard magnetic box uses an assembled rigid presentation structure. A collapsible magnetic box folds flat before assembly for more efficient freight and storage. Compare both routes from the product arrangement, dimensions, insert, quantity, finish, destination, and preferred packing method before the structure is approved.",
    },
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
    metaTitle: "Custom Collapsible Magnetic Boxes",
    metaDescription:
      "Custom collapsible magnetic boxes that fold flat for efficient storage and freight. Worldwide manufacturing with a 250-unit minimum order.",
    searchTerms: [
      "custom collapsible magnetic boxes",
      "fold flat magnetic boxes",
      "foldable magnetic gift boxes",
      "collapsible rigid boxes",
      "collapsible magnetic closure boxes",
    ],
    reviewedAt: "2026-08-31",
    buyerDecisionFaq: {
      question: "When should I compare a collapsible magnetic box?",
      answer:
        "Compare the collapsible route when a premium magnetic presentation is required and the box should ship or store flat before assembly. Compare a standard magnetic box when an assembled rigid presentation structure is preferred. Final suitability depends on the dimensions, product arrangement, insert, finish, quantity, destination, and packing method.",
    },
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
      "Custom printed Mylar bags, pouches, and rollstock film across UPG's current flexible-packaging formats.",
    longSummary:
      "Custom printed Mylar bags include three-side seal bags, flat-bottom bags, stand-up pouches, spout bags, child-resistant bags, coffee bags, and printed rollstock film. Depending on the format, options can include zippers, valves, windows, and matte, gloss, or metallic finishes.",
    metaTitle: "Custom Printed Mylar Bags, Pouches & Rollstock",
    metaDescription:
      "Custom printed Mylar bags, pouches, and rollstock film in stand-up, flat-bottom, three-side-seal, spout, child-resistant, and coffee formats. MOQ 250.",
    searchTerms: [
      "custom Mylar bags",
      "custom printed Mylar bags",
      "custom printed pouches",
      "custom stand up pouches",
      "custom coffee bags",
      "custom spout pouches",
      "printed rollstock film",
      "flexible packaging rollstock",
    ],
    reviewedAt: "2026-08-31",
    buyerDecisionFaq: {
      question: "Should I request finished pouches or printed rollstock film?",
      answer:
        "Choose a finished pouch route when the required format is a stand-up, flat-bottom, three-side-seal, spout, coffee, or child-resistant bag. Choose printed rollstock when the packing plan requires custom film on roll. Film structure, product compatibility, machine, web, repeat, sealing, quantity, print, and destination details require project review.",
    },
    moq: "250 units",
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
    sizes: "Custom sizes with a 250-unit planning MOQ.",
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
  const faqs = [
    {
      question: `What is the minimum order for ${product.name}?`,
      answer:
        "The planning MOQ is 250 units for this product family, regardless of finished size. Final structure and specifications remain subject to project review.",
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

  if (product.styleDecisionGuide) {
    faqs.push({
      question: product.styleDecisionGuide.faqQuestion,
      answer: `${product.styleDecisionGuide.intro} ${product.styleDecisionGuide.groups
        .map((group) => `${group.title}: ${group.description}`)
        .join(" ")}`,
    });
  }

  if (product.buyerDecisionFaq) {
    faqs.push(product.buyerDecisionFaq);
  }

  return faqs;
}

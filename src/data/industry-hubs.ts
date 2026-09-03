export interface IndustryHubLink {
  label: string;
  href: string;
  description: string;
}

export interface IndustryHub {
  slug: string;
  name: string;
  metaTitle?: string;
  shortName: string;
  heroTitle: string;
  heroDescription: string;
  metaDescription: string;
  keywords: string[];
  image: { src: string; alt: string };
  productSlugs: string[];
  guideLinks: IndustryHubLink[];
  childGuideSlugs: string[];
  quickAnswer: string;
  selectionGuide: Array<{
    need: string;
    startingPoint: string;
    reason: string;
    href: string;
  }>;
  projectInputs: string[];
  scopeNote: string;
  compatibilityNote: string;
  officialResources?: Array<{
    label: string;
    href: string;
    description: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
  reviewedAt: string;
}

const reviewedAt = "2026-08-31";

export const industryHubs: IndustryHub[] = [
  {
    slug: "food-beverage-packaging",
    name: "Custom Food & Beverage Packaging",
    shortName: "Food & Beverage",
    heroTitle:
      "Custom food and beverage packaging across cartons and printed pouches.",
    heroDescription:
      "Compare UPG tuck boxes and Mylar bag formats from the way the product will be packed, displayed, filled, and delivered. Final materials and compatibility requirements are reviewed for each project.",
    metaDescription:
      "Compare custom food and beverage packaging across printed tuck cartons, cereal boxes, stand-up pouches, coffee bags, spout pouches, and rollstock.",
    keywords: [
      "custom food packaging",
      "custom beverage packaging",
      "printed food packaging",
      "custom food boxes and pouches",
      "custom flexible food packaging",
    ],
    image: {
      src: "/images/generated/mylar-bags/mylar-bags-pouch-formats-v1.png",
      alt: "Representative custom printed pouch formats for food and beverage packaging",
    },
    productSlugs: ["custom-tuck-boxes", "custom-mylar-bags"],
    guideLinks: [
      {
        label: "Cereal Boxes",
        href: "/industries/custom-cereal-boxes",
        description:
          "Plan cereal-style seal-end outer cartons around the finished pack and filling method.",
      },
      {
        label: "Food Pouches",
        href: "/industries/custom-food-pouches",
        description:
          "Compare stand-up, flat-bottom, three-side seal, spout, and rollstock formats.",
      },
      {
        label: "Snack & Confectionery Packaging",
        href: "/industries/custom-snack-packaging",
        description:
          "Choose between a printed outer carton and flexible pack from the actual product brief.",
      },
      {
        label: "Beverage Pouches",
        href: "/industries/custom-beverage-pouches",
        description:
          "Start a spout-pouch or flexible beverage brief from the contents, fill, and process.",
      },
      {
        label: "Coffee Bags",
        href: "/packaging-styles/coffee-bags",
        description:
          "Review the current coffee-bag format, project inputs, and specification boundaries.",
      },
    ],
    childGuideSlugs: [
      "custom-cereal-boxes",
      "custom-food-pouches",
      "custom-snack-packaging",
      "custom-beverage-pouches",
    ],
    quickAnswer:
      "Use a tuck box when the brief is a printed folding outer carton. Start with Mylar bags when the brief is a pouch, coffee bag, or printed rollstock format. The product contents, packed dimensions or target fill, filling and sealing process, quantity, artwork, intended market, and destination decide the final specification.",
    selectionGuide: [
      {
        need: "A shelf-facing folding carton",
        startingPoint: "Tuck boxes",
        reason:
          "Use this path for printed outer cartons, including cereal-style seal-end structures.",
        href: "/products/custom-tuck-boxes",
      },
      {
        need: "A stand-up, flat-bottom, or three-side seal pack",
        startingPoint: "Mylar bags",
        reason:
          "Start from the target fill, packed shape, closure, and filling process.",
        href: "/products/custom-mylar-bags",
      },
      {
        need: "A beverage pack with a spout",
        startingPoint: "Spout pouches",
        reason:
          "The contents, fill volume, process, spout, and film brief require project review.",
        href: "/packaging-styles/spout-pouches",
      },
      {
        need: "A printed coffee pack",
        startingPoint: "Coffee bags",
        reason:
          "Use the coffee-bag guide to define the format, fill, closure, valve direction, and artwork.",
        href: "/packaging-styles/coffee-bags",
      },
    ],
    projectInputs: [
      "Product contents and intended market",
      "Finished carton dimensions or target pouch fill",
      "Preferred carton, pouch, coffee-bag, or rollstock format",
      "Filling, sealing, closure, spout, or valve requirements",
      "Quantity, artwork status, and delivery destination",
      "Required compatibility, barrier, testing, or market documentation",
    ],
    scopeNote:
      "UPG's current food and beverage offer on this page covers custom printed outer cartons and flexible packaging. Product formulation, filling, shelf-life validation, and market approval are not automatically included.",
    compatibilityNote:
      "Contents, film or board specification, filling process, barrier, food-contact, storage, testing, and destination-market requirements must be supplied and reviewed when they apply.",
    faqs: [
      {
        question: "Should I start with a box or a pouch?",
        answer:
          "Start with a tuck box for a printed folding outer carton. Start with Mylar bags for a pouch, coffee bag, or printed rollstock brief. UPG confirms the final format after the product and process are reviewed.",
      },
      {
        question: "Does this page confirm that a material is suitable for my contents?",
        answer:
          "No. Suitability is not inferred from the industry name. The contents, process, barrier, storage, testing, documentation, and intended market must be reviewed for the project.",
      },
    ],
    reviewedAt,
  },
  {
    slug: "beauty-personal-care-packaging",
    name: "Custom Beauty & Personal Care Packaging",
    metaTitle: "Custom Beauty Packaging Boxes | 250-Unit MOQ",
    shortName: "Beauty & Personal Care",
    heroTitle:
      "Custom beauty packaging boxes for retail, PR kits, and premium sets.",
    heroDescription:
      "Compare UPG tuck, ear-lock mailer, magnetic, and collapsible magnetic boxes around the product, presentation goal, quantity, artwork, and destination.",
    metaDescription:
      "Custom beauty packaging boxes from 250 units. Compare tuck, mailer, magnetic, and collapsible formats for retail products, PR kits, and premium sets.",
    keywords: [
      "custom beauty packaging",
      "custom personal care packaging",
      "beauty product boxes",
      "personal care packaging boxes",
      "custom cosmetic packaging boxes",
    ],
    image: {
      src: "/images/generated/tuck-boxes/tuck-boxes-straight-reverse-v1.png",
      alt: "Representative custom printed folding cartons for beauty and personal care products",
    },
    productSlugs: [
      "custom-tuck-boxes",
      "custom-mailer-boxes",
      "custom-magnetic-boxes",
      "custom-collapsible-magnetic-boxes",
    ],
    guideLinks: [
      {
        label: "Cosmetics Packaging",
        href: "/cosmetics",
        description:
          "Browse the detailed cosmetics hub for skincare, serum, lipstick, perfume, and PR packaging.",
      },
      {
        label: "Skincare Boxes",
        href: "/cosmetics/skincare-boxes",
        description:
          "Review outer-carton and presentation-box paths around the finished skincare product.",
      },
      {
        label: "Perfume Boxes",
        href: "/cosmetics/perfume-boxes",
        description:
          "Compare outer cartons and premium presentation structures around the bottle and insert.",
      },
      {
        label: "Beauty PR Boxes",
        href: "/cosmetics/pr-boxes",
        description:
          "Plan branded ear-lock mailers and premium presentation formats for product launches.",
      },
      {
        label: "Soap Boxes",
        href: "/industries/custom-soap-boxes",
        description:
          "Develop a printed tuck box around the finished soap and any intended inner wrap.",
      },
    ],
    childGuideSlugs: ["custom-soap-boxes"],
    quickAnswer:
      "Use tuck boxes for individual retail outer cartons, corrugated ear-lock mailers for branded presentation and PR kits, and magnetic or collapsible magnetic boxes for premium sets. Product dimensions, arrangement, insert needs, opening experience, artwork, quantity, and destination determine the final structure.",
    selectionGuide: [
      {
        need: "An individual retail outer carton",
        startingPoint: "Tuck boxes",
        reason:
          "Develop the carton around the finished product, panel content, opening direction, and artwork.",
        href: "/products/custom-tuck-boxes",
      },
      {
        need: "A branded PR or presentation mailer",
        startingPoint: "Mailer boxes",
        reason:
          "Use the corrugated ear-lock mailer path for presentation and unboxing projects.",
        href: "/products/custom-mailer-boxes",
      },
      {
        need: "A premium fixed presentation box",
        startingPoint: "Magnetic boxes",
        reason:
          "Start here when the opening experience, product arrangement, and insert lead the brief.",
        href: "/products/custom-magnetic-boxes",
      },
      {
        need: "Premium presentation with compact pre-assembly storage",
        startingPoint: "Collapsible magnetic boxes",
        reason:
          "Compare the fold-flat structure when storage and freight volume are planning priorities.",
        href: "/products/custom-collapsible-magnetic-boxes",
      },
    ],
    projectInputs: [
      "Finished product or container dimensions and orientation",
      "Individual product, set, PR kit, or gift presentation role",
      "Preferred structure or a reference package",
      "Product arrangement and insert requirements",
      "Quantity, artwork status, finishes, and delivery destination",
      "Buyer-supplied panel content and intended-market requirements",
    ],
    scopeNote:
      "This hub covers custom printed outer cartons and presentation boxes. Cosmetic containers, formulas, product filling, labeling, campaign assembly, and fulfillment are outside the standard offer.",
    compatibilityNote:
      "The buyer confirms product fit, container dimensions, required panel content, product-specific handling, and intended-market requirements before final approval.",
    officialResources: [
      {
        label: "FDA Cosmetics Labeling Guide",
        href: "https://www.fda.gov/cosmetics/cosmetics-labeling-regulations/cosmetics-labeling-guide",
        description:
          "Official U.S. labeling reference for buyers planning required content and panel space. UPG does not create or approve regulatory copy.",
      },
    ],
    faqs: [
      {
        question: "Is cosmetics packaging still available as its own section?",
        answer:
          "Yes. The dedicated cosmetics hub remains available for skincare, serum, lipstick, perfume, PR kits, and related beauty packaging. This page is the broader beauty and personal care decision path.",
      },
      {
        question: "Does UPG supply cosmetic bottles, jars, formulas, or filling?",
        answer:
          "No. UPG's current offer covers custom printed outer packaging and presentation boxes. Containers, formulas, filling, and label application are outside the standard offer.",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    slug: "supplement-packaging",
    name: "Custom Supplement Packaging",
    metaTitle: "Custom Supplement Boxes & Pouches | 250 MOQ",
    shortName: "Supplements & Wellness",
    heroTitle:
      "Custom supplement boxes, pouches, and printed rollstock.",
    heroDescription:
      "Compare UPG tuck boxes and Mylar bag formats around the actual container or contents, packed dimensions or target fill, required panel content, quantity, and destination.",
    metaDescription:
      "Custom supplement boxes and pouches from 250 units. Compare printed cartons, stand-up and flat-bottom bags, child-resistant bags, and rollstock.",
    keywords: [
      "custom supplement packaging",
      "custom supplement boxes and pouches",
      "printed supplement packaging",
      "custom vitamin packaging",
      "supplement packaging manufacturer",
    ],
    image: {
      src: "/images/generated/mylar-bags/mylar-bags-flat-bottom-v1.png",
      alt: "Representative custom printed flexible bag for supplement packaging",
    },
    productSlugs: ["custom-tuck-boxes", "custom-mylar-bags"],
    guideLinks: [
      {
        label: "Supplement Boxes",
        href: "/industries/custom-supplement-boxes",
        description:
          "Plan a printed outer carton around the finished bottle, jar, or other approved container.",
      },
      {
        label: "Supplement Pouches",
        href: "/industries/custom-supplement-pouches",
        description:
          "Compare pouch and rollstock formats around the contents, fill, closure, and process.",
      },
      {
        label: "Child-Resistant Bags",
        href: "/packaging-styles/child-resistant-bags",
        description:
          "Review the format as a project starting point while closure and market requirements remain subject to confirmation.",
      },
      {
        label: "Printed Rollstock Film",
        href: "/packaging-styles/printed-rollstock-film",
        description:
          "Start a rollstock brief from the packing equipment, web, repeat, contents, and process requirements.",
      },
    ],
    childGuideSlugs: ["custom-supplement-boxes", "custom-supplement-pouches"],
    quickAnswer:
      "Use a tuck box when the supplement is already in a bottle, jar, or other container and needs a printed outer carton. Start with Mylar bags when the product will use a pouch or printed rollstock format. The container or contents, fill, process, required copy, quantity, intended market, and destination determine the final specification.",
    selectionGuide: [
      {
        need: "A printed carton around a bottle or jar",
        startingPoint: "Tuck boxes",
        reason:
          "Build the outer carton around the packed container dimensions, orientation, panels, and artwork.",
        href: "/industries/custom-supplement-boxes",
      },
      {
        need: "A stand-up, flat-bottom, or three-side seal pack",
        startingPoint: "Mylar bags",
        reason:
          "Start from the contents, target fill, closure, filling process, and intended market.",
        href: "/industries/custom-supplement-pouches",
      },
      {
        need: "A child-resistant bag brief",
        startingPoint: "Child-resistant bags",
        reason:
          "Treat the format as a starting point; closure and destination-market requirements still require confirmation.",
        href: "/packaging-styles/child-resistant-bags",
      },
      {
        need: "Printed film for a packing line",
        startingPoint: "Printed rollstock film",
        reason:
          "The equipment and production setup must be part of the brief before the final specification is approved.",
        href: "/packaging-styles/printed-rollstock-film",
      },
    ],
    projectInputs: [
      "Packed container dimensions or product contents and target fill",
      "Outer-carton, pouch, child-resistant bag, or rollstock direction",
      "Filling, sealing, closure, and packing-process details",
      "Quantity, artwork status, and delivery destination",
      "Buyer-supplied panel content and intended market",
      "Required compatibility, barrier, testing, or market documentation",
    ],
    scopeNote:
      "This hub covers custom printed outer cartons and flexible packaging. Supplement production, containers, filling, regulatory-copy creation, and market approval are outside the standard offer.",
    compatibilityNote:
      "Container fit, contents, film structure, filling process, closure, barrier, storage, regulatory content, and destination-market requirements must be supplied and reviewed when they apply.",
    officialResources: [
      {
        label: "FDA Dietary Supplement Labeling Guide",
        href: "https://www.fda.gov/food/dietary-supplements-guidance-documents-regulatory-information/dietary-supplement-labeling-guide",
        description:
          "Official U.S. reference for buyers planning supplement label content and panel space. UPG does not create or approve regulatory copy.",
      },
    ],
    faqs: [
      {
        question: "Should I request a supplement box or a supplement pouch?",
        answer:
          "Request a tuck box when the product already has a primary container and needs an outer carton. Request a pouch or rollstock review when the flexible pack is part of the intended product format.",
      },
      {
        question: "Does UPG write or approve supplement regulatory content?",
        answer:
          "No. The buyer supplies and approves the panel content and intended-market requirements. UPG reviews the packaging project around the approved brief.",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    slug: "fashion-jewelry-luxury-packaging",
    name: "Custom Fashion, Jewelry & Luxury Packaging",
    shortName: "Fashion, Jewelry & Luxury",
    heroTitle:
      "Custom fashion, jewelry, and luxury packaging for premium presentation.",
    heroDescription:
      "Compare UPG magnetic and collapsible magnetic boxes around the product arrangement, insert, opening experience, branding, quantity, storage priorities, and destination.",
    metaDescription:
      "Compare custom fashion, jewelry, and luxury packaging across magnetic, collapsible magnetic, apparel, jewelry, and premium gift box formats.",
    keywords: [
      "custom fashion packaging",
      "custom jewelry packaging",
      "custom luxury packaging boxes",
      "custom apparel boxes",
      "premium presentation packaging",
    ],
    image: {
      src: "/images/generated/collapsible-magnetic-boxes/collapsible-magnetic-boxes-hero-v1.png",
      alt: "Representative custom collapsible magnetic presentation box for fashion and luxury products",
    },
    productSlugs: [
      "custom-magnetic-boxes",
      "custom-collapsible-magnetic-boxes",
    ],
    guideLinks: [
      {
        label: "Apparel Boxes",
        href: "/industries/custom-apparel-boxes",
        description:
          "Plan fixed or collapsible magnetic presentation boxes around folded apparel, arrangement, and branding.",
      },
      {
        label: "Jewelry Presentation Boxes",
        href: "/industries/custom-jewelry-boxes",
        description:
          "Develop the outer presentation box and insert around the jewelry item or complete set.",
      },
      {
        label: "Luxury Gift Boxes",
        href: "/industries/custom-luxury-gift-boxes",
        description:
          "Compare fixed and collapsible magnetic gift boxes around the full product arrangement.",
      },
      {
        label: "Fixed vs Collapsible Magnetic Boxes",
        href: "/compare/magnetic-boxes-vs-collapsible-magnetic-boxes",
        description:
          "Compare assembled and fold-flat presentation structures before choosing a starting format.",
      },
    ],
    childGuideSlugs: ["custom-apparel-boxes", "custom-jewelry-boxes"],
    quickAnswer:
      "Start with a fixed magnetic box when the assembled presentation structure leads the brief. Compare a collapsible magnetic box when fold-flat storage before assembly is important. Product dimensions, arrangement, insert needs, artwork, quantity, and destination still determine the final specification.",
    selectionGuide: [
      {
        need: "A fixed premium presentation box",
        startingPoint: "Magnetic boxes",
        reason:
          "Build the box and insert around the complete product arrangement and opening experience.",
        href: "/products/custom-magnetic-boxes",
      },
      {
        need: "Fold-flat storage before assembly",
        startingPoint: "Collapsible magnetic boxes",
        reason:
          "Use the collapsible route when pre-assembly storage volume is part of the project brief.",
        href: "/products/custom-collapsible-magnetic-boxes",
      },
      {
        need: "Branded apparel presentation",
        startingPoint: "Apparel boxes",
        reason:
          "Start from the folded product dimensions, item count, arrangement, and presentation goal.",
        href: "/industries/custom-apparel-boxes",
      },
      {
        need: "Jewelry or a multi-piece set",
        startingPoint: "Jewelry presentation boxes",
        reason:
          "Define the complete set and insert arrangement before final dimensions are approved.",
        href: "/industries/custom-jewelry-boxes",
      },
    ],
    projectInputs: [
      "Product count, finished dimensions, and arrangement",
      "Fixed or collapsible magnetic structure preference",
      "Insert and opening-experience requirements",
      "Quantity, artwork status, and delivery destination",
      "Wrap, print, and finish direction",
      "Packing, storage, handling, or product-specific requirements",
    ],
    scopeNote:
      "This hub covers custom branded magnetic and collapsible magnetic presentation boxes. Products, display fixtures, assembly, packout, warehousing, and fulfillment are outside the standard offer.",
    compatibilityNote:
      "Product fit, insert layout, handling, protection, testing, storage, and destination-market requirements must be supplied and reviewed when they apply.",
    faqs: [
      {
        question: "Should I choose a fixed or collapsible magnetic box?",
        answer:
          "Start with a fixed magnetic box for an assembled premium presentation structure. Compare a collapsible magnetic box when fold-flat storage before assembly is important. The complete project brief decides the final choice.",
      },
      {
        question: "Can the box and insert be planned together?",
        answer:
          "Yes. Share the complete product arrangement, dimensions, orientation, and presentation sequence so the outer box and insert can be reviewed as one project.",
      },
    ],
    reviewedAt,
  },
  {
    slug: "electronics-consumer-goods-packaging",
    name: "Custom Electronics & Consumer Goods Packaging",
    shortName: "Electronics & Consumer Goods",
    heroTitle:
      "Custom electronics and consumer-goods packaging across retail and presentation boxes.",
    heroDescription:
      "Compare UPG tuck, corrugated ear-lock mailer, magnetic, and collapsible magnetic boxes around the product, accessories, insert, retail or presentation role, quantity, and destination.",
    metaDescription:
      "Compare custom electronics and consumer-goods packaging across tuck, ear-lock mailer, magnetic, collapsible magnetic, retail, toy, and game boxes.",
    keywords: [
      "custom electronics packaging",
      "custom consumer product boxes",
      "custom electronics boxes",
      "custom retail packaging boxes",
      "custom toy and game packaging",
    ],
    image: {
      src: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
      alt: "Representative corrugated ear-lock presentation mailer with a custom product insert",
    },
    productSlugs: [
      "custom-tuck-boxes",
      "custom-mailer-boxes",
      "custom-magnetic-boxes",
      "custom-collapsible-magnetic-boxes",
    ],
    guideLinks: [
      {
        label: "Electronics Presentation Boxes",
        href: "/industries/custom-electronics-boxes",
        description:
          "Plan a magnetic or collapsible magnetic presentation box around the device, accessories, and insert.",
      },
      {
        label: "Retail Product Boxes",
        href: "/industries/custom-retail-boxes",
        description:
          "Select an approved tuck-box structure around the packed product and shelf presentation.",
      },
      {
        label: "Games, Toys & Collectibles",
        href: "/industries/custom-toy-packaging",
        description:
          "Compare tuck, ear-lock mailer, magnetic, and collapsible magnetic formats for the complete set.",
      },
      {
        label: "Mailer Boxes vs Magnetic Boxes",
        href: "/compare/mailer-boxes-vs-magnetic-boxes",
        description:
          "Compare corrugated ear-lock presentation with a premium magnetic structure.",
      },
    ],
    childGuideSlugs: [
      "custom-electronics-boxes",
      "custom-retail-boxes",
      "custom-toy-packaging",
    ],
    quickAnswer:
      "Use tuck boxes for individual shelf-facing outer cartons, corrugated ear-lock mailers for branded presentation, and magnetic or collapsible magnetic boxes for premium sets. The complete product list, dimensions, weights, arrangement, insert, handling requirements, quantity, and destination determine the correct starting structure.",
    selectionGuide: [
      {
        need: "An individual retail outer carton",
        startingPoint: "Tuck boxes",
        reason:
          "Start from the packed product dimensions, orientation, panel content, and shelf role.",
        href: "/industries/custom-retail-boxes",
      },
      {
        need: "A branded corrugated presentation box",
        startingPoint: "Ear-lock mailer boxes",
        reason:
          "Use this route for a presentation mailer with an approved insert, not a standard shipping carton.",
        href: "/products/custom-mailer-boxes",
      },
      {
        need: "A fixed premium presentation set",
        startingPoint: "Magnetic boxes",
        reason:
          "Plan the outer box and insert around the complete device and accessory arrangement.",
        href: "/products/custom-magnetic-boxes",
      },
      {
        need: "Premium presentation with fold-flat storage",
        startingPoint: "Collapsible magnetic boxes",
        reason:
          "Compare this structure when pre-assembly storage volume is part of the project brief.",
        href: "/products/custom-collapsible-magnetic-boxes",
      },
    ],
    projectInputs: [
      "Complete product, accessory, and document list",
      "Dimensions, weights, orientation, and arrangement",
      "Retail, presentation, or premium-set role",
      "Insert, opening-sequence, and handling requirements",
      "Quantity, artwork status, and delivery destination",
      "Protection, testing, battery, static-control, or market requirements when applicable",
    ],
    scopeNote:
      "This hub covers custom printed tuck boxes, branded corrugated ear-lock mailers, and magnetic presentation boxes. Standard shipping cartons, master cartons, RSC cases, product assembly, packout, and fulfillment are outside the standard offer.",
    compatibilityNote:
      "Product fit, insert performance, handling, transport, protection, testing, battery, static-control, and destination-market requirements must be supplied and reviewed when they apply.",
    faqs: [
      {
        question: "Does this category include standard shipping cartons?",
        answer:
          "No. UPG's corrugated offer on this page is the custom ear-lock presentation mailer. Standard shipping cartons, master cartons, and RSC cases are outside the current offer.",
      },
      {
        question: "Does a presentation box replace product protection testing?",
        answer:
          "No. Protection, handling, transport, battery, static-control, testing, and market requirements must be stated and reviewed for the project.",
      },
    ],
    reviewedAt,
  },
  {
    slug: "home-candle-gift-packaging",
    name: "Custom Home, Candle & Gift Packaging",
    shortName: "Home, Candles & Gifts",
    heroTitle:
      "Custom home, candle, and gift packaging from retail cartons to premium boxes.",
    heroDescription:
      "Compare UPG tuck, magnetic, and collapsible magnetic boxes around the product or set, container dimensions, insert, presentation goal, artwork, quantity, and destination.",
    metaDescription:
      "Compare custom home, candle, and gift packaging across printed tuck boxes, magnetic boxes, collapsible magnetic boxes, candle cartons, and luxury gift boxes.",
    keywords: [
      "custom candle packaging",
      "custom gift packaging boxes",
      "custom home product packaging",
      "custom candle boxes",
      "custom luxury gift boxes",
    ],
    image: {
      src: "/images/generated/magnetic-boxes/magnetic-boxes-hero-v1.png",
      alt: "Representative custom magnetic gift box for home, candle, and gift products",
    },
    productSlugs: [
      "custom-tuck-boxes",
      "custom-magnetic-boxes",
      "custom-collapsible-magnetic-boxes",
    ],
    guideLinks: [
      {
        label: "Candle Boxes",
        href: "/industries/custom-candle-boxes",
        description:
          "Compare a printed tuck carton with a premium magnetic presentation box around the candle container.",
      },
      {
        label: "Luxury Gift Boxes",
        href: "/industries/custom-luxury-gift-boxes",
        description:
          "Plan fixed or collapsible magnetic boxes around the complete gift set and insert.",
      },
      {
        label: "Tuck Boxes vs Magnetic Boxes",
        href: "/compare/tuck-boxes-vs-magnetic-boxes",
        description:
          "Compare folding retail cartons with premium magnetic presentation structures.",
      },
    ],
    childGuideSlugs: ["custom-candle-boxes", "custom-luxury-gift-boxes"],
    quickAnswer:
      "Use a tuck box for an individual retail outer carton. Start with a magnetic or collapsible magnetic box for a premium product set or gift presentation. The packed product dimensions, arrangement, insert, opening experience, artwork, quantity, and destination determine the final structure.",
    selectionGuide: [
      {
        need: "An individual shelf-facing outer carton",
        startingPoint: "Tuck boxes",
        reason:
          "Develop the carton around the packed product dimensions, opening direction, panels, and artwork.",
        href: "/products/custom-tuck-boxes",
      },
      {
        need: "A candle retail or presentation project",
        startingPoint: "Candle boxes",
        reason:
          "Compare tuck and magnetic formats around the finished candle container and intended presentation.",
        href: "/industries/custom-candle-boxes",
      },
      {
        need: "A fixed premium gift presentation",
        startingPoint: "Magnetic boxes",
        reason:
          "Plan the complete product arrangement, opening experience, and insert together.",
        href: "/products/custom-magnetic-boxes",
      },
      {
        need: "A premium set with fold-flat storage",
        startingPoint: "Collapsible magnetic boxes",
        reason:
          "Use the collapsible route when pre-assembly storage volume is part of the brief.",
        href: "/products/custom-collapsible-magnetic-boxes",
      },
    ],
    projectInputs: [
      "Product or container dimensions, count, and arrangement",
      "Individual retail carton or premium-set role",
      "Preferred tuck, fixed magnetic, or collapsible magnetic structure",
      "Insert and opening-experience requirements",
      "Quantity, artwork status, finishes, and delivery destination",
      "Packing, handling, storage, or product-specific requirements",
    ],
    scopeNote:
      "This hub covers custom printed outer cartons and magnetic presentation boxes. Products, filling, assembly, packout, warehousing, and fulfillment are outside the standard offer.",
    compatibilityNote:
      "Container or product fit, insert performance, handling, protection, testing, storage, and destination-market requirements must be supplied and reviewed when they apply.",
    faqs: [
      {
        question: "Should I use a tuck box or a magnetic gift box?",
        answer:
          "Use a tuck box for an individual folding retail carton. Compare magnetic or collapsible magnetic boxes when the project is a premium set or presentation-led gift box.",
      },
      {
        question: "Can UPG plan an insert for a gift set?",
        answer:
          "Yes. Share every product, its dimensions, orientation, arrangement, and opening sequence so the insert and outer presentation box can be reviewed together.",
      },
    ],
    reviewedAt,
  },
];

export function getIndustryHubBySlug(slug: string) {
  return industryHubs.find((hub) => hub.slug === slug);
}

export function getIndustryHubsByProduct(productSlug: string) {
  return industryHubs.filter((hub) => hub.productSlugs.includes(productSlug));
}

export function getIndustryHubForGuideSlug(guideSlug: string) {
  return industryHubs.find((hub) => hub.childGuideSlugs.includes(guideSlug));
}

export interface IndustryHubLink {
  label: string;
  href: string;
  description: string;
}

export interface IndustryHub {
  slug: string;
  name: string;
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
  faqs: Array<{ question: string; answer: string }>;
  reviewedAt: string;
}

const reviewedAt = "2026-08-24";

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
    shortName: "Beauty & Personal Care",
    heroTitle:
      "Custom beauty and personal care packaging from retail cartons to presentation boxes.",
    heroDescription:
      "Compare UPG tuck, ear-lock mailer, magnetic, and collapsible magnetic boxes around the product, presentation goal, quantity, artwork, and destination.",
    metaDescription:
      "Compare custom beauty and personal care packaging across tuck boxes, PR mailers, magnetic boxes, collapsible magnetic boxes, cosmetics, and soap packaging.",
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
    reviewedAt,
  },
  {
    slug: "supplement-packaging",
    name: "Custom Supplement Packaging",
    shortName: "Supplements & Wellness",
    heroTitle:
      "Custom supplement packaging across printed outer cartons and flexible packs.",
    heroDescription:
      "Compare UPG tuck boxes and Mylar bag formats around the actual container or contents, packed dimensions or target fill, required panel content, quantity, and destination.",
    metaDescription:
      "Compare custom supplement packaging across printed boxes, stand-up pouches, flat-bottom bags, three-side seal bags, child-resistant bags, and rollstock.",
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
    reviewedAt,
  },
];

export function getIndustryHubBySlug(slug: string) {
  return industryHubs.find((hub) => hub.slug === slug);
}

export function getIndustryHubForGuideSlug(guideSlug: string) {
  return industryHubs.find((hub) => hub.childGuideSlugs.includes(guideSlug));
}

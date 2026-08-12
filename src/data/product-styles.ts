import type { ProductFamily } from "@/data/products";

export interface ProductStyleGuide {
  slug: string;
  name: string;
  shortName: string;
  family: ProductFamily;
  parentProductSlug: string;
  parentProductName: string;
  category: "Tuck box style" | "Mylar bag format";
  metaDescription: string;
  searchTerms: string[];
  quickAnswer: string;
  selectionNote: string;
  projectInputs: string[];
  relatedSlugs: string[];
  complianceNote?: string;
  reviewedAt: string;
}

const reviewedAt = "2026-08-13";

export const productStyleGuides: ProductStyleGuide[] = [
  {
    slug: "straight-tuck-end-boxes",
    name: "Custom Straight Tuck End Boxes",
    shortName: "Straight Tuck End Boxes",
    family: "Tuck Boxes",
    parentProductSlug: "custom-tuck-boxes",
    parentProductName: "Custom Tuck Boxes",
    category: "Tuck box style",
    metaDescription:
      "Plan custom straight tuck end boxes with UPG's approved size-based MOQs, board options, printing, finishes, and human-reviewed quote process.",
    searchTerms: ["straight tuck end boxes", "custom straight tuck boxes", "STE boxes"],
    quickAnswer:
      "Straight tuck end is one of the folding-carton structures available within UPG's custom tuck box family. The final flap orientation, panel layout, dimensions, board, printing, and finishes are confirmed for the specific product and packing process.",
    selectionNote:
      "Compare straight tuck end with reverse tuck end when the opening direction and panel layout are still undecided.",
    projectInputs: [
      "Finished product dimensions and how the carton will be filled",
      "Required quantity and delivery destination",
      "Preferred board, inside or outside printing, and finish references",
      "Artwork files, an existing dieline, or a reference box when available",
    ],
    relatedSlugs: ["reverse-tuck-end-boxes", "auto-lock-bottom-boxes", "seal-end-boxes"],
    reviewedAt,
  },
  {
    slug: "reverse-tuck-end-boxes",
    name: "Custom Reverse Tuck End Boxes",
    shortName: "Reverse Tuck End Boxes",
    family: "Tuck Boxes",
    parentProductSlug: "custom-tuck-boxes",
    parentProductName: "Custom Tuck Boxes",
    category: "Tuck box style",
    metaDescription:
      "Plan custom reverse tuck end boxes with size-based MOQs, approved materials, print options, finishes, and a project-specific UPG quote.",
    searchTerms: ["reverse tuck end boxes", "custom reverse tuck boxes", "RTE boxes"],
    quickAnswer:
      "Reverse tuck end is one of the folding-carton structures available within UPG's custom tuck box family. The final flap orientation, panel layout, dimensions, board, printing, and finishes are confirmed from the product and packing plan.",
    selectionNote:
      "Compare reverse tuck end with straight tuck end before artwork is placed on a final dieline.",
    projectInputs: [
      "Finished product dimensions and preferred opening direction",
      "Required quantity and delivery destination",
      "Board, print coverage, and finish requirements",
      "Artwork files, an existing dieline, or a reference structure when available",
    ],
    relatedSlugs: ["straight-tuck-end-boxes", "interlock-boxes", "auto-lock-bottom-boxes"],
    reviewedAt,
  },
  {
    slug: "auto-lock-bottom-boxes",
    name: "Custom Auto-Lock Bottom Boxes",
    shortName: "Auto-Lock Bottom Boxes",
    family: "Tuck Boxes",
    parentProductSlug: "custom-tuck-boxes",
    parentProductName: "Custom Tuck Boxes",
    category: "Tuck box style",
    metaDescription:
      "Plan custom auto-lock bottom boxes with UPG's approved tuck-box materials, finishes, exact size-based MOQ guidance, and quote handoff.",
    searchTerms: ["auto-lock bottom boxes", "auto bottom boxes", "automatic bottom cartons"],
    quickAnswer:
      "Auto-lock bottom is available within UPG's custom tuck box family. The top closure, bottom construction, board, dimensions, print, and finishes are developed around the product and the intended packing method.",
    selectionNote:
      "Share the packed product and assembly method so the base and the rest of the structure can be reviewed together.",
    projectInputs: [
      "Packed product dimensions and product weight",
      "How the box will be erected, filled, and closed",
      "Required quantity and delivery destination",
      "Board, printing, finishes, and artwork status",
    ],
    relatedSlugs: ["interlock-boxes", "straight-tuck-end-boxes", "seal-end-boxes"],
    reviewedAt,
  },
  {
    slug: "interlock-boxes",
    name: "Custom Interlock Boxes",
    shortName: "Interlock Boxes",
    family: "Tuck Boxes",
    parentProductSlug: "custom-tuck-boxes",
    parentProductName: "Custom Tuck Boxes",
    category: "Tuck box style",
    metaDescription:
      "Plan custom interlock boxes with UPG's available board, print and finish options, size-based MOQ guidance, and project-specific review.",
    searchTerms: ["interlock boxes", "custom interlocking boxes", "interlock cartons"],
    quickAnswer:
      "Interlock is an available structure within UPG's custom tuck box family. The locking arrangement, dimensions, panel layout, board, print, and finish specification are confirmed during structural review.",
    selectionNote:
      "A reference structure or existing dieline is useful when interlock is the preferred starting point.",
    projectInputs: [
      "Finished product dimensions and product weight",
      "A reference box, dieline, or photo of the intended lock when available",
      "Required quantity and destination",
      "Board, print coverage, finish details, and artwork status",
    ],
    relatedSlugs: ["auto-lock-bottom-boxes", "reverse-tuck-end-boxes", "seal-end-boxes"],
    reviewedAt,
  },
  {
    slug: "seal-end-boxes",
    name: "Custom Seal End Boxes",
    shortName: "Seal End Boxes",
    family: "Tuck Boxes",
    parentProductSlug: "custom-tuck-boxes",
    parentProductName: "Custom Tuck Boxes",
    category: "Tuck box style",
    metaDescription:
      "Plan custom seal end boxes, including cereal-style cartons, with UPG's approved materials, finishes, size-based MOQs, and quote process.",
    searchTerms: ["seal end boxes", "custom seal end cartons", "cereal box packaging"],
    quickAnswer:
      "Seal end boxes, including cereal-style cartons, are available within UPG's custom tuck box family. The sealing method, dimensions, board, print, and finish specification are confirmed from the product and production plan.",
    selectionNote:
      "State whether the enquiry is for a cereal-style carton or another seal-end format so the structural brief begins in the right place.",
    projectInputs: [
      "Finished product dimensions and the intended seal-end format",
      "How the carton will be filled and sealed",
      "Required quantity and destination",
      "Board, print coverage, finishes, artwork, and reference packaging",
    ],
    relatedSlugs: ["straight-tuck-end-boxes", "auto-lock-bottom-boxes", "reverse-tuck-end-boxes"],
    reviewedAt,
  },
  {
    slug: "stand-up-pouches",
    name: "Custom Stand-Up Pouches",
    shortName: "Stand-Up Pouches",
    family: "Mylar Bags",
    parentProductSlug: "custom-mylar-bags",
    parentProductName: "Custom Mylar Bags",
    category: "Mylar bag format",
    metaDescription:
      "Plan custom printed stand-up pouches with a 500-unit UPG MOQ, project-specific film, zipper, window, finish, and compatibility review.",
    searchTerms: ["custom stand-up pouches", "printed stand-up bags", "stand-up Mylar bags"],
    quickAnswer:
      "Stand-up pouches are available within UPG's custom Mylar bag range. Dimensions, film structure, seals, zipper or window options, print, finish, and product compatibility are confirmed for the project.",
    selectionNote:
      "Compare stand-up pouches with flat-bottom bags when shelf presentation and the final filled shape are still being evaluated.",
    projectInputs: [
      "Product contents, intended market, and required quantity",
      "Target filled dimensions or fill volume",
      "Zipper, window, finish, and print requirements",
      "Any barrier, food-contact, or market-specific documentation requirement",
    ],
    relatedSlugs: ["flat-bottom-bags", "three-side-seal-bags", "coffee-bags"],
    complianceNote:
      "Film structure and product compatibility must be confirmed before the final specification is approved.",
    reviewedAt,
  },
  {
    slug: "flat-bottom-bags",
    name: "Custom Flat Bottom Bags",
    shortName: "Flat Bottom Bags",
    family: "Mylar Bags",
    parentProductSlug: "custom-mylar-bags",
    parentProductName: "Custom Mylar Bags",
    category: "Mylar bag format",
    metaDescription:
      "Plan custom flat bottom bags with UPG's 500-unit MOQ, printed-film options, finishes, features, and product-specific compatibility review.",
    searchTerms: ["custom flat bottom bags", "printed flat bottom pouches", "flat bottom Mylar bags"],
    quickAnswer:
      "Flat-bottom bags are available within UPG's custom Mylar bag range. The final dimensions, film structure, seals, zipper or valve options, print, finish, and compatibility are reviewed around the product.",
    selectionNote:
      "Compare flat-bottom bags with stand-up pouches and coffee bags before the filled shape and optional features are finalized.",
    projectInputs: [
      "Product contents, fill volume, and target filled dimensions",
      "Required quantity and delivery destination",
      "Zipper, valve, window, finish, and print requirements",
      "Any barrier, food-contact, or destination-market requirement",
    ],
    relatedSlugs: ["stand-up-pouches", "coffee-bags", "three-side-seal-bags"],
    complianceNote:
      "Film structure and product compatibility must be confirmed before the final specification is approved.",
    reviewedAt,
  },
  {
    slug: "three-side-seal-bags",
    name: "Custom Three-Side Seal Bags",
    shortName: "Three-Side Seal Bags",
    family: "Mylar Bags",
    parentProductSlug: "custom-mylar-bags",
    parentProductName: "Custom Mylar Bags",
    category: "Mylar bag format",
    metaDescription:
      "Plan custom three-side seal bags with a 500-unit UPG MOQ, printed flexible film, finish options, and product compatibility review.",
    searchTerms: ["custom three-side seal bags", "printed three-side seal pouches", "3 side seal bags"],
    quickAnswer:
      "Three-side seal bags are available within UPG's custom Mylar bag range. Bag dimensions, film structure, seal areas, print, finish, and product compatibility are confirmed for the intended use.",
    selectionNote:
      "Share the target fill and opening requirements before artwork is prepared on a final bag template.",
    projectInputs: [
      "Product contents, target fill, and intended market",
      "Finished bag dimensions and required quantity",
      "Opening, zipper, window, print, and finish requirements",
      "Barrier, food-contact, or market-specific documentation requirements",
    ],
    relatedSlugs: ["stand-up-pouches", "flat-bottom-bags", "printed-rollstock-film"],
    complianceNote:
      "Film structure and product compatibility must be confirmed before the final specification is approved.",
    reviewedAt,
  },
  {
    slug: "spout-pouches",
    name: "Custom Spout Pouches",
    shortName: "Spout Pouches",
    family: "Mylar Bags",
    parentProductSlug: "custom-mylar-bags",
    parentProductName: "Custom Mylar Bags",
    category: "Mylar bag format",
    metaDescription:
      "Plan custom spout pouches with UPG's 500-unit MOQ, project-specific spout, film, print, finish, compatibility, and market review.",
    searchTerms: ["custom spout pouches", "printed spout bags", "spout Mylar bags"],
    quickAnswer:
      "Spout pouches are available within UPG's custom Mylar bag range. Spout selection and position, bag dimensions, film structure, seals, print, finish, and product compatibility are confirmed for the project.",
    selectionNote:
      "The product contents and intended filling process must be reviewed before the spout and film specification are finalized.",
    projectInputs: [
      "Product contents, fill volume, and intended market",
      "Preferred spout position or a reference pouch",
      "Required quantity, dimensions, print, and finish",
      "Filling process plus compatibility and documentation requirements",
    ],
    relatedSlugs: ["stand-up-pouches", "three-side-seal-bags", "printed-rollstock-film"],
    complianceNote:
      "Spout, film structure, filling process, and product compatibility must be confirmed before approval.",
    reviewedAt,
  },
  {
    slug: "child-resistant-bags",
    name: "Custom Child-Resistant Bags",
    shortName: "Child-Resistant Bags",
    family: "Mylar Bags",
    parentProductSlug: "custom-mylar-bags",
    parentProductName: "Custom Mylar Bags",
    category: "Mylar bag format",
    metaDescription:
      "Plan custom child-resistant bag projects with a 500-unit UPG MOQ and explicit market, certification, film, closure, print, and compliance review.",
    searchTerms: ["custom child-resistant bags", "CR bags", "child-resistant Mylar bags"],
    quickAnswer:
      "Child-resistant bag projects are available within UPG's custom Mylar bag range. The target market, required evidence, closure, film structure, dimensions, print, and product compatibility must be reviewed together.",
    selectionNote:
      "The words child-resistant describe a requirement, not an automatic compliance claim. Share the target market and required standard at the start of the enquiry.",
    projectInputs: [
      "Product contents, intended market, and required child-resistant standard",
      "Required documentation or certification evidence",
      "Bag dimensions, quantity, closure, print, and finish",
      "Product compatibility and barrier requirements",
    ],
    relatedSlugs: ["stand-up-pouches", "three-side-seal-bags", "flat-bottom-bags"],
    complianceNote:
      "A bag must not be presented as compliant until the applicable market, test standard, construction, and evidence are confirmed.",
    reviewedAt,
  },
  {
    slug: "coffee-bags",
    name: "Custom Coffee Bags",
    shortName: "Coffee Bags",
    family: "Mylar Bags",
    parentProductSlug: "custom-mylar-bags",
    parentProductName: "Custom Mylar Bags",
    category: "Mylar bag format",
    metaDescription:
      "Plan custom printed coffee bags with a 500-unit UPG MOQ, format, valve, zipper, film, print, finish, and product compatibility review.",
    searchTerms: ["custom coffee bags", "printed coffee pouches", "coffee packaging bags"],
    quickAnswer:
      "Coffee bags are available within UPG's custom Mylar bag range. Bag format, dimensions, film structure, valve or zipper options, print, finish, and product compatibility are confirmed for the project.",
    selectionNote:
      "State the preferred bag format and whether a valve or zipper is required so the specification starts with the correct features.",
    projectInputs: [
      "Coffee format, target fill weight, and intended market",
      "Preferred bag structure and finished dimensions",
      "Valve, zipper, print, window, and finish requirements",
      "Required quantity, destination, and food-contact documentation needs",
    ],
    relatedSlugs: ["flat-bottom-bags", "stand-up-pouches", "printed-rollstock-film"],
    complianceNote:
      "Film structure, valve selection, product compatibility, and food-contact requirements must be confirmed before approval.",
    reviewedAt,
  },
  {
    slug: "printed-rollstock-film",
    name: "Custom Printed Rollstock Film",
    shortName: "Printed Rollstock Film",
    family: "Mylar Bags",
    parentProductSlug: "custom-mylar-bags",
    parentProductName: "Custom Mylar Bags",
    category: "Mylar bag format",
    metaDescription:
      "Plan custom printed rollstock film with UPG's 500-unit MOQ guidance and project-specific machine, web, repeat, film, print, and compatibility review.",
    searchTerms: ["custom printed rollstock film", "printed film on roll", "flexible packaging rollstock"],
    quickAnswer:
      "Printed rollstock film is available within UPG's custom flexible-packaging range. Machine and web requirements, repeat, film structure, print, seals, product compatibility, and order quantity are confirmed for the project.",
    selectionNote:
      "Rollstock cannot be specified from finished-pack dimensions alone. Share the filling and sealing equipment information available from the packing operation.",
    projectInputs: [
      "Product contents and intended market",
      "Packing-machine, web, repeat, and sealing information available",
      "Required quantity, print, finish, and destination",
      "Barrier, food-contact, compatibility, and documentation requirements",
    ],
    relatedSlugs: ["three-side-seal-bags", "stand-up-pouches", "coffee-bags"],
    complianceNote:
      "Machine compatibility, film structure, seals, product compatibility, and market requirements must be confirmed before approval.",
    reviewedAt,
  },
];

export const productStyleGroups = [
  {
    family: "Tuck Boxes" as const,
    title: "Tuck box styles",
    description:
      "Five real folding-carton structures within UPG's current custom tuck box offer.",
  },
  {
    family: "Mylar Bags" as const,
    title: "Mylar bag and flexible-film formats",
    description:
      "Seven bag, pouch, coffee, child-resistant, spout, and rollstock starting formats within UPG's current flexible-packaging offer.",
  },
];

export function getProductStyleGuide(slug: string) {
  return productStyleGuides.find((guide) => guide.slug === slug);
}

export function getProductStylesByParent(parentProductSlug: string) {
  return productStyleGuides.filter(
    (guide) => guide.parentProductSlug === parentProductSlug
  );
}

export function getRelatedProductStyles(guide: ProductStyleGuide) {
  return guide.relatedSlugs
    .map((slug) => getProductStyleGuide(slug))
    .filter((item): item is ProductStyleGuide => Boolean(item));
}

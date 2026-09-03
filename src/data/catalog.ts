export interface TrustPoint {
  label: string;
}

export interface CosmeticSolution {
  title: string;
  href: string;
  note: string;
}

export interface FinishFeature {
  title: string;
  image: string;
  description: string;
}

export interface SampleHighlight {
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface CosmeticSubcategory {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  quoteFamily:
    | "Tuck Boxes"
    | "Mailer Boxes"
    | "Magnetic Boxes"
    | "Collapsible Magnetic Boxes";
  intro: string;
  heroTitle: string;
  heroDescription: string;
  quickAnswer?: string;
  recommended: { productSlug: string; note: string }[];
  materials: string[];
  finishes: string[];
  inserts: string[];
  idealFor: string[];
  moqNote: string;
  leadTimeNote: string;
  artworkNote: string;
  decisionGuidance?: Array<{
    title: string;
    description: string;
    href?: string;
    linkLabel?: string;
  }>;
  faqs?: Array<{ question: string; answer: string }>;
  relatedSlugs?: string[];
  reviewedAt?: string;
}

export const cosmeticsPackagingScope = {
  included:
    "UPG manufactures the custom printed outer packaging around a beauty product: tuck boxes, magnetic boxes, collapsible magnetic boxes, corrugated ear-lock mailers, and inserts.",
  excluded:
    "UPG does not supply cosmetic bottles, jars, tubes, lipstick mechanisms, applicators, formulas, product filling, or campaign fulfillment.",
} as const;

export const trustPoints: TrustPoint[] = [
  { label: "250-unit planning MOQ across every product family" },
  { label: "Worldwide production & delivery" },
  { label: "Custom sizes & structures" },
  { label: "Dieline & artwork guidance" },
  { label: "Proofing & production follow-up" },
];

export const cosmeticsSolutions: CosmeticSolution[] = [
  {
    title: "Skincare boxes",
    href: "/cosmetics/skincare-boxes",
    note: "Outer cartons and presentation boxes for skincare products",
  },
  {
    title: "Serum boxes",
    href: "/cosmetics/serum-boxes",
    note: "Outer boxes for dropper bottles and treatment formats",
  },
  {
    title: "Cream & lotion boxes",
    href: "/cosmetics/cream-boxes",
    note: "Outer cartons and sets developed around jars, pumps, and tubs",
  },
  {
    title: "Lipstick boxes",
    href: "/cosmetics/lipstick-boxes",
    note: "Slim outer cartons, presentation sets, and shelf-facing details",
  },
  {
    title: "Perfume boxes",
    href: "/cosmetics/perfume-boxes",
    note: "Rigid structures and insert-led presentation",
  },
  {
    title: "PR kits",
    href: "/cosmetics/pr-boxes",
    note: "Influencer mailers, launches, and seeding drops",
  },
  {
    title: "Subscription boxes",
    href: "/cosmetics/cosmetic-subscription-boxes",
    note: "Recurring beauty drops and retention programs",
  },
  {
    title: "Mascara boxes",
    href: "/cosmetics/mascara-boxes",
    note: "Structural cartons for slim and tall pack formats",
  },
];

export const finishFeatures: FinishFeature[] = [
  {
    title: "Foil stamping",
    image: "/images/redesign/finishes/finish-foil.jpg",
    description: "Metallic accents for logos, borders, and premium shelf appeal.",
  },
  {
    title: "Embossing",
    image: "/images/redesign/finishes/finish-emboss.jpg",
    description: "Raised detail that adds tactile structure and luxury presence.",
  },
  {
    title: "Spot UV",
    image: "/images/redesign/finishes/finish-spotuv.jpg",
    description: "Selective gloss contrast on matte surfaces for visual depth.",
  },
];

export const sampleHighlights: SampleHighlight[] = [
  {
    title: "Skincare presentation set",
    image: "/images/redesign/samples/sample-skincare.jpg",
    description:
      "Cosmetics-first rigid presentation with room for inserts, jars, and treatment bottles.",
    category: "Skincare",
  },
  {
    title: "PR kit insert system",
    image: "/images/redesign/samples/sample-pr-kit.jpg",
    description:
      "Insert-led setup for launches, gifting, and beauty seeding campaigns.",
    category: "PR Kits",
  },
];

export const materialsHighlights = [
  "Matte, gloss, and soft-touch finishes",
  "Foil stamping",
  "Embossing and debossing",
  "Spot UV",
  "Windows, zippers, and valves where the format supports them",
  "Custom inserts",
  "Interior and exterior printing",
];

export const howItWorksSteps = [
  {
    number: "01",
    title: "Share your project",
    description:
      "Send the product, quantity, dimensions, artwork, or a reference image. We can begin even when some details are still open.",
  },
  {
    number: "02",
    title: "Develop the specification",
    description:
      "We align the structure, materials, finishes, manufacturing plan, pricing, and delivery requirements around the product.",
  },
  {
    number: "03",
    title: "Review & approve",
    description:
      "Dielines, artwork, mockups, samples, and prepress details are reviewed before production begins.",
  },
  {
    number: "04",
    title: "Manufacture & deliver",
    description:
      "We manufacture the approved packaging, provide production updates, and arrange delivery under the confirmed project terms.",
  },
];

export const industries = [
  {
    slug: "cosmetic-packaging",
    name: "Cosmetic Packaging",
    description:
      "Printed outer cartons, rigid boxes, and PR kits for skincare, serum, lipstick, and perfume brands.",
  },
  {
    slug: "ecommerce-retail-packaging",
    name: "Ecommerce & Retail",
    description:
      "Corrugated mailer boxes, tuck boxes, and inserts built for branded unboxing and retail presentation.",
  },
  {
    slug: "supplements-specialty-food-packaging",
    name: "Supplements & Specialty Food",
    description:
      "Pouches and cartons for packaged goods, with material suitability and required documentation reviewed for the intended use and market.",
  },
  {
    slug: "coffee-beverage-packaging",
    name: "Coffee & Beverage",
    description:
      "Coffee bags, spout bags, stand-up pouches, flat-bottom bags, and rollstock film.",
  },
];

export const cosmeticsSubcategories: CosmeticSubcategory[] = [
  {
    slug: "skincare-boxes",
    title: "Skincare Boxes",
    metaTitle: "Custom Skincare Packaging Boxes & Outer Cartons",
    metaDescription:
      "Custom skincare packaging boxes and printed outer cartons from 250 units. Compare tuck cartons and magnetic boxes for finished products and sets.",
    quoteFamily: "Tuck Boxes",
    heroTitle: "Custom skincare packaging boxes and printed outer cartons.",
    heroDescription:
      "Tuck cartons and premium presentation boxes manufactured around finished cleansers, moisturizers, masks, treatment bottles, and skincare sets.",
    quickAnswer:
      "UPG manufactures the custom printed outer box around a finished skincare product. Use a tuck carton for one jar, pump, bottle, tube, or sachet; review a magnetic box when several products need one premium set. Final structure depends on the product dimensions, packed arrangement, quantity, artwork, and delivery destination.",
    intro:
      "Skincare outer packaging needs a structure, panel layout, and finish plan developed around the finished jar, pump, bottle, tube, or product set.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for individual skincare products.",
      },
      {
        productSlug: "custom-magnetic-boxes",
        note: "Magnetic presentation option for skincare sets, launch kits, and premium hero products.",
      },
    ],
    materials: [
      "SBS C1S or C2S for tuck cartons",
      "Brown, white, or black kraft for tuck cartons",
      "CCNB or chipboard for folding cartons",
      "Rigid greyboard construction for magnetic presentation boxes",
    ],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: [
      "Moisturizer jars",
      "Treatment bottles",
      "Gift sets",
      "Skincare launches",
    ],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    decisionGuidance: [
      {
        title: "Measure the finished product",
        description:
          "Share the jar, pump, bottle, tube, or packed-set dimensions, weight, and orientation. Final box dimensions should not be guessed from a generic skincare format.",
      },
      {
        title: "Choose an individual outer carton",
        description:
          "Start with the tuck-box family for one finished skincare product, then compare the flap direction and panel layout before artwork is placed.",
        href: "/packaging-styles/straight-tuck-end-boxes",
        linkLabel: "Review straight tuck end boxes",
      },
      {
        title: "Plan a premium skincare set",
        description:
          "Use a magnetic presentation box when several products need one premium opening experience and a reviewed insert arrangement.",
        href: "/products/custom-magnetic-boxes",
        linkLabel: "Review magnetic boxes",
      },
      {
        title: "Separate outer packaging from the product",
        description:
          "UPG supplies the printed outer box. Cosmetic containers, formulas, filling, overwrapping, bundling, repacking, and fulfillment are outside this offer.",
        href: "/industries/beauty-personal-care-packaging",
        linkLabel: "Review the beauty packaging hub",
      },
    ],
    faqs: [
      {
        question: "What does UPG manufacture for skincare packaging?",
        answer:
          "UPG manufactures custom printed outer cartons and presentation boxes around finished skincare products. Jars, bottles, pumps, tubes, formulas, filling, overwrapping, repacking, and fulfillment are outside the current offer.",
      },
      {
        question: "Which box format should I use for a skincare product?",
        answer:
          "A tuck carton is the usual starting point for one finished product. A magnetic presentation box can be reviewed for a premium set after the product arrangement, dimensions, and insert needs are confirmed.",
      },
      {
        question: "What is the minimum order for custom skincare boxes?",
        answer:
          "UPG uses a 250-unit planning MOQ for every current custom product family. Final specifications, pricing, and production terms remain subject to project review.",
      },
      {
        question: "What should I send for a skincare-box quote?",
        answer:
          "Send the finished-product dimensions, weight and orientation when relevant, required quantity, intended box format, delivery destination, target timing, and any available artwork or reference images.",
      },
      {
        question: "Can UPG approve cosmetic label claims or regulatory copy?",
        answer:
          "No. The buyer supplies and approves product claims, ingredients, warnings, and market-specific panel content. UPG uses the approved content when preparing the outer-packaging artwork and production specification.",
      },
    ],
    relatedSlugs: ["serum-boxes", "cream-boxes", "lotion-boxes"],
    reviewedAt: "2026-09-03",
  },
  {
    slug: "serum-boxes",
    title: "Serum Boxes",
    metaTitle: "Custom Serum Packaging Boxes & Printed Outer Cartons",
    metaDescription:
      "Custom serum packaging boxes and printed outer cartons for dropper bottles, skincare products, and sets. UPG supplies boxes—not bottles, formulas, or filling.",
    quoteFamily: "Tuck Boxes",
    heroTitle: "Custom serum packaging boxes and printed outer cartons.",
    heroDescription:
      "Tall, narrow outer cartons and premium presentation boxes manufactured around finished serum bottles, droppers, treatment products, and skincare sets.",
    quickAnswer:
      "UPG manufactures the custom printed outer box around serum bottles, droppers, and related skincare products. Individual products can use a tuck carton, while serum sets and featured-product launches can be reviewed in a magnetic presentation box. Structure, print, finish, and inserts are confirmed from the product dimensions, quantity, artwork, intended use, and delivery country.",
    intro:
      "Serum boxes often need a narrow structure, a controlled panel layout, and insert guidance around the finished bottle format.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for single serum units.",
      },
      {
        productSlug: "custom-magnetic-boxes",
        note: "Rigid presentation option for serum sets and featured-product launches.",
      },
    ],
    materials: [
      "SBS C1S or C2S for tuck cartons",
      "Brown, white, or black kraft for tuck cartons",
      "CCNB or chipboard for tuck cartons",
      "Corrugated board where the approved tuck structure requires it",
    ],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: [
      "Dropper bottles",
      "Treatment serums",
      "Premium skincare",
      "Gift sets",
    ],
    moqNote:
      "Tuck boxes and magnetic boxes both use a 250-unit planning MOQ, regardless of finished size. Final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    decisionGuidance: [
      {
        title: "Measure the finished serum bottle",
        description:
          "Share the bottle or dropper dimensions, weight, orientation, and any protective fit requirement before final carton dimensions are developed.",
      },
      {
        title: "Start with the tuck-box structure",
        description:
          "An individual serum bottle usually begins in the tuck-box family. Compare the flap direction and usable panels before artwork is adapted.",
        href: "/packaging-styles/straight-tuck-end-boxes",
        linkLabel: "Review straight tuck end boxes",
      },
      {
        title: "Use a presentation box for a set",
        description:
          "A magnetic box can be reviewed when multiple serum or skincare products need one premium presentation and a fitted insert plan.",
        href: "/products/custom-magnetic-boxes",
        linkLabel: "Review magnetic boxes",
      },
      {
        title: "Keep product and packaging scope separate",
        description:
          "UPG manufactures the printed outer box, not bottles, droppers, formulas, filling, overwrapping, repacking, or fulfillment.",
        href: "/industries/beauty-personal-care-packaging",
        linkLabel: "Review the beauty packaging hub",
      },
    ],
    faqs: [
      {
        question: "What does UPG manufacture for serum packaging?",
        answer:
          "UPG manufactures custom printed outer boxes for serum bottles, droppers, treatment products, and related skincare sets. Bottles, droppers, formulas, filling, and fulfillment are outside this offer.",
      },
      {
        question: "Which box formats can be considered for serum products?",
        answer:
          "A custom tuck box can be developed for an individual serum bottle. Magnetic presentation boxes can be reviewed for serum sets or featured-product launches after the product arrangement and dimensions are confirmed.",
      },
      {
        question: "What is the minimum order for custom serum boxes?",
        answer:
          "Tuck boxes and magnetic boxes both use a 250-unit planning MOQ, regardless of finished size. Final specifications remain subject to review.",
      },
      {
        question: "What should I send for a serum box quote?",
        answer:
          "Share the bottle or product dimensions, required quantity, intended box format, delivery country, and any available artwork or reference images. Final specifications, pricing, and production timing are confirmed after review.",
      },
      {
        question: "Can UPG deliver custom serum boxes worldwide?",
        answer:
          "Yes. UPG works with brands worldwide. Delivery destination and transport requirements are reviewed as part of the project before final pricing and timing are confirmed.",
      },
    ],
    relatedSlugs: ["skincare-boxes", "cream-boxes", "perfume-boxes"],
    reviewedAt: "2026-09-03",
  },
  {
    slug: "cream-boxes",
    title: "Cream Boxes",
    quoteFamily: "Tuck Boxes",
    heroTitle: "Custom cream and lotion boxes for jars, pumps, and shelf presentation.",
    heroDescription:
      "Versatile carton formats and premium secondary packaging for cream jars, body lotions, and personal care products.",
    intro:
      "Cream and lotion packaging usually needs room for wider jar formats, pump components, and strong front-panel branding.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for individual jars and pumps.",
      },
      {
        productSlug: "custom-mailer-boxes",
        note: "Mailer option for kits and branded ecommerce bundles.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Cream jars", "Body lotions", "Personal care kits", "Retail sets"],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    relatedSlugs: ["lotion-boxes", "serum-boxes", "skincare-boxes"],
    reviewedAt: "2026-09-01",
  },
  {
    slug: "lotion-boxes",
    title: "Lotion Boxes",
    quoteFamily: "Tuck Boxes",
    heroTitle: "Custom lotion boxes that balance structure, branding, and product fit.",
    heroDescription:
      "Custom printed outer boxes developed around pumps, bottles, and lotion products across skincare and body care.",
    intro:
      "Lotion boxes often need more structural depth and a different product fit than narrow cosmetic cartons.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for individual retail lotion units.",
      },
      {
        productSlug: "custom-mailer-boxes",
        note: "Mailer option for sample sets and branded ecommerce bundles.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Pump bottles", "Body lotions", "Sample sets", "Retail bundles"],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    relatedSlugs: ["cream-boxes", "skincare-boxes", "serum-boxes"],
    reviewedAt: "2026-09-01",
  },
  {
    slug: "lipstick-boxes",
    title: "Lipstick Boxes",
    metaTitle: "Custom Lipstick Packaging & Printed Lipstick Boxes",
    metaDescription:
      "Custom lipstick packaging and printed lipstick boxes for lipstick, lip balm, lip oil, lip gloss, and sets. Outer boxes only—not tubes or mechanisms.",
    quoteFamily: "Tuck Boxes",
    heroTitle: "Custom lipstick packaging and printed lipstick boxes.",
    heroDescription:
      "Custom printed outer cartons and premium presentation boxes manufactured as packaging for finished lipstick, lip oil, lip balm, lip gloss, and other slim beauty products.",
    quickAnswer:
      "UPG manufactures the custom printed outer box around lipstick, lip balm, lip oil, and related slim beauty products. Individual products can use a tuck carton, while premium collections can be reviewed in a magnetic presentation box. Structure, print, finish, and inserts are confirmed from the product dimensions, quantity, artwork, intended use, and delivery country.",
    intro:
      "Lipstick boxes need an accurate dieline, balanced panel layout, and finishes suited to a small carton format.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for individual lipstick units.",
      },
      {
        productSlug: "custom-magnetic-boxes",
        note: "Collector sets and premium collections.",
      },
    ],
    materials: [
      "SBS C1S or C2S for tuck cartons",
      "Brown, white, or black kraft for tuck cartons",
      "CCNB or chipboard for tuck cartons",
      "Corrugated board where the approved tuck structure requires it",
    ],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Lipstick", "Lip gloss", "Lip balm", "Mini sets"],
    moqNote:
      "Tuck boxes and magnetic boxes both use a 250-unit planning MOQ, regardless of finished size. Final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    decisionGuidance: [
      {
        title: "Start with the finished product",
        description:
          "Share the finished lipstick, lip balm, lip oil, or related product dimensions. The outer carton and any insert are planned around the real product rather than a generic beauty-box size.",
      },
      {
        title: "Choose an individual carton or a presentation set",
        description:
          "A tuck box is the starting format for an individual retail unit. A magnetic presentation box can be reviewed for a collection or multi-product set after the arrangement is confirmed.",
        href: "/packaging-styles/straight-tuck-end-boxes",
        linkLabel: "Review straight tuck end boxes",
      },
      {
        title: "Match the board to the print plan",
        description:
          "SBS C1S supports one-side printing and SBS C2S supports printing on both sides. Brown, white, or black kraft, CCNB, chipboard, and corrugated board are also available for approved tuck structures.",
        href: "/materials-finishes",
        linkLabel: "Compare materials and finishes",
      },
      {
        title: "Lock the structure before final artwork",
        description:
          "Logo placement, copy, foil, spot UV, embossing, and debossing should be prepared on the approved dieline for the selected structure.",
        href: "/blog/how-to-prepare-artwork-for-custom-packaging",
        linkLabel: "Review artwork preparation guidance",
      },
    ],
    faqs: [
      {
        question: "What does UPG manufacture for lipstick packaging?",
        answer:
          "UPG manufactures custom printed outer boxes for lipstick, lip balm, lip oil, lip gloss, and related slim beauty products. Cosmetic mechanisms, formulas, filling, and fulfillment are outside this offer.",
      },
      {
        question: "Which box formats can be considered for lipstick products?",
        answer:
          "A custom tuck box can be developed for an individual lipstick product. Magnetic presentation boxes can be reviewed for premium collections or multi-product sets after the product arrangement and dimensions are confirmed.",
      },
      {
        question: "What is the minimum order for custom lipstick boxes?",
        answer:
          "Tuck boxes and magnetic boxes both use a 250-unit planning MOQ, regardless of finished size. Final specifications remain subject to review.",
      },
      {
        question: "What should I send for a lipstick box quote?",
        answer:
          "Share the product dimensions, required quantity, intended box format, delivery country, and any available artwork or reference images. Final specifications, pricing, and production timing are confirmed after review.",
      },
      {
        question: "Can UPG deliver custom lipstick boxes worldwide?",
        answer:
          "Yes. UPG works with brands worldwide. Delivery destination and transport requirements are reviewed as part of the project before final pricing and timing are confirmed.",
      },
    ],
    relatedSlugs: ["lip-gloss-boxes", "mascara-boxes", "cosmetic-subscription-boxes"],
    reviewedAt: "2026-09-03",
  },
  {
    slug: "lip-gloss-boxes",
    title: "Lip Gloss Boxes",
    quoteFamily: "Tuck Boxes",
    heroTitle: "Custom lip gloss boxes for slim structures and finish detail.",
    heroDescription:
      "Custom printed outer cartons for lip gloss tubes and other slim beauty products where finish detail matters.",
    intro:
      "Lip gloss boxes often overlap with lipstick-box structures but still need their own layout and product-fit review.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for individual gloss units and retail lines.",
      },
      {
        productSlug: "custom-magnetic-boxes",
        note: "For premium gloss duos or launch kits.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Lip gloss tubes", "Beauty mini sets", "Retail gloss lines"],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    relatedSlugs: ["lipstick-boxes", "mascara-boxes", "cosmetic-subscription-boxes"],
    reviewedAt: "2026-09-01",
  },
  {
    slug: "mascara-boxes",
    title: "Mascara Boxes",
    quoteFamily: "Tuck Boxes",
    heroTitle: "Mascara cartons for slim dimensions, balanced panel layout, and finish detail.",
    heroDescription:
      "Custom printed outer cartons for slim, tall beauty products where fit, logo placement, and finish detail need control.",
    intro:
      "Mascara boxes often sit in the same structural family as lipstick and serum cartons but still need exact dimensions and panel balance.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for individual mascara units.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Mascara tubes", "Slim cosmetic products", "Retail beauty lines"],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    relatedSlugs: ["lipstick-boxes", "lip-gloss-boxes", "serum-boxes"],
    reviewedAt: "2026-09-01",
  },
  {
    slug: "perfume-boxes",
    title: "Perfume Boxes",
    metaTitle: "Custom Perfume Boxes & Fragrance Outer Packaging",
    metaDescription:
      "Custom perfume boxes from 250 units. Compare printed tuck cartons and magnetic presentation boxes developed around finished fragrance bottles and sets.",
    quoteFamily: "Magnetic Boxes",
    heroTitle: "Custom perfume boxes and fragrance outer packaging.",
    heroDescription:
      "Printed tuck cartons and magnetic presentation boxes developed around the finished fragrance bottle, packed arrangement, insert plan, and opening experience.",
    quickAnswer:
      "UPG manufactures the custom printed outer box around a finished perfume or fragrance product. Use a tuck carton for an individual bottle and review a magnetic box for a premium hero product, discovery collection, or gift set. Bottle dimensions, weight, orientation, insert needs, artwork, quantity, and destination define the final structure.",
    intro:
      "Perfume packaging may use a magnetic presentation box or a printed tuck carton, depending on the bottle, insert, quantity, and presentation requirements.",
    recommended: [
      {
        productSlug: "custom-magnetic-boxes",
        note: "Rigid presentation option for hero fragrance products.",
      },
      {
        productSlug: "custom-tuck-boxes",
        note: "Folding-carton option for individual full-size, travel-size, or discovery fragrance products.",
      },
    ],
    materials: [
      "SBS C1S or C2S for printed tuck cartons",
      "Brown, white, or black kraft for folding cartons",
      "CCNB or chipboard for folding cartons",
      "Rigid greyboard construction for magnetic presentation boxes",
    ],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Fragrance launches", "Premium bottles", "Discovery sets", "Gift formats"],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    decisionGuidance: [
      {
        title: "Measure the finished bottle",
        description:
          "Share the bottle dimensions, weight, orientation, cap profile, and any known protective-fit need before the outer structure is finalized.",
      },
      {
        title: "Choose an individual fragrance carton",
        description:
          "Start with a tuck box for one finished bottle and compare the flap direction and panel layout before the artwork dieline is approved.",
        href: "/packaging-styles/straight-tuck-end-boxes",
        linkLabel: "Review straight tuck end boxes",
      },
      {
        title: "Plan a premium fragrance presentation",
        description:
          "Use a magnetic box for a premium hero product, discovery collection, or gift set when the bottle arrangement and insert plan are confirmed.",
        href: "/products/custom-magnetic-boxes",
        linkLabel: "Review magnetic boxes",
      },
      {
        title: "Keep bottle services outside the brief",
        description:
          "UPG supplies the printed outer box, not perfume bottles, fragrance, filling, overwrapping, bundling, repacking, or fulfillment.",
        href: "/industries/beauty-personal-care-packaging",
        linkLabel: "Review the beauty packaging hub",
      },
    ],
    faqs: [
      {
        question: "What perfume packaging does UPG manufacture?",
        answer:
          "UPG manufactures custom printed outer cartons and magnetic presentation boxes around finished perfume or fragrance products. Bottles, fragrance, filling, overwrapping, repacking, and fulfillment are outside the current offer.",
      },
      {
        question: "Should a perfume bottle use a tuck carton or a magnetic box?",
        answer:
          "A tuck carton is a practical starting point for one finished bottle. A magnetic box can be reviewed for a premium hero product, discovery collection, or gift set after the arrangement and insert needs are confirmed.",
      },
      {
        question: "What is the minimum order for custom perfume boxes?",
        answer:
          "UPG uses a 250-unit planning MOQ for every current custom product family. Final specifications, pricing, and production terms remain subject to project review.",
      },
      {
        question: "What should I send for a perfume-box quote?",
        answer:
          "Send the finished bottle dimensions, weight and orientation, quantity, intended outer-box format, delivery destination, target timing, and available artwork or reference images.",
      },
      {
        question: "Does UPG supply perfume bottles or fill fragrance?",
        answer:
          "No. UPG's current offer covers the custom printed outer box. Perfume bottles, closures, fragrance, filling, overwrapping, bundling, repacking, and fulfillment are outside scope.",
      },
    ],
    relatedSlugs: ["serum-boxes", "skincare-boxes", "pr-boxes"],
    reviewedAt: "2026-09-03",
  },
  {
    slug: "cosmetic-subscription-boxes",
    title: "Cosmetic Subscription Boxes",
    metaTitle: "Custom Beauty Subscription Boxes",
    metaDescription:
      "Custom beauty subscription boxes for recurring product drops, seasonal collections, and branded unboxing programs worldwide.",
    quoteFamily: "Mailer Boxes",
    heroTitle: "Subscription packaging built for recurring beauty drops and consistent unboxing.",
    heroDescription:
      "Mailer-led and premium recurring packaging systems for beauty brands delivering monthly, quarterly, or launch-based drops.",
    intro:
      "Subscription formats need repeatability, product presentation, and enough design room to make every drop feel branded.",
    recommended: [
      {
        productSlug: "custom-mailer-boxes",
        note: "Mailer option for repeatable beauty subscription drops.",
      },
      {
        productSlug: "custom-magnetic-boxes",
        note: "For premium seasonal editions or higher-ticket programs.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: [
      "Monthly beauty boxes",
      "Quarterly gifting drops",
      "Retention programs",
      "PR-heavy subscription launches",
    ],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
    relatedSlugs: ["lipstick-boxes", "pr-boxes", "skincare-boxes"],
    reviewedAt: "2026-09-01",
  },
  {
    slug: "pr-boxes",
    title: "PR Boxes",
    quoteFamily: "Magnetic Boxes",
    heroTitle: "PR boxes designed for seeding, launches, and branded unboxing.",
    heroDescription:
      "Custom rigid and mailer-led presentation systems for influencer drops, launch kits, and beauty send-outs.",
    intro:
      "PR packaging should present well on camera and hold the product in a structure developed for the planned product arrangement.",
    recommended: [
      {
        productSlug: "custom-magnetic-boxes",
        note: "Rigid presentation option for press and influencer kits.",
      },
      {
        productSlug: "custom-mailer-boxes",
        note: "Mailer option for larger seeding runs.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Influencer seeding", "Launch kits", "Press mailers", "Gifted collections"],
    moqNote: "Every UPG custom product family uses a 250-unit planning MOQ; final specifications remain subject to review.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
];

export function getCosmeticsSubcategoryBySlug(slug: string) {
  return cosmeticsSubcategories.find((subcategory) => subcategory.slug === slug);
}

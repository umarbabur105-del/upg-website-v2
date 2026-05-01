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
  intro: string;
  heroTitle: string;
  heroDescription: string;
  recommended: { productSlug: string; note: string }[];
  materials: string[];
  finishes: string[];
  inserts: string[];
  idealFor: string[];
  moqNote: string;
  leadTimeNote: string;
  artworkNote: string;
}

export const trustPoints: TrustPoint[] = [
  { label: "Quote in 24 hours" },
  { label: "Low MOQ path" },
  { label: "US & Canada delivery" },
  { label: "Design & dieline help" },
  { label: "Production follow-through" },
];

export const cosmeticsSolutions: CosmeticSolution[] = [
  {
    title: "Skincare boxes",
    href: "/cosmetics/skincare-boxes",
    note: "Cleansers, creams, masks, and treatment lines",
  },
  {
    title: "Serum boxes",
    href: "/cosmetics/serum-boxes",
    note: "Dropper bottles and premium treatment formats",
  },
  {
    title: "Cream & lotion boxes",
    href: "/cosmetics/cream-boxes",
    note: "Cartons and sets for jars, pumps, and tubs",
  },
  {
    title: "Lipstick & lip packaging",
    href: "/cosmetics/lipstick-boxes",
    note: "Slim cartons, sets, and shelf-facing details",
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
  "Soft-touch matte and silk lamination",
  "Foil stamp in gold, silver, copper, and custom spot colors",
  "Embossing and debossing",
  "Spot UV on matte stocks",
  "Specialty papers, textured wraps, and premium art papers",
  "EVA foam, paper pulp, and custom paperboard inserts",
  "Interior print and inside-of-lid branding",
];

export const howItWorksSteps = [
  {
    number: "01",
    title: "Submit your request",
    description:
      "Send your specs, dimensions, rough ideas, or even a reference photo. We can shape the project from partial information.",
  },
  {
    number: "02",
    title: "Receive your quote",
    description:
      "You get structured pricing, material options, finishing routes, and a realistic lead-time window.",
  },
  {
    number: "03",
    title: "Review & approve",
    description:
      "Dielines, mockups, and prepress details are checked before anything moves into production.",
  },
  {
    number: "04",
    title: "Production & delivery",
    description:
      "We manage production follow-through and keep the project moving through to shipment.",
  },
];

export const industries = [
  {
    slug: "cosmetic-packaging",
    name: "Cosmetic Packaging",
    description:
      "Cartons, rigid boxes, PR kits, and premium finishes for skincare, serum, lipstick, and perfume brands.",
  },
  {
    slug: "ecommerce-retail-packaging",
    name: "Ecommerce & Retail",
    description:
      "Mailer boxes, cartons, and inserts built for shipping, display, and branded unboxing.",
  },
  {
    slug: "supplements-specialty-food-packaging",
    name: "Supplements & Specialty Food",
    description:
      "Pouches and cartons for structured packaged goods, with use-case review built into quoting.",
  },
  {
    slug: "coffee-beverage-packaging",
    name: "Coffee & Beverage",
    description:
      "Paper cups and pouch formats for cafes, drink brands, and event-led packaging needs.",
  },
];

export const cosmeticsSubcategories: CosmeticSubcategory[] = [
  {
    slug: "skincare-boxes",
    title: "Skincare Boxes",
    heroTitle: "Skincare packaging built for shelf clarity and unboxing value.",
    heroDescription:
      "Refined cartons and premium rigid presentations for cleansers, moisturizers, masks, and treatment lines.",
    intro:
      "Skincare packaging needs clean structure, finish discipline, and enough flexibility for jars, pumps, and bottle formats.",
    recommended: [
      {
        productSlug: "custom-folding-cartons",
        note: "Primary carton format for most skincare lines.",
      },
      {
        productSlug: "custom-rigid-boxes",
        note: "Gift sets, launch kits, and premium hero products.",
      },
    ],
    materials: ["SBS paperboard", "Specialty wraps", "Textured papers"],
    finishes: ["Soft-touch matte", "Foil stamp", "Deboss", "Spot UV"],
    inserts: ["Paper pulp", "EVA foam", "Paperboard fitments"],
    idealFor: [
      "Moisturizer jars",
      "Treatment bottles",
      "Gift sets",
      "Skincare launches",
    ],
    moqNote: "Cartons can usually start lower than rigid presentations depending on the final structure.",
    leadTimeNote: "Lead time depends on finish complexity and whether inserts are required.",
    artworkNote:
      "Artwork support includes dieline guidance, foil area review, and insert planning where needed.",
  },
  {
    slug: "serum-boxes",
    title: "Serum Boxes",
    heroTitle: "Serum boxes for narrow formats, premium print, and bottle protection.",
    heroDescription:
      "Tall, narrow cartons and premium presentation formats designed for droppers, treatment serums, and hero-product launches.",
    intro:
      "Serum packaging often needs narrow structural tolerances, premium finish work, and insert guidance for fragile bottle formats.",
    recommended: [
      {
        productSlug: "custom-folding-cartons",
        note: "Most common format for single serum units.",
      },
      {
        productSlug: "custom-rigid-boxes",
        note: "Premium serum sets and hero SKU launches.",
      },
    ],
    materials: ["SBS C1S", "Premium wraps", "Specialty papers"],
    finishes: ["Foil stamp", "Soft-touch", "Deboss"],
    inserts: ["Paperboard collar", "EVA foam", "Pulp tray"],
    idealFor: [
      "Dropper bottles",
      "Treatment serums",
      "Premium skincare",
      "Gift sets",
    ],
    moqNote: "Single-unit serum cartons usually remain the fastest entry point.",
    leadTimeNote: "Insert-led or rigid serum presentations add more production complexity.",
    artworkNote:
      "Dieline fit and structural balance matter more than usual because serum bottles tend to be tall and narrow.",
  },
  {
    slug: "cream-boxes",
    title: "Cream Boxes",
    heroTitle: "Cream and lotion cartons designed for jars, pumps, and shelf presence.",
    heroDescription:
      "Versatile carton formats and premium secondary packaging for cream jars, body lotions, and personal care products.",
    intro:
      "Cream and lotion packaging usually needs room for wider jar formats, pump components, and strong front-panel branding.",
    recommended: [
      {
        productSlug: "custom-folding-cartons",
        note: "Best for everyday retail packaging around jars and pumps.",
      },
      {
        productSlug: "custom-mailer-boxes",
        note: "Useful when products ship as kits or ecommerce bundles.",
      },
    ],
    materials: ["SBS", "Kraft", "Corrugated support formats"],
    finishes: ["Matte", "Soft-touch", "Spot UV", "Foil"],
    inserts: ["Paperboard fitments", "Pulp tray", "Corrugated support"],
    idealFor: ["Cream jars", "Body lotions", "Personal care kits", "Retail sets"],
    moqNote: "Carton-led formats tend to be the most efficient for cream and lotion packaging.",
    leadTimeNote: "Large-format cartons or kit-based packing can shift production timing.",
    artworkNote:
      "Wide jar and pump dimensions should be finalized early so the carton fit does not need to be reopened later.",
  },
  {
    slug: "lotion-boxes",
    title: "Lotion Boxes",
    heroTitle: "Lotion packaging that balances structure, branding, and shipping readiness.",
    heroDescription:
      "Packaging formats for pumps, bottles, and retail-ready lotion lines across skincare and body care.",
    intro:
      "Lotion boxes usually need slightly more structural depth and transport stability than narrow cosmetic cartons.",
    recommended: [
      {
        productSlug: "custom-folding-cartons",
        note: "Best for single retail lotion units.",
      },
      {
        productSlug: "custom-mailer-boxes",
        note: "Useful for sample sets and ecommerce shipments.",
      },
    ],
    materials: ["SBS paperboard", "Kraft", "Corrugated mailer structures"],
    finishes: ["Matte", "Gloss AQ", "Foil", "Spot UV"],
    inserts: ["Paperboard collars", "Corrugated supports", "Pulp trays"],
    idealFor: ["Pump bottles", "Body lotions", "Sample sets", "Retail bundles"],
    moqNote: "Standard cartons are usually the fastest path to launch volume.",
    leadTimeNote: "Lotion kits or shipped sets may require both carton and outer mailer review.",
    artworkNote:
      "Product dimensions and pack-out method should be confirmed early if pumps or bundled kits are involved.",
  },
  {
    slug: "lipstick-boxes",
    title: "Lipstick Boxes",
    heroTitle: "Slim lipstick packaging built to read on shelf and on camera.",
    heroDescription:
      "Cartons and premium set formats for lipstick, lip oil, lip balm, and other slim-format beauty products.",
    intro:
      "Lip packaging usually relies on precise die lines, clean print registration, and visually strong finishes that still work at small scale.",
    recommended: [
      {
        productSlug: "custom-folding-cartons",
        note: "Standard route for individual lipstick units.",
      },
      {
        productSlug: "custom-rigid-boxes",
        note: "Collector sets and premium collections.",
      },
    ],
    materials: ["SBS paperboard", "Specialty wraps"],
    finishes: ["Foil stamp", "Spot UV", "Soft-touch"],
    inserts: ["Cardboard fitments", "EVA foam for set formats"],
    idealFor: ["Lipstick", "Lip gloss", "Lip balm", "Mini sets"],
    moqNote: "Single-unit lipstick cartons tend to be the most scalable launch format.",
    leadTimeNote: "Set-based presentations or premium inserts can add complexity.",
    artworkNote:
      "Small-format beauty packaging needs careful logo sizing, bleed control, and finish placement.",
  },
  {
    slug: "lip-gloss-boxes",
    title: "Lip Gloss Boxes",
    heroTitle: "Lip gloss packaging that supports slim structures and glossy visual storytelling.",
    heroDescription:
      "Carton formats for lip gloss tubes and slim beauty packaging where finish detail matters.",
    intro:
      "Lip gloss packaging often overlaps with lipstick structure, but still needs its own layout and fit adjustments.",
    recommended: [
      {
        productSlug: "custom-folding-cartons",
        note: "Best for single gloss units and everyday retail packaging.",
      },
      {
        productSlug: "custom-rigid-boxes",
        note: "For premium gloss duos or launch kits.",
      },
    ],
    materials: ["SBS", "Specialty papers"],
    finishes: ["Spot UV", "Foil", "Soft-touch"],
    inserts: ["Cardboard fitments", "EVA foam"],
    idealFor: ["Lip gloss tubes", "Beauty mini sets", "Retail gloss lines"],
    moqNote: "Cartons remain the most practical starting format for lip gloss launches.",
    leadTimeNote: "Premium set formats require additional insert review.",
    artworkNote:
      "Gloss-specific branding often leans on small-format finish work, so layout precision matters.",
  },
  {
    slug: "mascara-boxes",
    title: "Mascara Boxes",
    heroTitle: "Mascara cartons built for slim dimensions and precise print presentation.",
    heroDescription:
      "Structural cartons for slim tall beauty formats where fit, logo placement, and finish detail need control.",
    intro:
      "Mascara boxes often sit in the same structural family as lipstick and serum cartons but still need exact dimensions and panel balance.",
    recommended: [
      {
        productSlug: "custom-folding-cartons",
        note: "Most common route for mascara packaging.",
      },
    ],
    materials: ["SBS paperboard", "Recycled board"],
    finishes: ["Foil", "Soft-touch", "Spot UV"],
    inserts: ["Paperboard support where needed"],
    idealFor: ["Mascara tubes", "Slim cosmetic products", "Retail beauty lines"],
    moqNote: "Mascara cartons usually stay efficient at carton-first MOQs.",
    leadTimeNote: "Lead time is mostly driven by finishing and production volume.",
    artworkNote:
      "Because these packs are slim, front-panel composition and logo scale should be reviewed carefully before proofing.",
  },
  {
    slug: "perfume-boxes",
    title: "Perfume Boxes",
    heroTitle: "Perfume packaging for fragrance launches, gifting, and premium presentation.",
    heroDescription:
      "Substantial rigid structures and premium secondary packs designed to match the bottle and elevate the reveal.",
    intro:
      "Perfume packaging sits closer to luxury presentation than ordinary retail cartons, especially when inserts and specialty wraps are involved.",
    recommended: [
      {
        productSlug: "custom-rigid-boxes",
        note: "Best route for hero fragrance presentations.",
      },
      {
        productSlug: "custom-folding-cartons",
        note: "Useful for discovery sets or travel-size fragrance packaging.",
      },
    ],
    materials: ["Chipboard", "Specialty wraps", "Premium papers"],
    finishes: ["Foil", "Emboss", "Soft-touch", "Textured wraps"],
    inserts: ["EVA foam", "Velvet fitments", "Custom bottle cradles"],
    idealFor: ["Fragrance launches", "Premium bottles", "Discovery sets", "Gift formats"],
    moqNote: "Rigid structures usually start higher than standard cartons but deliver a more premium outcome.",
    leadTimeNote: "Insert-heavy rigid perfume packaging should be quoted with full structure detail up front.",
    artworkNote:
      "Bottle dimensions, insert tolerances, and wrap material selections should be approved early in the process.",
  },
  {
    slug: "cosmetic-subscription-boxes",
    title: "Cosmetic Subscription Boxes",
    heroTitle: "Subscription packaging built for recurring beauty drops and retention-driven unboxing.",
    heroDescription:
      "Mailer-led and premium recurring packaging systems for beauty brands shipping monthly, quarterly, or launch-based drops.",
    intro:
      "Subscription formats need repeatability, shipping protection, and enough design room to make every drop feel branded.",
    recommended: [
      {
        productSlug: "custom-mailer-boxes",
        note: "Best for repeatable beauty subscription drops.",
      },
      {
        productSlug: "custom-rigid-boxes",
        note: "For premium seasonal editions or higher-ticket programs.",
      },
    ],
    materials: ["Corrugated", "Premium wraps for special editions"],
    finishes: ["Interior print", "Matte lamination", "Soft-touch"],
    inserts: ["Pulp trays", "Custom paperboard fitments", "EVA for premium drops"],
    idealFor: [
      "Monthly beauty boxes",
      "Quarterly gifting drops",
      "Retention programs",
      "PR-heavy subscription launches",
    ],
    moqNote: "Corrugated mailers are usually the most efficient recurring-box entry point.",
    leadTimeNote: "Premium seasonal editions and insert complexity can increase lead time.",
    artworkNote:
      "Subscription programs benefit from planning the recurring structure first, then swapping graphics and inserts per campaign.",
  },
  {
    slug: "pr-boxes",
    title: "PR Boxes",
    heroTitle: "PR boxes engineered for seeding, launches, and content-worthy unboxing.",
    heroDescription:
      "Custom rigid and mailer-led presentation systems for influencer drops, launch kits, and beauty send-outs.",
    intro:
      "PR packaging should be photographed well, survive shipping, and still feel intentional when opened by creators or press.",
    recommended: [
      {
        productSlug: "custom-rigid-boxes",
        note: "Best for premium press and influencer presentations.",
      },
      {
        productSlug: "custom-mailer-boxes",
        note: "More scalable route for larger seeding runs.",
      },
    ],
    materials: ["Rigid chipboard", "Corrugated mailer structures", "Premium wraps"],
    finishes: ["Foil", "Soft-touch", "Interior print", "Custom inserts"],
    inserts: ["EVA foam", "Pulp trays", "Custom cradles", "Paperboard supports"],
    idealFor: ["Influencer seeding", "Launch kits", "Press mailers", "Gifted collections"],
    moqNote: "Rigid PR sets can be done for premium smaller runs, while mailers scale better for volume.",
    leadTimeNote: "PR boxes are often deadline-sensitive, so structure and contents should be clarified early.",
    artworkNote:
      "Insert maps and product pack-out should be defined before final artwork to avoid late-stage changes.",
  },
];

export function getCosmeticsSubcategoryBySlug(slug: string) {
  return cosmeticsSubcategories.find((subcategory) => subcategory.slug === slug);
}

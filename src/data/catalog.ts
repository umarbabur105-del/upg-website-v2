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
  { label: "MOQs vary by product & size" },
  { label: "Worldwide production & delivery" },
  { label: "Custom sizes & structures" },
  { label: "Dieline & artwork guidance" },
  { label: "Proofing & production follow-up" },
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
      "Cartons, rigid boxes, PR kits, and premium finishes for skincare, serum, lipstick, and perfume brands.",
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
    heroTitle: "Skincare packaging for clear retail presentation and branded unboxing.",
    heroDescription:
      "Refined cartons and premium rigid presentations for cleansers, moisturizers, masks, and treatment lines.",
    intro:
      "Skincare packaging needs a structure, panel layout, and finish plan suited to jars, pumps, and bottle formats.",
    recommended: [
      {
        productSlug: "custom-tuck-boxes",
        note: "Tuck-box option for individual skincare products.",
      },
      {
        productSlug: "custom-magnetic-boxes",
        note: "Gift sets, launch kits, and premium hero products.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: [
      "Moisturizer jars",
      "Treatment bottles",
      "Gift sets",
      "Skincare launches",
    ],
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "serum-boxes",
    title: "Serum Boxes",
    heroTitle: "Serum boxes for narrow formats, refined print, and accurate bottle fit.",
    heroDescription:
      "Tall, narrow cartons and rigid presentation formats for droppers, treatment serums, and featured-product launches.",
    intro:
      "Serum packaging often needs narrow structural tolerances, premium finish work, and insert guidance for fragile bottle formats.",
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
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: [
      "Dropper bottles",
      "Treatment serums",
      "Premium skincare",
      "Gift sets",
    ],
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
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
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "lotion-boxes",
    title: "Lotion Boxes",
    heroTitle: "Lotion packaging that balances structure, branding, and product fit.",
    heroDescription:
      "Printed packaging formats for pumps, bottles, and lotion lines across skincare and body care.",
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
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "lipstick-boxes",
    title: "Lipstick Boxes",
    heroTitle: "Slim lipstick packaging built to read on shelf and on camera.",
    heroDescription:
      "Cartons and premium set formats for lipstick, lip oil, lip balm, and other slim-format beauty products.",
    intro:
      "Lip packaging needs an accurate dieline, balanced panel layout, and finishes suited to a small carton format.",
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
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Lipstick", "Lip gloss", "Lip balm", "Mini sets"],
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "lip-gloss-boxes",
    title: "Lip Gloss Boxes",
    heroTitle: "Lip gloss packaging for slim structures, product branding, and finish detail.",
    heroDescription:
      "Carton formats for lip gloss tubes and slim beauty packaging where finish detail matters.",
    intro:
      "Lip gloss packaging often overlaps with lipstick structure, but still needs its own layout and fit adjustments.",
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
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "mascara-boxes",
    title: "Mascara Boxes",
    heroTitle: "Mascara cartons for slim dimensions, balanced panel layout, and finish detail.",
    heroDescription:
      "Structural cartons for slim tall beauty formats where fit, logo placement, and finish detail need control.",
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
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "perfume-boxes",
    title: "Perfume Boxes",
    heroTitle: "Perfume packaging for fragrance launches, gifting, and premium presentation.",
    heroDescription:
      "Rigid structures and secondary cartons developed around the bottle dimensions, insert plan, and presentation requirements.",
    intro:
      "Perfume packaging may use a magnetic presentation box or a printed tuck carton, depending on the bottle, insert, quantity, and presentation requirements.",
    recommended: [
      {
        productSlug: "custom-magnetic-boxes",
        note: "Rigid presentation option for hero fragrance products.",
      },
      {
        productSlug: "custom-tuck-boxes",
        note: "Useful for discovery sets or travel-size fragrance packaging.",
      },
    ],
    materials: ["Materials confirmed from the selected product family"],
    finishes: ["Matte or gloss", "Foil", "Spot UV", "Emboss or deboss"],
    inserts: ["Custom inserts where required"],
    idealFor: ["Fragrance launches", "Premium bottles", "Discovery sets", "Gift formats"],
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "cosmetic-subscription-boxes",
    title: "Cosmetic Subscription Boxes",
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
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
  {
    slug: "pr-boxes",
    title: "PR Boxes",
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
    moqNote: "MOQ follows the selected product family and, for tuck or mailer boxes, the finished size.",
    leadTimeNote: "Production timing is confirmed after structure and specification review.",
    artworkNote:
      "Final artwork is prepared on the approved dieline for the selected structure.",
  },
];

export function getCosmeticsSubcategoryBySlug(slug: string) {
  return cosmeticsSubcategories.find((subcategory) => subcategory.slug === slug);
}

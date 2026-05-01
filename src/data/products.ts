export type ProductFamily = "Boxes" | "Mylar Bags" | "Paper Cups";
export type ProductCategory =
  | "Cartons"
  | "Rigid"
  | "Mailers"
  | "Flexible"
  | "Foodservice";

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
  moq: string;
  leadTime: string;
  image: string;
  heroImage: string;
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
    slug: "custom-rigid-boxes",
    name: "Magnetic Closure Rigid Box",
    shortName: "Rigid Box",
    family: "Boxes",
    category: "Rigid",
    sku: "UPG-R001",
    bestFor: "Cosmetics, PR kits, gifting",
    summary:
      "A premium magnetic-lid box that turns first impressions into shelf-worthy moments.",
    longSummary:
      "Heavy-grade chipboard wrapped in art paper, textured stocks, or specialty wraps. Built for beauty launches, PR mailers, gift sets, and premium collections where presentation is part of the product.",
    moq: "300 units",
    leadTime: "18–25 days",
    image: "/images/redesign/products/product-rigid.jpg",
    heroImage: "/images/redesign/products/product-rigid.jpg",
    materials: [
      "Chipboard 1200–2000gsm",
      "Art paper wrap",
      "Specialty textured papers",
      "Linen and premium wraps",
    ],
    prints: ["Offset CMYK", "Pantone spot", "White ink", "Interior print"],
    finishes: [
      "Soft-touch matte",
      "Foil stamping",
      "Embossing",
      "Debossing",
      "Spot UV",
    ],
    sizes: "Fully custom — common formats range from 6×6×2 in to 12×9×4 in.",
    sizeFlexibility:
      "Fully custom dimensions with magnetic closure, hinged lid, and insert planning.",
    useCases: [
      "Skincare gift sets",
      "Perfume presentations",
      "PR kits and seeding boxes",
      "Premium cosmetic launches",
    ],
    industries: ["Cosmetics", "Skincare", "Perfume", "Gifting", "Subscription"],
    materialOptions:
      "1.5–3mm chipboard with wrapped art paper, specialty paper, or textured stock.",
    printOptions:
      "CMYK, Pantone spot colors, interior print, foil, embossing, and structured branding elements.",
    finishOptions:
      "Soft-touch matte, foil, debossing, embossing, and spot UV depending on structure.",
    artworkRequirements:
      "AI or layered PDF preferred. Wrapped-panel layouts, insert plans, and foil areas should be reviewed before proofing.",
    screeningNote:
      "Magnet placement, inserts, and premium wraps should be treated as proof-sensitive items and confirmed before production.",
    quoteCta: "Get a quote for magnetic rigid boxes",
  },
  {
    slug: "custom-folding-cartons",
    name: "Reverse Tuck End Folding Carton",
    shortName: "Folding Carton",
    family: "Boxes",
    category: "Cartons",
    sku: "UPG-F001",
    bestFor: "Skincare, serums, lipstick, supplements",
    summary:
      "The everyday workhorse of beauty packaging — refined, structural, and printable on every surface.",
    longSummary:
      "Lightweight folding cartons with a clean reverse-tuck closure. Ideal for skincare bottles, lip products, serums, and retail lines that need a premium print finish without moving into rigid-box cost.",
    moq: "500 units",
    leadTime: "12–18 days",
    image: "/images/redesign/products/product-carton.jpg",
    heroImage: "/images/redesign/products/product-carton.jpg",
    materials: ["SBS C1S 14–24pt", "Kraft 18–24pt", "Recycled board"],
    prints: ["Offset CMYK", "Pantone spot", "Metallic inks", "Inside print"],
    finishes: [
      "Soft-touch",
      "Matte",
      "Gloss AQ",
      "Foil stamp",
      "Embossing",
      "Spot UV",
    ],
    sizes: "Custom dielines — typical formats range from 1×1×3 in to 4×4×8 in.",
    sizeFlexibility:
      "Fully custom carton dielines sized for bottles, jars, lipstick, and secondary retail packaging.",
    useCases: [
      "Serum boxes",
      "Lipstick cartons",
      "Cream and lotion boxes",
      "Retail-ready cosmetic packaging",
    ],
    industries: ["Skincare", "Cosmetics", "Supplements", "Specialty retail"],
    materialOptions:
      "SBS, CCNB, kraft paperboard, and recycled stocks matched to print and structure.",
    printOptions:
      "CMYK, Pantone, metallic inks, and interior print depending on the carton format.",
    finishOptions:
      "Soft-touch, matte, gloss AQ, foil, embossing, and spot UV on approved stocks.",
    artworkRequirements:
      "Layered AI or print-ready PDF preferred; include 0.125 inch bleed, outlined fonts, and linked images at 300 dpi.",
    screeningNote:
      "If the carton is being used around regulated or ingestible products, the intended end use still needs to be collected during quoting.",
    quoteCta: "Get a quote for folding cartons",
  },
  {
    slug: "custom-mailer-boxes",
    name: "Corrugated Mailer Box",
    shortName: "Mailer Box",
    family: "Boxes",
    category: "Mailers",
    sku: "UPG-M001",
    bestFor: "Ecommerce, subscription, beauty unboxing",
    summary:
      "Branded mailers built for the unboxing — ship-ready, durable, and beautifully printed.",
    longSummary:
      "E-flute corrugated mailers with exterior and interior print options. Built for ecommerce shipping, influencer send-outs, cosmetic launches, and recurring subscription programs that need both protection and presentation.",
    moq: "250 units",
    leadTime: "12–16 days",
    image: "/images/redesign/products/product-mailer.jpg",
    heroImage: "/images/redesign/products/product-mailer.jpg",
    materials: ["E-flute corrugated", "F-flute corrugated", "White or kraft liner"],
    prints: ["Flexo", "Digital", "Offset litho-laminated", "Interior print"],
    finishes: ["Matte lamination", "Interior print", "Tear strip add-on"],
    sizes: "Standard 6×4×2 in to 18×12×6 in, fully custom.",
    sizeFlexibility:
      "Mailer dimensions can be fully customized for kits, subscription drops, or shipping protection needs.",
    useCases: [
      "Cosmetic subscription boxes",
      "Beauty ecommerce shipping",
      "Influencer mailers",
      "PR send-outs and launch kits",
    ],
    industries: ["Ecommerce", "Cosmetics", "Subscription", "Gifting"],
    materialOptions:
      "E-flute and F-flute corrugated with white or kraft liners depending on print and transit needs.",
    printOptions:
      "Flexo, digital, offset, and interior print routes depending on quantity and finish targets.",
    finishOptions:
      "Matte lamination, inside print, and tear-strip options where structure supports them.",
    artworkRequirements:
      "AI or PDF preferred; dielines supplied for final layout and insert planning where needed.",
    screeningNote:
      "Fragile or premium contents should include insert requirements or protection notes in the quote request.",
    quoteCta: "Get a quote for corrugated mailers",
  },
  {
    slug: "custom-mylar-bags",
    name: "Stand Up Mylar Pouch",
    shortName: "Mylar Pouch",
    family: "Mylar Bags",
    category: "Flexible",
    sku: "UPG-P001",
    bestFor: "Coffee, wellness, supplements, beauty refills",
    summary:
      "Premium barrier pouches with bold print real estate and strong shelf presence.",
    longSummary:
      "Multi-layer barrier film pouches with resealable zipper, tear notch, and stand-up gusset. Best for coffee, wellness, supplements, and select beauty refill formats where flexible packaging makes sense.",
    moq: "1,000 units",
    leadTime: "20–28 days",
    image: "/images/redesign/products/product-pouch.jpg",
    heroImage: "/images/redesign/products/product-pouch.jpg",
    materials: ["PET / VMPET / PE", "Kraft / PET / PE", "Matte PET"],
    prints: ["Rotogravure", "Digital", "Up to 10 colors"],
    finishes: ["Matte", "Soft-touch", "Spot gloss", "Window patch"],
    sizes: "2 oz to 5 lb capacity with custom dimensions available.",
    sizeFlexibility:
      "Custom pouch sizes, zipper placement, and tear-notch details depending on barrier structure.",
    useCases: [
      "Coffee and tea packaging",
      "Supplement and wellness pouches",
      "Powders and dry goods",
      "Beauty refill packs",
    ],
    industries: ["Coffee & Beverage", "Wellness", "Supplements", "Beauty refills"],
    materialOptions:
      "PET/VMPET/PE, kraft/PET/PE, matte films, and custom barrier structures on review.",
    printOptions:
      "Rotogravure or digital-ready layouts depending on supplier path and quantity.",
    finishOptions:
      "Matte, soft-touch, spot gloss, and window options where the structure supports them.",
    artworkRequirements:
      "AI or print-ready PDF preferred; seal areas, zipper placement, and window zones must be respected.",
    screeningNote:
      "Intended end use is mandatory. Food-contact or supplement projects need material review before approval.",
    quoteCta: "Get a quote for stand-up mylar pouches",
  },
  {
    slug: "custom-coffee-cups",
    name: "Single Wall Paper Cup",
    shortName: "Paper Cup",
    family: "Paper Cups",
    category: "Foodservice",
    sku: "UPG-CUP001",
    bestFor: "Coffee shops, specialty beverage, events",
    summary:
      "Custom-printed single-wall paper cups for cafes, specialty beverage brands, and events.",
    longSummary:
      "Food-grade single-wall paper cups with custom print, standard size formats, and clean cylindrical presentation. A practical route for cafes, activations, and branded beverage service.",
    moq: "1,000 units",
    leadTime: "15–22 days",
    image: "/images/redesign/products/product-cup.jpg",
    heroImage: "/images/redesign/products/product-cup.jpg",
    materials: ["Food-grade SBS + lining", "PE lining", "Bio-PLA option on review"],
    prints: ["Flexo CMYK", "Pantone spot"],
    finishes: ["Matte", "Gloss"],
    sizes: "4 oz, 8 oz, 12 oz, 16 oz, and 20 oz standard formats.",
    sizeFlexibility:
      "Standard cup sizes plus selected custom review paths where supported by the supplier.",
    useCases: [
      "Cafe branding",
      "Coffee launches",
      "Brand activations",
      "Events and pop-ups",
    ],
    industries: ["Coffee & Beverage", "Hospitality", "Events"],
    materialOptions:
      "Food-grade cup stock with supported lining or barrier options depending on the use case.",
    printOptions:
      "Exterior wrap print in standard color systems and Pantone-supported routes.",
    finishOptions:
      "Finish selection is matched to the approved cup structure and print process.",
    artworkRequirements:
      "AI or print-ready PDF preferred; cup wrap template required before final file setup.",
    screeningNote:
      "Intended beverage use, temperature, and service environment should be confirmed before quoting.",
    quoteCta: "Get a quote for paper cups",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(
  currentSlug: string,
  limit = 3
): Product[] {
  return products.filter((product) => product.slug !== currentSlug).slice(0, limit);
}

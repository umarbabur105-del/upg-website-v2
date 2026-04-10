export interface Product {
  slug: string;
  name: string;
  family: "Boxes" | "Mylar Bags" | "Paper Cups";
  sku: string;
  summary: string;
  moq: string;
  leadTime: string;
  materialOptions: string;
  printOptions: string;
  finishOptions: string;
  sizeFlexibility: string;
  useCases: string[];
  artworkRequirements: string;
  screeningNote: string;
  quoteCta: string;
  /** Optional: path to a real product photo in /public. When set, shown instead of SVG illustration. */
  photoSrc?: string;
}

export const products: Product[] = [
  {
    // TODO: Replace with real product photo when available — photoSrc: "/images/products/corrugated-mailer-box.jpg"
    slug: "custom-mailer-boxes",
    name: "Corrugated Mailer Box",
    family: "Boxes",
    sku: "UPG-M001",
    summary:
      "A custom corrugated mailer built for e-commerce shipping, subscription programs, and brand-driven unboxing.",
    moq: "500+ units",
    leadTime: "10-15 business days",
    materialOptions:
      "E-flute and B-flute corrugated with white or kraft liner",
    printOptions:
      "Exterior print, interior print, one-color to full-color layouts depending on spec",
    finishOptions: "Matte or gloss coatings where structure supports it",
    sizeFlexibility: "Custom dimensions available",
    useCases: [
      "Subscription packaging",
      "Apparel shipments",
      "Beauty kits",
      "Launch boxes",
    ],
    artworkRequirements:
      "AI or PDF preferred; dieline supplied for final layout",
    screeningNote:
      "Projects with fragile contents should include insert needs or protective packaging notes in the quote request.",
    quoteCta: "Get a quote for corrugated mailers",
  },
  {
    // TODO: Replace with real product photo when available — photoSrc: "/images/products/magnetic-rigid-box.jpg"
    slug: "custom-rigid-boxes",
    name: "Magnetic Closure Rigid Box",
    family: "Boxes",
    sku: "UPG-R001",
    summary:
      "A premium rigid box for luxury presentation, gifting, and branded product experiences that need a stronger unboxing moment.",
    moq: "500+ units",
    leadTime: "15-20 business days",
    materialOptions:
      "1.5-3mm chipboard with wrapped art paper or specialty paper",
    printOptions: "CMYK, PMS, foil, embossing, interior print on review",
    finishOptions: "Matte, gloss, soft-touch, foil, spot UV, embossing",
    sizeFlexibility: "Custom dimensions available",
    useCases: [
      "Premium cosmetics",
      "Jewelry packaging",
      "Gifting and PR kits",
      "Electronics accessories",
    ],
    artworkRequirements:
      "AI or PDF preferred; wrapped-panel layout and insert plan should be reviewed before proofing",
    screeningNote:
      "Magnet placement, insert design, and specialty wrap materials should be treated as proof-sensitive items.",
    quoteCta: "Get a quote for magnetic rigid boxes",
  },
  {
    // TODO: Replace with real product photo when available — photoSrc: "/images/products/standup-mylar-pouch.jpg"
    slug: "custom-mylar-bags",
    name: "Stand Up Mylar Pouch",
    family: "Mylar Bags",
    sku: "UPG-P001",
    summary:
      "A flexible stand-up pouch for brands that need shelf presence, efficient storage, and strong front-facing print coverage.",
    moq: "1,000+ units",
    leadTime: "12-18 business days",
    materialOptions:
      "PET/VMPET/PE, kraft/PET/PE, custom barrier structures on review",
    printOptions:
      "Gravure or digital-ready layouts depending on supplier path",
    finishOptions: "Matte, gloss, soft-touch, spot effects where supported",
    sizeFlexibility: "Custom dimensions, zipper and tear-notch options",
    useCases: [
      "Supplements",
      "Dry goods",
      "Personal care refills",
      "Specialty retail",
    ],
    artworkRequirements:
      "AI or print-ready PDF preferred; dieline fit and seal area must be respected",
    screeningNote:
      "Intended end use is mandatory. Food-contact or supplement jobs require documented material review before approval.",
    quoteCta: "Get a quote for stand-up mylar pouches",
  },
  {
    // TODO: Replace with real product photo when available — photoSrc: "/images/products/folding-carton.jpg"
    slug: "custom-folding-cartons",
    name: "Reverse Tuck End Folding Carton",
    family: "Boxes",
    sku: "UPG-F001",
    summary:
      "A versatile folding carton for lightweight retail packaging, cosmetics, soaps, and general product presentation.",
    moq: "1,000+ units",
    leadTime: "10-14 business days",
    materialOptions:
      "SBS, CCNB, kraft paperboard in common folding-carton calipers",
    printOptions: "CMYK, PMS, inside print on review",
    finishOptions: "Matte, gloss, spot UV, foil, embossing on review",
    sizeFlexibility: "Fully custom dimensions within structure limits",
    useCases: [
      "Skincare cartons",
      "Soap boxes",
      "Small retail items",
      "Promotional kits",
    ],
    artworkRequirements:
      "Layered AI or print-ready PDF preferred; 0.125 inch bleed; fonts outlined; linked images at 300 dpi",
    screeningNote:
      "If the carton will be used as secondary packaging for ingestible or regulated products, collect the intended end use in the quote form.",
    quoteCta: "Get a quote for folding cartons",
  },
  {
    // TODO: Replace with real product photo when available — photoSrc: "/images/products/single-wall-paper-cup.jpg"
    slug: "custom-coffee-cups",
    name: "Single Wall Paper Cup",
    family: "Paper Cups",
    sku: "UPG-CUP001",
    summary:
      "A custom printed single-wall paper cup for beverage service, sampling, and branded takeaway programs.",
    moq: "1,000+ units",
    leadTime: "15-20 business days",
    materialOptions:
      "Food-contact cup stock with supplier-supported lining or barrier options on request",
    printOptions: "Exterior wrap print in standard color systems",
    finishOptions:
      "Matched to the approved cup structure and print process",
    sizeFlexibility: "Common ounce formats plus custom review where supported",
    useCases: [
      "Cafes and coffee shops",
      "Events and tastings",
      "Beverage sampling",
      "Takeaway service",
    ],
    artworkRequirements:
      "AI or print-ready PDF preferred; cup wrap template required before final file setup",
    screeningNote:
      "Intended beverage use, temperature, and service environment must be reviewed before the quote is approved.",
    quoteCta: "Get a quote for paper cups",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  currentSlug: string,
  limit = 3
): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

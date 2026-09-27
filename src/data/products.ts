// Mailer commercial terms clarified by Umar on 2026-09-27.
// Shipping is included in the quoted cost; production starts after design-file approval.
export const mailerCommercialTerms = {
  production:
    "Standard mailer production takes approximately 7 business days, starting after you approve the final design file. Complex structures, specialty finishes and larger runs can take longer; your quote confirms the schedule. Shipping time is separate.",
  rush:
    "Rush mailer production may be available in 4–7 business days after you approve the final design file. We review artwork, size, quantity, materials and capacity before confirming availability and any rush charge. Shipping time is separate.",
  artwork:
    "Mailer orders include a custom dieline, basic artwork preparation and checking, a digital proof file and two rounds of design-file revisions at no extra charge. You can request a quote before your print files are ready. Printing begins only after you approve the final design file.",
  shipping:
    "Shipping costs are included in your quoted total for the agreed destination and service. Standard US transit is estimated at 2–5 business days after dispatch, subject to the confirmed destination and service. Your quote states whether duties and taxes are included and identifies any additional charges.",
} as const;

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
  buyerFaqs?: ProductFaq[];
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
    slug: "custom-mailer-boxes",
    name: "Custom Printed Corrugated Mailer Boxes",
    shortName: "Mailer Boxes",
    family: "Mailer Boxes",
    category: "Corrugated Mailers",
    sku: "UPG-MAILER",
    bestFor: "PR kits, subscription boxes, ecommerce packaging, and branded presentation",
    summary:
      "Custom printed corrugated ear-lock mailer boxes for branded unboxing, product presentation, and repeat programs.",
    longSummary:
      "UPG makes custom printed corrugated ear-lock mailer boxes for PR kits, influencer campaigns, subscription programs, ecommerce presentation, and branded product launches. Choose kraft or white surfaces, print your logo outside or add an inside reveal, and plan a fitted insert. We help match the size and corrugated construction to your product and delivery needs.",
    metaTitle: "Custom Printed Corrugated Mailer Boxes | 250-Unit MOQ",
    metaDescription:
      "Custom printed corrugated mailer boxes from 250 units. Compare sizes, board, inside printing and inserts, with proofing and delivery planned for your project.",
    searchTerms: [
      "custom corrugated mailer boxes",
      "custom printed mailer boxes",
      "custom mailer boxes",
      "ear lock mailer boxes",
      "printed corrugated mailer boxes",
      "custom ecommerce mailer boxes",
      "custom subscription mailer boxes",
      "custom PR boxes",
      "mailer box inserts",
    ],
    reviewedAt: "2026-09-27",
    buyerFaqs: [
      {
        question: "Can I compare prices for 250, 500 and 1,000 custom mailer boxes?",
        answer:
          "Yes. Ask for 250, 500 and 1,000 units using the same dimensions, corrugated construction, print scope, and inserts. Different sizes or artwork versions need their own minimum review. The written quote confirms the approved specification and price factors.",
      },
      {
        question: "How do I choose the right custom mailer box size?",
        answer:
          "Start with the outside length, width, and height of the packed product or full group, including any protective layer. Then state the mailer's requested inside length, width, and height separately. Clearance depends on the arrangement, insert, and construction, so confirm fit with the applicable sample or approved project review.",
      },
      {
        question: "Should I choose kraft or white for a printed mailer box?",
        answer:
          "Brown kraft gives a natural paper look and changes how printed colors appear. White provides a lighter base for color artwork. Compare the artwork on your chosen surface, and use a physical print sample when color matching is critical.",
      },
      {
        question: "Can I print the inside of a corrugated mailer box?",
        answer:
          "Yes. Exterior-only printing and coordinated exterior and interior printing can be compared on the same mailer brief. Share the intended artwork scope, product arrangement, and quantity so the production specification can be reviewed.",
      },
      {
        question: "Which corrugated board and flute should I use?",
        answer:
          "Fine flutes such as E provide a compact board and a smooth surface for print. Larger flute profiles can add cushioning and compression resistance, but the liner grades, box size, product weight, insert, and shipping conditions also affect performance. Share those details so we can recommend the complete board specification.",
      },
      {
        question: "Does a custom mailer quote include shipping and taxes?",
        answer: mailerCommercialTerms.shipping,
      },
      {
        question: "How long does custom mailer box production take?",
        answer: mailerCommercialTerms.production,
      },
      {
        question: "Can I request rush production for custom mailer boxes?",
        answer: mailerCommercialTerms.rush,
      },
      {
        question: "Is an ear-lock presentation mailer the same as a shipping carton?",
        answer:
          "UPG supplies custom ear-lock corrugated mailers for branded presentation, PR kits, subscriptions, and ecommerce packaging. Standard shipping cartons, master cartons, and RSC cases are not supplied. Share the packed product and shipping method so the mailer construction and any separate transit protection can be reviewed.",
      },
      {
        question: "Can I start without a dieline or finished artwork?",
        answer: `Yes. ${mailerCommercialTerms.artwork}`,
      },
    ],
    buyerDecisionFaq: {
      question: "Which corrugated mailer box path should I use?",
      answer:
        "Use the PR box guide for launches, press, media kits, events, or broad brand presentations; the influencer guide for creator seeding; the subscription guide for recurring assortments; and the ecommerce guide for branded online-order presentation. Every path stays inside UPG's custom ear-lock corrugated mailer offer. Standard shipping cartons, master cartons, and RSC cases are not supplied.",
    },
    moq: "250 units",
    leadTime: mailerCommercialTerms.production,
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
    materials: ["Corrugated board", "Kraft or white surfaces", "Exterior or interior printing", "Custom inserts"],
    prints: ["Exterior print", "Interior and exterior print"],
    finishes: ["Matte or gloss", "Foil stamping", "Spot UV", "Custom inserts"],
    sizes:
      "Custom sizes with a 250-unit planning MOQ; final dimensions remain subject to structural feasibility review.",
    sizeFlexibility:
      "The packed product's outside dimensions, requested internal mailer dimensions, ear-lock structure, and any insert are confirmed for fit, feasibility, and pricing; the planning MOQ remains 250 units.",
    useCases: [
      "PR and influencer kits",
      "Subscription mailers",
      "Branded ecommerce packaging",
      "Product launch and presentation boxes",
    ],
    industries: ["Ecommerce", "Cosmetics", "Subscription", "Gifting", "Consumer Products"],
    materialOptions:
      "Corrugated construction, material presentation, board formation, flute profile, print, and insert options are reviewed around the complete packout and delivery plan.",
    printOptions:
      "Exterior-only printing or exterior and interior printing can be reviewed for the approved structure and artwork scope.",
    finishOptions:
      "Matte, gloss, foil, spot UV, and custom inserts are available for the approved structure.",
    artworkRequirements:
      "Final artwork is prepared on the approved mailer dieline. Insert artwork is coordinated with the planned product arrangement, and the applicable proof path is confirmed for the project.",
    screeningNote:
      "UPG supplies ear-lock mailer boxes, not regular slotted shipping cartons, master cartons, or RSC cases. Production timing and delivery terms are confirmed after specification review.",
    quoteCta: "Start a mailer box project",
  },
  {
    slug: "custom-tuck-boxes",
    name: "Custom Tuck Boxes",
    shortName: "Tuck Boxes",
    family: "Tuck Boxes",
    category: "Tuck Boxes",
    sku: "UPG-TUCK",
    bestFor: "Retail products, cosmetics, food cartons, and everyday secondary packaging",
    summary:
      "Custom printed tuck boxes and folding cartons for cosmetics, supplements, food cartons and retail products, with a choice of closures, board and finishes.",
    longSummary:
      "Custom printed tuck boxes give cosmetics, supplements and retail products a fitted folding carton with space for branding and product information. Choose straight tuck, reverse tuck, auto-lock, interlock or seal-end construction, with custom sizing, board, printing and finishes from 250 units.",
    metaTitle: "Custom Tuck Boxes & Cartons | 250-Unit MOQ",
    metaDescription:
      "Custom printed tuck boxes from 250 units. Compare straight tuck, reverse tuck and auto-lock cartons, cardstock, kraft, windows and finishes for your product.",
    searchTerms: [
      "custom tuck boxes",
      "custom printed tuck boxes",
      "custom folding cartons",
      "custom tuck boxes wholesale",
      "straight tuck end boxes",
      "reverse tuck end boxes",
      "auto-lock bottom boxes",
      "seal end boxes",
      "custom cardstock boxes",
      "kraft tuck boxes",
    ],
    reviewedAt: "2026-09-27",
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
            "Straight tuck closes in the same direction at both ends; reverse tuck closes in opposite directions. Check the front panel and opening before placing artwork on the dieline.",
          styleSlugs: ["straight-tuck-end-boxes", "reverse-tuck-end-boxes"],
        },
        {
          title: "Auto-lock or interlock brief",
          description:
            "An auto-lock base is pre-glued and opens into position during assembly. An interlock base is folded and locked by hand. Compare the packing method and product weight before choosing the board and base.",
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
    buyerFaqs: [
      {
        question: "Which cardstock thickness should I choose for a tuck box?",
        answer:
          "Specify cardstock thickness in points (PT); GSM describes its weight per area, so it is not a fixed conversion. A small, light product and a tall or heavy product can need different board and base combinations. Compare thickness alongside the board grade, product weight, panel size and a structural sample rather than choosing by PT alone.",
      },
      {
        question: "Can different artwork versions share one tuck box order?",
        answer:
          "You can request multiple versions, but list the quantity for each design. In offset printing, even a small text change changes the artwork and requires new plates for the affected colors, with separate print setup. The same box size and shape do not make different designs one printing run; pricing and minimums are reviewed by version.",
      },
      {
        question: "Can I compare 250, 500 and 1,000 custom tuck boxes?",
        answer:
          "Yes. Request 250, 500 and 1,000 units using the same carton structure, dimensions, board, printing and finish. If the project includes multiple sizes or artwork versions, share the planned mix so the minimum for each can be reviewed.",
      },
      {
        question: "Can my tuck box be printed on both sides?",
        answer:
          "One-sided and two-sided printing can be planned around the selected board and carton structure. Describe the exterior and interior artwork scope in the enquiry so the production specification can be reviewed.",
      },
      {
        question: "Can I compare a window or premium finish with a simpler tuck box?",
        answer:
          "Yes. Identify the window, foil, spot UV, embossing, debossing or other preferred feature, and ask for a comparison using the same carton size, structure, board and quantity. The written quote confirms each reviewed option.",
      },
    ],
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
    slug: "custom-magnetic-boxes",
    name: "Custom Magnetic Boxes",
    shortName: "Magnetic Boxes",
    family: "Magnetic Boxes",
    category: "Rigid Boxes",
    sku: "UPG-MAGNETIC",
    bestFor: "Premium gifts, beauty, apparel, electronics, and launch collections",
    summary:
      "Custom rigid magnetic closure boxes for beauty sets, apparel, electronics and premium gifts, with fitted inserts and interior or exterior branding.",
    longSummary:
      "Custom magnetic closure boxes pair an assembled rigid structure with a magnetic lid for beauty sets, apparel, electronics and premium gifts. Build the presentation around your product with fitted inserts, inside or outside printing, foil and other finishes. Orders start at 250 units.",
    metaTitle: "Custom Magnetic Closure Boxes | 250-Unit MOQ",
    metaDescription:
      "Custom magnetic closure boxes from 250 units. Explore rigid gift boxes with fitted inserts, inside printing, foil and finishes for beauty, apparel and gifts.",
    searchTerms: [
      "custom magnetic boxes",
      "custom magnetic closure boxes",
      "custom rigid magnetic boxes",
      "magnetic gift boxes",
      "premium magnetic boxes",
      "magnetic boxes with inserts",
      "custom rigid gift boxes",
    ],
    reviewedAt: "2026-09-27",
    buyerDecisionFaq: {
      question: "Should I choose a standard or collapsible magnetic box?",
      answer:
        "A standard magnetic box keeps its assembled rigid shape before packing. A collapsible magnetic box folds flat for storage and needs assembly before use. Compare storage space, packing labor and the complete shipping configuration, including inserts, for the same product arrangement and quantity.",
    },
    buyerFaqs: [
      {
        question: "Are magnetic gift boxes suitable for shipping on their own?",
        answer:
          "A rigid presentation box is not automatically a parcel shipping box. A magnetic lid, decorative wrap and fitted insert should be considered as part of the complete packing system. Plan suitable outer transit protection and evaluate it with the actual product, weight and delivery conditions.",
      },
      {
        question: "Should I use internal or external dimensions for a magnetic box?",
        answer:
          "Use the product's outside dimensions to start the brief, then identify the usable internal space required for the product and insert. External box dimensions also include the board, wrap and construction. Label any existing box measurements as internal or external so the two are not confused.",
      },
      {
        question: "Can I request a magnetic box quote before final artwork is ready?",
        answer:
          "Yes. Start with the product arrangement, dimensions, quantity, destination and intended wrap, insert or finish options. Existing artwork or a reference can follow; final artwork is prepared on the approved wrapped-box and insert dielines.",
      },
      {
        question: "What should I provide for a magnetic box insert?",
        answer:
          "Send the dimensions, weight and intended arrangement of every item in the set. A reference image can help explain the presentation, while the final insert layout is confirmed for the approved box structure.",
      },
      {
        question: "Can I request interior branding and premium finishes on a magnetic box?",
        answer:
          "Exterior, interior and insert branding can be planned with foil, embossing, debossing, spot UV or soft-touch options. List the artwork and finish preferences so they can be reviewed with the rigid-box specification.",
      },
    ],
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
    bestFor: "Apparel, beauty sets and premium gifts with flat storage before packing",
    summary:
      "Custom fold-flat magnetic gift boxes for apparel, beauty sets and branded gifting, with inserts, printing and presentation finishes.",
    longSummary:
      "Custom collapsible magnetic boxes fold flat before assembly, then form a rigid gift box with a magnetic closure. Plan apparel, beauty or seasonal gift sets with custom printing, inserts and finishes from 250 units, with the assembly and packing method agreed for your project.",
    metaTitle: "Custom Collapsible Magnetic Boxes | 250-Unit MOQ",
    metaDescription:
      "Custom collapsible magnetic boxes from 250 units. Compare fold-flat gift boxes, inserts, assembly, printing and finishes for apparel, beauty and gifting.",
    searchTerms: [
      "custom collapsible magnetic boxes",
      "fold flat magnetic boxes",
      "foldable magnetic gift boxes",
      "collapsible rigid boxes",
      "collapsible magnetic closure boxes",
    ],
    reviewedAt: "2026-09-27",
    buyerFaqs: [
      {
        question: "Does a collapsible magnetic box have the same fit as an assembled rigid box?",
        answer:
          "Do not assume two boxes with the same outside dimensions have identical usable space. Folds, corners, board and inserts affect the interior. Compare both structures around the same product arrangement, then check fit, lid closure and product removal in an assembled structural sample.",
      },
      {
        question: "Does the insert fold flat with the box?",
        answer:
          "That depends on the insert design. The box and insert may need different packing and storage arrangements. Confirm whether the insert is supplied flat or assembled, who fits it and how both components are packed for delivery before comparing freight costs.",
      },
      {
        question: "Are collapsible magnetic boxes always cheaper to ship?",
        answer:
          "Fold-flat boxes take up less space before assembly. The delivery cost depends on the packing configuration, inserts, quantity, destination and freight service. Ask us to compare collapsible and assembled magnetic boxes for your project.",
      },
      {
        question: "Can I compare 250, 500 and 1,000 collapsible magnetic boxes?",
        answer:
          "Yes. Compare quotes at 250, 500 and 1,000 units with the same size, folding construction, wrap, printing, inserts and finishes. Other quantities from 250 units are welcome. Share any different sizes or artwork versions so we can confirm the minimum for each.",
      },
      {
        question: "Who assembles the fold-flat boxes and fits the inserts?",
        answer:
          "Tell us who will assemble the boxes and pack the products. We will plan the folding method, magnetic closure, insert layout and how the components are supplied around that process. Your written quote sets out the agreed scope, including any assembly or packing services.",
      },
      {
        question: "Can I check the structure before committing to production?",
        answer:
          "Yes. Share your box dimensions and design direction to discuss sample and proofing options. We will confirm the available options, cost and timing before you choose how to proceed.",
      },
    ],
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
      "Custom printed Mylar bags, stand-up pouches, flat-bottom coffee bags and spout pouches, with film and closures matched to the product and packing method.",
    longSummary:
      "Custom printed Mylar bags and pouches bring your branding to coffee, packaged food, supplements and personal care products. Compare stand-up, flat-bottom, three-side-seal and spout formats, with film and closure options matched to the contents. Finished pouch orders start at 250 units; printed rollstock is quoted separately for your packing line.",
    metaTitle: "Custom Mylar Bags & Printed Pouches | 250-Unit MOQ",
    metaDescription:
      "Custom printed Mylar bags and pouches from 250 units. Compare stand-up, flat-bottom and spout formats, sizes, closures and film for your product.",
    searchTerms: [
      "custom Mylar bags",
      "custom printed Mylar bags",
      "custom pouches",
      "custom printed pouches",
      "custom flexible packaging",
      "custom stand up pouches",
      "custom coffee bags",
      "custom flat bottom bags",
      "custom resealable pouches",
      "custom spout pouches",
      "printed rollstock film",
      "flexible packaging rollstock",
    ],
    reviewedAt: "2026-09-27",
    buyerDecisionFaq: {
      question: "Should I request finished pouches or printed rollstock film?",
      answer:
        "Choose a finished pouch route when the required format is a stand-up, flat-bottom, three-side-seal, spout, coffee, or child-resistant bag. Choose printed rollstock when the packing plan requires custom film on roll. Film structure, product compatibility, machine, web, repeat, sealing, quantity, print, and destination details require project review.",
    },
    buyerFaqs: [
      {
        question: "How do I choose a Mylar bag size for a specific fill weight?",
        answer:
          "Start with the actual product and target fill weight or volume. Coffee beans, powders and snacks occupy different amounts of space at the same weight. Width, height, gusset, seal areas and closure position affect usable capacity. Check a fill sample with your product before approving the final size.",
      },
      {
        question: "Does a resealable zipper replace the pouch's heat seal?",
        answer:
          "A zipper allows the customer to reclose the pouch after opening. The initial heat seal is a separate part of the filling and sealing process. Confirm the film, fill opening, seal area and equipment settings with the packing team; a zipper alone should not be treated as proof of a sealed pack.",
      },
      {
        question: "What should I include in a printed rollstock enquiry?",
        answer:
          "Include the product, packing machine, web, repeat, sealing requirements, order quantity or unit, print details and delivery destination. Printed rollstock is reviewed as its own project specification.",
      },
      {
        question: "Can I choose a zipper, valve, window or spout for a custom Mylar bag?",
        answer:
          "Zippers, valves, windows and spouts can be specified where the selected bag format supports them. Include the product, finished format and required feature in the brief so the specification can be reviewed.",
      },
      {
        question: "What product and market details should I include in a Mylar bag enquiry?",
        answer:
          "Share the product, intended use, delivery market and any product-compatibility, barrier, food-contact, child-resistant or market-specific requirements. These details are reviewed before the final film and pouch specification is approved.",
      },
      {
        question: "Does the name Mylar guarantee a particular barrier or shelf life?",
        answer:
          "No. The complete film structure, seals, closure, product and storage conditions determine performance. State your moisture, oxygen, light and shelf-life requirements so the material can be specified and supporting information reviewed. Food-contact suitability and any child-resistant requirements are confirmed for the actual packaging specification.",
      },
    ],
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

  faqs.push(...(product.buyerFaqs ?? []));

  return faqs;
}

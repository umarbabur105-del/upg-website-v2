export interface ComparisonOption {
  title: string;
  label: string;
  summary: string;
  href?: string;
  quoteHref?: string;
  planningMoq: string;
  chooseWhen: string[];
  availabilityNote?: string;
}

export interface ComparisonRow {
  criterion: string;
  first: string;
  second: string;
}

export interface ComparisonGuide {
  slug: string;
  name: string;
  shortName: string;
  productSlugs: string[];
  styleSlugs?: string[];
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  quickAnswer: string;
  first: ComparisonOption;
  second: ComparisonOption;
  rows: ComparisonRow[];
  decisionQuestions: Array<{ title: string; description: string }>;
  projectInputs: string[];
  scopeNote: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
  reviewedAt: string;
}

const reviewedAt = "2026-08-23";

export const comparisonGuides: ComparisonGuide[] = [
  {
    slug: "tuck-boxes-vs-mailer-boxes",
    name: "Tuck Boxes vs Mailer Boxes",
    shortName: "Tuck vs Mailer",
    productSlugs: ["custom-tuck-boxes", "custom-mailer-boxes"],
    metaDescription:
      "Compare custom tuck boxes and corrugated ear-lock mailer boxes by structure, use, materials, printing, MOQ, and quote inputs.",
    keywords: [
      "tuck boxes vs mailer boxes",
      "tuck box or mailer box",
      "folding carton vs corrugated mailer",
      "custom box comparison",
    ],
    eyebrow: "Folding carton or corrugated mailer?",
    heroTitle: "Tuck boxes vs mailer boxes: choose from the product and program.",
    heroDescription:
      "Compare an individual folded outer carton with a corrugated ear-lock presentation mailer before dimensions, artwork, and production details are finalized.",
    quickAnswer:
      "Start with tuck boxes when the brief is an individual folded outer carton. Start with corrugated ear-lock mailer boxes when the brief is a PR kit, subscription, ecommerce, launch, or other branded presentation program. Both are custom-made, and both use UPG's size-based planning MOQ rules.",
    first: {
      title: "Custom Tuck Boxes",
      label: "Folded outer carton",
      summary:
        "Straight tuck, reverse tuck, auto-lock, interlock, and seal-end structures for individual product and retail outer-carton briefs.",
      href: "/products/custom-tuck-boxes",
      quoteHref:
        "/get-a-quote?product=Tuck%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Comparison%20path%3A%20Tuck%20Boxes%20vs%20Mailer%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "The project starts with one product and its outer carton",
        "A tuck, auto-lock, interlock, or seal-end structure is the intended route",
        "The artwork needs to follow an approved folding-carton dieline",
      ],
    },
    second: {
      title: "Corrugated Mailer Boxes",
      label: "Ear-lock presentation mailer",
      summary:
        "Custom corrugated ear-lock mailers for PR, influencer, subscription, ecommerce, launch, and branded unboxing programs.",
      href: "/products/custom-mailer-boxes",
      quoteHref:
        "/get-a-quote?product=Mailer%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Comparison%20path%3A%20Tuck%20Boxes%20vs%20Mailer%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "The project is a branded unboxing or presentation program",
        "Several products or a custom insert may need to be planned together",
        "Exterior and interior presentation are part of the mailer brief",
      ],
    },
    rows: [
      {
        criterion: "Starting structure",
        first: "Folding carton from UPG's approved tuck-box styles",
        second: "Corrugated ear-lock mailer",
      },
      {
        criterion: "Common starting use",
        first: "Individual product or retail outer carton",
        second: "PR, subscription, ecommerce, launch, or presentation program",
      },
      {
        criterion: "Current material range",
        first: "SBS C1S or C2S, kraft, CCNB, chipboard, and corrugated options",
        second: "Corrugated board with project-specific print and insert options",
      },
      {
        criterion: "Planning MOQ",
        first: "1,000 at 5 in or less; 500 over 5 through 10 in; 250 over 10 in",
        second: "1,000 at 5 in or less; 500 over 5 through 10 in; 250 over 10 in",
      },
      {
        criterion: "Quote needs",
        first: "Finished size, style, board, print, finishes, quantity, artwork, destination",
        second: "Products or arrangement, finished size, print, insert, quantity, artwork, destination",
      },
    ],
    decisionQuestions: [
      {
        title: "Is this one outer carton or a complete presentation?",
        description:
          "The number of products and the intended opening experience usually identify the better starting family before visual details are discussed.",
      },
      {
        title: "Which structure should artwork follow?",
        description:
          "Do not place final artwork until the folding-carton or ear-lock mailer structure and dieline are approved.",
      },
      {
        title: "Does the brief require an insert?",
        description:
          "Share every product and the intended arrangement when an insert or multi-item presentation is part of the project.",
      },
    ],
    projectInputs: [
      "Product dimensions and product count",
      "Individual carton or presentation-program goal",
      "Preferred structure or reference packaging",
      "Quantity, artwork status, and delivery destination",
      "Print, finish, and insert requirements",
    ],
    scopeNote:
      "This comparison covers custom tuck boxes and corrugated ear-lock mailer boxes. Standard shipping cartons, master cartons, and RSC cases are outside UPG's product range.",
    faqs: [
      {
        question: "Are tuck boxes and mailer boxes the same?",
        answer:
          "No. UPG treats a tuck box as a folding-carton family and a mailer box as a corrugated ear-lock presentation structure. The correct route depends on the product, program, dimensions, and intended use.",
      },
      {
        question: "Do tuck boxes and mailer boxes have the same MOQ?",
        answer:
          "Yes. For both families, the planning MOQ is 1,000 units when every finished dimension is 5 inches or less, 500 units when the largest dimension is over 5 inches through exactly 10 inches, and 250 units when the largest dimension is over 10 inches.",
      },
      {
        question: "Can UPG recommend the structure if I am undecided?",
        answer:
          "Yes. Share the product dimensions, product count, intended use, quantity, artwork status, and destination. The comparison is a starting guide; UPG confirms the final structure after review.",
      },
    ],
    relatedSlugs: [
      "tuck-boxes-vs-magnetic-boxes",
      "mailer-boxes-vs-magnetic-boxes",
      "corrugated-mailer-boxes-vs-shipping-cartons",
    ],
    reviewedAt,
  },
  {
    slug: "magnetic-boxes-vs-collapsible-magnetic-boxes",
    name: "Magnetic Boxes vs Collapsible Magnetic Boxes",
    shortName: "Magnetic vs Collapsible",
    productSlugs: ["custom-magnetic-boxes", "custom-collapsible-magnetic-boxes"],
    metaDescription:
      "Compare standard and collapsible magnetic boxes by assembled form, flat packing, presentation, finishes, storage, freight, and MOQ.",
    keywords: [
      "magnetic boxes vs collapsible magnetic boxes",
      "collapsible magnetic box vs rigid magnetic box",
      "flat pack magnetic boxes",
      "custom magnetic box comparison",
    ],
    eyebrow: "Assembled or flat-pack magnetic box?",
    heroTitle: "Magnetic vs collapsible magnetic boxes: compare presentation and packing model.",
    heroDescription:
      "Both routes create premium magnetic presentation packaging. The main decision is whether the box remains assembled or folds flat before final assembly and use.",
    quickAnswer:
      "Choose a standard magnetic box when an assembled rigid presentation is the intended format. Choose a collapsible magnetic box when the same premium direction must fold flat to reduce freight and storage volume before assembly. Both UPG families have a 250-unit planning MOQ and support custom inserts and premium finishes.",
    first: {
      title: "Custom Magnetic Boxes",
      label: "Assembled rigid presentation",
      summary:
        "Premium rigid boxes with a magnetic closure, custom inserts, exterior or interior branding, and presentation-led finishes.",
      href: "/products/custom-magnetic-boxes",
      quoteHref:
        "/get-a-quote?product=Magnetic%20Boxes&style=Standard%20Magnetic%20Box&builder_note=Comparison%20path%3A%20Magnetic%20vs%20Collapsible%20Magnetic%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "An assembled rigid magnetic box is the intended presentation",
        "The project is planned around a fixed structure and insert layout",
        "The approved product arrangement does not require a folding box model",
      ],
    },
    second: {
      title: "Collapsible Magnetic Boxes",
      label: "Flat-pack magnetic presentation",
      summary:
        "Premium magnetic rigid boxes that fold flat for more efficient freight and storage before assembly.",
      href: "/products/custom-collapsible-magnetic-boxes",
      quoteHref:
        "/get-a-quote?product=Collapsible%20Magnetic%20Boxes&style=Collapsible%20%2F%20Flat-Pack%20Magnetic%20Box&builder_note=Comparison%20path%3A%20Magnetic%20vs%20Collapsible%20Magnetic%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "Flat packing before assembly is a project priority",
        "Freight and pre-assembly storage volume need to be considered",
        "The folding method can be included in structural review",
      ],
    },
    rows: [
      {
        criterion: "Form before use",
        first: "Assembled rigid magnetic presentation box",
        second: "Collapsible magnetic box supplied in a flat-pack format before assembly",
      },
      {
        criterion: "Primary planning difference",
        first: "Fixed assembled structure and insert layout",
        second: "Folding method, assembly, closure, and insert layout",
      },
      {
        criterion: "Freight and storage direction",
        first: "Reviewed around the assembled box specification",
        second: "Flat packing is intended to reduce freight and storage volume",
      },
      {
        criterion: "Finishes",
        first: "Foil, embossing, debossing, spot UV, soft-touch, and custom inserts",
        second: "Foil, embossing, debossing, spot UV, soft-touch, and custom inserts",
      },
      {
        criterion: "Planning MOQ",
        first: "From 250 units",
        second: "From 250 units",
      },
    ],
    decisionQuestions: [
      {
        title: "Should the structure remain assembled?",
        description:
          "Confirm whether a fixed assembled presentation is required or whether the box should fold flat before use.",
      },
      {
        title: "Who will assemble the collapsible format?",
        description:
          "The folding and assembly model should be part of the collapsible-box brief before the final structure is approved.",
      },
      {
        title: "What must the insert hold?",
        description:
          "List every product, its orientation, and the intended arrangement so the outer structure and insert are reviewed together.",
      },
    ],
    projectInputs: [
      "Complete product or gift-set dimensions",
      "Fixed assembled or collapsible flat-pack preference",
      "Product arrangement and insert requirements",
      "Quantity, artwork, finishes, and destination",
      "Storage, freight, and assembly priorities",
    ],
    scopeNote:
      "Both products are custom magnetic presentation boxes. Final dimensions, folding construction, closure, insert, print, finishes, and delivery terms require project review.",
    faqs: [
      {
        question: "What is the main difference between magnetic and collapsible magnetic boxes?",
        answer:
          "A standard magnetic box is an assembled rigid presentation format. A collapsible magnetic box folds flat before assembly, which can reduce freight and storage volume.",
      },
      {
        question: "Do both magnetic box formats have the same MOQ?",
        answer:
          "Yes. The planning MOQ for both standard magnetic boxes and collapsible magnetic boxes is 250 units, regardless of finished size.",
      },
      {
        question: "Can both formats include inserts and premium finishes?",
        answer:
          "Yes. Custom inserts plus foil, embossing, debossing, spot UV, and soft-touch options are available. Final suitability is confirmed for the approved structure and project.",
      },
    ],
    relatedSlugs: [
      "tuck-boxes-vs-magnetic-boxes",
      "mailer-boxes-vs-magnetic-boxes",
    ],
    reviewedAt,
  },
  {
    slug: "tuck-boxes-vs-magnetic-boxes",
    name: "Tuck Boxes vs Magnetic Boxes",
    shortName: "Tuck vs Magnetic",
    productSlugs: ["custom-tuck-boxes", "custom-magnetic-boxes"],
    metaDescription:
      "Compare custom tuck boxes and magnetic rigid boxes by structure, presentation, materials, finishes, inserts, MOQ, and quote inputs.",
    keywords: [
      "tuck boxes vs magnetic boxes",
      "folding carton vs rigid box",
      "tuck box or rigid box",
      "custom retail box vs gift box",
    ],
    eyebrow: "Retail carton or premium presentation box?",
    heroTitle: "Tuck boxes vs magnetic boxes: match the structure to the buying experience.",
    heroDescription:
      "Compare a folded individual outer carton with a premium rigid magnetic presentation box before structure, artwork, inserts, and finishes are approved.",
    quickAnswer:
      "Start with a tuck box when the brief is an individual folded product or retail outer carton. Start with a magnetic box when the brief is premium gifting, a launch collection, or presentation-led packaging that may include a custom insert. Their structures and MOQ models are different, so the decision should be made before artwork begins.",
    first: {
      title: "Custom Tuck Boxes",
      label: "Folded product carton",
      summary:
        "Custom folding-carton structures for individual product, retail, and outer-carton presentation.",
      href: "/products/custom-tuck-boxes",
      quoteHref:
        "/get-a-quote?product=Tuck%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Comparison%20path%3A%20Tuck%20Boxes%20vs%20Magnetic%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "The project needs an individual folded outer carton",
        "A tuck, auto-lock, interlock, or seal-end style is the intended route",
        "The structure should use an approved tuck-box material option",
      ],
    },
    second: {
      title: "Custom Magnetic Boxes",
      label: "Premium rigid presentation",
      summary:
        "Rigid magnetic presentation boxes for gifts, beauty, apparel, electronics, sets, and launch collections.",
      href: "/products/custom-magnetic-boxes",
      quoteHref:
        "/get-a-quote?product=Magnetic%20Boxes&style=Standard%20Magnetic%20Box&builder_note=Comparison%20path%3A%20Tuck%20Boxes%20vs%20Magnetic%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "Premium presentation is the primary packaging goal",
        "The project is a gift, set, or launch collection",
        "A magnetic closure and custom insert are part of the intended brief",
      ],
    },
    rows: [
      {
        criterion: "Structure family",
        first: "Folding carton",
        second: "Rigid magnetic presentation box",
      },
      {
        criterion: "Common starting use",
        first: "Individual product or retail outer carton",
        second: "Premium gift, set, or launch presentation",
      },
      {
        criterion: "Current materials",
        first: "SBS C1S or C2S, kraft, CCNB, chipboard, and corrugated options",
        second: "Rigid construction with printed or specialty wraps and insert options",
      },
      {
        criterion: "Planning MOQ",
        first: "1,000 at 5 in or less; 500 over 5 through 10 in; 250 over 10 in",
        second: "250 units for any approved finished size",
      },
      {
        criterion: "Artwork path",
        first: "Approved folding-carton dieline",
        second: "Approved wrapped-box and insert dielines",
      },
    ],
    decisionQuestions: [
      {
        title: "Is the package an individual carton or a presentation object?",
        description:
          "Start with the role the packaging plays in the customer experience rather than choosing only from a visual reference.",
      },
      {
        title: "Is a magnetic closure part of the requirement?",
        description:
          "If it is, the project belongs in the magnetic-box review rather than the tuck-box structure library.",
      },
      {
        title: "Does the product need a fitted presentation insert?",
        description:
          "Share the complete product arrangement before the box and insert dielines are finalized.",
      },
    ],
    projectInputs: [
      "Product dimensions, weight, and orientation",
      "Individual outer-carton or premium-presentation goal",
      "Preferred structure or reference packaging",
      "Insert, print, and finish requirements",
      "Quantity, artwork status, and destination",
    ],
    scopeNote:
      "This page compares two real UPG product families. It does not automatically approve a structure, insert, material, finish, or final price.",
    faqs: [
      {
        question: "When should I choose a tuck box instead of a magnetic box?",
        answer:
          "Choose the tuck-box path when the brief is a folded individual outer carton. Choose the magnetic-box path when the brief is premium rigid presentation with a magnetic closure, often around a gift, set, or launch collection.",
      },
      {
        question: "Which option has the lower MOQ?",
        answer:
          "Magnetic boxes have a 250-unit planning MOQ. Tuck-box MOQ depends on the largest finished dimension: 1,000, 500, or 250 units across UPG's approved size brackets.",
      },
      {
        question: "Can both formats use premium finishes?",
        answer:
          "Yes. The available finish direction includes foil, embossing, debossing, spot UV, and soft-touch where suitable for the approved structure.",
      },
    ],
    relatedSlugs: [
      "tuck-boxes-vs-mailer-boxes",
      "magnetic-boxes-vs-collapsible-magnetic-boxes",
      "mailer-boxes-vs-magnetic-boxes",
    ],
    reviewedAt,
  },
  {
    slug: "mailer-boxes-vs-magnetic-boxes",
    name: "Mailer Boxes vs Magnetic Boxes",
    shortName: "Mailer vs Magnetic",
    productSlugs: ["custom-mailer-boxes", "custom-magnetic-boxes"],
    metaDescription:
      "Compare corrugated ear-lock mailer boxes and magnetic rigid boxes by structure, unboxing, inserts, finishes, MOQ, and project inputs.",
    keywords: [
      "mailer boxes vs magnetic boxes",
      "corrugated mailer vs rigid box",
      "PR mailer vs magnetic gift box",
      "custom presentation box comparison",
    ],
    eyebrow: "Corrugated unboxing or rigid presentation?",
    heroTitle: "Mailer boxes vs magnetic boxes: compare two presentation-led structures.",
    heroDescription:
      "Both formats can support branded presentation. Compare the corrugated ear-lock mailer route with the rigid magnetic route before the product arrangement, insert, and artwork are finalized.",
    quickAnswer:
      "Choose a corrugated ear-lock mailer when the brief is a PR, influencer, subscription, ecommerce, or launch program. Choose a magnetic box when the brief is premium rigid gifting or product-set presentation. The product arrangement and intended opening experience should control the decision, not appearance alone.",
    first: {
      title: "Corrugated Mailer Boxes",
      label: "Ear-lock unboxing format",
      summary:
        "Custom corrugated mailers for PR, influencer, subscription, ecommerce, launch, and branded presentation programs.",
      href: "/products/custom-mailer-boxes",
      quoteHref:
        "/get-a-quote?product=Mailer%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Comparison%20path%3A%20Mailer%20Boxes%20vs%20Magnetic%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "The project is a PR, influencer, subscription, ecommerce, or launch program",
        "A corrugated ear-lock opening and branded unboxing are required",
        "Exterior, interior, and insert presentation need to be coordinated",
      ],
    },
    second: {
      title: "Custom Magnetic Boxes",
      label: "Rigid magnetic presentation",
      summary:
        "Premium rigid magnetic boxes for gifting, beauty, apparel, electronics, sets, and launch collections.",
      href: "/products/custom-magnetic-boxes",
      quoteHref:
        "/get-a-quote?product=Magnetic%20Boxes&style=Standard%20Magnetic%20Box&builder_note=Comparison%20path%3A%20Mailer%20Boxes%20vs%20Magnetic%20Boxes.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "A rigid premium presentation is the intended structure",
        "The magnetic closure is part of the opening experience",
        "A gift, collection, or product set needs a rigid insert-led presentation",
      ],
    },
    rows: [
      {
        criterion: "Structure family",
        first: "Corrugated ear-lock mailer",
        second: "Rigid magnetic presentation box",
      },
      {
        criterion: "Common starting use",
        first: "PR, influencer, subscription, ecommerce, launch, or branded mailer",
        second: "Premium gift, beauty, apparel, electronics, or launch collection",
      },
      {
        criterion: "Presentation options",
        first: "Exterior print, interior print, custom inserts, matte, gloss, foil, and spot UV",
        second: "Exterior, interior, and insert branding with foil, embossing, debossing, spot UV, and soft-touch",
      },
      {
        criterion: "Planning MOQ",
        first: "1,000 at 5 in or less; 500 over 5 through 10 in; 250 over 10 in",
        second: "From 250 units",
      },
      {
        criterion: "Scope boundary",
        first: "Ear-lock presentation mailers only; not standard shipping or master cartons",
        second: "Custom rigid magnetic presentation boxes",
      },
    ],
    decisionQuestions: [
      {
        title: "Is this a program mailer or a lasting presentation box?",
        description:
          "Describe the project goal, product count, and intended opening sequence before selecting the outer structure.",
      },
      {
        title: "Which material family is required?",
        description:
          "The corrugated and rigid magnetic routes use different structures and must follow different approved dielines.",
      },
      {
        title: "How should the products sit inside?",
        description:
          "Share every product and its intended orientation so the insert and outer structure can be planned together.",
      },
    ],
    projectInputs: [
      "Complete product list, dimensions, and arrangement",
      "PR, subscription, ecommerce, gifting, or presentation goal",
      "Corrugated ear-lock or rigid magnetic preference",
      "Insert, print, finish, and artwork requirements",
      "Quantity, target date, and destination",
    ],
    scopeNote:
      "The mailer route covers custom corrugated ear-lock boxes. Standard shipping cartons, master cartons, and RSC cases are not supplied.",
    faqs: [
      {
        question: "Is a magnetic box the same as a corrugated mailer box?",
        answer:
          "No. A magnetic box is a rigid presentation structure with a magnetic closure. UPG's mailer box is a corrugated ear-lock presentation format.",
      },
      {
        question: "Which format should I use for a PR kit?",
        answer:
          "A corrugated ear-lock mailer is the normal starting route in UPG's current PR and influencer application guides. A magnetic box can be reviewed when the project specifically requires a premium rigid magnetic presentation.",
      },
      {
        question: "Can both formats include a custom insert?",
        answer:
          "Yes. The insert is developed after the complete product arrangement and outer structure are reviewed.",
      },
    ],
    relatedSlugs: [
      "tuck-boxes-vs-mailer-boxes",
      "magnetic-boxes-vs-collapsible-magnetic-boxes",
      "corrugated-mailer-boxes-vs-shipping-cartons",
    ],
    reviewedAt,
  },
  {
    slug: "straight-tuck-vs-reverse-tuck",
    name: "Straight Tuck vs Reverse Tuck Boxes",
    shortName: "Straight vs Reverse Tuck",
    productSlugs: ["custom-tuck-boxes"],
    styleSlugs: ["straight-tuck-end-boxes", "reverse-tuck-end-boxes"],
    metaDescription:
      "Compare straight tuck end and reverse tuck end boxes by flap orientation, panel planning, materials, MOQ, artwork, and quote inputs.",
    keywords: [
      "straight tuck vs reverse tuck",
      "straight tuck end vs reverse tuck end",
      "STE vs RTE boxes",
      "tuck box flap direction",
    ],
    eyebrow: "Straight or reverse tuck end?",
    heroTitle: "Straight tuck vs reverse tuck: settle the flap direction before artwork.",
    heroDescription:
      "Both are available folding-carton structures within UPG's tuck-box family. Compare flap orientation and panel planning, then confirm the final dieline from the actual product and packing brief.",
    quickAnswer:
      "Straight tuck end and reverse tuck end boxes belong to the same custom tuck-box family. The decision centers on the intended flap orientation, opening direction, and panel layout. Dimensions, product fit, packing method, board, printing, finishes, and destination still require project review.",
    first: {
      title: "Straight Tuck End Boxes",
      label: "Straight tuck starting route",
      summary:
        "A current UPG folding-carton structure whose final flap orientation and panel layout are confirmed for the project.",
      href: "/packaging-styles/straight-tuck-end-boxes",
      quoteHref:
        "/get-a-quote?product=Tuck%20Boxes&style=Straight%20Tuck%20End&builder_note=Comparison%20path%3A%20Straight%20Tuck%20vs%20Reverse%20Tuck.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "Straight tuck end is the intended starting structure",
        "The opening direction and panel plan match the approved product brief",
        "Artwork will be placed only after the final straight-tuck dieline is approved",
      ],
    },
    second: {
      title: "Reverse Tuck End Boxes",
      label: "Reverse tuck starting route",
      summary:
        "A current UPG folding-carton structure with an alternate flap orientation and panel plan that require project confirmation.",
      href: "/packaging-styles/reverse-tuck-end-boxes",
      quoteHref:
        "/get-a-quote?product=Tuck%20Boxes&style=Reverse%20Tuck%20End&builder_note=Comparison%20path%3A%20Straight%20Tuck%20vs%20Reverse%20Tuck.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "Reverse tuck end is the intended starting structure",
        "The alternate flap orientation fits the approved product and panel brief",
        "Artwork will follow the approved reverse-tuck dieline",
      ],
    },
    rows: [
      {
        criterion: "Product family",
        first: "Custom tuck boxes",
        second: "Custom tuck boxes",
      },
      {
        criterion: "Decision point",
        first: "Straight tuck flap orientation and panel layout",
        second: "Reverse tuck flap orientation and panel layout",
      },
      {
        criterion: "Planning MOQ",
        first: "Size-based: 1,000, 500, or 250 units",
        second: "Size-based: 1,000, 500, or 250 units",
      },
      {
        criterion: "Materials and finishes",
        first: "Approved tuck-box materials, printing, and finish options",
        second: "Approved tuck-box materials, printing, and finish options",
      },
      {
        criterion: "Artwork control",
        first: "Place artwork on the approved straight-tuck dieline",
        second: "Place artwork on the approved reverse-tuck dieline",
      },
    ],
    decisionQuestions: [
      {
        title: "How should the carton open?",
        description:
          "Share the preferred opening direction and a reference box or dieline when one is already available.",
      },
      {
        title: "How will the product be packed?",
        description:
          "The product orientation and packing method should be reviewed before the flap and panel plan are approved.",
      },
      {
        title: "Is the artwork already tied to a dieline?",
        description:
          "Do not assume a straight and reverse tuck template are interchangeable. Final artwork must follow the approved structure.",
      },
    ],
    projectInputs: [
      "Finished product dimensions and orientation",
      "Preferred opening direction and packing method",
      "Existing box, photo, or dieline when available",
      "Board, print, finish, and artwork direction",
      "Quantity and destination",
    ],
    scopeNote:
      "This guide does not automatically choose one tuck direction. The final flap orientation, panel layout, dimensions, and dieline require project review.",
    faqs: [
      {
        question: "What is the difference between straight tuck and reverse tuck boxes?",
        answer:
          "Within UPG's current range, the comparison is based on the flap orientation, opening direction, and panel layout. The final structure is confirmed from the product and packing brief.",
      },
      {
        question: "Do straight and reverse tuck boxes use the same MOQ rules?",
        answer:
          "Yes. Both use UPG's tuck-box size brackets: 1,000 units at 5 inches or less, 500 units over 5 through exactly 10 inches, and 250 units over 10 inches.",
      },
      {
        question: "Can I reuse the same artwork dieline for both styles?",
        answer:
          "Do not assume that. Final artwork should be prepared on the approved dieline for the selected straight or reverse tuck structure.",
      },
    ],
    relatedSlugs: [
      "tuck-boxes-vs-mailer-boxes",
      "tuck-boxes-vs-magnetic-boxes",
    ],
    reviewedAt,
  },
  {
    slug: "stand-up-pouches-vs-flat-bottom-bags",
    name: "Stand-Up Pouches vs Flat Bottom Bags",
    shortName: "Stand-Up vs Flat Bottom",
    productSlugs: ["custom-mylar-bags"],
    styleSlugs: ["stand-up-pouches", "flat-bottom-bags"],
    metaDescription:
      "Compare stand-up pouches and flat bottom bags by filled shape, features, film review, artwork inputs, compatibility, and 500-unit MOQ.",
    keywords: [
      "stand up pouch vs flat bottom bag",
      "flat bottom pouch vs stand up pouch",
      "stand up or flat bottom pouch",
      "flexible packaging format comparison",
    ],
    eyebrow: "Stand-up or flat-bottom flexible format?",
    heroTitle: "Stand-up pouches vs flat bottom bags: compare the filled pack, not only the mockup.",
    heroDescription:
      "Both formats are available in UPG's custom Mylar bag range. The final choice depends on the target fill, finished dimensions, filled shape, required features, artwork, compatibility, and market requirements.",
    quickAnswer:
      "Choose the stand-up pouch path when that is the intended finished pouch format and compare it with a flat-bottom bag before the filled shape is finalized. Choose the flat-bottom path when that structure, its product arrangement, and its optional zipper or valve direction fit the brief. Both have a 500-unit planning MOQ and require film and product compatibility review.",
    first: {
      title: "Custom Stand-Up Pouches",
      label: "Stand-up pouch route",
      summary:
        "A finished flexible pouch format with project-specific dimensions, film, seals, zipper or window options, print, and finish.",
      href: "/packaging-styles/stand-up-pouches",
      quoteHref:
        "/get-a-quote?product=Mylar%20Bags&style=Stand-Up%20Pouch&builder_note=Comparison%20path%3A%20Stand-Up%20Pouches%20vs%20Flat-Bottom%20Bags.",
      planningMoq: "From 500 units",
      chooseWhen: [
        "Stand-up pouch is the intended finished format",
        "Target fill and filled dimensions are available for review",
        "Zipper, window, print, and finish requirements can be defined",
      ],
    },
    second: {
      title: "Custom Flat Bottom Bags",
      label: "Flat-bottom bag route",
      summary:
        "A finished flexible bag format reviewed around filled dimensions, film, seals, zipper or valve options, print, and finish.",
      href: "/packaging-styles/flat-bottom-bags",
      quoteHref:
        "/get-a-quote?product=Mylar%20Bags&style=Flat-Bottom%20Bag&builder_note=Comparison%20path%3A%20Stand-Up%20Pouches%20vs%20Flat-Bottom%20Bags.",
      planningMoq: "From 500 units",
      chooseWhen: [
        "Flat-bottom bag is the intended finished format",
        "The filled shape and product arrangement support that route",
        "Zipper, valve, window, print, and finish needs can be reviewed",
      ],
    },
    rows: [
      {
        criterion: "Product family",
        first: "Custom Mylar bags and pouches",
        second: "Custom Mylar bags and pouches",
      },
      {
        criterion: "Format decision",
        first: "Stand-up finished pouch",
        second: "Flat-bottom finished bag",
      },
      {
        criterion: "Features to review",
        first: "Seals, zipper or window, print, and finish",
        second: "Seals, zipper or valve, window, print, and finish",
      },
      {
        criterion: "Planning MOQ",
        first: "From 500 units",
        second: "From 500 units",
      },
      {
        criterion: "Required approval",
        first: "Film structure, product compatibility, and market requirements",
        second: "Film structure, product compatibility, and market requirements",
      },
    ],
    decisionQuestions: [
      {
        title: "What is the actual target fill?",
        description:
          "Share contents, fill volume or weight, and target filled dimensions so the format comparison starts from the real pack.",
      },
      {
        title: "Which features are required?",
        description:
          "Identify zipper, valve, window, print, finish, and opening requirements before artwork is prepared.",
      },
      {
        title: "What compatibility evidence is needed?",
        description:
          "Product compatibility, film structure, food-contact, barrier, and destination-market requirements must be confirmed where applicable.",
      },
    ],
    projectInputs: [
      "Product contents, intended market, and target fill",
      "Target filled dimensions or capacity",
      "Stand-up or flat-bottom preference",
      "Zipper, valve, window, print, and finish requirements",
      "Quantity, destination, and compatibility documentation needs",
    ],
    scopeNote:
      "This comparison is a format-selection guide, not a product-compatibility or food-contact approval. The final film, seals, dimensions, features, and market requirements must be reviewed.",
    faqs: [
      {
        question: "Should I choose a stand-up pouch or a flat bottom bag?",
        answer:
          "Start with the actual contents, target fill, filled dimensions, desired shape, features, artwork, and packing plan. UPG reviews both formats within the same Mylar bag family before the final specification is approved.",
      },
      {
        question: "Do both flexible formats have the same MOQ?",
        answer:
          "Yes. The UPG planning MOQ is 500 units for both stand-up pouches and flat bottom bags.",
      },
      {
        question: "Does this page confirm which film is compatible with my product?",
        answer:
          "No. Film structure, barrier, product compatibility, food-contact, and market-specific requirements must be confirmed for the project.",
      },
    ],
    relatedSlugs: [
      "rollstock-film-vs-finished-pouches",
      "tuck-boxes-vs-mailer-boxes",
    ],
    reviewedAt,
  },
  {
    slug: "rollstock-film-vs-finished-pouches",
    name: "Rollstock Film vs Finished Pouches",
    shortName: "Rollstock vs Finished Pouches",
    productSlugs: ["custom-mylar-bags"],
    styleSlugs: ["printed-rollstock-film"],
    metaDescription:
      "Compare custom printed rollstock film and finished pouches by supplied format, packing inputs, dimensions, features, compatibility, and MOQ.",
    keywords: [
      "rollstock vs premade pouches",
      "rollstock film vs finished pouches",
      "printed film on roll vs pouches",
      "roll stock packaging comparison",
    ],
    eyebrow: "Printed film on roll or finished pouch?",
    heroTitle: "Rollstock vs finished pouches: start with the format your packing plan needs.",
    heroDescription:
      "Both routes sit inside UPG's current flexible-packaging range, but rollstock and finished pouches require different project inputs and artwork templates.",
    quickAnswer:
      "Choose printed rollstock when the project needs printed film on roll and the packing operation can provide machine, web, repeat, and sealing information. Choose finished pouches when UPG should supply an approved stand-up, flat-bottom, three-side-seal, spout, child-resistant, or coffee-bag format. Both routes require compatibility review.",
    first: {
      title: "Custom Printed Rollstock Film",
      label: "Printed film on roll",
      summary:
        "Printed flexible film supplied on roll after machine, web, repeat, film, seal, and compatibility requirements are reviewed.",
      href: "/packaging-styles/printed-rollstock-film",
      quoteHref:
        "/get-a-quote?product=Mylar%20Bags&style=Rollstock%20Film&builder_note=Comparison%20path%3A%20Rollstock%20Film%20vs%20Finished%20Pouches.",
      planningMoq: "From 500 units",
      chooseWhen: [
        "The enquiry is for printed film on roll",
        "Packing-machine, web, repeat, and sealing information is available",
        "Artwork can be prepared on the approved rollstock template",
      ],
    },
    second: {
      title: "Finished Bags and Pouches",
      label: "Premade finished format",
      summary:
        "Finished stand-up, flat-bottom, three-side-seal, spout, child-resistant, or coffee-bag formats from UPG's current range.",
      href: "/products/custom-mylar-bags",
      quoteHref:
        "/get-a-quote?product=Mylar%20Bags&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Comparison%20path%3A%20Rollstock%20Film%20vs%20Finished%20Pouches.",
      planningMoq: "From 500 units",
      chooseWhen: [
        "The project needs a finished pouch rather than film on roll",
        "Finished dimensions, target fill, closure, and features can be reviewed",
        "Artwork can follow the approved finished-bag template",
      ],
    },
    rows: [
      {
        criterion: "Format supplied",
        first: "Custom printed flexible film on roll",
        second: "Finished bag or pouch",
      },
      {
        criterion: "Core project inputs",
        first: "Machine, web, repeat, sealing, film, and quantity information",
        second: "Contents, target fill, finished dimensions, closure, features, and quantity",
      },
      {
        criterion: "Artwork path",
        first: "Approved rollstock template with repeat and seal areas",
        second: "Approved finished pouch template with seal and feature areas",
      },
      {
        criterion: "Planning minimum",
        first: "From 500 units; final rollstock specification requires review",
        second: "500 finished units",
      },
      {
        criterion: "Required approval",
        first: "Machine fit, film, seals, product compatibility, and market requirements",
        second: "Film, seals, features, product compatibility, and market requirements",
      },
    ],
    decisionQuestions: [
      {
        title: "What does the packing operation expect to receive?",
        description:
          "Confirm whether the operation needs printed film on roll or finished pouches before dimensions and artwork are prepared.",
      },
      {
        title: "Are the machine details available?",
        description:
          "Rollstock cannot be specified from finished-pack dimensions alone. Share the equipment, web, repeat, and sealing information available.",
      },
      {
        title: "Which finished features are required?",
        description:
          "For finished pouches, identify the style, closure, zipper, valve, spout, window, print, and finish requirements that apply.",
      },
    ],
    projectInputs: [
      "Product contents and intended market",
      "Printed rollstock or finished-pouch requirement",
      "Machine, web, repeat, and sealing data when rollstock is required",
      "Finished dimensions, fill, and features when pouches are required",
      "Quantity, artwork, destination, and compatibility requirements",
    ],
    scopeNote:
      "Rollstock and finished pouches are not interchangeable quote inputs. Machine compatibility, film structure, seals, product compatibility, and market requirements must be confirmed.",
    faqs: [
      {
        question: "What is the difference between rollstock and finished pouches?",
        answer:
          "Rollstock is custom printed flexible film supplied on roll. A finished pouch is supplied as an approved bag format such as stand-up, flat-bottom, three-side-seal, spout, child-resistant, or coffee bag.",
      },
      {
        question: "Can UPG quote rollstock from finished package dimensions alone?",
        answer:
          "No. Share the packing-machine, web, repeat, and sealing information available from the operation, plus the product, film, print, quantity, and destination requirements.",
      },
      {
        question: "Does this comparison confirm product compatibility?",
        answer:
          "No. Film, seals, filling process, product compatibility, food-contact, barrier, and market requirements must be reviewed where applicable.",
      },
    ],
    relatedSlugs: [
      "stand-up-pouches-vs-flat-bottom-bags",
      "tuck-boxes-vs-mailer-boxes",
    ],
    reviewedAt,
  },
  {
    slug: "corrugated-mailer-boxes-vs-shipping-cartons",
    name: "Corrugated Mailer Boxes vs Shipping Cartons",
    shortName: "Mailer vs Shipping Carton",
    productSlugs: ["custom-mailer-boxes"],
    metaDescription:
      "Understand UPG's corrugated ear-lock mailer box offer and how it differs from standard shipping cartons, master cartons, and RSC cases.",
    keywords: [
      "corrugated mailer boxes vs shipping cartons",
      "mailer box vs shipping box",
      "ear lock mailer vs RSC carton",
      "custom corrugated boxes",
    ],
    eyebrow: "Important corrugated-box scope check",
    heroTitle: "Corrugated mailer boxes vs shipping cartons: choose the UPG route safely.",
    heroDescription:
      "UPG manufactures custom corrugated ear-lock mailer boxes for branded presentation. Standard shipping cartons, master cartons, and regular slotted cases are outside the current product range.",
    quickAnswer:
      "UPG uses corrugated-box search language because buyers use it when researching custom mailers. The product offered is a custom corrugated ear-lock mailer for PR, influencer, subscription, ecommerce, launch, and branded presentation programs. UPG does not supply standard shipping cartons, master cartons, or RSC cases.",
    first: {
      title: "Corrugated Ear-Lock Mailer Boxes",
      label: "Available from UPG",
      summary:
        "Custom branded corrugated mailers with exterior or interior print, insert options, and selected finishes for approved presentation programs.",
      href: "/products/custom-mailer-boxes",
      quoteHref:
        "/get-a-quote?product=Mailer%20Boxes&style=Ear-Lock%20Mailer%20Box&builder_note=Comparison%20path%3A%20Corrugated%20Mailer%20Boxes%20vs%20Shipping%20Cartons.%20Project%20is%20for%20an%20ear-lock%20presentation%20mailer.",
      planningMoq: "From 250 units",
      chooseWhen: [
        "The required product is a corrugated ear-lock mailer",
        "Branded presentation or unboxing is part of the brief",
        "The program is PR, influencer, subscription, ecommerce, launch, or gifting",
      ],
    },
    second: {
      title: "Shipping Cartons, Master Cartons, and RSC Cases",
      label: "Not supplied by UPG",
      summary:
        "Standard shipping-carton enquiries are outside UPG's current focused product range and should not enter the mailer quote path.",
      planningMoq: "Not applicable — outside UPG scope",
      chooseWhen: [
        "Do not use the UPG quote form when the required product is a standard shipping carton",
        "Do not describe a master-carton or RSC requirement as an ear-lock mailer",
        "Use this boundary to avoid an unsuitable enquiry",
      ],
      availabilityNote:
        "UPG does not manufacture or quote standard shipping cartons, master cartons, or RSC cases.",
    },
    rows: [
      {
        criterion: "UPG availability",
        first: "Available as a custom project",
        second: "Not supplied",
      },
      {
        criterion: "UPG product language",
        first: "Corrugated ear-lock mailer box",
        second: "Standard shipping carton, master carton, or RSC case",
      },
      {
        criterion: "Starting use",
        first: "Branded presentation, unboxing, PR, subscription, ecommerce, or launch program",
        second: "Outside the current UPG offer",
      },
      {
        criterion: "Quote route",
        first: "Use the Mailer Boxes project path",
        second: "Do not submit through UPG",
      },
      {
        criterion: "Planning MOQ",
        first: "1,000 at 5 in or less; 500 over 5 through 10 in; 250 over 10 in",
        second: "Not applicable",
      },
    ],
    decisionQuestions: [
      {
        title: "Is the structure specifically an ear-lock mailer?",
        description:
          "If not, do not assume the broad phrase corrugated box means the project belongs in UPG's product range.",
      },
      {
        title: "Is branded presentation part of the brief?",
        description:
          "UPG's corrugated offer is centered on custom presentation mailers rather than standard outer shipping cases.",
      },
      {
        title: "Does the reference show a standard shipping case?",
        description:
          "Mark the enquiry outside scope when the requirement is a shipping carton, master carton, or RSC case.",
      },
    ],
    projectInputs: [
      "Confirmation that the structure is an ear-lock presentation mailer",
      "Products, dimensions, count, and intended arrangement",
      "PR, subscription, ecommerce, launch, or presentation goal",
      "Exterior, interior, insert, print, and finish requirements",
      "Quantity, artwork status, and destination",
    ],
    scopeNote:
      "This page intentionally filters unsuitable corrugated-carton enquiries. Only the custom ear-lock mailer route is available from UPG.",
    faqs: [
      {
        question: "Does UPG manufacture corrugated boxes?",
        answer:
          "UPG manufactures custom corrugated ear-lock mailer boxes and can review approved corrugated tuck-box applications. UPG does not supply standard shipping cartons, master cartons, or RSC cases.",
      },
      {
        question: "Can I request a master carton from UPG?",
        answer:
          "No. Master cartons and standard shipping cartons are outside UPG's current product range.",
      },
      {
        question: "Which corrugated product can I request?",
        answer:
          "Use the Mailer Boxes route for a custom corrugated ear-lock presentation mailer for PR, influencer, subscription, ecommerce, launch, gifting, or branded unboxing programs.",
      },
    ],
    relatedSlugs: [
      "tuck-boxes-vs-mailer-boxes",
      "mailer-boxes-vs-magnetic-boxes",
    ],
    reviewedAt,
  },
];

export function getComparisonGuide(slug: string) {
  return comparisonGuides.find((guide) => guide.slug === slug);
}

export function getRelatedComparisonGuides(guide: ComparisonGuide) {
  return guide.relatedSlugs
    .map((slug) => getComparisonGuide(slug))
    .filter((item) => item !== undefined);
}

export function getComparisonGuidesByProduct(productSlug: string) {
  return comparisonGuides.filter((guide) =>
    guide.productSlugs.includes(productSlug)
  );
}

export function getComparisonGuidesByStyle(styleSlug: string) {
  return comparisonGuides.filter((guide) =>
    guide.styleSlugs?.includes(styleSlug)
  );
}

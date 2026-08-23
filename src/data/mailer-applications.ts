export interface MailerApplication {
  slug: string;
  title: string;
  shortName: string;
  projectName: string;
  heroTitle: string;
  heroDescription: string;
  metaDescription: string;
  keywords: string[];
  selectionNote: string;
  quoteStyle?: string;
  decisionGuide?: {
    eyebrow: string;
    title: string;
    intro: string;
    faqQuestion: string;
    options: Array<{
      title: string;
      description: string;
      href: string;
      linkLabel: string;
    }>;
  };
  image: { src: string; alt: string };
  quickAnswer: string;
  bestFor: string[];
  planningPriorities: Array<{ title: string; description: string }>;
  presentationOptions: string[];
  projectInputs: string[];
  faqs: Array<{ question: string; answer: string }>;
  scopeCallout?: { title: string; description: string };
  relatedCosmeticsGuide?: { label: string; href: string };
  reviewedAt: string;
}

export const mailerApplications: MailerApplication[] = [
  {
    slug: "custom-pr-boxes",
    title: "Custom PR Boxes",
    shortName: "PR Boxes",
    projectName: "PR box",
    heroTitle: "Custom PR boxes for launches, media kits, and brand presentation.",
    heroDescription:
      "Plan an ear-lock corrugated PR box around the products, message, and opening sequence. UPG manufactures custom PR boxes for brands worldwide with exterior and interior print, custom inserts, and selected finish options.",
    metaDescription:
      "Custom printed corrugated PR boxes and ear-lock presentation mailers for launches, media kits and branded gifting. Worldwide delivery.",
    keywords: [
      "custom PR boxes",
      "custom printed PR boxes",
      "branded PR boxes",
      "PR box packaging",
      "custom media kit boxes",
      "product launch boxes",
      "corrugated PR mailer boxes",
    ],
    selectionNote:
      "Choose this route for launches, press, editorial, media kits, events, or broad branded gifting and presentation.",
    quoteStyle: "PR / Presentation Mailer",
    decisionGuide: {
      eyebrow: "PR or influencer mailer?",
      title: "Choose the program before the insert is finalized.",
      intro:
        "Both routes use UPG's custom ear-lock corrugated mailer offer. A PR box can serve press, editorial, events, media kits, or broad launch presentation, while an influencer mailer starts from a creator-seeding campaign.",
      faqQuestion: "Should I choose a PR box or an influencer mailer?",
      options: [
        {
          title: "PR box",
          description:
            "Use this path for a launch, media kit, press or editorial presentation, event, or branded gifting program.",
          href: "/get-a-quote?product=Mailer%20Boxes&style=PR%20%2F%20Presentation%20Mailer&builder_note=Mailer%20application%3A%20PR%20Boxes.",
          linkLabel: "Start a PR box enquiry",
        },
        {
          title: "Influencer mailer",
          description:
            "Review the influencer guide when creator seeding, campaign drops, or social outreach define the program.",
          href: "/applications/influencer-kits",
          linkLabel: "Compare influencer mailers",
        },
        {
          title: "Full mailer range",
          description:
            "Compare PR, influencer, subscription, and ecommerce applications inside the same ear-lock corrugated mailer family.",
          href: "/products/custom-mailer-boxes",
          linkLabel: "Compare all mailer paths",
        },
      ],
    },
    image: {
      src: "/images/generated/mailer-boxes/mailer-boxes-inside-print-v1.png",
      alt: "Representative custom PR mailer box concept with interior printing",
    },
    quickAnswer:
      "A custom PR box is a branded ear-lock corrugated mailer planned for product launches, press outreach, media kits, gifting, or event presentation. The box can combine exterior and interior print with a custom insert after the product arrangement and dimensions are reviewed.",
    bestFor: [
      "Product launches and press outreach",
      "Media kits and editorial presentations",
      "Branded gifting and event kits",
      "Multi-product launch collections",
    ],
    planningPriorities: [
      {
        title: "Build around the launch story",
        description:
          "Plan the outside, inside, and product reveal as one presentation rather than treating each surface separately.",
      },
      {
        title: "Confirm the product arrangement",
        description:
          "Share the number of products, their dimensions, and the intended layout before the insert and mailer structure are finalized.",
      },
      {
        title: "Prepare one clear brief",
        description:
          "Include the launch date, quantity, delivery country, visual references, and any existing artwork or dieline information.",
      },
    ],
    presentationOptions: [
      "Exterior-only printing or coordinated exterior and interior printing",
      "Custom inserts planned around the approved product arrangement",
      "Matte or gloss presentation",
      "Foil stamping or spot UV where suitable for the approved structure",
    ],
    projectInputs: [
      "Product names, quantities, and dimensions",
      "Preferred product arrangement or opening sequence",
      "Required box quantity",
      "Delivery country and target date",
      "Brand artwork, campaign references, or existing dielines",
    ],
    faqs: [
      {
        question: "What is a custom PR box?",
        answer:
          "It is a branded ear-lock corrugated mailer created for a launch, press presentation, media kit, gifting program, or similar brand moment. The structure, printing, and insert are planned around the specific project.",
      },
      {
        question: "Can a PR box include interior printing and an insert?",
        answer:
          "Yes. UPG can plan exterior and interior printing plus a custom insert for the approved product arrangement and box structure.",
      },
      {
        question: "What is the minimum order for custom PR boxes?",
        answer:
          "The planning MOQ is 1,000 units when every finished dimension is 5 inches or less, 500 units when the largest dimension is over 5 inches through exactly 10 inches, and 250 units when the largest dimension is over 10 inches.",
      },
      {
        question: "What should I send for a PR box quote?",
        answer:
          "Send the product dimensions and count, intended arrangement, box quantity, delivery country, target date, and available artwork or visual references. Final specifications and timing are confirmed after review.",
      },
    ],
    relatedCosmeticsGuide: {
      label: "Explore the beauty-specific PR box guide",
      href: "/cosmetics/pr-boxes",
    },
    reviewedAt: "2026-08-23",
  },
  {
    slug: "influencer-kits",
    title: "Custom Influencer Mailer Boxes & PR Kit Packaging",
    shortName: "Influencer Mailer Boxes",
    projectName: "influencer mailer box",
    heroTitle: "Custom influencer mailer boxes and PR kits for creator seeding.",
    heroDescription:
      "Create branded influencer mailer boxes and PR kit packaging for creator seeding, campaign drops, and product launches. UPG manufactures each ear-lock corrugated mailer around the approved product arrangement, artwork, quantity, and destination.",
    metaDescription:
      "Custom influencer mailer boxes and PR kit packaging for creator seeding and launch drops. Ear-lock mailers and inserts—not campaign fulfillment.",
    keywords: [
      "custom influencer mailer boxes",
      "influencer mailer boxes",
      "custom influencer boxes",
      "influencer PR kits",
      "creator seeding boxes",
      "custom PR boxes for influencers",
      "branded influencer packaging",
    ],
    selectionNote:
      "Choose this route when creator seeding, campaign drops, or branded social outreach define the program.",
    image: {
      src: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
      alt: "Representative custom influencer kit concept with a fitted product insert",
    },
    quickAnswer:
      "An influencer mailer box is an ear-lock corrugated presentation box made for creator seeding, campaign launches, or branded social outreach. It can organize one or several products with coordinated print and a custom insert after the product arrangement is reviewed.",
    bestFor: [
      "Creator seeding and influencer outreach",
      "Campaign drops and launch announcements",
      "Multi-item product introductions",
      "Branded social content presentations",
    ],
    planningPriorities: [
      {
        title: "Design for the complete kit",
        description:
          "List every product and presentation item so the mailer and insert can be planned around the complete arrangement.",
      },
      {
        title: "Keep the message easy to follow",
        description:
          "Coordinate the outer branding, inner message, and product order around the campaign story and creator experience.",
      },
      {
        title: "Separate packaging from logistics",
        description:
          "UPG manufactures the ear-lock presentation mailer. Delivery and transport requirements are reviewed for the individual project.",
      },
    ],
    presentationOptions: [
      "Exterior and interior branding for a coordinated reveal",
      "Custom inserts for the approved product mix",
      "Matte or gloss presentation",
      "Foil stamping or spot UV where suitable for the approved structure",
    ],
    projectInputs: [
      "Complete kit contents and product dimensions",
      "Preferred product order and insert layout",
      "Campaign quantity and target date",
      "Delivery country",
      "Campaign artwork, messaging, and visual references",
    ],
    faqs: [
      {
        question: "What is an influencer mailer box?",
        answer:
          "It is a branded ear-lock corrugated presentation box created for sending products to creators as part of a seeding campaign, launch, or social outreach project. The structure, print, and insert are developed around the approved kit contents.",
      },
      {
        question: "What is the difference between an influencer mailer box and a general PR box?",
        answer:
          "An influencer mailer box is planned specifically for creator seeding or social campaign outreach, often around a defined product mix and content moment. A general PR box may be used more broadly for press, editorial, event, or media presentations.",
      },
      {
        question: "Can an influencer kit hold several products?",
        answer:
          "Yes. Share the dimensions and intended arrangement for every product so UPG can review the mailer structure and custom insert plan.",
      },
      {
        question: "What is the minimum order for influencer boxes?",
        answer:
          "The planning MOQ is 1,000 units when every finished dimension is 5 inches or less, 500 units when the largest dimension is over 5 inches through exactly 10 inches, and 250 units when the largest dimension is over 10 inches.",
      },
      {
        question: "Does UPG provide campaign fulfillment or creator mailing?",
        answer:
          "This page covers custom packaging manufacturing. Any delivery, transport, or additional project requirements must be reviewed and confirmed separately in the written project scope.",
      },
    ],
    scopeCallout: {
      title: "Packaging manufacturing, not campaign fulfillment.",
      description:
        "UPG manufactures the custom ear-lock mailer box and approved insert. Product sourcing, kit assembly, creator-list management, warehousing, and individual creator fulfillment are not included unless separately reviewed and confirmed in writing.",
    },
    relatedCosmeticsGuide: {
      label: "Explore the beauty-specific PR box guide",
      href: "/cosmetics/pr-boxes",
    },
    reviewedAt: "2026-08-23",
  },
  {
    slug: "custom-subscription-boxes",
    title: "Custom Subscription Boxes",
    shortName: "Subscription Boxes",
    projectName: "subscription box",
    heroTitle: "Custom subscription boxes for repeat branded programs.",
    heroDescription:
      "Plan a custom ear-lock corrugated subscription box for recurring assortments, membership programs, and repeat product deliveries. UPG manufactures the approved structure with exterior or interior branding and custom insert options.",
    metaDescription:
      "Custom printed corrugated subscription boxes and ear-lock mailers for recurring assortments and branded programs. Worldwide delivery.",
    keywords: [
      "custom subscription boxes",
      "custom printed subscription boxes",
      "subscription mailer boxes",
      "branded subscription box packaging",
      "corrugated subscription mailer boxes",
      "custom monthly subscription boxes",
      "subscription packaging manufacturer",
    ],
    selectionNote:
      "Choose this route for recurring assortments, memberships, discovery programs, or repeat branded deliveries.",
    quoteStyle: "Subscription Mailer",
    decisionGuide: {
      eyebrow: "Subscription or ecommerce mailer?",
      title: "Separate the recurring program from a general online-order brief.",
      intro:
        "Both routes use UPG's custom ear-lock corrugated mailer offer. A subscription mailer starts from a recurring assortment or membership program, while an ecommerce mailer starts from branded online-order presentation and unboxing.",
      faqQuestion: "Should I choose a subscription box or an ecommerce mailer?",
      options: [
        {
          title: "Subscription mailer",
          description:
            "Use this path for a recurring assortment, membership, discovery program, or repeat branded delivery cycle.",
          href: "/get-a-quote?product=Mailer%20Boxes&style=Subscription%20Mailer&builder_note=Mailer%20application%3A%20Subscription%20Boxes.",
          linkLabel: "Start a subscription enquiry",
        },
        {
          title: "Ecommerce mailer",
          description:
            "Review the ecommerce guide when branded presentation for online orders is the main project brief.",
          href: "/applications/branded-ecommerce-mailer-boxes",
          linkLabel: "Compare ecommerce mailers",
        },
        {
          title: "Full mailer range",
          description:
            "Compare PR, influencer, subscription, and ecommerce applications without leaving the ear-lock mailer family.",
          href: "/products/custom-mailer-boxes",
          linkLabel: "Compare all mailer paths",
        },
      ],
    },
    image: {
      src: "/images/generated/mailer-boxes/mailer-boxes-sizes-v1.png",
      alt: "Representative custom subscription mailer box concepts in multiple sizes",
    },
    quickAnswer:
      "A custom subscription box is a branded ear-lock corrugated mailer planned for a recurring program. The structure should reflect the typical product range, intended presentation, quantity, and delivery requirements, with any changing assortment reviewed before final specifications are approved.",
    bestFor: [
      "Recurring product assortments",
      "Membership and discovery programs",
      "Seasonal subscription collections",
      "Repeat branded unboxing programs",
    ],
    planningPriorities: [
      {
        title: "Define the typical assortment",
        description:
          "Use representative product dimensions and the expected item count to establish the starting structure and insert plan.",
      },
      {
        title: "Plan for repeatable presentation",
        description:
          "Keep artwork zones and product organization clear enough to support the approved recurring program.",
      },
      {
        title: "Review meaningful changes",
        description:
          "A changing product mix can affect fit and presentation, so new assortments should be checked against the approved structure.",
      },
    ],
    presentationOptions: [
      "Exterior-only printing or exterior and interior printing",
      "Custom inserts for an approved recurring arrangement",
      "Matte or gloss presentation",
      "Foil stamping or spot UV where suitable for the approved structure",
    ],
    projectInputs: [
      "Typical product count and dimensions",
      "Expected assortment changes",
      "Quantity per production run",
      "Delivery country and target schedule",
      "Brand artwork and unboxing references",
    ],
    faqs: [
      {
        question: "What style of subscription box does UPG manufacture?",
        answer:
          "UPG manufactures custom ear-lock corrugated mailer boxes for subscription and repeat branded programs. Regular slotted shipping cartons, master cartons, and RSC cases are outside this offer.",
      },
      {
        question: "Can the inside of a subscription box be printed?",
        answer:
          "Yes. Exterior-only printing or coordinated exterior and interior printing can be planned for the approved mailer structure.",
      },
      {
        question: "What is the minimum order for custom subscription boxes?",
        answer:
          "The planning MOQ is 1,000 units when every finished dimension is 5 inches or less, 500 units when the largest dimension is over 5 inches through exactly 10 inches, and 250 units when the largest dimension is over 10 inches.",
      },
      {
        question: "Can one box work for changing monthly products?",
        answer:
          "The starting structure can be planned around a representative assortment, but changes in product size, count, or arrangement should be reviewed before the approved specification is reused.",
      },
    ],
    relatedCosmeticsGuide: {
      label: "Explore the beauty-specific subscription guide",
      href: "/cosmetics/cosmetic-subscription-boxes",
    },
    reviewedAt: "2026-08-23",
  },
  {
    slug: "branded-ecommerce-mailer-boxes",
    title: "Branded Ecommerce Mailer Boxes",
    shortName: "Ecommerce Mailers",
    projectName: "ecommerce mailer",
    heroTitle: "Branded ecommerce mailer boxes built around the unboxing experience.",
    heroDescription:
      "Create a custom ear-lock corrugated mailer for branded ecommerce presentation and product unboxing. UPG manufactures the approved mailer with exterior or interior print, custom inserts, and selected finish options for brands worldwide.",
    metaDescription:
      "Custom printed ecommerce mailer boxes with interior print and insert options. Ear-lock corrugated presentation packaging with worldwide delivery.",
    keywords: [
      "branded ecommerce mailer boxes",
      "custom ecommerce mailer boxes",
      "custom ecommerce packaging boxes",
      "ecommerce unboxing packaging",
      "printed ecommerce mailer boxes",
    ],
    selectionNote:
      "Choose this route when branded online-order presentation and the unboxing experience define the project.",
    quoteStyle: "Ear-Lock Mailer Box",
    decisionGuide: {
      eyebrow: "Ecommerce or subscription mailer?",
      title: "Choose the buying program before the presentation is planned.",
      intro:
        "Both routes use UPG's custom ear-lock corrugated mailer offer. An ecommerce mailer starts from branded online-order presentation, while a subscription mailer starts from a recurring assortment or membership program.",
      faqQuestion: "Should I choose an ecommerce mailer or a subscription box?",
      options: [
        {
          title: "Ecommerce mailer",
          description:
            "Use this path when branded presentation and unboxing for online orders are the main project goals.",
          href: "/get-a-quote?product=Mailer%20Boxes&style=Ear-Lock%20Mailer%20Box&builder_note=Mailer%20application%3A%20Ecommerce%20Mailers.",
          linkLabel: "Start an ecommerce enquiry",
        },
        {
          title: "Subscription mailer",
          description:
            "Review the subscription guide when a recurring assortment, membership, or repeat program defines the brief.",
          href: "/applications/custom-subscription-boxes",
          linkLabel: "Compare subscription mailers",
        },
        {
          title: "Full mailer range",
          description:
            "Compare PR, influencer, subscription, and ecommerce applications inside the approved ear-lock mailer offer.",
          href: "/products/custom-mailer-boxes",
          linkLabel: "Compare all mailer paths",
        },
      ],
    },
    image: {
      src: "/images/generated/mailer-boxes/mailer-boxes-hero-v1.png",
      alt: "Representative branded ecommerce ear-lock mailer box concept",
    },
    quickAnswer:
      "A branded ecommerce mailer is an ear-lock corrugated presentation box developed around the product, artwork, and intended unboxing experience. UPG's offer is custom mailer packaging—not regular shipping cartons, master cartons, or RSC cases—and delivery requirements are reviewed per project.",
    bestFor: [
      "Branded direct-to-customer presentation",
      "Product launches sold through ecommerce",
      "Giftable online orders",
      "Curated multi-product orders",
    ],
    planningPriorities: [
      {
        title: "Start with the product",
        description:
          "Share the dimensions, quantity per box, and intended arrangement so the ear-lock mailer can be developed around the actual packout.",
      },
      {
        title: "Plan the unboxing surfaces",
        description:
          "Decide how exterior branding, interior messaging, and any insert should work together before final artwork begins.",
      },
      {
        title: "Confirm the project boundary",
        description:
          "Transport and delivery requirements are reviewed for the specific project. UPG does not offer standard RSC, master, or regular shipping cartons.",
      },
    ],
    presentationOptions: [
      "Exterior print or coordinated exterior and interior print",
      "Custom inserts for the approved product arrangement",
      "Matte or gloss presentation",
      "Foil stamping or spot UV where suitable for the approved structure",
    ],
    projectInputs: [
      "Product dimensions and quantity per mailer",
      "Preferred product arrangement or insert need",
      "Required packaging quantity",
      "Delivery country and intended use",
      "Brand artwork and unboxing references",
    ],
    faqs: [
      {
        question: "What kind of ecommerce boxes does UPG manufacture?",
        answer:
          "UPG manufactures custom corrugated ear-lock mailer boxes for branded ecommerce presentation and unboxing. Regular slotted shipping cartons, master cartons, and RSC cases are not part of the product range.",
      },
      {
        question: "Can an ecommerce mailer have printing on the inside?",
        answer:
          "Yes. The approved ear-lock mailer can use exterior-only printing or coordinated exterior and interior printing.",
      },
      {
        question: "What is the minimum order for branded ecommerce mailers?",
        answer:
          "The planning MOQ is 1,000 units when every finished dimension is 5 inches or less, 500 units when the largest dimension is over 5 inches through exactly 10 inches, and 250 units when the largest dimension is over 10 inches.",
      },
      {
        question: "Are these regular shipping cartons?",
        answer:
          "No. The UPG offer is a custom ear-lock corrugated mailer for branded presentation. Standard shipping cartons, master cartons, and RSC cases are outside the product range.",
      },
    ],
    reviewedAt: "2026-08-23",
  },
];

export function getMailerApplicationBySlug(slug: string) {
  return mailerApplications.find((application) => application.slug === slug);
}

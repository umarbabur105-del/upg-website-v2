export interface MailerApplication {
  slug: string;
  title: string;
  shortName: string;
  projectName: string;
  heroTitle: string;
  heroDescription: string;
  metaDescription: string;
  keywords: string[];
  image: { src: string; alt: string };
  quickAnswer: string;
  bestFor: string[];
  planningPriorities: Array<{ title: string; description: string }>;
  presentationOptions: string[];
  projectInputs: string[];
  faqs: Array<{ question: string; answer: string }>;
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
      "Custom corrugated PR boxes for product launches, media kits, gifting, and presentation. Worldwide manufacturing with size-based minimum orders.",
    keywords: [
      "custom PR boxes",
      "PR box packaging",
      "custom media kit boxes",
      "product launch boxes",
      "corrugated PR mailer boxes",
    ],
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
    reviewedAt: "2026-08-06",
  },
  {
    slug: "influencer-kits",
    title: "Custom Influencer Boxes and Kits",
    shortName: "Influencer Kits",
    projectName: "influencer kit",
    heroTitle: "Custom influencer kits for creator seeding and social launches.",
    heroDescription:
      "Create a branded ear-lock corrugated mailer for creator seeding, campaign drops, and multi-product influencer kits. UPG manufactures each project around the approved product arrangement, artwork, quantity, and destination.",
    metaDescription:
      "Custom influencer boxes and creator PR kits for seeding campaigns, launch drops, and branded product presentation, manufactured for brands worldwide.",
    keywords: [
      "custom influencer boxes",
      "influencer PR kits",
      "creator seeding boxes",
      "custom PR boxes for influencers",
      "branded influencer packaging",
    ],
    image: {
      src: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
      alt: "Representative custom influencer kit concept with a fitted product insert",
    },
    quickAnswer:
      "A custom influencer kit is an ear-lock corrugated presentation mailer designed for creator seeding, campaign launches, or branded social outreach. It can organize one or several products with coordinated print and a custom insert after the packout is reviewed.",
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
        question: "What is the difference between an influencer kit and a general PR box?",
        answer:
          "An influencer kit is planned specifically for creator seeding or social campaign outreach, often around a defined product mix and content moment. A general PR box may be used more broadly for press, editorial, event, or media presentations.",
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
    relatedCosmeticsGuide: {
      label: "Explore the beauty-specific PR box guide",
      href: "/cosmetics/pr-boxes",
    },
    reviewedAt: "2026-08-06",
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
      "Custom corrugated subscription boxes for recurring assortments and branded programs. Worldwide manufacturing with size-based minimum orders.",
    keywords: [
      "custom subscription boxes",
      "branded subscription box packaging",
      "corrugated subscription mailer boxes",
      "custom monthly subscription boxes",
      "subscription packaging manufacturer",
    ],
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
    reviewedAt: "2026-08-06",
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
      "Branded ecommerce mailer boxes with custom print and insert options. Ear-lock corrugated presentation packaging manufactured for brands worldwide.",
    keywords: [
      "branded ecommerce mailer boxes",
      "custom ecommerce packaging boxes",
      "custom corrugated mailer boxes",
      "ecommerce unboxing packaging",
      "printed ecommerce mailer boxes",
    ],
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
    reviewedAt: "2026-08-06",
  },
];

export function getMailerApplicationBySlug(slug: string) {
  return mailerApplications.find((application) => application.slug === slug);
}

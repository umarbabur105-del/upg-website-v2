export type OrganicIntentStatus = "Available" | "Related route" | "Outside current offer";

export interface OrganicIntentOption {
  label: string;
  title: string;
  description: string;
  status: OrganicIntentStatus;
  href?: string;
  linkLabel?: string;
}

export interface OrganicIntentRoute {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  visual?: {
    src: string;
    alt: string;
    caption: string;
  };
  options: OrganicIntentOption[];
  reviewedAt: string;
}

const reviewedAt = "2026-08-23";

export const organicIntentRoutes: OrganicIntentRoute[] = [
  {
    path: "/packaging-styles/seal-end-boxes",
    eyebrow: "Seal-end carton buying routes",
    title: "Choose seal-end tuck packaging or compare another carton structure.",
    intro:
      "A seal-end box is a folding carton with an end designed to be glued or sealed during packing. Use this route when that closing method fits the product and production plan.",
    visual: {
      src: "/images/generated/tuck-boxes/tuck-boxes-seal-end-v1.png",
      alt: "Custom printed seal-end folding carton shown as a finished packaging format",
      caption:
        "Seal-end structure shown as a planning reference; final panels and closure are confirmed from the product and packing method.",
    },
    options: [
      {
        label: "Direct seal-end project",
        title: "Custom seal-end folding carton",
        description:
          "Start here for seal-end tuck packaging and share the product dimensions, filling and sealing method, quantity, board, print, finish, and destination.",
        status: "Available",
        href: "/get-a-quote?product=Tuck%20Boxes&style=Seal-End%20Box&builder_note=Buyer%20intent%3A%20custom%20seal-end%20folding%20carton.",
        linkLabel: "Start a seal-end brief",
      },
      {
        label: "Closure still undecided",
        title: "Seal end or straight tuck end?",
        description:
          "Compare a glued or sealed closure with a straight tuck opening before the structure and artwork dieline are approved.",
        status: "Related route",
        href: "/packaging-styles/straight-tuck-end-boxes",
        linkLabel: "Compare straight tuck end",
      },
      {
        label: "Food and snack use",
        title: "Cartons for snack and confectionery products",
        description:
          "Review the industry route when a seal-end or other folding-carton structure will hold a finished snack or confectionery product.",
        status: "Related route",
        href: "/industries/custom-snack-packaging",
        linkLabel: "Review snack packaging",
      },
      {
        label: "Transit case",
        title: "Regular shipping carton, master carton, or RSC case",
        description:
          "These standard transit cartons are outside UPG's current offer. Custom printed seal-end folding cartons remain available for reviewed projects.",
        status: "Outside current offer",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    path: "/packaging-styles/straight-tuck-end-boxes",
    eyebrow: "Straight tuck end buying routes",
    title: "Choose a straight tuck end box or compare the flap direction.",
    intro:
      "A straight tuck end box is a folding carton whose top and bottom tuck flaps close in the same direction. Use the style as a starting point, then confirm the final panels from the product and packing brief.",
    visual: {
      src: "/images/generated/tuck-boxes/tuck-boxes-straight-reverse-v1.png",
      alt: "Straight tuck end and reverse tuck end folding cartons displayed for comparison",
      caption:
        "Straight and reverse tuck structures share a carton family but use different flap orientations and panel layouts.",
    },
    options: [
      {
        label: "Direct straight-tuck project",
        title: "Custom straight tuck end box",
        description:
          "Start here when straight tuck end is the intended structure and share dimensions, filling method, quantity, board, print, finish, and destination.",
        status: "Available",
        href: "/get-a-quote?product=Tuck%20Boxes&style=Straight%20Tuck%20End&builder_note=Buyer%20intent%3A%20custom%20straight-tuck-end%20box.",
        linkLabel: "Start a straight-tuck brief",
      },
      {
        label: "Flap direction decision",
        title: "Straight tuck end or reverse tuck end?",
        description:
          "Compare the alternate flap orientation and panel layout before artwork is placed on an approved production dieline.",
        status: "Related route",
        href: "/packaging-styles/reverse-tuck-end-boxes",
        linkLabel: "Compare reverse tuck end",
      },
      {
        label: "Slim beauty carton",
        title: "Lipstick and cosmetic outer boxes",
        description:
          "Review the lipstick route when a straight tuck end carton is being considered for an individual finished beauty product.",
        status: "Related route",
        href: "/cosmetics/lipstick-boxes",
        linkLabel: "Review lipstick outer boxes",
      },
      {
        label: "Transit case",
        title: "Regular shipping carton, master carton, or RSC case",
        description:
          "These standard transit cartons are outside UPG's current offer. Custom printed straight tuck end folding cartons remain available.",
        status: "Outside current offer",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    path: "/products/custom-tuck-boxes",
    eyebrow: "Tuck-box buying routes",
    title: "Start with the tuck-box structure or decision you already know.",
    intro:
      "UPG manufactures custom printed tuck boxes and folding cartons across five core structures. Choose a direct production brief, compare structures, or check whether the project is actually a corrugated mailer.",
    options: [
      {
        label: "Custom retail outer box",
        title: "Tuck box or folding carton",
        description:
          "Start a production brief for a straight tuck, reverse tuck, auto-lock, interlock, seal-end, cereal-style, or corrugated tuck box.",
        status: "Available",
        href: "/get-a-quote?product=Tuck%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Buyer%20intent%3A%20custom%20tuck%20box%20or%20folding%20carton.",
        linkLabel: "Start a tuck-box brief",
      },
      {
        label: "Structure not confirmed",
        title: "Compare the five tuck-box structures",
        description:
          "Review the opening direction, locking-bottom, interlock, and seal-end starting routes before final artwork is placed on an approved dieline.",
        status: "Related route",
        href: "#style-decision-guide",
        linkLabel: "Compare tuck structures",
      },
      {
        label: "Presentation decision",
        title: "Tuck box or corrugated mailer?",
        description:
          "Use the side-by-side guide when the project could be an individual retail carton or a larger ear-lock presentation mailer.",
        status: "Related route",
        href: "/compare/tuck-boxes-vs-mailer-boxes",
        linkLabel: "Compare tuck and mailer boxes",
      },
      {
        label: "Transit case",
        title: "Regular shipping carton, master carton, or RSC case",
        description:
          "These standard transit cartons are outside UPG's current offer. Corrugated tuck boxes and ear-lock mailer boxes remain available.",
        status: "Outside current offer",
      },
    ],
    reviewedAt,
  },
  {
    path: "/products/custom-mailer-boxes",
    eyebrow: "Corrugated mailer buying routes",
    title: "Choose the ear-lock mailer route that matches the program.",
    intro:
      "UPG manufactures custom corrugated ear-lock mailer boxes for branded presentation. Start with the program type, then confirm the product arrangement, insert, print, quantity, and destination.",
    options: [
      {
        label: "Direct mailer project",
        title: "Custom corrugated ear-lock mailer",
        description:
          "Start a made-to-spec mailer brief with the product arrangement, dimensions, quantity, artwork status, intended use, and destination.",
        status: "Available",
        href: "/get-a-quote?product=Mailer%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Buyer%20intent%3A%20custom%20corrugated%20ear-lock%20mailer%20box.",
        linkLabel: "Start a mailer brief",
      },
      {
        label: "Launch or media program",
        title: "PR or influencer mailer",
        description:
          "Use an application guide when the ear-lock mailer is for press, media, creator seeding, product launch, or branded presentation.",
        status: "Related route",
        href: "/applications/custom-pr-boxes",
        linkLabel: "Review custom PR boxes",
      },
      {
        label: "Repeat program",
        title: "Subscription mailer",
        description:
          "Use the subscription route when products or assortments repeat and the mailer, insert, and artwork need a consistent program brief.",
        status: "Related route",
        href: "/applications/custom-subscription-boxes",
        linkLabel: "Review subscription mailers",
      },
      {
        label: "Transit case",
        title: "Regular shipping carton, master carton, or RSC case",
        description:
          "These standard transit cartons are outside UPG's current offer. The available corrugated product is a custom ear-lock mailer for branded presentation.",
        status: "Outside current offer",
      },
    ],
    reviewedAt,
  },
  {
    path: "/products/custom-magnetic-boxes",
    eyebrow: "Magnetic-box buying routes",
    title: "Choose an assembled magnetic presentation or compare fold-flat delivery.",
    intro:
      "UPG manufactures custom rigid magnetic boxes for premium presentation. The first decision is whether the approved structure should remain assembled or use a collapsible fold-flat route.",
    options: [
      {
        label: "Assembled presentation",
        title: "Custom magnetic rigid box",
        description:
          "Start here for a premium assembled magnetic box developed around the product arrangement, dimensions, quantity, artwork, finish, and destination.",
        status: "Available",
        href: "/get-a-quote?product=Magnetic%20Boxes&builder_note=Buyer%20intent%3A%20custom%20assembled%20magnetic%20rigid%20box.",
        linkLabel: "Start a magnetic-box brief",
      },
      {
        label: "Multi-product set",
        title: "Magnetic box with custom insert",
        description:
          "Use this route when several products need one premium presentation and the insert must be reviewed with the planned arrangement.",
        status: "Available",
        href: "/get-a-quote?product=Magnetic%20Boxes&builder_note=Buyer%20intent%3A%20magnetic%20presentation%20box%20with%20custom%20insert.",
        linkLabel: "Start an insert-led brief",
      },
      {
        label: "Freight and storage decision",
        title: "Standard or collapsible magnetic box?",
        description:
          "Use the comparison guide when a premium magnetic presentation is required but a fold-flat structure may better suit freight, storage, or packing plans.",
        status: "Related route",
        href: "/compare/magnetic-boxes-vs-collapsible-magnetic-boxes",
        linkLabel: "Compare magnetic structures",
      },
      {
        label: "Different presentation level",
        title: "Tuck box or magnetic box?",
        description:
          "Use the side-by-side guide when the decision is between a folding retail carton and a premium rigid magnetic presentation.",
        status: "Related route",
        href: "/compare/tuck-boxes-vs-magnetic-boxes",
        linkLabel: "Compare tuck and magnetic boxes",
      },
    ],
    reviewedAt,
  },
  {
    path: "/products/custom-collapsible-magnetic-boxes",
    eyebrow: "Collapsible magnetic-box routes",
    title: "Start with the fold-flat magnetic structure or compare an assembled box.",
    intro:
      "UPG manufactures custom collapsible magnetic boxes that fold flat before assembly. Product arrangement, dimensions, insert, finish, quantity, destination, and packing method remain part of structural review.",
    options: [
      {
        label: "Fold-flat presentation",
        title: "Custom collapsible magnetic box",
        description:
          "Start here when the brief requires a premium rigid magnetic presentation that ships or stores flat before assembly.",
        status: "Available",
        href: "/get-a-quote?product=Collapsible%20Magnetic%20Boxes&builder_note=Buyer%20intent%3A%20custom%20fold-flat%20collapsible%20magnetic%20box.",
        linkLabel: "Start a collapsible-box brief",
      },
      {
        label: "Structure comparison",
        title: "Collapsible or assembled magnetic box?",
        description:
          "Compare the fold-flat route with a standard assembled rigid magnetic box before the structure and packing method are approved.",
        status: "Related route",
        href: "/compare/magnetic-boxes-vs-collapsible-magnetic-boxes",
        linkLabel: "Compare both magnetic formats",
      },
      {
        label: "Multi-product set",
        title: "Collapsible magnetic box with insert",
        description:
          "Use this route when a fold-flat magnetic presentation also needs a custom insert developed around several products.",
        status: "Available",
        href: "/get-a-quote?product=Collapsible%20Magnetic%20Boxes&builder_note=Buyer%20intent%3A%20collapsible%20magnetic%20box%20with%20custom%20insert.",
        linkLabel: "Start an insert-led brief",
      },
      {
        label: "Different presentation level",
        title: "Folding carton or rigid presentation?",
        description:
          "Use the tuck-versus-magnetic guide when the project may only need a printed folding carton rather than a rigid magnetic structure.",
        status: "Related route",
        href: "/compare/tuck-boxes-vs-magnetic-boxes",
        linkLabel: "Compare carton and rigid formats",
      },
    ],
    reviewedAt,
  },
  {
    path: "/products/custom-mylar-bags",
    eyebrow: "Flexible-packaging buying routes",
    title: "Choose a finished pouch, printed rollstock, or a format comparison.",
    intro:
      "UPG supplies custom printed Mylar bags, finished pouches, and printed rollstock film. Start with the physical format required by the product and packing plan.",
    options: [
      {
        label: "Finished flexible package",
        title: "Custom printed bag or pouch",
        description:
          "Start a finished-pouch brief for stand-up, flat-bottom, three-side-seal, spout, coffee, or child-resistant formats.",
        status: "Available",
        href: "/get-a-quote?product=Mylar%20Bags&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Buyer%20intent%3A%20custom%20printed%20finished%20bag%20or%20pouch.",
        linkLabel: "Start a pouch brief",
      },
      {
        label: "Film supplied on roll",
        title: "Custom printed rollstock film",
        description:
          "Use the rollstock route when the packing plan requires printed film on roll and machine, web, repeat, sealing, and product details are available for review.",
        status: "Available",
        href: "/packaging-styles/printed-rollstock-film",
        linkLabel: "Review printed rollstock",
      },
      {
        label: "Pouch structure decision",
        title: "Stand-up pouch or flat-bottom bag?",
        description:
          "Use the side-by-side guide when both finished formats are being considered for the same product and presentation brief.",
        status: "Related route",
        href: "/compare/stand-up-pouches-vs-flat-bottom-bags",
        linkLabel: "Compare finished pouch formats",
      },
      {
        label: "Packing equipment or service",
        title: "Filling, sealing, pouch-making, or converting machinery",
        description:
          "UPG supplies custom flexible packaging. Packing services and packing or converting machinery are outside the current product offer.",
        status: "Outside current offer",
      },
    ],
    reviewedAt,
  },
  {
    path: "/cosmetics",
    eyebrow: "Cosmetic packaging scope",
    title: "Choose the custom outer-packaging route that fits your project.",
    intro:
      "UPG manufactures custom printed outer boxes and presentation packaging for finished beauty products. Start with the route closest to the product or campaign you need to package.",
    visual: {
      src: "/images/redesign/hero/cosmetics-hub.jpg",
      alt: "Custom printed cosmetic outer boxes for finished beauty products",
      caption:
        "Outer cartons, presentation boxes, and mailers are selected around the finished beauty product and program.",
    },
    options: [
      {
        label: "Individual retail product",
        title: "Custom cosmetic outer carton",
        description:
          "Use a tuck-box route for an individual skincare, serum, lipstick, mascara, cream, lotion, or related beauty product.",
        status: "Available",
        href: "/get-a-quote?product=Tuck%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Buyer%20intent%3A%20custom%20cosmetic%20outer%20carton.",
        linkLabel: "Start an outer-carton brief",
      },
      {
        label: "Premium set or collection",
        title: "Magnetic presentation box",
        description:
          "Use a magnetic or collapsible magnetic box route for a premium set after the product count and arrangement are confirmed.",
        status: "Available",
        href: "/compare/magnetic-boxes-vs-collapsible-magnetic-boxes",
        linkLabel: "Compare magnetic formats",
      },
      {
        label: "PR or creator campaign",
        title: "Corrugated ear-lock mailer",
        description:
          "Use a mailer route when the brief is a PR kit, creator seeding program, launch, subscription, or branded presentation.",
        status: "Available",
        href: "/applications/influencer-kits",
        linkLabel: "Review influencer mailers",
      },
      {
        label: "Primary cosmetic packaging",
        title: "Bottles, jars, tubes, mechanisms, applicators, filling, or fulfillment",
        description:
          "These products and services are outside UPG's current outer-packaging manufacturing offer.",
        status: "Outside current offer",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    path: "/cosmetics/lipstick-boxes",
    eyebrow: "Lipstick packaging scope",
    title: "Choose the right lipstick outer-packaging route.",
    intro:
      "UPG supplies the custom printed outer packaging around the finished lip product. The route changes between an individual retail carton and a premium multi-product set.",
    visual: {
      src: "/images/redesign/hero/hero-cosmetics.jpg",
      alt: "Custom lipstick and beauty product outer packaging",
      caption:
        "Individual lip products typically begin with a fitted folding carton; collections can move into a presentation box.",
    },
    options: [
      {
        label: "Individual lipstick product",
        title: "Custom lipstick outer box",
        description:
          "Start with a tuck carton for one lipstick, lip balm, lip oil, lip gloss, or related slim beauty product.",
        status: "Available",
        href: "/get-a-quote?product=Tuck%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Buyer%20intent%3A%20custom%20lipstick%20packaging%20box.",
        linkLabel: "Start a lipstick-box brief",
      },
      {
        label: "Premium collection",
        title: "Magnetic lipstick presentation set",
        description:
          "Review a magnetic box when several lip products need one premium presentation after the arrangement is confirmed.",
        status: "Related route",
        href: "/products/custom-magnetic-boxes",
        linkLabel: "Review magnetic boxes",
      },
      {
        label: "Primary lipstick component",
        title: "Lipstick tube, casing, mechanism, formula, or filling",
        description:
          "UPG does not supply the lipstick component or formula. This page covers the printed outer box only.",
        status: "Outside current offer",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    path: "/cosmetics/serum-boxes",
    eyebrow: "Serum packaging scope",
    title: "Choose the right outer packaging for a serum product or set.",
    intro:
      "UPG manufactures custom printed outer packaging around the finished serum product. Bottle dimensions and the intended presentation define the correct starting route.",
    options: [
      {
        label: "Individual serum bottle",
        title: "Custom serum outer carton",
        description:
          "Start with a tuck carton developed around the finished bottle or dropper dimensions, quantity, artwork, and destination.",
        status: "Available",
        href: "/get-a-quote?product=Tuck%20Boxes&style=Not%20sure%20%E2%80%94%20recommend&builder_note=Buyer%20intent%3A%20custom%20serum%20packaging%20box.",
        linkLabel: "Start a serum-box brief",
      },
      {
        label: "Serum set or launch",
        title: "Magnetic serum presentation box",
        description:
          "Review a magnetic format when multiple serum or skincare products need one premium presentation and insert plan.",
        status: "Related route",
        href: "/products/custom-magnetic-boxes",
        linkLabel: "Review magnetic boxes",
      },
      {
        label: "Primary serum packaging",
        title: "Bottle, jar, dropper, formula, filling, or fulfillment",
        description:
          "These products and services are outside UPG's current outer-packaging manufacturing offer.",
        status: "Outside current offer",
      },
    ],
    reviewedAt,
  },
  {
    path: "/applications/influencer-kits",
    eyebrow: "Influencer-kit project scope",
    title: "Choose the right influencer-kit packaging route.",
    intro:
      "UPG manufactures the custom corrugated ear-lock mailer and approved insert. Use the route that matches the presentation program before artwork and quantity are finalized.",
    visual: {
      src: "/images/generated/mailer-boxes/mailer-boxes-insert-v1.png",
      alt: "Custom printed influencer mailer box with a fitted product insert",
      caption:
        "Mailer structure and insert planning begin with the approved product arrangement, not a generic campaign-kit size.",
    },
    options: [
      {
        label: "Creator seeding packaging",
        title: "Custom influencer mailer box",
        description:
          "Start here for a branded creator-seeding or campaign-drop mailer built around the approved product arrangement.",
        status: "Available",
        href: "/get-a-quote?product=Mailer%20Boxes&style=Influencer%20Mailer&builder_note=Buyer%20intent%3A%20custom%20influencer%20mailer%20box.",
        linkLabel: "Start an influencer-mailer brief",
      },
      {
        label: "Press or broad launch program",
        title: "Custom PR box",
        description:
          "Use the PR route for press, editorial, media, event, gifting, or broad launch presentation rather than creator seeding alone.",
        status: "Related route",
        href: "/applications/custom-pr-boxes",
        linkLabel: "Compare the PR-box route",
      },
      {
        label: "Canonical product family",
        title: "Custom corrugated mailer boxes",
        description:
          "Review the full ear-lock mailer family when the program type is not limited to influencer seeding.",
        status: "Related route",
        href: "/products/custom-mailer-boxes",
        linkLabel: "Review custom mailer boxes",
      },
      {
        label: "Campaign operations",
        title: "Product sourcing, assembly, warehousing, creator lists, or individual fulfillment",
        description:
          "UPG's current standard offer covers packaging manufacture only. Any additional service requires separate review and written confirmation.",
        status: "Outside current offer",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    path: "/packaging-styles/printed-rollstock-film",
    eyebrow: "Rollstock buying route",
    title: "Choose printed film on roll or a finished pouch.",
    intro:
      "Both routes sit inside UPG's flexible-packaging range, but they require different project inputs. Start with the physical format the packing plan needs.",
    visual: {
      src: "/images/generated/mylar-bags/mylar-bags-spout-rollstock-v1.png",
      alt: "Custom printed rollstock film displayed beside finished flexible packaging formats",
      caption:
        "Printed rollstock is supplied on roll for compatible packing equipment; a finished pouch is a separate sourcing route.",
    },
    options: [
      {
        label: "Film supplied on roll",
        title: "Custom printed rollstock film",
        description:
          "Use this route for printed film on roll and share the available packing-machine, web, repeat, sealing, product, quantity, and destination details.",
        status: "Available",
        href: "/get-a-quote?product=Mylar%20Bags&style=Rollstock%20Film&builder_note=Buyer%20intent%3A%20custom%20printed%20rollstock%20film.",
        linkLabel: "Start a rollstock brief",
      },
      {
        label: "Ready-to-fill format",
        title: "Finished bag or pouch",
        description:
          "Use the finished-pouch route for stand-up, flat-bottom, three-side-seal, spout, coffee, or child-resistant formats.",
        status: "Related route",
        href: "/compare/rollstock-film-vs-finished-pouches",
        linkLabel: "Compare rollstock and pouches",
      },
      {
        label: "Food packaging application",
        title: "Custom food pouches and flexible film",
        description:
          "Use the food-pouch guide when product contents, barrier needs, closure, or the finished-format decision needs review.",
        status: "Related route",
        href: "/industries/custom-food-pouches",
        linkLabel: "Review food-pouch packaging",
      },
      {
        label: "Packing equipment",
        title: "Filling, sealing, or pouch-making machinery",
        description:
          "UPG supplies custom flexible packaging. Packing and converting machinery are outside the current product offer.",
        status: "Outside current offer",
      },
    ],
    reviewedAt: "2026-09-03",
  },
  {
    path: "/samples/box-sample-kit",
    eyebrow: "Box sample buying route",
    title: "Choose a finished box kit, a sample review, or production packaging.",
    intro:
      "The paid Box Sample Kit is a fixed physical product. Free sample review and custom production remain separate, human-reviewed paths.",
    options: [
      {
        label: "Physical evaluation kit",
        title: "$19.99 finished Box Sample Kit",
        description:
          "Order finished UPG-branded box samples to compare structures, board construction, print surfaces, and selected specialty finishes.",
        status: "Available",
        href: "#sample-kit-checkout",
        linkLabel: "Order the Box Sample Kit",
      },
      {
        label: "Active custom project",
        title: "Free sample review",
        description:
          "Request a human review when an active packaging project has a known product, expected quantity, destination, and sample need.",
        status: "Available",
        href: "#free-sample-request",
        linkLabel: "Request a sample review",
      },
      {
        label: "Flexible-packaging samples",
        title: "Mylar Bag Sample Kit",
        description:
          "Boxes and flexible packaging are kept in separate kits. Use the Mylar route for finished pouches and printed film on roll.",
        status: "Related route",
        href: "/samples/mylar-bag-sample-kit",
        linkLabel: "Review the Mylar kit",
      },
      {
        label: "Custom production",
        title: "Project-specific packaging quote",
        description:
          "Use the production enquiry when dimensions, quantity, artwork, intended use, and destination are ready for review.",
        status: "Related route",
        href: "/get-a-quote?product=Not%20sure%20yet&builder_note=Buyer%20intent%3A%20custom%20box%20production%20after%20sample%20review.",
        linkLabel: "Start a production brief",
      },
    ],
    reviewedAt,
  },
];

export function getOrganicIntentRoute(path: string) {
  return organicIntentRoutes.find((route) => route.path === path);
}

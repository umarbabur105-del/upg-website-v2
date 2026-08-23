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
  options: OrganicIntentOption[];
  reviewedAt: string;
}

const reviewedAt = "2026-08-23";

export const organicIntentRoutes: OrganicIntentRoute[] = [
  {
    path: "/cosmetics",
    eyebrow: "Cosmetic packaging scope",
    title: "Choose the custom outer-packaging route that fits your project.",
    intro:
      "UPG manufactures custom printed outer boxes and presentation packaging for finished beauty products. Start with the route closest to the product or campaign you need to package.",
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
    reviewedAt,
  },
  {
    path: "/cosmetics/lipstick-boxes",
    eyebrow: "Lipstick packaging scope",
    title: "Choose the right lipstick outer-packaging route.",
    intro:
      "UPG supplies the custom printed outer packaging around the finished lip product. The route changes between an individual retail carton and a premium multi-product set.",
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
    reviewedAt,
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
        label: "Campaign operations",
        title: "Product sourcing, assembly, warehousing, creator lists, or individual fulfillment",
        description:
          "UPG's current standard offer covers packaging manufacture only. Any additional service requires separate review and written confirmation.",
        status: "Outside current offer",
      },
    ],
    reviewedAt,
  },
  {
    path: "/packaging-styles/printed-rollstock-film",
    eyebrow: "Rollstock buying route",
    title: "Choose printed film on roll or a finished pouch.",
    intro:
      "Both routes sit inside UPG's flexible-packaging range, but they require different project inputs. Start with the physical format the packing plan needs.",
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
        label: "Packing equipment",
        title: "Filling, sealing, or pouch-making machinery",
        description:
          "UPG supplies custom flexible packaging. Packing and converting machinery are outside the current product offer.",
        status: "Outside current offer",
      },
    ],
    reviewedAt,
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

export const siteConfig = {
  name: "Universal Packaging Group",
  shortName: "UPG",
  description:
    "Custom boxes, mylar bags, and paper cups for brands in the United States and Canada.",
  url: "https://universalpackaginggroup.com",
  email: "quotes@universalpackaginggroup.com",
  navigation: [
    { label: "Products", href: "/#products" },
    { label: "Industries", href: "/#industries" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get a Quote", href: "/get-a-quote" },
  trustStrip: [
    {
      stat: "24hr",
      title: "Quote Turnaround",
      description: "Targeted quote turnaround",
    },
    {
      stat: "100+",
      title: "Unit MOQ",
      description: "Minimum order quantity",
    },
    {
      stat: "5",
      title: "Product Families",
      description: "Product families quoted",
    },
    {
      stat: "US & CA",
      title: "Delivery Coverage",
      description: "Delivery coverage",
    },
  ],
  industries: [
    {
      name: "Beauty & Personal Care",
      description:
        "Custom cartons, rigid boxes, and pouches for skincare, cosmetics, and personal care brands.",
    },
    {
      name: "E-commerce & Retail",
      description:
        "Mailer boxes, shippers, and branded packaging for online and retail product brands.",
    },
    {
      name: "Supplements & Specialty Food",
      description:
        "Pouches and cartons with barrier review and end-use documentation for food and supplement products.",
    },
    {
      name: "Coffee & Beverage",
      description:
        "Custom paper cups and pouches for cafes, beverage brands, and specialty coffee roasters.",
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Submit Your Request",
      description:
        "Tell us what you need — product type, quantity, dimensions, materials, and where it ships.",
    },
    {
      step: 2,
      title: "Receive Your Quote",
      description:
        "We review your specs, match the right structure and supplier path, and send detailed pricing.",
    },
    {
      step: 3,
      title: "Review & Approve",
      description:
        "Review your quote, confirm dimensions and artwork. We send a pre-production proof for sign-off before production begins.",
    },
    {
      step: 4,
      title: "Production & Delivery",
      description:
        "We manage production through to landed delivery. You get tracking updates and a final quality check before shipment.",
    },
  ],
  whyUpg: [
    {
      title: "One Quote Process",
      description:
        "Boxes, pouches, and cups — all quoted through a single streamlined process.",
    },
    {
      title: "Clear Communication",
      description:
        "Transparent pricing, MOQ, lead time, and printing options from the start.",
    },
    {
      title: "Custom Sizing",
      description:
        "Every product line supports custom dimensions matched to your product needs.",
    },
    {
      title: "Supplier-Managed",
      description:
        "We handle production coordination so you focus on your brand, not logistics.",
    },
    {
      title: "Design Assistance",
      description:
        "Structure guidance, dielines, and artwork review included in the process.",
    },
    {
      title: "Quality Assurance",
      description:
        "Material and finish review built into quoting to prevent production surprises.",
    },
  ],
} as const;

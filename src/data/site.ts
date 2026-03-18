export const siteConfig = {
  name: "Universal Packaging Group",
  shortName: "UPG",
  description:
    "Custom boxes, mylar bags, and paper cups for brands in the United States and Canada.",
  url: "https://universalpackaginggroup.com",
  email: "quotes@universalpackaginggroup.com",
  phone: "+1 (888) 000-0000",
  navigation: [
    { label: "Products", href: "/#products" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get a Quote", href: "/get-a-quote" },
  trustStrip: [
    {
      title: "24-Hour Quotes",
      description: "Standard quote requests targeted within 24 hours",
    },
    {
      title: "Flexible MOQs",
      description: "Low-to-mid minimum order quantities across product lines",
    },
    {
      title: "Landed Delivery",
      description: "Delivery support for the United States and Canada",
    },
    {
      title: "Design Support",
      description: "Artwork guidance, dielines, and print setup available",
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
      title: "Approve & Produce",
      description:
        "Confirm artwork, approve proofs, and we manage production through to landed delivery.",
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

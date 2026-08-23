export const siteConfig = {
  name: "Universal Packaging Group",
  shortName: "UPG",
  description:
    "Custom boxes and flexible packaging manufactured for brands worldwide.",
  url: "https://universalpackaginggroup.com",
  email: "quotes@universalpackaginggroup.com",
  phoneNumber: "+17868858825",
  phoneDisplay: "+1 786 885 8825",
  whatsappUrl: "https://wa.me/17868858825",
  legalEntities: {
    uk: "Universal Packaging Group LTD",
    us: "Universal Packaging Group LLC",
    sampleKitSeller: "Universal Packaging Group LTD",
  },
  merchantReturnPolicyUrl:
    "https://universalpackaginggroup.com/shipping-returns",
  merchantReturnPolicyId:
    "https://universalpackaginggroup.com/shipping-returns#merchant-return-policy",
  language: "en-US",
  market: "Worldwide",
  contentReviewedAt: "2026-08-23",
  businessModel:
    "Custom packaging manufacturing with project-specific structure, specification, pricing, proofing, production, and delivery planning.",
  pricingModel:
    "Custom production uses project-specific quotation based on structure, dimensions, material, print, finish, quantity, and delivery destination. The UPG Box Sample Kit and Mylar Bag Sample Kit are separate fixed-price products.",
  responseTarget:
    "UPG targets an initial response within one business day. Final pricing may require specification review.",
  scopeBoundary:
    "UPG supplies corrugated ear-lock mailer boxes, not regular slotted shipping cartons, master cartons, or RSC cases.",
  imagePolicy:
    "AI-generated packaging images are representative concepts, not completed customer work. Final construction, color, print, and finish are confirmed for each project.",
  navigation: [
    { label: "Products", href: "/products" },
    { label: "Cosmetics", href: "/cosmetics" },
    { label: "Samples", href: "/samples" },
    { label: "About", href: "/about" },
  ],
  utilityNavigation: [
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get a Quote", href: "/get-a-quote" },
  footerColumns: {
    productLinks: [
      { label: "Packaging Style Library", href: "/packaging-styles" },
      { label: "Packaging Comparisons", href: "/compare" },
      { label: "Materials & Finishes", href: "/materials-finishes" },
      { label: "Packaging Tools", href: "/tools" },
      { label: "Custom Tuck Boxes", href: "/products/custom-tuck-boxes" },
      { label: "Corrugated Mailer Boxes", href: "/products/custom-mailer-boxes" },
      { label: "Custom Magnetic Boxes", href: "/products/custom-magnetic-boxes" },
      { label: "Collapsible Magnetic Boxes", href: "/products/custom-collapsible-magnetic-boxes" },
      { label: "Custom Mylar Bags", href: "/products/custom-mylar-bags" },
    ],
    cosmeticsLinks: [
      { label: "Skincare Boxes", href: "/cosmetics/skincare-boxes" },
      { label: "Serum Boxes", href: "/cosmetics/serum-boxes" },
      { label: "Lipstick Boxes", href: "/cosmetics/lipstick-boxes" },
      { label: "Perfume Boxes", href: "/cosmetics/perfume-boxes" },
      { label: "PR Boxes", href: "/cosmetics/pr-boxes" },
    ],
  },
} as const;

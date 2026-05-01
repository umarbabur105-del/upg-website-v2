export const siteConfig = {
  name: "Universal Packaging Group",
  shortName: "UPG",
  description:
    "Custom packaging for beauty and product brands that need premium presentation, faster quoting, and reliable follow-through.",
  url: "https://universalpackaginggroup.com",
  email: "quotes@universalpackaginggroup.com",
  whatsappNumber: "",
  navigation: [
    { label: "Products", href: "/products" },
    { label: "Cosmetics", href: "/cosmetics" },
    { label: "Industries", href: "/industries" },
    { label: "Materials & Finishes", href: "/materials-finishes" },
    { label: "Samples", href: "/samples" },
  ],
  utilityNavigation: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get a Quote", href: "/get-a-quote" },
  footerColumns: {
    productLinks: [
      { label: "Custom Mailer Boxes", href: "/products/custom-mailer-boxes" },
      { label: "Custom Rigid Boxes", href: "/products/custom-rigid-boxes" },
      { label: "Custom Folding Cartons", href: "/products/custom-folding-cartons" },
      { label: "Custom Mylar Bags", href: "/products/custom-mylar-bags" },
      { label: "Custom Coffee Cups", href: "/products/custom-coffee-cups" },
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

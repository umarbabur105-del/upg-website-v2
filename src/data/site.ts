export const siteConfig = {
  name: "Universal Packaging Group",
  shortName: "UPG",
  description:
    "Custom cosmetic packaging guidance, sourcing, and production coordination for beauty and product brands in the United States and Canada.",
  url: "https://universalpackaginggroup.com",
  email: "quotes@universalpackaginggroup.com",
  whatsappNumber: "",
  navigation: [
    { label: "Products", href: "/products" },
    { label: "Cosmetic Packaging", href: "/cosmetics" },
    { label: "Materials & Finishes", href: "/materials-finishes" },
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

export const siteConfig = {
  name: "Universal Packaging Group",
  shortName: "UPG",
  description:
    "Custom boxes and flexible packaging manufactured for brands worldwide.",
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
  cta: { label: "Start Your Project", href: "/get-a-quote" },
  footerColumns: {
    productLinks: [
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

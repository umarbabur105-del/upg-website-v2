export const styleNavigation = [
  {
    label: "Tuck Boxes",
    href: "/products/custom-tuck-boxes",
    description: "Straight tuck, reverse tuck, auto-lock, interlock, and seal-end cartons.",
  },
  {
    label: "Mailer Boxes",
    href: "/products/custom-mailer-boxes",
    description: "Corrugated ear-lock mailers for branded presentation and unboxing.",
  },
  {
    label: "Magnetic Boxes",
    href: "/products/custom-magnetic-boxes",
    description: "Premium rigid presentation boxes with magnetic closure.",
  },
  {
    label: "Collapsible Magnetic Boxes",
    href: "/products/custom-collapsible-magnetic-boxes",
    description: "Fold-flat magnetic presentation boxes for compact storage and delivery.",
  },
  {
    label: "Mylar Bags",
    href: "/products/custom-mylar-bags",
    description: "Printed pouches, coffee bags, child-resistant bags, and rollstock film.",
  },
] as const;

export const industryNavigationGroups = [
  {
    id: "beauty-personal-care",
    label: "Beauty & Personal Care",
    description: "Cosmetics, skincare, perfume, and soap packaging.",
    links: [
      { label: "Cosmetics Packaging", href: "/cosmetics", kind: "Category hub" },
      {
        label: "Soap Boxes",
        href: "/industries/custom-soap-boxes",
        kind: "Industry guide",
      },
    ],
  },
  {
    id: "food-beverage-coffee",
    label: "Food, Beverage & Coffee",
    description: "Cereal cartons, printed pouches, drink formats, snacks, and coffee bags.",
    links: [
      {
        label: "Cereal Boxes",
        href: "/industries/custom-cereal-boxes",
        kind: "Industry guide",
      },
      {
        label: "Food Pouches",
        href: "/industries/custom-food-pouches",
        kind: "Industry guide",
      },
      {
        label: "Beverage Pouches",
        href: "/industries/custom-beverage-pouches",
        kind: "Industry guide",
      },
      {
        label: "Snack & Confectionery Packaging",
        href: "/industries/custom-snack-packaging",
        kind: "Industry guide",
      },
      {
        label: "Coffee Bags",
        href: "/packaging-styles/coffee-bags",
        kind: "Current format",
      },
    ],
  },
  {
    id: "supplements-wellness",
    label: "Supplements & Wellness",
    description: "Printed outer cartons and flexible packs for supplement products.",
    links: [
      {
        label: "Supplement Boxes",
        href: "/industries/custom-supplement-boxes",
        kind: "Industry guide",
      },
      {
        label: "Supplement Pouches",
        href: "/industries/custom-supplement-pouches",
        kind: "Industry guide",
      },
    ],
  },
  {
    id: "fashion-jewelry-luxury",
    label: "Fashion, Jewelry & Luxury",
    description: "Apparel and jewelry presentation packaging.",
    links: [
      {
        label: "Apparel Boxes",
        href: "/industries/custom-apparel-boxes",
        kind: "Industry guide",
      },
      {
        label: "Jewelry Presentation Boxes",
        href: "/industries/custom-jewelry-boxes",
        kind: "Industry guide",
      },
    ],
  },
  {
    id: "electronics-consumer-goods",
    label: "Electronics & Consumer Goods",
    description: "Presentation and retail packaging for products, devices, toys, and games.",
    links: [
      {
        label: "Electronics Presentation Boxes",
        href: "/industries/custom-electronics-boxes",
        kind: "Industry guide",
      },
      {
        label: "Retail Product Boxes",
        href: "/industries/custom-retail-boxes",
        kind: "Industry guide",
      },
      {
        label: "Games, Toys & Collectibles",
        href: "/industries/custom-toy-packaging",
        kind: "Industry guide",
      },
    ],
  },
  {
    id: "home-candles-gifts",
    label: "Home, Candles & Gifts",
    description: "Candle cartons and premium gift presentation boxes.",
    links: [
      {
        label: "Candle Boxes",
        href: "/industries/custom-candle-boxes",
        kind: "Industry guide",
      },
      {
        label: "Luxury Gift Boxes",
        href: "/industries/custom-luxury-gift-boxes",
        kind: "Industry guide",
      },
    ],
  },
  {
    id: "pet-products",
    label: "Pet Products",
    description: "Printed flexible packaging for pet food and treat projects.",
    links: [
      {
        label: "Pet Food & Treat Packaging",
        href: "/industries/custom-pet-food-packaging",
        kind: "Industry guide",
      },
    ],
  },
] as const;

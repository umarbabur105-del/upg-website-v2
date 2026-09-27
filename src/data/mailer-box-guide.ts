export const mailerBoxSizeComparisons = [
  {
    internalSize: "6 × 4 × 2 in",
    layout: "Small single-product set or compact flat arrangement",
    review: "Confirm the product, protective layer, and opening orientation with a sample before approving fit.",
  },
  {
    internalSize: "8 × 6 × 3 in",
    layout: "Small multi-item set or a product with a fitted insert",
    review: "Allow for the full packed arrangement; an insert changes the usable internal space.",
  },
  {
    internalSize: "10 × 8 × 4 in",
    layout: "Larger set, launch kit, or subscription assortment",
    review: "Compare the largest planned assortment and its insert before final sizing.",
  },
  {
    internalSize: "12 × 10 × 5 in",
    layout: "Broader presentation kit with several arranged items",
    review: "Review the complete packout, handling, and delivery conditions for the project.",
  },
] as const;

export const mailerBoxDecisionLinks = [
  {
    title: "Measure the packed product",
    description: "Start with the product and every layer that will be inside the mailer.",
    href: "/blog/how-to-measure-product-for-custom-packaging",
  },
  {
    title: "Review material and flute choices",
    description: "Board formation and flute profile need the complete packout and delivery brief.",
    href: "/materials-finishes",
  },
  {
    title: "Separate proof from sample",
    description: "Artwork review, finished samples, and project approval answer different questions.",
    href: "/blog/packaging-proof-vs-sample",
  },
  {
    title: "Compare price factors and MOQ",
    description: "Review the factors that shape a made-to-spec mailer quote from 250 units.",
    href: "#pricing-and-moq",
  },
] as const;

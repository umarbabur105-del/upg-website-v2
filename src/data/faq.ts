export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is your minimum order quantity?",
    answer:
      "Magnetic and collapsible magnetic boxes start at 250 units. Mylar bags start at 500. Tuck and mailer boxes start at 1,000 units when every dimension is 5 in or less, 500 units when the largest dimension is over 5 in through 10 in, and 250 units when it is over 10 in.",
  },
  {
    question: "How fast can I get a quote?",
    answer:
      "We target an initial response within one business day. A complete price may take longer when dimensions, artwork, materials, intended use, or delivery details still need clarification.",
  },
  {
    question: "Do you help with dielines and artwork?",
    answer:
      "Yes. We coordinate structure guidance, production dielines, and basic artwork checks. Final print files and approvals follow the confirmed structure, manufacturing requirements, and proofing process.",
  },
  {
    question: "Do you ship custom packaging worldwide?",
    answer:
      "Yes. UPG can arrange delivery to destinations worldwide. Freight service, duties, taxes, import requirements, documentation, and delivery terms are confirmed for each project and destination.",
  },
  {
    question: "Can I order custom sizes?",
    answer:
      "Yes. Each core product family is made to a project-specific size, within confirmed structural and material limits.",
  },
  {
    question: "Do you offer samples?",
    answer:
      "Sample availability depends on the product, specification, and project stage. Tell us what you need to evaluate and we will confirm the available sample or pre-production option, cost, and timing.",
  },
  {
    question: "Can you handle cosmetics packaging?",
    answer:
      "Yes. The cosmetics hub connects tuck boxes, magnetic boxes, collapsible magnetic boxes, corrugated mailers, and inserts to skincare, serum, lipstick, perfume, PR, and subscription projects.",
  },
  {
    question: "Do you provide instant pricing online?",
    answer:
      "No. Custom packaging is manufactured to specification, so pricing depends on structure, size, material, print, finish, quantity, and delivery destination.",
  },
  {
    question: "Do you supply standard shipping or master cartons?",
    answer:
      "No. UPG offers ear-lock corrugated mailer boxes for branded ecommerce, PR, subscription, and presentation projects. Regular slotted shipping cartons, master cartons, and RSC cases are outside our product range.",
  },
];

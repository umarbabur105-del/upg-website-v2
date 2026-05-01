export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is your minimum order quantity?",
    answer:
      "MOQ depends on the format. Folding cartons usually start lower than rigid presentations, while pouches and cups generally need higher launch volumes. We can guide you to the most practical structure for your quantity.",
  },
  {
    question: "How fast can I get a quote?",
    answer:
      "Standard quote requests are targeted for reply within 24 business hours. If anything is unclear, we follow up quickly rather than sending a vague estimate.",
  },
  {
    question: "Do you help with dielines and artwork?",
    answer:
      "Yes. We support dielines, structure guidance, and basic artwork review as part of the quoting process so you do not have to solve the packaging spec alone.",
  },
  {
    question: "Do you ship to the United States and Canada?",
    answer:
      "Yes. UPG is structured around US and Canada delivery and quotes with shipping practicality in mind.",
  },
  {
    question: "Can I order custom sizes?",
    answer:
      "Yes. All core product families support custom sizing, subject to the structure, material limits, and project use case.",
  },
  {
    question: "Do you offer samples?",
    answer:
      "Sample routes depend on the product, timeline, and project stage. We can review physical sample options during quoting.",
  },
  {
    question: "Can you handle cosmetics packaging?",
    answer:
      "Yes. Cosmetics is the primary category built into the current site architecture, including skincare, serum, lipstick, perfume, PR kits, and subscription packaging.",
  },
  {
    question: "Do you provide instant pricing online?",
    answer:
      "No. UPG is quote-led because the real price depends on structure, finish, quantity, materials, and the delivery path.",
  },
  {
    question: "How do you handle food-contact projects?",
    answer:
      "Food-contact work still requires intended end-use review during quoting so the correct material path and supplier documentation can be confirmed.",
  },
];

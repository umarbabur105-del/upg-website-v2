export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is your minimum order quantity?",
    answer:
      "Planning MOQs are typically 500+ units for rigid boxes and mailers, and 1,000+ units for folding cartons, pouches, and cups. Final minimums depend on size, material, print, finish, and supplier fit, so the written quote is the controlling figure.",
  },
  {
    question: "How fast can I get a quote?",
    answer:
      "We target an initial response within one business day. A complete price may take longer when dimensions, artwork, materials, intended use, or delivery details still need clarification.",
  },
  {
    question: "Do you help with dielines and artwork?",
    answer:
      "Yes. We coordinate structure guidance, supplier dielines, and practical artwork checks. Final print files and approvals remain subject to the confirmed structure, supplier requirements, and proofing process.",
  },
  {
    question: "Do you ship to the United States and Canada?",
    answer:
      "Yes. UPG plans projects for delivery to the United States and Canada. Freight, duties, taxes, brokerage, and delivery terms are confirmed in the written quote rather than assumed.",
  },
  {
    question: "Can I order custom sizes?",
    answer:
      "Yes. All core product families support custom sizing, subject to the structure, material limits, and project use case.",
  },
  {
    question: "Do you offer samples?",
    answer:
      "Sample routes may include a stock reference, material or print sample, white structural sample, or a production-quality sample. Availability, cost, and timing depend on the format and project stage and are confirmed during quoting.",
  },
  {
    question: "Can you handle cosmetics packaging?",
    answer:
      "Yes. Cosmetics and beauty are UPG's primary focus, including folding cartons, rigid boxes, PR kits, mailers, and inserts for skincare, serum, lipstick, perfume, and subscription programs.",
  },
  {
    question: "Do you provide instant pricing online?",
    answer:
      "No. UPG is quote-led because the real price depends on structure, finish, quantity, materials, and the delivery path.",
  },
  {
    question: "How do you handle food-contact projects?",
    answer:
      "Food-contact or ingestible-product projects require intended-use, market, barrier, material, ink, and supplier-documentation review before a suitable route can be confirmed. UPG does not treat a generic material label as proof of regulatory suitability.",
  },
];

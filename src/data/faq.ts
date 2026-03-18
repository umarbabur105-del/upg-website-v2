export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is your minimum order quantity?",
    answer:
      "MOQ depends on the product type and structure. Core launch products usually start from 500 units for many box styles and 1,000 units for most pouches and cups.",
  },
  {
    question: "How fast can I get a quote?",
    answer:
      "Standard quote requests are targeted for response within 24 hours. Complex custom projects may need follow-up questions before final pricing.",
  },
  {
    question: "Do you help with packaging design?",
    answer:
      "Yes. We can support structure guidance, dielines, print setup, and artwork review as part of the quote process.",
  },
  {
    question: "Do you ship to the United States and Canada?",
    answer:
      "Yes. UPG is set up to quote landed delivery support for both markets.",
  },
  {
    question: "Can I order custom sizes?",
    answer:
      "Yes. All core product lines support custom sizing, subject to structure and material limits.",
  },
  {
    question: "Can I upload artwork with my quote request?",
    answer:
      "Yes. You can upload artwork files or request design help if your project is still in progress.",
  },
  {
    question: "Do you offer samples?",
    answer:
      "Sample routes depend on the product type, timeline, and supplier. We can review sample options during quoting.",
  },
  {
    question: "How do you handle food-contact projects?",
    answer:
      "Food-contact projects require intended end use details and supplier documentation review before approval.",
  },
  {
    question: "Do you provide instant pricing online?",
    answer:
      "No. Launch pricing is quote-led so we can match structure, printing, materials, and delivery needs accurately.",
  },
];

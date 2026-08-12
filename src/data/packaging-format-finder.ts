import { productFamilies } from "@/data/packaging-spec";
import type { ProductFamily } from "@/data/products";

export interface FormatFinderOption {
  id: string;
  label: string;
  description: string;
  weights: Partial<Record<ProductFamily, number>>;
}

export interface FormatFinderQuestion {
  id: string;
  title: string;
  helpText: string;
  options: FormatFinderOption[];
}

export type FormatFinderAnswers = Record<string, string>;

export interface FormatFinderRank {
  family: ProductFamily;
  score: number;
  matchedAnswers: string[];
}

export const formatFinderQuestions: FormatFinderQuestion[] = [
  {
    id: "contents",
    title: "What needs packaging?",
    helpText: "Choose the option closest to the product or set you want to present.",
    options: [
      {
        id: "single-retail-product",
        label: "One retail product",
        description: "An individual item that needs a printed secondary carton.",
        weights: { "Tuck Boxes": 5 },
      },
      {
        id: "multi-item-set",
        label: "Several items or a product set",
        description: "A grouped presentation, launch, subscription, or gifting set.",
        weights: {
          "Mailer Boxes": 3,
          "Magnetic Boxes": 3,
          "Collapsible Magnetic Boxes": 3,
        },
      },
      {
        id: "premium-gift",
        label: "A premium gift or launch collection",
        description: "A presentation-led box for a premium unboxing experience.",
        weights: {
          "Magnetic Boxes": 5,
          "Collapsible Magnetic Boxes": 4,
        },
      },
      {
        id: "flexible-product",
        label: "A bag, pouch, or rollstock product",
        description: "A flexible format such as a pouch, coffee bag, spout bag, or film on roll.",
        weights: { "Mylar Bags": 6 },
      },
      {
        id: "contents-unsure",
        label: "Not sure yet",
        description: "Continue and compare the format choices through the next questions.",
        weights: {},
      },
    ],
  },
  {
    id: "opening",
    title: "How should the packaging open or arrive?",
    helpText: "Choose the structural experience closest to what you have in mind.",
    options: [
      {
        id: "folded-carton",
        label: "A folded carton around the product",
        description: "A straight tuck, reverse tuck, auto-lock, interlock, or seal-end format.",
        weights: { "Tuck Boxes": 6 },
      },
      {
        id: "ear-lock-unboxing",
        label: "A corrugated ear-lock unboxing box",
        description: "A mailer-style structure for PR, subscription, ecommerce, or presentation.",
        weights: { "Mailer Boxes": 6 },
      },
      {
        id: "assembled-magnetic",
        label: "An assembled rigid magnetic box",
        description: "A premium magnetic presentation box supplied in its assembled form.",
        weights: { "Magnetic Boxes": 6 },
      },
      {
        id: "flat-pack-magnetic",
        label: "A magnetic box that ships flat",
        description: "A collapsible premium structure assembled before presentation.",
        weights: { "Collapsible Magnetic Boxes": 7 },
      },
      {
        id: "flexible-opening",
        label: "A flexible bag, pouch, spout, or rollstock format",
        description: "A non-box flexible packaging format from the approved Mylar bag range.",
        weights: { "Mylar Bags": 7 },
      },
      {
        id: "opening-unsure",
        label: "Not sure — compare for me",
        description: "Use the remaining answers to identify the closest starting format.",
        weights: {},
      },
    ],
  },
  {
    id: "program",
    title: "What is the main use?",
    helpText: "Select the customer experience or program this packaging needs to support.",
    options: [
      {
        id: "retail-shelf",
        label: "Retail shelf or individual product carton",
        description: "Printed secondary packaging for an individual product.",
        weights: { "Tuck Boxes": 5 },
      },
      {
        id: "pr-subscription-ecommerce",
        label: "PR kit, subscription, ecommerce, or launch mailer",
        description: "A branded corrugated presentation and unboxing format.",
        weights: { "Mailer Boxes": 5 },
      },
      {
        id: "premium-presentation",
        label: "Premium gifting or presentation",
        description: "A rigid magnetic format for gifts, sets, and launch collections.",
        weights: {
          "Magnetic Boxes": 4,
          "Collapsible Magnetic Boxes": 3,
        },
      },
      {
        id: "flexible-program",
        label: "Coffee, packaged goods, liquid-product, or flexible program",
        description: "A flexible packaging program using a bag, pouch, spout, or rollstock format.",
        weights: { "Mylar Bags": 5 },
      },
      {
        id: "program-unsure",
        label: "Still exploring",
        description: "Keep the intended use open for UPG review.",
        weights: {},
      },
    ],
  },
  {
    id: "priority",
    title: "Which practical priority matters most?",
    helpText: "This helps separate formats that can serve a similar presentation goal.",
    options: [
      {
        id: "compact-secondary-carton",
        label: "Compact secondary packaging for individual products",
        description: "A printed folding-carton format around one product.",
        weights: { "Tuck Boxes": 4 },
      },
      {
        id: "corrugated-presentation",
        label: "Corrugated structure with branded presentation",
        description: "An ear-lock mailer with exterior, interior, or insert options.",
        weights: { "Mailer Boxes": 4 },
      },
      {
        id: "assembled-rigid-priority",
        label: "An assembled premium rigid presentation",
        description: "A standard rigid magnetic box with presentation-led finish options.",
        weights: { "Magnetic Boxes": 4 },
      },
      {
        id: "flat-storage-priority",
        label: "Lower freight and storage volume through flat packing",
        description: "A collapsible magnetic structure that folds flat before assembly.",
        weights: { "Collapsible Magnetic Boxes": 6 },
      },
      {
        id: "flexible-priority",
        label: "A flexible bag, pouch, or rollstock format",
        description: "Flexible packaging rather than a folding, corrugated, or rigid box.",
        weights: { "Mylar Bags": 5 },
      },
      {
        id: "priority-unsure",
        label: "No fixed priority yet",
        description: "Keep the practical priority open for project review.",
        weights: {},
      },
    ],
  },
];

function findOption(questionId: string, optionId: string) {
  return formatFinderQuestions
    .find((question) => question.id === questionId)
    ?.options.find((option) => option.id === optionId);
}

export function rankPackagingFormats(answers: FormatFinderAnswers) {
  const scores = new Map<ProductFamily, number>(
    productFamilies.map((family) => [family, 0])
  );
  const matches = new Map<ProductFamily, string[]>(
    productFamilies.map((family) => [family, []])
  );

  for (const [questionId, optionId] of Object.entries(answers)) {
    const option = findOption(questionId, optionId);
    if (!option) continue;

    for (const family of productFamilies) {
      const weight = option.weights[family] ?? 0;
      if (weight <= 0) continue;
      scores.set(family, (scores.get(family) ?? 0) + weight);
      matches.get(family)?.push(option.label);
    }
  }

  return productFamilies
    .map<FormatFinderRank>((family) => ({
      family,
      score: scores.get(family) ?? 0,
      matchedAnswers: matches.get(family) ?? [],
    }))
    .sort((first, second) => second.score - first.score);
}

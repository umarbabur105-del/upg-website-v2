import type { ProductFamily } from "@/data/products";

export type FormatFinderGoalId =
  | "one-product"
  | "kit-or-unboxing"
  | "premium-presentation"
  | "flexible-packaging"
  | "not-sure";

export type FormatFinderResultType = "clear" | "comparison" | "human-review";

export interface FormatFinderGoal {
  id: FormatFinderGoalId;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface FormatFinderFollowUpOption {
  id: string;
  label: string;
  description: string;
  previewFamily?: ProductFamily;
  recommendation: FormatFinderRecommendation;
}

export interface FormatFinderFollowUp {
  title: string;
  helpText: string;
  options: FormatFinderFollowUpOption[];
}

export interface FormatFinderRecommendation {
  primaryFamily: ProductFamily | null;
  alternateFamily?: ProductFamily;
  resultType: FormatFinderResultType;
  reasons: string[];
  alternateComparison?: string;
}

export interface FormatFamilyGuidance {
  plainDescription: string;
  goodFit: string;
  notTheFit: string;
}

export const formatFinderGoals: FormatFinderGoal[] = [
  {
    id: "one-product",
    title: "A box around one product",
    description: "For a cosmetic, food, supplement, retail, or similar individual item.",
    image: "/images/generated/tuck-boxes/tuck-boxes-hero-v1.png",
    imageAlt: "Printed tuck boxes for individual products",
  },
  {
    id: "kit-or-unboxing",
    title: "A box for a kit or unboxing",
    description: "For several items, PR kits, subscriptions, launches, or ecommerce presentation.",
    image: "/images/generated/mailer-boxes/mailer-boxes-hero-v1.png",
    imageAlt: "Printed mailer box for kits and branded unboxing",
  },
  {
    id: "premium-presentation",
    title: "A premium gift or presentation box",
    description: "For a firm luxury feel, gift set, launch collection, or high-end presentation.",
    image: "/images/generated/magnetic-boxes/magnetic-boxes-hero-v1.png",
    imageAlt: "Premium magnetic presentation box",
  },
  {
    id: "flexible-packaging",
    title: "A printed bag, pouch, or film",
    description: "For coffee, food, supplements, liquids, or another flexible-packaging project.",
    image: "/images/generated/mylar-bags/mylar-bags-hero-v1.png",
    imageAlt: "Printed flexible bags and pouches",
  },
  {
    id: "not-sure",
    title: "I am not sure yet",
    description: "Show me one simple question to narrow it down.",
  },
];

const tuckRecommendation: FormatFinderRecommendation = {
  primaryFamily: "Tuck Boxes",
  resultType: "clear",
  reasons: [
    "One product needs its own printed outer carton.",
    "You are not asking for a multi-item unboxing box, rigid gift box, or flexible pouch.",
  ],
};

const mailerRecommendation: FormatFinderRecommendation = {
  primaryFamily: "Mailer Boxes",
  resultType: "clear",
  reasons: [
    "Several items need to sit together in one branded presentation.",
    "The opening and unboxing experience matters more than a small retail carton.",
  ],
};

const magneticRecommendation: FormatFinderRecommendation = {
  primaryFamily: "Magnetic Boxes",
  resultType: "clear",
  reasons: [
    "You want a firm, premium presentation with a magnetic closure.",
    "Having the box arrive in its assembled rigid form suits your preference.",
  ],
};

const collapsibleRecommendation: FormatFinderRecommendation = {
  primaryFamily: "Collapsible Magnetic Boxes",
  resultType: "clear",
  reasons: [
    "You want a premium magnetic presentation.",
    "Flat storage before setup is important to the project.",
  ],
};

const mylarRecommendation: FormatFinderRecommendation = {
  primaryFamily: "Mylar Bags",
  resultType: "clear",
  reasons: [
    "Your brief is for a bag, pouch, or printed film rather than a box.",
    "UPG can review the exact flexible structure after the product details are shared.",
  ],
};

export const formatFinderFollowUps: Record<FormatFinderGoalId, FormatFinderFollowUp> = {
  "one-product": {
    title: "Which picture is closer to the job?",
    helpText: "This separates a carton around one item from a box that holds a set.",
    options: [
      {
        id: "individual-carton",
        label: "One printed box around one product",
        description: "The product gets its own folding carton.",
        previewFamily: "Tuck Boxes",
        recommendation: tuckRecommendation,
      },
      {
        id: "several-items",
        label: "Several items together in one box",
        description: "The box is part of a kit, launch, subscription, or unboxing.",
        previewFamily: "Mailer Boxes",
        recommendation: mailerRecommendation,
      },
      {
        id: "one-product-unsure",
        label: "I cannot tell yet",
        description: "Start with a tuck box, but compare a mailer before approving the structure.",
        recommendation: {
          primaryFamily: "Tuck Boxes",
          alternateFamily: "Mailer Boxes",
          resultType: "comparison",
          reasons: [
            "Your first answer points to packaging around one product.",
            "The final choice depends on whether it is an individual carton or a multi-item presentation.",
          ],
          alternateComparison:
            "Choose a mailer instead if several items need to sit together in one branded unboxing box.",
        },
      },
    ],
  },
  "kit-or-unboxing": {
    title: "What should the box feel like?",
    helpText: "Choose the experience you want when the customer opens it.",
    options: [
      {
        id: "corrugated-unboxing",
        label: "A branded box that opens like a mailer",
        description: "A practical unboxing format for kits, subscriptions, launches, or ecommerce.",
        previewFamily: "Mailer Boxes",
        recommendation: mailerRecommendation,
      },
      {
        id: "premium-rigid-feel",
        label: "A firm, luxury gift-box feel",
        description: "A premium rigid presentation with a magnetic closure.",
        previewFamily: "Magnetic Boxes",
        recommendation: {
          primaryFamily: "Magnetic Boxes",
          alternateFamily: "Collapsible Magnetic Boxes",
          resultType: "comparison",
          reasons: [
            "Several items need a premium presentation rather than a corrugated unboxing box.",
            "A magnetic closure matches the firm, gift-box experience you selected.",
          ],
          alternateComparison:
            "Compare the collapsible version if the same premium look should fold flat before setup.",
        },
      },
      {
        id: "kit-unsure",
        label: "I am not sure which feel is right",
        description: "Start with the mailer and compare a magnetic box before approval.",
        recommendation: {
          primaryFamily: "Mailer Boxes",
          alternateFamily: "Magnetic Boxes",
          resultType: "comparison",
          reasons: [
            "Your project is built around a kit, set, or unboxing experience.",
            "A corrugated mailer is the more practical starting point while the desired feel is still open.",
          ],
          alternateComparison:
            "Choose a magnetic box instead if a firm, luxury gift-box feel matters more than a corrugated unboxing format.",
        },
      },
    ],
  },
  "premium-presentation": {
    title: "How should the premium box arrive or store?",
    helpText: "This is the main difference between UPG's two magnetic-box families.",
    options: [
      {
        id: "assembled-rigid",
        label: "Ready in its rigid shape",
        description: "The firm presentation is more important than flat storage.",
        previewFamily: "Magnetic Boxes",
        recommendation: magneticRecommendation,
      },
      {
        id: "stores-flat",
        label: "Folds flat before setup",
        description: "Flat storage matters, and the box can be assembled before presentation.",
        previewFamily: "Collapsible Magnetic Boxes",
        recommendation: collapsibleRecommendation,
      },
      {
        id: "premium-unsure",
        label: "I need to compare both",
        description: "See the assembled and collapsible options side by side.",
        recommendation: {
          primaryFamily: "Magnetic Boxes",
          alternateFamily: "Collapsible Magnetic Boxes",
          resultType: "comparison",
          reasons: [
            "Your project needs a premium magnetic presentation.",
            "You have not yet decided between an assembled structure and flat storage.",
          ],
          alternateComparison:
            "The collapsible version folds flat before setup; the standard magnetic box keeps its assembled rigid form.",
        },
      },
    ],
  },
  "flexible-packaging": {
    title: "Which flexible format is closest?",
    helpText: "Both choices stay in the Mylar Bags family; UPG confirms the exact structure after review.",
    options: [
      {
        id: "finished-pouch",
        label: "A finished bag or pouch",
        description: "For example a stand-up pouch, coffee bag, spout bag, or another approved format.",
        previewFamily: "Mylar Bags",
        recommendation: mylarRecommendation,
      },
      {
        id: "printed-rollstock",
        label: "Printed film on a roll",
        description: "Rollstock film for a packing process that will be reviewed with the project details.",
        previewFamily: "Mylar Bags",
        recommendation: {
          ...mylarRecommendation,
          reasons: [
            "Your brief is for printed film on a roll rather than a box or finished pouch.",
            "UPG will review the product, packing process, and exact film specification before approval.",
          ],
        },
      },
      {
        id: "flexible-unsure",
        label: "I do not know the exact flexible format",
        description: "UPG can help narrow the bag, pouch, or rollstock route after product review.",
        recommendation: mylarRecommendation,
      },
    ],
  },
  "not-sure": {
    title: "What should the packaging do?",
    helpText: "Choose the closest real-life outcome. You do not need to know packaging terms.",
    options: [
      {
        id: "protect-one-product",
        label: "Sit around one product",
        description: "Like a printed carton around a cosmetic, food, supplement, or retail item.",
        previewFamily: "Tuck Boxes",
        recommendation: tuckRecommendation,
      },
      {
        id: "present-a-set",
        label: "Hold a kit or several items",
        description: "For an unboxing, launch, subscription, PR, or ecommerce presentation.",
        previewFamily: "Mailer Boxes",
        recommendation: mailerRecommendation,
      },
      {
        id: "feel-like-a-gift-box",
        label: "Feel like a premium gift box",
        description: "A firm magnetic presentation; assembled and flat-pack versions can be compared.",
        previewFamily: "Magnetic Boxes",
        recommendation: {
          primaryFamily: "Magnetic Boxes",
          alternateFamily: "Collapsible Magnetic Boxes",
          resultType: "comparison",
          reasons: [
            "The experience you described is a premium gift or presentation box.",
            "A magnetic closure is the closest starting family while storage preference is still open.",
          ],
          alternateComparison:
            "Compare the collapsible version if the box should fold flat before setup.",
        },
      },
      {
        id: "be-a-pouch",
        label: "Be a bag, pouch, or printed film",
        description: "A flexible format rather than a folding, corrugated, or rigid box.",
        previewFamily: "Mylar Bags",
        recommendation: mylarRecommendation,
      },
      {
        id: "still-unsure",
        label: "I still cannot tell",
        description: "Send the product and intended use for a human recommendation.",
        recommendation: {
          primaryFamily: null,
          resultType: "human-review",
          reasons: [
            "There is not enough information to recommend one family honestly.",
            "A product photo, dimensions, quantity, and intended use will help UPG narrow the route.",
          ],
        },
      },
    ],
  },
};

export const formatFamilyGuidance: Record<ProductFamily, FormatFamilyGuidance> = {
  "Tuck Boxes": {
    plainDescription: "A printed folding carton made to sit around one product.",
    goodFit: "One product needs its own retail or secondary carton.",
    notTheFit: "You need a multi-item kit, rigid gift box, or flexible pouch.",
  },
  "Mailer Boxes": {
    plainDescription: "A corrugated ear-lock box for kits, launches, and branded unboxing.",
    goodFit: "Several items need one presentation or unboxing box.",
    notTheFit: "You need a standard shipping or master carton, which UPG does not supply.",
  },
  "Magnetic Boxes": {
    plainDescription: "An assembled rigid box with a magnetic closure for premium presentation.",
    goodFit: "A firm, premium gift-box feel matters most.",
    notTheFit: "The box needs to fold flat before setup.",
  },
  "Collapsible Magnetic Boxes": {
    plainDescription: "A premium magnetic presentation box that folds flat before setup.",
    goodFit: "You want premium presentation with more efficient flat storage.",
    notTheFit: "You want the box supplied in a fixed assembled rigid form.",
  },
  "Mylar Bags": {
    plainDescription: "Printed flexible packaging supplied as an approved bag, pouch, or rollstock format.",
    goodFit: "Your project needs flexible packaging rather than a box.",
    notTheFit: "You need a folding carton, corrugated mailer, or rigid presentation box.",
  },
};

function findGoal(goalId: string | null | undefined) {
  return formatFinderGoals.find((goal) => goal.id === goalId);
}

function findFollowUpOption(
  goalId: FormatFinderGoalId,
  followUpId: string | null | undefined
) {
  return formatFinderFollowUps[goalId].options.find(
    (option) => option.id === followUpId
  );
}

export function getFormatFinderRecommendation(
  goalId: FormatFinderGoalId | null | undefined,
  followUpId: string | null | undefined
) {
  if (!goalId || !findGoal(goalId)) return null;
  return findFollowUpOption(goalId, followUpId)?.recommendation ?? null;
}

export function buildFormatFinderQuoteNote(
  goalId: FormatFinderGoalId,
  followUpId: string,
  recommendation: FormatFinderRecommendation
) {
  const goal = findGoal(goalId);
  const followUp = findFollowUpOption(goalId, followUpId);
  const suggestedFamily = recommendation.primaryFamily ?? "Human recommendation requested";

  return `Packaging picker answers: ${goal?.title}; ${followUp?.label}. Suggested starting point: ${suggestedFamily}.`;
}

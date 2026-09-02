import type { ProductFamily } from "@/data/products";

export type PackagingFamilyOrUnknown = ProductFamily | "Not sure yet";
export type MeasurementUnit = "in" | "cm" | "mm";

export const PLANNING_MOQ_UNITS = 250;

export const productFamilies: ProductFamily[] = [
  "Tuck Boxes",
  "Mailer Boxes",
  "Magnetic Boxes",
  "Collapsible Magnetic Boxes",
  "Mylar Bags",
];

export const productStyles: Record<PackagingFamilyOrUnknown, readonly string[]> = {
  "Tuck Boxes": [
    "Straight Tuck End",
    "Reverse Tuck End",
    "Auto-Lock Box",
    "Interlock Box",
    "Seal-End Box",
    "Not sure — recommend",
  ],
  "Mailer Boxes": [
    "Ear-Lock Mailer Box",
    "PR / Presentation Mailer",
    "Subscription Mailer",
    "Not sure — recommend",
  ],
  "Magnetic Boxes": ["Standard Magnetic Box", "Not sure — recommend"],
  "Collapsible Magnetic Boxes": [
    "Collapsible / Flat-Pack Magnetic Box",
    "Not sure — recommend",
  ],
  "Mylar Bags": [
    "Three-Side Seal Bag",
    "Flat-Bottom Bag",
    "Stand-Up Pouch",
    "Spout Bag",
    "Child-Resistant Bag — requirements reviewed per project",
    "Coffee Bag",
    "Rollstock Film",
    "Not sure — recommend",
  ],
  "Not sure yet": ["Recommend a structure for me"],
};

export const materialOptions: Record<PackagingFamilyOrUnknown, readonly string[]> = {
  "Tuck Boxes": [
    "SBS C1S",
    "SBS C2S",
    "Brown kraft",
    "White kraft",
    "Black kraft",
    "CCNB",
    "Chipboard",
    "Corrugated board",
    "Not sure — recommend",
  ],
  "Mailer Boxes": ["Corrugated board", "Not sure — recommend"],
  "Magnetic Boxes": ["Rigid construction", "Not sure — recommend"],
  "Collapsible Magnetic Boxes": [
    "Collapsible rigid construction",
    "Not sure — recommend",
  ],
  "Mylar Bags": [
    "Flexible film selected after product review",
    "Not sure — recommend",
  ],
  "Not sure yet": ["Not sure — recommend"],
};

export const finishOptions = [
  "Soft-touch matte",
  "Foil stamping",
  "Embossing",
  "Debossing",
  "Spot UV",
  "Gloss",
  "Matte",
  "Window",
  "Not sure — recommend",
] as const;

export interface FinishedDimensions {
  length: number;
  width: number;
  height: number;
}

export interface PlanningMoqResult {
  units: number | null;
  label: string;
  note: string;
  needsDimensions: boolean;
}

export type PlanningQuantityValidation =
  | { valid: true; units: number; label: string }
  | { valid: false; error: string };

function dimensionsAreValid(dimensions?: FinishedDimensions) {
  if (!dimensions) return false;
  return [dimensions.length, dimensions.width, dimensions.height].every(
    (dimension) => Number.isFinite(dimension) && dimension > 0
  );
}

export function getPlanningMoq(
  family: ProductFamily | ""
): PlanningMoqResult {
  if (!family) {
    return {
      units: null,
      label: "Choose a product family",
      note: "Select a product family to see its planning MOQ.",
      needsDimensions: false,
    };
  }

  return {
    units: PLANNING_MOQ_UNITS,
    label: `${PLANNING_MOQ_UNITS} units`,
    note: "Planning MOQ for every UPG custom product family, regardless of finished size.",
    needsDimensions: false,
  };
}

export function validatePlanningQuantity(
  value: string
): PlanningQuantityValidation {
  const normalized = value.trim().toLowerCase().replaceAll(",", "");
  const match = normalized.match(
    /^(\d+)\s*\+?\s*(?:units?|pcs?|pieces?)?$/
  );
  const units = match ? Number(match[1]) : Number.NaN;

  if (!Number.isSafeInteger(units)) {
    return {
      valid: false,
      error: `Enter one whole-number quantity of ${PLANNING_MOQ_UNITS} units or more. Add quantity breaks in the project notes.`,
    };
  }

  if (units < PLANNING_MOQ_UNITS) {
    return {
      valid: false,
      error: `UPG's planning MOQ is ${PLANNING_MOQ_UNITS} units for every custom product family.`,
    };
  }

  return {
    valid: true,
    units,
    label: `${units.toLocaleString("en-US")} units`,
  };
}

export function formatFinishedDimensions(
  dimensions: FinishedDimensions | undefined,
  unit: MeasurementUnit
) {
  if (!dimensionsAreValid(dimensions)) return "";
  return `${dimensions!.length} × ${dimensions!.width} × ${dimensions!.height} ${unit}`;
}

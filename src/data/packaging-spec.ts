import type { ProductFamily } from "@/data/products";

export type PackagingFamilyOrUnknown = ProductFamily | "Not sure yet";
export type MeasurementUnit = "in" | "cm" | "mm";

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

function toInches(value: number, unit: MeasurementUnit) {
  if (unit === "cm") return value / 2.54;
  if (unit === "mm") return value / 25.4;
  return value;
}

function dimensionsAreValid(dimensions?: FinishedDimensions) {
  if (!dimensions) return false;
  return [dimensions.length, dimensions.width, dimensions.height].every(
    (dimension) => Number.isFinite(dimension) && dimension > 0
  );
}

export function getPlanningMoq(
  family: ProductFamily | "",
  dimensions: FinishedDimensions | undefined,
  unit: MeasurementUnit
): PlanningMoqResult {
  if (!family) {
    return {
      units: null,
      label: "Choose a product family",
      note: "Select a product family to see its planning MOQ.",
      needsDimensions: false,
    };
  }

  if (family === "Magnetic Boxes" || family === "Collapsible Magnetic Boxes") {
    return {
      units: 250,
      label: "250 units",
      note: "Planning MOQ for this product family, regardless of finished size.",
      needsDimensions: false,
    };
  }

  if (family === "Mylar Bags") {
    return {
      units: 500,
      label: "500 units",
      note: "Planning MOQ for the approved Mylar bag range.",
      needsDimensions: false,
    };
  }

  if (!dimensionsAreValid(dimensions)) {
    return {
      units: null,
      label: "Add all three dimensions",
      note: "Tuck box and mailer box MOQs are based on the largest finished dimension.",
      needsDimensions: true,
    };
  }

  const largestDimensionInches = Math.max(
    toInches(dimensions!.length, unit),
    toInches(dimensions!.width, unit),
    toInches(dimensions!.height, unit)
  );
  const tolerance = 0.000001;

  if (largestDimensionInches <= 5 + tolerance) {
    return {
      units: 1000,
      label: "1,000 units",
      note: "Every finished dimension is 5 inches or less.",
      needsDimensions: false,
    };
  }

  if (largestDimensionInches <= 10 + tolerance) {
    return {
      units: 500,
      label: "500 units",
      note: "The largest finished dimension is over 5 inches and no more than 10 inches.",
      needsDimensions: false,
    };
  }

  return {
    units: 250,
    label: "250 units",
    note: "The largest finished dimension is over 10 inches.",
    needsDimensions: false,
  };
}

export function formatFinishedDimensions(
  dimensions: FinishedDimensions | undefined,
  unit: MeasurementUnit
) {
  if (!dimensionsAreValid(dimensions)) return "";
  return `${dimensions!.length} × ${dimensions!.width} × ${dimensions!.height} ${unit}`;
}

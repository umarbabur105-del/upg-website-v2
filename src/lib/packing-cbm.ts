export type PackingDimensionUnit = "in" | "cm" | "mm";
export type PackingWeightUnit = "g" | "oz";

export interface PackingDimensions {
  length: number;
  width: number;
  height: number;
}

export interface PackingLayout {
  length: number;
  width: number;
  height: number;
}

export interface PackingCalculatorInput {
  unitDimensions: PackingDimensions;
  dimensionUnit: PackingDimensionUnit;
  quantity: number;
  layout: PackingLayout;
  outerAllowance: number;
  unitWeight?: number;
  cartonTareWeight?: number;
  weightUnit: PackingWeightUnit;
  dimensionalWeightDivisor: 5000 | 6000;
}

export interface PackingCalculatorResult {
  unitsPerCarton: number;
  cartonCount: number;
  lastCartonUnits: number;
  cartonDimensions: PackingDimensions;
  cartonDimensionsCm: PackingDimensions;
  cbmPerCarton: number;
  totalCbm: number;
  netWeightKg: number | null;
  grossWeightKg: number | null;
  dimensionalWeightPerCartonKg: number;
  totalDimensionalWeightKg: number;
}

const dimensionToCentimeters: Record<PackingDimensionUnit, number> = {
  in: 2.54,
  cm: 1,
  mm: 0.1,
};

const weightToKilograms: Record<PackingWeightUnit, number> = {
  g: 0.001,
  oz: 0.028349523125,
};

function isPositiveFinite(value: number) {
  return Number.isFinite(value) && value > 0;
}

function isPositiveSafeInteger(value: number) {
  return Number.isSafeInteger(value) && value > 0;
}

function validDimensions(dimensions: PackingDimensions) {
  return [dimensions.length, dimensions.width, dimensions.height].every(
    isPositiveFinite
  );
}

function validLayout(layout: PackingLayout) {
  return [layout.length, layout.width, layout.height].every(
    isPositiveSafeInteger
  );
}

export function calculatePackingEstimate(
  input: PackingCalculatorInput
): PackingCalculatorResult | null {
  if (
    !validDimensions(input.unitDimensions) ||
    !validLayout(input.layout) ||
    !isPositiveSafeInteger(input.quantity) ||
    !Number.isFinite(input.outerAllowance) ||
    input.outerAllowance < 0 ||
    (input.unitWeight !== undefined && !isPositiveFinite(input.unitWeight)) ||
    (input.cartonTareWeight !== undefined &&
      (!Number.isFinite(input.cartonTareWeight) || input.cartonTareWeight < 0))
  ) {
    return null;
  }

  const unitsPerCarton =
    input.layout.length * input.layout.width * input.layout.height;
  if (!Number.isSafeInteger(unitsPerCarton) || unitsPerCarton <= 0) return null;

  const cartonCount = Math.ceil(input.quantity / unitsPerCarton);
  const lastCartonUnits = input.quantity % unitsPerCarton || unitsPerCarton;
  const cartonDimensions: PackingDimensions = {
    length:
      input.unitDimensions.length * input.layout.length + input.outerAllowance,
    width: input.unitDimensions.width * input.layout.width + input.outerAllowance,
    height:
      input.unitDimensions.height * input.layout.height + input.outerAllowance,
  };
  const centimeterFactor = dimensionToCentimeters[input.dimensionUnit];
  const cartonDimensionsCm: PackingDimensions = {
    length: cartonDimensions.length * centimeterFactor,
    width: cartonDimensions.width * centimeterFactor,
    height: cartonDimensions.height * centimeterFactor,
  };
  const cartonVolumeCm3 =
    cartonDimensionsCm.length *
    cartonDimensionsCm.width *
    cartonDimensionsCm.height;
  const cbmPerCarton = cartonVolumeCm3 / 1_000_000;
  const totalCbm = cbmPerCarton * cartonCount;
  const dimensionalWeightPerCartonKg =
    cartonVolumeCm3 / input.dimensionalWeightDivisor;
  const totalDimensionalWeightKg =
    dimensionalWeightPerCartonKg * cartonCount;

  const weightFactor = weightToKilograms[input.weightUnit];
  const netWeightKg =
    input.unitWeight === undefined
      ? null
      : input.unitWeight * weightFactor * input.quantity;
  const grossWeightKg =
    netWeightKg === null || input.cartonTareWeight === undefined
      ? null
      : netWeightKg +
        input.cartonTareWeight * weightFactor * cartonCount;

  if (
    ![
      cartonDimensions.length,
      cartonDimensions.width,
      cartonDimensions.height,
      cbmPerCarton,
      totalCbm,
      dimensionalWeightPerCartonKg,
      totalDimensionalWeightKg,
    ].every(Number.isFinite)
  ) {
    return null;
  }

  return {
    unitsPerCarton,
    cartonCount,
    lastCartonUnits,
    cartonDimensions,
    cartonDimensionsCm,
    cbmPerCarton,
    totalCbm,
    netWeightKg,
    grossWeightKg,
    dimensionalWeightPerCartonKg,
    totalDimensionalWeightKg,
  };
}

export function kilogramsToPounds(value: number) {
  return value * 2.2046226218;
}

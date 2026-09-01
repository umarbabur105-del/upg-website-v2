"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { productFamilies } from "@/data/packaging-spec";
import type { ProductFamily } from "@/data/products";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  calculatePackingEstimate,
  kilogramsToPounds,
  type PackingDimensionUnit,
  type PackingWeightUnit,
} from "@/lib/packing-cbm";

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-foreground outline-none transition-colors focus:border-moss focus:ring-2 focus:ring-moss/15";

type DimensionFields = {
  length: string;
  width: string;
  height: string;
};

const dimensionToCentimeters: Record<PackingDimensionUnit, number> = {
  cm: 1,
  in: 2.54,
  mm: 0.1,
};

function parsePositiveNumber(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function parseNonNegativeNumber(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parsePositiveInteger(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function formatNumber(value: number, maximumFractionDigits = 3) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

function formatWeight(valueKg: number) {
  return `${formatNumber(valueKg, 2)} kg / ${formatNumber(
    kilogramsToPounds(valueKg),
    2
  )} lb`;
}

function convertDimensionValue(
  value: string,
  from: PackingDimensionUnit,
  to: PackingDimensionUnit
) {
  if (!value.trim()) return value;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return value;
  const converted =
    (parsed * dimensionToCentimeters[from]) / dimensionToCentimeters[to];
  return Number(converted.toFixed(4)).toString();
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
      {children}
    </label>
  );
}

function StepHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss text-sm font-semibold text-primary-foreground">
        {number}
      </div>
      <div>
        <h2 className="font-serif text-2xl text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function PackingCbmCalculator() {
  const [family, setFamily] = useState<ProductFamily | "">("");
  const [dimensionUnit, setDimensionUnit] =
    useState<PackingDimensionUnit>("cm");
  const [unitDimensions, setUnitDimensions] = useState<DimensionFields>({
    length: "",
    width: "",
    height: "",
  });
  const [quantity, setQuantity] = useState("");
  const [layout, setLayout] = useState<DimensionFields>({
    length: "2",
    width: "2",
    height: "5",
  });
  const [outerAllowance, setOuterAllowance] = useState("2");
  const [weightUnit, setWeightUnit] = useState<PackingWeightUnit>("g");
  const [unitWeight, setUnitWeight] = useState("");
  const [cartonTareWeight, setCartonTareWeight] = useState("");
  const [dimensionalWeightDivisor, setDimensionalWeightDivisor] = useState<
    5000 | 6000
  >(5000);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const trackedSignature = useRef("");

  const layoutCapacity = useMemo(() => {
    const across = parsePositiveInteger(layout.length);
    const deep = parsePositiveInteger(layout.width);
    const layers = parsePositiveInteger(layout.height);
    if (!across || !deep || !layers) return null;
    const capacity = across * deep * layers;
    return Number.isSafeInteger(capacity) ? capacity : null;
  }, [layout]);

  const result = useMemo(() => {
    const length = parsePositiveNumber(unitDimensions.length);
    const width = parsePositiveNumber(unitDimensions.width);
    const height = parsePositiveNumber(unitDimensions.height);
    const quantityValue = parsePositiveInteger(quantity);
    const layoutLength = parsePositiveInteger(layout.length);
    const layoutWidth = parsePositiveInteger(layout.width);
    const layoutHeight = parsePositiveInteger(layout.height);
    const allowanceValue = parseNonNegativeNumber(outerAllowance);

    if (
      length === undefined ||
      width === undefined ||
      height === undefined ||
      quantityValue === undefined ||
      layoutLength === undefined ||
      layoutWidth === undefined ||
      layoutHeight === undefined ||
      allowanceValue === undefined
    ) {
      return null;
    }

    return calculatePackingEstimate({
      unitDimensions: { length, width, height },
      dimensionUnit,
      quantity: quantityValue,
      layout: {
        length: layoutLength,
        width: layoutWidth,
        height: layoutHeight,
      },
      outerAllowance: allowanceValue,
      unitWeight: parsePositiveNumber(unitWeight),
      cartonTareWeight: parseNonNegativeNumber(cartonTareWeight),
      weightUnit,
      dimensionalWeightDivisor,
    });
  }, [
    cartonTareWeight,
    dimensionUnit,
    dimensionalWeightDivisor,
    layout,
    outerAllowance,
    quantity,
    unitDimensions,
    unitWeight,
    weightUnit,
  ]);

  const summary = useMemo(() => {
    if (!result) return "";
    const lines = [
      "UPG Carton & Shipping Space Estimate",
      `Product type: ${family || "Not selected"}`,
      `One packed item: ${unitDimensions.length} × ${unitDimensions.width} × ${unitDimensions.height} ${dimensionUnit}`,
      `Total items: ${formatNumber(Number(quantity), 0)}`,
      `Carton arrangement: ${layout.length} across × ${layout.width} deep × ${layout.height} layers`,
      `Items per carton: ${formatNumber(result.unitsPerCarton, 0)}`,
      `Cartons needed: ${formatNumber(result.cartonCount, 0)}`,
      `Estimated carton size: ${formatNumber(result.cartonDimensions.length)} × ${formatNumber(result.cartonDimensions.width)} × ${formatNumber(result.cartonDimensions.height)} ${dimensionUnit}`,
      `Total shipment space (CBM): ${formatNumber(result.totalCbm, 4)}`,
      `Shipping volume weight: ${formatWeight(result.totalDimensionalWeightKg)} using factor ${dimensionalWeightDivisor}`,
    ];

    if (result.netWeightKg !== null) {
      lines.push(`Weight of all packed items: ${formatWeight(result.netWeightKg)}`);
    }
    if (result.grossWeightKg !== null) {
      lines.push(
        `Estimated total shipment weight: ${formatWeight(result.grossWeightKg)}`
      );
    }
    lines.push(
      "Planning estimate only. Confirm the final carton, packing method, weight, and carrier rules before shipping."
    );
    return lines.join("\n");
  }, [
    dimensionUnit,
    dimensionalWeightDivisor,
    family,
    layout.height,
    layout.length,
    layout.width,
    quantity,
    result,
    unitDimensions.height,
    unitDimensions.length,
    unitDimensions.width,
  ]);

  const quoteHref = useMemo(() => {
    if (!result) return "/get-a-quote";
    const params = new URLSearchParams();
    const quoteSummary = [
      "UPG Carton & Shipping Space Estimate",
      `One packed item: ${unitDimensions.length} × ${unitDimensions.width} × ${unitDimensions.height} ${dimensionUnit}`,
      `Carton arrangement: ${layout.length} across × ${layout.width} deep × ${layout.height} layers; ${formatNumber(result.unitsPerCarton, 0)} items/carton`,
      `Estimate: ${formatNumber(result.cartonCount, 0)} cartons; ${formatNumber(result.cartonDimensions.length)} × ${formatNumber(result.cartonDimensions.width)} × ${formatNumber(result.cartonDimensions.height)} ${dimensionUnit} each; ${formatNumber(result.totalCbm, 4)} total CBM`,
      result.grossWeightKg === null
        ? `Shipping volume weight: ${formatWeight(result.totalDimensionalWeightKg)}`
        : `Estimated total weight: ${formatWeight(result.grossWeightKg)}; shipping volume weight: ${formatWeight(result.totalDimensionalWeightKg)}`,
      "Planning only; please confirm the final packing and shipping details.",
    ].join("\n");
    params.set("product", family || "Not sure yet");
    params.set("quantity", quantity);
    params.set(
      "dimensions",
      `${unitDimensions.length} × ${unitDimensions.width} × ${unitDimensions.height} ${dimensionUnit} packed item`
    );
    params.set("builder_note", quoteSummary);
    return `/get-a-quote?${params.toString()}`;
  }, [dimensionUnit, family, layout, quantity, result, unitDimensions]);

  useEffect(() => {
    if (!result) {
      trackedSignature.current = "";
      return;
    }
    const signature = [
      family,
      dimensionUnit,
      unitDimensions.length,
      unitDimensions.width,
      unitDimensions.height,
      quantity,
      layout.length,
      layout.width,
      layout.height,
      outerAllowance,
      dimensionalWeightDivisor,
    ].join("|");
    if (trackedSignature.current === signature) return;
    trackedSignature.current = signature;
    trackAnalyticsEvent("packing_cbm_result", {
      product_family: family || "not_selected",
      dimension_unit: dimensionUnit,
      carton_count: result.cartonCount,
      units_per_carton: result.unitsPerCarton,
      total_cbm: Number(result.totalCbm.toFixed(4)),
      dimensional_weight_divisor: dimensionalWeightDivisor,
      has_measured_unit_weight: result.netWeightKg !== null,
      has_carton_tare_weight: result.grossWeightKg !== null,
    });
  }, [
    dimensionUnit,
    dimensionalWeightDivisor,
    family,
    layout.height,
    layout.length,
    layout.width,
    outerAllowance,
    quantity,
    result,
    unitDimensions.height,
    unitDimensions.length,
    unitDimensions.width,
  ]);

  async function copySummary() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("copied");
      trackAnalyticsEvent("packing_cbm_copy", {
        product_family: family || "not_selected",
        carton_count: result?.cartonCount,
      });
    } catch {
      setCopyStatus("error");
    }
  }

  function updateDimensions(
    setter: React.Dispatch<React.SetStateAction<DimensionFields>>,
    key: keyof DimensionFields,
    value: string
  ) {
    setter((current) => ({ ...current, [key]: value }));
    setCopyStatus("idle");
  }

  function changeDimensionUnit(nextUnit: PackingDimensionUnit) {
    if (nextUnit === dimensionUnit) return;
    setUnitDimensions((current) => ({
      length: convertDimensionValue(current.length, dimensionUnit, nextUnit),
      width: convertDimensionValue(current.width, dimensionUnit, nextUnit),
      height: convertDimensionValue(current.height, dimensionUnit, nextUnit),
    }));
    setOuterAllowance((current) =>
      convertDimensionValue(current, dimensionUnit, nextUnit)
    );
    setDimensionUnit(nextUnit);
    setCopyStatus("idle");
  }

  function trackQuoteHandoff() {
    if (!result) return;
    trackAnalyticsEvent("packing_cbm_quote_handoff", {
      product_family: family || "not_selected",
      carton_count: result.cartonCount,
      total_cbm: Number(result.totalCbm.toFixed(4)),
    });
  }

  const dimensionLabels: Array<[keyof DimensionFields, string]> = [
    ["length", "Length"],
    ["width", "Width"],
    ["height", "Height"],
  ];

  const layoutLabels: Array<[keyof DimensionFields, string]> = [
    ["length", "Across"],
    ["width", "Deep"],
    ["height", "Layers"],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="surface-card p-5 sm:p-8 lg:col-span-7">
        <div className="grid gap-8">
          <section className="grid gap-5">
            <StepHeading
              number="1"
              title="Measure one packed item"
              description="Measure it as it will sit inside the shipping carton. A tape measure is enough."
            />

            <div className="space-y-2 sm:max-w-xs">
              <FieldLabel htmlFor="packing-dimension-unit">
                I am measuring in
              </FieldLabel>
              <select
                id="packing-dimension-unit"
                value={dimensionUnit}
                onChange={(event) =>
                  changeDimensionUnit(event.target.value as PackingDimensionUnit)
                }
                className={inputClass}
              >
                <option value="cm">Centimeters (cm)</option>
                <option value="in">Inches (in)</option>
                <option value="mm">Millimeters (mm)</option>
              </select>
            </div>

            <fieldset>
              <legend className="sr-only">Size of one packed item</legend>
              <div className="grid grid-cols-3 gap-3">
                {dimensionLabels.map(([key, label]) => (
                  <div key={key} className="space-y-2">
                    <FieldLabel htmlFor={`packing-unit-${key}`}>
                      {label}
                    </FieldLabel>
                    <input
                      id={`packing-unit-${key}`}
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={unitDimensions[key]}
                      onChange={(event) =>
                        updateDimensions(
                          setUnitDimensions,
                          key,
                          event.target.value
                        )
                      }
                      aria-describedby="packed-item-size-help"
                      className={inputClass}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
              <p
                id="packed-item-size-help"
                className="mt-3 text-xs leading-relaxed text-muted-foreground"
              >
                Example: a packed pouch may be 20 cm long, 12 cm wide, and 4 cm high.
              </p>
            </fieldset>
          </section>

          <section className="grid gap-5 border-t border-border pt-8">
            <StepHeading
              number="2"
              title="Enter your total quantity"
              description="How many packed items do you plan to ship?"
            />
            <div className="space-y-2 sm:max-w-xs">
              <FieldLabel htmlFor="packing-quantity">Total items</FieldLabel>
              <input
                id="packing-quantity"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                  setCopyStatus("idle");
                }}
                className={inputClass}
                placeholder="For example, 1,000"
              />
            </div>
          </section>

          <section className="grid gap-5 border-t border-border pt-8">
            <StepHeading
              number="3"
              title="Show how items fit in one carton"
              description="Count items from left to right, front to back, and then the number of layers."
            />

            <div className="rounded-xl bg-cream p-4 text-sm leading-relaxed text-foreground">
              <strong>
                {layoutCapacity
                  ? `${formatNumber(layoutCapacity, 0)} items per carton`
                  : "Enter whole numbers"}
              </strong>
              <span className="text-muted-foreground">
                {layoutCapacity
                  ? ` — ${layout.length} across × ${layout.width} deep × ${layout.height} layers.`
                  : " for each direction."}
              </span>
            </div>

            <fieldset>
              <legend className="sr-only">Items arranged inside one carton</legend>
              <div className="grid grid-cols-3 gap-3">
                {layoutLabels.map(([key, label]) => (
                  <div key={key} className="space-y-2">
                    <FieldLabel htmlFor={`packing-layout-${key}`}>
                      {label}
                    </FieldLabel>
                    <input
                      id={`packing-layout-${key}`}
                      type="number"
                      min="1"
                      step="1"
                      inputMode="numeric"
                      value={layout[key]}
                      onChange={(event) =>
                        updateDimensions(setLayout, key, event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Not sure? Keep the sample 2 × 2 × 5 for a rough estimate, then ask
                your supplier to confirm the packing arrangement.
              </p>
            </fieldset>
          </section>

          <details className="group border-t border-border pt-7">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-4 text-sm font-semibold text-foreground transition-colors hover:border-moss [&::-webkit-details-marker]:hidden">
              <span>
                Optional details
                <span className="ml-2 font-normal text-muted-foreground">
                  Product type, weights, and carrier settings
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>

            <div className="mt-6 grid gap-7 rounded-xl bg-cream/60 p-4 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel htmlFor="packing-family">
                    Product or packaging type
                  </FieldLabel>
                  <select
                    id="packing-family"
                    value={family}
                    onChange={(event) => {
                      setFamily(event.target.value as ProductFamily | "");
                      setCopyStatus("idle");
                    }}
                    className={inputClass}
                  >
                    <option value="">Not sure / skip this</option>
                    {productFamilies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor="packing-allowance">
                    Extra space for carton walls ({dimensionUnit})
                  </FieldLabel>
                  <input
                    id="packing-allowance"
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={outerAllowance}
                    onChange={(event) => {
                      setOuterAllowance(event.target.value);
                      setCopyStatus("idle");
                    }}
                    className={inputClass}
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Keep the suggested value if you are unsure. It allows a little
                    room for carton walls and packing clearance.
                  </p>
                </div>
              </div>

              <fieldset className="border-t border-border pt-6">
                <legend className="text-sm font-semibold text-foreground">
                  Add measured weights if you have them
                </legend>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Skip these fields if you only need carton count and shipment space.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <FieldLabel htmlFor="packing-weight-unit">
                      Weight unit
                    </FieldLabel>
                    <select
                      id="packing-weight-unit"
                      value={weightUnit}
                      onChange={(event) => {
                        setWeightUnit(event.target.value as PackingWeightUnit);
                        setCopyStatus("idle");
                      }}
                      className={inputClass}
                    >
                      <option value="g">Grams (g)</option>
                      <option value="oz">Ounces (oz)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="packing-unit-weight">
                      One packed item ({weightUnit})
                    </FieldLabel>
                    <input
                      id="packing-unit-weight"
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={unitWeight}
                      onChange={(event) => {
                        setUnitWeight(event.target.value);
                        setCopyStatus("idle");
                      }}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="packing-carton-tare">
                      Empty carton ({weightUnit})
                    </FieldLabel>
                    <input
                      id="packing-carton-tare"
                      type="number"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      value={cartonTareWeight}
                      onChange={(event) => {
                        setCartonTareWeight(event.target.value);
                        setCopyStatus("idle");
                      }}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="space-y-2 border-t border-border pt-6 sm:max-w-sm">
                <FieldLabel htmlFor="packing-divisor">
                  Carrier volume factor
                </FieldLabel>
                <select
                  id="packing-divisor"
                  value={dimensionalWeightDivisor}
                  onChange={(event) => {
                    setDimensionalWeightDivisor(
                      Number(event.target.value) as 5000 | 6000
                    );
                    setCopyStatus("idle");
                  }}
                  className={inputClass}
                >
                  <option value="5000">5,000 — common air/express</option>
                  <option value="6000">6,000 — used by some carriers</option>
                </select>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Keep 5,000 unless your carrier gives you a different number.
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:col-span-5">
        <div className="border border-border bg-moss p-5 text-primary-foreground shadow-card sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/75">
            Your estimate
          </div>
          {result ? (
            <div className="mt-5" aria-live="polite">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  ["Cartons needed", formatNumber(result.cartonCount, 0)],
                  ["Items per carton", formatNumber(result.unitsPerCarton, 0)],
                  ["Shipment space (CBM)", formatNumber(result.totalCbm, 4)],
                  [
                    "Estimated carton size",
                    `${formatNumber(result.cartonDimensions.length)} × ${formatNumber(result.cartonDimensions.width)} × ${formatNumber(result.cartonDimensions.height)} ${dimensionUnit}`,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-primary-foreground/18 bg-primary-foreground/7 p-4"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/65">
                      {label}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-primary-foreground">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-primary-foreground/80">
                CBM is the estimated space all cartons take up. Your last carton
                contains {formatNumber(result.lastCartonUnits, 0)} item
                {result.lastCartonUnits === 1 ? "" : "s"}.
              </p>

              <details className="group mt-5 border-t border-primary-foreground/20 pt-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  More shipping figures
                  <span
                    aria-hidden="true"
                    className="text-lg transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-primary-foreground/65">
                      Space per carton
                    </dt>
                    <dd className="mt-1 font-semibold">
                      {formatNumber(result.cbmPerCarton, 4)} CBM
                    </dd>
                  </div>
                  <div>
                    <dt className="text-primary-foreground/65">
                      Shipping volume weight
                    </dt>
                    <dd className="mt-1 font-semibold">
                      {formatWeight(result.totalDimensionalWeightKg)}
                    </dd>
                  </div>
                  {result.netWeightKg !== null ? (
                    <div>
                      <dt className="text-primary-foreground/65">
                        Weight of all packed items
                      </dt>
                      <dd className="mt-1 font-semibold">
                        {formatWeight(result.netWeightKg)}
                      </dd>
                    </div>
                  ) : null}
                  {result.grossWeightKg !== null ? (
                    <div>
                      <dt className="text-primary-foreground/65">
                        Estimated total shipment weight
                      </dt>
                      <dd className="mt-1 font-semibold">
                        {formatWeight(result.grossWeightKg)}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </details>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <button
                  type="button"
                  onClick={copySummary}
                  className="inline-flex justify-center rounded-full border border-primary-foreground/35 px-5 py-3 text-sm font-semibold hover:bg-primary-foreground/10"
                >
                  {copyStatus === "copied"
                    ? "Estimate copied"
                    : copyStatus === "error"
                      ? "Copy unavailable"
                      : "Copy estimate"}
                </button>
                <Link
                  href={quoteHref}
                  onClick={trackQuoteHandoff}
                  className="inline-flex justify-center rounded-full bg-primary-foreground px-5 py-3 text-center text-sm font-semibold text-primary hover:bg-cream"
                >
                  Ask UPG to review it
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5" aria-live="polite">
              <h2 className="font-serif text-3xl">Your result will appear here.</h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
                Enter the size of one packed item, your total quantity, and how
                items fit in a carton. Optional weight details can be skipped.
              </p>
              <div className="mt-6 rounded-xl bg-primary-foreground/8 p-4 text-sm leading-relaxed text-primary-foreground/80">
                No freight knowledge needed. Start with the three numbered steps.
              </div>
            </div>
          )}
        </div>

        <details className="group mt-5 border border-border bg-cream p-5 text-sm leading-relaxed text-muted-foreground">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
            Before you rely on this estimate
            <span
              aria-hidden="true"
              className="text-lg transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3">
            This is a planning estimate, not a freight quote (shipping price) or
            final carton approval. Your supplier or carrier should confirm the
            packing method, carton size, measured weight, and final shipping rules.
          </p>
        </details>
      </aside>
    </div>
  );
}

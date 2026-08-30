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
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none focus:border-moss";

type DimensionFields = {
  length: string;
  width: string;
  height: string;
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

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
    >
      {children}
    </label>
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
      "UPG Packing CBM & Weight Planning Estimate",
      `Product family: ${family || "Not selected"}`,
      `Packed unit dimensions: ${unitDimensions.length} × ${unitDimensions.width} × ${unitDimensions.height} ${dimensionUnit}`,
      `Quantity: ${formatNumber(Number(quantity), 0)} units`,
      `Packing layout: ${layout.length} × ${layout.width} × ${layout.height} units`,
      `Units per carton: ${formatNumber(result.unitsPerCarton, 0)}`,
      `Estimated cartons: ${formatNumber(result.cartonCount, 0)}`,
      `Estimated outer carton: ${formatNumber(result.cartonDimensions.length)} × ${formatNumber(result.cartonDimensions.width)} × ${formatNumber(result.cartonDimensions.height)} ${dimensionUnit}`,
      `Estimated total CBM: ${formatNumber(result.totalCbm, 4)}`,
      `Dimensional weight: ${formatWeight(result.totalDimensionalWeightKg)} at divisor ${dimensionalWeightDivisor}`,
    ];

    if (result.netWeightKg !== null) {
      lines.push(`Net packed-unit weight: ${formatWeight(result.netWeightKg)}`);
    }
    if (result.grossWeightKg !== null) {
      lines.push(`Estimated gross shipment weight: ${formatWeight(result.grossWeightKg)}`);
    }
    lines.push(
      "Planning estimate only. Confirm the packing method, master-carton specification, measured weight, and carrier rules before shipment."
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
      "UPG Packing CBM & Weight Planning Estimate",
      `Packed unit: ${unitDimensions.length} × ${unitDimensions.width} × ${unitDimensions.height} ${dimensionUnit}`,
      `Layout: ${layout.length} × ${layout.width} × ${layout.height}; ${formatNumber(result.unitsPerCarton, 0)} units/carton`,
      `Estimate: ${formatNumber(result.cartonCount, 0)} cartons; ${formatNumber(result.cartonDimensions.length)} × ${formatNumber(result.cartonDimensions.width)} × ${formatNumber(result.cartonDimensions.height)} ${dimensionUnit} each; ${formatNumber(result.totalCbm, 4)} total CBM`,
      result.grossWeightKg === null
        ? `Dimensional weight: ${formatWeight(result.totalDimensionalWeightKg)}`
        : `Gross weight: ${formatWeight(result.grossWeightKg)}; dimensional weight: ${formatWeight(result.totalDimensionalWeightKg)}`,
      "Planning only; confirm packing method, carton, measured weight, and carrier rules.",
    ].join("\n");
    params.set("product", family || "Not sure yet");
    params.set("quantity", quantity);
    params.set(
      "dimensions",
      `${unitDimensions.length} × ${unitDimensions.width} × ${unitDimensions.height} ${dimensionUnit} packed unit`
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

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="surface-card p-6 sm:p-8 lg:col-span-7">
        <div className="grid gap-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="packing-family">Packaging family</FieldLabel>
              <select
                id="packing-family"
                value={family}
                onChange={(event) => {
                  setFamily(event.target.value as ProductFamily | "");
                  setCopyStatus("idle");
                }}
                className={inputClass}
              >
                <option value="">Optional — select a family</option>
                {productFamilies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="packing-dimension-unit">
                Dimension unit
              </FieldLabel>
              <select
                id="packing-dimension-unit"
                value={dimensionUnit}
                onChange={(event) => {
                  setDimensionUnit(event.target.value as PackingDimensionUnit);
                  setCopyStatus("idle");
                }}
                className={inputClass}
              >
                <option value="cm">Centimeters</option>
                <option value="in">Inches</option>
                <option value="mm">Millimeters</option>
              </select>
            </div>
          </div>

          <fieldset>
            <legend className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Packed unit dimensions
            </legend>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use the space one packed unit occupies inside the master carton—not a
              flat dieline size.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {dimensionLabels.map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <FieldLabel htmlFor={`packing-unit-${key}`}>
                    {label} ({dimensionUnit})
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
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="packing-quantity">Total quantity</FieldLabel>
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
                placeholder="e.g. 1000"
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="packing-allowance">
                Total outer allowance ({dimensionUnit})
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
                Added once to each estimated outer carton dimension for board and
                packing clearance.
              </p>
            </div>
          </div>

          <fieldset>
            <legend className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Units arranged inside one carton
            </legend>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Enter a manual grid. Rotate the unit dimensions above if another
              orientation packs better.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {dimensionLabels.map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <FieldLabel htmlFor={`packing-layout-${key}`}>
                    Along {label.toLowerCase()}
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
          </fieldset>

          <fieldset className="border-t border-border pt-7">
            <legend className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Optional measured weight
            </legend>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Weight is calculated only from values you provide. The tool does not
              guess weight from a material name.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <FieldLabel htmlFor="packing-weight-unit">Weight unit</FieldLabel>
                <select
                  id="packing-weight-unit"
                  value={weightUnit}
                  onChange={(event) => {
                    setWeightUnit(event.target.value as PackingWeightUnit);
                    setCopyStatus("idle");
                  }}
                  className={inputClass}
                >
                  <option value="g">Grams</option>
                  <option value="oz">Ounces</option>
                </select>
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="packing-unit-weight">
                  Packed unit weight ({weightUnit})
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
                />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="packing-carton-tare">
                  Empty carton tare ({weightUnit})
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
                />
              </div>
            </div>
          </fieldset>

          <div className="space-y-2 sm:max-w-sm">
            <FieldLabel htmlFor="packing-divisor">
              Dimensional-weight divisor
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
              <option value="5000">5,000 — common air/express factor</option>
              <option value="6000">6,000 — alternate carrier factor</option>
            </select>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Carrier rules differ. Confirm the divisor and rounding method with
              the selected service.
            </p>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:col-span-5">
        <div className="border border-border bg-moss p-6 text-primary-foreground shadow-card sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/75">
            Planning result
          </div>
          {result ? (
            <div className="mt-6" aria-live="polite">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  ["Estimated cartons", formatNumber(result.cartonCount, 0)],
                  ["Units per carton", formatNumber(result.unitsPerCarton, 0)],
                  ["Total CBM", formatNumber(result.totalCbm, 4)],
                  [
                    "Estimated outer carton",
                    `${formatNumber(result.cartonDimensions.length)} × ${formatNumber(result.cartonDimensions.width)} × ${formatNumber(result.cartonDimensions.height)} ${dimensionUnit}`,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-primary-foreground/18 bg-primary-foreground/7 p-4"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/65">
                      {label}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-primary-foreground">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <dl className="mt-6 space-y-4 border-t border-primary-foreground/20 pt-6 text-sm">
                <div>
                  <dt className="text-primary-foreground/65">CBM per carton</dt>
                  <dd className="mt-1 font-semibold">
                    {formatNumber(result.cbmPerCarton, 4)} CBM
                  </dd>
                </div>
                <div>
                  <dt className="text-primary-foreground/65">
                    Total dimensional weight
                  </dt>
                  <dd className="mt-1 font-semibold">
                    {formatWeight(result.totalDimensionalWeightKg)}
                  </dd>
                </div>
                <div>
                  <dt className="text-primary-foreground/65">Net packed-unit weight</dt>
                  <dd className="mt-1 font-semibold">
                    {result.netWeightKg === null
                      ? "Add a measured packed-unit weight"
                      : formatWeight(result.netWeightKg)}
                  </dd>
                </div>
                <div>
                  <dt className="text-primary-foreground/65">
                    Estimated gross shipment weight
                  </dt>
                  <dd className="mt-1 font-semibold">
                    {result.grossWeightKg === null
                      ? "Add unit weight and carton tare"
                      : formatWeight(result.grossWeightKg)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-2 border-t border-primary-foreground/20 pt-5 text-xs leading-relaxed text-primary-foreground/75">
                <p>
                  The last carton contains {formatNumber(result.lastCartonUnits, 0)} unit
                  {result.lastCartonUnits === 1 ? "" : "s"}.
                </p>
                <p>
                  Total CBM assumes every carton uses the same estimated outer size,
                  including a partially filled last carton.
                </p>
              </div>

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
                  className="inline-flex justify-center rounded-full bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary hover:bg-cream"
                >
                  Continue to project review
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-6" aria-live="polite">
              <h2 className="font-serif text-3xl">Add the packing inputs.</h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
                Complete all three packed-unit dimensions, total quantity, carton
                layout, and a non-negative allowance. Measured weight fields are
                optional.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 border border-border bg-cream p-5 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Planning boundary:</strong> this is
          not a freight quote, carton specification, load plan, carrier approval,
          or structural review. Fold-flat boxes, flexible film, inserts, void fill,
          palletization, and carrier rounding can materially change the shipped
          result.
        </div>
      </aside>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  finishOptions,
  formatFinishedDimensions,
  getPlanningMoq,
  materialOptions,
  productFamilies,
  productStyles,
  type FinishedDimensions,
  type MeasurementUnit,
} from "@/data/packaging-spec";
import { products, type ProductFamily } from "@/data/products";
import { trackAnalyticsEvent } from "@/lib/analytics";

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none focus:border-moss";

const builderFinishOptions = finishOptions.filter(
  (finish) => finish !== "Not sure — recommend"
);

type DimensionFields = {
  length: string;
  width: string;
  height: string;
};

const emptyDimensions: DimensionFields = {
  length: "",
  width: "",
  height: "",
};

function parsePositiveNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function parsePositiveQuantity(value: string) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function parseFinishedDimensions(
  dimensions: DimensionFields
): FinishedDimensions | undefined {
  const length = parsePositiveNumber(dimensions.length);
  const width = parsePositiveNumber(dimensions.width);
  const height = parsePositiveNumber(dimensions.height);

  if (!length || !width || !height) return undefined;
  return { length, width, height };
}

function formatUnits(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
    >
      {children}
    </label>
  );
}

interface PackagingSpecBuilderProps {
  initialFamily?: ProductFamily;
  initialValues?: PackagingSpecBuilderInitialValues;
}

export interface PackagingSpecBuilderInitialValues {
  family?: ProductFamily;
  style?: string;
  dimensions?: Partial<DimensionFields>;
  unit?: MeasurementUnit;
  quantity?: string;
  material?: string;
  finishes?: string[];
  intendedUse?: string;
  destination?: string;
}

export function PackagingSpecBuilder({
  initialFamily,
  initialValues,
}: PackagingSpecBuilderProps) {
  const [family, setFamily] = useState<ProductFamily | "">(
    initialValues?.family ?? initialFamily ?? ""
  );
  const [style, setStyle] = useState(initialValues?.style ?? "");
  const [dimensions, setDimensions] = useState<DimensionFields>({
    ...emptyDimensions,
    ...initialValues?.dimensions,
  });
  const [unit, setUnit] = useState<MeasurementUnit>(initialValues?.unit ?? "in");
  const [quantity, setQuantity] = useState(initialValues?.quantity ?? "");
  const [material, setMaterial] = useState(initialValues?.material ?? "");
  const [finishes, setFinishes] = useState<string[]>(initialValues?.finishes ?? []);
  const [intendedUse, setIntendedUse] = useState(initialValues?.intendedUse ?? "");
  const [destination, setDestination] = useState(initialValues?.destination ?? "");
  const [copiedSummary, setCopiedSummary] = useState<string | null>(null);
  const [copiedShareHref, setCopiedShareHref] = useState<string | null>(null);

  const selectedProduct = products.find((product) => product.family === family);
  const parsedDimensions = parseFinishedDimensions(dimensions);
  const formattedDimensions = formatFinishedDimensions(parsedDimensions, unit);
  const moq = getPlanningMoq(family);
  const plannedQuantity = parsePositiveQuantity(quantity);
  const quantityMeetsMoq =
    plannedQuantity !== undefined && moq.units !== null && plannedQuantity >= moq.units;
  const quantityIsBelowMoq =
    plannedQuantity !== undefined && moq.units !== null && plannedQuantity < moq.units;
  const availableStyles = family ? productStyles[family] : [];
  const availableMaterials = family ? materialOptions[family] : [];
  const coreBriefItems = [
    { label: "Product family", complete: Boolean(family) },
    {
      label: "Size review",
      complete: Boolean(family),
    },
    { label: "Planning quantity", complete: Boolean(plannedQuantity) },
    { label: "Intended use", complete: Boolean(intendedUse.trim()) },
    { label: "Delivery destination", complete: Boolean(destination.trim()) },
  ];
  const completedCoreItems = coreBriefItems.filter((item) => item.complete).length;
  const completenessPercent = Math.round(
    (completedCoreItems / coreBriefItems.length) * 100
  );

  const summary = useMemo(() => {
    const lines = [
      "UPG Packaging Specification",
      `Product family: ${family || "Not selected"}`,
      `Style: ${style || "Not selected"}`,
      `Finished dimensions: ${formattedDimensions || "Not provided"}`,
      `Planning quantity: ${plannedQuantity ? `${formatUnits(plannedQuantity)} units` : "Not provided"}`,
      `Planning MOQ: ${moq.label}`,
      `Material: ${material || "Not selected"}`,
      `Finishes: ${finishes.length ? finishes.join(", ") : "Not selected"}`,
      `Intended use: ${intendedUse.trim() || "Not provided"}`,
      `Delivery destination: ${destination.trim() || "Not provided"}`,
      "Final structure, specifications, pricing, production timing, and delivery terms require UPG review.",
    ];
    return lines.join("\n");
  }, [family, style, formattedDimensions, plannedQuantity, moq, material, finishes, intendedUse, destination]);

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams();
    if (family) params.set("product", family);
    if (style) params.set("style", style);
    if (plannedQuantity) params.set("quantity", `${plannedQuantity} units`);
    if (intendedUse.trim()) params.set("use", intendedUse.trim());
    if (destination.trim()) params.set("destination", destination.trim());
    if (formattedDimensions) params.set("dimensions", formattedDimensions);
    if (material) params.set("material", material);
    if (finishes.length) params.set("finishes", finishes.join(", "));
    params.set(
      "builder_note",
      `Prepared with the UPG Packaging Spec & MOQ Builder. Planning MOQ: ${moq.label}.`
    );
    return `/get-a-quote?${params.toString()}`;
  }, [family, style, plannedQuantity, intendedUse, destination, formattedDimensions, material, finishes, moq]);

  const shareHref = useMemo(() => {
    const params = new URLSearchParams();
    if (family) params.set("product", family);
    if (style) params.set("style", style);
    if (dimensions.length) params.set("length", dimensions.length);
    if (dimensions.width) params.set("width", dimensions.width);
    if (dimensions.height) params.set("height", dimensions.height);
    params.set("unit", unit);
    if (quantity) params.set("quantity", quantity);
    if (material) params.set("material", material);
    finishes.forEach((finish) => params.append("finish", finish));
    if (intendedUse.trim()) params.set("use", intendedUse.trim());
    if (destination.trim()) params.set("destination", destination.trim());
    return `/tools/packaging-spec-builder?${params.toString()}`;
  }, [family, style, dimensions, unit, quantity, material, finishes, intendedUse, destination]);

  function chooseFamily(nextFamily: ProductFamily) {
    setFamily(nextFamily);
    setStyle("");
    setMaterial("");
    setFinishes([]);
  }

  function toggleFinish(finish: string) {
    setFinishes((current) =>
      current.includes(finish)
        ? current.filter((item) => item !== finish)
        : [...current, finish]
    );
  }

  async function copySpecification() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopiedSummary(summary);
      trackAnalyticsEvent("packaging_spec_copy", {
        product_family: family || "not_selected",
        planning_moq: moq.units ?? "pending",
      });
    } catch {
      setCopiedSummary(null);
    }
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${shareHref}`);
      setCopiedShareHref(shareHref);
      trackAnalyticsEvent("packaging_spec_share_link", {
        product_family: family || "not_selected",
        planning_moq: moq.units ?? "pending",
        core_brief_percent: completenessPercent,
      });
    } catch {
      setCopiedShareHref(null);
    }
  }

  function downloadSpecification() {
    const blob = new Blob([`${summary}\n`], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const fileFamily = (family || "packaging")
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, "");
    anchor.href = downloadUrl;
    anchor.download = `upg-${fileFamily}-specification.txt`;
    anchor.click();
    URL.revokeObjectURL(downloadUrl);
    trackAnalyticsEvent("packaging_spec_download", {
      product_family: family || "not_selected",
      planning_moq: moq.units ?? "pending",
      core_brief_percent: completenessPercent,
    });
  }

  function printSpecification() {
    trackAnalyticsEvent("packaging_spec_print", {
      product_family: family || "not_selected",
      planning_moq: moq.units ?? "pending",
      core_brief_percent: completenessPercent,
    });
    window.print();
  }

  function trackQuoteHandoff() {
    trackAnalyticsEvent("packaging_spec_quote_handoff", {
      product_family: family || "not_selected",
      planning_moq: moq.units ?? "pending",
      quantity_status: quantityIsBelowMoq
        ? "below_moq"
        : quantityMeetsMoq
          ? "meets_moq"
          : "not_checked",
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-12">
      <div className="space-y-8 xl:col-span-8">
        <section className="surface-card p-6 md:p-9" aria-labelledby="choose-product-heading">
          <div className="eyebrow mb-3">Step 1</div>
          <h2 id="choose-product-heading" className="font-serif text-3xl text-foreground">
            Choose the packaging family.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Start with the format closest to your project. The specification can still be reviewed before production.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {productFamilies.map((productFamily) => {
              const product = products.find((item) => item.family === productFamily);
              const isSelected = family === productFamily;

              return (
                <button
                  key={productFamily}
                  type="button"
                  onClick={() => chooseFamily(productFamily)}
                  aria-pressed={isSelected}
                  className={`rounded-2xl border p-5 text-left ${
                    isSelected
                      ? "border-moss bg-moss text-primary-foreground"
                      : "border-border bg-surface text-foreground hover:bg-cream"
                  }`}
                >
                  <span className="block text-base font-semibold">{productFamily}</span>
                  <span
                    className={`mt-2 block text-xs leading-relaxed ${
                      isSelected ? "text-primary-foreground/75" : "text-muted-foreground"
                    }`}
                  >
                    {product?.bestFor}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="surface-card p-6 md:p-9" aria-labelledby="project-spec-heading">
          <div className="eyebrow mb-3">Step 2</div>
          <h2 id="project-spec-heading" className="font-serif text-3xl text-foreground">
            Add the known project details.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Finished dimensions help UPG review feasibility and pricing, but they do not change the 250-unit planning MOQ. Fields can stay open for review.
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="builder-style">Structure or style</FieldLabel>
              <select
                id="builder-style"
                value={style}
                onChange={(event) => setStyle(event.target.value)}
                className={inputClass}
                disabled={!family}
              >
                <option value="">{family ? "Choose or leave open" : "Select a family first"}</option>
                {availableStyles.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {family === "Mailer Boxes" ? (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  UPG supplies corrugated ear-lock mailer boxes, not regular slotted shipping cartons, master cartons, or RSC cases.
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="builder-quantity">Planned quantity</FieldLabel>
              <input
                id="builder-quantity"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className={inputClass}
                placeholder="e.g. 250"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Finished dimensions — optional
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Enter length × width × height.</p>
                </div>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  Unit
                  <select
                    aria-label="Dimension unit"
                    value={unit}
                    onChange={(event) => setUnit(event.target.value as MeasurementUnit)}
                    className="h-10 rounded-xl border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-moss"
                  >
                    <option value="in">inches</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(["length", "width", "height"] as const).map((key) => (
                  <input
                    key={key}
                    aria-label={`${key} in ${unit}`}
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={dimensions[key]}
                    onChange={(event) =>
                      setDimensions((current) => ({ ...current, [key]: event.target.value }))
                    }
                    className={inputClass}
                    placeholder={key[0].toUpperCase()}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="builder-material">Material preference</FieldLabel>
              <select
                id="builder-material"
                value={material}
                onChange={(event) => setMaterial(event.target.value)}
                className={inputClass}
                disabled={!family}
              >
                <option value="">{family ? "Choose or leave open" : "Select a family first"}</option>
                {availableMaterials.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="builder-use">Intended use</FieldLabel>
              <input
                id="builder-use"
                value={intendedUse}
                onChange={(event) => setIntendedUse(event.target.value)}
                className={inputClass}
                placeholder="Product, retail, PR kit, gifting, etc."
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <FieldLabel htmlFor="builder-destination">Delivery country or region</FieldLabel>
              <input
                id="builder-destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className={inputClass}
                placeholder="Country or region"
                autoComplete="country-name"
              />
            </div>

            <fieldset className="sm:col-span-2">
              <legend className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Finish interests — optional
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {builderFinishOptions.map((finish) => {
                  const isSelected = finishes.includes(finish);
                  return (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => toggleFinish(finish)}
                      aria-pressed={isSelected}
                      className={`rounded-full border px-4 py-2 text-sm ${
                        isSelected
                          ? "border-moss bg-moss text-primary-foreground"
                          : "border-border bg-surface text-foreground hover:bg-cream"
                      }`}
                    >
                      {finish}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </section>
      </div>

      <aside className="xl:col-span-4" aria-live="polite">
        <div className="surface-card top-28 p-6 md:p-8 xl:sticky">
          <div className="eyebrow mb-3">Your planning result</div>
          <h2 className="font-serif text-3xl text-foreground">
            {selectedProduct?.shortName ?? "Packaging specification"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {selectedProduct?.summary ?? "Choose a packaging family to build a planning specification."}
          </p>

          <div className="mt-7 rounded-2xl bg-cream p-5">
            <div className="eyebrow mb-2">Planning MOQ</div>
            <div className="font-serif text-4xl text-foreground">{moq.label}</div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{moq.note}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="eyebrow">Core brief completeness</div>
              <div className="text-sm font-semibold text-foreground">
                {completedCoreItems}/{coreBriefItems.length}
              </div>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-stone"
              role="progressbar"
              aria-label="Core brief completeness"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completenessPercent}
            >
              <div
                className="h-full rounded-full bg-moss transition-[width] duration-300"
                style={{ width: `${completenessPercent}%` }}
              />
            </div>
            <ul className="mt-4 grid gap-2 text-xs text-muted-foreground">
              {coreBriefItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className={item.complete ? "text-moss" : "text-gold"}>
                    {item.complete ? "✓" : "○"}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {plannedQuantity && moq.units ? (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                quantityMeetsMoq
                  ? "border-moss/30 bg-moss/10 text-foreground"
                  : "border-gold/50 bg-gold/10 text-foreground"
              }`}
            >
              {quantityMeetsMoq
                ? `Your ${formatUnits(plannedQuantity)}-unit plan meets this planning MOQ.`
                : `Your ${formatUnits(plannedQuantity)}-unit plan is below this planning MOQ. Revise the quantity or ask UPG to review the project.`}
            </div>
          ) : null}

          <dl className="mt-7 space-y-4 text-sm">
            <div className="border-b border-border pb-4">
              <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Style</dt>
              <dd className="mt-1 text-foreground">{style || "Open for review"}</dd>
            </div>
            <div className="border-b border-border pb-4">
              <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Dimensions</dt>
              <dd className="mt-1 text-foreground">{formattedDimensions || "Not provided"}</dd>
            </div>
            <div className="border-b border-border pb-4">
              <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Material</dt>
              <dd className="mt-1 text-foreground">{material || "Open for review"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Finishes</dt>
              <dd className="mt-1 text-foreground">{finishes.length ? finishes.join(", ") : "Open for review"}</dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Destination</dt>
              <dd className="mt-1 text-foreground">{destination.trim() || "Not provided"}</dd>
            </div>
          </dl>

          <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
            This is planning guidance, not a price or production approval. Final structure, specifications, pricing, timing, and delivery terms require review.
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              href={quoteHref}
              onClick={trackQuoteHandoff}
              className="inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
            >
              Continue with this specification
            </Link>
            <button
              type="button"
              onClick={copySpecification}
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              {copiedSummary === summary ? "Specification copied" : "Copy specification"}
            </button>
            <button
              type="button"
              onClick={copyShareLink}
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              {copiedShareHref === shareHref ? "Share link copied" : "Copy shareable plan link"}
            </button>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              The link contains the current planning fields. Anyone with the link can read them, so do not add confidential information.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={downloadSpecification}
                className="rounded-full border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Download .txt
              </button>
              <button
                type="button"
                onClick={printSpecification}
                className="rounded-full border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </aside>

      <section className="print-spec-sheet" aria-label="Printable packaging specification">
        <div className="border-b-2 border-moss pb-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">UPG</div>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">Packaging specification</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Prepared with the Universal Packaging Group Spec &amp; MOQ Builder
          </p>
        </div>
        <pre className="mt-8 whitespace-pre-wrap font-sans text-sm leading-7 text-foreground">{summary}</pre>
        <div className="mt-10 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
          universalpackaginggroup.com • quotes@universalpackaginggroup.com • +1 786 885 8825
        </div>
      </section>
    </div>
  );
}

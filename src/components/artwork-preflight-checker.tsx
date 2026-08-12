"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  artworkPreflightChecks,
  evaluateArtworkReadiness,
  type ArtworkCheckStatus,
  type ArtworkPreflightAnswers,
} from "@/data/artwork-preflight";
import { productFamilies } from "@/data/packaging-spec";
import type { ProductFamily } from "@/data/products";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface ArtworkPreflightCheckerProps {
  initialFamily?: ProductFamily;
}

function statusLabel(status: ArtworkCheckStatus) {
  if (status === "confirmed") return "Confirmed";
  if (status === "attention") return "Needs attention";
  return "Not sure";
}

export function ArtworkPreflightChecker({
  initialFamily,
}: ArtworkPreflightCheckerProps) {
  const [family, setFamily] = useState<ProductFamily | "">(initialFamily ?? "");
  const [answers, setAnswers] = useState<ArtworkPreflightAnswers>({});
  const [copied, setCopied] = useState(false);
  const trackedSignature = useRef("");
  const result = useMemo(() => evaluateArtworkReadiness(answers), [answers]);
  const openChecks = artworkPreflightChecks.filter(
    (check) => answers[check.id] && answers[check.id] !== "confirmed"
  );

  const summary = useMemo(() => {
    const lines = [
      "UPG Packaging Artwork Preflight Summary",
      `Product family: ${family || "Not selected"}`,
      `Result: ${result.title}`,
      `Confirmed preparation items: ${result.confirmedCount} of ${artworkPreflightChecks.length}`,
      "",
      ...artworkPreflightChecks.map(
        (check) =>
          `${check.title}: ${answers[check.id] ? statusLabel(answers[check.id]) : "Not answered"}`
      ),
      "",
      "This is a preparation summary, not artwork, proof, structural, compliance, or production approval. UPG must review the actual files and project specification.",
    ];
    return lines.join("\n");
  }, [answers, family, result]);

  const handoffSummary = useMemo(() => {
    const openItemNames = openChecks.map((check) => check.title).join(", ");
    return [
      "Prepared with the UPG Packaging Artwork Preflight Checker.",
      `Result: ${result.title}`,
      `Confirmed: ${result.confirmedCount} of ${artworkPreflightChecks.length}.`,
      openItemNames ? `Open items: ${openItemNames}.` : "Open items: none reported.",
      "Actual files still require UPG review and approval.",
    ].join(" ");
  }, [openChecks, result]);

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams();
    if (family) params.set("product", family);
    params.set(
      "artwork",
      result.status === "ready-for-review"
        ? "Ready for UPG review"
        : result.status === "foundation-open"
          ? "Needs artwork preparation"
          : "Artwork in progress"
    );
    params.set("preflight_note", handoffSummary);
    return `/get-a-quote?${params.toString()}`;
  }, [family, handoffSummary, result.status]);

  useEffect(() => {
    if (!result.isComplete) return;
    const signature = [
      family || "not_selected",
      ...artworkPreflightChecks.map((check) => answers[check.id]),
    ].join("|");
    if (trackedSignature.current === signature) return;
    trackedSignature.current = signature;
    trackAnalyticsEvent("packaging_artwork_preflight_result", {
      product_family: family || "not_selected",
      readiness_status: result.status,
      confirmed_count: result.confirmedCount,
      open_count: openChecks.length,
    });
  }, [answers, family, openChecks.length, result]);

  function setCheckStatus(checkId: string, status: ArtworkCheckStatus) {
    setAnswers((current) => ({ ...current, [checkId]: status }));
    setCopied(false);
  }

  function resetChecker() {
    setFamily(initialFamily ?? "");
    setAnswers({});
    setCopied(false);
    trackedSignature.current = "";
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      trackAnalyticsEvent("packaging_artwork_preflight_copy", {
        product_family: family || "not_selected",
        readiness_status: result.status,
      });
    } catch {
      setCopied(false);
    }
  }

  function trackQuoteHandoff() {
    trackAnalyticsEvent("packaging_artwork_preflight_handoff", {
      product_family: family || "not_selected",
      readiness_status: result.status,
      destination: "project_enquiry",
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-12">
      <div className="space-y-6 xl:col-span-8">
        <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-5 md:px-7">
          <div>
            <div className="eyebrow mb-2">Preparation progress</div>
            <p className="text-sm text-foreground">
              {result.answeredCount} of {artworkPreflightChecks.length} checks answered
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="h-2 w-32 overflow-hidden rounded-full bg-stone md:w-48"
              role="progressbar"
              aria-label="Artwork preflight progress"
              aria-valuemin={0}
              aria-valuemax={artworkPreflightChecks.length}
              aria-valuenow={result.answeredCount}
            >
              <div
                className="h-full rounded-full bg-moss transition-[width] duration-300"
                style={{
                  width: `${(result.answeredCount / artworkPreflightChecks.length) * 100}%`,
                }}
              />
            </div>
            {result.answeredCount > 0 || family ? (
              <button
                type="button"
                onClick={resetChecker}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>

        <section className="surface-card p-6 md:p-9" aria-labelledby="preflight-family-heading">
          <div className="eyebrow mb-3">Project context</div>
          <h2 id="preflight-family-heading" className="font-serif text-3xl text-foreground">
            Choose the packaging family.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The same readiness questions apply across the current UPG range, while the final dieline and production setup remain structure-specific.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {productFamilies.map((productFamily) => (
              <button
                key={productFamily}
                type="button"
                onClick={() => setFamily(productFamily)}
                aria-pressed={family === productFamily}
                className={`rounded-2xl border p-5 text-left text-sm font-semibold ${
                  family === productFamily
                    ? "border-moss bg-moss text-primary-foreground"
                    : "border-border bg-surface text-foreground hover:bg-cream"
                }`}
              >
                {productFamily}
              </button>
            ))}
          </div>
        </section>

        {artworkPreflightChecks.map((check, index) => (
          <fieldset key={check.id} className="surface-card p-6 md:p-9">
            <legend className="sr-only">
              Check {index + 1}: {check.title}
            </legend>
            <div className="eyebrow mb-3">
              Check {index + 1} · {check.priority === "foundation" ? "Foundation" : "Production detail"}
            </div>
            <h2 className="font-serif text-3xl text-foreground">{check.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/85">
              {check.prompt}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {check.helpText}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {check.options.map((option) => {
                const selected = answers[check.id] === option.status;
                return (
                  <button
                    key={option.status}
                    type="button"
                    onClick={() => setCheckStatus(check.id, option.status)}
                    aria-pressed={selected}
                    className={`rounded-2xl border p-4 text-left ${
                      selected
                        ? "border-moss bg-moss text-primary-foreground"
                        : "border-border bg-surface text-foreground hover:bg-cream"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span
                      className={`mt-2 block text-xs leading-relaxed ${
                        selected ? "text-primary-foreground/75" : "text-muted-foreground"
                      }`}
                    >
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <aside className="xl:col-span-4" aria-live="polite">
        <div className="surface-card top-28 p-6 md:p-8 xl:sticky">
          <div className="eyebrow mb-3">Artwork readiness</div>
          <h2 className="font-serif text-3xl text-foreground">{result.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {result.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cream p-4">
              <div className="eyebrow mb-2">Confirmed</div>
              <div className="font-serif text-3xl text-foreground">
                {result.confirmedCount}/{artworkPreflightChecks.length}
              </div>
            </div>
            <div className="rounded-2xl bg-stone p-4">
              <div className="eyebrow mb-2">Open items</div>
              <div className="font-serif text-3xl text-foreground">
                {result.isComplete ? openChecks.length : "—"}
              </div>
            </div>
          </div>

          {result.isComplete && openChecks.length > 0 ? (
            <div className="mt-6">
              <div className="eyebrow mb-3">Carry into review</div>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/82">
                {openChecks.map((check) => (
                  <li key={check.id} className="flex gap-3">
                    <span className="text-gold" aria-hidden="true">•</span>
                    <span>
                      {check.title}: {statusLabel(answers[check.id])}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-7 rounded-2xl border border-border p-5 text-xs leading-relaxed text-muted-foreground">
            No artwork file is uploaded or analyzed by this tool. The result is a preparation checklist, not artwork, proof, structural, compliance, barcode, color, or production approval.
          </div>

          {result.isComplete ? (
            <div className="mt-6 grid gap-3">
              <Link
                href={quoteHref}
                onClick={trackQuoteHandoff}
                className="inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Continue with this artwork status
              </Link>
              <button
                type="button"
                onClick={copySummary}
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                {copied ? "Summary copied" : "Copy preparation summary"}
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

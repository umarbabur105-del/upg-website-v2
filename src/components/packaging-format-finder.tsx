"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatFinderQuestions,
  rankPackagingFormats,
  type FormatFinderAnswers,
} from "@/data/packaging-format-finder";
import { products } from "@/data/products";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function PackagingFormatFinder() {
  const [answers, setAnswers] = useState<FormatFinderAnswers>({});
  const trackedSignature = useRef("");
  const answeredCount = formatFinderQuestions.filter(
    (question) => answers[question.id]
  ).length;
  const isComplete = answeredCount === formatFinderQuestions.length;
  const ranking = useMemo(() => rankPackagingFormats(answers), [answers]);
  const primaryRank = isComplete && ranking[0]?.score > 0 ? ranking[0] : undefined;
  const alternateCandidate = isComplete
    ? ranking.find(
        (item, index) =>
          index > 0 && item.score > 0 && item.family !== primaryRank?.family
      )
    : undefined;
  const isCloseComparison = Boolean(
    primaryRank &&
      alternateCandidate &&
      primaryRank.score - alternateCandidate.score <= 3
  );
  const alternateRank = isCloseComparison ? alternateCandidate : undefined;
  const primaryProduct = products.find(
    (product) => product.family === primaryRank?.family
  );
  const alternateProduct = products.find(
    (product) => product.family === alternateRank?.family
  );

  useEffect(() => {
    if (!isComplete) return;
    const signature = formatFinderQuestions
      .map((question) => answers[question.id])
      .join("|");
    if (!signature || trackedSignature.current === signature) return;
    trackedSignature.current = signature;

    trackAnalyticsEvent("packaging_format_finder_result", {
      recommended_family: primaryRank?.family ?? "human_review",
      alternate_family: alternateRank?.family ?? "none",
      result_type: isCloseComparison ? "close_comparison" : "clear_starting_point",
    });
  }, [answers, alternateRank, isCloseComparison, isComplete, primaryRank]);

  function selectAnswer(questionId: string, optionId: string) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  function resetFinder() {
    setAnswers({});
    trackedSignature.current = "";
  }

  function trackEnquiryHandoff() {
    trackAnalyticsEvent("packaging_format_finder_handoff", {
      recommended_family: primaryRank?.family ?? "human_review",
      destination: "project_enquiry",
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-12">
      <div className="space-y-6 xl:col-span-8">
        <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-5 md:px-7">
          <div>
            <div className="eyebrow mb-2">Your progress</div>
            <p className="text-sm text-foreground">
              {answeredCount} of {formatFinderQuestions.length} questions answered
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="h-2 w-32 overflow-hidden rounded-full bg-stone md:w-48"
              role="progressbar"
              aria-label="Format finder progress"
              aria-valuemin={0}
              aria-valuemax={formatFinderQuestions.length}
              aria-valuenow={answeredCount}
            >
              <div
                className="h-full rounded-full bg-moss transition-[width] duration-300"
                style={{
                  width: `${(answeredCount / formatFinderQuestions.length) * 100}%`,
                }}
              />
            </div>
            {answeredCount > 0 ? (
              <button
                type="button"
                onClick={resetFinder}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>

        {formatFinderQuestions.map((question, questionIndex) => (
          <fieldset key={question.id} className="surface-card p-6 md:p-9">
            <legend className="sr-only">
              Question {questionIndex + 1}: {question.title}
            </legend>
            <div className="eyebrow mb-3">Question {questionIndex + 1}</div>
            <h2 className="font-serif text-3xl text-foreground">
              {question.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {question.helpText}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectAnswer(question.id, option.id)}
                    aria-pressed={selected}
                    className={`rounded-2xl border p-5 text-left ${
                      selected
                        ? "border-moss bg-moss text-primary-foreground"
                        : "border-border bg-surface text-foreground hover:bg-cream"
                    }`}
                  >
                    <span className="block text-sm font-semibold md:text-base">
                      {option.label}
                    </span>
                    <span
                      className={`mt-2 block text-xs leading-relaxed ${
                        selected
                          ? "text-primary-foreground/75"
                          : "text-muted-foreground"
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
          <div className="eyebrow mb-3">Your result</div>
          {!isComplete ? (
            <>
              <h2 className="font-serif text-3xl text-foreground">
                Complete all four questions.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The finder will identify a primary starting format and an alternate when your answers support more than one option.
              </p>
              <div className="mt-7 rounded-2xl bg-cream p-5 text-sm leading-relaxed text-foreground/80">
                This is a format recommendation only. UPG still reviews the final structure and production specification.
              </div>
            </>
          ) : primaryProduct && primaryRank ? (
            <>
              <div className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold inline-flex">
                {isCloseComparison ? "Compare two formats" : "Closest starting format"}
              </div>
              <h2 className="mt-5 font-serif text-3xl text-foreground">
                {primaryProduct.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {primaryProduct.summary}
              </p>

              <div className="mt-6 rounded-2xl bg-cream p-5">
                <div className="eyebrow mb-2">Planning MOQ</div>
                <div className="font-serif text-3xl text-foreground">
                  {primaryProduct.moq}
                </div>
              </div>

              <div className="mt-6">
                <div className="eyebrow mb-3">Why it matched</div>
                <ul className="space-y-3 text-sm leading-relaxed text-foreground/82">
                  {primaryRank.matchedAnswers.slice(0, 4).map((answer) => (
                    <li key={answer} className="flex gap-3">
                      <span className="text-gold" aria-hidden="true">✓</span>
                      <span>{answer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {alternateProduct && alternateRank ? (
                <div className="mt-7 border-t border-border pt-6">
                  <div className="eyebrow mb-2">Alternate to compare</div>
                  <h3 className="font-serif text-2xl text-foreground">
                    {alternateProduct.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {alternateProduct.summary}
                  </p>
                  <Link
                    href={`/products/${alternateProduct.slug}`}
                    className="mt-4 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                  >
                    View alternate details →
                  </Link>
                </div>
              ) : null}

              <p className="mt-7 text-xs leading-relaxed text-muted-foreground">
                This result is a planning recommendation, not structural approval. Final dimensions, materials, specifications, pricing, production timing, and delivery terms require review.
              </p>

              <div className="mt-6 grid gap-3">
                <Link
                  href={`/get-a-quote?product=${encodeURIComponent(primaryProduct.family)}`}
                  onClick={trackEnquiryHandoff}
                  className="inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  Continue with this recommendation
                </Link>
                <Link
                  href={`/products/${primaryProduct.slug}`}
                  className="inline-flex justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  View product details
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-serif text-3xl text-foreground">
                Your project needs a human review.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Your answers stayed open across the format questions. Start a project enquiry and UPG will review the product, use, quantity, dimensions, and presentation goal.
              </p>
              <Link
                href="/get-a-quote?product=Not%20sure%20yet"
                className="mt-7 inline-flex w-full justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Ask UPG to recommend a format
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

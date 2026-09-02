"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildFormatFinderQuoteNote,
  formatFamilyGuidance,
  formatFinderFollowUps,
  formatFinderGoals,
  getFormatFinderRecommendation,
  type FormatFinderGoalId,
} from "@/data/packaging-format-finder";
import { products } from "@/data/products";
import { trackAnalyticsEvent } from "@/lib/analytics";

function getProduct(family: string | null | undefined) {
  return products.find((product) => product.family === family);
}

export function PackagingFormatFinder() {
  const [goalId, setGoalId] = useState<FormatFinderGoalId | null>(null);
  const [followUpId, setFollowUpId] = useState<string | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const trackedSignature = useRef("");

  const followUp = goalId ? formatFinderFollowUps[goalId] : null;
  const recommendation = useMemo(
    () => getFormatFinderRecommendation(goalId, followUpId),
    [goalId, followUpId]
  );
  const primaryProduct = getProduct(recommendation?.primaryFamily);
  const alternateProduct = getProduct(recommendation?.alternateFamily);
  const stage = recommendation ? "result" : goalId ? "follow-up" : "goal";
  const progressLabel =
    stage === "goal"
      ? "Step 1 of 2"
      : stage === "follow-up"
        ? "Step 2 of 2"
        : "Recommendation ready";
  const progressValue = stage === "goal" ? 0 : stage === "follow-up" ? 50 : 100;

  const quoteHref = useMemo(() => {
    if (!goalId || !followUpId || !recommendation) return "/get-a-quote";
    const note = buildFormatFinderQuoteNote(goalId, followUpId, recommendation);
    const family = recommendation.primaryFamily ?? "Not sure yet";
    return `/get-a-quote?product=${encodeURIComponent(family)}&builder_note=${encodeURIComponent(note)}`;
  }, [followUpId, goalId, recommendation]);

  useEffect(() => {
    if (stage === "follow-up") {
      stepHeadingRef.current?.focus();
    }
    if (stage === "result") {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ block: "start" });
    }
  }, [stage]);

  useEffect(() => {
    if (!recommendation || !goalId || !followUpId) return;
    const signature = `${goalId}|${followUpId}`;
    if (trackedSignature.current === signature) return;
    trackedSignature.current = signature;

    trackAnalyticsEvent("packaging_format_finder_result", {
      recommended_family: recommendation.primaryFamily ?? "human_review",
      alternate_family: recommendation.alternateFamily ?? "none",
      result_type: recommendation.resultType,
      start_choice: goalId,
      follow_up_choice: followUpId,
    });
  }, [followUpId, goalId, recommendation]);

  function chooseGoal(nextGoalId: FormatFinderGoalId) {
    setGoalId(nextGoalId);
    setFollowUpId(null);
  }

  function chooseFollowUp(optionId: string) {
    setFollowUpId(optionId);
  }

  function goBack() {
    setFollowUpId(null);
    setGoalId(null);
  }

  function resetFinder() {
    setGoalId(null);
    setFollowUpId(null);
    trackedSignature.current = "";
  }

  function trackEnquiryHandoff() {
    trackAnalyticsEvent("packaging_format_finder_handoff", {
      recommended_family: recommendation?.primaryFamily ?? "human_review",
      destination: "project_enquiry",
      start_choice: goalId ?? "none",
      follow_up_choice: followUpId ?? "none",
    });
  }

  return (
    <div className="surface-card overflow-hidden rounded-[1.75rem] shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-cream px-5 py-4 md:px-8">
        <div>
          <div className="eyebrow mb-1">Packaging picker</div>
          <p className="text-sm font-semibold text-foreground">{progressLabel}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            About 30 seconds
          </span>
          <div
            className="h-2 w-28 overflow-hidden rounded-full bg-surface md:w-44"
            role="progressbar"
            aria-label="Packaging picker progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressValue}
          >
            <div
              className="h-full rounded-full bg-moss transition-[width] duration-300"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
      </div>

      {stage === "goal" ? (
        <fieldset className="p-5 md:p-8 lg:p-10">
          <legend className="sr-only">What are you trying to package?</legend>
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow mb-3">Start here</div>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">
              What are you trying to package?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Pick the picture closest to your project. You do not need to know box names.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {formatFinderGoals
              .filter((goal) => goal.image)
              .map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => chooseGoal(goal.id)}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:-translate-y-0.5 hover:border-moss hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
                >
                  <span className="relative block aspect-[16/9] overflow-hidden bg-stone">
                    <Image
                      src={goal.image!}
                      alt={goal.imageAlt ?? ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-surface/90 text-lg text-foreground shadow-soft">
                      →
                    </span>
                  </span>
                  <span className="block p-5 md:p-6">
                    <span className="block font-serif text-2xl text-foreground">
                      {goal.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                      {goal.description}
                    </span>
                  </span>
                </button>
              ))}
          </div>

          {formatFinderGoals
            .filter((goal) => !goal.image)
            .map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => chooseGoal(goal.id)}
                className="mt-4 flex w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-cream px-5 py-4 text-left hover:border-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss md:px-6"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {goal.title}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {goal.description}
                  </span>
                </span>
                <span className="text-xl text-foreground" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
        </fieldset>
      ) : null}

      {stage === "follow-up" && followUp ? (
        <fieldset className="p-5 md:p-8 lg:p-10">
          <legend className="sr-only">{followUp.title}</legend>
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <span aria-hidden="true">←</span> Back
          </button>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <div className="eyebrow mb-3">One last detail</div>
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="font-serif text-3xl text-foreground outline-none md:text-4xl"
            >
              {followUp.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {followUp.helpText}
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
            {followUp.options.map((option) => {
              const previewProduct = getProduct(option.previewFamily);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => chooseFollowUp(option.id)}
                  className={`group overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:border-moss hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss ${
                    previewProduct ? "md:last:col-span-1" : "md:col-span-2"
                  }`}
                >
                  {previewProduct ? (
                    <span className="grid sm:grid-cols-[9rem_1fr]">
                      <span className="relative min-h-36 overflow-hidden bg-stone">
                        <Image
                          src={previewProduct.image}
                          alt={previewProduct.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="144px"
                        />
                      </span>
                      <span className="flex items-center justify-between gap-4 p-5">
                        <span>
                          <span className="block font-serif text-2xl text-foreground">
                            {option.label}
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                            {option.description}
                          </span>
                        </span>
                        <span className="text-xl text-foreground" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-between gap-4 p-5 md:p-6">
                      <span>
                        <span className="block text-sm font-semibold text-foreground">
                          {option.label}
                        </span>
                        <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                      <span className="text-xl text-foreground" aria-hidden="true">
                        →
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {stage === "result" && recommendation ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          className="scroll-mt-24 outline-none"
          aria-live="polite"
        >
          {primaryProduct ? (
            <div className="grid lg:grid-cols-12">
              <div className="relative min-h-72 overflow-hidden bg-stone lg:col-span-5 lg:min-h-[42rem]">
                <Image
                  src={primaryProduct.image}
                  alt={primaryProduct.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent px-6 pb-6 pt-20 text-primary-foreground">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/75">
                    Planning MOQ
                  </div>
                  <div className="mt-1 font-serif text-3xl">{primaryProduct.moq}</div>
                </div>
              </div>

              <div className="p-6 md:p-9 lg:col-span-7 lg:p-12">
                <div className="inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                  {recommendation.resultType === "comparison"
                    ? "Best place to start"
                    : "Your closest match"}
                </div>
                <h2 className="mt-5 font-serif text-4xl text-foreground md:text-5xl">
                  {primaryProduct.name}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {formatFamilyGuidance[primaryProduct.family].plainDescription}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-moss p-5 text-primary-foreground">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/70">
                      Good fit when
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">
                      {formatFamilyGuidance[primaryProduct.family].goodFit}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-cream p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Pick another format when
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {formatFamilyGuidance[primaryProduct.family].notTheFit}
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="eyebrow mb-3">Why this matched</div>
                  <ul className="space-y-3 text-sm leading-relaxed text-foreground/85">
                    {recommendation.reasons.map((reason) => (
                      <li key={reason} className="flex gap-3">
                        <span className="text-gold" aria-hidden="true">
                          ✓
                        </span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {alternateProduct ? (
                  <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                    <div className="grid sm:grid-cols-[9rem_1fr]">
                      <div className="relative min-h-36 bg-stone">
                        <Image
                          src={alternateProduct.image}
                          alt={alternateProduct.name}
                          fill
                          className="object-cover"
                          sizes="144px"
                        />
                      </div>
                      <div className="p-5">
                        <div className="eyebrow mb-2">Also compare</div>
                        <h3 className="font-serif text-2xl text-foreground">
                          {alternateProduct.name}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {recommendation.alternateComparison}
                        </p>
                        <Link
                          href={`/products/${alternateProduct.slug}`}
                          className="mt-3 inline-flex border-b border-foreground/20 pb-0.5 text-xs font-semibold text-foreground"
                        >
                          View the alternate →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Link
                    href={quoteHref}
                    onClick={trackEnquiryHandoff}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                  >
                    Ask UPG to confirm this fit
                  </Link>
                  <Link
                    href={`/products/${primaryProduct.slug}`}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-stone"
                  >
                    See {primaryProduct.shortName}
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={resetFinder}
                  className="mt-5 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Start again
                </button>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  This is a planning recommendation, not structural approval or pricing. UPG confirms dimensions, material, construction, artwork, production, and delivery details after review.
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl p-6 text-center md:p-12 lg:p-16">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-gold/15 font-serif text-3xl text-gold">
                ?
              </div>
              <div className="eyebrow mt-6 mb-3">Honest result</div>
              <h2 className="font-serif text-4xl text-foreground md:text-5xl">
                A person should check this one.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                There is not enough information to recommend a format without guessing. Share the product, quantity, dimensions, and intended use; UPG can narrow the choice with you.
              </p>
              <Link
                href={quoteHref}
                onClick={trackEnquiryHandoff}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Ask UPG to recommend a format
              </Link>
              <div>
                <button
                  type="button"
                  onClick={resetFinder}
                  className="mt-5 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Start again
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

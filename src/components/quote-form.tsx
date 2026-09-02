"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";
import {
  finishOptions,
  materialOptions,
  PLANNING_MOQ_UNITS,
  productStyles,
  validatePlanningQuantity,
} from "@/data/packaging-spec";
import { products, type ProductFamily } from "@/data/products";
import { trackAnalyticsEvent, trackGenerateLead } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/lead-attribution";
import {
  formatQuoteContext,
  QUICK_QUANTITIES,
} from "@/lib/quote-form-ux";

const excludedMailerStyle = "Standard Shipping / Master Carton (not supplied)";

type FormState = {
  product_family: string;
  product_style: string;
  quantity: string;
  intended_end_use: string;
  shipping_country: string;
  shipping_state_or_province: string;
  target_delivery_timing: string;
  artwork_status: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  dimensions: string;
  material_preference: string;
  finish_preference: string;
  notes: string;
};

type RequiredField =
  | "product_family"
  | "quantity"
  | "name"
  | "email"
  | "company";

type FieldErrors = Partial<Record<RequiredField, string>>;

const initialState: FormState = {
  product_family: "",
  product_style: "",
  quantity: "",
  intended_end_use: "",
  shipping_country: "",
  shipping_state_or_province: "",
  target_delivery_timing: "",
  artwork_status: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  dimensions: "",
  material_preference: "",
  finish_preference: "",
  notes: "",
};

export interface QuoteFormPrefill {
  productFamily?: string;
  productStyle?: string;
  quantity?: string;
  intendedEndUse?: string;
  shippingCountry?: string;
  dimensions?: string;
  materialPreference?: string;
  finishPreference?: string;
  artworkStatus?: string;
  notes?: string;
}

interface QuoteFormProps {
  prefill?: QuoteFormPrefill;
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-foreground"
      >
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/15";
const textareaClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-moss focus:ring-2 focus:ring-moss/15";

function isEmailAddress(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function QuoteForm({ prefill }: QuoteFormProps) {
  const hasWhatsApp = Boolean(siteConfig.whatsappUrl);
  const prefillQuantity = prefill?.quantity
    ? validatePlanningQuantity(prefill.quantity)
    : undefined;
  const validPrefillFamily =
    prefill?.productFamily && prefill.productFamily in productStyles
      ? prefill.productFamily
      : "";
  const validPrefillStyle =
    validPrefillFamily &&
    prefill?.productStyle &&
    productStyles[validPrefillFamily as keyof typeof productStyles].includes(
      prefill.productStyle
    )
      ? prefill.productStyle
      : "";
  const [submissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt] = useState(() => Date.now());
  const [faxNumber, setFaxNumber] = useState("");
  const [projectContext, setProjectContext] = useState(prefill?.notes ?? "");
  const [form, setForm] = useState<FormState>({
    ...initialState,
    product_family: validPrefillFamily,
    product_style: validPrefillStyle,
    quantity: prefillQuantity?.valid ? String(prefillQuantity.units) : "",
    intended_end_use: prefill?.intendedEndUse ?? "",
    shipping_country: prefill?.shippingCountry ?? "",
    dimensions: prefill?.dimensions ?? "",
    material_preference: prefill?.materialPreference ?? "",
    finish_preference: prefill?.finishPreference ?? "",
    artwork_status: prefill?.artworkStatus ?? "",
  });
  const [showFamilyChoices, setShowFamilyChoices] = useState(
    !validPrefillFamily
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const familySectionRef = useRef<HTMLDivElement>(null);
  const trackedStart = useRef(false);

  const availableStyles =
    productStyles[form.product_family as keyof typeof productStyles] ?? [];
  const availableMaterials =
    materialOptions[form.product_family as keyof typeof materialOptions] ?? [];
  const hasCustomPrefilledFinish =
    Boolean(form.finish_preference) &&
    !finishOptions.some((finish) => finish === form.finish_preference);
  const isExcludedMailer =
    form.product_family === "Mailer Boxes" &&
    form.product_style === excludedMailerStyle;
  const selectedProduct = products.find(
    (product) => product.family === form.product_family
  );
  const friendlyContext = formatQuoteContext(projectContext);
  const quantityIsValid = form.quantity
    ? validatePlanningQuantity(form.quantity).valid
    : false;
  const contactIsComplete = Boolean(
    form.name.trim() && isEmailAddress(form.email) && form.company.trim()
  );
  const completedParts =
    Number(Boolean(form.product_family)) +
    Number(quantityIsValid) +
    Number(contactIsComplete);
  const progressValue = Math.round((completedParts / 3) * 100);

  function trackFormStart() {
    if (trackedStart.current) return;
    trackedStart.current = true;
    trackAnalyticsEvent("quote_form_start", {
      product_family: form.product_family || "not_selected",
      has_source_context: Boolean(projectContext),
    });
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (key in fieldErrors) {
      setFieldErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function selectFamily(family: ProductFamily | "Not sure yet") {
    setForm((current) => ({
      ...current,
      product_family: family,
      product_style: "",
      material_preference: "",
    }));
    if (family !== validPrefillFamily) {
      setProjectContext("");
    }
    setFieldErrors((current) => ({ ...current, product_family: undefined }));
    setShowFamilyChoices(false);
    trackAnalyticsEvent("quote_form_family_selected", {
      product_family: family,
    });
  }

  function toggleAdvanced() {
    setShowAdvanced((current) => {
      const next = !current;
      if (next) {
        trackAnalyticsEvent("quote_form_optional_open", {
          product_family: form.product_family || "not_selected",
        });
      }
      return next;
    });
  }

  function validateBasics() {
    const nextErrors: FieldErrors = {};
    const quantityValidation = validatePlanningQuantity(form.quantity);

    if (!form.product_family) {
      nextErrors.product_family = "Choose the closest packaging family, or select ‘Not sure yet’.";
    }
    if (!form.quantity.trim()) {
      nextErrors.quantity = "Choose a quantity or enter one below.";
    } else if (!quantityValidation.valid) {
      nextErrors.quantity = quantityValidation.error;
    }
    if (!form.name.trim()) {
      nextErrors.name = "Add your name so we know who to reply to.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Add an email so we can reply.";
    } else if (!isEmailAddress(form.email)) {
      nextErrors.email = "Enter an email in the format you@brand.com.";
    }
    if (!form.company.trim()) {
      nextErrors.company = "Add the brand or company this project is for.";
    }

    setFieldErrors(nextErrors);
    const invalidFields = Object.keys(nextErrors) as RequiredField[];
    if (invalidFields.length === 0) return true;

    trackAnalyticsEvent("quote_form_validation_error", {
      field_count: invalidFields.length,
      first_field: invalidFields[0],
    });
    requestAnimationFrame(() => {
      if (invalidFields[0] === "product_family") {
        setShowFamilyChoices(true);
        familySectionRef.current?.focus();
        familySectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
      document.getElementById(invalidFields[0])?.focus();
    });
    return false;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!validateBasics()) return;
    if (isExcludedMailer) {
      setError(
        "UPG does not supply standard shipping cartons, master cartons, or RSC cases. Please choose an ear-lock mailer style to continue."
      );
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          notes: projectContext,
          customer_notes: form.notes,
          submission_id: submissionId,
          form_started_at: formStartedAt,
          fax_number: faxNumber,
          attribution: getLeadAttribution(),
        }),
      });

      const data = await response.json();
      if (!response.ok || data.accepted !== true) {
        throw new Error(data.error ?? "Project enquiry submission failed");
      }

      trackGenerateLead("quote_form", {
        product_family: form.product_family,
        product_style: form.product_style,
      });
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : `Something went wrong. Please try again or email ${siteConfig.email}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="surface-card mx-auto max-w-4xl overflow-hidden rounded-[1.75rem] p-7 text-center shadow-soft sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold/15">
          <span className="text-2xl text-gold">✓</span>
        </div>
        <div className="eyebrow mt-6 mb-3">Request received</div>
        <h2 className="font-serif text-4xl text-foreground">
          Your packaging project is with UPG.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          We will review what you shared and target an initial response within one business day. Missing technical details can be confirmed with you next.
        </p>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          {[
            ["1", "Received", "Your brief is safely submitted."],
            ["2", "Human review", "UPG checks the product and format."],
            ["3", "Initial reply", "We target one business day."],
          ].map(([number, title, copy]) => (
            <div key={number} className="rounded-2xl bg-cream p-5">
              <div className="font-serif text-2xl text-gold">{number}</div>
              <div className="mt-3 text-sm font-semibold text-foreground">
                {title}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
        {hasWhatsApp ? (
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
          >
            Continue on WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  const renderSubmitButton = (label: string, inverse = false) => (
    <button
      type="submit"
      disabled={submitting || isExcludedMailer}
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 py-3 text-center text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${
        inverse
          ? "bg-surface text-foreground hover:bg-stone"
          : "bg-primary text-primary-foreground hover:bg-moss-deep"
      }`}
    >
      {submitting ? "Sending your project…" : label}
    </button>
  );

  return (
    <form
      action="/api/quote"
      method="post"
      acceptCharset="UTF-8"
      onSubmit={handleSubmit}
      onFocusCapture={trackFormStart}
      noValidate
      className="mx-auto max-w-4xl pb-24 sm:pb-0"
    >
      <input type="hidden" name="landing_page" value="/get-a-quote" />
      <input type="hidden" name="product_family" value={form.product_family} />
      <input type="hidden" name="notes" value={projectContext} />
      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="quote-fax-number">Fax number</label>
        <input
          id="quote-fax-number"
          name="fax_number"
          tabIndex={-1}
          autoComplete="off"
          value={faxNumber}
          onChange={(event) => setFaxNumber(event.target.value)}
        />
      </div>

      <div className="surface-card overflow-hidden rounded-[1.75rem] shadow-soft">
        <div className="border-b border-border bg-cream px-6 py-6 sm:px-8 md:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow mb-3">Your packaging brief</div>
              <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
                Let&apos;s finish the essentials.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Technical specifications can follow after UPG reviews the request.
              </p>
            </div>
            <div className="shrink-0 sm:text-right">
              <div className="text-xs font-semibold text-foreground">
                About 30 seconds
              </div>
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface sm:w-40"
                role="progressbar"
                aria-label="Quote essentials progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressValue}
              >
                <div
                  className="h-full rounded-full bg-moss transition-[width] duration-300"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <div className="mt-1 text-[0.68rem] text-muted-foreground">
                {completedParts} of 3 parts ready
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-9 p-6 sm:p-8 md:p-10">
          <section aria-labelledby="quote-packaging-heading">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="eyebrow mb-2">1 · Your packaging</div>
                <h3
                  id="quote-packaging-heading"
                  className="font-serif text-2xl text-foreground"
                >
                  What are we making?
                </h3>
              </div>
              {form.product_family && !showFamilyChoices ? (
                <button
                  type="button"
                  onClick={() => setShowFamilyChoices(true)}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Change
                </button>
              ) : null}
            </div>

            <div
              ref={familySectionRef}
              tabIndex={-1}
              className="scroll-mt-24 outline-none"
            >
              {showFamilyChoices ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <button
                      key={product.family}
                      type="button"
                      onClick={() => selectFamily(product.family)}
                      aria-pressed={form.product_family === product.family}
                      className="group overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:border-moss hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
                    >
                      <span className="grid grid-cols-[6rem_1fr] sm:block">
                        <span className="relative block min-h-24 overflow-hidden bg-stone sm:aspect-[16/9]">
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 96px, 33vw"
                          />
                        </span>
                        <span className="flex items-center justify-between gap-3 p-4">
                          <span className="text-sm font-semibold text-foreground">
                            {product.shortName}
                          </span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => selectFamily("Not sure yet")}
                    aria-pressed={form.product_family === "Not sure yet"}
                    className="flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-cream p-5 text-left hover:border-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        Not sure yet
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        UPG can recommend the format.
                      </span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              ) : selectedProduct ? (
                <div className="overflow-hidden rounded-2xl border border-moss/30 bg-cream">
                  <div className="grid sm:grid-cols-[11rem_1fr]">
                    <div className="relative min-h-44 overflow-hidden bg-stone sm:min-h-0">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                        sizes="176px"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="inline-flex rounded-full bg-moss px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                        Selected ✓
                      </div>
                      <h4 className="mt-3 font-serif text-2xl text-foreground">
                        {selectedProduct.name}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {selectedProduct.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-foreground">
                        <span className="rounded-full bg-surface px-3 py-1.5">
                          MOQ {selectedProduct.moq}
                        </span>
                        {form.product_style ? (
                          <span className="rounded-full bg-surface px-3 py-1.5">
                            {form.product_style}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 rounded-2xl border border-dashed border-moss/40 bg-cream p-5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-full bg-surface font-serif text-2xl text-gold">
                    ?
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      UPG will recommend the format
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Share the product and intended use in the optional details if you can.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {fieldErrors.product_family ? (
              <p className="mt-2 text-xs text-red-700">
                {fieldErrors.product_family}
              </p>
            ) : null}

            {friendlyContext ? (
              <div className="mt-4 flex items-start justify-between gap-4 rounded-2xl bg-moss/7 p-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">
                    Starting brief already added
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {friendlyContext}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProjectContext("")}
                  className="shrink-0 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  aria-label="Remove starting brief"
                >
                  Remove
                </button>
              </div>
            ) : null}
          </section>

          <section aria-labelledby="quote-quantity-heading">
            <div className="eyebrow mb-2">2 · Quantity</div>
            <h3
              id="quote-quantity-heading"
              className="font-serif text-2xl text-foreground"
            >
              How many do you need?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with 250 units or more. Pick a shortcut or enter another quantity.
            </p>
            <div
              className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
              role="group"
              aria-label="Quick quantity choices"
            >
              {QUICK_QUANTITIES.map((quantity) => {
                const selected = form.quantity === String(quantity);
                return (
                  <button
                    key={quantity}
                    type="button"
                    onClick={() => update("quantity", String(quantity))}
                    aria-pressed={selected}
                    className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss ${
                      selected
                        ? "border-moss bg-moss text-primary-foreground"
                        : "border-border bg-surface text-foreground hover:border-moss hover:bg-cream"
                    }`}
                  >
                    {quantity.toLocaleString("en-US")}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 max-w-sm">
              <Field
                label="Or enter another quantity"
                htmlFor="quantity"
                required
                error={fieldErrors.quantity}
              >
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  inputMode="numeric"
                  min={PLANNING_MOQ_UNITS}
                  step={1}
                  value={form.quantity}
                  onChange={(event) => update("quantity", event.target.value)}
                  className={inputClass}
                  placeholder="For example, 750"
                  aria-invalid={Boolean(fieldErrors.quantity)}
                  aria-describedby={
                    fieldErrors.quantity ? "quantity-error" : undefined
                  }
                />
              </Field>
            </div>
          </section>

          <section aria-labelledby="quote-contact-heading">
            <div className="eyebrow mb-2">3 · Your details</div>
            <h3
              id="quote-contact-heading"
              className="font-serif text-2xl text-foreground"
            >
              Where should we reply?
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                label="Your name"
                htmlFor="name"
                required
                error={fieldErrors.name}
              >
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
              </Field>

              <Field
                label="Email"
                htmlFor="email"
                required
                error={fieldErrors.email}
              >
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  className={inputClass}
                  type="email"
                  placeholder="you@brand.com"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field
                  label="Brand or company"
                  htmlFor="company"
                  required
                  error={fieldErrors.company}
                >
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(event) => update("company", event.target.value)}
                    className={inputClass}
                    placeholder="Brand or company name"
                    aria-invalid={Boolean(fieldErrors.company)}
                    aria-describedby={
                      fieldErrors.company ? "company-error" : undefined
                    }
                  />
                </Field>
              </div>
            </div>
          </section>

          {error ? (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          ) : null}

          <div className="rounded-2xl bg-moss p-5 text-primary-foreground sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div>
              <div className="text-sm font-semibold">Ready when you are.</div>
              <p className="mt-1 text-xs leading-relaxed text-primary-foreground/70">
                No technical specifications are required to start.
              </p>
            </div>
            <div className="mt-4 shrink-0 sm:mt-0">
              {renderSubmitButton("Send my project to UPG", true)}
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-cream p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Want a sharper first reply?
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Add whatever you already know. Every field below is optional.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleAdvanced}
                aria-expanded={showAdvanced}
                aria-controls="optional-quote-details"
                className="shrink-0 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-stone"
              >
                {showAdvanced ? "Hide optional details" : "+ Add optional details"}
              </button>
            </div>

            {showAdvanced ? (
              <div id="optional-quote-details" className="mt-6 border-t border-border pt-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="What are you packaging?" htmlFor="intended_end_use">
                    <input
                      id="intended_end_use"
                      name="intended_end_use"
                      value={form.intended_end_use}
                      onChange={(event) =>
                        update("intended_end_use", event.target.value)
                      }
                      className={inputClass}
                      placeholder="For example, skincare, coffee, or a PR kit"
                    />
                  </Field>

                  <Field label="Approximate size" htmlFor="dimensions">
                    <input
                      id="dimensions"
                      name="dimensions"
                      value={form.dimensions}
                      onChange={(event) => update("dimensions", event.target.value)}
                      className={inputClass}
                      placeholder="L × W × H, if known"
                    />
                  </Field>

                  <Field label="Delivery country or region" htmlFor="shipping_country">
                    <input
                      id="shipping_country"
                      name="shipping_country"
                      value={form.shipping_country}
                      onChange={(event) =>
                        update("shipping_country", event.target.value)
                      }
                      className={inputClass}
                      autoComplete="country-name"
                      placeholder="Country or region"
                    />
                  </Field>

                  <Field label="Preferred timing" htmlFor="target_delivery_timing">
                    <select
                      id="target_delivery_timing"
                      name="target_delivery_timing"
                      value={form.target_delivery_timing}
                      onChange={(event) =>
                        update("target_delivery_timing", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">Choose or skip</option>
                      <option value="As soon as possible">As soon as possible</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="More than 30 days">More than 30 days</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Anything else you want us to know?" htmlFor="customer_notes">
                      <textarea
                        id="customer_notes"
                        name="customer_notes"
                        value={form.notes}
                        onChange={(event) => update("notes", event.target.value)}
                        className={textareaClass}
                        rows={3}
                        placeholder="Add a reference, insert idea, finish, or any question you have."
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <button
                    type="button"
                    onClick={() => setShowTechnical((current) => !current)}
                    aria-expanded={showTechnical}
                    aria-controls="technical-quote-details"
                    className="text-sm font-semibold text-foreground hover:text-moss"
                  >
                    {showTechnical
                      ? "− Hide technical specifications"
                      : "+ I already know my technical specifications"}
                  </button>

                  {showTechnical ? (
                    <div
                      id="technical-quote-details"
                      className="mt-5 grid gap-5 sm:grid-cols-2"
                    >
                      <Field label="Product style" htmlFor="product_style">
                        <select
                          id="product_style"
                          name="product_style"
                          value={form.product_style}
                          onChange={(event) =>
                            update("product_style", event.target.value)
                          }
                          className={inputClass}
                        >
                          <option value="">
                            {form.product_family
                              ? "Choose or skip"
                              : "Select family first"}
                          </option>
                          {availableStyles.map((style) => (
                            <option key={style} value={style}>
                              {style}
                            </option>
                          ))}
                        </select>
                        {form.product_family === "Mailer Boxes" ? (
                          <p
                            className={`text-xs leading-relaxed ${
                              isExcludedMailer
                                ? "text-red-700"
                                : "text-muted-foreground"
                            }`}
                          >
                            Mailer boxes only. Standard shipping cartons, master cartons, and RSC cases are not supplied.
                          </p>
                        ) : null}
                      </Field>

                      <Field label="Material preference" htmlFor="material_preference">
                        <select
                          id="material_preference"
                          name="material_preference"
                          value={form.material_preference}
                          onChange={(event) =>
                            update("material_preference", event.target.value)
                          }
                          className={inputClass}
                        >
                          <option value="">Choose or skip</option>
                          {availableMaterials.map((material) => (
                            <option key={material} value={material}>
                              {material}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Finish preference" htmlFor="finish_preference">
                        <select
                          id="finish_preference"
                          name="finish_preference"
                          value={form.finish_preference}
                          onChange={(event) =>
                            update("finish_preference", event.target.value)
                          }
                          className={inputClass}
                        >
                          <option value="">Choose or skip</option>
                          {hasCustomPrefilledFinish ? (
                            <option value={form.finish_preference}>
                              {form.finish_preference}
                            </option>
                          ) : null}
                          {finishOptions.map((finish) => (
                            <option key={finish} value={finish}>
                              {finish}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Artwork status" htmlFor="artwork_status">
                        <select
                          id="artwork_status"
                          name="artwork_status"
                          value={form.artwork_status}
                          onChange={(event) =>
                            update("artwork_status", event.target.value)
                          }
                          className={inputClass}
                        >
                          <option value="">Choose or skip</option>
                          <option value="Ready for UPG review">Ready for UPG review</option>
                          <option value="Needs dieline">Need a dieline</option>
                          <option value="Needs artwork preparation">Needs artwork preparation</option>
                          <option value="Artwork in progress">Artwork in progress</option>
                          <option value="Needs design help">Need design help</option>
                          <option value="Still in concept stage">Still in concept stage</option>
                        </select>
                      </Field>

                      <Field label="Phone or WhatsApp" htmlFor="phone">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(event) => update("phone", event.target.value)}
                          className={inputClass}
                          placeholder="+1 ..."
                        />
                      </Field>

                      <Field label="Website" htmlFor="website">
                        <input
                          id="website"
                          name="website"
                          type="url"
                          autoComplete="url"
                          value={form.website}
                          onChange={(event) => update("website", event.target.value)}
                          className={inputClass}
                          placeholder="https://"
                        />
                      </Field>
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Everything here is optional. Send whenever you are ready.
                  </p>
                  {renderSubmitButton("Finish and send")}
                </div>
              </div>
            ) : null}
          </section>

          <p className="text-xs leading-relaxed text-muted-foreground">
            By submitting, you agree that UPG may use these details to respond to this request. Read our{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";
import {
  finishOptions,
  materialOptions,
  productStyles,
} from "@/data/packaging-spec";
import { trackGenerateLead } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/lead-attribution";

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
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none focus:border-moss";
const textareaClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-moss";

export function QuoteForm({ prefill }: QuoteFormProps) {
  const hasWhatsApp = Boolean(siteConfig.whatsappUrl);
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
  const [form, setForm] = useState<FormState>({
    ...initialState,
    product_family: validPrefillFamily,
    product_style: validPrefillStyle,
    quantity: prefill?.quantity ?? "",
    intended_end_use: prefill?.intendedEndUse ?? "",
    shipping_country: prefill?.shippingCountry ?? "",
    dimensions: prefill?.dimensions ?? "",
    material_preference: prefill?.materialPreference ?? "",
    finish_preference: prefill?.finishPreference ?? "",
    artwork_status: prefill?.artworkStatus ?? "",
    notes: prefill?.notes ?? "",
  });
  const [showAdvanced, setShowAdvanced] = useState(
    Boolean(
      prefill?.productStyle ||
        prefill?.intendedEndUse ||
        prefill?.shippingCountry ||
        prefill?.dimensions ||
        prefill?.materialPreference ||
        prefill?.finishPreference ||
        prefill?.artworkStatus ||
        prefill?.notes
    )
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isExcludedMailer) {
      setError(
        "UPG does not supply standard shipping cartons, master cartons, or RSC cases. Please choose an ear-lock mailer style to continue."
      );
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
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
      <div className="surface-card p-8 text-center sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
          <span className="text-2xl text-gold">✓</span>
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-foreground">
          Thank you. Your quote request is in.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          We will review the information and target an initial response within one
          business day. Any missing specifications can be confirmed with you next.
        </p>
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

  return (
    <form
      action="/api/quote"
      method="post"
      acceptCharset="UTF-8"
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl"
    >
      <input type="hidden" name="landing_page" value="/get-a-quote" />
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

      <div className="surface-card p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">
              Tell us the basics.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Enough for us to review the enquiry and contact you. Technical
              details can be added now or discussed later.
            </p>
          </div>
          <div className="eyebrow">About 60 seconds</div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Product family" htmlFor="product_family" required>
            <select
              id="product_family"
              name="product_family"
              required
              value={form.product_family}
              onChange={(event) => {
                const nextFamily = event.target.value;
                setForm((current) => ({
                  ...current,
                  product_family: nextFamily,
                  product_style: "",
                  material_preference: "",
                }));
              }}
              className={inputClass}
            >
              <option value="">Select product family</option>
              {Object.keys(productStyles).map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Quantity" htmlFor="quantity" required>
            <input
              id="quantity"
              name="quantity"
              required
              value={form.quantity}
              onChange={(event) => update("quantity", event.target.value)}
              className={inputClass}
              placeholder="e.g. 250 units"
            />
          </Field>

          <Field label="Full name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </Field>

          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              className={inputClass}
              type="email"
              placeholder="you@brand.com"
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Company / brand" htmlFor="company" required>
              <input
                id="company"
                name="company"
                required
                autoComplete="organization"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
                className={inputClass}
                placeholder="Company or brand name"
              />
            </Field>
          </div>

        </div>

        <div className="mt-7 border-t border-border pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="eyebrow mb-2">Optional project details</div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Add specifications only if they are already available.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced((current) => !current)}
              aria-expanded={showAdvanced}
              aria-controls="optional-quote-details"
              className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              {showAdvanced ? "Hide details" : "Add details"}
            </button>
          </div>

          {showAdvanced ? (
            <div id="optional-quote-details" className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Anything we should know?" htmlFor="notes">
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    className={textareaClass}
                    rows={3}
                    placeholder="What are you packaging? Add a size, reference, finish idea, or timing if known."
                  />
                </Field>
              </div>

              <Field label="Product style" htmlFor="product_style">
                <select
                  id="product_style"
                  name="product_style"
                  value={form.product_style}
                  onChange={(event) => update("product_style", event.target.value)}
                  className={inputClass}
                >
                  <option value="">
                    {form.product_family ? "Choose or skip" : "Select family first"}
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
                      isExcludedMailer ? "text-red-700" : "text-muted-foreground"
                    }`}
                  >
                    Mailer boxes only. Regular slotted shipping cartons, master
                    cartons, and RSC cases are not supplied.
                  </p>
                ) : null}
              </Field>

              <Field label="Intended end use" htmlFor="intended_end_use">
                <input
                  id="intended_end_use"
                  name="intended_end_use"
                  value={form.intended_end_use}
                  onChange={(event) => update("intended_end_use", event.target.value)}
                  className={inputClass}
                  placeholder="Skincare, PR kit, coffee, retail, etc."
                />
              </Field>

              <Field label="Delivery country / region" htmlFor="shipping_country">
                <input
                  id="shipping_country"
                  name="shipping_country"
                  value={form.shipping_country}
                  onChange={(event) => update("shipping_country", event.target.value)}
                  className={inputClass}
                  autoComplete="country-name"
                  placeholder="Country or region"
                />
              </Field>

              <Field label="Phone / WhatsApp" htmlFor="phone">
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

              <Field label="Dimensions" htmlFor="dimensions">
                <input
                  id="dimensions"
                  name="dimensions"
                  value={form.dimensions}
                  onChange={(event) => update("dimensions", event.target.value)}
                  className={inputClass}
                  placeholder="L × W × H"
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
                  onChange={(event) => update("finish_preference", event.target.value)}
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
                  onChange={(event) => update("artwork_status", event.target.value)}
                  className={inputClass}
                >
                  <option value="">Choose or skip</option>
                  <option value="Ready for UPG review">Ready for UPG review</option>
                  <option value="Needs dieline">Need a dieline</option>
                  <option value="Needs artwork preparation">
                    Needs artwork preparation
                  </option>
                  <option value="Artwork in progress">Artwork in progress</option>
                  <option value="Needs design help">Need design help</option>
                  <option value="Still in concept stage">Still in concept stage</option>
                </select>
              </Field>

              <Field
                label="Preferred delivery timing"
                htmlFor="target_delivery_timing"
              >
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
            </div>
          ) : null}
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
            By submitting, you agree that UPG may use these details to respond to
            this request. Read our{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
          <button
            type="submit"
            disabled={submitting || isExcludedMailer}
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Request My Quote"}
          </button>
        </div>
      </div>
    </form>
  );
}

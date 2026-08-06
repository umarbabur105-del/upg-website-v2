"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";
import { getLeadAttribution } from "@/lib/lead-attribution";

const productStyles: Record<string, string[]> = {
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
    "Child-Resistant Bag",
    "Coffee Bag",
    "Rollstock Film",
    "Not sure — recommend",
  ],
  "Not sure yet": ["Recommend a structure for me"],
};

const materialOptions: Record<string, string[]> = {
  "Tuck Boxes": [
    "SBS C1S",
    "SBS C2S",
    "Brown kraft",
    "White kraft",
    "Black kraft",
    "CCNB",
    "Chipboard",
    "Corrugated",
    "Not sure — recommend",
  ],
  "Mailer Boxes": ["Corrugated", "Not sure — recommend"],
  "Magnetic Boxes": ["Not sure — recommend"],
  "Collapsible Magnetic Boxes": ["Not sure — recommend"],
  "Mylar Bags": [
    "Flexible film selected after product review",
    "Not sure — recommend",
  ],
  "Not sure yet": ["Not sure — recommend"],
};

const finishOptions = [
  "Soft-touch matte",
  "Foil stamping",
  "Embossing / Debossing",
  "Spot UV",
  "Gloss",
  "Matte",
  "Window",
  "Not sure — recommend",
];

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

interface QuoteFormProps {
  preselectedFamily?: string;
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

export function QuoteForm({ preselectedFamily }: QuoteFormProps) {
  const hasWhatsApp = Boolean(siteConfig.whatsappUrl);
  const [submissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt] = useState(() => Date.now());
  const [faxNumber, setFaxNumber] = useState("");
  const [form, setForm] = useState<FormState>({
    ...initialState,
    product_family:
      preselectedFamily && productStyles[preselectedFamily] ? preselectedFamily : "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const availableStyles = productStyles[form.product_family] ?? [];
  const availableMaterials = materialOptions[form.product_family] ?? [];
  const isExcludedMailer =
    form.product_family === "Mailer Boxes" && form.product_style === excludedMailerStyle;

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
        headers: {
          "Content-Type": "application/json",
        },
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
      <div className="surface-card p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
          <span className="text-2xl text-gold">✓</span>
        </div>
        <h2 className="mt-6 font-serif text-3xl text-foreground">
          Thank you. Your project enquiry is in.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          We will review your request and target an initial response within one
          business day. Structure, specifications, pricing, and production planning
          follow as the required details are confirmed.
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
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-12">
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
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
      <div className="hidden lg:col-span-4 lg:block">
        <div className="surface-card sticky top-28 p-8">
          <div className="eyebrow mb-4">Project details</div>
          <p className="text-sm leading-relaxed text-foreground/82">
            Start with the product family, quantity, intended use, delivery
            country, and contact details. Artwork and finish details can be
            added when available.
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <div className="eyebrow mb-3">What happens next</div>
            <ol className="space-y-4 text-sm text-foreground/82">
              <li>1. We review the request and target a reply within one business day.</li>
              <li>2. You receive an initial review of the information provided.</li>
              <li>3. We confirm specifications, dielines, pricing, and production details.</li>
            </ol>
          </div>

          {hasWhatsApp ? (
            <div className="mt-8 border-t border-border pt-6">
              <div className="eyebrow mb-3">Prefer to talk first?</div>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-gold"
              >
                Chat on WhatsApp
              </a>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Useful if you want to send references, artwork, or a quick note
                before filling the full spec.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-8 lg:col-span-8">
        <div className="surface-card p-8 md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-3xl text-foreground">
                Start with the basics
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Enough for a useful first review. Technical details can follow.
              </p>
            </div>
            <div className="eyebrow">Essential project details</div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
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

            <Field label="Product style" htmlFor="product_style" required>
              <select
                id="product_style"
                name="product_style"
                required
                value={form.product_style}
                onChange={(event) => update("product_style", event.target.value)}
                className={inputClass}
              >
                <option value="">
                  {form.product_family ? "Choose a style" : "Select family first"}
                </option>
                {availableStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              {form.product_family === "Mailer Boxes" ? (
                <p className={`text-xs leading-relaxed ${isExcludedMailer ? "text-red-700" : "text-muted-foreground"}`}>
                  Mailer boxes only. Regular slotted shipping cartons, master cartons,
                  and RSC cases are not supplied.
                </p>
              ) : null}
            </Field>

            <Field label="Quantity" htmlFor="quantity" required>
              <input
                id="quantity"
                name="quantity"
                required
                value={form.quantity}
                onChange={(event) => update("quantity", event.target.value)}
                className={inputClass}
                placeholder="e.g. 1,000 units"
              />
            </Field>

            <Field label="Intended end use" htmlFor="intended_end_use" required>
              <input
                id="intended_end_use"
                name="intended_end_use"
                required
                value={form.intended_end_use}
                onChange={(event) => update("intended_end_use", event.target.value)}
                className={inputClass}
                placeholder="Skincare, PR kit, coffee, retail product, etc."
              />
            </Field>

            <Field label="Delivery country / region" htmlFor="shipping_country" required>
              <input
                id="shipping_country"
                name="shipping_country"
                required
                value={form.shipping_country}
                onChange={(event) => update("shipping_country", event.target.value)}
                className={inputClass}
                autoComplete="country-name"
                placeholder="Country or region"
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

            <Field label="Company" htmlFor="company" required>
              <input
                id="company"
                name="company"
                required
                autoComplete="organization"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
                className={inputClass}
                placeholder="Brand or company name"
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

            <div className="sm:col-span-2">
              <Field label="Project notes" htmlFor="notes">
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  className={textareaClass}
                  rows={5}
                  placeholder="Share references, finish ideas, launch timing, or anything else that helps us understand the project."
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="surface-card p-8 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="eyebrow mb-3">Optional details</div>
              <h2 className="font-serif text-3xl text-foreground">
                Add delivery, artwork, and spec details.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Helpful if you already have them. Leave this closed if you do not.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced((current) => !current)}
              aria-expanded={showAdvanced}
              aria-controls="optional-quote-details"
              className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              {showAdvanced ? "Hide optional details" : "Add optional details"}
            </button>
          </div>

          {showAdvanced ? (
            <div id="optional-quote-details" className="mt-8 grid gap-6 sm:grid-cols-2">
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
                  <option value="Ready to upload">Ready to upload</option>
                  <option value="Needs dieline">Need a dieline</option>
                  <option value="Needs design help">Need design help</option>
                  <option value="Still in concept stage">Still in concept stage</option>
                </select>
              </Field>

              <Field label="State / province / region" htmlFor="shipping_state_or_province">
                <input
                  id="shipping_state_or_province"
                  name="shipping_state_or_province"
                  autoComplete="address-level1"
                  value={form.shipping_state_or_province}
                  onChange={(event) =>
                    update("shipping_state_or_province", event.target.value)
                  }
                  className={inputClass}
                  placeholder="State, province, region, etc."
                />
              </Field>

              <Field label="Preferred delivery timing" htmlFor="target_delivery_timing">
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
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="surface-card flex flex-col gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <div className="eyebrow mb-3">Submit</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              By submitting, you agree that UPG may use these details to respond
              to this request. Read our <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
          <button
            type="submit"
            disabled={submitting || isExcludedMailer}
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit project enquiry"}
          </button>
        </div>
      </div>
    </form>
  );
}

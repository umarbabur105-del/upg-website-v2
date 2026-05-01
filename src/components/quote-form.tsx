"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";

const productStyles: Record<string, string[]> = {
  Boxes: [
    "Corrugated Mailer Box",
    "Magnetic Closure Rigid Box",
    "Reverse Tuck End Folding Carton",
    "Custom / Other",
  ],
  "Mylar Bags": ["Stand Up Mylar Pouch", "Custom / Other"],
  "Paper Cups": ["Single Wall Paper Cup", "Custom / Other"],
  "Not sure yet": ["Recommend a structure for me"],
};

const materialOptions: Record<string, string[]> = {
  Boxes: [
    "SBS paperboard",
    "Kraft paperboard",
    "Corrugated",
    "Rigid chipboard",
    "Not sure — recommend",
  ],
  "Mylar Bags": [
    "PET / VMPET / PE",
    "Kraft / PET / PE",
    "Matte film",
    "Not sure — recommend",
  ],
  "Paper Cups": [
    "Food-grade cup stock",
    "PE lined",
    "Bio-PLA option on review",
    "Not sure — recommend",
  ],
  "Not sure yet": ["Not sure — recommend"],
};

const shippingCountries = ["United States", "Canada"];

const finishOptions = [
  "Soft-touch matte",
  "Foil stamping",
  "Embossing / Debossing",
  "Spot UV",
  "Gloss",
  "Matte",
  "Not sure — recommend",
];

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
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
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
  const hasWhatsApp = Boolean(siteConfig.whatsappNumber);
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

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Quote submission failed");
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again or reach out on WhatsApp."
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
          Thank you. Your quote request is in.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          We will review your request and come back with a structured response.
          If the project is urgent, use the fastest contact path available on the site.
        </p>
        {hasWhatsApp ? (
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
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
      <div className="lg:col-span-4">
        <div className="surface-card sticky top-28 p-8">
          <div className="eyebrow mb-4">Fast start</div>
          <p className="text-sm leading-relaxed text-foreground/82">
            Start with the basics: product family, quantity, contact details,
            and a short note. Shipping, artwork, and finish details are
            optional and can be added after the first reply.
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <div className="eyebrow mb-3">What happens next</div>
            <ol className="space-y-4 text-sm text-foreground/82">
              <li>1. We review the request, usually the same day.</li>
              <li>2. You get a structured commercial reply with the next step.</li>
              <li>3. Specs, dielines, and production details are refined after that.</li>
            </ol>
          </div>

          {hasWhatsApp ? (
            <div className="mt-8 border-t border-border pt-6">
              <div className="eyebrow mb-3">Prefer to talk first?</div>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
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
                Enough for a useful first quote. The technical details can come after.
              </p>
            </div>
            <div className="eyebrow">Lighter first contact</div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Field label="Product family" required>
              <select
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

            <Field label="Product style">
              <select
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
            </Field>

            <Field label="Quantity" required>
              <input
                value={form.quantity}
                onChange={(event) => update("quantity", event.target.value)}
                className={inputClass}
                placeholder="e.g. 1,000 units"
              />
            </Field>

            <Field label="Intended end use" required>
              <input
                value={form.intended_end_use}
                onChange={(event) => update("intended_end_use", event.target.value)}
                className={inputClass}
                placeholder="Skincare, PR kit, ecommerce shipper, etc."
              />
            </Field>

            <Field label="Full name" required>
              <input
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </Field>

            <Field label="Email" required>
              <input
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className={inputClass}
                type="email"
                placeholder="you@brand.com"
              />
            </Field>

            <Field label="Company" required>
              <input
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
                className={inputClass}
                placeholder="Brand or company name"
              />
            </Field>

            <Field label="Phone / WhatsApp">
              <input
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                className={inputClass}
                placeholder="+1 ..."
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Project notes">
                <textarea
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
                Add shipping, artwork, and spec details.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Helpful if you already have them. Leave this closed if you do not.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced((current) => !current)}
              className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              {showAdvanced ? "Hide optional details" : "Add optional details"}
            </button>
          </div>

          {showAdvanced ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label="Dimensions">
                <input
                  value={form.dimensions}
                  onChange={(event) => update("dimensions", event.target.value)}
                  className={inputClass}
                  placeholder="L × W × H"
                />
              </Field>

              <Field label="Website">
                <input
                  value={form.website}
                  onChange={(event) => update("website", event.target.value)}
                  className={inputClass}
                  placeholder="https://"
                />
              </Field>

              <Field label="Material preference">
                <select
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

              <Field label="Finish preference">
                <select
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

              <Field label="Artwork status">
                <select
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

              <Field label="Shipping country">
                <select
                  value={form.shipping_country}
                  onChange={(event) =>
                    update("shipping_country", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="">Choose or skip</option>
                  {shippingCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="State / Province">
                <input
                  value={form.shipping_state_or_province}
                  onChange={(event) =>
                    update("shipping_state_or_province", event.target.value)
                  }
                  className={inputClass}
                  placeholder="California, Ontario, etc."
                />
              </Field>

              <Field label="Target delivery timing">
                <select
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
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="surface-card flex flex-col gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <div className="eyebrow mb-3">Submit</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Structured reply within one business day.
            </p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit quote request"}
          </button>
        </div>
      </div>
    </form>
  );
}

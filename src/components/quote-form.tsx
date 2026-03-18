"use client";

import { useState, type FormEvent } from "react";

const productStyles: Record<string, string[]> = {
  Boxes: [
    "Reverse Tuck End Folding Carton",
    "Straight Tuck End Folding Carton",
    "Auto Bottom Folding Carton",
    "Corrugated Mailer Box",
    "Regular Corrugated Shipper",
    "Magnetic Closure Rigid Box",
    "Book Style Rigid Box",
    "Custom / Other",
  ],
  "Mylar Bags": [
    "Stand Up Mylar Pouch",
    "Flat Mylar Pouch",
    "Side Gusset Mylar Pouch",
    "Kraft Mylar Pouch",
    "Custom / Other",
  ],
  "Paper Cups": [
    "Single Wall Paper Cup",
    "Double Wall Paper Cup",
    "Ripple Wall Paper Cup",
    "Custom / Other",
  ],
};

const deliveryTimingOptions = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 30 days",
  "More than 30 days",
  "Not sure yet",
];

const artworkStatusOptions = [
  "Ready to upload",
  "Needs dieline",
  "Needs design help",
  "Still in concept stage",
];

const materialOptions: Record<string, string[]> = {
  Boxes: ["SBS Paperboard", "CCNB Paperboard", "Kraft Paperboard", "E-Flute Corrugated", "B-Flute Corrugated", "Chipboard (Rigid)", "Other"],
  "Mylar Bags": ["PET/VMPET/PE", "Kraft/PET/PE", "Matte Film", "Clear Window", "Custom Barrier", "Other"],
  "Paper Cups": ["Standard Cup Stock", "PE Lined", "PLA Lined", "Other"],
};

const printOptions = ["Full Color (CMYK)", "PMS / Spot Color", "1-2 Color", "No Print", "Other"];

const finishOptions = ["Matte Lamination", "Gloss Lamination", "Soft-Touch", "Spot UV", "Foil Stamping", "Embossing/Debossing", "None", "Other"];

interface FormState {
  product_family: string;
  product_style: string;
  quantity: string;
  length: string;
  width: string;
  height: string;
  unit: string;
  material_preference: string;
  print_preference: string;
  finish_preference: string[];
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
  notes: string;
}

const initialState: FormState = {
  product_family: "",
  product_style: "",
  quantity: "",
  length: "",
  width: "",
  height: "",
  unit: "inches",
  material_preference: "",
  print_preference: "",
  finish_preference: [],
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
  notes: "",
};

export function QuoteForm({ preselectedFamily }: { preselectedFamily?: string }) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    product_family: preselectedFamily || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof FormState, value: string | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleFinish(value: string) {
    setForm((prev) => {
      const current = prev.finish_preference;
      if (current.includes(value)) {
        return { ...prev, finish_preference: current.filter((v) => v !== value) };
      }
      return { ...prev, finish_preference: [...current, value] };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/30 bg-cream p-10 text-center">
        <h3 className="font-serif text-2xl font-semibold text-charcoal">
          Thank you for your request
        </h3>
        <p className="mt-4 text-base leading-relaxed text-charcoal/70">
          Standard quote requests are reviewed within 24 hours. If we need
          clarification on structure, material, or end use, we will contact you
          before final pricing.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
  const labelClass = "mb-1.5 block text-sm font-medium text-charcoal";
  const requiredMark = <span className="text-gold">*</span>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Product selection */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-semibold text-charcoal">
          Product Details
        </legend>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Product Family {requiredMark}</label>
            <select
              required
              value={form.product_family}
              onChange={(e) => {
                update("product_family", e.target.value);
                update("product_style", "");
                update("material_preference", "");
              }}
              className={inputClass}
            >
              <option value="">Select a product family</option>
              <option value="Boxes">Boxes</option>
              <option value="Mylar Bags">Mylar Bags</option>
              <option value="Paper Cups">Paper Cups</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Product Style {requiredMark}</label>
            <select
              required
              value={form.product_style}
              onChange={(e) => update("product_style", e.target.value)}
              className={inputClass}
              disabled={!form.product_family}
            >
              <option value="">Select a style</option>
              {form.product_family &&
                productStyles[form.product_family]?.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Quantity {requiredMark}</label>
          <input
            type="number"
            required
            min={1}
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            placeholder="e.g. 1000"
            className={inputClass}
          />
        </div>

        {/* Dimensions */}
        <div>
          <label className={labelClass}>Dimensions {requiredMark}</label>
          <div className="grid grid-cols-4 gap-2">
            <input
              type="text"
              required
              value={form.length}
              onChange={(e) => update("length", e.target.value)}
              placeholder="Length"
              className={inputClass}
            />
            <input
              type="text"
              required
              value={form.width}
              onChange={(e) => update("width", e.target.value)}
              placeholder="Width"
              className={inputClass}
            />
            <input
              type="text"
              required
              value={form.height}
              onChange={(e) => update("height", e.target.value)}
              placeholder="Height"
              className={inputClass}
            />
            <select
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              className={inputClass}
            >
              <option value="inches">in</option>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Material and finishing */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-semibold text-charcoal">
          Material & Finishing
        </legend>

        <div>
          <label className={labelClass}>Material Preference {requiredMark}</label>
          <select
            required
            value={form.material_preference}
            onChange={(e) => update("material_preference", e.target.value)}
            className={inputClass}
          >
            <option value="">Select material</option>
            {(form.product_family
              ? materialOptions[form.product_family] || []
              : Object.values(materialOptions).flat().filter((v, i, a) => a.indexOf(v) === i)
            ).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Print Preference {requiredMark}</label>
          <select
            required
            value={form.print_preference}
            onChange={(e) => update("print_preference", e.target.value)}
            className={inputClass}
          >
            <option value="">Select print option</option>
            {printOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Finish Preference {requiredMark}</label>
          <div className="flex flex-wrap gap-2">
            {finishOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleFinish(opt)}
                className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors ${
                  form.finish_preference.includes(opt)
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-charcoal/15 text-charcoal/60 hover:border-gold/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Intended End Use {requiredMark}</label>
          <textarea
            required
            value={form.intended_end_use}
            onChange={(e) => update("intended_end_use", e.target.value)}
            placeholder="Describe what the packaging will contain and how it will be used"
            rows={3}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-charcoal/40">
            Required for food-contact screening, barrier selection, and coating
            approval.
          </p>
        </div>
      </fieldset>

      {/* Shipping */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-semibold text-charcoal">
          Shipping & Timeline
        </legend>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Shipping Country {requiredMark}</label>
            <select
              required
              value={form.shipping_country}
              onChange={(e) => update("shipping_country", e.target.value)}
              className={inputClass}
            >
              <option value="">Select country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>State / Province {requiredMark}</label>
            <input
              type="text"
              required
              value={form.shipping_state_or_province}
              onChange={(e) =>
                update("shipping_state_or_province", e.target.value)
              }
              placeholder="e.g. California"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Target Delivery Timing {requiredMark}
            </label>
            <select
              required
              value={form.target_delivery_timing}
              onChange={(e) =>
                update("target_delivery_timing", e.target.value)
              }
              className={inputClass}
            >
              <option value="">Select timing</option>
              {deliveryTimingOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Artwork Status {requiredMark}</label>
            <select
              required
              value={form.artwork_status}
              onChange={(e) => update("artwork_status", e.target.value)}
              className={inputClass}
            >
              <option value="">Select status</option>
              {artworkStatusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Contact info */}
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-semibold text-charcoal">
          Your Information
        </legend>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Name {requiredMark}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email {requiredMark}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone {requiredMark}</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Company {requiredMark}</label>
            <input
              type="text"
              required
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Website</label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Project Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Any additional details about your project"
            rows={4}
            className={inputClass}
          />
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-sm bg-gold px-8 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark disabled:opacity-50 md:w-auto"
      >
        {submitting ? "Submitting..." : "Submit Quote Request"}
      </button>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

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

// Simplified plain-English material options per family
const simplifiedMaterials: Record<string, { label: string; value: string; note?: string }[]> = {
  Boxes: [
    { label: "Standard White", value: "SBS Paperboard", note: "Most common for retail & cosmetics" },
    { label: "Kraft / Natural Brown", value: "Kraft Paperboard", note: "Eco-friendly, unbleached look" },
    { label: "Corrugated / Shipper", value: "E-Flute Corrugated", note: "For mailer boxes & shipping" },
    { label: "Premium Rigid Board", value: "Chipboard (Rigid)", note: "Luxury boxes with sturdy walls" },
    { label: "Not sure — let UPG recommend", value: "Other" },
  ],
  "Mylar Bags": [
    { label: "Standard Foil (Silver)", value: "PET/VMPET/PE", note: "Maximum barrier, glossy finish" },
    { label: "Kraft / Natural Look", value: "Kraft/PET/PE", note: "Eco-style with good barrier" },
    { label: "Clear Window", value: "Clear Window", note: "See-through panel on front or back" },
    { label: "Not sure — let UPG recommend", value: "Other" },
  ],
  "Paper Cups": [
    { label: "Standard White", value: "Standard Cup Stock", note: "Most common for hot & cold drinks" },
    { label: "Kraft / Natural Brown", value: "PE Lined", note: "Natural look with moisture barrier" },
    { label: "Not sure — let UPG recommend", value: "Other" },
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
  { value: "Ready to upload", label: "Ready to upload", description: "I have final artwork files" },
  { value: "Needs dieline", label: "Need a dieline", description: "I need the template first" },
  { value: "Needs design help", label: "Need design help", description: "I want UPG to help with design" },
  { value: "Still in concept stage", label: "Still in concept", description: "Early stage, no files yet" },
];

const printOptions = ["Full Color (CMYK)", "PMS / Spot Color", "1-2 Color", "No Print"];
const finishOptions = ["Matte Lamination", "Gloss Lamination", "Soft-Touch", "Spot UV", "Foil Stamping", "Embossing / Debossing", "None"];

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  product_family: string;
  product_style: string;
  quantity: string;
  intended_end_use: string;
  length: string;
  width: string;
  height: string;
  unit: string;
  material_preference: string;
  print_preference: string;
  finish_preference: string[];
  artwork_status: string;
  shipping_country: string;
  shipping_state_or_province: string;
  target_delivery_timing: string;
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
  intended_end_use: "",
  length: "",
  width: "",
  height: "",
  unit: "inches",
  material_preference: "",
  print_preference: "",
  finish_preference: [],
  artwork_status: "",
  shipping_country: "",
  shipping_state_or_province: "",
  target_delivery_timing: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  notes: "",
};

// ── Step validation ───────────────────────────────────────────────────────────

function validateStep(step: number, form: FormState): string | null {
  if (step === 1) {
    if (!form.product_family) return "Please select a product type.";
    if (!form.product_style) return "Please select a product style.";
    if (!form.quantity || Number(form.quantity) < 1) return "Please enter a valid quantity.";
  }
  if (step === 2) {
    if (!form.material_preference) return "Please select a material option.";
    if (!form.print_preference) return "Please select a print preference.";
    if (!form.artwork_status) return "Please select your artwork status.";
    if (!form.shipping_country) return "Please select a shipping country.";
    if (!form.shipping_state_or_province) return "Please enter your state or province.";
    if (!form.target_delivery_timing) return "Please select a target delivery timing.";
  }
  if (step === 3) {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email address.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.company.trim()) return "Please enter your company name.";
  }
  return null;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const steps = ["What do you need?", "Packaging details", "About you"];
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === step;
          const isDone = stepNum < step;
          return (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    isDone
                      ? "bg-gold text-charcoal"
                      : isActive
                      ? "border-2 border-gold bg-gold/10 text-gold"
                      : "border-2 border-charcoal/15 bg-white text-charcoal/40"
                  }`}
                >
                  {isDone ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 transition-colors ${isDone ? "bg-gold" : "bg-charcoal/10"}`}
                  />
                )}
              </div>
              <span
                className={`mt-2 hidden text-xs sm:block ${
                  isActive ? "font-semibold text-charcoal" : "text-charcoal/40"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FamilyCard({
  label,
  value,
  selected,
  onClick,
  icon,
}: {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-3 rounded-sm border-2 p-6 text-center transition-all ${
        selected
          ? "border-gold bg-gold/5 text-charcoal"
          : "border-charcoal/12 bg-white text-charcoal hover:border-gold/40"
      }`}
    >
      <span className={`${selected ? "text-gold" : "text-charcoal/40"} transition-colors`}>{icon}</span>
      <span className="font-serif text-base font-semibold">{label}</span>
    </button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function BoxIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="16" width="28" height="20" rx="1" />
      <path d="M6 16 L20 9 L34 16" />
      <line x1="20" y1="9" x2="20" y2="16" strokeDasharray="3 2" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 36 Q9 24 8 12 L16 8 L24 8 L32 12 Q31 24 30 36 Z" />
      <line x1="10" y1="14" x2="30" y2="14" strokeWidth="2" />
      <path d="M16 8 L16 4 M24 8 L24 4" />
      <path d="M16 4 Q20 2 24 4" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 8 L13 36 L27 36 L30 8 Z" />
      <ellipse cx="20" cy="8" rx="10" ry="3" />
      <path d="M12 22 L13 28 L27 28 L28 22 Z" />
    </svg>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

export function QuoteForm({ preselectedFamily }: { preselectedFamily?: string }) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    product_family: preselectedFamily || "",
  });
  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  function goNext() {
    const err = validateStep(step, form);
    if (err) {
      setStepError(err);
      return;
    }
    setStepError("");
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStepError("");
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const err = validateStep(3, form);
    if (err) { setStepError(err); return; }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success state ────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/30 bg-cream p-10 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-charcoal">
          Quote request received
        </h3>
        <p className="mt-3 text-base leading-relaxed text-charcoal/70">
          We will send pricing to <strong>{form.email}</strong> within 24 business hours.
          If we need clarification on structure, material, or end use, we will reach out before finalising pricing.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
  const labelClass = "mb-1.5 block text-sm font-medium text-charcoal";
  const req = <span className="text-gold">*</span>;

  // ── Step 1 ───────────────────────────────────────────────────────────────────

  const step1 = (
    <div className="space-y-8">
      {/* Product family — card selector */}
      <div>
        <p className={labelClass}>Product type {req}</p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          <FamilyCard
            label="Boxes"
            value="Boxes"
            selected={form.product_family === "Boxes"}
            onClick={() => { update("product_family", "Boxes"); update("product_style", ""); update("material_preference", ""); }}
            icon={<BoxIcon />}
          />
          <FamilyCard
            label="Mylar Bags"
            value="Mylar Bags"
            selected={form.product_family === "Mylar Bags"}
            onClick={() => { update("product_family", "Mylar Bags"); update("product_style", ""); update("material_preference", ""); }}
            icon={<BagIcon />}
          />
          <FamilyCard
            label="Paper Cups"
            value="Paper Cups"
            selected={form.product_family === "Paper Cups"}
            onClick={() => { update("product_family", "Paper Cups"); update("product_style", ""); update("material_preference", ""); }}
            icon={<CupIcon />}
          />
        </div>
      </div>

      {/* Product style — appears after family selected */}
      {form.product_family && (
        <div>
          <label className={labelClass}>Product style {req}</label>
          <select
            value={form.product_style}
            onChange={(e) => update("product_style", e.target.value)}
            className={inputClass}
          >
            <option value="">Select a style</option>
            {productStyles[form.product_family]?.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className={labelClass}>Quantity {req}</label>
        <input
          type="number"
          min={1}
          value={form.quantity}
          onChange={(e) => update("quantity", e.target.value)}
          placeholder="e.g. 1000"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-charcoal/40">Not sure? Enter your best estimate — we can work around it.</p>
      </div>

      {/* Intended end use */}
      <div>
        <label className={labelClass}>Intended end use</label>
        <input
          type="text"
          value={form.intended_end_use}
          onChange={(e) => update("intended_end_use", e.target.value)}
          placeholder="e.g. cosmetics, supplements, food, apparel, gift packaging"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-charcoal/40">Helps us flag any food-contact or regulatory requirements early.</p>
      </div>
    </div>
  );

  // ── Step 2 ───────────────────────────────────────────────────────────────────

  const step2 = (
    <div className="space-y-8">
      {/* Dimensions */}
      <div>
        <label className={labelClass}>Dimensions (optional)</label>
        <div className="grid grid-cols-4 gap-2">
          <input type="text" value={form.length} onChange={(e) => update("length", e.target.value)} placeholder="Length" className={inputClass} />
          <input type="text" value={form.width} onChange={(e) => update("width", e.target.value)} placeholder="Width" className={inputClass} />
          <input type="text" value={form.height} onChange={(e) => update("height", e.target.value)} placeholder="Height" className={inputClass} />
          <select value={form.unit} onChange={(e) => update("unit", e.target.value)} className={inputClass}>
            <option value="inches">in</option>
            <option value="mm">mm</option>
            <option value="cm">cm</option>
          </select>
        </div>
        <p className="mt-1.5 text-xs text-charcoal/40">Leave blank if you need help sizing — we will ask in the quote follow-up.</p>
      </div>

      {/* Material preference — simplified */}
      <div>
        <label className={labelClass}>Material {req}</label>
        <div className="mt-2 space-y-2">
          {(simplifiedMaterials[form.product_family] ?? simplifiedMaterials["Boxes"]).map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition-colors ${
                form.material_preference === opt.value
                  ? "border-gold bg-gold/5"
                  : "border-charcoal/12 hover:border-gold/40"
              }`}
            >
              <input
                type="radio"
                name="material"
                value={opt.value}
                checked={form.material_preference === opt.value}
                onChange={() => update("material_preference", opt.value)}
                className="mt-0.5 accent-gold"
              />
              <span>
                <span className="block text-sm font-medium text-charcoal">{opt.label}</span>
                {opt.note && <span className="block text-xs text-charcoal/50">{opt.note}</span>}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Print preference */}
      <div>
        <label className={labelClass}>Print preference {req}</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {printOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update("print_preference", opt)}
              className={`rounded-sm border px-4 py-2 text-sm font-medium transition-colors ${
                form.print_preference === opt
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-charcoal/15 text-charcoal/60 hover:border-gold/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Finish preference */}
      <div>
        <label className={labelClass}>Finish (select all that apply)</label>
        <div className="mt-2 flex flex-wrap gap-2">
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

      {/* Artwork status — radio cards */}
      <div>
        <label className={labelClass}>Artwork status {req}</label>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {artworkStatusOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition-colors ${
                form.artwork_status === opt.value
                  ? "border-gold bg-gold/5"
                  : "border-charcoal/12 hover:border-gold/40"
              }`}
            >
              <input
                type="radio"
                name="artwork"
                value={opt.value}
                checked={form.artwork_status === opt.value}
                onChange={() => update("artwork_status", opt.value)}
                className="mt-1 accent-gold"
              />
              <span>
                <span className="block text-sm font-medium text-charcoal">{opt.label}</span>
                <span className="block text-xs text-charcoal/50">{opt.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Shipping */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Shipping country {req}</label>
          <select value={form.shipping_country} onChange={(e) => update("shipping_country", e.target.value)} className={inputClass}>
            <option value="">Select country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>State / Province {req}</label>
          <input
            type="text"
            value={form.shipping_state_or_province}
            onChange={(e) => update("shipping_state_or_province", e.target.value)}
            placeholder="e.g. California"
            className={inputClass}
          />
        </div>
      </div>

      {/* Delivery timing */}
      <div>
        <label className={labelClass}>Target delivery timing {req}</label>
        <select value={form.target_delivery_timing} onChange={(e) => update("target_delivery_timing", e.target.value)} className={inputClass}>
          <option value="">Select timing</option>
          {deliveryTimingOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );

  // ── Step 3 ───────────────────────────────────────────────────────────────────

  const step3 = (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full name {req}</label>
          <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email {req}</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@brand.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Phone {req}</label>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 (555) 000-0000" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Company {req}</label>
          <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Your Brand LLC" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Website <span className="font-normal text-charcoal/40">(optional)</span></label>
        <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Project notes <span className="font-normal text-charcoal/40">(optional)</span></label>
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={4}
          placeholder="Anything else we should know — fragile contents, specific deadlines, reorder from another supplier, etc."
          className={inputClass}
        />
      </div>
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ProgressBar step={step} />

      <div className="min-h-[400px]">
        {step === 1 && step1}
        {step === 2 && step2}
        {step === 3 && step3}
      </div>

      {stepError && (
        <p className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {stepError}
        </p>
      )}

      {submitError && (
        <p className="mt-4 text-sm text-red-600">{submitError}</p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-charcoal/8 pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="rounded-sm border border-charcoal/20 px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-charcoal/40"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-sm bg-gold px-8 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="rounded-sm bg-gold px-8 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Quote Request"}
          </button>
        )}
      </div>
    </form>
  );
}

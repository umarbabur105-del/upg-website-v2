"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { trackGenerateLead } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/lead-attribution";

const productFamilies = [
  "Tuck Boxes",
  "Mailer Boxes",
  "Magnetic Boxes",
  "Collapsible Magnetic Boxes",
  "Mylar Bags",
  "Not sure yet",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [productFamily, setProductFamily] = useState("Not sure yet");
  const [message, setMessage] = useState("");
  const [submissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt] = useState(() => Date.now());
  const [faxNumber, setFaxNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          product_family: productFamily,
          message,
          submission_id: submissionId,
          form_started_at: formStartedAt,
          fax_number: faxNumber,
          attribution: getLeadAttribution(),
        }),
      });
      const data = await res.json();
      if (!res.ok || data.accepted !== true) {
        throw new Error(data.error ?? "Submission failed");
      }
      trackGenerateLead("contact_form", { product_family: productFamily });
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/30 bg-cream p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
          <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-charcoal">Message received</h3>
        <p className="mt-2 text-sm text-charcoal/60">
          We target an initial response within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
  const labelClass = "mb-1.5 block text-sm font-medium text-charcoal";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-fax-number">Fax number</label>
        <input
          id="contact-fax-number"
          name="fax_number"
          tabIndex={-1}
          autoComplete="off"
          value={faxNumber}
          onChange={(event) => setFaxNumber(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contact-name" className={labelClass}>Name <span className="text-gold">*</span></label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>Email <span className="text-gold">*</span></label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@brand.com"
          className={inputClass}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className={labelClass}>Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Brand or company"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>Phone</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 ..."
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-product-family" className={labelClass}>
          Packaging type <span className="font-normal text-charcoal/50">(optional)</span>
        </label>
        <select
          id="contact-product-family"
          name="product_family"
          value={productFamily}
          onChange={(event) => setProductFamily(event.target.value)}
          className={inputClass}
        >
          {productFamilies.map((family) => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>Message <span className="text-gold">*</span></label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell us about your product, packaging needs, quantity, or destination."
          className={inputClass}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
      <p className="text-xs leading-relaxed text-charcoal/60">
        By submitting, you agree that UPG may use these details to respond to
        your message. Read our <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}

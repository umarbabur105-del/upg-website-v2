"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { trackGenerateLead } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/lead-attribution";
import { shouldTrackGenerateLead } from "@/lib/lead-delivery";

const productInterests = [
  "Tuck Boxes",
  "Mailer Boxes",
  "Magnetic Boxes",
  "Collapsible Magnetic Boxes",
  "Mylar Bags",
  "Multiple product families",
  "Not sure yet",
] as const;

export function SampleRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [productInterest, setProductInterest] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [message, setMessage] = useState("");
  const [submissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt] = useState(() => Date.now());
  const [faxNumber, setFaxNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !company.trim() ||
      !productInterest ||
      !shippingCountry.trim() ||
      !message.trim()
    ) {
      setError("Please complete the required fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/sample-kit/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          website,
          product_interest: productInterest,
          shipping_country: shippingCountry,
          message,
          submission_id: submissionId,
          form_started_at: formStartedAt,
          fax_number: faxNumber,
          attribution: getLeadAttribution(),
        }),
      });
      const result = (await response.json()) as {
        accepted?: boolean;
        recorded?: boolean;
        ignored?: boolean;
        deduplicated?: boolean;
        error?: string;
      };

      if (!response.ok || result.accepted !== true) {
        throw new Error(result.error ?? "Sample request could not be sent.");
      }

      if (shouldTrackGenerateLead(result)) {
        trackGenerateLead("sample_request_form", {
          product_interest: productInterest,
          shipping_country: shippingCountry,
        });
      }
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
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
          ✓
        </div>
        <h3 className="font-serif text-2xl text-foreground">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          UPG will review the project fit and confirm sample availability, cost,
          and delivery timing before anything is shipped.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="sample-fax-number">Fax number</label>
        <input
          id="sample-fax-number"
          name="fax_number"
          tabIndex={-1}
          autoComplete="off"
          value={faxNumber}
          onChange={(event) => setFaxNumber(event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sample-name" className={labelClass}>
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="sample-name"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sample-email" className={labelClass}>
            Work email <span className="text-gold">*</span>
          </label>
          <input
            id="sample-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sample-company" className={labelClass}>
            Company <span className="text-gold">*</span>
          </label>
          <input
            id="sample-company"
            required
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sample-phone" className={labelClass}>Phone</label>
          <input
            id="sample-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sample-website" className={labelClass}>Company website</label>
        <input
          id="sample-website"
          type="url"
          autoComplete="url"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          placeholder="https://"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sample-product-interest" className={labelClass}>
            Product interest <span className="text-gold">*</span>
          </label>
          <select
            id="sample-product-interest"
            required
            value={productInterest}
            onChange={(event) => setProductInterest(event.target.value)}
            className={inputClass}
          >
            <option value="">Select a product</option>
            {productInterests.map((interest) => (
              <option key={interest} value={interest}>{interest}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sample-shipping-country" className={labelClass}>
            Delivery country <span className="text-gold">*</span>
          </label>
          <input
            id="sample-shipping-country"
            required
            autoComplete="country-name"
            value={shippingCountry}
            onChange={(event) => setShippingCountry(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sample-message" className={labelClass}>
          What do you need to evaluate? <span className="text-gold">*</span>
        </label>
        <textarea
          id="sample-message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us about the product, expected order quantity, material, finish, or packaging decision behind the request."
          className={inputClass}
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep disabled:opacity-50"
      >
        {submitting ? "Sending request..." : "Request a Free Sample Review"}
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Free samples are reviewed for project fit and availability. Submission
        does not guarantee shipment. By submitting, you agree that UPG may use
        these details to respond. Read our{" "}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}

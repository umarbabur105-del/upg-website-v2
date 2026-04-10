import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact UPG",
  description:
    "Get in touch with UPG for custom packaging guidance or to ask questions before submitting a quote.",
  alternates: { canonical: "https://universalpackaginggroup.com/contact" },
  openGraph: {
    type: "website",
    title: "Contact UPG",
    description:
      "Get in touch with UPG for custom packaging guidance or to ask questions before submitting a quote.",
    url: "https://universalpackaginggroup.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading className="text-offwhite">
            Get in touch
          </SectionHeading>
          <SectionSubheading className="text-offwhite/60">
            Have a question before submitting a quote? Want guidance on the right
            packaging for your product? Send us a message and we will get back to
            you within 1 business day.
          </SectionSubheading>
        </div>
      </section>

      {/* Contact section */}
      <Section variant="cream">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — contact form */}
          <div>
            <h3 className="mb-8 font-serif text-2xl font-semibold text-charcoal">
              Send a message
            </h3>
            <ContactForm />
          </div>

          {/* Right — direct contact + quote CTA */}
          <div className="space-y-8">
            {/* Email */}
            <div className="rounded-sm border border-charcoal/5 bg-surface p-8">
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Prefer to email directly?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                Send your question or project details to our quoting address.
                We respond to all messages within 1 business day.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-5 inline-block text-sm font-semibold text-gold hover:text-gold-dark"
              >
                {siteConfig.email} →
              </a>
            </div>

            {/* Quote CTA */}
            <div className="rounded-sm border border-charcoal/5 bg-surface p-8">
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                Ready to get pricing?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                If you already know what you need — product type, quantity,
                destination — the quote form is the fastest path to pricing.
              </p>
              <Link
                href="/get-a-quote"
                className="mt-5 inline-block rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
              >
                Go to Quote Form →
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

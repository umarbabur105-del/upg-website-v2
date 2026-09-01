import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { PublicEmail } from "@/components/public-email";
import { siteConfig } from "@/data/site";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Universal Packaging Group",
  description:
    "Contact UPG about custom boxes, flexible packaging, manufacturing, samples, and worldwide delivery.",
  path: "/contact",
  keywords: ["contact UPG packaging", "custom packaging consultation"],
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#webpage`,
      url: `${SITE_URL}/contact`,
      name: "Contact Universal Packaging Group",
      description:
        "Contact UPG about custom boxes, flexible packaging, manufacturing, samples, and worldwide delivery.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: `${SITE_URL}/contact`,
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading as="h1" className="text-offwhite">
            Get in touch
          </SectionHeading>
          <SectionSubheading className="text-offwhite/60">
            Tell us about the product, packaging format, quantity, or destination.
            We can help with structure, materials, artwork, manufacturing, and
            worldwide delivery.
          </SectionSubheading>
        </div>
      </section>

      {/* Contact section */}
      <Section variant="cream">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — contact form */}
          <div>
            <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal">
              Send a message
            </h2>
            <ContactForm />
          </div>

          {/* Right — direct contact + quote CTA */}
          <div className="space-y-8">
            {/* Direct contact */}
            <div className="rounded-sm border border-charcoal/5 bg-surface p-8">
              <h2 className="font-serif text-xl font-semibold text-charcoal">
                Contact our sales team directly
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                Email, call, or start a WhatsApp conversation. We target an
                initial response within one business day.
              </p>
              <div className="mt-5 flex flex-col items-start gap-3 text-sm font-semibold">
                <PublicEmail
                  className="text-gold hover:text-gold-dark"
                  suffix=" →"
                />
                <a
                  href={`tel:${siteConfig.phoneNumber}`}
                  className="text-gold hover:text-gold-dark"
                >
                  {siteConfig.phoneDisplay} →
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-charcoal/10 px-5 py-2.5 text-charcoal hover:border-gold hover:text-gold-dark"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Quote CTA */}
            <div className="rounded-sm border border-charcoal/5 bg-surface p-8">
              <h2 className="font-serif text-xl font-semibold text-charcoal">
                Ready to start a project?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                If you know the product type, quantity, and destination, the
                project form is the recommended way to begin specification and pricing.
              </p>
              <Link
                href="/get-a-quote"
                className="mt-5 inline-block rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
              >
                Start Your Project →
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

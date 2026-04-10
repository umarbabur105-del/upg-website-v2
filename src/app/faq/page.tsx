import type { Metadata } from "next";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBanner } from "@/components/cta-banner";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ — UPG Custom Packaging",
  description:
    "Common questions about ordering custom packaging from UPG — MOQs, lead times, design help, and more.",
  alternates: { canonical: "https://universalpackaginggroup.com/faq" },
  openGraph: {
    type: "website",
    title: "FAQ | UPG",
    description:
      "Frequently asked questions about UPG custom packaging — MOQs, quoting, design support, and more.",
    url: "https://universalpackaginggroup.com/faq",
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading className="text-offwhite">
            Frequently Asked Questions
          </SectionHeading>
          <SectionSubheading className="text-offwhite/60">
            Common questions about quoting, ordering, and working with UPG.
          </SectionSubheading>
        </div>
      </section>

      {/* FAQ */}
      <Section variant="cream">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faqItems} />
        </div>
      </Section>

      <CtaBanner
        heading="Still have questions?"
        description="Reach out directly and we will get back to you with answers."
        ctaText="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}

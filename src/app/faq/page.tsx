import type { Metadata } from "next";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaBanner } from "@/components/cta-banner";
import { faqItems } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging FAQ",
  description:
    "Answers about UPG custom packaging, MOQs, manufacturing timelines, dielines, samples, pricing, and worldwide delivery.",
  path: "/faq",
  keywords: [
    "custom packaging FAQ",
    "custom packaging MOQ",
    "packaging production timeline",
    "custom packaging samples",
  ],
});

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
          <SectionHeading as="h1" className="text-offwhite">
            Frequently Asked Questions
          </SectionHeading>
          <SectionSubheading className="text-offwhite/60">
            Common questions about custom packaging, manufacturing, ordering, and delivery.
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

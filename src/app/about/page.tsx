import type { Metadata } from "next";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "About",
  description:
    "UPG is a North America-facing custom packaging partner focused on clarity, not guesswork.",
};

const whatMakesItWork = [
  {
    title: "Quote-Led Pricing",
    description:
      "Every project is priced based on actual specs — not one-size-fits-all rates.",
  },
  {
    title: "Product-Family Coverage",
    description:
      "Boxes, pouches, and cups all quoted through a single process.",
  },
  {
    title: "Supplier-Managed Production",
    description:
      "Fit-for-purpose sourcing and production coordination handled for you.",
  },
  {
    title: "Hands-On Attention",
    description:
      "Direct focus on artwork, structure, and delivery requirements for every project.",
  },
];

const whoWeServe = [
  "Growing e-commerce brands",
  "Retail-focused product companies",
  "Beauty and personal care brands",
  "Beverage and hospitality operators",
  "Specialty product businesses that need custom packaging without enterprise complexity",
];

const whatToExpect = [
  "Fast first response",
  "Practical packaging guidance",
  "Custom sizing and printing options",
  "Clear review of production timing and shipping path",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading className="text-offwhite">
            Packaging support built for brands that need clarity, not guesswork
          </SectionHeading>
          <SectionSubheading className="text-offwhite/60">
            UPG is a North America-facing custom packaging partner focused on
            helping brands source the right structure, print finish, and delivery
            plan for their product.
          </SectionSubheading>
        </div>
      </section>

      {/* What makes the model work */}
      <Section variant="cream">
        <SectionHeading>What Makes the Model Work</SectionHeading>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {whatMakesItWork.map((item) => (
            <div
              key={item.title}
              className="border-l-2 border-gold/30 pl-6"
            >
              <h3 className="font-serif text-xl font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who we serve */}
      <Section variant="surface">
        <SectionHeading>Who We Serve</SectionHeading>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {whoWeServe.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-sm bg-cream p-5"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-medium text-charcoal">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* What to expect */}
      <Section variant="cream">
        <SectionHeading>What to Expect</SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {whatToExpect.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <svg
                  className="h-4 w-4 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-base font-medium text-charcoal">
                {item}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}

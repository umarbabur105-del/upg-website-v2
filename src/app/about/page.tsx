import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Universal Packaging Group",
  description:
    "Learn how UPG helps beauty and product brands plan custom packaging, compare practical structures, review artwork, and coordinate supplier production and delivery.",
  path: "/about",
  keywords: ["custom packaging sourcing", "packaging production coordination"],
});

const differentiators = [
  {
    title: "Pricing built around your actual specs",
    description:
      "Every quote is reviewed against product type, dimensions, quantity, material, finish, intended use, and shipping destination before pricing is confirmed.",
  },
  {
    title: "One guided process from structure to quote",
    description:
      "You start with one project brief. UPG helps organize the structure, specification, artwork status, supplier path, and delivery requirements.",
  },
  {
    title: "Production coordination managed for you",
    description:
      "After written quote and proof approval, UPG coordinates the selected supplier path, production updates, and delivery planning.",
  },
  {
    title: "Design support built into the process",
    description:
      "Dieline guidance and artwork review are coordinated according to the approved structure and supplier requirements.",
  },
];

const whoWeWorkWith = [
  "E-commerce brands shipping direct to customers",
  "Retail product companies needing shelf-ready packaging",
  "Beauty and personal care brands",
  "Launch teams planning PR kits and influencer packaging",
  "Selected packaged-goods and beverage projects after end-use review",
  "Brands that want one accountable packaging coordination process",
];

const whatToExpect = [
  { step: "01", label: "Submit your request", detail: "Product type, quantity, destination — we ask the right questions upfront." },
  { step: "02", label: "Receive a structured quote", detail: "The response defines the reviewed structure, material path, production estimate, and delivery basis." },
  { step: "03", label: "Approve artwork and proof", detail: "We guide you through dielines, artwork review, and pre-production sign-off." },
  { step: "04", label: "Coordinate production and delivery", detail: "After approvals and payment, we coordinate production updates and the agreed delivery route." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — brand statement */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading as="h1" className="text-offwhite">
            Custom packaging guidance from brief to approved production
          </SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-offwhite/70">
            Universal Packaging Group is a quote-led packaging sourcing and
            project-coordination company. We help brands turn a product brief
            into a reviewed structure, supplier quote, proofing path, and
            delivery plan.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-offwhite/60">
            Beauty and cosmetic packaging is our primary focus, including
            folding cartons, rigid boxes, branded mailers, PR kits, and inserts.
            Pouches and paper cups require additional end-use and material review.
          </p>
          <div className="mt-10">
            <Link
              href="/get-a-quote"
              className="inline-block rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
            >
              Start a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* What makes the model work */}
      <Section variant="cream">
        <SectionHeading>How We Work</SectionHeading>
        <SectionSubheading>
          A structured project process is more useful than an unverified list of factories.
        </SectionSubheading>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="border-l-2 border-gold/40 pl-6">
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

      {/* What to expect — process steps */}
      <Section variant="surface">
        <SectionHeading>What to Expect</SectionHeading>
        <SectionSubheading>
          From first request to delivery — the four stages every project goes through.
        </SectionSubheading>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {whatToExpect.map((item) => (
            <div key={item.step}>
              <span className="font-serif text-4xl font-bold text-gold">{item.step}</span>
              <h3 className="mt-3 font-serif text-lg font-semibold text-charcoal">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who we work with */}
      <Section variant="cream">
        <SectionHeading>Who We Work With</SectionHeading>
        <SectionSubheading>
          UPG is designed for growing brands that need practical packaging guidance and coordinated execution.
        </SectionSubheading>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {whoWeWorkWith.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-sm bg-surface p-5">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-charcoal">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        heading="Ready to get a quote?"
        description="Send the core project details. Our target is a structured first response within one business day."
        ctaText="Get a Quote"
        ctaHref="/get-a-quote"
      />
    </>
  );
}

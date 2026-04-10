import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "About UPG — Custom Packaging Partner",
  description:
    "UPG is a custom packaging partner for US and Canada brands. We handle sourcing, production, and delivery.",
  alternates: { canonical: "https://universalpackaginggroup.com/about" },
  openGraph: {
    type: "website",
    title: "About UPG — Custom Packaging Partner",
    description:
      "UPG is a custom packaging partner for US and Canada brands. We handle sourcing, production, and delivery.",
    url: "https://universalpackaginggroup.com/about",
  },
};

const differentiators = [
  {
    title: "Pricing built around your actual specs",
    description:
      "No rate cards, no guesswork. Every quote is reviewed against your product type, quantity, material, and shipping destination before pricing is sent.",
  },
  {
    title: "One process for boxes, pouches, and cups",
    description:
      "Whether you need corrugated mailers, mylar bags, or paper cups, everything moves through a single quote process. No bouncing between different suppliers.",
  },
  {
    title: "Production coordination managed for you",
    description:
      "UPG handles the supplier path — structure selection, proofing, production tracking, and landed delivery. You stay focused on your product.",
  },
  {
    title: "Design support built into the process",
    description:
      "Artwork guidance, dielines, and print setup included. You do not need a packaging expert on your team to get this right.",
  },
];

const whoWeWorkWith = [
  "E-commerce brands shipping direct to customers",
  "Retail product companies needing shelf-ready packaging",
  "Beauty and personal care brands",
  "Supplement and specialty food brands",
  "Coffee shops, cafes, and beverage brands",
  "Any brand that needs custom packaging without managing factories directly",
];

const whatToExpect = [
  { step: "01", label: "Submit your request", detail: "Product type, quantity, destination — we ask the right questions upfront." },
  { step: "02", label: "Receive detailed pricing", detail: "Quote includes structure, materials, print options, lead time, and landed cost." },
  { step: "03", label: "Approve artwork and proof", detail: "We guide you through dielines, artwork review, and pre-production sign-off." },
  { step: "04", label: "Production and delivery", detail: "We track production through to landed delivery at your door." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — brand statement */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading className="text-offwhite">
            Custom packaging, handled from quote to delivery
          </SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-offwhite/70">
            UPG was built for brands that need custom packaging without the complexity of managing factories,
            freight, and proofing separately. We handle the sourcing and production coordination —
            you get clear pricing, design support, and delivery to your door.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-offwhite/60">
            We serve brands in the United States and Canada across five product families:
            corrugated mailer boxes, magnetic closure rigid boxes, stand-up mylar pouches,
            folding cartons, and custom paper cups.
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
          A few things that separate UPG from a generic supplier search.
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
          UPG is set up for growing brands, not enterprise procurement teams.
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
        description="Tell us what you need and we will send pricing within 24 business hours."
        ctaText="Get a Quote"
        ctaHref="/get-a-quote"
      />
    </>
  );
}

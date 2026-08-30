import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { PackingCbmCalculator } from "@/components/packing-cbm-calculator";
import { SectionHeading } from "@/components/section-heading";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

const toolPath = "/tools/packing-cbm-weight-calculator";
const toolUrl = `${SITE_URL}${toolPath}`;

export const metadata: Metadata = createPageMetadata({
  title: "Packing CBM & Weight Calculator",
  description:
    "Estimate master-carton count, packed carton dimensions, total CBM, actual weight, and dimensional weight for a packaging shipment.",
  path: toolPath,
  keywords: [
    "packing CBM calculator",
    "carton CBM calculator",
    "packaging weight calculator",
    "master carton calculator",
    "dimensional weight calculator",
  ],
});

const faqItems = [
  {
    question: "What dimensions should I enter?",
    answer:
      "Enter the length, width, and height of one packed unit as it will sit inside the master carton. Do not use a flat dieline size. For fold-flat boxes, flexible film, inserts, or nested products, use the actual shipping footprint after the packing method is known.",
  },
  {
    question: "How does the calculator estimate the master-carton size?",
    answer:
      "It multiplies each packed-unit dimension by the manual grid entered for that direction, then adds the selected total outer allowance once to each carton dimension. The result is a planning size, not a structural carton specification.",
  },
  {
    question: "Does this tool estimate actual shipment weight from material?",
    answer:
      "No. Actual weight is calculated only when you enter a measured packed-unit weight. Gross weight also requires an empty master-carton tare weight. The tool does not guess weight from a material name or board grade.",
  },
  {
    question: "What is dimensional weight?",
    answer:
      "Dimensional weight is a carrier planning value based on occupied volume. This tool divides carton volume in cubic centimeters by either 5,000 or 6,000. Carriers use different divisors, rounding rules, and billable-weight policies, so confirm the selected service before shipment.",
  },
  {
    question: "Is the CBM result a freight quote?",
    answer:
      "No. It does not calculate freight price, duties, taxes, palletization, container loading, carrier acceptance, or delivery timing. UPG and the selected logistics provider must confirm the final packing and shipping details.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${toolUrl}#tool`,
      name: "UPG Packing CBM & Weight Calculator",
      url: toolUrl,
      description:
        "A free planning calculator for master-carton count, packed carton dimensions, CBM, measured weight, and dimensional weight.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser with JavaScript enabled.",
      isAccessibleForFree: true,
      provider: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Master-carton count from a manual packing layout",
        "Estimated outer carton dimensions",
        "CBM per carton and total CBM",
        "Measured net and gross weight conversion",
        "Dimensional weight using a 5,000 or 6,000 divisor",
        "Planning-summary handoff to a project enquiry",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Packaging Tools",
          item: `${SITE_URL}/tools`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Packing CBM & Weight Calculator",
          item: toolUrl,
        },
      ],
    },
  ],
};

const planningSteps = [
  {
    number: "01",
    title: "Measure one packed unit",
    description:
      "Use the occupied shipping footprint after folding, nesting, inserts, or protective material are considered.",
  },
  {
    number: "02",
    title: "Set a manual carton grid",
    description:
      "Choose how many units run along the carton length, width, and height. Rotate the unit dimensions when testing another orientation.",
  },
  {
    number: "03",
    title: "Check volume and weight",
    description:
      "Review carton count, estimated packed size, total CBM, dimensional weight, and measured-weight outputs before project review.",
  },
];

export default function PackingCbmWeightCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-12 pb-12 md:pt-20 md:pb-16">
          <SectionHeading
            as="h1"
            eyebrow="Free packing planning tool"
            title="Estimate carton count, CBM, and shipment weight."
            intro="Build a transparent packing estimate from the dimensions of one packed unit, a manual master-carton layout, total quantity, and optional measured weights."
            className="max-w-5xl"
          />
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              href="/tools"
              className="border-b border-foreground/20 pb-0.5 text-foreground"
            >
              View all packaging tools →
            </Link>
            <Link
              href="/tools/packaging-spec-builder"
              className="border-b border-foreground/20 pb-0.5 text-foreground"
            >
              Build the product specification first →
            </Link>
            <Link
              href="/get-a-quote?builder_note=Please%20review%20my%20packing%20and%20shipping%20plan."
              className="border-b border-foreground/20 pb-0.5 text-foreground"
            >
              Start project review →
            </Link>
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            This planning estimate keeps every input visible. It is not a freight
            quote, final master-carton specification, or carrier approval.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-editorial">
          <PackingCbmCalculator />
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="How to use the estimate"
            title="Make every packing assumption visible."
            intro="The calculator does not choose a hidden packing pattern or infer weight from material. The inputs stay visible so a supplier or logistics provider can correct them."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {planningSteps.map((step) => (
              <article key={step.number} className="surface-card p-6 md:p-8">
                <div className="font-serif text-4xl text-gold">{step.number}</div>
                <h2 className="mt-5 font-serif text-2xl text-foreground">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Planning boundaries"
              title="CBM and weight answers."
              intro="Use the estimate to prepare a conversation—not as a freight price, final carton drawing, or carrier approval."
            />
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}

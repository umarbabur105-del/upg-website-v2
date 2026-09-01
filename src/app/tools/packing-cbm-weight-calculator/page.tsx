import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { PackingCbmCalculator } from "@/components/packing-cbm-calculator";
import { SectionHeading } from "@/components/section-heading";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

const toolPath = "/tools/packing-cbm-weight-calculator";
const toolUrl = `${SITE_URL}${toolPath}`;

export const metadata: Metadata = createPageMetadata({
  title: "Carton Count, CBM & Shipping Weight Calculator",
  description:
    "Enter one packed item's size and quantity to estimate shipping cartons, carton dimensions, total CBM, and optional shipment weight.",
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
    question: "What exactly should I measure?",
    answer:
      "Measure one finished, packed item as it will sit in the shipping carton. Enter its length, width, and height. If the item folds or nests, measure the space it actually uses after it is prepared for shipping.",
  },
  {
    question: "What if I do not know how items fit in a carton?",
    answer:
      "Use the sample arrangement for a rough starting point, or place a few packed items together and count how many fit across, how many fit from front to back, and how many layers can stack safely. Ask your supplier to confirm the final arrangement.",
  },
  {
    question: "What does CBM mean?",
    answer:
      "CBM means cubic meters. It is the amount of space your cartons are expected to occupy. Freight providers often use this number when planning air, sea, or truck shipments.",
  },
  {
    question: "Why can shipping volume weight differ from scale weight?",
    answer:
      "A large, light carton uses a lot of vehicle or aircraft space, so carriers may charge using its size instead of its scale weight. This is often called dimensional or volumetric weight. Your carrier must confirm the final method and factor.",
  },
  {
    question: "Is this my final shipping price?",
    answer:
      "No. This is not a freight quote. The result is for early planning and does not include freight rates, duties, taxes, pallets, delivery timing, or carrier approval. Confirm the final carton and shipping details before placing an order or booking freight.",
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
        "A free, easy-to-use calculator for shipping carton count, carton dimensions, CBM, measured weight, and dimensional weight.",
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
            eyebrow="Free and easy packing calculator"
            title="How many shipping cartons will you need?"
            intro="Enter one packed item's size and your quantity. We will estimate the number of cartons, the space they use, and optional shipping weight."
            className="max-w-5xl"
          />
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="rounded-full bg-cream px-4 py-2 font-semibold text-foreground">
              No freight experience needed
            </span>
            <Link
              href="/tools"
              className="border-b border-foreground/20 pb-0.5 text-foreground"
            >
              View all packaging tools →
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-editorial">
          <PackingCbmCalculator />
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Simple answers"
              title="Common calculator questions."
              intro="Plain-language help for measuring, carton packing, CBM, and shipping weight."
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

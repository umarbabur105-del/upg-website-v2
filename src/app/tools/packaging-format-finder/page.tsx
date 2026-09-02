import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { PackagingFormatFinder } from "@/components/packaging-format-finder";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

const toolPath = "/tools/packaging-format-finder";
const toolUrl = `${SITE_URL}${toolPath}`;

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Format Finder",
  description:
    "Use two simple visual choices to compare custom tuck boxes, mailer boxes, magnetic boxes, collapsible magnetic boxes, and Mylar bags.",
  path: toolPath,
  keywords: [
    "packaging format finder",
    "which packaging should I use",
    "custom box style finder",
    "types of custom packaging",
    "mailer box vs magnetic box",
  ],
});

const faqItems = [
  {
    question: "Which custom packaging format should I choose?",
    answer:
      "Start with what the packaging must do. Use a tuck box around one product, a corrugated mailer for a kit or branded unboxing, a magnetic box for premium presentation, or the Mylar family for an approved bag, pouch, or rollstock project.",
  },
  {
    question: "Does the Format Finder replace structural review?",
    answer:
      "No. It gives a plain-language starting point. Final dimensions, construction, materials, artwork, finishes, and production feasibility still require project review.",
  },
  {
    question: "Does the Format Finder calculate a price?",
    answer:
      "No. Pricing depends on the approved structure, dimensions, material, print, finishes, quantity, and destination. The result can be passed into the quote form for human review.",
  },
  {
    question: "Can the finder recommend standard shipping or master cartons?",
    answer:
      "No. UPG supplies corrugated ear-lock mailer boxes for branded presentation, PR kits, subscriptions, and ecommerce programs. Regular slotted shipping cartons, master cartons, and RSC cases are outside the product range.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${toolUrl}#tool`,
      name: "UPG Custom Packaging Format Finder",
      url: toolUrl,
      description:
        "A free guided tool that compares the five approved UPG packaging families and recommends a starting format for project planning.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser with JavaScript enabled.",
      isAccessibleForFree: true,
      provider: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Two-step visual packaging format assessment",
        "Primary packaging family recommendation",
        "Alternate format comparison when relevant",
        "Handoff to the human-reviewed project enquiry",
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
          name: "Packaging Format Finder",
          item: toolUrl,
        },
      ],
    },
  ],
};

export default function PackagingFormatFinderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-12 pb-12 md:pt-20 md:pb-16">
          <div className="max-w-5xl">
            <div className="eyebrow mb-5">Free custom packaging format finder</div>
            <h1 className="display-1 text-balance">
              Show us what you need. We will narrow the format.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Make two simple visual choices. The picker will show the closest UPG packaging family, when it fits, and what to compare before you request a quote.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              No packaging vocabulary needed. The result is planning guidance, not structural approval or instant pricing; UPG still confirms the final specification.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-editorial">
          <PackagingFormatFinder />
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="See the difference"
            title="Five formats. Five different jobs."
            intro="The picker only recommends product families UPG currently offers. Every family has a 250-unit planning MOQ."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-surface hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-foreground">
                    {product.shortName}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {product.bestFor}
                  </p>
                  <div className="mt-4 text-xs font-semibold text-foreground">
                    MOQ {product.moq} <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Quick answers"
              title="What the picker does—and does not do."
            />
            <Link
              href="/get-a-quote"
              className="mt-7 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Already know the format? Start a project enquiry →
            </Link>
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}

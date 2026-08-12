import type { Metadata } from "next";
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
    "Answer four questions to compare custom tuck boxes, corrugated mailer boxes, magnetic boxes, collapsible magnetic boxes, and Mylar bags for your project.",
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
      "Start with how the packaging should work. Tuck boxes are folded secondary cartons for individual products. Corrugated ear-lock mailers suit branded presentation and unboxing programs. Magnetic boxes and collapsible magnetic boxes support premium rigid presentation, while Mylar bags cover the approved flexible bag, pouch, spout, coffee-bag, and rollstock range.",
  },
  {
    question: "Does the Format Finder replace structural review?",
    answer:
      "No. It identifies a planning starting point from the five approved UPG product families. Final dimensions, construction, materials, artwork, finishes, and production feasibility require project review.",
  },
  {
    question: "Does the Format Finder calculate a price?",
    answer:
      "No. Custom packaging pricing depends on the approved structure, dimensions, material, print, finishes, quantity, and delivery destination. The next step is to build a specification and submit the known project details.",
  },
  {
    question: "Can the finder recommend standard shipping or master cartons?",
    answer:
      "No. UPG supplies corrugated ear-lock mailer boxes for branded presentation, PR kits, subscriptions, and ecommerce programs. Regular slotted shipping cartons, master cartons, and RSC cases are outside the product range.",
  },
  {
    question: "What should I do after receiving a recommendation?",
    answer:
      "Continue to the Packaging Spec & MOQ Builder with the recommended family preselected. Add the known dimensions, quantity, material, finishes, and intended use, then carry that specification into the UPG project enquiry form.",
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
        "Four-question packaging format assessment",
        "Primary packaging family recommendation",
        "Alternate format comparison when relevant",
        "Handoff to the Packaging Spec and MOQ Builder",
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
              Find the right starting format for your packaging project.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Answer four short questions to compare UPG&apos;s five focused product families. You will receive a primary recommendation and an alternate when two formats deserve comparison.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The result is planning guidance, not structural approval or instant pricing. UPG confirms the final specification for each project.
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
            eyebrow="Five approved product families"
            title="What the finder compares."
            intro="Each recommendation stays inside UPG's current product range and uses the same approved product and MOQ information shown across the website."
          />
          <div className="mt-10 overflow-x-auto border border-border bg-surface">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-moss text-primary-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Product family</th>
                  <th className="px-5 py-4 font-semibold">Common starting use</th>
                  <th className="px-5 py-4 font-semibold">Planning MOQ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.slug} className="border-t border-border first:border-t-0">
                    <td className="px-5 py-4 font-semibold text-foreground">
                      <Link href={`/products/${product.slug}`} className="hover:text-gold">
                        {product.shortName}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{product.bestFor}</td>
                    <td className="px-5 py-4 text-foreground">{product.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Questions"
              title="Format selection answers."
            />
            <Link
              href="/tools/packaging-spec-builder"
              className="mt-7 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Already know the format? Build a specification →
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

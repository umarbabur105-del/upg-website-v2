import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { PackagingSpecBuilder } from "@/components/packaging-spec-builder";
import { SectionHeading } from "@/components/section-heading";
import { productFamilies } from "@/data/packaging-spec";
import type { ProductFamily } from "@/data/products";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

const toolPath = "/tools/packaging-spec-builder";
const toolUrl = `${SITE_URL}${toolPath}`;

export const metadata: Metadata = createPageMetadata({
  title: "Packaging Spec & MOQ Builder",
  description:
    "Build a planning specification and check the UPG minimum order for custom tuck boxes, corrugated mailer boxes, magnetic boxes, collapsible magnetic boxes, and Mylar bags.",
  path: toolPath,
  keywords: [
    "packaging specification builder",
    "custom box MOQ calculator",
    "packaging MOQ calculator",
    "box specification tool",
  ],
});

const faqItems = [
  {
    question: "Does this tool calculate custom packaging prices?",
    answer:
      "No. Custom production pricing depends on the approved structure, dimensions, material, print, finishes, quantity, and delivery destination. The tool prepares a planning specification and MOQ only.",
  },
  {
    question: "How is the tuck box or mailer box MOQ calculated?",
    answer:
      "When every finished dimension is 5 inches or less, the planning MOQ is 1,000 units. When the largest dimension is over 5 inches and no more than 10 inches, it is 500 units. When the largest dimension is over 10 inches, it is 250 units.",
  },
  {
    question: "Can I enter dimensions in centimeters or millimeters?",
    answer:
      "Yes. Choose inches, centimeters, or millimeters. The tool converts the dimensions before applying the approved size-based MOQ boundaries.",
  },
  {
    question: "What is the MOQ for magnetic boxes and Mylar bags?",
    answer:
      "The planning MOQ is 250 units for magnetic boxes and collapsible magnetic boxes, and 500 units for Mylar bags.",
  },
  {
    question: "Does the mailer option include standard shipping cartons?",
    answer:
      "No. UPG supplies corrugated ear-lock mailer boxes for branded presentation, PR kits, subscriptions, and ecommerce packaging. Regular slotted shipping cartons, master cartons, and RSC cases are outside the product range.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${toolUrl}#tool`,
      name: "UPG Packaging Spec & MOQ Builder",
      url: toolUrl,
      description:
        "A free planning tool for selecting a UPG packaging family, preparing known specifications, and checking the applicable planning MOQ.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser with JavaScript enabled.",
      isAccessibleForFree: true,
      provider: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Product family comparison",
        "Size-based MOQ calculation",
        "Inch, centimeter, and millimeter support",
        "Material and finish planning",
        "Specification handoff to project enquiry",
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
          name: "Packaging Spec & MOQ Builder",
          item: toolUrl,
        },
      ],
    },
  ],
};

const moqRows = [
  {
    product: "Tuck boxes and corrugated mailer boxes",
    condition: "Every finished dimension is 5 in or less",
    moq: "1,000 units",
  },
  {
    product: "Tuck boxes and corrugated mailer boxes",
    condition: "Largest finished dimension is over 5 in through 10 in",
    moq: "500 units",
  },
  {
    product: "Tuck boxes and corrugated mailer boxes",
    condition: "Largest finished dimension is over 10 in",
    moq: "250 units",
  },
  {
    product: "Magnetic and collapsible magnetic boxes",
    condition: "Any size, subject to structural review",
    moq: "250 units",
  },
  {
    product: "Mylar bags",
    condition: "Approved bag and pouch range",
    moq: "500 units",
  },
];

interface PageProps {
  searchParams: Promise<{ product?: string | string[] }>;
}

export default async function PackagingSpecBuilderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requestedFamily = Array.isArray(params.product) ? params.product[0] : params.product;
  const initialFamily = productFamilies.includes(requestedFamily as ProductFamily)
    ? (requestedFamily as ProductFamily)
    : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-12 pb-12 md:pt-20 md:pb-16">
          <div className="max-w-5xl">
            <div className="eyebrow mb-5">Free packaging planning tool</div>
            <h1 className="display-1 text-balance">Build your packaging specification and check the MOQ.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Compare UPG&apos;s five packaging families, add the details you already know, and carry a clear planning specification into your project enquiry.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              This tool does not estimate price. Custom packaging pricing is confirmed after structure, dimensions, material, print, finishes, quantity, and destination are reviewed together.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/tools/packaging-format-finder"
                className="inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Not sure which product family to choose? Use the Format Finder →
              </Link>
              <Link
                href={
                  initialFamily
                    ? `/tools/packaging-artwork-preflight?product=${encodeURIComponent(initialFamily)}`
                    : "/tools/packaging-artwork-preflight"
                }
                className="inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
              >
                Already have artwork? Check its preparation status →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-editorial">
          <PackagingSpecBuilder initialFamily={initialFamily} />
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Planning rules"
            title="MOQ guidance used by the builder."
            intro="These values help qualify the starting quantity. Final production details remain subject to specification and structural review."
          />
          <div className="mt-10 overflow-x-auto border border-border bg-surface">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-moss text-primary-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Product family</th>
                  <th className="px-5 py-4 font-semibold">Finished-size condition</th>
                  <th className="px-5 py-4 font-semibold">Planning MOQ</th>
                </tr>
              </thead>
              <tbody>
                {moqRows.map((row) => (
                  <tr key={`${row.product}-${row.condition}`} className="border-t border-border first:border-t-0">
                    <td className="px-5 py-4 text-foreground">{row.product}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.condition}</td>
                    <td className="px-5 py-4 font-semibold text-foreground">{row.moq}</td>
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
              eyebrow="From plan to production"
              title="What happens after the tool?"
              intro="The builder organizes known details. UPG then reviews the project as a complete manufacturing specification."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {[
              ["01", "Send the specification", "Continue to the project form with the builder details already carried forward."],
              ["02", "Review the structure", "UPG reviews the selected format, dimensions, intended use, material, and finish direction."],
              ["03", "Confirm the project", "Pricing, production timing, artwork, proofing, and delivery terms are confirmed for the approved specification."],
              ["04", "Manufacture and deliver", "Production begins after the required commercial, artwork, and proof approvals."],
            ].map(([number, title, description]) => (
              <div key={number} className="surface-card p-6">
                <div className="font-serif text-4xl text-gold">{number}</div>
                <h3 className="mt-4 font-serif text-2xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Questions"
              title="Packaging specification and MOQ answers."
            />
            <Link
              href="/materials-finishes"
              className="mt-7 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              Compare materials and finishes →
            </Link>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkPreflightChecker } from "@/components/artwork-preflight-checker";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/section-heading";
import { productFamilies } from "@/data/packaging-spec";
import type { ProductFamily } from "@/data/products";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

const toolPath = "/tools/packaging-artwork-preflight";
const toolUrl = `${SITE_URL}${toolPath}`;

export const metadata: Metadata = createPageMetadata({
  title: "Packaging Artwork Preflight Checker",
  description:
    "Check dielines, source files, images, fonts, color intent, finishes, copy, and version control before packaging artwork review.",
  path: toolPath,
  keywords: [
    "packaging artwork preflight checklist",
    "packaging artwork checker",
    "box artwork checklist",
    "packaging dieline artwork review",
    "print artwork preparation",
  ],
});

const faqItems = [
  {
    question: "Does this tool inspect or upload my artwork file?",
    answer:
      "No. The checker does not upload, open, store, or analyze artwork. It organizes eight preparation questions so you can identify what is confirmed and what should be clarified during UPG review.",
  },
  {
    question: "Does a ready result mean my artwork is approved for production?",
    answer:
      "No. A ready result means the preparation items have been marked as confirmed. UPG must still review the actual files, dieline, structure, production setup, proof, and final approvals.",
  },
  {
    question: "Can I use the checker before I have a final dieline?",
    answer:
      "Yes. Mark the structure and dieline item as Needs attention or Not sure. The result will keep it visible as a foundation item that should be resolved before final artwork approval.",
  },
  {
    question: "Does the checker validate barcodes, legal copy, or compliance?",
    answer:
      "No. It asks whether those elements have been identified and approved by the responsible brand team where applicable. External validation and market-specific requirements remain the customer's responsibility unless separately agreed in writing.",
  },
  {
    question: "What happens after the artwork readiness check?",
    answer:
      "Copy the preparation summary or continue to the UPG project enquiry. The selected product family, artwork status, confirmed items, and open items can be carried into the first project review.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${toolUrl}#tool`,
      name: "UPG Packaging Artwork Preflight Checker",
      url: toolUrl,
      description:
        "A free eight-point preparation checklist for packaging artwork before human review by UPG.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser with JavaScript enabled.",
      isAccessibleForFree: true,
      provider: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Eight-point packaging artwork readiness checklist",
        "Foundation and production-detail separation",
        "Open-item summary",
        "Project-enquiry handoff",
        "No artwork upload or automated file approval",
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
          name: "Packaging Artwork Preflight Checker",
          item: toolUrl,
        },
      ],
    },
  ],
};

interface PageProps {
  searchParams: Promise<{ product?: string | string[] }>;
}

export default async function PackagingArtworkPreflightPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const requestedFamily = Array.isArray(params.product)
    ? params.product[0]
    : params.product;
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
            <div className="eyebrow mb-5">Free packaging artwork readiness tool</div>
            <h1 className="display-1 text-balance">
              Check your packaging artwork before it reaches production review.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Work through eight preparation checks for the dieline, editable source, images, fonts, color intent, special finishes, copy, and version control.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              No file is uploaded or automatically approved. The result organizes your artwork status for human review by UPG.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-editorial">
          <ArtworkPreflightChecker initialFamily={initialFamily} />
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="What this tool can and cannot do"
            title="Preparation first. File approval follows human review."
            intro="The checker helps teams arrive with a clearer artwork package. It does not inspect the file, confirm the dieline, validate colors or barcodes, approve compliance, or replace proofing and production approval."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Identify the foundation", "Confirm the current structure, dieline, editable source, file version, and responsible approver."],
              ["02", "List production details", "Record the status of images, fonts, color intent, special finishes, copy, and variable elements."],
              ["03", "Carry open items forward", "Copy the summary or continue to the project enquiry with unresolved items clearly identified."],
            ].map(([number, title, description]) => (
              <div key={number} className="surface-card p-6 md:p-8">
                <div className="font-serif text-4xl text-gold">{number}</div>
                <h3 className="mt-5 font-serif text-2xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" title="Artwork preflight answers." />
            <div className="mt-7 space-y-3 text-sm">
              <Link
                href="/tools/packaging-spec-builder"
                className="block w-fit border-b border-foreground/20 pb-0.5 text-foreground"
              >
                Build the packaging specification →
              </Link>
              <Link
                href="/blog/how-to-prepare-artwork-for-custom-packaging"
                className="block w-fit border-b border-foreground/20 pb-0.5 text-foreground"
              >
                Read the artwork preparation guide →
              </Link>
            </div>
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free Custom Packaging Planning Tools",
  description:
    "Use UPG's free Format Finder, Spec & MOQ Builder, and Artwork Preflight Checker to choose a format, prepare the project, and organize artwork readiness.",
  path: "/tools",
  keywords: [
    "custom packaging tools",
    "packaging format finder",
    "packaging MOQ calculator",
    "packaging specification tool",
    "packaging artwork preflight checker",
  ],
});

const tools = [
  {
    number: "01",
    title: "Packaging Format Finder",
    description:
      "Answer four short questions to identify the closest starting format among tuck boxes, corrugated mailers, magnetic boxes, collapsible magnetic boxes, and Mylar bags.",
    href: "/tools/packaging-format-finder",
    cta: "Find the right format",
    details: [
      "Primary format recommendation",
      "Alternate format when relevant",
      "Direct handoff to the MOQ Builder",
    ],
  },
  {
    number: "02",
    title: "Packaging Spec & MOQ Builder",
    description:
      "Choose the product family, add dimensions and known requirements, check the approved planning MOQ, and carry the specification into a project enquiry.",
    href: "/tools/packaging-spec-builder",
    cta: "Build a specification",
    details: [
      "Exact size-based MOQ rules",
      "Inch, centimeter, and millimeter support",
      "Quote-form specification handoff",
    ],
  },
  {
    number: "03",
    title: "Packaging Artwork Preflight Checker",
    description:
      "Work through eight preparation checks for the dieline, editable source, images, fonts, color intent, special finishes, copy, and version control before UPG review.",
    href: "/tools/packaging-artwork-preflight",
    cta: "Check artwork readiness",
    details: [
      "Foundation and production-detail checks",
      "Open-item preparation summary",
      "No artwork upload or automated approval",
    ],
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/tools#page`,
      name: "UPG Custom Packaging Planning Tools",
      url: `${SITE_URL}/tools`,
      description:
        "Free planning tools for choosing a custom packaging format, checking the applicable MOQ, preparing a project specification, and organizing artwork readiness.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ItemList",
      name: "UPG packaging planning tools",
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: `${SITE_URL}${tool.href}`,
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
      ],
    },
  ],
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-12 pb-14 md:pt-20 md:pb-20">
          <SectionHeading
            as="h1"
            eyebrow="Free packaging planning tools"
            title="Move from an early packaging idea to a clearer production brief."
            intro="Choose a starting format, check the applicable planning MOQ, and organize the project details UPG needs for a useful manufacturing review."
            className="max-w-5xl"
          />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-editorial grid gap-6 lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.href} className="surface-card flex flex-col p-7 md:p-10">
              <div className="font-serif text-5xl text-gold">{tool.number}</div>
              <h2 className="mt-6 font-serif text-3xl text-foreground">
                {tool.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <ul className="mt-7 space-y-3 text-sm text-foreground/82">
                {tool.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="text-gold">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tool.href}
                className="mt-8 inline-flex w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep lg:mt-auto"
              >
                {tool.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="Human-reviewed manufacturing"
              title="Planning tools organize the brief. UPG confirms the project."
              intro="The tools do not publish instant custom-production pricing or replace structural, material, artwork, proofing, production, or delivery review."
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/get-a-quote"
              className="inline-flex rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              Start with your known details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

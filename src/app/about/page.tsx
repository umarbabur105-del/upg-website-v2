import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { siteConfig } from "@/data/site";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Universal Packaging Group",
  description:
    "Learn how UPG manufactures custom boxes and flexible packaging for brands worldwide, from structure and artwork through production and delivery.",
  path: "/about",
  keywords: ["custom packaging manufacturer", "custom packaging manufacturing"],
});

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: "About Universal Packaging Group",
      description:
        "How UPG develops custom boxes and flexible packaging from a project brief through production and delivery planning.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${SITE_URL}/about`,
        },
      ],
    },
  ],
};

const differentiators = [
  {
    title: "Manufacturing built around your project specifications",
    description:
      "Every project is developed around the product type, dimensions, quantity, material, finish, intended use, and delivery destination.",
  },
  {
    title: "One managed process from structure to delivery",
    description:
      "You start with one project brief. UPG organizes the structure, specification, artwork status, manufacturing plan, and delivery requirements.",
  },
  {
    title: "Manufacturing and delivery managed as one process",
    description:
      "After pricing and proof approval, UPG manufactures the packaging, provides production updates, and arranges delivery under the confirmed project terms.",
  },
  {
    title: "Design support built into the process",
    description:
      "Dieline guidance and artwork review are coordinated according to the approved structure and production requirements.",
  },
];

const whoWeWorkWith = [
  "E-commerce brands shipping direct to customers",
  "Retail product companies needing custom printed packaging",
  "Beauty and personal care brands",
  "Launch teams planning PR kits and influencer packaging",
  "Selected packaged-goods and beverage projects after end-use review",
  "Brands worldwide that want one accountable packaging partner",
];

const whatToExpect = [
  { step: "01", label: "Share your packaging brief", detail: "Product type, quantity, destination, and available references give us the right starting point." },
  { step: "02", label: "Confirm structure and specification", detail: "We define the structure, material, finish, manufacturing plan, pricing, and delivery requirements." },
  { step: "03", label: "Approve artwork and proof", detail: "We guide you through dielines, artwork review, and pre-production sign-off." },
  { step: "04", label: "Manufacture and deliver", detail: "After approvals and payment, we manufacture the packaging, provide production updates, and arrange the agreed delivery." },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {/* Hero — brand statement */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading as="h1" className="text-offwhite">
            Custom packaging manufacturing from brief to delivery
          </SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-offwhite/70">
            Universal Packaging Group manufactures custom boxes and flexible
            packaging for brands worldwide. We turn a product brief into an
            approved structure, production specification, proofing process, and
            delivery plan.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-offwhite/60">
            Our core product range includes tuck boxes, corrugated
            mailer boxes, magnetic boxes, collapsible magnetic boxes, and Mylar
            bags. Cosmetics is a dedicated industry specialization across these
            packaging formats.
          </p>
          <p className="mt-5 border-l border-gold/50 pl-4 text-sm leading-relaxed text-offwhite/70">
            <strong className="font-semibold text-offwhite">
              {siteConfig.shortDomain}
            </strong>{" "}
            is our short, easy-to-share web address. It brings visitors to this
            official Universal Packaging Group website, keeping product
            information, quote requests, policies, and contact details under one
            canonical home.
          </p>
          <div className="mt-10">
            <Link
              href="/get-a-quote"
              className="inline-block rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* What makes the model work */}
      <Section variant="cream">
        <SectionHeading>How We Work</SectionHeading>
        <SectionSubheading>
          One accountable process connects structure, artwork, production, project review, and delivery.
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
        <div className="mt-10 border-t border-charcoal/10 pt-7">
          <Link
            href="/blog/custom-packaging-production-process"
            className="inline-flex rounded-full border border-charcoal/15 bg-cream px-6 py-3 text-sm font-semibold text-charcoal hover:border-gold"
          >
            Read the full production-process guide →
          </Link>
        </div>
      </Section>

      {/* Who we work with */}
      <Section variant="cream">
        <SectionHeading>Who We Work With</SectionHeading>
        <SectionSubheading>
          UPG works with brands that need practical packaging guidance and accountable execution.
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
        heading="Ready to create your custom packaging?"
        description="Send the core project details and we will help develop the right structure, specification, and manufacturing plan."
        ctaText="Start Your Project"
        ctaHref="/get-a-quote"
      />
    </>
  );
}

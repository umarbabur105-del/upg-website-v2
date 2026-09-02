import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { SampleRequestForm } from "@/components/sample-request-form";
import {
  sampleKits,
  sampleKitShippingRegionLabel,
} from "@/data/sample-kit";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Packaging Sample Kits: Box & Mylar Samples",
  description:
    "Compare separate custom box and Mylar bag sample kits for $19.99 each, with shipping included, 3–7 business-day delivery, and full production-order credit.",
  path: "/samples",
  keywords: [
    "custom packaging sample kits",
    "sample packaging",
    "packaging samples",
    "box sample kit",
    "mylar bag sample kit",
    "finished packaging samples",
    "custom packaging samples",
  ],
});

const sampleFaqs = [
  {
    question: "What packaging samples can I order from UPG?",
    answer:
      "UPG offers two separate fixed-price products: a Box Sample Kit with finished custom box samples and a Mylar Bag Sample Kit with five finished flexible-packaging formats.",
  },
  {
    question: "Are box samples and Mylar bag samples in the same kit?",
    answer:
      "No. Box samples and Mylar bag samples are sold in separate kits so the physical assortment stays relevant to the packaging family being evaluated.",
  },
  {
    question: "How much does each packaging sample kit cost?",
    answer:
      `Each kit costs $19.99 USD with shipping included to ${sampleKitShippingRegionLabel}. The full kit price is credited toward the first UPG custom packaging production order.`,
  },
  {
    question: "How long does sample-kit delivery take?",
    answer:
      "Estimated delivery is 3–7 business days to an eligible checkout destination.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/samples#page`,
      url: `${SITE_URL}/samples`,
      name: "UPG Packaging Sample Kits",
      description:
        "Separate finished-box and flexible-packaging sample kits available from UPG.",
      mainEntity: { "@id": `${SITE_URL}/samples#sample-kits` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/samples#sample-kits`,
      numberOfItems: sampleKits.length,
      itemListElement: sampleKits.map((kit, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: kit.name,
        url: kit.url,
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
          name: "Packaging Samples",
          item: `${SITE_URL}/samples`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: sampleFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function SamplesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-cream">
        <div className="container-editorial py-16 text-center md:py-24">
          <div className="eyebrow mb-5">Two focused sample kits</div>
          <h1 className="mx-auto max-w-5xl text-balance font-serif text-[clamp(3rem,6vw,5.5rem)] font-light leading-[0.98] tracking-[-0.035em]">
            Custom packaging sample kits for boxes and Mylar bags.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Choose the product family you need to evaluate. Box samples and Mylar
            bag samples are sold as separate $19.99 kits so each assortment stays
            relevant to the packaging project.
          </p>
        </div>
      </section>

      <section className="section-shell bg-background">
        <div className="container-editorial grid gap-8 lg:grid-cols-2">
          {sampleKits.map((kit) => (
            <article key={kit.sku} className="flex h-full flex-col overflow-hidden border border-border bg-surface shadow-card">
              <Link href={kit.path} className="group block shrink-0">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={kit.image}
                    alt={kit.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <div>
                  <div>
                    <div className="eyebrow">{kit.heroEyebrow}</div>
                    <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
                      {kit.shortName}
                    </h2>
                  </div>
                  <div className="mt-5 text-right">
                    <div className="text-2xl font-semibold text-foreground">
                      ${kit.price.toFixed(2)} USD
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Available to order · Shipping included
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {kit.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <Link
                    href={kit.path}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                  >
                    View & buy kit
                  </Link>
                  <Link
                    href="#free-sample-request"
                    className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                  >
                    Request free review
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="container-editorial mt-10 border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted-foreground">
          Each paid kit is a separate physical product. The full $19.99 price of
          the purchased kit is credited toward your first UPG custom packaging
          production order. Shipping is included to {sampleKitShippingRegionLabel}.
          Custom production is specified and quoted separately.
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial grid gap-7 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="eyebrow mb-3">Before you treat a sample as approval</div>
            <h2 className="font-serif text-3xl text-foreground">
              Know what a proof, sample kit, and project-specific sample can confirm.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              The buyer guide keeps representative finished samples separate from artwork review and project-specific production approval.
            </p>
          </div>
          <Link
            href="/blog/packaging-proof-vs-sample"
            className="inline-flex rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-gold"
          >
            Compare proof vs. sample →
          </Link>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-4">Packaging sample questions</div>
            <h2 className="display-2 text-balance">Choose the correct physical sample kit.</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              These answers keep the paid kits, free project review, and custom
              production process clearly separated.
            </p>
          </div>
          <div className="surface-card p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <FaqAccordion items={sampleFaqs} />
          </div>
        </div>
      </section>

      <section id="free-sample-request" className="section-shell scroll-mt-24 bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <div className="eyebrow mb-4">Qualified project option</div>
            <h2 className="display-2 text-balance">Request a free sample review.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Brands with an active packaging project can request a free sample
              review. UPG checks product fit, expected quantity, destination, and
              available physical samples before confirming shipment.
            </p>
            <div className="mt-8 border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted-foreground">
              A request is not an automatic order. UPG will confirm what is
              available, whether any delivery cost applies, and the expected
              timing before anything is shipped.
            </div>
          </div>
          <div className="border border-border bg-surface p-6 shadow-soft md:p-8">
            <SampleRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}

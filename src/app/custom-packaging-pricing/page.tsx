import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";
import {
  commercialPricingFaqs,
  commercialTerms,
} from "@/data/commercial-terms";
import { products } from "@/data/products";
import { sampleKits } from "@/data/sample-kit";
import { siteConfig } from "@/data/site";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

const baseMetadata = createPageMetadata({
  title: "Custom Packaging Pricing & MOQ",
  description:
    "Learn how UPG prices custom packaging, the 250-unit planning MOQ, quote inputs, price factors, sample-kit pricing, and what written quotes control.",
  path: commercialTerms.path,
  keywords: [
    "custom packaging pricing",
    "custom packaging MOQ",
    "custom box pricing",
    "custom packaging quote",
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}${commercialTerms.path}`,
    types: {
      "text/markdown": `${SITE_URL}${commercialTerms.markdownPath}`,
    },
  },
};

const commercialTermsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${commercialTerms.path}#webpage`,
      url: `${SITE_URL}${commercialTerms.path}`,
      name: "Custom Packaging Pricing, MOQ, and Quote Process",
      description: commercialTerms.quickAnswer,
      dateModified: commercialTerms.reviewedAt,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}${commercialTerms.path}#product-families` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}${commercialTerms.path}#product-families`,
      name: "Custom packaging product families with a 250-unit planning MOQ",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": `${SITE_URL}/products/${product.slug}#service`,
          name: product.name,
          url: `${SITE_URL}/products/${product.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: siteConfig.market,
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}${commercialTerms.path}#faq`,
      mainEntity: commercialPricingFaqs.map((item) => ({
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
      "@id": `${SITE_URL}${commercialTerms.path}#breadcrumb`,
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
          name: "Custom Packaging Pricing & MOQ",
          item: `${SITE_URL}${commercialTerms.path}`,
        },
      ],
    },
  ],
};

export default function CustomPackagingPricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialTermsSchema) }}
      />

      <section className="bg-background">
        <div className="container-editorial pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Commercial guide</div>
            <h1 className="display-1 text-balance">
              Custom packaging pricing, MOQ, and quote process.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              {commercialTerms.quickAnswer}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
              >
                Request a Custom Quote
              </Link>
              <Link
                href="#quote-inputs"
                className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
              >
                Review Quote Inputs
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Commercial facts reviewed {commercialTerms.reviewedAt}. A final
              written quote or agreement controls each custom-production project.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background">
        <div className="container-editorial grid gap-8 py-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Prepare before you enquire</div>
            <h2 className="font-serif text-3xl text-foreground">
              Two buyer guides turn the pricing inputs into a usable brief.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <Link
              href="/blog/custom-packaging-quote-checklist"
              className="border border-border bg-cream p-5 hover:border-gold"
            >
              <div className="eyebrow">Quote checklist</div>
              <h3 className="mt-3 font-serif text-xl text-foreground">
                What to send for a useful first review
              </h3>
              <span className="mt-4 inline-flex text-sm font-semibold text-gold-dark">
                Open checklist →
              </span>
            </Link>
            <Link
              href="/blog/how-to-measure-product-for-custom-packaging"
              className="border border-border bg-cream p-5 hover:border-gold"
            >
              <div className="eyebrow">Dimension guide</div>
              <h3 className="mt-3 font-serif text-xl text-foreground">
                Measure the packed product before assuming the box
              </h3>
              <span className="mt-4 inline-flex text-sm font-semibold text-gold-dark">
                Open measurement guide →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="container-editorial grid gap-6 py-7 sm:grid-cols-3">
          <div>
            <div className="eyebrow mb-2">Planning MOQ</div>
            <p className="text-lg font-semibold text-foreground">250 units</p>
          </div>
          <div>
            <div className="eyebrow mb-2">Custom pricing</div>
            <p className="text-lg font-semibold text-foreground">Written quote</p>
          </div>
          <div>
            <div className="eyebrow mb-2">Initial response target</div>
            <p className="text-lg font-semibold text-foreground">Within one business day</p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Price factors"
            title="What changes a custom-packaging quote."
            intro="A useful price comparison has to keep the structure and specification consistent. These are the main inputs reviewed before final pricing is confirmed."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {commercialTerms.pricingFactors.map((factor) => (
              <article key={factor.title} className="surface-card p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  {factor.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {factor.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quote-inputs" className="section-shell scroll-mt-28 bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Quote inputs"
              title="What to send for a useful first review."
              intro="You can start with an incomplete brief. Known details reduce follow-up questions and help UPG compare the correct manufacturing route."
            />
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-3">
              {commercialTerms.quoteInputs.map((input, index) => (
                <li
                  key={input}
                  className="flex gap-4 border-b border-border bg-surface px-5 py-4 text-sm leading-relaxed text-foreground"
                >
                  <span className="font-semibold text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{input}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="product-families" className="section-shell scroll-mt-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="One planning minimum"
            title="250 units across all five custom product families."
            intro="The planning MOQ is consistent. Final feasibility, specification, and pricing are still reviewed for the selected format and project."
          />
          <div className="mt-10 grid gap-4 md:hidden">
            {products.map((product) => (
              <article key={product.slug} className="border border-border bg-surface p-5">
                <h3 className="font-serif text-2xl text-foreground">{product.name}</h3>
                <dl className="mt-5 grid gap-4 border-t border-border pt-5 text-sm">
                  <div>
                    <dt className="eyebrow mb-1">Planning MOQ</dt>
                    <dd className="text-foreground">{product.moq}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Best for</dt>
                    <dd className="leading-relaxed text-muted-foreground">{product.bestFor}</dd>
                  </div>
                </dl>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-5 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                >
                  Product details →
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 hidden overflow-x-auto border border-border bg-surface md:block">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-stone text-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Product family</th>
                  <th className="px-5 py-4 font-semibold">Planning MOQ</th>
                  <th className="px-5 py-4 font-semibold">Best for</th>
                  <th className="px-5 py-4 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.slug} className="border-t border-border align-top">
                    <td className="px-5 py-4 font-semibold text-foreground">
                      {product.name}
                    </td>
                    <td className="px-5 py-4 text-foreground">{product.moq}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {product.bestFor}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="border-b border-foreground/20 pb-0.5 text-foreground"
                      >
                        Product details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Written terms"
              title="What the final quote must confirm."
              intro="Do not assume a cost, service, or delivery term from a general website statement. The accepted written quote or agreement is the project record."
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {commercialTerms.writtenQuoteControls.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-gold bg-surface px-5 py-4 text-sm leading-relaxed text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Fixed-price evaluation"
            title="Sample kits are separate from custom production."
            intro="These are the only fixed-price products in this commercial guide. Custom production still requires a written quote."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {sampleKits.map((kit) => (
              <article key={kit.sku} className="surface-card p-6">
                <div className="eyebrow mb-3">{kit.sku}</div>
                <h2 className="font-serif text-2xl text-foreground">{kit.name}</h2>
                <p className="mt-3 text-3xl font-light text-foreground">
                  ${kit.price.toFixed(2)} {kit.currency}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {kit.creditText}
                </p>
                <Link
                  href={kit.path}
                  className="mt-5 inline-flex border-b border-foreground/20 pb-0.5 text-sm font-semibold text-foreground"
                >
                  Review the exact kit →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-border bg-background">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Pricing FAQ"
              title="Direct answers before you enquire."
              intro="These answers describe UPG's current public commercial model. Project-specific written terms remain controlling."
            />
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={commercialPricingFaqs} />
          </div>
        </div>
      </section>

      <QuoteCta
        title="Ready for a specification-based price?"
        intro="Share the product, dimensions, quantity, intended use, and destination. UPG will review the structure, specification, pricing, and delivery plan."
      />
    </>
  );
}

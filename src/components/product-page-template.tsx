import Link from "next/link";
import type { Product } from "@/data/products";
import { getRelatedProducts } from "@/data/products";
import { Section, SectionHeading } from "@/components/section";
import { ProductCard } from "@/components/product-card";
import { CtaBanner } from "@/components/cta-banner";
import { ProductIllustration } from "@/components/product-illustrations";

interface ProductPageTemplateProps {
  product: Product;
}

export function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const related = getRelatedProducts(product.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                {product.family}
              </span>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-offwhite md:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-offwhite/70">
                {product.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/get-a-quote?product=${encodeURIComponent(product.family)}`}
                  className="rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
                >
                  {product.quoteCta}
                </Link>
              </div>
            </div>
            {/* Product illustration */}
            <div className="flex h-80 items-center justify-center rounded-sm bg-stone-50 p-8 lg:h-[440px]">
              <ProductIllustration slug={product.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <Section variant="cream">
        <SectionHeading>Specifications</SectionHeading>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Minimum Order", value: product.moq },
            { label: "Lead Time", value: product.leadTime },
            { label: "Materials", value: product.materialOptions },
            { label: "Print Options", value: product.printOptions },
            { label: "Finish Options", value: product.finishOptions },
            { label: "Size Flexibility", value: product.sizeFlexibility },
          ].map((spec) => (
            <div key={spec.label} className="border-l-2 border-gold/30 pl-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
                {spec.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Use cases */}
      <Section variant="surface">
        <SectionHeading>Use Cases</SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {product.useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex items-start gap-3 rounded-sm bg-cream p-6"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-medium text-charcoal">
                {useCase}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Artwork requirements */}
      <Section variant="cream">
        <SectionHeading>Artwork Requirements</SectionHeading>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/70">
          {product.artworkRequirements}
        </p>
        <div className="mt-6 rounded-sm border border-gold/20 bg-surface p-6">
          <p className="text-sm leading-relaxed text-charcoal/60">
            <span className="font-semibold text-charcoal">Note:</span>{" "}
            {product.screeningNote}
          </p>
        </div>
      </Section>

      {/* Related products */}
      <Section variant="surface">
        <SectionHeading>Related Products</SectionHeading>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaBanner
        heading={`Get a quote for ${product.name.toLowerCase()}`}
        description="Tell us about your project and we will send detailed pricing within 24 hours."
        ctaText="Start Your Quote"
        ctaHref={`/get-a-quote?product=${encodeURIComponent(product.family)}`}
      />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getRelatedProducts } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { QuoteCta } from "@/components/quote-cta";
import { SectionHeading } from "@/components/section-heading";

interface ProductPageTemplateProps {
  product: Product;
}

export function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const related = getRelatedProducts(product.slug);

  return (
    <>
      <section className="bg-gradient-warm">
        <div className="container-editorial pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-5">{product.category}</div>
              <h1 className="display-1 text-balance">{product.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {product.longSummary}
              </p>
              <div className="mt-8 grid max-w-md grid-cols-2 gap-5 border-t border-border pt-6 text-sm">
                <div>
                  <div className="eyebrow mb-1">MOQ</div>
                  <div className="text-foreground">{product.moq}</div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Lead time</div>
                  <div className="text-foreground">{product.leadTime}</div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/get-a-quote?product=${encodeURIComponent(product.family)}`}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
                >
                  {product.quoteCta}
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
                >
                  View all products
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden shadow-lift">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial">
          <div className="mb-14">
            <SectionHeading
              eyebrow="Overview"
              title="Built for the right structure, not just the right keyword."
              intro={product.summary}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Best for", value: product.bestFor },
              { label: "Size range", value: product.sizes },
              { label: "Size flexibility", value: product.sizeFlexibility },
              { label: "Material options", value: product.materialOptions },
              { label: "Print options", value: product.printOptions },
              { label: "Finish options", value: product.finishOptions },
            ].map((item) => (
              <div key={item.label} className="surface-card p-6">
                <div className="eyebrow mb-3">{item.label}</div>
                <p className="text-sm leading-relaxed text-foreground/82">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Industries"
              title="Where this format performs best."
              intro="Use-case alignment matters more than having the broadest possible catalog."
            />
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {product.industries.map((industry) => (
                <div key={industry} className="surface-card p-5 text-sm text-foreground">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Production details"
              title="Materials, print, and finish paths."
              intro="The exact route depends on the structure, quantity, and finish stack. This page gives the core launch options."
            />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Materials</div>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/80">
                {product.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <div className="eyebrow mb-4">Print routes</div>
              <ul className="space-y-3 text-sm leading-relaxed text-foreground/80">
                {product.prints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6 sm:col-span-2">
              <div className="eyebrow mb-4">Finishes</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.finishes.map((item) => (
                  <div key={item} className="border border-border bg-cream px-4 py-3 text-sm text-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Use cases"
              title="How brands are most likely to use this format."
              intro="This is where the structure becomes commercial, not just visual."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {product.useCases.map((item) => (
              <div key={item} className="surface-card p-5 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-editorial grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Artwork & proofing"
              title="What we need from you before this moves."
              intro="The better the files and structure notes, the faster the quote and proof cycle."
            />
          </div>
          <div className="grid gap-6 lg:col-span-8">
            <div className="surface-card p-6">
              <div className="eyebrow mb-3">Artwork requirements</div>
              <p className="text-sm leading-relaxed text-foreground/82">
                {product.artworkRequirements}
              </p>
            </div>
            <div className="surface-card p-6">
              <div className="eyebrow mb-3">Important note</div>
              <p className="text-sm leading-relaxed text-foreground/82">
                {product.screeningNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-cream">
        <div className="container-editorial">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Related products"
              title="Other day-one formats worth comparing."
              intro="Most buyers evaluate a few structures before locking the spec."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-1 border-b border-foreground/20 pb-0.5 text-sm text-foreground"
            >
              See all products <span>→</span>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>

      <QuoteCta
        title={`Quote ${product.name.toLowerCase()} with real specs.`}
        intro="Send the product type, quantity, dimensions, and where it needs to ship. We will come back with a structured commercial response."
      />
    </>
  );
}

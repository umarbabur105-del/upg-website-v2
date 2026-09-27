import Link from "next/link";
import { productBriefHref, type ProductBuyerGuide } from "@/data/product-buyer-guides";
import type { ProductFamily } from "@/data/products";

export function ProductSelectionGuide({
  guide,
  family,
}: {
  guide: NonNullable<ProductBuyerGuide["selectionGuide"]>;
  family: ProductFamily;
}) {
  return (
    <section aria-labelledby="product-selection-heading" className="border-y border-border bg-surface py-12 md:py-14">
      <div className="container-editorial">
        <div className="max-w-3xl">
          <div className="eyebrow mb-3">Choose your packaging</div>
          <h2 id="product-selection-heading" className="text-3xl font-light tracking-[-0.025em] text-balance sm:text-4xl">{guide.heading}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{guide.intro}</p>
        </div>
        <div className="mt-7 grid gap-7 md:grid-cols-3">
          {guide.decisions.map((decision) => (
            <article key={decision.title} className="flex flex-col border-t border-border pt-4">
              <h3 className="text-base font-semibold">{decision.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{decision.description}</p>
              <Link
                href={productBriefHref(family, decision.quoteNote)}
                aria-label={`Discuss ${decision.title.replace(/\?$/, "").toLowerCase()} in your quote`}
                className="mt-3 inline-flex min-h-11 items-center self-start text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Discuss this option →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-4">
          {guide.resources.map((resource) => (
            <Link key={resource.href} href={resource.href} className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              {resource.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  productBriefComparisonNote,
  productBriefHref,
  type ProductBuyerGuide,
} from "@/data/product-buyer-guides";
import type { Product } from "@/data/products";
import { mailerOffer } from "@/data/mailer-offer";

export function ProductBuyingGuide({
  product,
  guide,
}: {
  product: Product;
  guide: ProductBuyerGuide;
}) {
  return (
    <section id="pricing-and-moq" aria-labelledby="product-pricing-heading" className="scroll-mt-24 border-b border-border bg-cream py-14 md:py-16">
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Pricing &amp; MOQ</div>
            <h2 id="product-pricing-heading" className="text-3xl font-light tracking-[-0.025em] text-balance sm:text-4xl">
              {guide.priceHeading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{guide.priceIntro}</p>
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="text-base font-semibold">Choose a starting quantity</h3>
              {guide.quantityLabel ? (
                <p className="mt-1 text-sm font-medium text-foreground">
                  {guide.quantityLabel}
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Select a quantity for your custom quote, or compare all three with the same design and specifications.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[250, 500, 1000].map((quantity) => (
                  <Link
                    key={quantity}
                    href={productBriefHref(product.family, guide.quoteNote, quantity)}
                    className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    Quote {quantity.toLocaleString("en-US")} units
                  </Link>
                ))}
              </div>
              <Link
                href={productBriefHref(
                  product.family,
                  productBriefComparisonNote(guide.quoteNote),
                  250,
                )}
                className="mt-3 inline-flex min-h-11 items-center border-b border-foreground/20 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Compare 250, 500 &amp; 1,000 units →
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Planning multiple sizes or designs? Share the mix and we will confirm the minimum for each.
              </p>
            </div>
          </div>
          <dl className="grid content-start gap-x-7 gap-y-6 sm:grid-cols-2 lg:col-span-7">
            {guide.pricingFactors.map((factor) => (
              <div key={factor.title} className="border-t border-border pt-4">
                <dt className="text-base font-semibold text-foreground">{factor.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{factor.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        {product.slug === mailerOffer.productSlug ? (
          <div className="mt-9 border-t border-border pt-6">
            <h3 className="text-lg font-semibold">Three ways to compare your mailer cost</h3>
            <div className="mt-5 grid gap-6 md:grid-cols-3">
              {mailerOffer.comparisons.map((comparison) => (
                <article key={comparison.title} className="border-t border-border pt-4">
                  <h4 className="text-base font-semibold">{comparison.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{comparison.description}</p>
                  <Link href={productBriefHref(product.family, comparison.quoteNote)} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
                    Request this comparison →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-9 grid gap-5 border-t border-border pt-6 md:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold">Tell us about your project</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {guide.briefChecklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="md:pl-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Have a product or an idea? Start there. We will help you choose the packaging details and confirm pricing, delivery and next steps in your quote.
            </p>
            <Link href="/custom-packaging-pricing" className="mt-4 inline-flex min-h-11 items-center border-b border-foreground/20 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Read the full pricing &amp; MOQ guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

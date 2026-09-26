import Link from "next/link";
import { productBriefHref, type ProductBuyerGuide } from "@/data/product-buyer-guides";
import type { Product } from "@/data/products";

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
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                These open a prefilled enquiry. Request other quantities or a comparison in your brief; prices are confirmed in a written quote.
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
                  `${guide.quoteNote} Start with 250 units and also quote 500 and 1,000 units on the same specification. Please identify freight and other charges for each quantity.`,
                  250,
                )}
                className="mt-3 inline-flex min-h-11 items-center border-b border-foreground/20 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Compare all three quantities in one enquiry →
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Different sizes or artworks need individual review; do not assume they can be combined to reach {product.moq}.
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
        <div className="mt-9 grid gap-5 border-t border-border pt-6 md:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold">For a more useful first quote</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {guide.briefChecklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="md:pl-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with what you know. Technical details can follow. The accepted written quote confirms manufacturing price, freight, duties, taxes, proofing, production timing and delivery terms.
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

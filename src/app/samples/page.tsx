import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SampleRequestForm } from "@/components/sample-request-form";
import {
  sampleKits,
  sampleKitShippingRegionLabel,
} from "@/data/sample-kit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Packaging Sample Kits",
  description:
    "Choose a UPG Box Sample Kit or Mylar Bag Sample Kit. Each costs $19.99 with shipping included, estimated delivery in 3–7 business days, and full credit toward a first production order.",
  path: "/samples",
  keywords: [
    "custom packaging sample kits",
    "box sample kit",
    "mylar bag sample kit",
    "finished packaging samples",
    "custom packaging samples",
  ],
});

export default function SamplesPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="container-editorial py-16 text-center md:py-24">
          <div className="eyebrow mb-5">Two focused sample kits</div>
          <h1 className="mx-auto max-w-5xl text-balance font-serif text-[clamp(3rem,6vw,5.5rem)] font-light leading-[0.98] tracking-[-0.035em]">
            Evaluate finished packaging before production.
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
            <article key={kit.sku} className="overflow-hidden border border-border bg-surface shadow-card">
              <Link href={kit.path} className="group block">
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
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="eyebrow">{kit.heroEyebrow}</div>
                    <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
                      {kit.shortName}
                    </h2>
                  </div>
                  <div className="text-right">
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
                <div className="mt-6 flex flex-wrap gap-3">
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

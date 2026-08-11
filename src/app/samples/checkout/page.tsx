import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmbeddedSampleKitCheckout } from "@/components/embedded-sample-kit-checkout";
import {
  getSampleKitBySku,
  sampleKitDeliveryEstimate,
  sampleKitShippingRegionLabel,
} from "@/data/sample-kit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Secure Sample Kit Checkout",
  robots: { index: false, follow: false },
};

export default async function SampleKitCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string }>;
}) {
  const { sku } = await searchParams;
  const kit = getSampleKitBySku(sku ?? "");

  if (!kit) notFound();

  return (
    <section className="bg-cream">
      <div className="container-editorial grid gap-10 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16 lg:py-20">
        <aside className="border border-border bg-surface p-6 shadow-soft lg:sticky lg:top-28">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone">
            <Image
              src={kit.image}
              alt={kit.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
              priority
            />
          </div>
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <div className="eyebrow">Secure checkout</div>
              <h1 className="mt-2 font-serif text-3xl text-foreground">
                {kit.shortName}
              </h1>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              ${kit.price.toFixed(2)} USD
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Shipping included</li>
            <li>Estimated delivery in {sampleKitDeliveryEstimate}</li>
            <li>Available in {sampleKitShippingRegionLabel}</li>
            <li>Available to order</li>
            <li>Full kit price credited to first UPG production order</li>
          </ul>
          <p className="mt-5 border-l-2 border-gold pl-4 text-xs leading-relaxed text-muted-foreground">
            {kit.productBoundary}
          </p>
          <Link href={kit.path} className="mt-6 inline-flex text-sm font-semibold underline">
            Return to product details
          </Link>
        </aside>

        <div>
          <div className="mb-6">
            <div className="eyebrow">Payment & delivery</div>
            <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
              Complete your order on UPG.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Enter the delivery and payment details below. Payment information
              is handled securely by Stripe and is not stored by UPG.
            </p>
          </div>
          <div className="min-h-[480px] border border-border bg-surface p-4 shadow-soft md:p-6">
            <EmbeddedSampleKitCheckout kit={kit} />
          </div>
        </div>
      </div>
    </section>
  );
}

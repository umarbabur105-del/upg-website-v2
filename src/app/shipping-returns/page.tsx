import type { Metadata } from "next";
import { Section, SectionHeading, SectionSubheading } from "@/components/section";
import {
  sampleKitDeliveryEstimate,
  sampleKitShippingCountries,
} from "@/data/sample-kit";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sample Kit Shipping & Returns",
  description:
    "Shipping, cancellation, replacement, refund, and production-order credit terms for UPG Box and Mylar Bag Sample Kits.",
  path: "/shipping-returns",
});

export default function ShippingReturnsPage() {
  return (
    <>
      <section className="bg-olive px-6 pt-32 pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading as="h1" className="text-offwhite">
            Sample Kit Shipping & Returns
          </SectionHeading>
          <SectionSubheading className="text-offwhite/70">
            Effective August 10, 2026. These terms apply to the fixed-price UPG
            Box Sample Kit and Mylar Bag Sample Kit.
          </SectionSubheading>
        </div>
      </section>

      <Section variant="cream">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-7 text-charcoal/75">
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Paid sample kits</h2>
            <p className="mt-3">
              The UPG Box Sample Kit and Mylar Bag Sample Kit each cost $19.99
              and are purchased separately. Standard shipping to one eligible
              delivery address is included, with estimated delivery in
              {` ${sampleKitDeliveryEstimate}`}. The full $19.99 price of the
              purchased kit is credited toward the customer&apos;s first custom
              packaging production order placed with UPG. Custom production
              pricing, freight, duties, taxes, and other project charges remain
              separate.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Delivery countries</h2>
            <p className="mt-3">
              Paid Sample Kit checkout is available in: {sampleKitShippingCountries
                .map(({ name }) => name)
                .join(", ")}. The same $19.99 kit price, included standard
              shipping, and estimated {sampleKitDeliveryEstimate} apply to each
              listed country.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Fulfillment</h2>
            <p className="mt-3">
              The Box Sample Kit contains finished UPG-branded box samples, not
              loose material swatches or flexible packaging. The Mylar Bag Sample
              Kit contains the five finished flexible-packaging formats listed on
              its product page, not boxes or loose material swatches. A
              child-resistant pouch is not included in the current Mylar kit.
              UPG sends order and fulfillment updates to the email
              supplied during checkout. The 3–7 business day estimate is not a
              production lead time and may be affected by carrier, address, or
              availability conditions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Cancellation</h2>
            <p className="mt-3">
              A paid Sample Kit order may be cancelled for a full refund before
              dispatch. Contact UPG as soon as possible with the checkout email
              and order reference.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Damage, loss, or incorrect shipment</h2>
            <p className="mt-3">
              If a paid kit arrives damaged, is lost in transit, or is materially
              different from the sample assortment described on the product
              page, contact UPG within 14 days of delivery. UPG will review the
              issue and provide a replacement or refund when appropriate. The
              customer does not need to return low-value sample materials unless
              UPG specifically requests it.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Free sample requests</h2>
            <p className="mt-3">
              A free sample request is reviewed manually and does not guarantee
              shipment. UPG confirms available contents, any delivery cost, and
              timing before a free sample is sent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Custom production orders</h2>
            <p className="mt-3">
              These Sample Kit terms do not govern custom production. The
              accepted written quote or agreement controls specifications,
              price, payment, production, freight, delivery, claims, and other
              terms for a custom packaging order.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Contact</h2>
            <p className="mt-3">
              Email{" "}
              <a className="underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>{" "}
              and include the checkout email and order reference.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

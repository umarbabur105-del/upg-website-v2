import type { Metadata } from "next";
import Link from "next/link";
import { SampleKitPurchaseTracker } from "@/components/sample-kit-purchase-tracker";
import { getSampleKitBySku, type SampleKit } from "@/data/sample-kit";
import { getStripeClient } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sample Kit Order Status",
  robots: { index: false, follow: false },
};

export default async function SampleKitSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const stripe = getStripeClient();
  let paid = false;
  let email = "";
  let kit: SampleKit | undefined;

  if (stripe && sessionId && /^cs_(test_|live_)?[A-Za-z0-9]+$/.test(sessionId)) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      kit = getSampleKitBySku(session.metadata?.sku ?? "");
      paid =
        session.payment_status === "paid" &&
        Boolean(kit) &&
        session.metadata?.order_type === kit?.orderType;
      email = session.customer_details?.email ?? "";
    } catch {
      paid = false;
    }
  }

  return (
    <section className="bg-background">
      <div className="container-editorial flex min-h-[70vh] items-center justify-center py-24">
        <div className="w-full max-w-2xl border border-border bg-surface p-8 text-center shadow-soft md:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-xl text-gold">
            {paid ? "✓" : "!"}
          </div>
          <div className="eyebrow mt-6">Sample Kit order</div>
          <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
            {paid ? "Payment received." : "Payment status needs review."}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {paid
              ? `Your ${kit?.name} order is confirmed. UPG will prepare the listed finished samples and use the shipping address provided during checkout.`
              : "We could not verify a completed Sample Kit payment from this link. No new payment is required until UPG confirms the order status."}
          </p>
          {paid && email ? (
            <p className="mt-3 text-sm text-muted-foreground">
              The checkout receipt was sent to {email}.
            </p>
          ) : null}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
            >
              Explore packaging
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-stone"
            >
              Contact UPG
            </Link>
          </div>
          {paid && sessionId && kit ? (
            <SampleKitPurchaseTracker transactionId={sessionId} kit={kit} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

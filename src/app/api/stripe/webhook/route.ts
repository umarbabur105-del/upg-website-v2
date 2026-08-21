import { after, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getSampleKitBySku } from "@/data/sample-kit";
import { recordPaidSampleKitOrder } from "@/lib/sample-kit-orders";
import {
  getStripeClient,
  getStripeWebhookSecret,
  type StripeMode,
} from "@/lib/stripe";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const supportedEvents = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  let verified:
    | { event: Stripe.Event; mode: StripeMode; stripe: Stripe }
    | undefined;

  for (const mode of ["live", "test"] as const) {
    const stripe = getStripeClient(mode);
    const webhookSecret = getStripeWebhookSecret(mode);
    if (!stripe || !webhookSecret) continue;

    try {
      const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      if (event.livemode === (mode === "live")) {
        verified = { event, mode, stripe };
        break;
      }
    } catch {
      // Try the other independently configured signing secret.
    }
  }

  if (!verified) {
    console.error(JSON.stringify({ type: "stripe_webhook_signature_failed" }));
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { event, mode, stripe } = verified;
  const testMode = mode === "test";

  if (!supportedEvents.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  const incomingSession = event.data.object as Stripe.Checkout.Session;
  const incomingKit = getSampleKitBySku(incomingSession.metadata?.sku ?? "");
  if (!incomingKit || incomingSession.metadata?.order_type !== incomingKit.orderType) {
    return NextResponse.json({ received: true });
  }

  if (testMode !== (incomingSession.metadata?.upg_test_mode === "true")) {
    return NextResponse.json({ received: true, ignored: true });
  }

  if (incomingSession.payment_status !== "paid") {
    return NextResponse.json({ received: true, pending: true });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(incomingSession.id);
    const kit = getSampleKitBySku(session.metadata?.sku ?? "");
    if (!kit || session.metadata?.order_type !== kit.orderType) {
      return NextResponse.json({ received: true });
    }
    const sheetAlreadyStored = session.metadata?.upg_sheet_stored === "true";
    const emailAlreadySent = session.metadata?.upg_email_sent === "true";

    if (sheetAlreadyStored && emailAlreadySent) {
      return NextResponse.json({ received: true, processed: true });
    }

    const result = await recordPaidSampleKitOrder({
      session,
      kit,
      request,
      sheetAlreadyStored,
      emailAlreadySent,
      testMode,
    });

    if (!result.sheetStored || !result.emailSent) {
      console.error(JSON.stringify({
        type: "sample_order_partial_processing",
        testMode,
        sheetStored: result.sheetStored,
        emailSent: result.emailSent,
      }));
      return NextResponse.json({ error: "Order processing incomplete" }, { status: 500 });
    }

    if (
      result.sheetStored !== sheetAlreadyStored ||
      result.emailSent !== emailAlreadySent
    ) {
      after(async () => {
        try {
          await stripe.checkout.sessions.update(session.id, {
            metadata: {
              upg_sheet_stored: String(result.sheetStored),
              upg_email_sent: String(result.emailSent),
            },
          });
        } catch {
          console.error(JSON.stringify({
            type: "sample_order_metadata_update_failed",
            testMode,
          }));
        }
      });
    }

    return NextResponse.json({ received: true, processed: true, testMode });
  } catch {
    console.error(JSON.stringify({
      type: "sample_order_webhook_processing_failed",
      testMode,
    }));
    return NextResponse.json({ error: "Order processing failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getSampleKitBySku } from "@/data/sample-kit";
import { recordPaidSampleKitOrder } from "@/lib/sample-kit-orders";
import { getStripeClient, getStripeWebhookSecret } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const supportedEvents = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const webhookSecret = getStripeWebhookSecret();
  const signature = request.headers.get("stripe-signature");

  if (!stripe || !webhookSecret) {
    console.error(JSON.stringify({ type: "stripe_webhook_not_configured" }));
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    console.error(JSON.stringify({ type: "stripe_webhook_signature_failed" }));
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!supportedEvents.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  const incomingSession = event.data.object as Stripe.Checkout.Session;
  const incomingKit = getSampleKitBySku(incomingSession.metadata?.sku ?? "");
  if (!incomingKit || incomingSession.metadata?.order_type !== incomingKit.orderType) {
    return NextResponse.json({ received: true });
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
    });

    if (
      result.sheetStored !== sheetAlreadyStored ||
      result.emailSent !== emailAlreadySent
    ) {
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          upg_sheet_stored: String(result.sheetStored),
          upg_email_sent: String(result.emailSent),
        },
      });
    }

    if (!result.sheetStored || !result.emailSent) {
      console.error(JSON.stringify({
        type: "sample_order_partial_processing",
        sheetStored: result.sheetStored,
        emailSent: result.emailSent,
      }));
      return NextResponse.json({ error: "Order processing incomplete" }, { status: 500 });
    }

    return NextResponse.json({ received: true, processed: true });
  } catch {
    console.error(JSON.stringify({ type: "sample_order_webhook_processing_failed" }));
    return NextResponse.json({ error: "Order processing failed" }, { status: 500 });
  }
}

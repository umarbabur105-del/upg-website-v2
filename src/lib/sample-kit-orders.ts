import "server-only";

import type Stripe from "stripe";
import type { SampleKit } from "@/data/sample-kit";
import {
  prepareGoogleSheetsAuth,
  storeLeadInGoogleSheet,
} from "@/lib/google-sheets";
import { renderFieldRows, sendNotification } from "@/lib/mailer";

function formatAddress(address: Stripe.Address | null | undefined) {
  if (!address) return "";

  return [
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(", "),
    address.country,
  ].filter(Boolean).join("\n");
}

function formatAmount(amount: number | null, currency: string | null) {
  if (amount === null || !currency) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export async function recordPaidSampleKitOrder({
  session,
  kit,
  request,
  sheetAlreadyStored,
  emailAlreadySent,
  testMode,
}: {
  session: Stripe.Checkout.Session;
  kit: SampleKit;
  request: Request;
  sheetAlreadyStored: boolean;
  emailAlreadySent: boolean;
  testMode: boolean;
}) {
  const customer = session.customer_details;
  const shipping = session.collected_information?.shipping_details;
  const shippingAddress = formatAddress(shipping?.address);
  const name = shipping?.name || customer?.name || "Sample kit customer";
  const email = customer?.email ?? "";
  const phone = customer?.phone ?? "";
  const amount = formatAmount(session.amount_total, session.currency);
  const fields = renderFieldRows([
    { label: "Order", value: session.id },
    { label: "Mode", value: testMode ? "Stripe test mode — no real charge" : "Live" },
    { label: "Payment status", value: session.payment_status },
    { label: "Amount", value: amount },
    { label: "Product", value: kit.name },
    { label: "SKU", value: kit.sku },
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Shipping address", value: shippingAddress },
    {
      label: "Production-order credit",
      value: `$${kit.price.toFixed(2)}`,
    },
  ]);

  let sheetStored = sheetAlreadyStored;
  let emailSent = emailAlreadySent;

  const [sheetsAuth, notification] = await Promise.all([
    sheetAlreadyStored
      ? Promise.resolve(null)
      : prepareGoogleSheetsAuth(request),
    emailAlreadySent
      ? Promise.resolve(null)
      : sendNotification({
          subject: testMode
            ? `[UPG TEST — NO REAL PAYMENT] ${kit.shortName} — ${session.id}`
            : `[UPG Paid ${kit.shortName}] ${name} — ${session.id}`,
          html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;">
  <h2 style="font-size:18px;color:#111;margin:0 0 4px;">${testMode ? "Test payment completed" : `Paid ${kit.name} Order`}</h2>
  <p style="font-size:13px;color:#666;margin:0 0 16px;">${testMode ? "TEST MODE ONLY. No money was charged and no kit should be fulfilled." : "Payment is confirmed. Prepare the kit and use the Stripe order as the fulfillment record."}</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">${fields.html}</table>
</div>`,
          text: testMode
            ? `UPG STRIPE TEST MODE\nNo real payment. Do not fulfil.\n\n${fields.text}\n`
            : `Paid ${kit.name} Order\nPayment confirmed.\n\n${fields.text}\n`,
          replyTo: email || undefined,
          idempotencyKey: `sample-kit-order/${testMode ? "test" : "live"}/${session.id}`,
        }),
  ]);

  if (notification?.delivered) {
    emailSent = true;
  }

  if (!sheetAlreadyStored && sheetsAuth) {
    const saved = await storeLeadInGoogleSheet(
      {
        submissionId: session.id,
        receivedAt: new Date(session.created * 1_000),
        source: testMode ? "Stripe Test Order" : kit.crm.source,
        status: testMode ? "Spam" : "New",
        priority: testMode ? "Low" : "Normal",
        owner: testMode ? "System Test" : "Umar",
        notificationStatus: emailSent ? "Sent" : "Failed",
        name,
        email,
        phone,
        productFamily: kit.crm.productFamily,
        productStyle: kit.crm.productStyle,
        quantity: "1 kit",
        intendedEndUse: kit.crm.intendedEndUse,
        shippingCountry: shipping?.address.country ?? "",
        shippingStateOrProvince: shipping?.address.state ?? "",
        materialPreference: kit.crm.materialPreference,
        finishPreference: kit.crm.finishPreference,
        message: testMode
          ? `TEST MODE — NO REAL PAYMENT OR FULFILLMENT. Simulated ${amount}. ${kit.name}. Stripe test session: ${session.id}.\nShipping address:\n${shippingAddress}`
          : `Paid ${amount}. ${kit.name}. Stripe order: ${session.id}.\nShipping address:\n${shippingAddress}`,
        landingPage: session.metadata?.landing_page || kit.path,
        referrer: session.metadata?.referrer || null,
        utmSource: session.metadata?.utm_source || null,
        utmMedium: session.metadata?.utm_medium || null,
        utmCampaign: session.metadata?.utm_campaign || null,
        utmContent: session.metadata?.utm_content || null,
        utmTerm: session.metadata?.utm_term || null,
      },
      request,
      sheetsAuth
    );
    sheetStored = saved.stored;
  }

  return { sheetStored, emailSent };
}

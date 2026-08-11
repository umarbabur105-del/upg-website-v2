import { NextResponse } from "next/server";
import {
  appendLeadToGoogleSheet,
  prepareGoogleSheetsAuth,
} from "@/lib/google-sheets";
import {
  cleanAttribution,
  cleanSubmissionId,
  cleanText,
  FormRequestError,
  isHoneypotFilled,
  isValidEmail,
  parseFormRequest,
} from "@/lib/form-validation";
import { renderFieldRows, sendNotification } from "@/lib/mailer";

const allowedProductInterests = new Set([
  "Tuck Boxes",
  "Mailer Boxes",
  "Magnetic Boxes",
  "Collapsible Magnetic Boxes",
  "Mylar Bags",
  "Multiple product families",
  "Not sure yet",
]);

export async function POST(request: Request) {
  try {
    const input = await parseFormRequest(request, 14_000);
    if (isHoneypotFilled(input)) {
      return NextResponse.json({ success: true, accepted: true });
    }

    const attribution = cleanAttribution(input.attribution);
    const submissionId = cleanSubmissionId(input.submission_id);
    const data = {
      name: cleanText(input.name, { max: 120, singleLine: true }),
      email: cleanText(input.email, { max: 254, singleLine: true }).toLowerCase(),
      company: cleanText(input.company, { max: 160, singleLine: true }),
      phone: cleanText(input.phone, { max: 60, singleLine: true }),
      website: cleanText(input.website, { max: 300, singleLine: true }),
      productInterest: cleanText(input.product_interest, { max: 80, singleLine: true }),
      shippingCountry: cleanText(input.shipping_country, { max: 80, singleLine: true }),
      message: cleanText(input.message, { max: 4_000 }),
    };

    const missing = [
      ["name", data.name],
      ["email", data.email],
      ["company", data.company],
      ["product_interest", data.productInterest],
      ["shipping_country", data.shippingCountry],
      ["message", data.message],
    ].filter(([, value]) => !value).map(([field]) => field);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    if (!allowedProductInterests.has(data.productInterest)) {
      return NextResponse.json({ error: "Invalid product interest" }, { status: 400 });
    }

    const subject = `[UPG Sample Request] ${data.name} — ${data.company} — ${data.productInterest}`;
    const fields = renderFieldRows([
      { label: "Name", value: data.name },
      { label: "Company", value: data.company },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Website", value: data.website },
      { label: "Product interest", value: data.productInterest },
      { label: "Delivery country", value: data.shippingCountry },
      { label: "Evaluation need", value: data.message },
    ]);
    const receivedAt = new Date();
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;">
  <h2 style="font-size:18px;color:#111;margin:0 0 4px;">New UPG Sample Request</h2>
  <p style="font-size:13px;color:#666;margin:0 0 16px;">Review required before confirming a free sample shipment.</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">${fields.html}</table>
</div>`;
    const text = `New UPG Sample Request\nReview required before shipment.\n\n${fields.text}\n`;

    const [sheetsAuth, mail] = await Promise.all([
      prepareGoogleSheetsAuth(request),
      sendNotification({
        subject,
        html,
        text,
        replyTo: data.email,
      }),
    ]);
    const saved = await appendLeadToGoogleSheet(
      {
        submissionId,
        receivedAt,
        source: "Sample Request",
        notificationStatus: mail.delivered ? "Sent" : "Failed",
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        website: data.website,
        productFamily: data.productInterest,
        productStyle: "Free physical sample review",
        intendedEndUse: data.message,
        shippingCountry: data.shippingCountry,
        message: "Free sample request — manual qualification required before shipment.",
        landingPage: attribution.landing_page,
        referrer: attribution.referrer,
        utmSource: attribution.utm_source,
        utmMedium: attribution.utm_medium,
        utmCampaign: attribution.utm_campaign,
        utmContent: attribution.utm_content,
        utmTerm: attribution.utm_term,
      },
      sheetsAuth
    );

    if (!saved.stored && !mail.delivered) {
      console.error(JSON.stringify({
        type: "sample_request_delivery_failed",
        mailVia: mail.via,
        sheetsReason: saved.reason,
      }));
      return NextResponse.json(
        { error: "We could not deliver this request. Please email quotes@universalpackaginggroup.com." },
        { status: 502 }
      );
    }

    console.log(JSON.stringify({
      type: "sample_request_accepted",
      stored: saved.stored,
      notified: mail.delivered,
      receivedAt: receivedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, accepted: true });
  } catch (error) {
    if (error instanceof FormRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error(JSON.stringify({ type: "sample_request_route_error" }));
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

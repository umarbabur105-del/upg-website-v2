import { NextResponse } from "next/server";
import {
  renderFieldRows,
  sendLeadStorageAlert,
  sendNotification,
} from "@/lib/mailer";
import {
  cleanAttribution,
  cleanSubmissionId,
  cleanText,
  FormRequestError,
  isHoneypotFilled,
  isValidEmail,
  parseFormRequest,
} from "@/lib/form-validation";
import {
  prepareGoogleSheetsAuth,
  storeLeadInGoogleSheet,
} from "@/lib/google-sheets";
import { classifyLeadDelivery } from "@/lib/lead-delivery";

const allowedFamilies = new Set([
  "Tuck Boxes",
  "Mailer Boxes",
  "Magnetic Boxes",
  "Collapsible Magnetic Boxes",
  "Mylar Bags",
  "Not sure yet",
]);

export async function POST(request: Request) {
  try {
    const input = await parseFormRequest(request, 12_000);
    if (isHoneypotFilled(input)) {
      return NextResponse.json({
        success: true,
        ...classifyLeadDelivery({ stored: false, delivered: false, ignored: true }),
      });
    }

    const attribution = cleanAttribution(
      input.attribution ?? { landing_page: input.landing_page }
    );
    const submissionId = cleanSubmissionId(input.submission_id);
    const data = {
      name: cleanText(input.name, { max: 120, singleLine: true }),
      email: cleanText(input.email, { max: 254, singleLine: true }).toLowerCase(),
      company: cleanText(input.company, { max: 160, singleLine: true }),
      phone: cleanText(input.phone, { max: 60, singleLine: true }),
      productFamily:
        cleanText(input.product_family, { max: 80, singleLine: true }) ||
        "Not sure yet",
      message: cleanText(input.message, { max: 4_000 }),
    };

    const requiredFields: Array<keyof typeof data> = ["name", "email", "message"];
    const missing = requiredFields.filter(
      (field) => !data[field] || String(data[field]).trim() === ""
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    if (!allowedFamilies.has(data.productFamily)) {
      return NextResponse.json({ error: "Invalid product family" }, { status: 400 });
    }

    const subjectName = String(data.name).trim();
    const subject = `[UPG Contact] ${subjectName}`;

    const fields = renderFieldRows([
      { label: "Submission ID", value: submissionId },
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Company", value: data.company },
      { label: "Phone", value: data.phone },
      { label: "Product family", value: data.productFamily },
      { label: "Message", value: data.message },
    ]);

    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;">
  <h2 style="font-size:18px;color:#111;margin:0 0 4px;">New UPG Contact Message</h2>
  <p style="font-size:13px;color:#666;margin:0 0 16px;">Received ${new Date().toUTCString()}</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">${fields.html}</table>
  <p style="font-size:12px;color:#999;margin:16px 0 0;">Reply directly to this email to respond to ${data.name}.</p>
</div>`;

    const text = `New UPG Contact Message\nReceived ${new Date().toUTCString()}\n\n${fields.text}\n`;

    const replyTo = String(data.email).trim() || undefined;

    const receivedAt = new Date();
    const [sheetsAuth, mail] = await Promise.all([
      prepareGoogleSheetsAuth(request),
      sendNotification({
        subject,
        html,
        text,
        replyTo,
        idempotencyKey: `contact-form/${submissionId}`,
      }),
    ]);
    const saved = await storeLeadInGoogleSheet(
      {
        submissionId,
        receivedAt,
        source: "Contact Form",
        notificationStatus: mail.delivered ? "Sent" : "Failed",
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        productFamily: data.productFamily,
        message: data.message,
        landingPage: attribution.landing_page,
        referrer: attribution.referrer,
        utmSource: attribution.utm_source,
        utmMedium: attribution.utm_medium,
        utmCampaign: attribution.utm_campaign,
        utmContent: attribution.utm_content,
        utmTerm: attribution.utm_term,
      },
      request,
      sheetsAuth
    );

    const delivery = classifyLeadDelivery({
      stored: saved.stored,
      delivered: mail.delivered,
    });

    if (!delivery.accepted) {
      console.error(JSON.stringify({
        type: "contact_delivery_failed",
        submissionId,
        mailVia: mail.via,
        sheetsReason: saved.reason,
      }));
      return NextResponse.json(
        { error: "We could not deliver this message. Please email quotes@universalpackaginggroup.com." },
        { status: 502 }
      );
    }

    let storageAlertDelivered: boolean | undefined;
    if (!saved.stored && mail.delivered) {
      const storageAlert = await sendLeadStorageAlert({
        submissionId,
        formName: "contact form",
        reason: saved.reason,
      });
      storageAlertDelivered = storageAlert.delivered;
      console.error(JSON.stringify({
        type: "contact_crm_reconciliation_required",
        submissionId,
        sheetsReason: saved.reason,
        alertDelivered: storageAlert.delivered,
      }));
    }

    console.log(JSON.stringify({
      type: "contact_accepted",
      submissionId,
      stored: saved.stored,
      notified: mail.delivered,
      sheetsReason: saved.reason,
      sheetRow: saved.rowNumber,
      sheetDeduplicated: saved.deduplicated,
      sheetAttempts: saved.attempts,
      storageAlertDelivered,
      receivedAt: new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      ...delivery,
      message: "Message received. We target an initial response within one business day.",
      submissionId,
    });
  } catch (error) {
    if (error instanceof FormRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error(JSON.stringify({ type: "contact_route_error" }));
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

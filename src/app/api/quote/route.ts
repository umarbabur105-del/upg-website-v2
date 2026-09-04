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
import { validatePlanningQuantity } from "@/data/packaging-spec";
import { combineQuoteNotes } from "@/lib/quote-form-ux";

const allowedFamilies = new Set([
  "Tuck Boxes",
  "Mailer Boxes",
  "Magnetic Boxes",
  "Collapsible Magnetic Boxes",
  "Mylar Bags",
  "Not sure yet",
]);
const excludedMailerStyle = "Standard Shipping / Master Carton (not supplied)";

export async function POST(request: Request) {
  try {
    const input = await parseFormRequest(request);
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
      product_family: cleanText(input.product_family, { max: 80, singleLine: true }),
      product_style: cleanText(input.product_style, { max: 120, singleLine: true }),
      quantity: cleanText(input.quantity, { max: 80, singleLine: true }),
      intended_end_use: cleanText(input.intended_end_use, { max: 240, singleLine: true }),
      shipping_country: cleanText(input.shipping_country, { max: 80, singleLine: true }),
      shipping_state_or_province: cleanText(input.shipping_state_or_province, { max: 100, singleLine: true }),
      target_delivery_timing: cleanText(input.target_delivery_timing, { max: 100, singleLine: true }),
      artwork_status: cleanText(input.artwork_status, { max: 100, singleLine: true }),
      name: cleanText(input.name, { max: 120, singleLine: true }),
      email: cleanText(input.email, { max: 254, singleLine: true }).toLowerCase(),
      phone: cleanText(input.phone, { max: 60, singleLine: true }),
      company: cleanText(input.company, { max: 160, singleLine: true }),
      website: cleanText(input.website, { max: 300, singleLine: true }),
      dimensions: cleanText(input.dimensions, { max: 160, singleLine: true }),
      material_preference: cleanText(input.material_preference, { max: 160, singleLine: true }),
      finish_preference: cleanText(input.finish_preference, { max: 160, singleLine: true }),
      notes: cleanText(combineQuoteNotes(input.notes, input.customer_notes), {
        max: 4_000,
      }),
    };

    const requiredFields: Array<keyof typeof data> = [
      "product_family",
      "quantity",
      "name",
      "email",
      "company",
    ];

    const missing = requiredFields.filter(
      (field) => !data[field] || String(data[field]).trim() === ""
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missing },
        { status: 400 }
      );
    }

    if (!allowedFamilies.has(data.product_family)) {
      return NextResponse.json({ error: "Invalid product family" }, { status: 400 });
    }
    const quantityValidation = validatePlanningQuantity(data.quantity);
    if (!quantityValidation.valid) {
      return NextResponse.json(
        { error: quantityValidation.error },
        { status: 422 }
      );
    }
    data.quantity = quantityValidation.label;
    if (
      data.product_family === "Mailer Boxes" &&
      data.product_style === excludedMailerStyle
    ) {
      return NextResponse.json(
        {
          error:
            "UPG does not supply standard shipping cartons, master cartons, or RSC cases. Choose an ear-lock mailer style to continue.",
        },
        { status: 422 }
      );
    }
    if (!isValidEmail(data.email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    const subjectName = String(data.name).trim();
    const subjectCompany = String(data.company).trim();
    const subjectFamily = String(data.product_family).trim();
    const subject = `[UPG Project] ${subjectName} — ${subjectCompany} — ${subjectFamily}`;

    const fields = renderFieldRows([
      { label: "Submission ID", value: submissionId },
      { label: "Name", value: data.name },
      { label: "Company", value: data.company },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Website", value: data.website },
      { label: "Product family", value: data.product_family },
      { label: "Product style", value: data.product_style },
      { label: "Quantity", value: data.quantity },
      { label: "Intended end use", value: data.intended_end_use },
      { label: "Delivery country / region", value: data.shipping_country },
      { label: "State / province / region", value: data.shipping_state_or_province },
      { label: "Preferred delivery timing", value: data.target_delivery_timing },
      { label: "Artwork status", value: data.artwork_status },
      { label: "Dimensions", value: data.dimensions },
      { label: "Material preference", value: data.material_preference },
      { label: "Finish preference", value: data.finish_preference },
      { label: "Notes", value: data.notes },
    ]);

    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;">
  <h2 style="font-size:18px;color:#111;margin:0 0 4px;">New UPG Project Enquiry</h2>
  <p style="font-size:13px;color:#666;margin:0 0 16px;">Received ${new Date().toUTCString()}</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">${fields.html}</table>
  <p style="font-size:12px;color:#999;margin:16px 0 0;">Reply directly to this email to respond to ${data.name}.</p>
</div>`;

    const text = `New UPG Project Enquiry\nReceived ${new Date().toUTCString()}\n\n${fields.text}\n`;

    const replyTo = String(data.email).trim() || undefined;

    const receivedAt = new Date();
    const [sheetsAuth, mail] = await Promise.all([
      prepareGoogleSheetsAuth(request),
      sendNotification({
        subject,
        html,
        text,
        replyTo,
        idempotencyKey: `project-enquiry/${submissionId}`,
      }),
    ]);
    const saved = await storeLeadInGoogleSheet(
      {
        submissionId,
        receivedAt,
        source: "Project Enquiry",
        notificationStatus: mail.delivered ? "Sent" : "Failed",
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        website: data.website,
        productFamily: data.product_family,
        productStyle: data.product_style,
        quantity: data.quantity,
        intendedEndUse: data.intended_end_use,
        shippingCountry: data.shipping_country,
        shippingStateOrProvince: data.shipping_state_or_province,
        targetDelivery: data.target_delivery_timing,
        artworkStatus: data.artwork_status,
        dimensions: data.dimensions,
        materialPreference: data.material_preference,
        finishPreference: data.finish_preference,
        message: data.notes,
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
        type: "quote_delivery_failed",
        submissionId,
        mailVia: mail.via,
        sheetsReason: saved.reason,
      }));
      return NextResponse.json(
        { error: "We could not deliver this request. Please email quotes@universalpackaginggroup.com." },
        { status: 502 }
      );
    }

    let storageAlertDelivered: boolean | undefined;
    if (!saved.stored && mail.delivered) {
      const storageAlert = await sendLeadStorageAlert({
        submissionId,
        formName: "project enquiry",
        reason: saved.reason,
      });
      storageAlertDelivered = storageAlert.delivered;
      console.error(JSON.stringify({
        type: "quote_crm_reconciliation_required",
        submissionId,
        sheetsReason: saved.reason,
        alertDelivered: storageAlert.delivered,
      }));
    }

    console.log(JSON.stringify({
      type: "quote_accepted",
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
      message: "Project enquiry received. We target an initial response within one business day.",
      submissionId,
    });
  } catch (error) {
    if (error instanceof FormRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error(JSON.stringify({ type: "quote_route_error" }));
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

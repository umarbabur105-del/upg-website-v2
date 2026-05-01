import { NextResponse } from "next/server";
import { renderFieldRows, sendNotification } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const requiredFields = [
      "product_family",
      "quantity",
      "intended_end_use",
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

    const submissionRecord = {
      type: "quote_submission",
      receivedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      data,
    };

    console.log(JSON.stringify(submissionRecord));

    const subjectName = String(data.name).trim();
    const subjectCompany = String(data.company).trim();
    const subjectFamily = String(data.product_family).trim();
    const subject = `[UPG Quote] ${subjectName} — ${subjectCompany} — ${subjectFamily}`;

    const fields = renderFieldRows([
      { label: "Name", value: data.name },
      { label: "Company", value: data.company },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Website", value: data.website },
      { label: "Product family", value: data.product_family },
      { label: "Product style", value: data.product_style },
      { label: "Quantity", value: data.quantity },
      { label: "Intended end use", value: data.intended_end_use },
      { label: "Shipping country", value: data.shipping_country },
      { label: "State / province", value: data.shipping_state_or_province },
      { label: "Target delivery", value: data.target_delivery_timing },
      { label: "Artwork status", value: data.artwork_status },
      { label: "Dimensions", value: data.dimensions },
      { label: "Material preference", value: data.material_preference },
      { label: "Finish preference", value: data.finish_preference },
      { label: "Notes", value: data.notes },
    ]);

    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;">
  <h2 style="font-size:18px;color:#111;margin:0 0 4px;">New UPG Quote Request</h2>
  <p style="font-size:13px;color:#666;margin:0 0 16px;">Received ${new Date().toUTCString()}</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">${fields.html}</table>
  <p style="font-size:12px;color:#999;margin:16px 0 0;">Reply directly to this email to respond to ${data.name}.</p>
</div>`;

    const text = `New UPG Quote Request\nReceived ${new Date().toUTCString()}\n\n${fields.text}\n`;

    const replyTo = String(data.email).trim() || undefined;

    const mail = await sendNotification({ subject, html, text, replyTo });

    return NextResponse.json({
      success: true,
      message: "Quote request received. We will respond within 24 hours.",
      delivered: mail.delivered,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

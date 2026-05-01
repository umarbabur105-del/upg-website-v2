import { NextResponse } from "next/server";
import { renderFieldRows, sendNotification } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const requiredFields = ["name", "email", "message"];
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
      type: "contact_submission",
      receivedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      data,
    };

    console.log(JSON.stringify(submissionRecord));

    const subjectName = String(data.name).trim();
    const subject = `[UPG Contact] ${subjectName}`;

    const fields = renderFieldRows([
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Company", value: data.company },
      { label: "Phone", value: data.phone },
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

    const mail = await sendNotification({ subject, html, text, replyTo });

    return NextResponse.json({
      success: true,
      message: "Message received. We will get back to you within 1 business day.",
      delivered: mail.delivered,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

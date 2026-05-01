import { NextResponse } from "next/server";

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

    // Temporary production-safe fallback until webhook or CRM delivery is configured.
    console.log(JSON.stringify(submissionRecord));

    return NextResponse.json({
      success: true,
      message: "Message received. We will get back to you within 1 business day.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

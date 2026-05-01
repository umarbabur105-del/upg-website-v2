import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
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

    // Temporary production-safe fallback until webhook or CRM delivery is configured.
    console.log(JSON.stringify(submissionRecord));

    return NextResponse.json({
      success: true,
      message: "Quote request received. We will respond within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "product_family",
      "product_style",
      "quantity",
      "intended_end_use",
      "shipping_country",
      "shipping_state_or_province",
      "target_delivery_timing",
      "artwork_status",
      "name",
      "email",
      "phone",
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

    // TODO: Store in Supabase when ready
    // For now, log and return success
    console.log("Quote submission received:", {
      product_family: data.product_family,
      product_style: data.product_style,
      quantity: data.quantity,
      email: data.email,
      company: data.company,
    });

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

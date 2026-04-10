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

    // TODO: Store in Supabase / send email notification when ready
    console.log("Contact message received:", {
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return NextResponse.json({
      success: true,
      message: "Message received. We will get back to you within 1 business day.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

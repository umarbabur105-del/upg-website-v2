import { NextResponse } from "next/server";
import { getAnalyticsConsentRegion } from "@/lib/analytics-consent";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const countryCode =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry");
  const region = getAnalyticsConsentRegion(countryCode);

  return NextResponse.json(region, {
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      Vary: "x-vercel-ip-country, cf-ipcountry",
    },
  });
}

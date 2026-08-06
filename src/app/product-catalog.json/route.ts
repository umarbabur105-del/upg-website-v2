import { buildProductCatalog } from "@/lib/ai-discovery";
import { discoveryTextResponse } from "@/lib/discovery-response";

export const dynamic = "force-static";

export function GET() {
  return discoveryTextResponse(
    `${JSON.stringify(buildProductCatalog(), null, 2)}\n`,
    "application/json"
  );
}

import { buildRobotsText } from "@/lib/ai-discovery";
import { discoveryTextResponse } from "@/lib/discovery-response";

export const dynamic = "force-static";

export function GET() {
  return discoveryTextResponse(buildRobotsText(), "text/plain");
}

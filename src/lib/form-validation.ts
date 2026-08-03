export class FormRequestError extends Error {
  constructor(
    message: string,
    public readonly status = 400
  ) {
    super(message);
  }
}

export async function parseFormRequest(
  request: Request,
  maxBytes = 25_000
): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new FormRequestError("Content-Type must be application/json", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new FormRequestError("Request is too large", 413);
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    throw new FormRequestError("Request is too large", 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new FormRequestError("Invalid JSON");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new FormRequestError("Invalid request body");
  }

  return parsed as Record<string, unknown>;
}

export function cleanText(
  value: unknown,
  { max = 500, singleLine = false }: { max?: number; singleLine?: boolean } = {}
): string {
  if (typeof value !== "string" && typeof value !== "number") return "";
  const normalized = String(value).trim();
  const cleaned = singleLine ? normalized.replace(/[\r\n\t]+/g, " ") : normalized;
  return cleaned.slice(0, max);
}

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function cleanSubmissionId(value: unknown): string {
  const candidate = cleanText(value, { max: 36, singleLine: true }).toLowerCase();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(candidate)
    ? candidate
    : crypto.randomUUID();
}

export function cleanAttribution(value: unknown) {
  const input = value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

  return {
    landing_page: cleanText(input.landing_page, { max: 300, singleLine: true }) || null,
    referrer: cleanText(input.referrer, { max: 500, singleLine: true }) || null,
    utm_source: cleanText(input.utm_source, { max: 160, singleLine: true }) || null,
    utm_medium: cleanText(input.utm_medium, { max: 160, singleLine: true }) || null,
    utm_campaign: cleanText(input.utm_campaign, { max: 200, singleLine: true }) || null,
    utm_content: cleanText(input.utm_content, { max: 200, singleLine: true }) || null,
    utm_term: cleanText(input.utm_term, { max: 200, singleLine: true }) || null,
  };
}

export function isHoneypotFilled(input: Record<string, unknown>): boolean {
  return cleanText(input.fax_number, { max: 40, singleLine: true }).length > 0;
}

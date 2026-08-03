export type LeadAttribution = {
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

const STORAGE_KEY = "upg_lead_attribution_v1";

function trim(value: string | null, max: number): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, max) : undefined;
}

function safeReferrer(value: string): string | undefined {
  if (!value) return undefined;

  try {
    const referrer = new URL(value);
    return `${referrer.origin}${referrer.pathname}`.slice(0, 500);
  } catch {
    return undefined;
  }
}

function readCurrentAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);

  return {
    landing_page: trim(window.location.pathname, 300),
    referrer: safeReferrer(document.referrer),
    utm_source: trim(params.get("utm_source"), 160),
    utm_medium: trim(params.get("utm_medium"), 160),
    utm_campaign: trim(params.get("utm_campaign"), 200),
    utm_content: trim(params.get("utm_content"), 200),
    utm_term: trim(params.get("utm_term"), 200),
  };
}

export function captureLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing) as LeadAttribution;

    const attribution = readCurrentAttribution();
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return readCurrentAttribution();
  }
}

export function getLeadAttribution(): LeadAttribution {
  return captureLeadAttribution();
}

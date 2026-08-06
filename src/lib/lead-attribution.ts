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

const AI_REFERRERS = [
  { hosts: ["chatgpt.com", "chat.openai.com"], source: "chatgpt" },
  { hosts: ["gemini.google.com"], source: "gemini" },
  { hosts: ["perplexity.ai"], source: "perplexity" },
  { hosts: ["claude.ai"], source: "claude" },
  { hosts: ["copilot.microsoft.com"], source: "microsoft_copilot" },
  { hosts: ["you.com"], source: "you_com" },
] as const;

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

function matchesHost(hostname: string, candidate: string) {
  return hostname === candidate || hostname.endsWith(`.${candidate}`);
}

export function classifyAiReferrer(value: string): string | undefined {
  if (!value) return undefined;

  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return AI_REFERRERS.find(({ hosts }) =>
      hosts.some((candidate) => matchesHost(hostname, candidate))
    )?.source;
  } catch {
    return undefined;
  }
}

function readCurrentAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);
  const explicitSource = trim(params.get("utm_source"), 160);
  const explicitMedium = trim(params.get("utm_medium"), 160);
  const aiSource = explicitSource ? undefined : classifyAiReferrer(document.referrer);

  return {
    landing_page: trim(window.location.pathname, 300),
    referrer: safeReferrer(document.referrer),
    utm_source: explicitSource ?? aiSource,
    utm_medium: explicitMedium ?? (aiSource ? "ai_referral" : undefined),
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

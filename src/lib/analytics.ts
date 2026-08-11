export const ANALYTICS_CONSENT_STORAGE_KEY = "upg_analytics_consent_v1";
export const ANALYTICS_CONSENT_EVENT = "upg:open-analytics-consent";

type AnalyticsEventValue = string | number | boolean | undefined;
type AnalyticsEventItem = Record<string, AnalyticsEventValue>;
type AnalyticsEventParameters = Record<
  string,
  AnalyticsEventValue | AnalyticsEventItem[]
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: AnalyticsEventParameters = {}
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, parameters);
}

export function trackGenerateLead(
  formName: "quote_form" | "contact_form" | "sample_request_form",
  parameters: AnalyticsEventParameters = {}
) {
  trackAnalyticsEvent("generate_lead", {
    lead_source: formName,
    form_name: formName,
    ...parameters,
  });
}

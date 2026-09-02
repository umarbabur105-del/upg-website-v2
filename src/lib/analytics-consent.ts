export const ANALYTICS_CONSENT_REQUIRED_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
]);

export type AnalyticsConsentRegion = {
  resolved: boolean;
  requiresConsent: boolean;
};

export function normalizeAnalyticsCountryCode(value: string | null) {
  const code = value?.trim().toUpperCase() ?? "";
  if (code === "UK") return "GB";
  if (code === "XX" || code === "ZZ") return null;
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

export function getAnalyticsConsentRegion(
  countryCode: string | null
): AnalyticsConsentRegion {
  const normalizedCountry = normalizeAnalyticsCountryCode(countryCode);

  if (!normalizedCountry) {
    return { resolved: false, requiresConsent: true };
  }

  return {
    resolved: true,
    requiresConsent:
      ANALYTICS_CONSENT_REQUIRED_COUNTRIES.has(normalizedCountry),
  };
}

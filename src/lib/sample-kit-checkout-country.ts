import type { SampleKitShippingCountryCode } from "../data/sample-kit";

export const defaultSampleKitShippingCountry = "US" as const;

export function resolveSampleKitShippingCountry(
  value: unknown,
  allowedCountries: readonly SampleKitShippingCountryCode[]
): SampleKitShippingCountryCode | null {
  const country =
    value === undefined
      ? defaultSampleKitShippingCountry
      : typeof value === "string"
        ? value.trim().toUpperCase()
        : "";

  return allowedCountries.find((allowed) => allowed === country) ?? null;
}

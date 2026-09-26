/** Preserve acquisition attribution when a visitor returns from hosted checkout. */
export function buildGoogleAnalyticsConfigScript(measurementId: string) {
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) throw new Error("Invalid GA measurement ID");
  return `
    var upgIgnorePaymentReferrer = false;
    try {
      upgIgnorePaymentReferrer = new URL(document.referrer).hostname === "checkout.stripe.com";
    } catch (error) {
      // Empty or malformed referrers keep Google's normal attribution behavior.
    }
    window.gtag("js", new Date());
    window.gtag("config", ${JSON.stringify(measurementId)}, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...(upgIgnorePaymentReferrer ? { ignore_referrer: true } : {})
    });
  `;
}

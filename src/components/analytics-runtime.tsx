"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_STORAGE_KEY,
  trackAnalyticsEvent,
} from "@/lib/analytics";

type ConsentChoice = "granted" | "denied";

function updateGoogleConsent(choice: ConsentChoice) {
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function AnalyticsRuntime() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let shouldOpen = true;

    try {
      const storedChoice = window.localStorage.getItem(
        ANALYTICS_CONSENT_STORAGE_KEY
      );
      shouldOpen = storedChoice !== "granted" && storedChoice !== "denied";
    } catch {
      shouldOpen = true;
    }

    const hydrationTimer = window.setTimeout(() => setIsOpen(shouldOpen), 0);

    const openPreferences = () => setIsOpen(true);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, openPreferences);

    return () => {
      window.clearTimeout(hydrationTimer);
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, openPreferences);
    };
  }, []);

  useEffect(() => {
    const trackContactClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      let contactMethod: "email" | "phone" | "whatsapp" | undefined;

      if (href.startsWith("mailto:")) contactMethod = "email";
      if (href.startsWith("tel:")) contactMethod = "phone";

      try {
        const targetUrl = new URL(href, window.location.href);
        if (targetUrl.hostname === "wa.me") contactMethod = "whatsapp";
      } catch {
        // Ignore malformed links and let the browser handle them normally.
      }

      if (contactMethod) {
        trackAnalyticsEvent("contact_click", {
          contact_method: contactMethod,
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, []);

  function saveChoice(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, choice);
    } catch {
      // Consent still applies to the current page when storage is unavailable.
    }

    updateGoogleConsent(choice);
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl">
      <div
        role="dialog"
        aria-labelledby="analytics-consent-title"
        aria-describedby="analytics-consent-description"
        className="rounded-2xl border border-border bg-surface/98 p-5 shadow-lift backdrop-blur-md md:flex md:items-center md:gap-6 md:p-6"
      >
        <div className="min-w-0 flex-1">
          <div id="analytics-consent-title" className="font-serif text-xl text-foreground">
            Help us improve the UPG website
          </div>
          <p
            id="analytics-consent-description"
            className="mt-2 text-sm leading-relaxed text-muted-foreground"
          >
            We use Google Analytics to understand visits, traffic sources, and
            successful enquiries. Advertising storage stays disabled. Read our{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="mt-5 flex shrink-0 gap-3 md:mt-0">
          <button
            type="button"
            onClick={() => saveChoice("denied")}
            className="flex-1 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-stone md:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => saveChoice("granted")}
            className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep md:flex-none"
          >
            Allow analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsPreferencesButton({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(ANALYTICS_CONSENT_EVENT))}
      className="hover:text-foreground"
    >
      Cookie choices
    </button>
  );
}

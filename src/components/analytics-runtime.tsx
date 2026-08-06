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
    const openPreferences = () => setIsOpen(true);
    window.addEventListener(ANALYTICS_CONSENT_EVENT, openPreferences);

    return () => {
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
    <div className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl sm:inset-x-4 sm:bottom-4">
      <div
        role="dialog"
        aria-labelledby="analytics-consent-title"
        aria-describedby="analytics-consent-description"
        className="rounded-xl border border-border bg-surface/98 p-4 shadow-card backdrop-blur-md sm:flex sm:items-center sm:gap-5"
      >
        <div className="min-w-0 flex-1">
          <div
            id="analytics-consent-title"
            className="text-sm font-semibold text-foreground"
          >
            Optional website analytics
          </div>
          <p
            id="analytics-consent-description"
            className="mt-1 text-xs leading-relaxed text-muted-foreground"
          >
            Allow analytics to help UPG improve your website experience.{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy
            </Link>
          </p>
        </div>
        <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => saveChoice("denied")}
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-stone sm:flex-none"
          >
            No thanks
          </button>
          <button
            type="button"
            onClick={() => saveChoice("granted")}
            className="flex-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-moss-deep sm:flex-none"
          >
            Allow
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
      Privacy choices
    </button>
  );
}

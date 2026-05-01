"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/data/site";

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;
const HAS_WHATSAPP = Boolean(siteConfig.whatsappNumber);

export function MobileCtaBar() {
  const pathname = usePathname();
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);

  const isDiscoveryPage = useMemo(
    () =>
      pathname === "/" ||
      pathname.startsWith("/products") ||
      pathname.startsWith("/cosmetics") ||
      pathname.startsWith("/industries") ||
      pathname.startsWith("/materials-finishes") ||
      pathname.startsWith("/samples"),
    [pathname]
  );

  useEffect(() => {
    if (!isDiscoveryPage || typeof window === "undefined") {
      return;
    }

    const handleScroll = () => setHasScrolledEnough(window.scrollY > 420);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDiscoveryPage]);

  const isVisible = isDiscoveryPage && hasScrolledEnough;

  if (!isDiscoveryPage) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-x-4 bottom-4 z-40 transition-all duration-300 md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="pointer-events-auto rounded-full border border-border bg-background/96 p-2 shadow-lift backdrop-blur-md">
        <div className="flex gap-2">
          {HAS_WHATSAPP ? (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-border bg-surface px-4 py-3 text-center text-sm font-semibold text-foreground"
            >
              WhatsApp
            </a>
          ) : null}
          <Link
            href={siteConfig.cta.href}
            className={`rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground ${
              HAS_WHATSAPP ? "flex-1" : "w-full"
            }`}
          >
            Start Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-olive-muted/20 bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-semibold tracking-wide text-charcoal">
            {siteConfig.shortName}
          </span>
          <span className="hidden font-serif text-sm font-medium tracking-widest text-olive-muted sm:inline">
            Universal Packaging Group
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-charcoal/70 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.cta.href}
            className="rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
          >
            {siteConfig.cta.label}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-charcoal transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-olive-muted/20 bg-surface px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-charcoal/70 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.cta.href}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-block rounded-sm bg-gold px-6 py-3 text-center text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
            >
              {siteConfig.cta.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/site";

// TODO: Replace with real WhatsApp number before launch (format: country code + number, no + or spaces)
const WHATSAPP_NUMBER = "PLACEHOLDER_ADD_NUMBER_HERE";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.003 0C5.373 0 0 5.373 0 12.003c0 2.109.552 4.09 1.515 5.808L0 24l6.335-1.493A11.95 11.95 0 0012.003 24C18.627 24 24 18.627 24 12.003 24 5.373 18.627 0 12.003 0zm0 21.818a9.816 9.816 0 01-5.007-1.372l-.359-.213-3.721.976.993-3.628-.234-.372A9.785 9.785 0 012.182 12.003C2.182 6.574 6.574 2.182 12.003 2.182c5.424 0 9.818 4.392 9.818 9.821 0 5.424-4.394 9.815-9.818 9.815z" />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-9 z-40 w-full border-b border-olive-muted/20 bg-surface/95 backdrop-blur-md">
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
          {/* WhatsApp contact — desktop shows icon + text */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-sm border border-charcoal/15 px-4 py-2 text-sm font-medium text-charcoal/70 transition-colors hover:border-gold/50 hover:text-gold"
            aria-label="Chat with us on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            <span>Chat with us</span>
          </a>
          <Link
            href={siteConfig.cta.href}
            className="rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-dark"
          >
            {siteConfig.cta.label}
          </Link>
        </nav>

        {/* Mobile: WhatsApp icon only */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-charcoal/15 text-charcoal/60 transition-colors hover:border-gold/50 hover:text-gold md:hidden"
          aria-label="Chat with us on WhatsApp"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
        </a>

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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-base font-medium text-charcoal/70 transition-colors hover:text-gold"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              Chat with us on WhatsApp
            </a>
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

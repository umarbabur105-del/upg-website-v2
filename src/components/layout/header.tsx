"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsappNumber}`;
const HAS_WHATSAPP = Boolean(siteConfig.whatsappNumber);

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-9 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/88 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-serif text-xl tracking-tight text-foreground md:text-2xl">
            Universal
            <span className="text-gold"> Packaging</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {HAS_WHATSAPP ? (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>
          ) : null}
          <Link
            href={siteConfig.cta.href}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
          >
            {siteConfig.cta.label}
          </Link>
        </div>

        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute h-0.5 w-4 bg-foreground transition-transform ${
              mobileOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-4 bg-foreground transition-opacity ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-4 bg-foreground transition-transform ${
              mobileOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-editorial flex flex-col gap-1 py-6">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-border pt-4">
              {HAS_WHATSAPP ? (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 text-sm text-foreground/80"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              ) : null}
              <Link
                href={siteConfig.cta.href}
                onClick={() => setMobileOpen(false)}
                className="mt-3 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                {siteConfig.cta.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

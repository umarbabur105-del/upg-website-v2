"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/layout/wordmark";
import {
  industryNavigationGroups,
  styleNavigation,
} from "@/data/navigation";
import { siteConfig } from "@/data/site";

const HAS_WHATSAPP = Boolean(siteConfig.whatsappUrl);

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

function MenuChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      aria-hidden="true"
      className={`h-2 w-3 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="m1 1.25 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<"style" | "industry" | null>(
    null
  );
  const [mobileSection, setMobileSection] = useState<
    "style" | "industry" | null
  >(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopMenu(null);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        setMobileSection(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeMobileNavigation() {
    setMobileOpen(false);
    setMobileSection(null);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/96 backdrop-blur-md"
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label="UPG Universal Packaging Group home"
          className="group flex items-center"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setDesktopMenu("style")}
            onMouseLeave={() => setDesktopMenu(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setDesktopMenu(null);
              }
            }}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              aria-expanded={desktopMenu === "style"}
              aria-controls="desktop-style-navigation"
              onClick={() => setDesktopMenu("style")}
            >
              By Style
              <MenuChevron open={desktopMenu === "style"} />
            </button>

            {desktopMenu === "style" ? (
              <div
                id="desktop-style-navigation"
                className="absolute top-full left-1/2 w-[44rem] -translate-x-1/2 pt-3"
              >
                <div className="border border-border bg-surface p-6 shadow-lift">
                  <div className="mb-5 flex items-end justify-between gap-6 border-b border-border pb-5">
                    <div>
                      <div className="eyebrow">Five product families</div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Choose the closest structure. Final specifications are reviewed per project.
                      </p>
                    </div>
                    <Link
                      href="/packaging-styles"
                      onClick={() => setDesktopMenu(null)}
                      className="shrink-0 text-sm text-foreground hover:text-primary"
                    >
                      View 12 format guides →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {styleNavigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDesktopMenu(null)}
                        className="group border border-transparent p-4 hover:border-border hover:bg-cream"
                      >
                        <span className="text-sm font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setDesktopMenu("industry")}
            onMouseLeave={() => setDesktopMenu(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setDesktopMenu(null);
              }
            }}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              aria-expanded={desktopMenu === "industry"}
              aria-controls="desktop-industry-navigation"
              onClick={() => setDesktopMenu("industry")}
            >
              By Industry
              <MenuChevron open={desktopMenu === "industry"} />
            </button>

            {desktopMenu === "industry" ? (
              <div
                id="desktop-industry-navigation"
                className="absolute top-full left-1/2 w-[50rem] -translate-x-1/2 pt-3"
              >
                <div className="border border-border bg-surface p-6 shadow-lift">
                  <div className="mb-5 flex items-end justify-between gap-6 border-b border-border pb-5">
                    <div>
                      <div className="eyebrow">Packaging by market</div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Start from your industry, then compare the relevant UPG product families.
                      </p>
                    </div>
                    <Link
                      href="/industries"
                      onClick={() => setDesktopMenu(null)}
                      className="shrink-0 text-sm text-foreground hover:text-primary"
                    >
                      View all industries →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {industryNavigationGroups.map((group) => (
                      <Link
                        key={group.id}
                        href={`/industries#${group.id}`}
                        onClick={() => setDesktopMenu(null)}
                        className="group border border-transparent p-4 hover:border-border hover:bg-cream"
                      >
                        <span className="text-sm font-semibold text-foreground">
                          {group.label}
                        </span>
                        <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
                          {group.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

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
              href={siteConfig.whatsappUrl}
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
          onClick={() => {
            setMobileOpen((open) => !open);
            setMobileSection(null);
          }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
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
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <nav className="container-editorial flex flex-col gap-1 py-6">
            <div className="border-b border-border">
              <button
                type="button"
                onClick={() =>
                  setMobileSection((current) =>
                    current === "style" ? null : "style"
                  )
                }
                className="flex w-full items-center justify-between py-3 text-base text-foreground/80"
                aria-expanded={mobileSection === "style"}
                aria-controls="mobile-style-navigation"
              >
                By Style
                <MenuChevron open={mobileSection === "style"} />
              </button>
              {mobileSection === "style" ? (
                <div id="mobile-style-navigation" className="pb-4">
                  {styleNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileNavigation}
                      className="block border-t border-border/60 py-3 pl-4 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <span className="block font-semibold text-foreground">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/packaging-styles"
                    onClick={closeMobileNavigation}
                    className="mt-2 block py-2 pl-4 text-sm text-foreground"
                  >
                    View 12 format guides →
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="border-b border-border">
              <button
                type="button"
                onClick={() =>
                  setMobileSection((current) =>
                    current === "industry" ? null : "industry"
                  )
                }
                className="flex w-full items-center justify-between py-3 text-base text-foreground/80"
                aria-expanded={mobileSection === "industry"}
                aria-controls="mobile-industry-navigation"
              >
                By Industry
                <MenuChevron open={mobileSection === "industry"} />
              </button>
              {mobileSection === "industry" ? (
                <div id="mobile-industry-navigation" className="pb-4">
                  {industryNavigationGroups.map((group) => (
                    <Link
                      key={group.id}
                      href={`/industries#${group.id}`}
                      onClick={closeMobileNavigation}
                      className="block border-t border-border/60 py-3 pl-4 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <span className="block font-semibold text-foreground">
                        {group.label}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed">
                        {group.description}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/industries"
                    onClick={closeMobileNavigation}
                    className="mt-2 block py-2 pl-4 text-sm text-foreground"
                  >
                    View all industries →
                  </Link>
                </div>
              ) : null}
            </div>

            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNavigation}
                className="py-3 text-base text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-x-6 border-t border-border pt-4">
              {siteConfig.utilityNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileNavigation}
                  className="py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              {HAS_WHATSAPP ? (
                <a
                  href={siteConfig.whatsappUrl}
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
                onClick={closeMobileNavigation}
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

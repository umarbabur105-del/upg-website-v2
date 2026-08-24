import Link from "next/link";
import { AnalyticsPreferencesButton } from "@/components/analytics-runtime";
import { Wordmark } from "@/components/layout/wordmark";
import { industryNavigationGroups } from "@/data/navigation";
import { siteConfig } from "@/data/site";

const HAS_WHATSAPP = Boolean(siteConfig.whatsappUrl);
const ANALYTICS_ENABLED = /^G-[A-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? ""
);

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              aria-label="UPG Universal Packaging Group home"
              className="inline-flex"
            >
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phoneNumber}`} className="hover:text-foreground">
                {siteConfig.phoneDisplay}
              </a>
              {HAS_WHATSAPP ? (
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Chat on WhatsApp
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4">Products &amp; guides</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {siteConfig.footerColumns.productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">By industry</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {industryNavigationGroups.map((group) => (
                <li key={group.id}>
                  <Link
                    href={`/industries#${group.id}`}
                    className="hover:text-foreground"
                  >
                    {group.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Company</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {siteConfig.utilityNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={siteConfig.cta.href}
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-moss-deep"
            >
              {siteConfig.cta.label}
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-1.5">
            <p>&copy; {new Date().getFullYear()} Universal Packaging Group. All rights reserved.</p>
            <p>
              Legal entities: {siteConfig.legalEntities.uk} and{" "}
              {siteConfig.legalEntities.us}. Sample-kit payments are processed by{" "}
              {siteConfig.legalEntities.sampleKitSeller}.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/faq" className="hover:text-foreground">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/shipping-returns" className="hover:text-foreground">
              Shipping & Returns
            </Link>
            <AnalyticsPreferencesButton enabled={ANALYTICS_ENABLED} />
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

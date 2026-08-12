import Link from "next/link";
import { siteConfig } from "@/data/site";

interface QuoteCtaProps {
  title?: string;
  intro?: string;
  variant?: "moss" | "cream";
  href?: string;
}

export function QuoteCta({
  title = "Tell us about your packaging project.",
  intro = "Share the product, quantity, and destination. We will help define the structure, specification, pricing, and manufacturing plan.",
  variant = "moss",
  href = siteConfig.cta.href,
}: QuoteCtaProps) {
  const hasWhatsApp = Boolean(siteConfig.whatsappUrl);
  const sectionClass =
    variant === "moss"
      ? "bg-gradient-moss text-primary-foreground"
      : "bg-cream text-foreground";

  const introClass =
    variant === "moss" ? "text-primary-foreground/72" : "text-muted-foreground";

  return (
    <section className={sectionClass}>
      <div className="container-editorial py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="eyebrow mb-5 text-gold-soft">Start Your Project</div>
          <h2 className="display-2 text-balance">{title}</h2>
          <p className={`mt-5 text-lg leading-relaxed ${introClass}`}>{intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={href}
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90"
            >
              {siteConfig.cta.label}
            </Link>
            {hasWhatsApp ? (
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full border px-6 py-3 text-sm font-semibold ${
                  variant === "moss"
                    ? "border-primary-foreground/16 text-primary-foreground hover:bg-white/6"
                    : "border-border text-foreground hover:bg-stone"
                }`}
              >
                WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

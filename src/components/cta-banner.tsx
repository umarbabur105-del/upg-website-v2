import Link from "next/link";

interface CtaBannerProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CtaBanner({
  heading = "Ready to start your packaging project?",
  description = "Get a quote tailored to your product, quantity, and delivery needs.",
  ctaText = "Get a Quote",
  ctaHref = "/get-a-quote",
}: CtaBannerProps) {
  return (
    <section className="bg-gradient-moss">
      <div className="container-editorial py-20 text-center md:py-28">
        <h2 className="display-2 text-balance text-primary-foreground">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/72">
          {description}
        </p>
        <Link
          href={ctaHref}
          className="mt-8 inline-block rounded-full bg-gold px-10 py-4 text-sm font-semibold text-foreground hover:opacity-90"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}

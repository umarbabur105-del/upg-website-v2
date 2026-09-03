import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import type {
  OrganicIntentOption,
  OrganicIntentRoute,
} from "@/data/organic-intent-routes";
import { SITE_URL } from "@/lib/seo";

const statusClassNames: Record<OrganicIntentOption["status"], string> = {
  Available: "bg-moss/10 text-moss-deep",
  "Related route": "bg-gold/15 text-gold-dark",
  "Outside current offer": "bg-stone text-muted-foreground",
};

function resolveOptionUrl(route: OrganicIntentRoute, href?: string) {
  if (!href) return undefined;
  if (href.startsWith("#")) return `${SITE_URL}${route.path}${href}`;
  if (href.startsWith("/")) return `${SITE_URL}${href}`;
  return href;
}

export function OrganicIntentBridge({
  route,
  compact = false,
}: {
  route: OrganicIntentRoute;
  compact?: boolean;
}) {
  const gridClassName =
    route.options.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${route.path}#buyer-intent-routes`,
    name: route.title,
    description: route.intro,
    numberOfItems: route.options.length,
    itemListElement: route.options.map((option, index) => {
      const url = resolveOptionUrl(route, option.href);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: option.title,
        description: `${option.status}. ${option.description}`,
        ...(url ? { url } : {}),
      };
    }),
  };

  if (compact) {
    return (
      <section
        id="buyer-intent-routes"
        className="scroll-mt-24 border-y border-border bg-cream py-7"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="container-editorial">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-2 text-left marker:content-none">
              <div>
                <div className="eyebrow mb-2">Need help choosing?</div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {route.title}
                </h2>
              </div>
              <span className="text-2xl text-gold-dark transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {route.intro}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {route.options.map((option) => (
                <article key={option.title} className="border-t border-border pt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow">{option.label}</span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClassNames[option.status]}`}
                    >
                      {option.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                  {option.href && option.linkLabel ? (
                    <Link
                      href={option.href}
                      className="mt-3 inline-flex border-b border-foreground/20 pb-0.5 text-sm text-foreground"
                    >
                      {option.linkLabel} →
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </details>
        </div>
      </section>
    );
  }

  return (
    <section
      id="buyer-intent-routes"
      className="section-shell scroll-mt-28 border-y border-border bg-cream"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container-editorial">
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow={route.eyebrow}
            title={route.title}
            intro={route.intro}
          />
        </div>
        <div
          className={
            route.visual
              ? "mt-10 grid gap-5 lg:grid-cols-12 lg:items-stretch"
              : `mt-10 grid gap-5 md:grid-cols-2 ${gridClassName}`
          }
        >
          {route.visual ? (
            <figure
              data-seo-visual="search-intent"
              className="surface-card relative min-h-96 overflow-hidden lg:col-span-5 lg:min-h-[36rem]"
            >
              <Image
                src={route.visual.src}
                alt={route.visual.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 pt-20 pb-6">
                <figcaption className="max-w-md text-sm leading-relaxed text-white/90">
                  {route.visual.caption}
                </figcaption>
              </div>
            </figure>
          ) : null}
          <div
            className={
              route.visual
                ? "grid gap-5 md:grid-cols-2 lg:col-span-7"
                : "contents"
            }
          >
            {route.options.map((option) => (
              <article
                key={option.title}
                className="surface-card flex min-h-64 flex-col p-6"
              >
                <div className="eyebrow">{option.label}</div>
                <div className="mt-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${statusClassNames[option.status]}`}
                  >
                    {option.status}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-2xl text-foreground">
                  {option.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {option.description}
                </p>
                {option.href && option.linkLabel ? (
                  <Link
                    href={option.href}
                    className="mt-auto pt-6 text-sm text-foreground"
                  >
                    <span className="border-b border-foreground/20 pb-0.5">
                      {option.linkLabel} →
                    </span>
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

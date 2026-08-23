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

export function OrganicIntentBridge({ route }: { route: OrganicIntentRoute }) {
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
        <div className={`mt-10 grid gap-5 md:grid-cols-2 ${gridClassName}`}>
          {route.options.map((option) => (
            <article
              key={option.title}
              className="surface-card flex min-h-72 flex-col p-6"
            >
              <div className="eyebrow">{option.label}</div>
              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${statusClassNames[option.status]}`}
                >
                  {option.status}
                </span>
              </div>
              <h2 className="mt-5 font-serif text-2xl text-foreground">
                {option.title}
              </h2>
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
    </section>
  );
}

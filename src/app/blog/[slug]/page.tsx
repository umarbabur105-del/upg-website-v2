import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/data/blog-posts";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    keywords: post.keywords,
  });
}

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Render the trusted markdown subset stored in the local guide data. */
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="mt-12 mb-5 font-serif text-3xl font-semibold leading-tight text-charcoal"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [headerRow, , ...bodyRows] = tableLines;
      const headers = headerRow
        .split("|")
        .filter((cell) => cell.trim() !== "")
        .map((cell) => cell.trim());

      elements.push(
        <div key={key++} className="my-7 overflow-x-auto border border-charcoal/10 bg-cream">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-olive text-offwhite">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest"
                  >
                    <span dangerouslySetInnerHTML={{ __html: parseBold(header) }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => {
                const cells = row
                  .split("|")
                  .filter((cell) => cell.trim() !== "")
                  .map((cell) => cell.trim());
                return (
                  <tr key={rowIndex} className="border-t border-charcoal/10 align-top">
                    {cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-5 py-4 leading-relaxed text-charcoal/72"
                      >
                        <span dangerouslySetInnerHTML={{ __html: parseBold(cell) }} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 border border-charcoal/10 bg-cream p-4 text-sm leading-relaxed text-charcoal/72"
            >
              <span className="mt-0.5 text-gold" aria-hidden="true">✓</span>
              <span dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    elements.push(
      <p
        key={key++}
        className="my-5 text-base leading-8 text-charcoal/72"
        dangerouslySetInnerHTML={{ __html: parseBold(line) }}
      />
    );
    i++;
  }

  return elements;
}

function parseBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(post);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const postImage = `${SITE_URL}${post.heroImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [postImage],
        datePublished: post.date,
        dateModified: post.updatedAt ?? post.date,
        inLanguage: "en-US",
        mainEntityOfPage: { "@id": postUrl },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: post.keywords,
        citation: post.sources?.map((source) => source.href),
      },
      {
        "@type": "FAQPage",
        "@id": `${postUrl}#faq`,
        mainEntity: post.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Packaging Guides",
            item: `${SITE_URL}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <header className="overflow-hidden bg-olive px-6 pt-28 pb-14 lg:px-8 lg:pt-32 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-widest text-offwhite/90">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-offwhite">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blog" className="hover:text-offwhite">Packaging Guides</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-offwhite/90" aria-current="page">{post.category}</li>
              </ol>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-widest text-offwhite/90">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-offwhite md:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-offwhite/72">
                  {post.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-offwhite/90">
                  <span>Prepared by Universal Packaging Group</span>
                  <span>Reviewed {formatDate(post.updatedAt ?? post.date)}</span>
                </div>
              </div>
              <div className="relative aspect-[5/4] overflow-hidden lg:col-span-6">
                <Image
                  src={post.heroImage}
                  alt={post.heroAlt}
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: post.heroPosition }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                <p className="absolute right-4 bottom-4 left-4 text-xs leading-relaxed text-offwhite/82">
                  Representative packaging concept or capability reference, not completed customer work.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="border-b border-charcoal/8 bg-cream px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
              Direct answer
            </div>
            <p className="mt-4 font-serif text-2xl leading-relaxed text-charcoal md:text-3xl">
              {post.quickAnswer}
            </p>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {post.keyDecisions.map((decision) => (
                <div key={decision.title} className="border border-charcoal/10 bg-surface p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                    {decision.label}
                  </div>
                  <h2 className="mt-3 font-serif text-xl font-semibold text-charcoal">
                    {decision.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                    {decision.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="prose-custom">{renderContent(post.content)}</div>

            <section className="mt-14 border-t border-charcoal/10 pt-10" aria-labelledby="guide-faq-heading">
              <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Buyer questions
              </div>
              <h2 id="guide-faq-heading" className="mt-3 font-serif text-3xl font-semibold text-charcoal">
                Frequently asked questions
              </h2>
              <div className="mt-6">
                <FaqAccordion items={post.faqs} />
              </div>
            </section>

            {post.sources?.length ? (
              <section className="mt-14 border-t border-charcoal/10 pt-10" aria-labelledby="guide-sources-heading">
                <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  Primary references
                </div>
                <h2 id="guide-sources-heading" className="mt-3 font-serif text-3xl font-semibold text-charcoal">
                  Sources used for this guide
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {post.sources.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-charcoal/10 bg-cream p-5 hover:border-gold/55"
                    >
                      <h3 className="font-serif text-lg font-semibold text-charcoal">
                        {source.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
                        {source.note}
                      </p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-gold-dark">
                        Open primary source ↗
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-14 border-t border-charcoal/10 pt-10" aria-labelledby="next-source-heading">
              <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Next useful source
              </div>
              <h2 id="next-source-heading" className="mt-3 font-serif text-3xl font-semibold text-charcoal">
                Continue with the matching planning path
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {post.resources.map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="border border-charcoal/10 bg-cream p-5 hover:border-gold/55"
                  >
                    <h3 className="font-serif text-lg font-semibold text-charcoal">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
                      {resource.description}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-gold-dark">
                      Open source →
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-14 border-t border-charcoal/10 pt-10" aria-labelledby="related-guides-heading">
              <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Keep exploring
              </div>
              <h2 id="related-guides-heading" className="mt-3 font-serif text-3xl font-semibold text-charcoal">
                Related packaging guides
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group overflow-hidden border border-charcoal/10 bg-cream hover:border-gold/55"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedPost.heroImage}
                        alt={relatedPost.heroAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                        style={{ objectPosition: relatedPost.heroPosition }}
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                        {relatedPost.category}
                      </div>
                      <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-charcoal">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="mt-14 border-t border-charcoal/10 pt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark">
                <span aria-hidden="true">←</span> Back to all packaging guides
              </Link>
            </div>
          </div>
        </section>
      </article>

      <section className="bg-olive px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-offwhite/90">
            Human-reviewed custom production
          </div>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-offwhite md:text-4xl">
            Turn the guide into a real project brief.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-offwhite/70">
            Send the product, dimensions, quantity, intended use, destination,
            artwork status, and the decisions that are still open.
          </p>
          <Link
            href={`/get-a-quote?builder_note=${encodeURIComponent(`I reviewed the ${post.title} guide.`)}`}
            className="mt-8 inline-flex rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal hover:bg-gold-dark"
          >
            Start Your Project →
          </Link>
        </div>
      </section>
    </>
  );
}

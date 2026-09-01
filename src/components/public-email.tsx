import { siteConfig } from "@/data/site";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function PublicEmail({
  className = "",
  link = true,
  suffix = "",
}: {
  className?: string;
  link?: boolean;
  suffix?: string;
}) {
  const email = escapeHtml(siteConfig.email);
  const label = `${email}${escapeHtml(suffix)}`;
  const classAttribute = className
    ? ` class="${escapeHtml(className)}"`
    : "";
  const content = link
    ? `<a href="mailto:${email}"${classAttribute}>${label}</a>`
    : label;

  return (
    <span
      className={link ? undefined : className}
      dangerouslySetInnerHTML={{
        __html: `<!--email_off-->${content}<!--/email_off-->`,
      }}
    />
  );
}

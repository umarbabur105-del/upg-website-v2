import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads CRM",
  robots: { index: false, follow: false, nocache: true },
};

function getGoogleSheetUrl() {
  const value = process.env.UPG_CRM_SHEET_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "docs.google.com"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export default function CrmPage() {
  const sheetUrl = getGoogleSheetUrl();
  if (sheetUrl) redirect(sheetUrl);

  return (
    <section className="min-h-[70vh] bg-gradient-warm px-6 py-24">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="eyebrow">Private workspace</div>
        <h1 className="mt-4 font-serif text-4xl text-foreground">UPG Leads CRM</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          The Google Sheet CRM link is not configured in this environment yet.
        </p>
      </div>
    </section>
  );
}

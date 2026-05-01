type EmailPayload = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

type MailerResult = {
  delivered: boolean;
  via: "resend" | "log";
  error?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function sendNotification(payload: EmailPayload): Promise<MailerResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "UPG Forms <noreply@eulogyhearth.com>";
  const to = process.env.UPG_NOTIFY_TO ?? "umarbabur105@gmail.com";

  if (!apiKey) {
    console.log(
      JSON.stringify({
        type: "mailer_fallback_log",
        reason: "RESEND_API_KEY not set",
        subject: payload.subject,
        to,
        replyTo: payload.replyTo ?? null,
        textPreview: payload.text.slice(0, 400),
      })
    );
    return { delivered: false, via: "log", error: "RESEND_API_KEY not set" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: payload.replyTo,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(
        JSON.stringify({
          type: "mailer_resend_error",
          status: response.status,
          body: body.slice(0, 500),
          subject: payload.subject,
        })
      );
      return { delivered: false, via: "resend", error: `Resend ${response.status}` };
    }

    return { delivered: true, via: "resend" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    console.error(
      JSON.stringify({
        type: "mailer_resend_exception",
        message,
        subject: payload.subject,
      })
    );
    return { delivered: false, via: "resend", error: message };
  }
}

export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderFieldRows(
  fields: Array<{ label: string; value: unknown }>
): { html: string; text: string } {
  const visible = fields.filter(({ value }) => {
    if (value === null || value === undefined) return false;
    return String(value).trim() !== "";
  });

  const html = visible
    .map(
      ({ label, value }) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px;color:#666;width:200px;">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:14px;color:#111;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  const text = visible
    .map(({ label, value }) => `${label}: ${String(value)}`)
    .join("\n");

  return { html, text };
}

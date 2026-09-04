type EmailPayload = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  idempotencyKey?: string;
};

type MailerResult = {
  delivered: boolean;
  via: "resend" | "log";
  error?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_REQUEST_TIMEOUT_MS = 8_000;

export async function sendNotification(payload: EmailPayload): Promise<MailerResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "UPG Forms <quotes@universalpackaginggroup.com>";
  const to = process.env.UPG_NOTIFY_TO ?? "umar@universalpackaginggroup.com";

  if (!apiKey) {
    console.log(
      JSON.stringify({
        type: "mailer_fallback_log",
        reason: "RESEND_API_KEY not set",
        notificationConfigured: Boolean(to),
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
        ...(payload.idempotencyKey
          ? { "Idempotency-Key": payload.idempotencyKey }
          : {}),
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: payload.replyTo,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
      signal: AbortSignal.timeout(EMAIL_REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(
        JSON.stringify({
          type: "mailer_resend_error",
          status: response.status,
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
      })
    );
    return { delivered: false, via: "resend", error: message };
  }
}

export async function sendLeadStorageAlert({
  submissionId,
  formName,
  reason,
}: {
  submissionId: string;
  formName: string;
  reason?: string;
}) {
  const safeFormName = escapeHtml(formName);
  const safeSubmissionId = escapeHtml(submissionId);
  const safeReason = escapeHtml(reason || "unknown");

  return sendNotification({
    subject: `[UPG CRM ALERT] ${formName} was emailed but not recorded — ${submissionId.slice(0, 8)}`,
    html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;">
  <h2 style="font-size:18px;color:#b42318;margin:0 0 8px;">UPG lead needs CRM reconciliation</h2>
  <p style="font-size:14px;color:#333;margin:0 0 12px;">A ${safeFormName} notification was delivered, but Google Sheets did not confirm the CRM record.</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">
    <tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;">Submission ID</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${safeSubmissionId}</td></tr>
    <tr><td style="padding:6px 12px;color:#666;">Storage reason</td><td style="padding:6px 12px;">${safeReason}</td></tr>
  </table>
  <p style="font-size:13px;color:#666;margin:12px 0 0;">Find the original UPG notification using this submission ID and add or reconcile the CRM row.</p>
</div>`,
    text: `UPG lead needs CRM reconciliation\n\nForm: ${formName}\nSubmission ID: ${submissionId}\nStorage reason: ${reason || "unknown"}\n\nFind the original UPG notification using this submission ID and add or reconcile the CRM row.\n`,
    idempotencyKey: `lead-storage-alert/${submissionId}`,
  });
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

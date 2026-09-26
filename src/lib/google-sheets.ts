import "server-only";
import { createHash } from "node:crypto";

const GOOGLE_STS_ENDPOINT = "https://sts.googleapis.com/v1/token";
const GOOGLE_IAM_CREDENTIALS_ENDPOINT = "https://iamcredentials.googleapis.com/v1";
const GOOGLE_CLOUD_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const REQUEST_TIMEOUT_MS = 6_000;
const AUTH_MAX_ATTEMPTS = 2;
const LOOKUP_MAX_ATTEMPTS = 2;
const APPEND_MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 250;

export type LeadSheetInput = {
  submissionId: string;
  receivedAt: Date;
  source:
    | "Project Enquiry"
    | "Contact Form"
    | "Sample Request"
    | "Box Sample Kit Order"
    | "Mylar Bag Sample Kit Order"
    | "Stripe Test Order";
  status?: "New" | "Spam";
  priority?: "Normal" | "Low";
  owner?: "Umar" | "System Test";
  notificationStatus: "Sent" | "Failed";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  productFamily?: string;
  productStyle?: string;
  quantity?: string;
  intendedEndUse?: string;
  shippingCountry?: string;
  shippingStateOrProvince?: string;
  targetDelivery?: string;
  artworkStatus?: string;
  dimensions?: string;
  materialPreference?: string;
  finishPreference?: string;
  message?: string;
  landingPage?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
};

export type GoogleSheetsAuthResult =
  | { configured: true; accessToken: string }
  | {
      configured: false;
      reason: "not_configured" | "invalid_configuration" | "oidc_unavailable" | "auth_error";
    };

export type AppendLeadResult = {
  stored: boolean;
  rowNumber?: number;
  deduplicated?: boolean;
  attempts?: number;
  reason?:
    | "not_configured"
    | "invalid_configuration"
    | "oidc_unavailable"
    | "auth_error"
    | "sheets_error";
};

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

function isTransientStatus(status: number) {
  return status === 408
    || status === 409
    || status === 425
    || status === 429
    || status >= 500;
}

function waitBeforeRetry(attempt: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, RETRY_DELAY_MS * attempt);
  });
}

function getSpreadsheetId() {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  return id && /^[A-Za-z0-9_-]+$/.test(id) ? id : null;
}

function getWorkloadIdentityConfiguration() {
  const audience = process.env.GOOGLE_WIF_AUDIENCE?.trim();
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();

  if (!audience || !serviceAccountEmail) return null;

  const validAudience = /^\/\/iam\.googleapis\.com\/projects\/\d+\/locations\/global\/workloadIdentityPools\/[a-z0-9-]+\/providers\/[a-z0-9-]+$/.test(audience);
  const validEmail = /^[a-z0-9-]+@[a-z0-9-]+\.iam\.gserviceaccount\.com$/.test(serviceAccountEmail);

  return validAudience && validEmail ? { audience, serviceAccountEmail } : null;
}

function getVercelOidcToken(request?: Request) {
  return request?.headers.get("x-vercel-oidc-token")?.trim()
    || process.env.VERCEL_OIDC_TOKEN?.trim()
    || null;
}

async function exchangeVercelOidcToken(oidcToken: string, audience: string) {
  for (let attempt = 1; attempt <= AUTH_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(GOOGLE_STS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          audience,
          grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
          requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
          scope: GOOGLE_CLOUD_SCOPE,
          subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
          subject_token: oidcToken,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (response.ok) {
        const result = await response.json() as { access_token?: string };
        return result.access_token ?? null;
      }

      console.error(JSON.stringify({
        type: "sheets_sts_failed",
        status: response.status,
        attempt,
      }));
      if (!isTransientStatus(response.status) || attempt === AUTH_MAX_ATTEMPTS) {
        return null;
      }
    } catch {
      console.error(JSON.stringify({ type: "sheets_sts_exception", attempt }));
      if (attempt === AUTH_MAX_ATTEMPTS) return null;
    }

    await waitBeforeRetry(attempt);
  }

  return null;
}

async function impersonateServiceAccount(federatedToken: string, serviceAccountEmail: string) {
  const encodedEmail = encodeURIComponent(serviceAccountEmail);
  const endpoint = `${GOOGLE_IAM_CREDENTIALS_ENDPOINT}/projects/-/serviceAccounts/${encodedEmail}:generateAccessToken`;
  for (let attempt = 1; attempt <= AUTH_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${federatedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scope: [GOOGLE_SHEETS_SCOPE],
          lifetime: "3600s",
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (response.ok) {
        const result = await response.json() as { accessToken?: string; expireTime?: string };
        if (!result.accessToken) return null;

        const parsedExpiry = result.expireTime ? Date.parse(result.expireTime) : Number.NaN;
        return {
          token: result.accessToken,
          expiresAt: Number.isFinite(parsedExpiry) ? parsedExpiry : Date.now() + 3_600_000,
        };
      }

      console.error(JSON.stringify({
        type: "sheets_impersonation_failed",
        status: response.status,
        attempt,
      }));
      if (!isTransientStatus(response.status) || attempt === AUTH_MAX_ATTEMPTS) {
        return null;
      }
    } catch {
      console.error(JSON.stringify({ type: "sheets_impersonation_exception", attempt }));
      if (attempt === AUTH_MAX_ATTEMPTS) return null;
    }

    await waitBeforeRetry(attempt);
  }

  return null;
}

export async function prepareGoogleSheetsAuth(request?: Request): Promise<GoogleSheetsAuthResult> {
  if (!getSpreadsheetId()) {
    return { configured: false, reason: "not_configured" };
  }

  const configuration = getWorkloadIdentityConfiguration();
  if (!configuration) {
    const hasPartialConfiguration = Boolean(
      process.env.GOOGLE_WIF_AUDIENCE || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    );
    return {
      configured: false,
      reason: hasPartialConfiguration ? "invalid_configuration" : "not_configured",
    };
  }

  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return { configured: true, accessToken: cachedAccessToken.token };
  }

  const oidcToken = getVercelOidcToken(request);
  if (!oidcToken) return { configured: false, reason: "oidc_unavailable" };

  try {
    const federatedToken = await exchangeVercelOidcToken(oidcToken, configuration.audience);
    if (!federatedToken) {
      return { configured: false, reason: "auth_error" };
    }

    const impersonated = await impersonateServiceAccount(
      federatedToken,
      configuration.serviceAccountEmail
    );
    if (!impersonated) return { configured: false, reason: "auth_error" };

    cachedAccessToken = impersonated;

    return { configured: true, accessToken: impersonated.token };
  } catch {
    console.error(JSON.stringify({ type: "sheets_auth_exception" }));
    return { configured: false, reason: "auth_error" };
  }
}

function toGoogleSheetsSerial(date: Date) {
  return date.getTime() / 86_400_000 + 25_569;
}

function buildLeadRow(input: LeadSheetInput) {
  const timestamp = toGoogleSheetsSerial(input.receivedAt);

  // The CRM uses America/Los_Angeles. Store a real date, not a free-text task.
  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(input.receivedAt);
  const followUp = new Date(`${localDate}T00:00:00.000Z`);
  do {
    followUp.setUTCDate(followUp.getUTCDate() + 1);
  } while (followUp.getUTCDay() === 0 || followUp.getUTCDay() === 6);
  const isTest = input.status === "Spam" || input.source === "Stripe Test Order"
    || input.owner === "System Test";

  return [
    input.submissionId,
    timestamp,
    input.source,
    input.status ?? "New",
    input.priority ?? "Normal",
    input.owner ?? "Umar",
    isTest ? "" : toGoogleSheetsSerial(followUp),
    input.name,
    input.email,
    input.phone ?? "",
    input.company ?? "",
    input.website ?? "",
    input.productFamily ?? "",
    input.productStyle ?? "",
    input.quantity ?? "",
    input.intendedEndUse ?? "",
    input.shippingCountry ?? "",
    input.shippingStateOrProvince ?? "",
    input.targetDelivery ?? "",
    input.artworkStatus ?? "",
    input.dimensions ?? "",
    input.materialPreference ?? "",
    input.finishPreference ?? "",
    input.message ?? "",
    input.landingPage ?? "",
    input.referrer ?? "",
    input.utmSource ?? "",
    input.utmMedium ?? "",
    input.utmCampaign ?? "",
    input.utmContent ?? "",
    input.utmTerm ?? "",
    input.notificationStatus,
    "",
    timestamp,
  ];
}

type SubmissionLookupResult =
  | { checked: true; rowNumber?: number }
  | { checked: false; reason: "auth_error" | "sheets_error" };

async function findSubmissionRow(
  spreadsheetId: string,
  accessToken: string,
  submissionId: string
): Promise<SubmissionLookupResult> {
  const range = encodeURIComponent("'Leads'!A:A");
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`;

  for (let attempt = 1; attempt <= LOOKUP_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (response.ok) {
        const result = await response.json() as { values?: unknown[][] };
        const rowIndex = (result.values ?? []).findIndex(
          (row) => String(row[0] ?? "") === submissionId
        );
        return {
          checked: true,
          rowNumber: rowIndex >= 0 ? rowIndex + 1 : undefined,
        };
      }

      console.error(JSON.stringify({
        type: "sheets_submission_lookup_failed",
        status: response.status,
        attempt,
      }));
      if (response.status === 401 || response.status === 403) {
        return { checked: false, reason: "auth_error" };
      }
      if (!isTransientStatus(response.status) || attempt === LOOKUP_MAX_ATTEMPTS) {
        return { checked: false, reason: "sheets_error" };
      }
    } catch {
      console.error(JSON.stringify({ type: "sheets_submission_lookup_exception", attempt }));
      if (attempt === LOOKUP_MAX_ATTEMPTS) {
        return { checked: false, reason: "sheets_error" };
      }
    }

    await waitBeforeRetry(attempt);
  }

  return { checked: false, reason: "sheets_error" };
}

async function resolveLeadsSheetId(
  spreadsheetId: string,
  accessToken: string
): Promise<{ checked: true; sheetId: number } | { checked: false; reason: "auth_error" | "sheets_error" }> {
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties(sheetId,title)`;
  for (let attempt = 1; attempt <= LOOKUP_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (response.ok) {
        const result = await response.json() as {
          sheets?: { properties?: { sheetId?: number; title?: string } }[];
        };
        const matches = result.sheets?.filter((sheet) => sheet.properties?.title === "Leads") ?? [];
        const id = matches[0]?.properties?.sheetId;
        return matches.length === 1 && typeof id === "number" && Number.isInteger(id) && id >= 0
          ? { checked: true, sheetId: id } : { checked: false, reason: "sheets_error" };
      }
      if (response.status === 401 || response.status === 403) {
        return { checked: false, reason: "auth_error" };
      }
      if (!isTransientStatus(response.status)) break;
    } catch {
      console.error(JSON.stringify({ type: "sheets_metadata_exception", attempt }));
    }
    if (attempt < LOOKUP_MAX_ATTEMPTS) await waitBeforeRetry(attempt);
  }
  return { checked: false, reason: "sheets_error" };
}

export async function appendLeadToGoogleSheet(
  input: LeadSheetInput,
  auth: GoogleSheetsAuthResult
): Promise<AppendLeadResult> {
  const spreadsheetId = getSpreadsheetId();
  if (!spreadsheetId) return { stored: false, reason: "not_configured" };
  if (!auth.configured) return { stored: false, reason: auth.reason };

  const existing = await findSubmissionRow(
    spreadsheetId,
    auth.accessToken,
    input.submissionId
  );
  if (!existing.checked) {
    return { stored: false, reason: existing.reason };
  }
  if (existing.rowNumber) {
    return {
      stored: true,
      rowNumber: existing.rowNumber,
      deduplicated: true,
      attempts: 0,
    };
  }

  const sheet = await resolveLeadsSheetId(spreadsheetId, auth.accessToken);
  if (!sheet.checked) return { stored: false, reason: sheet.reason };

  // Google rejects an existing namedRangeId and applies the entire batch atomically.
  // A permanent marker protects across serverless instances and ambiguous retries.
  // Never delete markers or fall back to values.append after a batch failure.
  const marker = `upg_lead_v1_${createHash("sha256").update(input.submissionId).digest("hex")}`;
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
  const body = JSON.stringify({
    requests: [
      { addNamedRange: { namedRange: {
        namedRangeId: marker, name: marker,
        range: { sheetId: sheet.sheetId, startRowIndex: 0, endRowIndex: 1,
          startColumnIndex: 0, endColumnIndex: 1 },
      } } },
      { appendCells: {
        sheetId: sheet.sheetId,
        rows: [{ values: buildLeadRow(input).map((value, index) => ({
          userEnteredValue: typeof value === "number"
            ? { numberValue: value } : { stringValue: value },
          ...([1, 6, 33].includes(index) ? { userEnteredFormat: { numberFormat: {
            type: index === 6 ? "DATE" : "DATE_TIME",
            pattern: index === 6 ? "mmm d, yyyy" : "yyyy-mm-dd hh:mm",
          } } } : {}),
        })) }],
        fields: "userEnteredValue,userEnteredFormat.numberFormat",
      } },
    ],
  });

  for (let attempt = 1; attempt <= APPEND_MAX_ATTEMPTS; attempt += 1) {
    let failureStatus: number | undefined;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (response.ok) {
        // AppendCells has no row-location reply. HTTP success proves the commit;
        // don't turn a missing diagnostic row number into another write.
        return {
          stored: true,
          attempts: attempt,
        };
      }

      console.error(JSON.stringify({
        type: "sheets_append_failed",
        status: response.status,
        attempt,
      }));
      failureStatus = response.status;
    } catch {
      console.error(JSON.stringify({ type: "sheets_append_exception", attempt }));
    }

    const recoveryLookup = await findSubmissionRow(
      spreadsheetId,
      auth.accessToken,
      input.submissionId
    );
    if (!recoveryLookup.checked) {
      return { stored: false, reason: recoveryLookup.reason, attempts: attempt };
    }
    if (recoveryLookup.rowNumber) {
      return {
        stored: true,
        rowNumber: recoveryLookup.rowNumber,
        deduplicated: true,
        attempts: attempt,
      };
    }

    if (failureStatus === 401 || failureStatus === 403) {
      return { stored: false, reason: "auth_error", attempts: attempt };
    }
    // A duplicate-marker 400 is success only if the exact lead row was recovered.
    if ((failureStatus !== undefined && !isTransientStatus(failureStatus))
      || attempt === APPEND_MAX_ATTEMPTS) {
      return { stored: false, reason: "sheets_error", attempts: attempt };
    }

    await waitBeforeRetry(attempt);
  }

  return { stored: false, reason: "sheets_error", attempts: APPEND_MAX_ATTEMPTS };
}

export async function storeLeadInGoogleSheet(
  input: LeadSheetInput,
  request?: Request,
  initialAuth?: GoogleSheetsAuthResult
): Promise<AppendLeadResult> {
  for (let attempt = 1; attempt <= AUTH_MAX_ATTEMPTS; attempt += 1) {
    const auth = attempt === 1 && initialAuth
      ? initialAuth
      : await prepareGoogleSheetsAuth(request);
    const saved = await appendLeadToGoogleSheet(input, auth);

    if (saved.reason !== "auth_error" || attempt === AUTH_MAX_ATTEMPTS) {
      return saved;
    }

    cachedAccessToken = null;
    await waitBeforeRetry(attempt);
  }

  return { stored: false, reason: "auth_error" };
}

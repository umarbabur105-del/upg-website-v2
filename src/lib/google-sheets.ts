import "server-only";

const GOOGLE_STS_ENDPOINT = "https://sts.googleapis.com/v1/token";
const GOOGLE_IAM_CREDENTIALS_ENDPOINT = "https://iamcredentials.googleapis.com/v1";
const GOOGLE_CLOUD_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const REQUEST_TIMEOUT_MS = 6_000;

export type LeadSheetInput = {
  submissionId: string;
  receivedAt: Date;
  source:
    | "Project Enquiry"
    | "Contact Form"
    | "Sample Request"
    | "Box Sample Kit Order"
    | "Mylar Bag Sample Kit Order";
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
  reason?:
    | "not_configured"
    | "invalid_configuration"
    | "oidc_unavailable"
    | "auth_error"
    | "sheets_error";
};

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

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

  if (!response.ok) {
    console.error(JSON.stringify({ type: "sheets_sts_failed", status: response.status }));
    return null;
  }

  const result = await response.json() as { access_token?: string };
  return result.access_token ?? null;
}

async function impersonateServiceAccount(federatedToken: string, serviceAccountEmail: string) {
  const encodedEmail = encodeURIComponent(serviceAccountEmail);
  const endpoint = `${GOOGLE_IAM_CREDENTIALS_ENDPOINT}/projects/-/serviceAccounts/${encodedEmail}:generateAccessToken`;
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

  if (!response.ok) {
    console.error(JSON.stringify({ type: "sheets_impersonation_failed", status: response.status }));
    return null;
  }

  const result = await response.json() as { accessToken?: string; expireTime?: string };
  if (!result.accessToken) return null;

  const parsedExpiry = result.expireTime ? Date.parse(result.expireTime) : Number.NaN;
  return {
    token: result.accessToken,
    expiresAt: Number.isFinite(parsedExpiry) ? parsedExpiry : Date.now() + 3_600_000,
  };
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

  return [
    input.submissionId,
    timestamp,
    input.source,
    "New",
    "Normal",
    "Umar",
    "",
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

export async function appendLeadToGoogleSheet(
  input: LeadSheetInput,
  auth: GoogleSheetsAuthResult
): Promise<AppendLeadResult> {
  const spreadsheetId = getSpreadsheetId();
  if (!spreadsheetId) return { stored: false, reason: "not_configured" };
  if (!auth.configured) return { stored: false, reason: auth.reason };

  const range = encodeURIComponent("'Leads'!A:AH");
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&includeValuesInResponse=false`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorDimension: "ROWS",
        values: [buildLeadRow(input)],
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(JSON.stringify({ type: "sheets_append_failed", status: response.status }));
      return { stored: false, reason: "sheets_error" };
    }

    const result = await response.json() as { updates?: { updatedRange?: string } };
    const rowMatch = result.updates?.updatedRange?.match(/![A-Z]+(\d+):/);

    return {
      stored: true,
      rowNumber: rowMatch ? Number(rowMatch[1]) : undefined,
    };
  } catch {
    console.error(JSON.stringify({ type: "sheets_append_exception" }));
    return { stored: false, reason: "sheets_error" };
  }
}

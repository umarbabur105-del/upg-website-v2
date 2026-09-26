import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { classifyLeadDelivery, shouldTrackGenerateLead } from "../src/lib/lead-delivery.ts";

const source = stripTypeScriptTypes((await readFile(new URL("../src/lib/google-sheets.ts", import.meta.url), "utf8"))
  .replace('import "server-only";', ""));
let instance = 0;
const load = () => import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}#${instance++}`);
const input = (submissionId = "1a115cda-724a-4bba-a033-4c6bf6b57a11", extra = {}) => ({
  submissionId, receivedAt: new Date("2026-09-26T00:30:00Z"), source: "Contact Form",
  notificationStatus: "Sent", name: "=1+1", email: "fixture@example.invalid", ...extra,
});
const auth = { configured: true, accessToken: "fixture-token" };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

async function fixture(t, options = {}) {
  const oldEnv = { ...process.env };
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "synthetic-spreadsheet";
  process.env.GOOGLE_WIF_AUDIENCE = "//iam.googleapis.com/projects/123/locations/global/workloadIdentityPools/upg/providers/vercel";
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "upg@upg-test.iam.gserviceaccount.com";
  process.env.VERCEL_OIDC_TOKEN = "fixture-oidc";
  t.after(() => { process.env = oldEnv; });
  const state = { rows: [["Submission ID"]], markers: new Set(), batches: [], reads: 0, committed: false };
  if (options.legacy) state.rows.push([options.legacy]);
  if (options.orphan) state.markers.add(options.orphan);
  t.mock.method(globalThis, "fetch", async (url, init = {}) => {
    if (url.includes("sts.googleapis.com")) return json({ access_token: "fixture-exchanged" });
    if (url.includes("iamcredentials.googleapis.com")) return json({ accessToken: "refreshed", expireTime: new Date(Date.now() + 3600000).toISOString() });
    if (options.authRefresh && init.headers.Authorization === "Bearer fixture-token" && state.batches.length) {
      return json({}, 401);
    }
    if (url.includes("/values/")) {
      state.reads++;
      if (options.lookupDenied) return json({}, 403);
      if (options.staleRecovery && state.reads === 2) return json({ values: [["Submission ID"]] });
      return json({ values: state.rows });
    }
    if (url.includes("?fields=")) return json({ sheets: options.badMetadata ? [] : [{ properties: { sheetId: 17, title: "Leads" } }] });
    assert.ok(url.endsWith(":batchUpdate"), "never uses an unguarded append endpoint");
    const body = JSON.parse(init.body);
    state.batches.push(body);
    if (options.authRefresh && state.batches.length === 1) return json({}, 401);
    if (options.rejectStatus) return json({}, options.rejectStatus);
    const [guard, append] = body.requests;
    const key = guard.addNamedRange.namedRange.namedRangeId;
    assert.equal(guard.addNamedRange.namedRange.name, key);
    assert.equal(guard.addNamedRange.namedRange.range.sheetId, 17);
    assert.equal(append.appendCells.sheetId, 17);
    if (state.markers.has(key)) return json({ error: "already exists" }, 400);
    // Atomic fake server boundary: both mutations occur together with no await.
    state.markers.add(key);
    state.rows.push(append.appendCells.rows[0].values.map((cell) =>
      cell.userEnteredValue.numberValue ?? cell.userEnteredValue.stringValue));
    state.committed = true;
    if (options.timeoutAfterCommit && state.batches.length === 1) throw new Error("response lost after commit");
    return json({ replies: [{}, {}] });
  });
  return { state, client: await load() };
}

test("separate module instances concurrently store one exact lead and track one conversion", async (t) => {
  const { state, client } = await fixture(t);
  const second = await load();
  const results = await Promise.all([client.appendLeadToGoogleSheet(input(), auth), second.appendLeadToGoogleSheet(input(), auth)]);
  assert.equal(state.rows.length, 2);
  assert.equal(state.markers.size, 1);
  assert.equal(state.batches.length, 2);
  assert.ok(results.every((result) => result.stored));
  assert.equal(results.filter((result) => result.deduplicated).length, 1);
  assert.equal(results.filter((result) => shouldTrackGenerateLead(classifyLeadDelivery({ ...result, delivered: true }))).length, 1);
});

test("different UUID and long Stripe IDs produce distinct complete rows and guards", async (t) => {
  const { state, client } = await fixture(t);
  await Promise.all([input(), input("cs_test_" + "AaZ09".repeat(30))].map((lead) => client.appendLeadToGoogleSheet(lead, auth)));
  assert.equal(state.rows.length, 3);
  assert.equal(state.markers.size, 2);
  assert.ok(state.rows.slice(1).every((row) => row.length === 34));
  const cells = state.batches[0].requests[1].appendCells.rows[0].values;
  assert.deepEqual(cells[7].userEnteredValue, { stringValue: "=1+1" });
  assert.equal(typeof cells[1].userEnteredValue.numberValue, "number");
  assert.equal(cells[6].userEnteredValue.numberValue, 46293); // Friday LA -> Monday Sep 28
  assert.equal(cells[6].userEnteredFormat.numberFormat.type, "DATE");
});

test("timeout after commit and stale recovery read retries the same guard without duplicate rows", async (t) => {
  const { state, client } = await fixture(t, { timeoutAfterCommit: true, staleRecovery: true });
  const result = await client.appendLeadToGoogleSheet(input(), auth);
  assert.equal(result.stored, true);
  assert.equal(result.deduplicated, true);
  assert.equal(result.attempts, 2);
  assert.equal(state.rows.length, 2);
  assert.deepEqual(state.batches[0], state.batches[1]);
});

test("a permanent marker without the exact row fails closed", async (t) => {
  const { createHash } = await import("node:crypto");
  const marker = `upg_lead_v1_${createHash("sha256").update(input().submissionId).digest("hex")}`;
  const { state, client } = await fixture(t, { orphan: marker });
  const result = await client.appendLeadToGoogleSheet(input(), auth);
  assert.equal(result.stored, false);
  assert.equal(state.batches.length, 1);
  assert.equal(state.rows.length, 1);
});

test("legacy rows deduplicate without creating markers or reassigning follow-up", async (t) => {
  const { state, client } = await fixture(t, { legacy: input().submissionId });
  const result = await client.appendLeadToGoogleSheet(input(), auth);
  assert.equal(result.deduplicated, true);
  assert.equal(result.rowNumber, 2);
  assert.equal(state.batches.length, 0);
});

for (const status of [400, 429, 503]) {
  test(`HTTP ${status} fails closed with bounded retries and no partial marker`, async (t) => {
    const { state, client } = await fixture(t, { rejectStatus: status });
    const result = await client.appendLeadToGoogleSheet(input(), auth);
    assert.equal(result.stored, false);
    assert.equal(state.batches.length, status === 400 ? 1 : 3);
    assert.equal(state.markers.size, 0);
    assert.ok(state.batches.every((body) => JSON.stringify(body) === JSON.stringify(state.batches[0])));
  });
}

for (const option of ["badMetadata", "lookupDenied"]) {
  test(`${option} prevents all writes`, async (t) => {
    const { state, client } = await fixture(t, { [option]: true });
    assert.equal((await client.appendLeadToGoogleSheet(input(), auth)).stored, false);
    assert.equal(state.batches.length, 0);
  });
}

test("auth refresh preserves the same guard and succeeds with one row", async (t) => {
  const { state, client } = await fixture(t, { authRefresh: true });
  const result = await client.storeLeadInGoogleSheet(input(), undefined, auth);
  assert.equal(result.stored, true);
  assert.equal(state.rows.length, 2);
  assert.deepEqual(state.batches[0], state.batches[1]);
});

test("system tests have no sales follow-up date", async (t) => {
  const { state, client } = await fixture(t);
  await client.appendLeadToGoogleSheet(input("cs_test_fixture", { source: "Stripe Test Order", status: "Spam", owner: "System Test" }), auth);
  assert.equal(state.rows[1][6], "");
});

import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyLeadDelivery,
  shouldTrackGenerateLead,
} from "../src/lib/lead-delivery.ts";

test("tracks a lead only after the CRM record and notification both succeed", () => {
  const delivery = classifyLeadDelivery({ stored: true, delivered: true });

  assert.deepEqual(delivery, {
    accepted: true,
    stored: true,
    delivered: true,
    recorded: true,
    ignored: false,
    deduplicated: false,
    partialFailure: false,
  });
  assert.equal(shouldTrackGenerateLead(delivery), true);
});

test("does not count an email-only delivery as a recorded lead", () => {
  const delivery = classifyLeadDelivery({ stored: false, delivered: true });

  assert.equal(delivery.accepted, true);
  assert.equal(delivery.partialFailure, true);
  assert.equal(delivery.recorded, false);
  assert.equal(shouldTrackGenerateLead(delivery), false);
});

test("keeps a CRM-only delivery recorded while flagging notification failure", () => {
  const delivery = classifyLeadDelivery({ stored: true, delivered: false });

  assert.equal(delivery.accepted, true);
  assert.equal(delivery.partialFailure, true);
  assert.equal(delivery.recorded, true);
  assert.equal(shouldTrackGenerateLead(delivery), true);
});

test("rejects a delivery when neither durable path succeeds", () => {
  const delivery = classifyLeadDelivery({ stored: false, delivered: false });

  assert.equal(delivery.accepted, false);
  assert.equal(delivery.partialFailure, false);
  assert.equal(shouldTrackGenerateLead(delivery), false);
});

test("accepts honeypot submissions silently without recording a conversion", () => {
  const delivery = classifyLeadDelivery({
    stored: false,
    delivered: false,
    ignored: true,
  });

  assert.equal(delivery.accepted, true);
  assert.equal(delivery.ignored, true);
  assert.equal(delivery.partialFailure, false);
  assert.equal(shouldTrackGenerateLead(delivery), false);
});

test("requires the explicit recorded flag from the server", () => {
  assert.equal(
    shouldTrackGenerateLead({ accepted: true, stored: true, ignored: false }),
    false
  );
});

test("does not count an idempotent retry as another conversion", () => {
  const delivery = classifyLeadDelivery({
    stored: true,
    delivered: true,
    deduplicated: true,
  });

  assert.equal(delivery.accepted, true);
  assert.equal(delivery.recorded, true);
  assert.equal(delivery.deduplicated, true);
  assert.equal(shouldTrackGenerateLead(delivery), false);
});

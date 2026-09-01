import assert from "node:assert/strict";
import test from "node:test";
import {
  FormRequestError,
  parseFormRequest,
} from "../src/lib/form-validation.ts";

test("parseFormRequest accepts a JSON object", async () => {
  const request = new Request("https://example.com/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ name: "Buyer", quantity: "250" }),
  });

  assert.deepEqual(await parseFormRequest(request), {
    name: "Buyer",
    quantity: "250",
  });
});

test("parseFormRequest accepts a native HTML form submission", async () => {
  const request = new Request("https://example.com/api/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      product_family: "Tuck Boxes",
      quantity: "250 units",
      name: "Buyer",
      email: "buyer@example.com",
      company: "Example Brand",
    }),
  });

  assert.deepEqual(await parseFormRequest(request), {
    product_family: "Tuck Boxes",
    quantity: "250 units",
    name: "Buyer",
    email: "buyer@example.com",
    company: "Example Brand",
  });
});

test("parseFormRequest rejects a foreign browser origin", async () => {
  const request = new Request("https://universalpackaginggroup.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://spam.example",
    },
    body: new URLSearchParams({ name: "Bot" }),
  });

  await assert.rejects(
    parseFormRequest(request),
    (error) => error instanceof FormRequestError && error.status === 403
  );
});

test("parseFormRequest rejects unsupported content types", async () => {
  const request = new Request("https://example.com/api/quote", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "name=Buyer",
  });

  await assert.rejects(
    parseFormRequest(request),
    (error) => error instanceof FormRequestError && error.status === 415
  );
});

test("parseFormRequest enforces the byte limit for every accepted encoding", async () => {
  const request = new Request("https://example.com/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ notes: "x".repeat(100) }),
  });

  await assert.rejects(
    parseFormRequest(request, 32),
    (error) => error instanceof FormRequestError && error.status === 413
  );
});

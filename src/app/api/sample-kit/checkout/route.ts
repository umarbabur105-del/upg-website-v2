import { NextResponse } from "next/server";
import { getSampleKitBySku } from "@/data/sample-kit";
import { siteConfig } from "@/data/site";
import {
  cleanAttribution,
  cleanText,
  FormRequestError,
  parseFormRequest,
} from "@/lib/form-validation";
import {
  getStripeClient,
  hasValidStripeTestAccessToken,
  type StripeMode,
} from "@/lib/stripe";

export const dynamic = "force-dynamic";

function checkoutReturnOrigin(request: Request) {
  if (process.env.VERCEL_ENV === "production") {
    return siteConfig.url;
  }

  return new URL(request.url).origin;
}

function isAllowedCheckoutOrigin(request: Request, origin: string) {
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const forwardedHost =
      request.headers.get("x-forwarded-host") ?? request.headers.get("host");

    if (originUrl.host === requestUrl.host) return true;
    if (forwardedHost && originUrl.host === forwardedHost) return true;

    const loopbackHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
    return (
      process.env.VERCEL_ENV !== "production" &&
      loopbackHosts.has(originUrl.hostname) &&
      loopbackHosts.has(requestUrl.hostname) &&
      originUrl.port === requestUrl.port
    );
  } catch {
    return false;
  }
}

function safeStripeErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") {
    return { type: "sample_checkout_session_error" };
  }

  const candidate = error as {
    type?: unknown;
    code?: unknown;
    param?: unknown;
    statusCode?: unknown;
    requestId?: unknown;
  };

  return {
    type: "sample_checkout_session_error",
    stripeType:
      typeof candidate.type === "string" ? candidate.type.slice(0, 80) : undefined,
    stripeCode:
      typeof candidate.code === "string" ? candidate.code.slice(0, 80) : undefined,
    stripeParam:
      typeof candidate.param === "string" ? candidate.param.slice(0, 120) : undefined,
    stripeStatusCode:
      typeof candidate.statusCode === "number" ? candidate.statusCode : undefined,
    stripeRequestId:
      typeof candidate.requestId === "string"
        ? candidate.requestId.slice(0, 120)
        : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const requestOrigin = request.headers.get("origin");
    if (requestOrigin && !isAllowedCheckoutOrigin(request, requestOrigin)) {
      return NextResponse.json({ error: "Invalid checkout origin" }, { status: 403 });
    }

    const suppliedTestToken = request.headers.get("x-upg-stripe-test-token");
    const testModeRequested = suppliedTestToken !== null;
    const stripeMode: StripeMode = testModeRequested ? "test" : "live";
    if (testModeRequested && !hasValidStripeTestAccessToken(suppliedTestToken)) {
      return NextResponse.json({ error: "Invalid test-mode access" }, { status: 403 });
    }

    const input = await parseFormRequest(request, 2_000);
    const sku = cleanText(input.sku, { max: 80, singleLine: true });
    const attribution = cleanAttribution(input.attribution);
    const kit = getSampleKitBySku(sku);
    if (!kit) {
      return NextResponse.json({ error: "Invalid sample kit" }, { status: 400 });
    }

    const stripe = getStripeClient(stripeMode);
    if (!stripe) {
      return NextResponse.json(
        {
          error:
            stripeMode === "test"
              ? "Stripe test mode is not configured."
              : "Secure checkout is not connected yet. Please request a free sample review below.",
        },
        { status: 503 }
      );
    }

    const returnOrigin = checkoutReturnOrigin(request);
    const testMode = stripeMode === "test";
    const orderReference = crypto.randomUUID();
    const attributionMetadata = Object.fromEntries(
      Object.entries(attribution).filter(
        (entry): entry is [string, string] => typeof entry[1] === "string"
      )
    );
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      client_reference_id: orderReference,
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: [...kit.shippingCountries],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: kit.shippingLabel,
            fixed_amount: {
              amount: 0,
              currency: kit.currency.toLowerCase(),
            },
          },
        },
      ],
      automatic_tax: {
        enabled: !testMode && process.env.STRIPE_AUTOMATIC_TAX === "true",
      },
      adaptive_pricing: {
        enabled: false,
      },
      invoice_creation: { enabled: true },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: kit.currency.toLowerCase(),
            unit_amount: kit.priceCents,
            product_data: {
              name: kit.name,
              description: kit.description,
              images: [`${siteConfig.url}${kit.image}`],
              metadata: {
                sku: kit.sku,
                merchant_id: kit.merchantId,
              },
            },
          },
        },
      ],
      metadata: {
        order_type: kit.orderType,
        kit_type: kit.kind,
        sku: kit.sku,
        merchant_id: kit.merchantId,
        kit_credit_cents: String(kit.priceCents),
        upg_test_mode: String(testMode),
        ...attributionMetadata,
      },
      payment_intent_data: {
        metadata: {
          order_type: kit.orderType,
          sku: kit.sku,
          order_reference: orderReference,
          upg_test_mode: String(testMode),
        },
      },
      custom_text: {
        submit: {
          message:
            "The full kit price is credited toward your first UPG custom packaging production order.",
        },
      },
      success_url: `${returnOrigin}/samples/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnOrigin}${kit.path}?checkout=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout could not be created" }, { status: 502 });
    }

    return NextResponse.json({ checkoutUrl: session.url, mode: stripeMode });
  } catch (error) {
    if (error instanceof FormRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    // Deliberately omit the error message, request payload, and customer data.
    // Stripe's non-sensitive type/code/request ID are enough to diagnose a
    // configuration or account-mode problem from production logs.
    console.error(JSON.stringify(safeStripeErrorDetails(error)));
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable. Please request a sample below." },
      { status: 502 }
    );
  }
}

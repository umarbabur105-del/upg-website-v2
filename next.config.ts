import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://js.stripe.com https://checkout.stripe.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://*.stripe.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://api.stripe.com https://checkout.stripe.com",
  "frame-src https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        source: "/crm/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/products/custom-folding-cartons",
        destination: "/products/custom-tuck-boxes",
        permanent: true,
      },
      {
        source: "/custom-folding-cartons",
        destination: "/products/custom-tuck-boxes",
        permanent: true,
      },
      {
        source: "/products/custom-rigid-boxes",
        destination: "/products/custom-magnetic-boxes",
        permanent: true,
      },
      {
        source: "/custom-rigid-boxes",
        destination: "/products/custom-magnetic-boxes",
        permanent: true,
      },
      {
        source: "/products/custom-coffee-cups",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/custom-coffee-cups",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.universalpackaginggroup.com" }],
        destination: "https://universalpackaginggroup.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

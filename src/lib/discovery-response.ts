const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

export function discoveryTextResponse(body: string, contentType: string) {
  return new Response(body, {
    headers: {
      "Cache-Control": CACHE_CONTROL,
      "Content-Type": `${contentType}; charset=utf-8`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

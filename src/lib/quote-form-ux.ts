export const QUICK_QUANTITIES = [250, 500, 1000, 2500] as const;

export function formatQuoteContext(note: string) {
  const trimmed = note.trim();
  if (!trimmed) return "";

  return trimmed
    .replace(/^Packaging picker answers:\s*/i, "")
    .replace(/\s*Suggested starting point:.*$/i, "")
    .replace(/;\s*/g, " • ")
    .replace(/\s+/g, " ")
    .trim();
}

export function combineQuoteNotes(
  sourceContext: unknown,
  customerNotes: unknown
) {
  return [sourceContext, customerNotes]
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean)
    .join("\n\n");
}

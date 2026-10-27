const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const formatDate = (d: Date) => DATE.format(d);

/** Powder amounts as 8.6m / 150k, like the guides write them. */
export function formatPowder(n?: number): string {
  if (n === undefined) return "–";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}m`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}

/** One decimal, no trailing ".0". */
export function r1(x: number): string {
  return (Math.round(x * 10) / 10).toString();
}

const trim = (s: string) => s.replace(/\.?0+$/, "");

/** Short coin amount: 860k, 7.5M, 156M, 1.25B. */
export function coins(c: number): string {
  if (c >= 1e9) return trim((c / 1e9).toFixed(2)) + "B";
  if (c >= 1e6) return trim((c / 1e6).toFixed(c >= 1e7 ? 1 : 2)) + "M";
  if (c >= 1e3) return Math.round(c / 1e3) + "k";
  return Math.round(c).toString();
}

/** "just now", "4 min ago", "2 h ago" for an ISO time. */
export function ago(iso: string): string {
  const ms = Date.now() - Date.parse(iso);
  if (!Number.isFinite(ms)) return "at an unknown time";
  const min = Math.round(ms / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  return `${Math.round(min / 60)} h ago`;
}

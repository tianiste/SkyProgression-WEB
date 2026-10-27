// Reads Lighthouse JSON reports and fails when performance or accessibility is below 95.
import { readFileSync, appendFileSync } from "node:fs";

const MIN = 95;
let failed = false;
const lines = ["| Report | Performance | Accessibility | Best practices | SEO |", "| --- | --- | --- | --- | --- |"];
for (const file of process.argv.slice(2)) {
  const r = JSON.parse(readFileSync(file, "utf8"));
  const s = Object.fromEntries(Object.values(r.categories).map((c) => [c.id, Math.round(c.score * 100)]));
  lines.push(`| ${file} | ${s.performance} | ${s.accessibility} | ${s["best-practices"]} | ${s.seo} |`);
  if (s.performance < MIN || s.accessibility < MIN) failed = true;
  for (const a of Object.values(r.audits)) {
    if (a.score !== null && a.score < 0.9 && !["informative", "notApplicable", "manual"].includes(a.scoreDisplayMode)) {
      console.log(`${file}: ${a.id} ${a.score} ${a.displayValue ?? ""}`);
    }
  }
}
console.log(lines.join("\n"));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n");
process.exit(failed ? 1 : 0);

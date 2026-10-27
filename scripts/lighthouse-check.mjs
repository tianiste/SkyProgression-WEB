// Reads Lighthouse JSON reports and fails when performance or accessibility is below 95. Reports named
// <page>-<form>-<run>.json are grouped per page and form, and the run with the median performance score counts, because
// single runs on shared CI machines vary by several points.
import { readFileSync, appendFileSync } from "node:fs";

const MIN = 95;
let failed = false;
const lines = ["| Report | Runs (performance) | Performance | Accessibility | Best practices | SEO |", "| --- | --- | --- | --- | --- | --- |"];
const groups = new Map();
for (const file of process.argv.slice(2)) {
  const key = file.replace(/-\d+\.json$/, "").replace(/\.json$/, "");
  const r = JSON.parse(readFileSync(file, "utf8"));
  const s = Object.fromEntries(Object.values(r.categories).map((c) => [c.id, Math.round(c.score * 100)]));
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push({ file, r, s });
}
for (const [key, runs] of groups) {
  runs.sort((a, b) => a.s.performance - b.s.performance);
  const { file, r, s } = runs[Math.floor(runs.length / 2)];
  lines.push(`| ${key} | ${runs.map((x) => x.s.performance).join(", ")} | ${s.performance} | ${s.accessibility} | ${s["best-practices"]} | ${s.seo} |`);
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

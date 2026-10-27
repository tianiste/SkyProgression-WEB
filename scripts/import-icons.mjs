// Copies the FurfSky Reborn textures the site uses into public/icons and writes src/data/icons.generated.json.
// Usage: node scripts/import-icons.mjs <path to the unzipped FurfSky Reborn resource pack>
// Only textures for IDs the site references are copied, at their native size. Animated textures keep their first frame.
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

const pack = process.argv[2];
if (!pack || !fs.existsSync(path.join(pack, "assets"))) {
  console.error("Usage: node scripts/import-icons.mjs <unzipped FurfSky Reborn pack>");
  process.exit(1);
}
const root = path.resolve(import.meta.dirname, "..");
const assets = path.join(pack, "assets");
const outDir = path.join(root, "public", "icons");
const map = JSON.parse(fs.readFileSync(path.join(root, "src/data/icon-map.json"), "utf8"));

/** Item IDs the site can show: everything in guide data plus the icon map. */
function wantedItems() {
  const ids = new Set();
  for (const f of fs.readdirSync(path.join(root, "src/content/guides"))) {
    const text = fs.readFileSync(path.join(root, "src/content/guides", f), "utf8");
    for (const m of text.matchAll(/\b(?:item|type|collection): ([A-Z0-9_]+)/g)) ids.add(m[1]);
    for (const m of text.matchAll(/gem: ([A-Z]+), quality: ([A-Z]+)/g)) ids.add(`${m[2]}_${m[1]}_GEM`);
  }
  for (const [k, v] of Object.entries(map)) if (!k.startsWith("_")) for (const id of Array.isArray(v) ? v : Object.values(v)) if (!id.startsWith("#")) ids.add(id);
  return [...ids].sort();
}

const readModel = (ref) => {
  const [ns, rest] = ref.includes(":") ? ref.split(":") : ["minecraft", ref];
  const file = path.join(assets, ns, "models", `${rest}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
};

/** Follows a model and its parents to the first layer0 texture. */
function textureOf(modelRef) {
  for (let ref = modelRef, depth = 0; ref && depth < 8; depth++) {
    const model = readModel(ref);
    if (!model) return null;
    const layer = model.textures?.layer0;
    if (layer) {
      const [ns, rest] = layer.includes(":") ? layer.split(":") : ["minecraft", layer];
      const file = path.join(assets, ns, "textures", `${rest}.png`);
      return fs.existsSync(file) ? file : null;
    }
    ref = model.parent;
  }
  return null;
}

function readPng(file) {
  let buf = fs.readFileSync(file);
  const end = buf.indexOf("IEND");
  if (end > 0) buf = buf.subarray(0, end + 8);
  return { png: PNG.sync.read(buf), bytes: buf };
}

/** Writes the texture's first square frame; keeps the original bytes when nothing needs cropping and it is smaller. */
function copyTexture(src, dest) {
  const { png, bytes } = readPng(src);
  const size = png.width;
  let out = png;
  if (png.height > size) {
    out = new PNG({ width: size, height: size });
    png.data.copy(out.data, 0, 0, size * size * 4);
  }
  const encoded = PNG.sync.write(out, { deflateLevel: 9 });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out === png && bytes.length <= encoded.length ? bytes : encoded);
  return size;
}

fs.rmSync(outDir, { recursive: true, force: true });
const manifest = { source: "FurfSky Reborn v1.9.2 (Modrinth version 8DzcDe5O)", items: {}, hotm: {} };
const missing = [];

for (const id of wantedItems()) {
  const tex = textureOf(`firmskyblock:item/${id.toLowerCase()}`);
  if (!tex) {
    missing.push(id);
    continue;
  }
  const name = `${id.toLowerCase()}.png`;
  manifest.items[id] = { file: `items/${name}`, size: copyTexture(tex, path.join(outDir, "items", name)) };
}

// HOTM tree pieces: one per tree position (tier 1-10, column 1-7) and state, sharing files where the pack does.
const layout = path.join(assets, "cittofirmgenerated/models/item/ui/skyblock_menu");
for (const f of fs.readdirSync(layout).filter((f) => /^hotm_\d+_\d+_[a-z]+\.json$/.test(f))) {
  const key = f.replace(/^hotm_|\.json$/g, "");
  const tex = textureOf(`cittofirmgenerated:item/ui/skyblock_menu/${f.replace(".json", "")}`);
  if (!tex) continue;
  const name = path.basename(tex);
  const dest = path.join(outDir, "hotm", name);
  if (!fs.existsSync(dest)) copyTexture(tex, dest);
  manifest.hotm[key] = `hotm/${name}`;
}

fs.writeFileSync(path.join(root, "src/data/icons.generated.json"), JSON.stringify(manifest, null, 1) + "\n");
const files = fs.readdirSync(outDir, { recursive: true }).filter((f) => f.endsWith(".png"));
const bytes = files.reduce((n, f) => n + fs.statSync(path.join(outDir, f)).size, 0);
console.log(`${Object.keys(manifest.items).length} item icons, ${Object.keys(manifest.hotm).length} HOTM pieces, ${files.length} files, ${bytes} bytes`);
console.log(`No texture in the pack (fallback icon): ${missing.join(", ")}`);

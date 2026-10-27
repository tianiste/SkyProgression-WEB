// Copies the item textures the site uses into public/icons and writes src/data/icons.generated.json.
// Usage: node scripts/import-icons.mjs <FurfSky Reborn pack> [<Hypixel SkyBlock pack>] [<Minecraft client jar contents>]
// (each unzipped). Sources, in order: FurfSky Reborn, the official Hypixel SkyBlock Resource Pack, the face of the item's
// player head skin from Hypixel's public items resource, then Minecraft's own texture where icon-map.json names one;
// anything else gets the site's own fallback icon. Files keep their
// native size (animated textures keep their first frame). After copying, the script builds the site and removes every
// texture the built pages do not use, so the repo holds only used files.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { PNG } from "pngjs";

const [furfsky, hypixel, minecraft] = process.argv.slice(2);
if (!furfsky || !fs.existsSync(path.join(furfsky, "assets"))) {
  console.error("Usage: node scripts/import-icons.mjs <FurfSky Reborn pack> [<Hypixel SkyBlock pack>] [<Minecraft client jar contents>]");
  process.exit(1);
}
const root = path.resolve(import.meta.dirname, "..");
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
  for (const [k, v] of Object.entries(map)) {
    if (k.startsWith("_")) continue;
    for (const id of Array.isArray(v) ? v : Object.values(v)) if (!id.startsWith("#")) ids.add(id);
  }
  return [...ids].sort();
}

/** Resolves model references to the first layer0 texture file, following parents, within the given namespaces. */
function textureResolver(assets, allowedNamespaces) {
  const split = (ref) => (ref.includes(":") ? ref.split(":") : ["minecraft", ref]);
  const readModel = (ref) => {
    const [ns, rest] = split(ref);
    const file = path.join(assets, ns, "models", `${rest}.json`);
    return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
  };
  return (modelRef) => {
    for (let ref = modelRef, depth = 0; ref && depth < 8; depth++) {
      const model = readModel(ref);
      if (!model) return null;
      const layer = model.textures?.layer0;
      if (layer) {
        const [ns, rest] = split(layer);
        if (!allowedNamespaces.includes(ns)) return null;
        const file = path.join(assets, ns, "textures", `${rest}.png`);
        return fs.existsSync(file) ? file : null;
      }
      ref = model.parent;
    }
    return null;
  };
}

function readPng(buf) {
  const end = buf.indexOf("IEND");
  if (end > 0) buf = buf.subarray(0, end + 8);
  return { png: PNG.sync.read(buf), bytes: buf };
}

function writePng(png, dest, original) {
  const encoded = PNG.sync.write(png, { deflateLevel: 9 });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, original && original.length <= encoded.length ? original : encoded);
}

/** Writes the texture's first square frame; keeps the original bytes when nothing needs cropping and they are smaller. */
function copyTexture(src, dest) {
  const { png, bytes } = readPng(fs.readFileSync(src));
  const size = png.width;
  if (png.height > size) {
    const frame = new PNG({ width: size, height: size });
    png.data.copy(frame.data, 0, 0, size * size * 4);
    writePng(frame, dest);
  } else writePng(png, dest, bytes);
  return size;
}

/** The 8x8 face of a player head skin: the front of the head with the hat layer drawn over it. */
function headFace(skin, dest) {
  const { png } = readPng(skin);
  const face = new PNG({ width: 8, height: 8 });
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) {
      const o = (y * 8 + x) * 4;
      const base = ((8 + y) * png.width + 8 + x) * 4;
      const hat = ((8 + y) * png.width + 40 + x) * 4;
      const a = png.data[hat + 3] / 255;
      for (let c = 0; c < 3; c++) face.data[o + c] = Math.round(png.data[hat + c] * a + png.data[base + c] * (1 - a));
      face.data[o + 3] = 255;
    }
  writePng(face, dest);
  return 8;
}

// FurfSky Reborn: firmskyblock/models/item/<id>.json per SkyBlock ID.
const furfAssets = path.join(furfsky, "assets");
const furfTexture = textureResolver(furfAssets, ["firmskyblock", "cittofirmgenerated"]);
const fromFurfsky = (id) => furfTexture(`firmskyblock:item/${id.toLowerCase()}`);

// Hypixel SkyBlock Resource Pack: hypixel_skyblock/items/item/**/<id>.json, an item definition pointing at a model.
// Only Hypixel's own namespace is used; the vanilla Minecraft files in the pack are not.
let fromHypixel = () => null;
if (hypixel) {
  const hypAssets = path.join(hypixel, "assets");
  const itemsDir = path.join(hypAssets, "hypixel_skyblock/items/item");
  const index = new Map();
  for (const f of fs.readdirSync(itemsDir, { recursive: true })) if (f.endsWith(".json")) index.set(path.basename(f, ".json"), path.join(itemsDir, f));
  const hypTexture = textureResolver(hypAssets, ["hypixel_skyblock"]);
  const firstModel = (node) => {
    if (!node || typeof node !== "object") return null;
    if (node.type === "minecraft:model" && typeof node.model === "string") return node.model;
    for (const v of Object.values(node)) {
      const found = firstModel(v);
      if (found) return found;
    }
    return null;
  };
  fromHypixel = (id) => {
    const file = index.get(id.toLowerCase());
    if (!file) return null;
    const model = firstModel(JSON.parse(fs.readFileSync(file, "utf8")));
    return model?.startsWith("hypixel_skyblock:") ? hypTexture(model) : null;
  };
}

// Minecraft textures, named in icon-map.json as minecraft:<path> (for example minecraft:block/cobblestone).
const fromMinecraft = (ref) => {
  if (!minecraft || !ref?.startsWith("minecraft:")) return null;
  const file = path.join(minecraft, "assets/minecraft/textures", `${ref.slice("minecraft:".length)}.png`);
  return fs.existsSync(file) ? file : null;
};

// Player head skins from Hypixel's public items resource (no API key needed).
const skins = new Map();
const items = await (await fetch("https://api.hypixel.net/v2/resources/skyblock/items")).json();
for (const item of items.items ?? []) {
  if (!item.skin?.value) continue;
  try {
    const url = JSON.parse(Buffer.from(item.skin.value, "base64").toString("utf8")).textures?.SKIN?.url;
    if (url?.startsWith("http://textures.minecraft.net/texture/")) skins.set(item.id, url.replace("http://", "https://"));
  } catch {}
}

fs.rmSync(outDir, { recursive: true, force: true });
const manifest = {
  sources: {
    furfsky: "FurfSky Reborn v1.9.2 (Modrinth version 8DzcDe5O)",
    hypixel: "Hypixel SkyBlock Resource Pack (Hypixel API /v2/resources/packs)",
    head: "Player head skins from the Hypixel API items resource (/v2/resources/skyblock/items)",
    minecraft: "Minecraft 26.3 client textures",
  },
  items: {},
  hotm: {},
};
const missing = [];

for (const id of wantedItems()) {
  if (id.startsWith("minecraft:")) {
    const tex = fromMinecraft(id);
    if (!tex) {
      missing.push(id);
      continue;
    }
    const file = `minecraft/${id.slice("minecraft:".length).replace("/", "_")}.png`;
    manifest.items[id] = { file, size: copyTexture(tex, path.join(outDir, file)), source: "minecraft" };
    continue;
  }
  const name = `${id.toLowerCase()}.png`;
  const furf = fromFurfsky(id);
  const hyp = furf ? null : fromHypixel(id);
  if (furf || hyp) {
    const source = furf ? "furfsky" : "hypixel";
    const file = `${source === "furfsky" ? "items" : "hypixel"}/${name}`;
    manifest.items[id] = { file, size: copyTexture(furf ?? hyp, path.join(outDir, file)), source };
  } else if (skins.has(id)) {
    const file = `heads/${name}`;
    const res = await fetch(skins.get(id));
    if (!res.ok) {
      missing.push(id);
      continue;
    }
    manifest.items[id] = { file, size: headFace(Buffer.from(await res.arrayBuffer()), path.join(outDir, file)), source: "head" };
  } else if (fromMinecraft(map.vanilla?.[id])) {
    const file = `minecraft/${map.vanilla[id].slice("minecraft:".length).replace("/", "_")}.png`;
    manifest.items[id] = { file, size: copyTexture(fromMinecraft(map.vanilla[id]), path.join(outDir, file)), source: "minecraft" };
  } else missing.push(id);
}

// HOTM tiles: FurfSky draws abilities, Core of the Mountain and a few key perks as nodes (one per tree position, tier
// 1-10 and column 1-7, and state); other perks are connector lines, which the site does not use.
const layout = path.join(furfAssets, "cittofirmgenerated/models/item/ui/skyblock_menu");
for (const f of fs.readdirSync(layout).filter((f) => /^hotm_\d+_\d+_[a-z]+\.json$/.test(f))) {
  const tex = furfTexture(`cittofirmgenerated:item/ui/skyblock_menu/${f.replace(".json", "")}`);
  if (!tex || !/^hotm_(\d+_\d+|core)_/.test(path.basename(tex))) continue;
  const file = `hotm/${path.basename(tex)}`;
  if (!fs.existsSync(path.join(outDir, file))) copyTexture(tex, path.join(outDir, file));
  manifest.hotm[f.replace(/^hotm_|\.json$/g, "")] = file;
}

const writeManifest = () => fs.writeFileSync(path.join(root, "src/data/icons.generated.json"), JSON.stringify(manifest, null, 1) + "\n");
writeManifest();

// Keep only what the built site references.
execSync("npx astro build", { cwd: root, stdio: "ignore" });
const used = new Set();
for (const f of fs.readdirSync(path.join(root, "dist"), { recursive: true }).filter((f) => f.endsWith(".html"))) {
  for (const m of fs.readFileSync(path.join(root, "dist", f), "utf8").matchAll(/\/icons\/([a-z0-9_/.-]+\.png)/g)) used.add(m[1]);
}
for (const [id, t] of Object.entries(manifest.items)) if (!used.has(t.file)) delete manifest.items[id];
for (const [key, file] of Object.entries(manifest.hotm)) if (!used.has(file)) delete manifest.hotm[key];
for (const f of fs.readdirSync(outDir, { recursive: true }).filter((f) => f.endsWith(".png"))) {
  if (!used.has(f.split(path.sep).join("/"))) fs.rmSync(path.join(outDir, f));
}
writeManifest();

const files = fs.readdirSync(outDir, { recursive: true }).filter((f) => f.endsWith(".png"));
const bytes = files.reduce((n, f) => n + fs.statSync(path.join(outDir, f)).size, 0);
const count = (s) => Object.values(manifest.items).filter((t) => t.source === s).length;
console.log(
  `Used: ${count("furfsky")} FurfSky, ${count("hypixel")} Hypixel pack, ${count("head")} head skins, ${count("minecraft")} Minecraft, ${Object.keys(manifest.hotm).length} HOTM tiles; ${files.length} files, ${bytes} bytes`,
);
console.log(`In no source (fallback icon): ${missing.join(", ")}`);

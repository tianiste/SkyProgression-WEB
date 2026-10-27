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

/**
 * A player head skin drawn as a small isometric cube (top, front and left side, with the hat layer and simple shading),
 * the way SkyCrypt draws heads (its renderer builds on Crafatar's). Rendered at 32x32 with 4x4 supersampling.
 */
function headIso(skin, dest) {
  const { png } = readPng(skin);
  const S = 32, L = 15, c = Math.cos(Math.PI / 6), s = 0.5, ox = 16, oy = L + 1, SS = 4;
  const texel = (tx, ty) => {
    const i = (Math.min(ty, png.height - 1) * png.width + Math.min(tx, png.width - 1)) * 4;
    return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]];
  };
  // Faces: [skin x, skin y] of the 8x8 region, shade, and how a screen point maps to (u, v) in 0..1.
  const faces = [
    // Top (y = L): p = O + x(c,s) + z(-c,s) - (0,L)
    { at: [8, 0], shade: 1, uv: (px, py) => { const a = px / c, b = (py + L) / s; const x = (a + b) / 2, z = (b - a) / 2; return [x / L, z / L]; } },
    // Front (z = L): p = O + x(c,s) + L(-c,s) - (0,y)
    { at: [8, 8], shade: 0.86, uv: (px, py) => { const x = px / c + L; const y = x * s + L * s - py; return [x / L, (L - y) / L]; } },
    // Left side (x = L): p = O + L(c,s) + z(-c,s) - (0,y)
    { at: [16, 8], shade: 0.7, uv: (px, py) => { const z = L - px / c; const y = L * s + z * s - py; return [(L - z) / L, (L - y) / L]; } },
  ];
  const sample = (px, py) => {
    let out = null;
    for (const f of faces) {
      const [u, v] = f.uv(px, py);
      if (u < 0 || u >= 1 || v < 0 || v >= 1) continue;
      const tx = f.at[0] + Math.floor(u * 8), ty = f.at[1] + Math.floor(v * 8);
      const base = texel(tx, ty), hat = texel(tx + 32, ty);
      const a = hat[3] / 255;
      const rgb = [0, 1, 2].map((k) => (hat[k] * a + base[k] * (1 - a)) * f.shade);
      out = [...rgb, 255];
      if (f !== faces[0]) break;
      // The top face is drawn under the sides only where a side does not cover the point.
    }
    return out;
  };
  const img = new PNG({ width: S, height: S });
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const acc = [0, 0, 0, 0];
      for (let sy = 0; sy < SS; sy++)
        for (let sx = 0; sx < SS; sx++) {
          const c4 = sample(x + (sx + 0.5) / SS - ox, y + (sy + 0.5) / SS - oy);
          if (!c4) continue;
          for (let k = 0; k < 3; k++) acc[k] += c4[k];
          acc[3] += 1;
        }
      const o = (y * S + x) * 4;
      if (acc[3]) for (let k = 0; k < 3; k++) img.data[o + k] = Math.round(acc[k] / acc[3]);
      img.data[o + 3] = Math.round((acc[3] / (SS * SS)) * 255);
    }
  writePng(img, dest);
  return S;
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

// Pet heads: SkyCrypt's pet table (MIT) lists the head skin of every pet type; pinned to one commit.
const SKYCRYPT_COMMIT = "48fc9bfb4b774768ef9aee1ff7a1002fd3a254e0";
const petsSource = await (await fetch(`https://raw.githubusercontent.com/SkyCryptWebsite/SkyCrypt/${SKYCRYPT_COMMIT}/src/constants/pets.js`)).text();
const petHead = (type) => {
  const at = petsSource.indexOf(`\n  ${type}: {`);
  const m = at < 0 ? null : /\/head\/([0-9a-f]+)/.exec(petsSource.slice(at, at + 2000));
  return m ? `https://textures.minecraft.net/texture/${m[1]}` : null;
};

fs.rmSync(outDir, { recursive: true, force: true });
const manifest = {
  sources: {
    furfsky: "FurfSky Reborn v1.9.2 (Modrinth version 8DzcDe5O)",
    hypixel: "Hypixel SkyBlock Resource Pack (Hypixel API /v2/resources/packs)",
    head: "Player head skins from the Hypixel API items resource (/v2/resources/skyblock/items); pet heads from SkyCrypt's pet table",
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
  } else if (skins.has(id) || petHead(id)) {
    const file = `heads/${name}`;
    const res = await fetch(skins.get(id) ?? petHead(id));
    if (!res.ok) {
      missing.push(id);
      continue;
    }
    manifest.items[id] = { file, size: headIso(Buffer.from(await res.arrayBuffer()), path.join(outDir, file)), source: "head" };
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

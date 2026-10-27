// Copies FurfSky Reborn's armor textures for the 3D player model into public/armor and writes public/armor/map.json.
// Usage: node scripts/import-armor.mjs <FurfSky Reborn pack> (unzipped; version 1.9.2, the same pack as the item icons).
// The pack maps SkyBlock item IDs to armor textures in assets/firmskyblock/overrides/armor_models/*.json (Firmament's
// format): one texture name per set, drawn from <name>_layer_1.png (helmet, chestplate, boots) and <name>_layer_2.png
// (leggings), both in Minecraft's 64x32 armor layout. Variants chosen by lore (such as Adaptive's class) and tints are
// not read: each item gets its set's base texture.
import fs from "node:fs";
import path from "node:path";

const [furfsky] = process.argv.slice(2);
const models = furfsky && path.join(furfsky, "assets/firmskyblock/overrides/armor_models");
if (!models || !fs.existsSync(models)) {
  console.error("Usage: node scripts/import-armor.mjs <FurfSky Reborn pack>");
  process.exit(1);
}
const textures = path.join(furfsky, "assets/cittofirmgenerated/textures/models/armor");
const outDir = path.join(path.resolve(import.meta.dirname, ".."), "public", "armor");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const map = {};
let files = 0;
for (const file of fs.readdirSync(models, { recursive: true }).filter((f) => f.endsWith(".json")).sort()) {
  const model = JSON.parse(fs.readFileSync(path.join(models, file), "utf8"));
  const id = model.layers?.[0]?.identifier ?? "";
  if (!id.startsWith("cittofirmgenerated:")) continue;
  const source = id.slice("cittofirmgenerated:".length);
  const name = source.replaceAll("/", "__");
  const layers = [];
  for (const n of [1, 2]) {
    const from = path.join(textures, `${source}_layer_${n}.png`);
    if (!fs.existsSync(from)) continue;
    fs.copyFileSync(from, path.join(outDir, `${name}_layer_${n}.png`));
    layers.push(n);
    files++;
  }
  if (layers.length === 0) continue;
  for (const item of model.item_ids ?? []) map[item] = layers.length === 2 ? name : `${name}:${layers[0]}`;
}
fs.writeFileSync(path.join(outDir, "map.json"), JSON.stringify(map));
console.log(`${Object.keys(map).length} items, ${files} textures`);

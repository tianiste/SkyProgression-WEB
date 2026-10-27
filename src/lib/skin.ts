/**
 * Builds the texture for the 3D player model: the player's skin with the worn armor painted onto the skin's outer layer
 * (hat, jacket, sleeves, trousers), which skinview3d draws slightly larger than the body, like armor. Pieces with a
 * FurfSky Reborn armor texture use it (Minecraft's 64x32 armor layers); player-head helmets use the head texture; dyed
 * leather uses the API colour; other armor gets its material colour. Also draws the flat front view used when WebGL is
 * unavailable or motion is reduced.
 */
import type { ArmorPiece } from "./player";

/** Box layout of the 64x64 skin: [u, v, width, height, depth] of each part's outer layer. */
const HAT: Box = [32, 0, 8, 8, 8];
const JACKET: Box = [16, 32, 8, 12, 4];
const RIGHT_SLEEVE: Box = [40, 32, 4, 12, 4];
const LEFT_SLEEVE: Box = [48, 48, 4, 12, 4];
const RIGHT_PANTS: Box = [0, 32, 4, 12, 4];
const LEFT_PANTS: Box = [0, 48, 4, 12, 4];
type Box = [number, number, number, number, number];

const MATERIAL: Record<string, string> = {
  leather: "#a06540",
  chainmail: "#8c8f94",
  iron: "#d8d8d8",
  golden: "#eac54f",
  diamond: "#4fdfd6",
};

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });
}

/** A 64x64 copy of a skin; old 64x32 skins get their left limbs mirrored from the right ones, as the game does. */
function normalized(skin: HTMLImageElement | null): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d")!;
  if (!skin) return c;
  g.drawImage(skin, 0, 0);
  if (skin.height === 32) {
    g.save();
    g.scale(-1, 1);
    // Right leg (0,16) to the left leg (16,48); right arm (40,16) to the left arm (32,48), mirrored.
    g.drawImage(c, 0, 16, 16, 16, -32, 48, 16, 16);
    g.drawImage(c, 40, 16, 16, 16, -48, 48, 16, 16);
    g.restore();
  }
  return c;
}

/** Pixel shading so a flat colour reads as a material: darker edges, a little per-pixel noise. */
function paint(g: CanvasRenderingContext2D, box: Box, color: string, rows?: [number, number], holes = false) {
  const [u, v, w, h, d] = box;
  const rgb = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));
  // Faces: top and bottom (d x w), then the four sides (h tall) in one strip.
  const faces: [number, number, number, number][] = [
    [u + d, v, w, d],
    [u + d + w, v, w, d],
    [u, v + d, 2 * (d + w), h],
  ];
  for (const [i, [x0, y0, fw, fh]] of faces.entries()) {
    // A band (rows) covers part of the sides: the top face only when it starts at the top, the bottom only when it ends there.
    if (rows && ((i === 0 && rows[0] > 0) || (i === 1 && rows[1] < h))) continue;
    for (let y = 0; y < fh; y++) {
      if (rows && fh === h && (y < rows[0] || y >= rows[1])) continue;
      for (let x = 0; x < fw; x++) {
        if (holes && (x + y) % 2 === 1) { g.clearRect(x0 + x, y0 + y, 1, 1); continue; }
        const edge = y === 0 || y === fh - 1 || (fh === h && (x % (d + w) === 0 || x === fw - 1));
        const noise = (((x0 + x) * 73856093) ^ ((y0 + y) * 19349663)) % 7;
        const k = (edge ? 0.72 : 0.92) + noise * 0.02;
        g.fillStyle = `rgb(${rgb.map((c) => Math.min(255, Math.round(c * k))).join(",")})`;
        g.fillRect(x0 + x, y0 + y, 1, 1);
      }
    }
  }
}

function clear(g: CanvasRenderingContext2D, box: Box) {
  const [u, v, w, h, d] = box;
  g.clearRect(u, v, 2 * (d + w), d + h);
}

/** Loaded armor layers of one piece: layer 1 (helmet, chestplate, boots) or layer 2 (leggings). */
export interface ArmorTexture { layer1?: HTMLImageElement; layer2?: HTMLImageElement }

/** Copies a region, mirrored left to right when flip is set (the game mirrors the right limb's texture for the left). */
function copy(g: CanvasRenderingContext2D, img: CanvasImageSource, sx: number, sy: number, w: number, h: number, tx: number, ty: number, flip = false) {
  if (!flip) { g.drawImage(img, sx, sy, w, h, tx, ty, w, h); return; }
  g.save();
  g.translate(tx + w, ty);
  g.scale(-1, 1);
  g.drawImage(img, sx, sy, w, h, 0, 0, w, h);
  g.restore();
}

/**
 * Draws a 64x32 armor layer onto the outer layer. Armor layers use the old skin layout: head (0,0), right leg (0,16),
 * body (16,16), right arm (40,16); the left limbs mirror the right ones.
 */
function layer(g: CanvasRenderingContext2D, img: HTMLImageElement, part: "head" | "body" | "arms" | "legs") {
  if (part === "head") copy(g, img, 0, 0, 32, 16, 32, 0);
  if (part === "body") copy(g, img, 16, 16, 24, 16, 16, 32);
  if (part === "arms") { copy(g, img, 40, 16, 16, 16, 40, 32); copy(g, img, 40, 16, 16, 16, 48, 48, true); }
  if (part === "legs") { copy(g, img, 0, 16, 16, 16, 0, 32); copy(g, img, 0, 16, 16, 16, 0, 48, true); }
}

/**
 * The skin with armor on its outer layer. heads: loaded player-head textures by hash; textures: FurfSky armor layers
 * by item ID. Pieces without a known look (no texture, no material) are left off rather than guessed.
 */
export function compose(skin: HTMLImageElement | null, armor: ArmorPiece[], heads: Map<string, HTMLImageElement>,
                        textures = new Map<string, ArmorTexture>()): HTMLCanvasElement {
  const c = normalized(skin);
  const g = c.getContext("2d")!;
  const color = (p: ArmorPiece) => (p.material === "leather" ? p.color ?? MATERIAL.leather : p.material ? MATERIAL[p.material] : undefined);
  const slot = (name: ArmorPiece["slot"]) => armor.find((p) => p.slot === name);
  const chain = (p: ArmorPiece) => p.material === "chainmail";
  // Each worn piece replaces the skin's outer layer where it sits, in the order the game layers armor.
  const legs = slot("leggings"), boots = slot("boots"), chest = slot("chestplate"), helmet = slot("helmet");
  if (legs || boots) for (const b of [RIGHT_PANTS, LEFT_PANTS]) clear(g, b);
  if (legs || chest) clear(g, JACKET);
  if (chest) for (const b of [RIGHT_SLEEVE, LEFT_SLEEVE]) clear(g, b);
  if (legs) {
    const t = textures.get(legs.id)?.layer2;
    if (t) { layer(g, t, "legs"); layer(g, t, "body"); }
    else if (color(legs)) {
      for (const b of [RIGHT_PANTS, LEFT_PANTS]) paint(g, b, color(legs)!, [0, 9], chain(legs));
      // The waistband sits on the bottom of the jacket.
      paint(g, JACKET, color(legs)!, [9, 12]);
    }
  }
  if (boots) {
    const t = textures.get(boots.id)?.layer1;
    if (t) layer(g, t, "legs");
    else if (color(boots)) for (const b of [RIGHT_PANTS, LEFT_PANTS]) paint(g, b, color(boots)!, [8, 12], chain(boots));
  }
  if (chest) {
    const t = textures.get(chest.id)?.layer1;
    if (t) { layer(g, t, "body"); layer(g, t, "arms"); }
    else if (color(chest)) for (const b of [JACKET, RIGHT_SLEEVE, LEFT_SLEEVE]) paint(g, b, color(chest)!, undefined, chain(chest));
  }
  if (helmet) {
    const head = helmet.texture ? heads.get(helmet.texture) : undefined;
    const t = textures.get(helmet.id)?.layer1;
    if (head) {
      // A player head: its head and hat drawn as the helmet.
      clear(g, HAT);
      g.drawImage(head, 0, 0, 32, 16, 32, 0, 32, 16);
      g.drawImage(head, 32, 0, 32, 16, 32, 0, 32, 16);
    } else if (t) {
      clear(g, HAT);
      layer(g, t, "head");
    } else if (color(helmet)) {
      clear(g, HAT);
      paint(g, HAT, color(helmet)!, undefined, chain(helmet));
    }
  }
  return c;
}

/** Flat front view (16 x 32 skin pixels, inner layer then outer layer) at the given scale. */
export function frontView(texture: HTMLCanvasElement, slim: boolean, scale: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 16 * scale;
  c.height = 32 * scale;
  const g = c.getContext("2d")!;
  g.imageSmoothingEnabled = false;
  const arm = slim ? 3 : 4;
  // [source x, y, width, height, target x, y] of each front face; outer layers follow their inner faces.
  const parts: [number, number, number, number, number, number][] = [
    [8, 8, 8, 8, 4, 0], [40, 8, 8, 8, 4, 0],
    [20, 20, 8, 12, 4, 8], [20, 36, 8, 12, 4, 8],
    [44, 20, arm, 12, 4 - arm, 8], [44, 36, arm, 12, 4 - arm, 8],
    [36, 52, arm, 12, 12, 8], [52, 52, arm, 12, 12, 8],
    [4, 20, 4, 12, 4, 20], [4, 36, 4, 12, 4, 20],
    [20, 52, 4, 12, 8, 20], [4, 52, 4, 12, 8, 20],
  ];
  for (const [sx, sy, w, h, tx, ty] of parts) g.drawImage(texture, sx, sy, w, h, tx * scale, ty * scale, w * scale, h * scale);
  return c;
}

import { useEffect, useRef, useState } from "preact/hooks";
import { SITE } from "../../config";
import { compose, frontView, loadImage, type ArmorTexture } from "../../lib/skin";
import type { Common } from "../../lib/player";

/** Minecraft's default Steve skin, for players whose skin could not be read. */
const STEVE = "31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb";
const texture = (hash: string) => `${SITE.api}/texture/${hash}`;

function webgl(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The player in their worn armor: a flat front view first, then (when the browser has WebGL, the panel is on screen and
 * motion is not reduced) a slowly turning 3D model; skinview3d and three.js load only then. With reduced motion the 3D
 * model is one click away and does not turn by itself.
 */
export function PlayerModel({ data }: { data: Common }) {
  const flat = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const [tex, setTex] = useState<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<"flat" | "loading" | "3d">("flat");
  const [can3d, setCan3d] = useState(false);
  const [spin, setSpin] = useState(true);
  const viewer = useRef<{ dispose(): void; autoRotate: boolean } | null>(null);
  const slim = data.model.skin?.slim ?? false;
  const key = `${data.model.skin?.hash ?? ""}|${data.model.armor.map((a) => `${a.id}${a.color}${a.texture}`).join(",")}`;

  // Texture: skin, then any player-head helmets.
  useEffect(() => {
    let live = true;
    (async () => {
      const skin = await loadImage(texture(data.model.skin?.hash ?? STEVE)).catch(() => null);
      const heads = new Map<string, HTMLImageElement>();
      for (const a of data.model.armor) {
        if (a.texture && !heads.has(a.texture)) {
          const img = await loadImage(texture(a.texture)).catch(() => null);
          if (img) heads.set(a.texture, img);
        }
      }
      // FurfSky Reborn armor textures by item ID ("name", or "name:1" when the set has one layer); see scripts/import-armor.mjs.
      const textures = new Map<string, ArmorTexture>();
      const map = data.model.armor.length === 0 ? {} : await fetch("/armor/map.json").then((r) => (r.ok ? (r.json() as Promise<Record<string, string>>) : {})).catch(() => ({}));
      for (const a of data.model.armor) {
        const entry = (map as Record<string, string>)[a.id];
        if (!entry) continue;
        const [name, only] = entry.split(":");
        const n = a.slot === "leggings" ? 2 : 1;
        if (only && Number(only) !== n) continue;
        const img = await loadImage(`/armor/${name}_layer_${n}.png`).catch(() => null);
        if (img) textures.set(a.id, n === 2 ? { layer2: img } : { layer1: img });
      }
      if (live) setTex(compose(skin, data.model.armor, heads, textures));
    })();
    return () => { live = false; };
  }, [key]);

  // Flat view.
  useEffect(() => {
    if (!tex || !flat.current) return;
    const c = frontView(tex, slim, 6);
    c.setAttribute("aria-hidden", "true");
    flat.current.replaceChildren(c);
  }, [tex]);

  // 3D when visible and allowed.
  useEffect(() => {
    if (!tex || !holder.current) return;
    const ok = webgl();
    setCan3d(ok);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok || reduced || mode !== "flat") return;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = () => void show(true);
      "requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 300);
    });
    // The stage, not the hidden 3D holder: a hidden element never intersects.
    io.observe(holder.current.parentElement ?? holder.current);
    return () => io.disconnect();
  }, [tex]);

  useEffect(() => () => viewer.current?.dispose(), []);

  async function show(rotate: boolean) {
    if (!tex || !holder.current || viewer.current) return;
    setMode("loading");
    try {
      const { SkinViewer, IdleAnimation } = await import("skinview3d");
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      holder.current.replaceChildren(canvas);
      const v = new SkinViewer({ canvas, width: 220, height: 300, skin: tex, model: slim ? "slim" : "default", pixelRatio: "match-device" });
      v.zoom = 0.7;
      v.autoRotate = rotate;
      v.autoRotateSpeed = 0.6;
      v.controls.enableZoom = false;
      if (rotate) v.animation = new IdleAnimation();
      viewer.current = v;
      setSpin(rotate);
      setMode("3d");
    } catch {
      setMode("flat");
      setCan3d(false);
    }
  }

  const worn = data.model.armor;
  const order = ["helmet", "chestplate", "leggings", "boots"];
  return (
    <figure class="model">
      <div class="model-stage">
        <div ref={flat} class="model-flat" hidden={mode === "3d"} />
        <div ref={holder} class="model-3d" hidden={mode !== "3d"} />
      </div>
      <figcaption>
        <ul class="small">
          {[...worn].sort((a, b) => order.indexOf(a.slot) - order.indexOf(b.slot)).map((a) => <li key={a.slot}>{a.name || a.id}</li>)}
          {worn.length === 0 && <li class="muted">No armor worn, or the Inventory API is off.</li>}
        </ul>
        {mode === "flat" && can3d && <button type="button" class="link-button" onClick={() => void show(false)}>Show in 3D</button>}
        {mode === "loading" && <span class="muted small">Loading the 3D model…</span>}
        {mode === "3d" && (
          <button type="button" class="link-button" onClick={() => { if (viewer.current) { viewer.current.autoRotate = !spin; setSpin(!spin); } }}>
            {spin ? "Stop turning" : "Turn"}
          </button>
        )}
        <p class="muted small">{mode === "3d" ? "Drag to turn. " : ""}Armor textures by the FurfSky Reborn team; pieces without one are drawn in their material or dye colour.</p>
      </figcaption>
    </figure>
  );
}

import generated from "../../data/icons.generated.json";

const items = generated.items as Record<string, { file: string; size: number; source?: string }>;

/** An item's texture in an inventory slot (the same art as the guides), or an empty slot when there is none. */
export function ItemIcon({ id, size = "sm" }: { id: string | undefined | null; size?: "sm" | "lg" }) {
  const key = (id ?? "").replace(/^forge:/, "");
  const t = items[key];
  return (
    <span class={size === "lg" ? "slot lg" : "slot"} aria-hidden="true">
      {t && <img class={t.source === "head" ? "" : "pixelated"} src={`/icons/${t.file}`} width={size === "lg" ? 32 : 16} height={size === "lg" ? 32 : 16} alt="" loading="lazy" />}
    </span>
  );
}

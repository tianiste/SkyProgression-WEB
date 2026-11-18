import { createContext } from "preact";
import { useContext } from "preact/hooks";
import type { IconTable } from "../../magic-find/icons";

/** The page's icon table (src/magic-find/icons.ts), passed in from the page. */
export const Icons = createContext<IconTable>({});

/** An item icon in an inventory slot, or the Magic Find star when there is no texture. */
export function MfIcon({ source, toggle, size = "sm" }: { source?: string; toggle?: string; size?: "sm" | "lg" }) {
  const t = useContext(Icons)[source ? `source:${source}` : `toggle:${toggle}`];
  const px = size === "lg" ? 32 : 16;
  return (
    <span class={size === "lg" ? "slot lg" : "slot"} aria-hidden="true">
      {t ? (
        <img class={t.smooth ? "" : "pixelated"} src={t.src} width={px} height={px} alt="" loading="lazy" />
      ) : (
        <svg class="mf-star-glyph" viewBox="0 0 16 16" width={px} height={px}>
          <path fill="currentColor" d="M8 1.2l1.8 4.3 4.6.3-3.5 3 1.1 4.5L8 10.9l-4 2.4 1.1-4.5-3.5-3 4.6-.3z" />
        </svg>
      )}
    </span>
  );
}

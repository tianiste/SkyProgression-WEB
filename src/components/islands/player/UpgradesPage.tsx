import { Shell, usePlayer } from "../../player/Shell";
import type { Common } from "../../../lib/player";

export default function UpgradesPage() {
  const state = usePlayer<Common>("upgrades");
  return <Shell view="upgrades" state={state} />;
}

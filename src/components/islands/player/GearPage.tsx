import { Shell, usePlayer } from "../../player/Shell";
import type { Common } from "../../../lib/player";

export default function GearPage() {
  const state = usePlayer<Common>("gear");
  return <Shell view="gear" state={state} />;
}

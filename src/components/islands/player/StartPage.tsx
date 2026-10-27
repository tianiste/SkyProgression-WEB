import { Shell, usePlayer } from "../../player/Shell";
import type { Common } from "../../../lib/player";

export default function StartPage() {
  const state = usePlayer<Common>("start");
  return <Shell view="start" state={state} />;
}

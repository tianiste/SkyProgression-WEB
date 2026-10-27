import { Shell, usePlayer } from "../../player/Shell";
import type { Common } from "../../../lib/player";

export default function HotmPage() {
  const state = usePlayer<Common>("hotm");
  return <Shell view="hotm" state={state} />;
}

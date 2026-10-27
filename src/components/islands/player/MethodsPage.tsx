import { Shell, usePlayer } from "../../player/Shell";
import type { Common } from "../../../lib/player";

export default function MethodsPage() {
  const state = usePlayer<Common>("methods");
  return <Shell view="methods" state={state} />;
}

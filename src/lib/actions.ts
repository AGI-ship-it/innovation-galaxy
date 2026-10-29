import { Vector3 } from "three";
import type { Category, Maturity } from "@/data/types";
import { registry } from "./registry";
import { useExplorer } from "./store";

/** Opens a planet by its hover id (`cat:…`, `pl:family:maturity`, `uc:…`). */
export function openPlanet(id: string) {
  const { view, navigate } = useExplorer.getState();
  const entry = registry.planets.get(id);
  const p = entry?.object.getWorldPosition(new Vector3());
  const opts = p ? { focus: [p.x, p.y, p.z] as [number, number, number], focusRadius: entry!.radius } : {};
  const [kind, a, b] = id.split(":");

  if (kind === "cat") navigate({ category: a as Category, familyId: null, useCaseId: null }, opts);
  else if (kind === "pl" && view.category)
    navigate({ category: view.category, familyId: a, useCaseId: null }, { ...opts, maturity: b as Maturity });
  else if (kind === "uc") navigate({ ...view, useCaseId: a }, opts);
}

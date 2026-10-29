"use client";

import { useMemo } from "react";
import { MATURITIES, MATURITY_ORDER, getFamily } from "@/data/families";
import type { Category } from "@/data/types";
import { familyUseCases } from "@/lib/data";
import { useExplorer } from "@/lib/store";
import { OrbitRing } from "./OrbitRing";
import { Planet } from "./Planet";
import { FAMILY_ORBITS, ORBIT_PHASE, orbitSpeed, lookForUseCase } from "./layout";

/** Use cases of one technology family, orbiting the family planet by maturity. */
export function FamilyScene({ category, familyId }: { category: Category; familyId: string }) {
  const navigate = useExplorer((s) => s.navigate);
  const maturityFilter = useExplorer((s) => s.familyMaturity);
  const groupFilter = useExplorer((s) => s.groupFilter);
  const hoveredId = useExplorer((s) => (s.hovered?.startsWith("uc:") ? s.hovered.slice(3) : null));

  const family = getFamily(familyId);
  const useCases = useMemo(() => familyUseCases(category, familyId), [category, familyId]);
  const hoveredMaturity = useCases.find((u) => u.id === hoveredId)?.maturity ?? null;

  return (
    <group>
      <Planet
        id="center"
        look={family.look}
        radius={1.5}
        textureSize={1024}
        caption={family.name}
        glow="#c9b8ff"
        emissive={0.22}
      />
      {MATURITY_ORDER.map((m, i) => {
        const populated = useCases.some((u) => u.maturity === m);
        return (
          <OrbitRing
            key={m}
            {...FAMILY_ORBITS[i]}
            dashed={m === "emerging"}
            active={populated && (maturityFilter === m || hoveredMaturity === m)}
            muted={!populated || (maturityFilter !== "all" && maturityFilter !== m)}
            label={MATURITIES[m].label}
          />
        );
      })}
      {MATURITY_ORDER.flatMap((m, i) => {
        const onOrbit = useCases.filter((u) => u.maturity === m);
        const orbit = FAMILY_ORBITS[i];
        return onOrbit.map((u, j) => (
          <Planet
            key={u.id}
            id={`uc:${u.id}`}
            look={lookForUseCase(u.id)}
            radius={0.5}
            orbit={{
              ...orbit,
              phase: ORBIT_PHASE[i] + 1.2 + (j / onOrbit.length) * Math.PI * 2,
              speed: orbitSpeed(orbit.a) * 0.8,
            }}
            dimmed={
              (maturityFilter !== "all" && maturityFilter !== m) ||
              (groupFilter !== "all" && u.group !== groupFilter)
            }
            label={{ title: u.title, lines: [u.group] }}
            ariaLabel={`${u.title}. ${u.recommendation}. Open the full use case card.`}
            onSelect={(focus, focusRadius) =>
              navigate({ category, familyId, useCaseId: u.id }, { focus, focusRadius })
            }
          />
        ));
      })}
    </group>
  );
}

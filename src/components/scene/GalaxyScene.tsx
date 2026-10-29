"use client";

import { useMemo } from "react";
import { CATEGORIES, MATURITIES, MATURITY_ORDER } from "@/data/families";
import type { Category } from "@/data/types";
import { placementsFor, plural } from "@/lib/data";
import { useExplorer } from "@/lib/store";
import { OrbitRing } from "./OrbitRing";
import { Planet } from "./Planet";
import { CENTER_LOOK, GALAXY_ORBITS, ORBIT_PHASE, orbitSpeed } from "./layout";

/** Technology families placed on maturity orbits around Facilities. */
export function GalaxyScene({ category }: { category: Category }) {
  const navigate = useExplorer((s) => s.navigate);
  const maturityFilter = useExplorer((s) => s.galaxyMaturity);
  const groupFilter = useExplorer((s) => s.groupFilter);
  // Orbit of the hovered family (hover id "pl:family:maturity"), lit up as a cue.
  const hoveredOrbit = useExplorer((s) => (s.hovered?.startsWith("pl:") ? s.hovered.split(":")[2] : null));

  const placements = useMemo(() => placementsFor(category), [category]);

  return (
    <group>
      <Planet
        id="center"
        look={CENTER_LOOK}
        radius={1.6}
        textureSize={1024}
        decal="Facilities"
        caption={CATEGORIES[category].name}
        glow="#e7defc"
        emissive={0.06}
      />
      {MATURITY_ORDER.map((m, i) => (
        <OrbitRing
          key={m}
          {...GALAXY_ORBITS[i]}
          dashed={m === "emerging"}
          active={maturityFilter === m || hoveredOrbit === m}
          muted={maturityFilter !== "all" && maturityFilter !== m}
          label={MATURITIES[m].label}
        />
      ))}
      {MATURITY_ORDER.flatMap((m, i) => {
        const onOrbit = placements.filter((p) => p.maturity === m);
        const orbit = GALAXY_ORBITS[i];
        return onOrbit.map((p, j) => {
          const matching =
            groupFilter === "all" ? p.useCases : p.useCases.filter((u) => u.group === groupFilter);
          const total = p.useCases.length;
          const dimmed =
            (maturityFilter !== "all" && maturityFilter !== m) || matching.length === 0;
          const count =
            groupFilter === "all"
              ? plural(total, "use case")
              : `${matching.length} of ${plural(total, "use case")}`;
          return (
            <Planet
              key={p.key}
              id={`pl:${p.key}`}
              look={p.family.look}
              radius={0.5 + 0.1 * Math.sqrt(total)}
              orbit={{
                ...orbit,
                phase: ORBIT_PHASE[i] + (j / onOrbit.length) * Math.PI * 2,
                speed: orbitSpeed(orbit.a),
              }}
              dimmed={dimmed}
              label={{ title: p.family.name, lines: [count, MATURITIES[m].label] }}
              ariaLabel={`${p.family.name}, ${MATURITIES[m].label}, ${count}. Open use cases.`}
              onSelect={(focus, focusRadius) =>
                navigate(
                  { category, familyId: p.family.id, useCaseId: null },
                  { focus, focusRadius, maturity: m },
                )
              }
            />
          );
        });
      })}
    </group>
  );
}

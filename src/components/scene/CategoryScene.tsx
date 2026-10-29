"use client";

import { CATEGORIES } from "@/data/families";
import type { Category } from "@/data/types";
import { placementsFor, plural, recordsFor } from "@/lib/data";
import { useExplorer } from "@/lib/store";
import { OrbitRing } from "./OrbitRing";
import { Planet } from "./Planet";
import { CATEGORY_LOOKS, CATEGORY_ORBIT, CENTER_LOOK, orbitSpeed } from "./layout";

const ENTRIES: { category: Category; phase: number }[] = [
  { category: "service", phase: Math.PI * 0.92 },
  { category: "internal", phase: -Math.PI * 0.08 },
];

export function CategoryScene() {
  const navigate = useExplorer((s) => s.navigate);
  const speed = orbitSpeed(CATEGORY_ORBIT.a) * 0.6;

  return (
    <group>
      <Planet id="center" look={CENTER_LOOK} radius={2.1} textureSize={1024} decal="Facilities" glow="#e7defc"
        emissive={0.06} />
      <OrbitRing {...CATEGORY_ORBIT} />
      <OrbitRing a={CATEGORY_ORBIT.a * 1.45} b={CATEGORY_ORBIT.b * 1.45} dashed muted />
      {ENTRIES.map(({ category, phase }) => {
        const total = recordsFor(category).length;
        const placements = placementsFor(category).length;
        return (
          <Planet
            key={category}
            id={`cat:${category}`}
            look={CATEGORY_LOOKS[category]}
            radius={1.05}
            textureSize={512}
            orbit={{ ...CATEGORY_ORBIT, phase, speed }}
            label={{
              title: CATEGORIES[category].name,
              lines: [plural(total, "use case"), `${placements} ${placements === 1 ? "family" : "families"}`],
            }}
            ariaLabel={`${CATEGORIES[category].name}: ${plural(total, "use case")}. Open technology families.`}
            onSelect={(focus, focusRadius) =>
              navigate({ category, familyId: null, useCaseId: null }, { focus, focusRadius })
            }
          />
        );
      })}
    </group>
  );
}

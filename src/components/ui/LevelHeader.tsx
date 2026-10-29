"use client";

import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, MATURITIES, MATURITY_ORDER, getFamily } from "@/data/families";
import type { Category, Maturity } from "@/data/types";
import { FAMILY_HEADLINES } from "@/data/useCases";
import { countByMaturity, familyUseCases, placementsFor, plural, recordsFor } from "@/lib/data";
import { levelOf, useExplorer } from "@/lib/store";

const enter = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export function LevelHeader() {
  const view = useExplorer((s) => s.view);
  const level = levelOf(view);
  const key = `${view.category}|${view.familyId}`;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-space via-space/85 to-transparent px-4 pb-10 pt-16 sm:px-6 sm:pt-[4.25rem]">
      <AnimatePresence mode="wait">
        <motion.div key={key} {...enter}>
          {level === "category" && <CategoryHeader />}
          {level === "galaxy" && <GalaxyHeader category={view.category!} />}
          {level === "family" && <FamilyHeader category={view.category!} familyId={view.familyId!} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CategoryHeader() {
  return (
    <div data-label-obstacle className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <p className="flex items-center gap-3 text-[0.6rem] font-medium uppercase tracking-[0.34em] text-lavender/75">
        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-lavender/60" />
        Technology use case explorer
        <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-lavender/60" />
      </p>
      <h1 className="mt-2.5 bg-gradient-to-r from-white via-[#e6dbff] to-[#f5c8e6] bg-clip-text pb-0.5 text-2xl font-semibold tracking-tight text-transparent sm:text-[1.9rem] sm:leading-tight">
        Facilities Innovation Galaxy
      </h1>
      <p className="mt-2 max-w-xl text-balance text-xs leading-relaxed text-muted sm:text-[0.8rem]">
        Choose a portfolio: <span className="text-ink/85">{CATEGORIES.service.name.toLowerCase()}</span> delivered to
        clients, or <span className="text-ink/85">{CATEGORIES.internal.name.toLowerCase()}</span> that run the business.
      </p>
    </div>
  );
}

type MaturityFilter = Maturity | "all";

/** Pill switcher with a sliding highlight; shared by the galaxy and family levels. */
function MaturitySwitch({
  id,
  value,
  onChange,
  counts,
  total,
}: {
  id: string;
  value: MaturityFilter;
  onChange: (m: MaturityFilter) => void;
  counts: Record<Maturity, number>;
  total: number;
}) {
  const options: { id: MaturityFilter; label: string; count: number; hint?: string }[] = [
    { id: "all", label: "All", count: total },
    ...MATURITY_ORDER.map((m) => ({ id: m, label: MATURITIES[m].label, count: counts[m], hint: MATURITIES[m].orbit })),
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Filter by maturity"
      className="pointer-events-auto mt-3 inline-flex rounded-full border border-line bg-panel-solid/80 p-1 backdrop-blur-md"
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={o.hint}
            disabled={o.count === 0}
            onClick={() => onChange(o.id)}
            className="relative flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition focus-visible:outline-2 focus-visible:outline-lavender disabled:cursor-not-allowed disabled:opacity-35 sm:text-[0.8rem]"
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 rounded-full bg-white/12 ring-1 ring-white/15"
                transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
              />
            )}
            <span className={`relative ${active ? "text-ink" : "text-muted hover:text-ink"}`}>{o.label}</span>
            <span className="relative text-[0.68rem] tabular-nums text-lavender/80">{o.count}</span>
          </button>
        );
      })}
    </div>
  );
}

function GalaxyHeader({ category }: { category: Category }) {
  const filter = useExplorer((s) => s.galaxyMaturity);
  const setFilter = useExplorer((s) => s.setGalaxyMaturity);
  const placements = placementsFor(category);
  const records = recordsFor(category);

  return (
    <div data-label-obstacle className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <h1 className="text-lg font-medium tracking-tight text-ink sm:text-xl">Explore technology families</h1>
      <p className="mt-1 text-xs text-muted">
        {plural(placements.length, "family placement")} · Closer to the centre, more established
      </p>
      <MaturitySwitch
        id="galaxy"
        value={filter}
        onChange={setFilter}
        counts={countByMaturity(records)}
        total={records.length}
      />
    </div>
  );
}

function FamilyHeader({ category, familyId }: { category: Category; familyId: string }) {
  const filter = useExplorer((s) => s.familyMaturity);
  const setFilter = useExplorer((s) => s.setFamilyMaturity);
  const family = getFamily(familyId);
  const useCases = familyUseCases(category, familyId);

  return (
    <div data-label-obstacle className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <h1 className="text-lg font-medium tracking-tight text-ink sm:text-xl">{family.name}</h1>
      <p className="mt-1 hidden max-w-lg text-xs leading-relaxed text-muted sm:block">
        {FAMILY_HEADLINES[category][familyId]} · {plural(useCases.length, "use case")} in{" "}
        {CATEGORIES[category].name.toLowerCase()}.
      </p>
      <MaturitySwitch
        id="family"
        value={filter}
        onChange={setFilter}
        counts={countByMaturity(useCases)}
        total={useCases.length}
      />
    </div>
  );
}

"use client";

import { CATEGORIES, MATURITIES, MATURITY_ORDER } from "@/data/families";
import type { Category } from "@/data/types";
import { familyUseCases, placementsFor, plural, recordsFor } from "@/lib/data";
import { levelOf, useExplorer } from "@/lib/store";
import { ArrowUpRight } from "./icons";

/**
 * Accessible 2D version of the same flow. Used when WebGL is unavailable
 * and as an optional "List view".
 */
export function ListExplorer() {
  const view = useExplorer((s) => s.view);
  const level = levelOf(view);

  return (
    <div className="scrollbar-thin absolute inset-0 overflow-y-auto px-4 pb-16 pt-56 sm:px-6 sm:pt-60">
      <div className="mx-auto max-w-6xl">
        {level === "category" && <Categories />}
        {level === "galaxy" && <Families category={view.category!} />}
        {level === "family" && <UseCases category={view.category!} familyId={view.familyId!} />}
      </div>
    </div>
  );
}

const cardCls =
  "group flex w-full flex-col rounded-2xl border border-line bg-panel p-5 text-left backdrop-blur-md transition hover:border-line-strong hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-lavender";

function Categories() {
  const navigate = useExplorer((s) => s.navigate);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(["service", "internal"] as Category[]).map((c) => (
        <button key={c} type="button" className={cardCls} onClick={() => navigate({ category: c, familyId: null, useCaseId: null })}>
          <span className="text-sm text-lavender">
            {plural(recordsFor(c).length, "use case")} · {plural(placementsFor(c).length, "family placement")}
          </span>
          <span className="mt-2 text-2xl font-medium text-ink">{CATEGORIES[c].name}</span>
          <span className="mt-2 text-muted">{CATEGORIES[c].description}</span>
          <span className="mt-4 flex items-center gap-1.5 text-sm text-muted group-hover:text-ink">
            Explore technology families <ArrowUpRight />
          </span>
        </button>
      ))}
    </div>
  );
}

function Families({ category }: { category: Category }) {
  const navigate = useExplorer((s) => s.navigate);
  const maturityFilter = useExplorer((s) => s.galaxyMaturity);
  const groupFilter = useExplorer((s) => s.groupFilter);
  const placements = placementsFor(category);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {MATURITY_ORDER.filter((m) => maturityFilter === "all" || maturityFilter === m).map((m) => (
        <section key={m} aria-labelledby={`col-${m}`}>
          <h2 id={`col-${m}`} className="mb-3 flex items-baseline gap-2 text-ink">
            <span className="font-mono text-xs text-muted">0{MATURITIES[m].index + 1}</span>
            <span className="text-lg">{MATURITIES[m].label}</span>
            <span className="text-xs text-muted">{MATURITIES[m].orbit}</span>
          </h2>
          <ul className="space-y-3">
            {placements
              .filter((p) => p.maturity === m)
              .map((p) => {
                const matching = groupFilter === "all" ? p.useCases : p.useCases.filter((u) => u.group === groupFilter);
                return (
                  <li key={p.key} className={matching.length ? "" : "opacity-40"}>
                    <button
                      type="button"
                      className={cardCls}
                      onClick={() => navigate({ category, familyId: p.family.id, useCaseId: null }, { maturity: m })}
                    >
                      <span className="text-lg font-medium text-ink">{p.family.name}</span>
                      <span className="mt-1 text-sm text-muted">
                        {groupFilter === "all"
                          ? plural(p.useCases.length, "use case")
                          : `${matching.length} of ${plural(p.useCases.length, "use case")}`}
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function UseCases({ category, familyId }: { category: Category; familyId: string }) {
  const navigate = useExplorer((s) => s.navigate);
  const view = useExplorer((s) => s.view);
  const maturityFilter = useExplorer((s) => s.familyMaturity);
  const groupFilter = useExplorer((s) => s.groupFilter);
  const useCases = familyUseCases(category, familyId).filter(
    (u) => (maturityFilter === "all" || u.maturity === maturityFilter) && (groupFilter === "all" || u.group === groupFilter),
  );

  if (!useCases.length) return <p className="text-muted">No use cases match the current filters.</p>;

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {useCases.map((u) => (
        <li key={u.id}>
          <button type="button" className={`${cardCls} h-full`} onClick={() => navigate({ ...view, useCaseId: u.id })}>
            <span className="text-sm text-lavender">
              {MATURITIES[u.maturity].label} · {u.recommendation}
            </span>
            <span className="mt-2 text-xl font-medium text-ink">{u.title}</span>
            <span className="mt-1 text-sm text-muted">{u.group}</span>
            <span className="mt-3 line-clamp-3 text-ink/80">{u.summary}</span>
            <span className="mt-4 flex items-center gap-1.5 text-sm text-muted group-hover:text-ink">
              Open the full card <ArrowUpRight />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

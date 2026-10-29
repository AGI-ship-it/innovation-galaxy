"use client";

import { CATEGORIES, getFamily } from "@/data/families";
import { groupsFor } from "@/lib/data";
import { HOME, useExplorer } from "@/lib/store";
import { ArrowLeft, ListIcon, OrbitIcon } from "./icons";

export function TopBar({ webgl }: { webgl: boolean }) {
  const view = useExplorer((s) => s.view);
  const navigate = useExplorer((s) => s.navigate);
  const back = useExplorer((s) => s.back);
  const groupFilter = useExplorer((s) => s.groupFilter);
  const setGroupFilter = useExplorer((s) => s.setGroupFilter);
  const listView = useExplorer((s) => s.listView);
  const setListView = useExplorer((s) => s.setListView);

  const crumbs = [
    { label: "Facilities", view: HOME },
    ...(view.category
      ? [{ label: CATEGORIES[view.category].name, view: { ...HOME, category: view.category } }]
      : []),
    ...(view.category && view.familyId
      ? [{ label: getFamily(view.familyId).name, view: { ...view, useCaseId: null } }]
      : []),
  ];

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
      <div data-label-obstacle className="pointer-events-auto flex min-w-0 items-center gap-2 sm:gap-3">
        {view.category && (
          <button
            type="button"
            onClick={back}
            className="flex h-8 shrink-0 items-center gap-2 rounded-full border border-line bg-panel px-3 text-xs text-ink backdrop-blur-md transition hover:border-line-strong hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-lavender"
            aria-label="Back"
          >
            <ArrowLeft className="text-base" />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}
        {crumbs.length > 1 && (
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex min-w-0 items-center gap-1.5 text-xs text-muted">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.label} className={`flex min-w-0 items-center gap-1.5 ${last ? "" : "hidden md:flex"}`}>
                  {i > 0 && <span aria-hidden className="text-faint">/</span>}
                  {last ? (
                    <span aria-current="page" className="truncate text-ink">
                      {c.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(c.view)}
                      className="truncate rounded transition hover:text-ink focus-visible:outline-2 focus-visible:outline-lavender"
                    >
                      {c.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        )}
      </div>

      <div data-label-obstacle className="pointer-events-auto flex shrink-0 items-center gap-2">
        {view.category && (
          <label className="relative">
            <span className="sr-only">Filter by {CATEGORIES[view.category].groupLabel.toLowerCase()}</span>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="h-8 max-w-[9.5rem] appearance-none truncate rounded-full border border-line bg-panel pl-3 pr-8 text-xs text-ink backdrop-blur-md transition hover:border-line-strong focus-visible:outline-2 focus-visible:outline-lavender sm:max-w-[15rem]"
            >
              <option value="all">All {CATEGORIES[view.category].groupLabel.toLowerCase()}s</option>
              {groupsFor(view.category).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
              ▾
            </span>
          </label>
        )}
        {webgl && (
          <button
            type="button"
            onClick={() => setListView(!listView)}
            aria-pressed={listView}
            className="flex h-8 items-center gap-2 rounded-full border border-line bg-panel px-3 text-xs text-ink backdrop-blur-md transition hover:border-line-strong hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-lavender"
          >
            {listView ? <OrbitIcon /> : <ListIcon />}
            <span className="hidden sm:inline">{listView ? "Galaxy view" : "List view"}</span>
          </button>
        )}
      </div>
    </header>
  );
}

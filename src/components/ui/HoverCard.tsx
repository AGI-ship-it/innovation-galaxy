"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { CATEGORIES, MATURITIES, getFamily } from "@/data/families";
import type { Category, Maturity } from "@/data/types";
import { getUseCase, placementsFor, plural, recordsFor } from "@/lib/data";
import { openPlanet } from "@/lib/actions";
import { useExplorer } from "@/lib/store";
import { ArrowUpRight, TrendUpIcon } from "./icons";

interface CardContent {
  eyebrow: string;
  title: string;
  body: ReactNode;
  cta: string;
}

function contentFor(id: string, category: Category | null): CardContent | null {
  const [kind, a, b] = id.split(":");

  if (kind === "cat") {
    const c = a as Category;
    const placements = placementsFor(c);
    const families = [...new Set(placements.map((p) => p.family.name))];
    return {
      eyebrow: `${plural(recordsFor(c).length, "use case")} · ${plural(placements.length, "family placement")}`,
      title: CATEGORIES[c].name,
      body: (
        <>
          <p className="text-sm leading-relaxed text-ink/85">{CATEGORIES[c].description}</p>
          <BulletList items={families} max={4} />
        </>
      ),
      cta: "Explore technology families",
    };
  }

  if (kind === "pl" && category) {
    const placement = placementsFor(category).find((p) => p.family.id === a && p.maturity === b);
    if (!placement) return null;
    return {
      eyebrow: `${MATURITIES[b as Maturity].label} · ${plural(placement.useCases.length, "use case")}`,
      title: getFamily(a).name,
      body: <BulletList items={placement.useCases.map((u) => u.title)} max={5} />,
      cta: "Explore use cases",
    };
  }

  if (kind === "uc") {
    const u = getUseCase(a);
    if (!u) return null;
    const text = [u.summary, ...u.steps.map((s, i) => `Step ${i + 1}: ${s}`)].join(" ");
    return {
      eyebrow: `${MATURITIES[u.maturity].label} · ${u.recommendation}`,
      title: u.title,
      body: (
        <>
          <p className="line-clamp-4 text-sm leading-relaxed text-ink/85 sm:line-clamp-5">{text}</p>
          <div className="mt-4 border-t border-line-strong pt-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-lavender">
              <TrendUpIcon />
              Value realised
            </p>
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-ink/90">{u.value}</p>
          </div>
        </>
      ),
      cta: "Open the full card",
    };
  }
  return null;
}

function BulletList({ items, max }: { items: string[]; max: number }) {
  const shown = items.slice(0, max);
  return (
    <ul className="mt-1 space-y-1.5">
      {shown.map((t) => (
        <li key={t} className="flex gap-2.5 text-sm leading-snug text-ink">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-ink" />
          {t}
        </li>
      ))}
      {items.length > max && <li className="pl-3.5 text-sm text-muted">and {items.length - max} more</li>}
    </ul>
  );
}

/**
 * Floating preview for the hovered / focused / tapped planet. Positioned by
 * HoverCardAnchor on desktop; a bottom sheet with an explicit button on mobile.
 */
export function HoverCard() {
  const hovered = useExplorer((s) => s.hovered);
  const category = useExplorer((s) => s.view.category);
  const cardOpen = useExplorer((s) => Boolean(s.view.useCaseId));
  const content = hovered && !cardOpen ? contentFor(hovered, category) : null;

  return (
    <AnimatePresence>
      {content && hovered && (
        <motion.div
          key={hovered}
          data-hover-card={hovered}
          role="group"
          aria-label="Planet preview"
          onFocus={() => useExplorer.getState().holdHover()}
          onBlur={() => useExplorer.getState().hoverLeave(hovered)}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-0 sm:w-[22rem]"
          onMouseEnter={() => useExplorer.getState().holdHover()}
          onMouseLeave={() => useExplorer.getState().hoverLeave(hovered)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            initial={{ y: 6, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => openPlanet(hovered)}
            className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-panel p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-5"
          >
            <span aria-hidden className="absolute left-6 top-0 h-[3px] w-14 bg-magenta" />
            <p className="text-xs text-lavender">{content.eyebrow}</p>
            <h2 className="mt-1.5 text-lg font-medium leading-snug text-ink">{content.title}</h2>
            <div className="mt-3">{content.body}</div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openPlanet(hovered);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2 text-xs font-medium text-ink ring-1 ring-line-strong transition hover:bg-magenta/30 hover:ring-magenta/60 focus-visible:outline-2 focus-visible:outline-lavender"
            >
              {content.cta} <ArrowUpRight />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

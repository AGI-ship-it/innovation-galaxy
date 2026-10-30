import { MATURITY_ORDER, familyOrder, getFamily } from "@/data/families";
import type { Category, Maturity, Recommendation, TechFamily, UseCaseRecord } from "@/data/types";
import { USE_CASES } from "@/data/useCases";

/** Titles use "&" in place of "and" (the deck spells it out). */
export const RECORDS: UseCaseRecord[] = USE_CASES.map((u) => ({ ...u, title: u.title.replace(/\band\b/gi, "&") }));

const RECOMMENDATION_ORDER: Recommendation[] = ["Quick win", "Consider for pilot", "Long-term invest", "Deprioritise"];

const recordById = new Map(RECORDS.map((r) => [r.id, r]));

export function getUseCase(id: string): UseCaseRecord | undefined {
  return recordById.get(id);
}

export function recordsFor(category: Category): UseCaseRecord[] {
  return RECORDS.filter((r) => r.category === category);
}

export function groupsFor(category: Category): string[] {
  return [...new Set(recordsFor(category).map((r) => r.group))].sort();
}

/** A technology family on one maturity orbit. Families can have several placements. */
export interface Placement {
  key: string;
  family: TechFamily;
  maturity: Maturity;
  useCases: UseCaseRecord[];
}

export function placementKey(familyId: string, maturity: Maturity) {
  return `${familyId}:${maturity}`;
}

export function placementsFor(category: Category): Placement[] {
  const map = new Map<string, Placement>();
  for (const r of recordsFor(category)) {
    const key = placementKey(r.familyId, r.maturity);
    let p = map.get(key);
    if (!p) {
      p = { key, family: getFamily(r.familyId), maturity: r.maturity, useCases: [] };
      map.set(key, p);
    }
    p.useCases.push(r);
  }
  return [...map.values()].sort(
    (a, b) =>
      MATURITY_ORDER.indexOf(a.maturity) - MATURITY_ORDER.indexOf(b.maturity) ||
      familyOrder(a.family.id) - familyOrder(b.family.id),
  );
}

/** Use cases of one family within a category, ordered by maturity, then recommendation. */
export function familyUseCases(category: Category, familyId: string): UseCaseRecord[] {
  return recordsFor(category)
    .filter((r) => r.familyId === familyId)
    .sort(
      (a, b) =>
        MATURITY_ORDER.indexOf(a.maturity) - MATURITY_ORDER.indexOf(b.maturity) ||
        RECOMMENDATION_ORDER.indexOf(a.recommendation) - RECOMMENDATION_ORDER.indexOf(b.recommendation) ||
        a.title.localeCompare(b.title),
    );
}


export function countByMaturity(records: UseCaseRecord[]): Record<Maturity, number> {
  const out: Record<Maturity, number> = { established: 0, scaling: 0, emerging: 0 };
  for (const r of records) out[r.maturity]++;
  return out;
}

export function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

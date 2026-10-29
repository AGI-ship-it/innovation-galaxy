export type Category = "service" | "internal";

/** Orbit order: established is the inner orbit, emerging the outer one. */
export type Maturity = "established" | "scaling" | "emerging";

/** Recommendation tag from the Use Case Discovery Pack. */
export type Recommendation = "Quick win" | "Consider for pilot" | "Long-term invest" | "Deprioritise";

export type PlanetKind = "plain" | "pearl" | "moon" | "crater" | "ice" | "banded";

export interface PlanetLook {
  kind: PlanetKind;
  /** Base colour of the surface. */
  tint: string;
  /** Secondary colour used for bands, maria or streaks. */
  accent?: string;
  /** Third colour, used by the smooth "plain" gradient. */
  accent2?: string;
  ring?: boolean;
  seed: number;
}

export interface TechFamily {
  id: string;
  /** Domain code in the discovery pack, e.g. "D09". */
  code: string;
  name: string;
  look: PlanetLook;
}

export interface SourceRef {
  file: string;
  slide: number;
}

export interface UseCase {
  id: string;
  title: string;
  category: Category;
  familyId: string;
  maturity: Maturity;
  /** Service group (service use cases) or business function (internal use cases). */
  group: string;
  summary: string;
  steps: string[];
  /** "The output is ..." sentence from "How it works". */
  output?: string;
  /** "It is needed because ..." sentence from "How it works". */
  need?: string;
  recommendation: Recommendation;
  /** Technology / platform as applied. */
  technology: string;
  value: string;
  implementer: string;
  applicability: string;
  citation: { label: string; url?: string };
  source: SourceRef;
}

export type UseCaseRecord = UseCase;

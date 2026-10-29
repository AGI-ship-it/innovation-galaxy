import { create } from "zustand";

/**
 * Planet labels are plain DOM rendered once outside the canvas (LabelLayer) and
 * positioned each frame by LabelPositioner. Planets publish their label specs here.
 */
export interface LabelSpec {
  key: string;
  planetId: string;
  variant: "label" | "face" | "caption" | "orbit";
  title: string;
  lines?: string[];
  ariaLabel?: string;
  dimmed?: boolean;
}

interface LabelState {
  labels: Record<string, LabelSpec>;
  put: (spec: LabelSpec) => void;
  remove: (key: string) => void;
}

export const useLabels = create<LabelState>((set) => ({
  labels: {},
  put: (spec) => set((s) => ({ labels: { ...s.labels, [spec.key]: spec } })),
  remove: (key) =>
    set((s) => {
      const labels = { ...s.labels };
      delete labels[key];
      return { labels };
    }),
}));

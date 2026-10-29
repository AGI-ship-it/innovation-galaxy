import { create } from "zustand";
import type { Category, Maturity } from "@/data/types";

export interface View {
  category: Category | null;
  familyId: string | null;
  useCaseId: string | null;
}

export type Level = "category" | "galaxy" | "family";

export const HOME: View = { category: null, familyId: null, useCaseId: null };

export function levelOf(view: View): Level {
  if (view.familyId && view.category) return "family";
  if (view.category) return "galaxy";
  return "category";
}

function depth(view: View) {
  return (view.category ? 1 : 0) + (view.familyId ? 1 : 0) + (view.useCaseId ? 1 : 0);
}

export interface NavRequest {
  view: View;
  direction: "in" | "out";
  /** World position of the planet to fly into, when navigating inwards. */
  focus?: [number, number, number];
  focusRadius?: number;
}

type MaturityFilter = Maturity | "all";

interface ExplorerState {
  view: View;
  /** Maturity highlight on the technology-family galaxy. */
  galaxyMaturity: MaturityFilter;
  /** Maturity tab inside a technology family. */
  familyMaturity: MaturityFilter;
  /** Service group / function filter, per category. */
  groupFilter: string | "all";
  hovered: string | null;
  interacting: boolean;
  request: NavRequest | null;
  direction: "in" | "out" | "initial";
  fading: boolean;
  /** True while a 3D scene is mounted and will animate navigation. */
  sceneActive: boolean;
  sceneReady: boolean;
  reducedMotion: boolean;
  listView: boolean;

  navigate: (
    view: View,
    opts?: { focus?: [number, number, number]; focusRadius?: number; maturity?: Maturity },
  ) => void;
  commit: (view: View, opts?: { push?: boolean }) => void;
  back: () => void;
  setHovered: (id: string | null) => void;
  /** Clears the hover after a short grace period, so the pointer can travel onto the hover card. */
  hoverLeave: (id: string) => void;
  /** Keeps the current hover alive (pointer is over the hover card). */
  holdHover: () => void;
  setInteracting: (v: boolean) => void;
  setFading: (v: boolean) => void;
  setGalaxyMaturity: (m: MaturityFilter) => void;
  setFamilyMaturity: (m: MaturityFilter) => void;
  setGroupFilter: (g: string | "all") => void;
  setSceneActive: (v: boolean) => void;
  setSceneReady: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  setListView: (v: boolean) => void;
}

export function viewToSearch(view: View) {
  const p = new URLSearchParams();
  if (view.category) p.set("c", view.category);
  if (view.familyId) p.set("f", view.familyId);
  if (view.useCaseId) p.set("u", view.useCaseId);
  const s = p.toString();
  return s ? `?${s}` : window.location.pathname;
}

let unhoverTimer: ReturnType<typeof setTimeout> | undefined;

export const useExplorer = create<ExplorerState>((set, get) => ({
  view: HOME,
  galaxyMaturity: "all",
  familyMaturity: "all",
  groupFilter: "all",
  hovered: null,
  interacting: false,
  request: null,
  direction: "initial",
  fading: false,
  sceneActive: false,
  sceneReady: false,
  reducedMotion: false,
  listView: false,

  navigate: (view, opts) => {
    const { view: current, sceneActive, request, listView } = get();
    if (request) return;
    const direction = depth(view) >= depth(current) ? "in" : "out";
    if (opts?.maturity) set({ familyMaturity: opts.maturity });
    else if (view.familyId && view.familyId !== current.familyId) set({ familyMaturity: "all" });
    if (!sceneActive || listView) {
      get().commit(view);
      set({ direction });
      return;
    }
    set({
      hovered: null,
      request: { view, direction, focus: opts?.focus, focusRadius: opts?.focusRadius },
    });
  },

  commit: (view, opts) => {
    const prev = get().view;
    const categoryChanged = prev.category !== view.category;
    set({
      view,
      request: null,
      hovered: null,
      direction: get().request?.direction ?? get().direction,
      ...(categoryChanged ? { groupFilter: "all", galaxyMaturity: "all" } : {}),
    });
    if (opts?.push !== false && typeof window !== "undefined") {
      window.history.pushState(null, "", viewToSearch(view));
    }
  },

  back: () => {
    const { view, navigate } = get();
    if (view.useCaseId) navigate({ ...view, useCaseId: null });
    else if (view.familyId) navigate({ ...view, familyId: null });
    else if (view.category) navigate(HOME);
  },

  setHovered: (hovered) => {
    clearTimeout(unhoverTimer);
    set({ hovered });
  },
  hoverLeave: (id) => {
    clearTimeout(unhoverTimer);
    unhoverTimer = setTimeout(() => {
      if (get().hovered === id) set({ hovered: null });
    }, 320);
  },
  holdHover: () => clearTimeout(unhoverTimer),
  setInteracting: (interacting) => set({ interacting }),
  setFading: (fading) => set({ fading }),
  setGalaxyMaturity: (galaxyMaturity) => set({ galaxyMaturity }),
  setFamilyMaturity: (familyMaturity) => set({ familyMaturity }),
  setGroupFilter: (groupFilter) => set({ groupFilter }),
  setSceneActive: (sceneActive) => set({ sceneActive }),
  setSceneReady: (sceneReady) => set({ sceneReady }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setListView: (listView) => set({ listView, hovered: null }),
}));

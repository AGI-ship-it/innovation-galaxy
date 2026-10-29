import type { Object3D } from "three";
import type { LabelSpec } from "./labels";

/**
 * Mutable bridge between the 3D scene and DOM overlays. Written and read every
 * frame, so it lives outside React state to avoid re-renders.
 */
export const registry = {
  planets: new Map<string, { object: Object3D; radius: number }>(),
  /** Every positioned label element by label key. */
  anchors: new Map<string, { el: HTMLElement; planetId: string; variant: LabelSpec["variant"] }>(),
};

/** Shared orbit clock. `speed` eases to 0 while the user interacts. */
export const orbitClock = { t: 0, speed: 1 };

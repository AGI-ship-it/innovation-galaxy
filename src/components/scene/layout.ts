import type { PlanetLook } from "@/data/types";
import type { Level } from "@/lib/store";

export interface Ellipse {
  a: number;
  b: number;
}

/** Inner → outer: established, scaling, emerging. */
export const GALAXY_ORBITS: Ellipse[] = [
  { a: 6, b: 5 },
  { a: 10.8, b: 9 },
  { a: 15.6, b: 13 },
];

export const FAMILY_ORBITS: Ellipse[] = [
  { a: 4.8, b: 4 },
  { a: 8.4, b: 7 },
  { a: 12, b: 10 },
];

export const CATEGORY_ORBIT: Ellipse = { a: 8, b: 6.2 };

/** Phase offsets per orbit so planets on neighbouring orbits do not line up. */
export const ORBIT_PHASE = [0.35, 1.25, 2.55];

/** Roughly Keplerian: outer orbits move more slowly. */
export function orbitSpeed(a: number) {
  return 0.05 * Math.pow(5 / a, 1.5);
}

/** Facilities: plain white globe; lighting alone gives it shape. */
export const CENTER_LOOK: PlanetLook = {
  kind: "plain",
  tint: "#ffffff",
  seed: 5,
};

export const CATEGORY_LOOKS: Record<"service" | "internal", PlanetLook> = {
  service: { kind: "plain", tint: "#e6dbff", accent: "#d2c1ff", accent2: "#ffe4f7", ring: true, seed: 211 },
  internal: { kind: "plain", tint: "#d1f4f9", accent: "#bad2fc", accent2: "#eefbff", seed: 223 },
};

const USE_CASE_LOOKS: PlanetLook[] = [
  { kind: "plain", tint: "#ffd8ed", accent: "#e9c1ff", accent2: "#ffeef8", seed: 0 },
  { kind: "plain", tint: "#d2edff", accent: "#c6d2ff", accent2: "#e4f9ff", seed: 0 },
  { kind: "plain", tint: "#ffedc4", accent: "#ffd6c1", accent2: "#fff9e2", seed: 0 },
  { kind: "plain", tint: "#caf9e8", accent: "#b6e5de", accent2: "#e9fff9", seed: 0 },
  { kind: "plain", tint: "#e9dcff", accent: "#d0c6ff", accent2: "#f7f2ff", seed: 0 },
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Stable per-use-case look; seeds are bucketed so textures are shared. */
export function lookForUseCase(id: string): PlanetLook {
  const h = hash(id);
  const base = USE_CASE_LOOKS[h % USE_CASE_LOOKS.length];
  return { ...base, seed: 300 + ((h >> 8) % 6) };
}

export interface Pose {
  position: [number, number, number];
  target: [number, number, number];
}

const POSES: Record<Level, Pose> = {
  category: { position: [0, 11, 18.5], target: [0, 0.6, -0.4] },
  galaxy: { position: [0, 21.5, 22], target: [0, 0, 0.4] },
  family: { position: [0, 14.5, 20], target: [0, 0.4, -0.2] },
};

/** Home camera pose, pulled back on narrow (portrait) viewports so all orbits fit. */
export function homePose(level: Level, aspect: number): Pose {
  const pose = POSES[level];
  const fit = aspect < 1.3 ? Math.min(2.1, Math.pow(1.3 / aspect, 0.85)) : 1;
  return {
    position: pose.position.map((v) => v * fit) as [number, number, number],
    target: pose.target,
  };
}

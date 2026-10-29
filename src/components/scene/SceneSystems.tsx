"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { orbitClock, registry } from "@/lib/registry";
import { useExplorer } from "@/lib/store";

/** Advances the shared orbit clock, easing to a stop while the user interacts. */
export function OrbitClockDriver() {
  useFrame((_, delta) => {
    const s = useExplorer.getState();
    const paused = s.reducedMotion || s.interacting || s.hovered !== null || s.request !== null;
    const k = 1 - Math.exp(-Math.min(delta, 0.1) * 3);
    orbitClock.speed += ((paused ? 0 : 1) - orbitClock.speed) * k;
    orbitClock.t += Math.min(delta, 0.1) * orbitClock.speed;
  });
  return null;
}

const v = new THREE.Vector3();

/**
 * Pins the DOM hover card next to the hovered planet each frame: above it when
 * there is room, otherwise below, clamped to the viewport.
 */
export function HoverCardAnchor() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);

  const place = (el: HTMLElement, entry: { object: THREE.Object3D; radius: number }) => {
    entry.object.getWorldPosition(v);
    const dist = v.distanceTo(camera.position);
    v.project(camera);
    const x = (v.x * 0.5 + 0.5) * size.width;
    const y = (-v.y * 0.5 + 0.5) * size.height;
    const pxRadius =
      (entry.radius / (dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))) * (size.height / 2);
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const gap = pxRadius * 1.25 + 18;
    // Keep clear of the header (title + maturity switch); open below the planet instead.
    const headerBottom = 176;
    let top = y - gap - h;
    if (top < headerBottom) top = y + gap + 64;
    top = Math.min(Math.max(top, headerBottom), size.height - h - 16);
    const left = Math.min(Math.max(x - w / 2, 16), size.width - w - 16);
    el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  };

  useFrame(() => {
    // Exiting cards keep tracking their own planet while they fade out.
    document.querySelectorAll<HTMLElement>("[data-hover-card]").forEach((el) => {
      if (size.width < 640) {
        el.style.transform = "";
        return;
      }
      const entry = registry.planets.get(el.dataset.hoverCard!);
      if (entry) place(el, entry);
    });
  });
  return null;
}

const point = new THREE.Vector3();

interface Rect {
  l: number;
  t: number;
  r: number;
  b: number;
}
type Side = "below" | "above" | "right" | "left";

const SIDES: Side[] = ["below", "above", "right", "left"];
const GAP = 6;
const lastSide = new WeakMap<HTMLElement, Side>();

const overlaps = (a: Rect, b: Rect) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;
const box = (l: number, t: number, w: number, h: number): Rect => ({ l, t, r: l + w, b: t + h });
const inflate = (r: Rect, p: number): Rect => ({ l: r.l - p, t: r.t - p, r: r.r + p, b: r.b + p });

function sideRect(side: Side, x: number, y: number, rad: number, w: number, h: number): Rect {
  switch (side) {
    case "below":
      return box(x - w / 2, y + rad + GAP, w, h);
    case "above":
      return box(x - w / 2, y - rad - GAP - h, w, h);
    case "right":
      return box(x + rad + GAP, y - h / 2, w, h);
    case "left":
      return box(x - rad - GAP - w, y - h / 2, w, h);
  }
}

/**
 * Collision-free label layout, recomputed every frame as planets orbit.
 * Fixed items (globe text, caption, planet discs, header and other UI
 * marked data-label-obstacle) are placed first; planet labels then take the
 * first free side of their planet (below, above, right, left), hovered and
 * nearest first; orbit names go last. Anything with no free spot hides
 * until there is room. Labels keep their side while it stays free, and
 * return to "below" only with some margin, so they don't flicker.
 */
export function LabelPositioner() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);

  useFrame(() => {
    const W = size.width;
    const H = size.height;
    const pxPerUnit = H / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

    // 1. Project every anchor point / planet to a screen disc.
    const discs = new Map<string, { x: number; y: number; r: number; dist: number; visible: boolean }>();
    for (const [id, p] of registry.planets) {
      p.object.getWorldPosition(point);
      const dist = point.distanceTo(camera.position);
      point.project(camera);
      discs.set(id, {
        x: (point.x * 0.5 + 0.5) * W,
        y: (-point.y * 0.5 + 0.5) * H,
        r: (p.radius * pxPerUnit) / dist,
        dist,
        visible: point.z <= 1,
      });
    }

    // 2. Read every label's size before writing anything (no layout thrash).
    const items = [...registry.anchors.values()].map((a) => ({
      ...a,
      w: a.el.offsetWidth,
      h: a.el.offsetHeight,
      disc: discs.get(a.planetId),
    }));

    // 3. Obstacles: UI chrome plus every planet disc (tagged with its owner).
    const obstacles: (Rect & { owner?: string })[] = [];
    document.querySelectorAll<HTMLElement>("[data-label-obstacle]").forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width && b.height) obstacles.push({ l: b.left, t: b.top, r: b.right, b: b.bottom });
    });
    for (const [id, d] of discs) {
      if (id.startsWith("orbit:") || !d.visible) continue;
      const r = d.r * 0.92;
      obstacles.push({ l: d.x - r, t: d.y - r, r: d.x + r, b: d.y + r, owner: id });
    }
    const free = (rect: Rect, owner: string) =>
      rect.l >= 8 &&
      rect.r <= W - 8 &&
      rect.t >= 8 &&
      rect.b <= H - 8 &&
      !obstacles.some((o) => o.owner !== owner && overlaps(rect, o));

    const show = (el: HTMLElement, rect: Rect, dist: number) => {
      el.style.transform = `translate3d(${rect.l}px, ${rect.t}px, 0)`;
      el.style.zIndex = String(Math.max(1, Math.round(1000 - dist * 10)));
      el.style.visibility = "visible";
      delete el.dataset.hidden;
    };
    const hide = (el: HTMLElement) => {
      el.dataset.hidden = "true";
    };

    // 4. Fixed text on the central planet.
    for (const it of items) {
      if (it.variant !== "face" && it.variant !== "caption") continue;
      const d = it.disc;
      if (!d?.visible) {
        it.el.style.visibility = "hidden";
        continue;
      }
      const rect =
        it.variant === "face"
          ? box(d.x - it.w / 2, d.y - it.h / 2, it.w, it.h)
          : box(d.x - it.w / 2, d.y + d.r + 10, it.w, it.h);
      show(it.el, rect, d.dist);
      if (it.variant === "caption") obstacles.push(rect);
    }

    // 5. Planet labels: hovered first, then nearest to the camera.
    const hovered = useExplorer.getState().hovered;
    const labels = items
      .filter((i) => i.variant === "label")
      .sort((a, b) =>
        a.planetId === hovered ? -1 : b.planetId === hovered ? 1 : (a.disc?.dist ?? 0) - (b.disc?.dist ?? 0),
      );
    for (const it of labels) {
      const d = it.disc;
      if (!d?.visible) {
        it.el.style.visibility = "hidden";
        continue;
      }
      const prev = lastSide.get(it.el) ?? "below";
      const order: Side[] = ["below", ...(prev === "below" ? [] : [prev]), ...SIDES.filter((s) => s !== "below" && s !== prev)];
      let side: Side | null = null;
      let rect: Rect | null = null;
      for (const s of order) {
        const candidate = sideRect(s, d.x, d.y, d.r, it.w, it.h);
        // Returning to "below" from another side needs extra room (hysteresis).
        const test = s === "below" && prev !== "below" ? inflate(candidate, 8) : candidate;
        if (free(test, it.planetId)) {
          side = s;
          rect = candidate;
          break;
        }
      }
      if (!rect && it.planetId === hovered) {
        side = "below";
        rect = sideRect("below", d.x, d.y, d.r, it.w, it.h);
      }
      if (rect && side) {
        lastSide.set(it.el, side);
        it.el.dataset.side = side;
        show(it.el, rect, d.dist);
        obstacles.push(rect);
      } else {
        hide(it.el);
      }
    }

    // 6. Orbit names last: below their ring point, else above, else hidden.
    for (const it of items) {
      if (it.variant !== "orbit") continue;
      const d = it.disc;
      if (!d?.visible) {
        it.el.style.visibility = "hidden";
        continue;
      }
      const under = box(d.x - it.w / 2, d.y + 4, it.w, it.h);
      const over = box(d.x - it.w / 2, d.y - 4 - it.h, it.w, it.h);
      const rect = free(under, it.planetId) ? under : free(over, it.planetId) ? over : null;
      if (rect) {
        show(it.el, rect, d.dist);
        obstacles.push(rect);
      } else {
        hide(it.el);
      }
    }
  });
  return null;
}

/** Flags the scene as ready once the first frame has rendered. */
export function ReadySignal() {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(() => useExplorer.getState().setSceneReady(true));
  });
  return null;
}

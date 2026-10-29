import * as THREE from "three";
import type { PlanetLook } from "@/data/types";

/* ── 3D simplex noise (after Stefan Gustavson, public domain) ── */

const GRAD3 = [
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1,
  0, 1, -1, 0, -1, -1,
];
const F3 = 1 / 3;
const G3 = 1 / 6;

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

function makeNoise(seed: number) {
  const rand = rng(seed);
  const p = new Uint8Array(256).map((_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const corner = (gi: number, x: number, y: number, z: number) => {
    let t = 0.6 - x * x - y * y - z * z;
    if (t < 0) return 0;
    t *= t;
    const g = gi * 3;
    return t * t * (GRAD3[g] * x + GRAD3[g + 1] * y + GRAD3[g + 2] * z);
  };

  return (xin: number, yin: number, zin: number) => {
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const z0 = zin - (k - t);
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 1, 0];
      else if (x0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 0, 1];
      else [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 1, 0, 1];
    } else {
      if (y0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 0, 1, 1];
      else if (x0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 0, 1, 1];
      else [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 1, 1, 0];
    }
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    const n0 = corner(perm[ii + perm[jj + perm[kk]]] % 12, x0, y0, z0);
    const n1 = corner(
      perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12,
      x0 - i1 + G3,
      y0 - j1 + G3,
      z0 - k1 + G3,
    );
    const n2 = corner(
      perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12,
      x0 - i2 + 2 * G3,
      y0 - j2 + 2 * G3,
      z0 - k2 + 2 * G3,
    );
    const n3 = corner(
      perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12,
      x0 - 1 + 3 * G3,
      y0 - 1 + 3 * G3,
      z0 - 1 + 3 * G3,
    );
    return 32 * (n0 + n1 + n2 + n3);
  };
}

type Noise = ReturnType<typeof makeNoise>;

function fbm(n: Noise, x: number, y: number, z: number, octaves: number) {
  let sum = 0;
  let amp = 0.5;
  let f = 1;
  for (let o = 0; o < octaves; o++) {
    sum += amp * n(x * f, y * f, z * f);
    f *= 2.03;
    amp *= 0.5;
  }
  return sum;
}

/* ── Surface generation ── */

const hexRgb = (hex: string) => {
  const c = new THREE.Color(hex);
  return [c.r, c.g, c.b];
};
const mix = (a: number[], b: number[], t: number) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

interface Crater {
  x: number;
  y: number;
  z: number;
  r: number;
}

function craters(seed: number, count: number, maxR: number): Crater[] {
  const rand = rng(seed * 7 + 3);
  return Array.from({ length: count }, () => {
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    return { x: s * Math.cos(th), y: u, z: s * Math.sin(th), r: maxR * (0.15 + rand() ** 2 * 0.85) };
  });
}

export interface PlanetTextures {
  map: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
}

const cache = new Map<string, PlanetTextures>();

export function planetTextures(look: PlanetLook, width = 512): PlanetTextures {
  const key = `${look.kind}|${look.tint}|${look.accent}|${look.accent2}|${look.seed}|${width}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const height = width / 2;
  const noise = makeNoise(look.seed);
  const warp = makeNoise(look.seed + 101);
  const base = hexRgb(look.tint);
  const accent = hexRgb(look.accent ?? look.tint);
  const side = hexRgb(look.accent2 ?? look.accent ?? look.tint);
  const octaves = width >= 1024 ? 6 : width >= 512 ? 5 : 4;
  const craterList =
    look.kind === "moon"
      ? craters(look.seed, 46, 0.22)
      : look.kind === "crater"
        ? craters(look.seed, 70, 0.26)
        : [];

  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  colorCanvas.width = bumpCanvas.width = width;
  colorCanvas.height = bumpCanvas.height = height;
  const cctx = colorCanvas.getContext("2d")!;
  const bctx = bumpCanvas.getContext("2d")!;
  const color = cctx.createImageData(width, height);
  const bump = bctx.createImageData(width, height);

  for (let py = 0; py < height; py++) {
    const lat = (0.5 - (py + 0.5) / height) * Math.PI;
    const cl = Math.cos(lat);
    const y = Math.sin(lat);
    for (let px = 0; px < width; px++) {
      const lon = ((px + 0.5) / width) * Math.PI * 2;
      const x = cl * Math.cos(lon);
      const z = -cl * Math.sin(lon);

      let rgb: number[];
      let h: number;

      switch (look.kind) {
        case "plain": {
          // Smooth, noise-free colour gradient: tint at the top, accent at the
          // bottom, accent2 sweeping in from one side. Shape comes from lighting.
          const vt = 0.5 - y * 0.5;
          rgb = mix(base, accent, vt * vt * (3 - 2 * vt));
          rgb = mix(rgb, side, Math.max(0, x) * 0.6);
          h = 0.5;
          break;
        }
        case "banded": {
          const w = fbm(warp, x * 2.2, y * 2.2, z * 2.2, 4);
          const band = Math.sin((y + w * 0.18) * 22 + fbm(noise, x, y * 3, z, 3) * 2.5);
          const fine = fbm(noise, x * 6, y * 30, z * 6, 3);
          const t = clamp01(0.62 + band * 0.22 + fine * 0.25);
          rgb = mix(base, accent, t);
          const storm = fbm(noise, x * 3 + 7, y * 3, z * 3, 3);
          if (storm > 0.32) rgb = mix(rgb, [0.97, 0.95, 1], (storm - 0.32) * 1.6);
          h = 0.5 + fine * 0.2;
          break;
        }
        case "ice": {
          const streak = fbm(noise, x * 1.6, y * 7, z * 1.6, octaves);
          const soft = fbm(warp, x * 3, y * 3, z * 3, 3);
          const t = clamp01(0.55 + streak * 0.6 + soft * 0.25);
          rgb = mix(accent, base, t);
          h = t;
          break;
        }
        case "pearl": {
          const cloud = fbm(noise, x * 2.4, y * 2.4, z * 2.4, octaves);
          const swirl = fbm(warp, x * 1.2 + cloud, y * 4, z * 1.2, 3);
          const t = clamp01(0.82 + cloud * 0.2 + swirl * 0.12);
          rgb = mix(accent, base, t);
          h = t;
          break;
        }
        default: {
          // moon & crater: fbm terrain + dark maria + crater bowls with bright rims
          const terrain = fbm(noise, x * 3, y * 3, z * 3, octaves);
          const maria = fbm(warp, x * 1.3, y * 1.3, z * 1.3, 3);
          h = 0.55 + terrain * 0.45;
          let shade = 0.8 + terrain * 0.45;
          if (maria > 0.08) shade -= Math.min(0.2, (maria - 0.08) * 1.1);
          for (const c of craterList) {
            const d = 1 - (x * c.x + y * c.y + z * c.z);
            const r2 = (c.r * c.r) / 2;
            if (d < r2 * 1.5) {
              const q = d / r2;
              if (q < 1) {
                shade -= (1 - q) * 0.22;
                h -= (1 - q) * 0.35;
              } else {
                const rim = 1 - Math.abs(q - 1.12) / 0.38;
                if (rim > 0) {
                  shade += rim * 0.16;
                  h += rim * 0.25;
                }
              }
            }
          }
          rgb = mix(accent, base, clamp01(shade));
          break;
        }
      }

      const i = (py * width + px) * 4;
      color.data[i] = clamp01(rgb[0]) * 255;
      color.data[i + 1] = clamp01(rgb[1]) * 255;
      color.data[i + 2] = clamp01(rgb[2]) * 255;
      color.data[i + 3] = 255;
      const hb = clamp01(h) * 255;
      bump.data[i] = bump.data[i + 1] = bump.data[i + 2] = hb;
      bump.data[i + 3] = 255;
    }
  }

  cctx.putImageData(color, 0, 0);
  bctx.putImageData(bump, 0, 0);

  const map = new THREE.CanvasTexture(colorCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  const result = { map, bump: bumpTex };
  cache.set(key, result);
  return result;
}

let ringTex: THREE.CanvasTexture | null = null;

/** Smooth radial band for planetary rings (u = inner → outer). */
export function ringTexture(): THREE.CanvasTexture {
  if (ringTex) return ringTex;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 4;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 256, 0);
  g.addColorStop(0, "rgba(235,228,255,0)");
  g.addColorStop(0.25, "rgba(235,228,255,0.75)");
  g.addColorStop(0.7, "rgba(222,210,255,0.6)");
  g.addColorStop(1, "rgba(222,210,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 4);
  ringTex = new THREE.CanvasTexture(canvas);
  ringTex.colorSpace = THREE.SRGBColorSpace;
  return ringTex;
}

let dotTex: THREE.CanvasTexture | null = null;

/** Soft round sprite for star points. */
export function dotTexture(): THREE.CanvasTexture {
  if (dotTex) return dotTex;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  dotTex = new THREE.CanvasTexture(canvas);
  return dotTex;
}

/** Textures are cached and shared across scenes; release them when the canvas unmounts. */
export function disposeTextureCache() {
  for (const t of cache.values()) {
    t.map.dispose();
    t.bump.dispose();
  }
  cache.clear();
  ringTex?.dispose();
  ringTex = null;
  dotTex?.dispose();
  dotTex = null;
}

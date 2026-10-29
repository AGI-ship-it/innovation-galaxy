"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useExplorer } from "@/lib/store";

const vertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.75 + 0.25 * sin(uTime * 1.3 + aPhase);
    vAlpha = twinkle;
    vColor = aColor;
    gl_PointSize = aSize * uPixelRatio * (60.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha);
  }
`;

const PALETTE = ["#ffffff", "#d9cffa", "#bcc8ff", "#f3d9ff"].map((c) => new THREE.Color(c));

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Layer {
  count: number;
  /** "shell" scatters far stars on a sphere; "disc" fills the galactic plane with dust. */
  shape: "shell" | "disc";
  size: [number, number];
  seed: number;
  spin?: number;
}

function PointLayer({ count, shape, size, seed, spin = 0 }: Layer) {
  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const reduced = useExplorer((s) => s.reducedMotion);

  const { geometry, material } = useMemo(() => {
    const r = rand(seed);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      if (shape === "shell") {
        const u = r() * 2 - 1;
        const th = r() * Math.PI * 2;
        const rad = 70 + r() * 90;
        const s = Math.sqrt(1 - u * u);
        pos.set([s * Math.cos(th) * rad, u * rad, s * Math.sin(th) * rad], i * 3);
      } else {
        const rad = 3 + Math.sqrt(r()) * 26;
        const th = r() * Math.PI * 2;
        pos.set([Math.cos(th) * rad, (r() - 0.5) * 1.6, Math.sin(th) * rad * 0.9], i * 3);
      }
      const c = PALETTE[Math.floor(r() * PALETTE.length)];
      col.set([c.r, c.g, c.b], i * 3);
      sizes[i] = size[0] + r() ** 3 * (size[1] - size[0]);
      phases[i] = r() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: geo, material: mat };
  }, [count, shape, size, seed]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    const p = points.current;
    if (reduced || !p) return;
    p.material.uniforms.uTime.value += delta;
    if (spin) p.rotation.y += delta * spin;
  });

  return <points ref={points} geometry={geometry} material={material} raycast={() => null} />;
}

const SHELL_SIZE: [number, number] = [1, 4];

let crossTex: THREE.CanvasTexture | null = null;

/** Four-point "+" glint for the occasional bright star. */
function crossTexture() {
  if (crossTex) return crossTex;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  for (const [w, h] of [
    [64, 3],
    [3, 64],
  ]) {
    const g = ctx.createLinearGradient(32 - w / 2, 32 - h / 2, 32 + w / 2, 32 + h / 2);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(32 - w / 2, 32 - h / 2, w, h);
  }
  crossTex = new THREE.CanvasTexture(c);
  return crossTex;
}

function Sparkles() {
  const items = useMemo(() => {
    const r = rand(77);
    return Array.from({ length: 14 }, () => {
      const u = r() * 1.6 - 0.6; // keep most above the horizon, where the camera looks
      const th = r() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const d = 90 + r() * 40;
      return { p: [s * Math.cos(th) * d, u * d, s * Math.sin(th) * d] as [number, number, number], k: 1.6 + r() * 1.4 };
    });
  }, []);
  const map = useMemo(() => crossTexture(), []);
  return (
    <>
      {items.map((it, i) => (
        <sprite key={i} position={it.p} scale={it.k} raycast={() => null}>
          <spriteMaterial map={map} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </>
  );
}

export function Starfield() {
  return (
    <>
      <PointLayer count={900} shape="shell" size={SHELL_SIZE} seed={7} />
      <Sparkles />
    </>
  );
}

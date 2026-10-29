"use client";

import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { PlanetLook } from "@/data/types";
import { useLabels } from "@/lib/labels";
import { orbitClock, registry } from "@/lib/registry";
import { useExplorer } from "@/lib/store";
import { GlobeDecal } from "./GlobeDecal";
import { planetTextures, ringTexture } from "./textures";

export interface OrbitSpec {
  a: number;
  b: number;
  phase: number;
  /** Radians per second at full orbit speed. */
  speed: number;
}

export interface PlanetLabel {
  title: string;
  lines?: string[];
}

interface PlanetProps {
  id: string;
  look: PlanetLook;
  radius: number;
  textureSize?: number;
  orbit?: OrbitSpec;
  position?: [number, number, number];
  dimmed?: boolean;
  label?: PlanetLabel;
  /** Text rendered on the planet's face as a flat DOM overlay. */
  faceText?: string;
  /** Brand mark + title printed onto the globe in 3D (used by the central planet). */
  decal?: string;
  caption?: string;
  ariaLabel?: string;
  glow?: string;
  /** Self-illumination, used by the central planet (0 = lit only by lights). */
  emissive?: number;
  onSelect?: (position: [number, number, number], radius: number) => void;
}

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = 1.0 - max(dot(vNormal, vView), 0.0);
    float a = pow(rim, 4.0) * uIntensity;
    gl_FragColor = vec4(uColor, a);
  }
`;

const DIM = new THREE.Color(0.2, 0.19, 0.23);
const WHITE = new THREE.Color(1, 1, 1);
const tmp = new THREE.Vector3();

function PlanetImpl({
  id,
  look,
  radius,
  textureSize = 256,
  orbit,
  position = [0, 0, 0],
  dimmed = false,
  label,
  faceText,
  decal,
  caption,
  ariaLabel,
  glow = "#b9a6ff",
  emissive = 0,
  onSelect,
}: PlanetProps) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const surface = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const halo = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const hovered = useExplorer((s) => s.hovered === id);
  const setHovered = useExplorer((s) => s.setHovered);
  const interactive = Boolean(onSelect);

  const textures = useMemo(() => planetTextures(look, textureSize), [look, textureSize]);

  const atmosphere = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        uniforms: { uColor: { value: new THREE.Color(glow) }, uIntensity: { value: 0.3 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [glow],
  );
  useEffect(() => () => atmosphere.dispose(), [atmosphere]);

  const ringGeometry = useMemo(() => {
    if (!look.ring) return null;
    const inner = radius * 1.4;
    const outer = radius * 2.0;
    const geo = new THREE.RingGeometry(inner, outer, 96, 1);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const r = Math.hypot(pos.getX(i), pos.getY(i));
      uv.setXY(i, (r - inner) / (outer - inner), 0.5);
    }
    return geo;
  }, [look.ring, radius]);
  useEffect(() => () => ringGeometry?.dispose(), [ringGeometry]);

  useEffect(() => {
    const object = group.current;
    if (!object) return;
    registry.planets.set(id, { object, radius });
    return () => {
      if (registry.planets.get(id)?.object === object) registry.planets.delete(id);
    };
  }, [id, radius]);

  // Publish DOM labels; LabelLayer renders them and LabelPositioner tracks this planet.
  const put = useLabels((s) => s.put);
  const remove = useLabels((s) => s.remove);
  const lines = label?.lines?.join("\u0000");
  useEffect(() => {
    if (!label) return;
    const key = `${id}#label`;
    put({
      key,
      planetId: id,
      variant: "label",
      title: label.title,
      lines: lines ? lines.split("\u0000") : undefined,
      ariaLabel,
      dimmed,
    });
    return () => remove(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, label?.title, lines, ariaLabel, dimmed, put, remove]);
  useEffect(() => {
    if (!faceText) return;
    const key = `${id}#face`;
    put({ key, planetId: id, variant: "face", title: faceText });
    return () => remove(key);
  }, [id, faceText, put, remove]);
  useEffect(() => {
    if (!caption) return;
    const key = `${id}#caption`;
    put({ key, planetId: id, variant: "caption", title: caption });
    return () => remove(key);
  }, [id, caption, put, remove]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (orbit) {
      const theta = orbit.phase + orbitClock.t * orbit.speed;
      g.position.set(Math.cos(theta) * orbit.a, 0, Math.sin(theta) * orbit.b);
    }
    const k = 1 - Math.exp(-delta * 8);
    if (body.current) {
      const s = THREE.MathUtils.lerp(body.current.scale.x, hovered ? 1.18 : 1, k);
      body.current.scale.setScalar(s);
    }
    if (surface.current) surface.current.rotation.y += delta * 0.06 * (0.25 + orbitClock.speed);
    material.current?.color.lerp(dimmed ? DIM : WHITE, k);
    const u = halo.current?.material.uniforms.uIntensity;
    if (u) u.value = THREE.MathUtils.lerp(u.value, dimmed ? 0.05 : hovered ? 1.1 : 0.3, k);
  });

  const select = () => {
    if (!onSelect || !group.current) return;
    group.current.getWorldPosition(tmp);
    onSelect([tmp.x, tmp.y, tmp.z], radius);
  };

  const handlers = interactive
    ? {
        onPointerOver: (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          if (e.pointerType === "touch") return;
          setHovered(id);
          document.body.style.cursor = "pointer";
        },
        onPointerOut: (e: ThreeEvent<PointerEvent>) => {
          if (e.pointerType === "touch") return;
          useExplorer.getState().hoverLeave(id);
          document.body.style.cursor = "";
        },
        onClick: (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          const touch = (e.nativeEvent as PointerEvent).pointerType === "touch";
          // On touch, the first tap previews the planet and the second one opens it.
          if (touch && useExplorer.getState().hovered !== id) {
            setHovered(id);
            return;
          }
          document.body.style.cursor = "";
          select();
        },
      }
    : {};

  return (
    <group ref={group} position={orbit ? undefined : position}>
      <group ref={body}>
        <mesh ref={surface} {...handlers}>
          <sphereGeometry args={[radius, 64, 32]} />
          <meshStandardMaterial
            ref={material}
            map={textures.map}
            bumpMap={textures.bump}
            bumpScale={look.kind === "moon" || look.kind === "crater" ? 2.2 : look.kind === "plain" ? 0 : 0.6}
            roughness={look.kind === "plain" ? 0.48 : 0.92}
            metalness={look.kind === "plain" ? 0.05 : 0}
            emissive={emissive ? "#ffffff" : "#000000"}
            emissiveMap={emissive ? textures.map : null}
            emissiveIntensity={emissive}
          />
        </mesh>
        <mesh ref={halo} scale={1.035} material={atmosphere} raycast={() => null}>
          <sphereGeometry args={[radius, 48, 24]} />
        </mesh>
        {decal && <GlobeDecal radius={radius} title={decal} />}
        {ringGeometry && (
          <mesh geometry={ringGeometry} rotation={[-Math.PI / 2 + 0.12, 0, 0.26]} raycast={() => null}>
            <meshStandardMaterial
              map={ringTexture()}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
              depthWrite={false}
              roughness={1}
              color={dimmed ? "#4a4652" : "#ffffff"}
            />
          </mesh>
        )}
      </group>

    </group>
  );
}

export const Planet = memo(PlanetImpl);

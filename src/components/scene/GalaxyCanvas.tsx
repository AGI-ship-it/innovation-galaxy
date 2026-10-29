"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { levelOf, useExplorer } from "@/lib/store";
import { CameraRig } from "./CameraRig";
import { CategoryScene } from "./CategoryScene";
import { FamilyScene } from "./FamilyScene";
import { GalaxyScene } from "./GalaxyScene";
import { HoverCardAnchor, LabelPositioner, OrbitClockDriver, ReadySignal } from "./SceneSystems";
import { Starfield } from "./Starfield";
import { disposeTextureCache, dotTexture } from "./textures";

const SPACE = "#0e0c12";

/** Faint lavender haze around the system centre, for warmth and depth. */
function CoreGlow() {
  const map = useMemo(() => dotTexture(), []);
  return (
    <sprite position={[0, -0.6, 0]} scale={26} raycast={() => null}>
      <spriteMaterial map={map} color="#8a6fd6" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

function ActiveScene() {
  const view = useExplorer((s) => s.view);
  const level = levelOf(view);
  if (level === "family") return <FamilyScene category={view.category!} familyId={view.familyId!} />;
  if (level === "galaxy") return <GalaxyScene category={view.category!} />;
  return <CategoryScene />;
}

export default function GalaxyCanvas() {
  const cardOpen = useExplorer((s) => Boolean(s.view.useCaseId));
  const setHovered = useExplorer((s) => s.setHovered);
  const [dpr, setDpr] = useState(1.75);
  // Post-processing is the first thing dropped on slower devices.
  const [effects, setEffects] = useState(true);

  useEffect(
    () => () => {
      disposeTextureCache();
      useExplorer.getState().setSceneReady(false);
    },
    [],
  );

  return (
    <Canvas
      className="!absolute inset-0"
      // Rendering pauses behind the full-screen use-case card.
      frameloop={cardOpen ? "demand" : "always"}
      dpr={[1, dpr]}
      camera={{ fov: 42, near: 0.1, far: 400, position: [0, 20, 36] }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      onPointerMissed={() => setHovered(null)}
      aria-label="Interactive 3D galaxy of technology use cases"
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.75)}
        onFallback={() => setEffects(false)}
        flipflops={3}
      />
      <color attach="background" args={[SPACE]} />
      <AdaptiveDpr pixelated={false} />
      {/* One soft key light from the upper left: every planet shows the same lit side and shadow. */}
      <ambientLight intensity={0.22} color="#d6cff0" />
      <directionalLight position={[-12, 14, 10]} intensity={3.4} color="#ffffff" />
      {/* Faint cool rim from behind keeps the shadow side from merging into the sky. */}
      <directionalLight position={[8, 2, -14]} intensity={0.45} color="#9b88e0" />

      <Starfield />
      <CoreGlow />
      <ActiveScene />

      <CameraRig />
      <OrbitClockDriver />
      <LabelPositioner />
      <HoverCardAnchor />
      <ReadySignal />

      {effects && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={0.88} luminanceSmoothing={0.15} intensity={0.35} radius={0.6} />
          <Vignette offset={0.35} darkness={0.45} eskil={false} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

"use client";

import { CameraControls, CameraControlsImpl } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { type NavRequest, levelOf, useExplorer } from "@/lib/store";
import { homePose } from "./layout";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Owns the camera: drag/zoom via CameraControls, cinematic fly-in towards a
 * selected planet, then a reveal of the next level pulling back from its centre.
 */
export function CameraRig() {
  const controls = useRef<CameraControls>(null);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const view = useExplorer((s) => s.view);
  const level = levelOf(view);
  const levelKey = `${view.category}|${view.familyId}`;
  const cardOpen = Boolean(view.useCaseId);
  const running = useRef(false);
  const revealFrom = useRef(1.6);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    useExplorer.getState().setSceneActive(true);
    return () => useExplorer.getState().setSceneActive(false);
  }, []);

  // Input configuration: rotate with left drag / one finger, zoom with wheel / pinch.
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const A = CameraControlsImpl.ACTION;
    c.mouseButtons.left = A.ROTATE;
    c.mouseButtons.right = A.NONE;
    c.mouseButtons.middle = A.DOLLY;
    c.mouseButtons.wheel = A.DOLLY;
    c.touches.one = A.TOUCH_ROTATE;
    c.touches.two = A.TOUCH_DOLLY;
    c.touches.three = A.NONE;
    c.minDistance = 3;
    c.maxDistance = 48;
    c.minPolarAngle = 0.12;
    c.maxPolarAngle = Math.PI * 0.47;
    c.draggingSmoothTime = 0.12;
  }, []);

  // Fly-in / fade sequence whenever a navigation is requested.
  useEffect(() => {
    return useExplorer.subscribe((state, prev) => {
      if (state.request && state.request !== prev.request && !running.current) {
        void runRequest(state.request);
      }
    });

    async function runRequest(req: NavRequest) {
      const c = controls.current;
      const store = useExplorer.getState();
      if (!c) return store.commit(req.view);
      running.current = true;
      const reduce = store.reducedMotion;
      const changesLevel =
        req.view.category !== store.view.category || req.view.familyId !== store.view.familyId;

      try {
        if (req.direction === "in" && req.focus && !reduce) {
          const target = new THREE.Vector3(...req.focus);
          const dir = c.camera.position.clone().sub(target).normalize();
          const pos = target.clone().addScaledVector(dir, (req.focusRadius ?? 0.5) * 5.5);
          c.smoothTime = 0.5;
          await Promise.race([
            c.setLookAt(pos.x, pos.y, pos.z, target.x, target.y, target.z, true),
            wait(1300),
          ]);
        }
        if (changesLevel) {
          store.setFading(true);
          await wait(reduce ? 0 : 260);
          revealFrom.current = req.direction === "in" ? 0.3 : 0.62;
        }
        store.commit(req.view);
      } finally {
        running.current = false;
      }
    }
  }, []);

  // Reveal each level: start close to its centre and glide back to the home pose.
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const store = useExplorer.getState();
    const pose = homePose(level, aspect);
    const reduce = store.reducedMotion;
    const f = reduce ? 1 : revealFrom.current;
    const [px, py, pz] = pose.position;
    const [tx, ty, tz] = pose.target;
    void c.setLookAt(px * f, py * f, pz * f, tx, ty, tz, false);
    c.smoothTime = store.direction === "initial" ? 1.4 : 0.85;
    void c.setLookAt(px, py, pz, tx, ty, tz, !reduce);
    revealFrom.current = 0.62;
    const t = setTimeout(() => store.setFading(false), 40);
    return () => clearTimeout(t);
    // aspect is read for the initial pose only; resizes are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelKey]);

  // Closing a use-case card returns to the family overview.
  const wasCardOpen = useRef(cardOpen);
  useEffect(() => {
    const c = controls.current;
    if (c && wasCardOpen.current && !cardOpen) {
      const pose = homePose(level, aspect);
      c.smoothTime = 0.8;
      void c.setLookAt(...pose.position, ...pose.target, !useExplorer.getState().reducedMotion);
    }
    wasCardOpen.current = cardOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardOpen]);

  // Keep the whole system in frame on orientation changes.
  useEffect(() => {
    const c = controls.current;
    if (!c || running.current) return;
    const pose = homePose(level, aspect);
    void c.setLookAt(...pose.position, ...pose.target, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspect > 1.3]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  // Slow idle drift around the system: constant gentle parallax between planets,
  // nebulae and the galactic disc. Stops for any interaction and under reduced motion.
  const idle = useRef(0);
  useFrame((_, delta) => {
    const s = useExplorer.getState();
    const busy =
      s.interacting || s.hovered !== null || s.request !== null || s.reducedMotion || running.current || cardOpen;
    idle.current = busy ? 0 : idle.current + delta;
    if (idle.current > 4 && controls.current) {
      const ease = Math.min(1, (idle.current - 4) / 3);
      controls.current.rotate(delta * 0.018 * ease, 0, false);
    }
  });

  return (
    <CameraControls
      ref={controls}
      makeDefault
      onStart={() => {
        clearTimeout(resumeTimer.current);
        useExplorer.getState().setInteracting(true);
      }}
      onEnd={() => {
        clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => useExplorer.getState().setInteracting(false), 1600);
      }}
    />
  );
}

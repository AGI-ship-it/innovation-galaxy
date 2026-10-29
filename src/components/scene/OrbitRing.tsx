"use client";

import { Line } from "@react-three/drei";
import { memo, useEffect, useMemo, useRef } from "react";
import type { Group } from "three";
import { useLabels } from "@/lib/labels";
import { registry } from "@/lib/registry";

interface OrbitRingProps {
  a: number;
  b: number;
  dashed?: boolean;
  active?: boolean;
  muted?: boolean;
  /** Orbit name printed on the ring's left edge, e.g. "Established". */
  label?: string;
}

/** Anchors a small DOM caption to the leftmost point of the ring. */
function OrbitName({ a, label, muted }: { a: number; label: string; muted: boolean }) {
  const anchor = useRef<Group>(null);
  const put = useLabels((s) => s.put);
  const remove = useLabels((s) => s.remove);
  const id = `orbit:${label}`;

  useEffect(() => {
    const object = anchor.current;
    if (!object) return;
    registry.planets.set(id, { object, radius: 0 });
    return () => {
      if (registry.planets.get(id)?.object === object) registry.planets.delete(id);
    };
  }, [id]);

  useEffect(() => {
    put({ key: id, planetId: id, variant: "orbit", title: label, dimmed: muted });
    return () => remove(id);
  }, [id, label, muted, put, remove]);

  return <group ref={anchor} position={[-a, 0, 0]} />;
}

function OrbitRingImpl({ a, b, dashed = false, active = false, muted = false, label }: OrbitRingProps) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 256; i++) {
      const t = (i / 256) * Math.PI * 2;
      pts.push([Math.cos(t) * a, 0, Math.sin(t) * b]);
    }
    return pts;
  }, [a, b]);

  return (
    <>
      {label && <OrbitName a={a} label={label} muted={muted} />}
      <Line
        points={points}
        color={active ? "#d9c9ff" : "#9a90b0"}
        lineWidth={active ? 1.6 : 1}
        transparent
        opacity={muted ? 0.08 : active ? 0.75 : 0.3}
        dashed={dashed}
        dashSize={0.18}
        gapSize={0.22}
        depthWrite={false}
        raycast={() => null}
      />
    </>
  );
}

export const OrbitRing = memo(OrbitRingImpl);

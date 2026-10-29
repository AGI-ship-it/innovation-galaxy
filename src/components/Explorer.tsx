"use client";

import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useSyncExternalStore } from "react";
import type { Category } from "@/data/types";
import { familyUseCases, getUseCase } from "@/lib/data";
import { HOME, type View, useExplorer } from "@/lib/store";
import { HoverCard } from "./ui/HoverCard";
import { LabelLayer } from "./ui/LabelLayer";
import { LevelHeader } from "./ui/LevelHeader";
import { ListExplorer } from "./ui/ListExplorer";
import { FadeOverlay, HintBar, SceneLoader } from "./ui/Overlays";
import { TopBar } from "./ui/TopBar";
import { UseCaseCard } from "./ui/UseCaseCard";

const GalaxyCanvas = dynamic(() => import("./scene/GalaxyCanvas"), { ssr: false });

let webglSupport: boolean | undefined;

function hasWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

/** Parses `?c=&f=&u=` and drops anything that does not resolve to real data. */
function viewFromUrl(): View {
  const p = new URLSearchParams(window.location.search);
  const c = p.get("c");
  if (c !== "service" && c !== "internal") return HOME;
  const category = c as Category;
  const f = p.get("f");
  if (!f || familyUseCases(category, f).length === 0) return { ...HOME, category };
  const u = p.get("u");
  const useCase = u ? getUseCase(u) : undefined;
  const useCaseId = useCase && useCase.category === category && useCase.familyId === f ? useCase.id : null;
  return { category, familyId: f, useCaseId };
}

export function Explorer() {
  const webgl = useSyncExternalStore<boolean | null>(noopSubscribe, hasWebGL, () => null);
  const listView = useExplorer((s) => s.listView);
  const sceneReady = useExplorer((s) => s.sceneReady);
  const showScene = webgl === true && !listView;

  useEffect(() => {
    const store = useExplorer.getState();
    store.commit(viewFromUrl(), { push: false });
    const onPop = () => useExplorer.getState().commit(viewFromUrl(), { push: false });
    window.addEventListener("popstate", onPop);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => useExplorer.getState().setReducedMotion(mq.matches);
    onMotion();
    mq.addEventListener("change", onMotion);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      const s = useExplorer.getState();
      if (s.view.useCaseId) return; // the card dialog handles its own Escape
      if (s.hovered) s.setHovered(null);
      else s.back();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("popstate", onPop);
      mq.removeEventListener("change", onMotion);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <main className="galaxy-bg relative h-dvh w-full overflow-hidden">
      {showScene && <GalaxyCanvas />}
      {showScene && <LabelLayer />}
      {webgl !== null && !showScene && <ListExplorer />}

      <TopBar webgl={webgl === true} />
      <LevelHeader />
      {showScene && <HoverCard />}
      {showScene && <HintBar />}
      <FadeOverlay />

      {webgl === false && (
        <p className="absolute inset-x-0 bottom-3 z-20 text-center text-xs text-faint">
          3D view needs WebGL, which is unavailable here. Showing the list view instead.
        </p>
      )}

      <UseCaseCard />

      <AnimatePresence>{(webgl === null || (showScene && !sceneReady)) && <SceneLoader key="loader" />}</AnimatePresence>
    </main>
  );
}

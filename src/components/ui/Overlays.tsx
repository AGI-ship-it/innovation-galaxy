"use client";

import { AnimatePresence, motion } from "motion/react";
import { useExplorer } from "@/lib/store";

export function SceneLoader() {
  return (
    <motion.div
      className="galaxy-bg absolute inset-0 z-[60] flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      role="status"
      aria-live="polite"
    >
      <div className="relative size-24">
        <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-white to-[#cbbff0] shadow-[0_0_40px_rgba(205,188,242,0.45)]" />
        <div className="loader-orbit absolute inset-0 rounded-full border border-white/15">
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-lavender" />
        </div>
      </div>
      <p className="text-sm tracking-[0.2em] text-muted uppercase">Charting the galaxy</p>
    </motion.div>
  );
}

/** Brief dip to black that hides the scene swap between levels. */
export function FadeOverlay() {
  const fading = useExplorer((s) => s.fading);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[25] bg-[#0b0910]"
      initial={false}
      animate={{ opacity: fading ? 1 : 0 }}
      transition={{ duration: fading ? 0.25 : 0.7, ease: "easeInOut" }}
    />
  );
}

function Hint({ keys, children }: { keys: string[]; children: string }) {
  return (
    <span className="flex items-center gap-1.5">
      {keys.map((k) => (
        <kbd
          key={k}
          className="rounded-md border border-line-strong bg-white/[0.04] px-1.5 py-px font-sans text-[0.65rem] text-muted"
        >
          {k}
        </kbd>
      ))}
      {children}
    </span>
  );
}

export function HintBar() {
  const visible = useExplorer((s) => s.hovered === null && !s.view.useCaseId);
  return (
    <AnimatePresence>
      {visible && (
        <motion.p
          data-label-obstacle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-x-0 bottom-4 z-20 text-center text-[0.7rem] text-faint sm:bottom-5 sm:text-xs"
        >
          <span className="hidden items-center justify-center gap-4 sm:flex">
            <Hint keys={["Drag"]}>rotate</Hint>
            <Hint keys={["Scroll"]}>zoom</Hint>
            <Hint keys={["Click"]}>open a planet</Hint>
            <Hint keys={["Tab"]}>step through</Hint>
            <Hint keys={["Esc"]}>back</Hint>
          </span>
          <span className="sm:hidden">Drag to rotate · Pinch to zoom · Tap a planet</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

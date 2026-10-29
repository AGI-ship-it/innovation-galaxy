"use client";

import { openPlanet } from "@/lib/actions";
import { type LabelSpec, useLabels } from "@/lib/labels";
import { registry } from "@/lib/registry";
import { useExplorer } from "@/lib/store";

/**
 * Splits a title over two lines, never starting a line with "&" or "/".
 * Prefers a longer second line ("ESG &" / "carbon tracking") unless that is
 * more than 3x lopsided, otherwise takes the most balanced break.
 * Short titles stay on one line; very long ones wrap naturally.
 */
function twoLineTitle(title: string) {
  if (title.length < 16 || title.length > 34) return title;
  const mid = title.length / 2;
  const breaks: number[] = [];
  for (let i = 0; i < title.length; i++) {
    if (title[i] !== " ") continue;
    if (title[i + 1] === "&" || title[i + 1] === "/" || title[i - 1] === "/") continue;
    breaks.push(i);
  }
  if (!breaks.length) return title;
  const closest = (list: number[]) =>
    list.reduce((best, i) => (Math.abs(i - mid) < Math.abs(best - mid) ? i : best));
  const bottomHeavy = breaks.filter((i) => {
    const top = i;
    const bottom = title.length - i - 1;
    return bottom >= top && bottom <= top * 3;
  });
  const at = closest(bottomHeavy.length ? bottomHeavy : breaks);
  return `${title.slice(0, at)}\n${title.slice(at + 1)}`;
}

function bind(spec: LabelSpec) {
  return (el: HTMLElement | null) => {
    if (!el) return;
    registry.anchors.set(spec.key, {
      el,
      planetId: spec.planetId,
      variant: spec.variant,
    });
    return () => {
      if (registry.anchors.get(spec.key)?.el === el) registry.anchors.delete(spec.key);
    };
  };
}

function PlanetLabelButton({ spec, order }: { spec: LabelSpec; order: number }) {
  const hovered = useExplorer((s) => s.hovered === spec.planetId);
  const setHovered = useExplorer((s) => s.setHovered);
  const leave = () => useExplorer.getState().hoverLeave(spec.planetId);

  return (
    <button
      type="button"
      ref={bind(spec)}
      className="planet-label"
      style={{ visibility: "hidden", animationDelay: `${order * 45}ms` }}
      data-hovered={hovered || undefined}
      data-dimmed={spec.dimmed || undefined}
      aria-label={spec.ariaLabel ?? spec.title}
      onMouseEnter={() => setHovered(spec.planetId)}
      onMouseLeave={leave}
      onFocus={() => setHovered(spec.planetId)}
      onBlur={leave}
      onClick={() => openPlanet(spec.planetId)}
    >
      <span className="planet-label__title">{twoLineTitle(spec.title)}</span>
      {spec.lines?.map((line, i) => (
        <span key={i} className={i === 0 ? "planet-label__count" : "planet-label__meta"}>
          {line}
        </span>
      ))}

    </button>
  );
}

const VARIANT_CLASS: Record<LabelSpec["variant"], string> = {
  label: "planet-label",
  face: "planet-face",
  caption: "planet-caption",
  orbit: "orbit-label",
};

/** All planet labels for the current level, in one React tree over the canvas. */
export function LabelLayer() {
  const labels = useLabels((s) => s.labels);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {Object.values(labels).map((spec, i) =>
        spec.variant === "label" ? (
          <PlanetLabelButton key={spec.key} spec={spec} order={i} />
        ) : (
          <span
            key={spec.key}
            ref={bind(spec)}
            aria-hidden
            data-dimmed={spec.dimmed || undefined}
            style={{ visibility: "hidden", animationDelay: `${i * 45}ms` }}
            className={VARIANT_CLASS[spec.variant]}
          >
            {spec.title}
          </span>
        ),
      )}
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { CATEGORIES, MATURITIES } from "@/data/families";
import type { UseCaseRecord } from "@/data/types";
import { familyUseCases, getUseCase } from "@/lib/data";
import { useExplorer } from "@/lib/store";
import { ArrowLeft, ArrowRight, TrendUpIcon } from "./icons";

const SECTIONS = [
  { id: "uc-overview", label: "Overview" },
  { id: "uc-value", label: "Value realised", icon: true },
  { id: "uc-context", label: "Context & source" },
] as const;

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

export function UseCaseCard() {
  const view = useExplorer((s) => s.view);
  const useCase = view.useCaseId ? getUseCase(view.useCaseId) : undefined;

  return (
    <AnimatePresence>
      {useCase && view.category && view.familyId && (
        <CardDialog key="card" useCase={useCase} siblings={familyUseCases(view.category, view.familyId)} />
      )}
    </AnimatePresence>
  );
}

function CardDialog({ useCase, siblings }: { useCase: UseCaseRecord; siblings: UseCaseRecord[] }) {
  const commit = useExplorer((s) => s.commit);
  const back = useExplorer((s) => s.back);
  const view = useExplorer((s) => s.view);
  const scroller = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  const index = siblings.findIndex((s) => s.id === useCase.id);
  const go = (delta: number) => {
    const next = siblings[(index + delta + siblings.length) % siblings.length];
    if (next && next.id !== useCase.id) commit({ ...view, useCaseId: next.id });
  };

  // Focus management: move focus into the dialog, restore on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [useCase.id]);

  // Scroll-spy for the section tabs.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { root, rootMargin: "0px 0px -60% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [useCase.id]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      back();
    } else if (e.key === "ArrowRight" && !(e.target instanceof HTMLSelectElement)) go(1);
    else if (e.key === "ArrowLeft" && !(e.target instanceof HTMLSelectElement)) go(-1);
  };

  const maturity = MATURITIES[useCase.maturity];
  const reduced = useExplorer.getState().reducedMotion;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="uc-title"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0910]/70 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.3 }}
    >
      <motion.div
        className="flex max-h-full w-full max-w-[52rem] flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[#26212c] via-[#1d1922] to-[#18151c] shadow-2xl"
        initial={{ y: reduced ? 0 : 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduced ? 0 : 24, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line-strong bg-white/[0.03] px-4 py-2.5 sm:px-6">
          <button
            ref={closeRef}
            type="button"
            onClick={back}
            className="flex items-center gap-2 rounded text-sm text-ink transition hover:text-lavender focus-visible:outline-2 focus-visible:outline-lavender"
          >
            <ArrowLeft /> Back to planet
          </button>
          <div className="flex items-center gap-4 text-ink sm:gap-6">
            <span className="text-xs tabular-nums sm:text-sm" aria-live="polite">
              {index + 1} of {siblings.length}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={siblings.length < 2}
              aria-label="Previous use case"
              className="rounded text-xl text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-lavender disabled:opacity-30"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={siblings.length < 2}
              aria-label="Next use case"
              className="rounded text-xl text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-lavender disabled:opacity-30"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <nav aria-label="Card sections" className="border-b border-line-strong px-2 sm:px-4">
          <ul className="flex gap-1 overflow-x-auto scrollbar-thin">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={() =>
                    document.getElementById(s.id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
                  }
                  className={`relative flex items-center gap-1.5 whitespace-nowrap px-2 py-2 text-xs transition focus-visible:outline-2 focus-visible:outline-lavender sm:px-3 ${
                    active === s.id ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {s.label}
                  {"icon" in s && <TrendUpIcon className="text-lavender" />}
                  {active === s.id && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-magenta" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Body */}
        <div ref={scroller} className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.article
              key={useCase.id}
              initial={{ opacity: 0, x: reduced ? 0 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduced ? 0 : -12 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              className="px-4 pb-6 pt-3 sm:px-6"
            >
              <section id="uc-overview" className="scroll-mt-4">
                <div className="flex items-center justify-between rounded-xl border border-magenta/40 bg-magenta/[0.07] px-4 py-2.5 sm:px-5">
                  <span className="text-xs text-muted">Recommendation</span>
                  <span className="text-sm text-ink">{useCase.recommendation}</span>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  <Stat label="Technology maturity" value={maturity.label} />
                  <Stat label="Portfolio" value={CATEGORIES[useCase.category].short} />
                  <Stat label="Implementer" value={useCase.implementer} small />
                </dl>

                <h2
                  id="uc-title"
                  className="mt-4 max-w-2xl text-balance text-lg font-medium leading-snug tracking-tight text-ink sm:text-[1.35rem]"
                >
                  {titleCase(useCase.title)}
                </h2>

                <div
                  id="uc-value"
                  className="mt-4 scroll-mt-4 rounded-xl border-l-4 border-magenta bg-gradient-to-br from-[#3a2c44] via-[#2f2738] to-[#2c2140] px-4 py-3 sm:px-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-6 items-center justify-center rounded-full border border-magenta/60 text-xs text-lavender">
                      <TrendUpIcon className="size-3.5" />
                    </span>
                    <h3 className="text-[13px] font-semibold text-ink">Value Realised</h3>
                  </div>
                  <p className="mt-2 text-sm leading-snug text-ink sm:text-[15px]">{useCase.value}</p>
                  <p className="mt-1.5 text-[11px] text-muted">Source: {useCase.citation.label}</p>
                </div>

                <hr className="my-5 border-line-strong" />

                <SectionHeading n="01">How It Works</SectionHeading>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink sm:text-sm">{useCase.summary}</p>
                <ol className="mt-3 space-y-2">
                  {useCase.steps.map((s, i) => (
                    <li key={i} className="rounded-xl border border-line border-l-4 border-l-white/30 bg-black/15 px-3.5 py-2 sm:px-4">
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ink/85">Step {i + 1}:</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-ink sm:text-sm">{s}</p>
                    </li>
                  ))}
                </ol>
                {(useCase.output || useCase.need) && (
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                    {useCase.output && <Fact label="Output">{stripLead(useCase.output, /^The outputs? (?:is|are)\s+/)}</Fact>}
                    {useCase.need && <Fact label="Why It Is Needed">{stripLead(useCase.need, /^It is needed because\s+/)}</Fact>}
                  </div>
                )}
              </section>

              <section id="uc-context" className="mt-7 scroll-mt-4">
                <SectionHeading n="02">Context &amp; Source</SectionHeading>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  <Fact label="Service Group / Function">{useCase.group}</Fact>
                  <Fact label="Technology As Applied">{useCase.technology}</Fact>
                  <Fact label="Applicability To AGFS" wide>
                    {useCase.applicability}
                  </Fact>
                  <Fact label="Source Citation" wide>
                    {useCase.citation.url ? (
                      <a
                        href={useCase.citation.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-magenta underline-offset-4 transition hover:text-lavender"
                      >
                        {useCase.citation.label}
                      </a>
                    ) : (
                      useCase.citation.label
                    )}
                  </Fact>
                </div>
              </section>
            </motion.article>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Drops the lead-in phrase ("The output is", "It is needed because") and capitalises the rest. */
function stripLead(sentence: string, lead: RegExp) {
  const rest = sentence.replace(lead, "");
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-xl border border-line-strong bg-black/10 px-3.5 py-2 sm:px-4">
      <dt className="text-[11px] text-muted">{label}</dt>
      <dd className={`mt-0.5 text-ink ${small ? "text-[13px] leading-snug" : "text-sm"}`}>{value}</dd>
    </div>
  );
}

function SectionHeading({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 text-sm font-semibold text-ink">
      <span className="flex size-6 items-center justify-center rounded-full border border-magenta/50 font-mono text-[10px] font-medium text-ink/90">
        {n}
      </span>
      {children}
    </h3>
  );
}

function Fact({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`rounded-xl border border-line-strong bg-black/10 px-3.5 py-2.5 sm:px-4 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="text-xs font-semibold text-ink">{label}</p>
      <p className="mt-0.5 text-[13px] leading-relaxed text-ink/90">{children}</p>
    </div>
  );
}

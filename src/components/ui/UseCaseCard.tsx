"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { CATEGORIES, MATURITIES } from "@/data/families";
import type { UseCaseRecord } from "@/data/types";
import { familyUseCases, getUseCase } from "@/lib/data";
import { useExplorer } from "@/lib/store";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";

const SECTIONS = [
  { id: "uc-overview", label: "Overview" },
  { id: "uc-context", label: "Context & source" },
  { id: "uc-value", label: "Value realised", icon: true },
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
      className="fixed inset-0 z-50 flex justify-center bg-[#0b0910]/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.3 }}
    >
      <motion.div
        className="flex h-full w-full max-w-[78rem] flex-col overflow-hidden border-x border-line bg-gradient-to-b from-[#26212c] via-[#1d1922] to-[#18151c] shadow-2xl"
        initial={{ y: reduced ? 0 : 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduced ? 0 : 24, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line-strong bg-white/[0.03] px-5 py-4 sm:px-8 sm:py-5">
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
        <nav aria-label="Card sections" className="border-b border-line-strong px-3 sm:px-6">
          <ul className="flex gap-1 overflow-x-auto scrollbar-thin">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={() =>
                    document.getElementById(s.id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
                  }
                  className={`relative flex items-center gap-1.5 whitespace-nowrap px-2 py-3 text-sm transition focus-visible:outline-2 focus-visible:outline-lavender sm:px-3 ${
                    active === s.id ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {s.label}
                  {"icon" in s && <ArrowUpRight />}
                  {active === s.id && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-magenta" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Body */}
        <div ref={scroller} className="scrollbar-thin flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.article
              key={useCase.id}
              initial={{ opacity: 0, x: reduced ? 0 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduced ? 0 : -12 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              className="px-5 pb-12 pt-4 sm:px-8"
            >
              <section id="uc-overview" className="scroll-mt-4">
                <div className="flex items-center justify-between rounded-xl border border-magenta/40 bg-magenta/[0.07] px-5 py-4 sm:px-6">
                  <span className="text-xs text-muted sm:text-sm">Recommendation</span>
                  <span className="text-base text-ink">{useCase.recommendation}</span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  <Stat label="Technology maturity" value={maturity.label} />
                  <Stat label="Portfolio" value={CATEGORIES[useCase.category].short} />
                  <Stat label="Implementer" value={useCase.implementer} small />
                </dl>

                <h2
                  id="uc-title"
                  className="mt-8 max-w-3xl text-balance text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-[2.6rem]"
                >
                  {titleCase(useCase.title)}
                </h2>

                <hr className="my-8 border-line-strong" />

                <SectionHeading n="01">How It Works</SectionHeading>
                <p className="mt-5 text-base leading-relaxed text-ink">{useCase.summary}</p>
                <ol className="mt-5 space-y-3">
                  {useCase.steps.map((s, i) => (
                    <li key={i} className="rounded-xl border border-line border-l-4 border-l-white/30 bg-black/15 px-5 py-4 sm:px-6">
                      <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink/85">Step {i + 1}:</p>
                      <p className="mt-2 text-base leading-relaxed text-ink">{s}</p>
                    </li>
                  ))}
                </ol>
                {(useCase.output || useCase.need) && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {useCase.output && <Fact label="Output">{stripLead(useCase.output, /^The outputs? (?:is|are)\s+/)}</Fact>}
                    {useCase.need && <Fact label="Why It Is Needed">{stripLead(useCase.need, /^It is needed because\s+/)}</Fact>}
                  </div>
                )}
              </section>

              <section id="uc-context" className="mt-14 scroll-mt-4">
                <SectionHeading n="02">Context &amp; Source</SectionHeading>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
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

              <section
                id="uc-value"
                className="relative mt-14 scroll-mt-4 overflow-hidden rounded-2xl border-l-4 border-magenta bg-gradient-to-br from-[#3a2c44] via-[#2f2738] to-[#2c2140] px-6 py-7 sm:px-9 sm:py-9"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-10 items-center justify-center rounded-full border border-magenta/60 text-xl text-lavender sm:size-12 sm:text-2xl">
                    <ArrowUpRight />
                  </span>
                  <h3 className="text-lg font-semibold text-ink">Value Realised</h3>
                </div>
                <p className="mt-5 text-xl leading-snug text-ink sm:text-2xl">{useCase.value}</p>
                <p className="mt-5 text-xs text-muted sm:text-sm">
                  Source: {useCase.citation.label}
                </p>
              </section>

              <p className="mt-6 text-xs text-muted">
                {useCase.source.file} / slide {useCase.source.slide}
              </p>
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
    <div className="rounded-xl border border-line-strong bg-black/10 px-5 py-4 sm:px-6 sm:py-5">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={`mt-1.5 text-ink ${small ? "text-sm leading-snug" : "text-xl"}`}>{value}</dd>
    </div>
  );
}

function SectionHeading({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-4 text-lg font-semibold text-ink">
      <span className="flex size-9 items-center justify-center rounded-full border border-magenta/50 font-mono text-xs font-medium text-ink/90">
        {n}
      </span>
      {children}
    </h3>
  );
}

function Fact({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`rounded-xl border border-line-strong bg-black/10 px-5 py-4 sm:px-6 sm:py-5 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="text-sm font-semibold text-ink sm:text-base">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/90 sm:text-base">{children}</p>
    </div>
  );
}

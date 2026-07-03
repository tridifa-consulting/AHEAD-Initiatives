"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";
import CountUp from "./CountUp";

const ease = [0.22, 1, 0.36, 1] as const;

/** Verified metrics (seeded from the original site). Used whenever the CMS
 *  value is missing or malformed, so the hero can never show 0 or -1. */
const VERIFIED_STATS = [
  { value: "25+", label: "Gram Panchayat Partnerships" },
  { value: "82",  label: "Published Materials" },
  { value: "16+", label: "Years of Impact" },
  { value: "30+", label: "Core Team Members" },
];

function safeStats(stats: { value?: unknown; label?: unknown }[] | undefined) {
  const ok = (stats ?? []).filter(
    (s): s is { value: string; label: string } =>
      typeof s?.value === "string" && /^\d+/.test(s.value) &&
      typeof s?.label === "string" && s.label.length > 0
  );
  return ok.length >= 3 ? ok : VERIFIED_STATS;
}

export default function Hero({
  title,
  subtitle,
  stats,
  slides,
}: {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  slides: MediaRow[];
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 0);
    if (slides.length < 2 || reduced) return () => clearTimeout(t);
    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length), 7000
    );
    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length, reduced]);

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#16324F]">

      {/* ── Photo layer: cross-fade via AnimatePresence ──────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 1.8, ease: "easeInOut" }}
        >
          {slides[index] && (
            <motion.div
              className="absolute inset-0"
              initial={reduced ? {} : { scale: 1 }}
              animate={reduced ? {} : { scale: 1.07 }}
              transition={{ duration: 9, ease: "linear" }}
            >
              <Image
                src={slides[index].file_path ?? slides[index].url ?? ""}
                alt={t(slides[index].alt_text)}
                fill priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient scrim ───────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d1f33] via-[#16324F]/72 to-[#16324F]/25" />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-14 pt-36 sm:px-6 lg:px-8">

        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#E9B44C]"
          initial={loaded && !reduced ? { opacity: 0, y: 12 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
        >
          Eastern India · since 2009
        </motion.p>

        <motion.h1
          className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] tracking-tight text-[#FAF7F0] sm:text-6xl lg:text-7xl"
          initial={loaded && !reduced ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-[#FAF7F0]/80 sm:text-lg"
          initial={loaded && !reduced ? { opacity: 0, y: 16 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.65, ease }}
        >
          {subtitle}
        </motion.p>

        {/* Stats band */}
        <motion.div
          className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-[#E9B44C]/25 pt-9 sm:grid-cols-4"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {safeStats(stats).map((s, i) => (
            <motion.div
              key={s.label}
              initial={loaded && !reduced ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.08, duration: 0.5 }}
            >
              <div className="font-serif text-4xl font-semibold text-[#FAF7F0] sm:text-5xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-[#FAF7F0]/60">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#story"
          aria-label="Begin the story"
          className="mt-10 inline-flex w-fit items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#FAF7F0]/60 transition-colors hover:text-[#E9B44C]"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Begin the story
          <motion.span
            aria-hidden
            animate={reduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>

      {/* Slide dots */}
      {slides.length > 1 && (
        <div
          aria-label="Photograph carousel"
          className="absolute bottom-5 right-4 z-20 flex gap-1.5 sm:right-8"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              aria-pressed={i === index}
              className="h-1 rounded-full bg-[#FAF7F0]/40 transition-all duration-300"
              style={{ width: i === index ? 24 : 8, backgroundColor: i === index ? "#E9B44C" : undefined }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

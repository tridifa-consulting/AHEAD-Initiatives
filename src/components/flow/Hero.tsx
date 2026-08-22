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
  { value: "82", label: "Published Materials" },
  { value: "16+", label: "Years of Impact" },
  { value: "30+", label: "Core Team Members" },
];

function safeStats(stats: { value?: unknown; label?: unknown }[] | undefined) {
  const ok = (stats ?? []).filter(
    (s): s is { value: string; label: string } =>
      typeof s?.value === "string" &&
      /^\d+/.test(s.value) &&
      typeof s?.label === "string" &&
      s.label.length > 0
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
    const timeout = setTimeout(() => setLoaded(true), 0);

    if (slides.length < 2 || reduced) {
      return () => clearTimeout(timeout);
    }

    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      7000
    );

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length, reduced]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0f3f3e]"
    >
      {/* Photo layer: cross-fade via AnimatePresence */}
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
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Teal archival colour grading */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#06282c] via-[#0f3f3e]/78 to-[#123c46]/28"
      />

      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(216,164,65,0.18),transparent_28rem),radial-gradient(circle_at_84%_22%,rgba(185,101,67,0.13),transparent_30rem),linear-gradient(90deg,rgba(6,40,44,0.76),rgba(6,40,44,0.24)_55%,rgba(6,40,44,0.68))]"
      />

      {/* Subtle handmade paper / film grain feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,248,234,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,234,0.04) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      {/* Warm bottom depth */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 z-10 h-52 bg-gradient-to-t from-[#06282c] via-[#06282c]/72 to-transparent"
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-12 pt-36 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <div className="max-w-5xl">
          <motion.div
            className="mb-5 flex flex-wrap items-center gap-3"
            initial={loaded && !reduced ? { opacity: 0, y: 12 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            <span className="h-px w-12 bg-[#d8a441]/75" />
            <p className="text-xs font-extrabold uppercase tracking-[0.36em] text-[#d8a441]">
              Eastern India · since 2009
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={loaded && !reduced ? { opacity: 0, y: 20 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75, ease }}
          >
            <div
              aria-hidden
              className="absolute -left-5 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-[#d8a441]/75 via-[#b96543]/58 to-transparent lg:block"
            />

            <h1 className="max-w-4xl font-serif text-[3.35rem] font-bold leading-[1.02] tracking-[-0.045em] text-[#fff8ea] drop-shadow-[0_20px_48px_rgba(0,0,0,0.34)] sm:text-6xl lg:text-[4.8rem]">
              {title}
            </h1>
          </motion.div>

          <motion.p
            className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#fff8ea]/86 sm:text-xl sm:leading-9"
            initial={loaded && !reduced ? { opacity: 0, y: 16 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65, ease }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Stats band */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 border-t border-[#d8a441]/30 pt-6 sm:grid-cols-4 sm:gap-4 lg:mt-14 lg:pt-7"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {safeStats(stats).map((s, i) => (
            <motion.div
              key={s.label}
              className="group rounded-2xl border border-[#fff8ea]/14 bg-[#fff8ea]/[0.085] px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8a441]/40 hover:bg-[#fff8ea]/[0.12] sm:px-5 sm:py-5"
              initial={loaded && !reduced ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.08, duration: 0.5 }}
            >
              <div className="font-serif text-4xl font-bold leading-none text-[#fff8ea] sm:text-5xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-2 text-[0.68rem] font-extrabold uppercase leading-5 tracking-[0.18em] text-[#fff8ea]/68">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#story"
          aria-label="Begin the story"
          className="mt-9 inline-flex w-fit items-center gap-3 rounded-full border border-[#fff8ea]/14 bg-[#fff8ea]/[0.07] px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.25em] text-[#fff8ea]/72 backdrop-blur-md transition-all duration-300 hover:border-[#d8a441]/45 hover:bg-[#d8a441]/12 hover:text-[#d8a441]"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Begin the story
          <motion.span
            aria-hidden
            className="text-base leading-none"
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
          className="absolute bottom-5 right-4 z-20 flex items-center gap-1.5 rounded-full border border-[#fff8ea]/12 bg-[#06282c]/35 px-2 py-1.5 backdrop-blur-md sm:right-8"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              aria-pressed={i === index}
              className="h-1.5 rounded-full bg-[#fff8ea]/40 transition-all duration-300"
              style={{
                width: i === index ? 26 : 8,
                backgroundColor: i === index ? "#d8a441" : undefined,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

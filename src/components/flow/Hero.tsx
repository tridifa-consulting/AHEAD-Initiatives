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
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#083344]"
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
              animate={reduced ? {} : { scale: 1.06 }}
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

      {/* NGO-style blue/aqua colour grading */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#031F2E] via-[#064E7A]/78 to-[#075985]/22"
      />

      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(103,232,249,0.14),transparent_28rem),radial-gradient(circle_at_82%_18%,rgba(216,164,65,0.12),transparent_30rem),linear-gradient(90deg,rgba(3,31,46,0.82),rgba(3,31,46,0.34)_52%,rgba(3,31,46,0.72))]"
      />

      {/* Subtle institutional grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,248,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,234,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Lower readability fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 z-10 h-56 bg-gradient-to-t from-[#031F2E] via-[#031F2E]/76 to-transparent"
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
            <span className="h-px w-12 bg-[#67E8F9]/65" />
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-[#FACC15]">
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
              className="absolute -left-5 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-[#67E8F9]/58 via-[#FACC15]/45 to-transparent lg:block"
            />

            <h1 className="max-w-5xl font-serif text-[3.45rem] font-bold leading-[0.98] tracking-[-0.035em] text-[#FFF8EA] drop-shadow-[0_22px_52px_rgba(0,0,0,0.38)] sm:text-[4.4rem] lg:text-[5.7rem]">
              {title}
            </h1>
          </motion.div>

          <motion.p
            className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-[#FFF8EA]/90 sm:text-xl sm:leading-9"
            initial={loaded && !reduced ? { opacity: 0, y: 16 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65, ease }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Stats band */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 border-t border-[#67E8F9]/24 pt-6 sm:grid-cols-4 sm:gap-4 lg:mt-14 lg:pt-7"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {safeStats(stats).map((s, i) => (
            <motion.div
              key={s.label}
              className="group rounded-2xl border border-[#E0F2FE]/16 bg-[#E0F2FE]/[0.095] px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#67E8F9]/38 hover:bg-[#E0F2FE]/[0.13] sm:px-5 sm:py-5"
              initial={loaded && !reduced ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.08, duration: 0.5 }}
            >
              <div className="font-serif text-4xl font-bold leading-none text-[#FFF8EA] sm:text-5xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-2 text-[0.68rem] font-extrabold uppercase leading-5 tracking-[0.18em] text-[#E0F2FE]/72">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#story"
          aria-label="Begin the story"
          className="mt-9 inline-flex w-fit items-center gap-3 rounded-full border border-[#E0F2FE]/16 bg-[#E0F2FE]/[0.08] px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.25em] text-[#E0F2FE]/76 backdrop-blur-md transition-all duration-300 hover:border-[#67E8F9]/44 hover:bg-[#67E8F9]/12 hover:text-[#67E8F9]"
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
          className="absolute bottom-5 right-4 z-20 flex items-center gap-1.5 rounded-full border border-[#E0F2FE]/12 bg-[#031F2E]/35 px-2 py-1.5 backdrop-blur-md sm:right-8"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              aria-pressed={i === index}
              className="h-1.5 rounded-full bg-[#E0F2FE]/40 transition-all duration-300"
              style={{
                width: i === index ? 26 : 8,
                backgroundColor: i === index ? "#67E8F9" : undefined,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

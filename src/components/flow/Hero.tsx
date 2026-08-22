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
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black"
    >
      {/* Photo layer: visible without full-screen tint */}
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
              animate={reduced ? {} : { scale: 1.035 }}
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

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-36 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
        <div className="max-w-6xl">
          <motion.div
            className="mb-5 flex flex-wrap items-center gap-3"
            initial={loaded && !reduced ? { opacity: 0, y: 12 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
          >
            <span className="h-px w-12 bg-[#67E8F9]" />
            <p className="text-xs font-black uppercase tracking-[0.36em] text-[#FACC15] drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
              Eastern India · since 2009
            </p>
          </motion.div>

          {/* Local readability layer only behind title area */}
          <div className="relative w-fit max-w-full rounded-[2rem]">
            <div
              aria-hidden
              className="absolute -inset-x-5 -inset-y-4 -z-10 rounded-[2rem] bg-gradient-to-r from-black/58 via-black/34 to-transparent blur-sm sm:-inset-x-7 sm:-inset-y-5"
            />

            <motion.h1
              className="max-w-6xl bg-gradient-to-r from-[#FFFFFF] via-[#F8FDFF] to-[#B9F6FF] bg-clip-text font-sans text-[3.35rem] font-black leading-[0.9] tracking-[-0.065em] text-transparent sm:text-[4.7rem] lg:text-[6.1rem]"
              style={{
                textShadow:
                  "0 2px 3px rgba(0,0,0,0.72), 0 14px 34px rgba(0,0,0,0.62)",
              }}
              initial={loaded && !reduced ? { opacity: 0, y: 20 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75, ease }}
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            className="mt-8 max-w-3xl rounded-2xl border border-white/20 bg-black/34 px-5 py-4 text-lg font-bold leading-8 text-white shadow-[0_18px_42px_rgba(0,0,0,0.28)] backdrop-blur-[2px] sm:text-xl sm:leading-9"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.85)",
            }}
            initial={loaded && !reduced ? { opacity: 0, y: 16 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65, ease }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Stats band */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 border-t border-white/35 pt-6 sm:grid-cols-4 sm:gap-4 lg:mt-14 lg:pt-7"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {safeStats(stats).map((s, i) => (
            <motion.div
              key={s.label}
              className="group rounded-2xl border border-white/28 bg-black/34 px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.30)] backdrop-blur-[3px] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#67E8F9]/70 hover:bg-black/42 sm:px-5 sm:py-5"
              initial={loaded && !reduced ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.08, duration: 0.5 }}
            >
              <div
                className="bg-gradient-to-r from-[#FFFFFF] via-[#F8FDFF] to-[#B9F6FF] bg-clip-text font-sans text-5xl font-black leading-none tracking-[-0.055em] text-transparent sm:text-6xl"
                style={{
                  textShadow: "0 6px 18px rgba(0,0,0,0.72)",
                }}
              >
                <CountUp value={s.value} />
              </div>
              <div className="mt-3 text-[0.7rem] font-black uppercase leading-5 tracking-[0.2em] text-[#E0F2FE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#story"
          aria-label="Begin the story"
          className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-white/28 bg-black/30 px-4 py-2.5 text-xs font-black uppercase tracking-[0.25em] text-[#E0F2FE] backdrop-blur-[3px] transition-all duration-300 hover:border-[#67E8F9]/75 hover:bg-black/42 hover:text-[#67E8F9]"
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
          className="absolute bottom-5 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/28 bg-black/30 px-2 py-1.5 backdrop-blur-[3px] sm:right-8"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              aria-pressed={i === index}
              className="h-1.5 rounded-full bg-white/60 transition-all duration-300"
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

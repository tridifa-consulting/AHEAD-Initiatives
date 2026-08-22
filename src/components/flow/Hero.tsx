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
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#071d2a]"
    >
      {/* Background slideshow — intentionally no colour tint */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 1.7,
            ease: "easeInOut",
          }}
        >
          {slides[index] && (
            <motion.div
              className="absolute inset-0"
              initial={reduced ? {} : { scale: 1 }}
              animate={reduced ? {} : { scale: 1.045 }}
              transition={{
                duration: 9,
                ease: "linear",
              }}
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

      {/* Main content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-32 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">

        {/* Hero copy */}
        <div className="relative max-w-5xl">
          {/*
            Local readability support only.
            This does NOT tint the full photograph.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_at_left,rgba(0,0,0,0.48),rgba(0,0,0,0.20)_48%,transparent_74%)] blur-md"
          />

          {/* Location / history line */}
          <motion.div
            className="mb-5 flex items-center gap-3"
            initial={loaded && !reduced ? { opacity: 0, y: 12 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.18,
              duration: 0.55,
              ease,
            }}
          >
            <span className="h-px w-10 bg-[#67E8F9]" />

            <p
              className="text-[0.68rem] font-extrabold uppercase tracking-[0.34em] text-[#FFF3A6] sm:text-xs"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              Eastern India · since 2009
            </p>
          </motion.div>

          {/* Hero title */}
          <motion.h1
            className="max-w-5xl bg-gradient-to-r from-[#FFF7E8] via-[#FFFFFF] to-[#9BEAF4] bg-clip-text font-[var(--font-display)] text-[3.35rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-transparent sm:text-[4.6rem] lg:text-[5.8rem]"
            style={{
              filter: "drop-shadow(0 5px 14px rgba(0,0,0,0.62))",
            }}
            initial={loaded && !reduced ? { opacity: 0, y: 20 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.72,
              ease,
            }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-white sm:text-xl sm:leading-9"
            style={{
              textShadow:
                "0 2px 4px rgba(0,0,0,0.9), 0 8px 22px rgba(0,0,0,0.55)",
            }}
            initial={loaded && !reduced ? { opacity: 0, y: 14 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.62,
              ease,
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-11 grid grid-cols-2 gap-3 border-t border-white/30 pt-6 sm:grid-cols-4 sm:gap-4 lg:mt-12"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.65,
            duration: 0.55,
          }}
        >
          {safeStats(stats).map((s, i) => (
            <motion.div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-white/25 bg-[#061b27]/40 px-4 py-4 shadow-[0_14px_38px_rgba(0,0,0,0.24)] backdrop-blur-[3px] transition-all duration-300 hover:-translate-y-1 hover:border-[#67E8F9]/55 hover:bg-[#061b27]/52 sm:px-5 sm:py-5"
              initial={loaded && !reduced ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.72 + i * 0.08,
                duration: 0.48,
              }}
            >
              {/* Aqua detail */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Metric */}
              <div
                className="bg-gradient-to-r from-[#FFF7E8] via-white to-[#9BEAF4] bg-clip-text font-[var(--font-display)] text-[2.75rem] font-extrabold leading-none tracking-[-0.05em] text-transparent sm:text-[3.25rem]"
                style={{
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.55))",
                }}
              >
                <CountUp value={s.value} />
              </div>

              {/* Metric label */}
              <div
                className="mt-3 text-[0.66rem] font-extrabold uppercase leading-5 tracking-[0.17em] text-white/82"
                style={{
                  textShadow: "0 2px 6px rgba(0,0,0,0.75)",
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#story"
          aria-label="Begin the story"
          className="mt-7 inline-flex w-fit items-center gap-3 rounded-full border border-white/25 bg-black/25 px-4 py-2.5 text-[0.68rem] font-extrabold uppercase tracking-[0.23em] text-white/85 backdrop-blur-[3px] transition-all duration-300 hover:border-[#67E8F9]/60 hover:bg-[#064E7A]/45 hover:text-[#B9F6FF]"
          initial={loaded && !reduced ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
        >
          Begin the story

          <motion.span
            aria-hidden
            className="text-base leading-none"
            animate={reduced ? {} : { y: [0, 4, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div
          aria-label="Photograph carousel"
          className="absolute bottom-5 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-2 py-1.5 backdrop-blur-[3px] sm:right-8"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              aria-pressed={i === index}
              className="h-1.5 rounded-full bg-white/50 transition-all duration-300"
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

"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";
import CountUp from "./CountUp";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Verified metrics seeded from the original website.
 * Used only when CMS values are missing or malformed.
 */
const VERIFIED_STATS = [
  {
    value: "25+",
    label: "Gram Panchayat Partnerships",
  },
  {
    value: "82",
    label: "Published Materials",
  },
  {
    value: "16+",
    label: "Years of Impact",
  },
  {
    value: "30+",
    label: "Core Team Members",
  },
];

function safeStats(
  stats:
    | {
        value?: unknown;
        label?: unknown;
      }[]
    | undefined
) {
  const valid = (
    stats ?? []
  ).filter(
    (
      stat
    ): stat is {
      value: string;
      label: string;
    } =>
      typeof stat?.value ===
        "string" &&
      /^\d+/.test(stat.value) &&
      typeof stat?.label ===
        "string" &&
      stat.label.length > 0
  );

  return valid.length >= 3
    ? valid
    : VERIFIED_STATS;
}

export default function Hero({
  title,
  subtitle,
  stats,
  slides,
}: {
  title: string;
  subtitle: string;
  stats: {
    value: string;
    label: string;
  }[];
  slides: MediaRow[];
}) {
  const [index, setIndex] =
    useState(0);

  const [loaded, setLoaded] =
    useState(false);

  const reduced =
    useReducedMotion();

  const intervalRef =
    useRef<ReturnType<
      typeof setInterval
    > | null>(null);

  /* ─────────────────────────────────────────────
     Slideshow
  ───────────────────────────────────────────── */

  useEffect(() => {
    const timeout =
      setTimeout(
        () => setLoaded(true),
        0
      );

    if (
      slides.length < 2 ||
      reduced
    ) {
      return () =>
        clearTimeout(timeout);
    }

    intervalRef.current =
      setInterval(() => {
        setIndex(
          (current) =>
            (current + 1) %
            slides.length
        );
      }, 7000);

    return () => {
      clearTimeout(timeout);

      if (
        intervalRef.current
      ) {
        clearInterval(
          intervalRef.current
        );
      }
    };
  }, [slides.length, reduced]);

  const metrics =
    safeStats(stats);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-58px)] flex-col overflow-hidden bg-[#071D2A]"
    >
      {/* ───────────────────────────────────────
          PHOTOGRAPH SLIDESHOW

          Important:
          No full-screen colour tint is applied.
      ──────────────────────────────────────── */}

      <AnimatePresence
        initial={false}
      >
        <motion.div
          key={index}
          className="absolute inset-0 z-0"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: reduced
              ? 0
              : 1.65,
            ease: "easeInOut",
          }}
        >
          {slides[index] && (
            <motion.div
              className="absolute inset-0"
              initial={
                reduced
                  ? {}
                  : {
                      scale: 1,
                    }
              }
              animate={
                reduced
                  ? {}
                  : {
                      scale: 1.045,
                    }
              }
              transition={{
                duration: 9,
                ease: "linear",
              }}
            >
              <Image
                src={
                  slides[index]
                    .file_path ??
                  slides[index]
                    .url ??
                  ""
                }
                alt={t(
                  slides[index]
                    .alt_text
                )}
                fill
                priority={
                  index === 0
                }
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ───────────────────────────────────────
          LOCAL READABILITY SUPPORT

          These are not image tints.
          They only darken the areas directly behind text.
      ──────────────────────────────────────── */}

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-full lg:w-[68%]"
        style={{
          background:
            "radial-gradient(ellipse at 14% 48%, rgba(0,16,24,0.58) 0%, rgba(0,16,24,0.34) 38%, rgba(0,16,24,0.12) 63%, transparent 82%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[34%]"
        style={{
          background:
            "linear-gradient(to top, rgba(2,22,32,0.56), rgba(2,22,32,0.15) 62%, transparent)",
        }}
      />

      {/* ───────────────────────────────────────
          MAIN CONTENT
      ──────────────────────────────────────── */}

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-8 pt-24 sm:px-6 sm:pb-10 lg:px-8 lg:pb-11">
        {/* Hero statement */}
        <div className="max-w-5xl">
          {/* Geography / history */}
          <motion.div
            className="mb-5 flex items-center gap-3"
            initial={
              loaded &&
              !reduced
                ? {
                    opacity: 0,
                    y: 10,
                  }
                : {}
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.18,
              duration: 0.55,
              ease,
            }}
          >
            <span
              aria-hidden
              className="h-px w-10 bg-[#67E8F9]"
            />

            <p
              className="text-[0.66rem] font-extrabold uppercase tracking-[0.34em] text-[#FFE78F] sm:text-[0.7rem]"
              style={{
                textShadow:
                  "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              Eastern India · since
              2009
            </p>
          </motion.div>

          {/* ─────────────────────────────────
              Main title

              Uses the actual serif font,
              rather than --font-display.
          ────────────────────────────────── */}

          <motion.h1
            initial={
              loaded &&
              !reduced
                ? {
                    opacity: 0,
                    y: 22,
                  }
                : {}
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.74,
              ease,
            }}
            className="max-w-[970px] bg-gradient-to-r from-[#FFF4DE] via-[#FFFFFF] to-[#B9F6FF] bg-clip-text font-serif text-[3rem] font-bold leading-[1.01] tracking-[-0.045em] text-transparent sm:text-[4rem] lg:text-[5rem] xl:text-[5.35rem]"
            style={{
              filter:
                "drop-shadow(0 4px 11px rgba(0,0,0,0.60))",
            }}
          >
            {title}
          </motion.h1>

          {/* Small editorial accent */}
          <motion.div
            aria-hidden
            initial={
              loaded &&
              !reduced
                ? {
                    scaleX: 0,
                  }
                : {}
            }
            animate={{
              scaleX: 1,
            }}
            transition={{
              delay: 0.72,
              duration: 0.65,
              ease,
            }}
            className="mt-6 h-px w-24 origin-left bg-gradient-to-r from-[#67E8F9] via-[#FFE78F] to-transparent"
          />

          {/* Subtitle */}
          <motion.p
            className="mt-5 max-w-[720px] text-[1rem] font-semibold leading-[1.8] text-white sm:text-[1.08rem] lg:text-[1.13rem]"
            style={{
              textShadow:
                "0 2px 5px rgba(0,0,0,0.92), 0 8px 20px rgba(0,0,0,0.48)",
            }}
            initial={
              loaded &&
              !reduced
                ? {
                    opacity: 0,
                    y: 14,
                  }
                : {}
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.46,
              duration: 0.62,
              ease,
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ─────────────────────────────────────
            IMPACT BAND

            One connected institutional band instead
            of four floating dashboard cards.
        ────────────────────────────────────── */}

        <motion.div
          initial={
            loaded &&
            !reduced
              ? {
                  opacity: 0,
                  y: 12,
                }
              : {}
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.68,
            duration: 0.58,
            ease,
          }}
          className="relative mt-9 overflow-hidden rounded-[1.4rem] border border-white/22 bg-[#031E2B]/46 shadow-[0_18px_48px_rgba(0,0,0,0.20)] backdrop-blur-[5px]"
        >
          {/* Aqua manuscript edge */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#67E8F9]/90 via-[#B9F6FF]/55 to-[#FFE78F]/70"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4">
            {metrics.map(
              (stat, i) => (
                <motion.div
                  key={
                    stat.label
                  }
                  initial={
                    loaded &&
                    !reduced
                      ? {
                          opacity: 0,
                          y: 8,
                        }
                      : {}
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      0.74 +
                      i * 0.075,
                    duration: 0.45,
                    ease,
                  }}
                  className="group relative px-5 py-5 sm:px-6 sm:py-6"
                >
                  {/* Vertical separators */}
                  {i > 0 && (
                    <div
                      aria-hidden
                      className="absolute left-0 top-[22%] hidden h-[56%] w-px bg-white/14 sm:block"
                    />
                  )}

                  {/* Mobile horizontal separators */}
                  {i > 1 && (
                    <div
                      aria-hidden
                      className="absolute inset-x-4 top-0 h-px bg-white/12 sm:hidden"
                    />
                  )}

                  {/* Metric */}
                  <div
                    className="bg-gradient-to-r from-[#FFF4DE] via-white to-[#B9F6FF] bg-clip-text font-serif text-[2.55rem] font-bold leading-none tracking-[-0.045em] text-transparent sm:text-[2.85rem] lg:text-[3.15rem]"
                    style={{
                      filter:
                        "drop-shadow(0 3px 9px rgba(0,0,0,0.45))",
                    }}
                  >
                    <CountUp
                      value={
                        stat.value
                      }
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="mt-2.5 max-w-[190px] text-[0.61rem] font-extrabold uppercase leading-[1.55] tracking-[0.16em] text-white/76 sm:text-[0.64rem]"
                    style={{
                      textShadow:
                        "0 2px 6px rgba(0,0,0,0.62)",
                    }}
                  >
                    {stat.label}
                  </div>

                  {/* Hover accent */}
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-5 h-[2px] w-0 bg-[#67E8F9] transition-all duration-300 group-hover:w-10"
                  />
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* ─────────────────────────────────────
            LOWER NAVIGATION
        ────────────────────────────────────── */}

        <div className="mt-5 flex items-end justify-between gap-5">
          {/* Begin story */}
          <motion.a
            href="#story"
            aria-label="Begin the story"
            className="group inline-flex w-fit items-center gap-3 text-[0.64rem] font-extrabold uppercase tracking-[0.23em] text-white/78 transition-colors duration-200 hover:text-[#B9F6FF]"
            initial={
              loaded &&
              !reduced
                ? {
                    opacity: 0,
                  }
                : {}
            }
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
          >
            <span>
              Begin the story
            </span>

            <motion.span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-black/18 text-sm"
              animate={
                reduced
                  ? {}
                  : {
                      y: [
                        0,
                        3,
                        0,
                      ],
                    }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↓
            </motion.span>
          </motion.a>

          {/* Photograph carousel */}
          {slides.length > 1 && (
            <div
              aria-label="Photograph carousel"
              className="flex items-center gap-3"
            >
              {/* Current slide number */}
              <span className="hidden font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-white/55 sm:block">
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}

                <span className="mx-1.5 text-white/25">
                  /
                </span>

                {String(
                  slides.length
                ).padStart(
                  2,
                  "0"
                )}
              </span>

              {/* Indicators */}
              <div className="flex items-center gap-1.5">
                {slides.map(
                  (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setIndex(
                          i
                        )
                      }
                      aria-label={`Slide ${
                        i + 1
                      }`}
                      aria-pressed={
                        i ===
                        index
                      }
                      className="relative h-6 min-w-3"
                    >
                      <span
                        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full transition-all duration-300"
                        style={{
                          width:
                            i ===
                            index
                              ? 28
                              : 10,
                          backgroundColor:
                            i ===
                            index
                              ? "#67E8F9"
                              : "rgba(255,255,255,0.45)",
                        }}
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

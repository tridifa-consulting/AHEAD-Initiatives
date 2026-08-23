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
  const valid = (stats ?? []).filter(
    (
      stat
    ): stat is {
      value: string;
      label: string;
    } =>
      typeof stat?.value === "string" &&
      /^\d+/.test(stat.value) &&
      typeof stat?.label === "string" &&
      stat.label.length > 0
  );

  return valid.length >= 3 ? valid : VERIFIED_STATS;
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
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  const intervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  /* ─────────────────────────────────────────────
     Slideshow
  ───────────────────────────────────────────── */

  useEffect(() => {
    const timeout = setTimeout(
      () => setLoaded(true),
      0
    );

    if (slides.length < 2 || reduced) {
      return () => clearTimeout(timeout);
    }

    intervalRef.current = setInterval(() => {
      setIndex(
        (current) =>
          (current + 1) % slides.length
      );
    }, 7000);

    return () => {
      clearTimeout(timeout);

      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        );
      }
    };
  }, [slides.length, reduced]);

  /*
   * Protect against a stale slide index if CMS/media data changes.
   */
  useEffect(() => {
    if (
      slides.length > 0 &&
      index >= slides.length
    ) {
      setIndex(0);
    }
  }, [index, slides.length]);

  const metrics = safeStats(stats);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-52px)] flex-col overflow-hidden bg-[#071D2A] sm:min-h-[calc(100svh-58px)]"
    >
      {/* ───────────────────────────────────────
          PHOTOGRAPH SLIDESHOW

          The photograph itself remains untinted.
      ──────────────────────────────────────── */}

      <AnimatePresence initial={false}>
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
            duration: reduced ? 0 : 1.55,
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
                      scale: 1.04,
                    }
              }
              transition={{
                duration: 9,
                ease: "linear",
              }}
            >
              <Image
                src={
                  slides[index].file_path ??
                  slides[index].url ??
                  ""
                }
                alt={t(
                  slides[index].alt_text
                )}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ───────────────────────────────────────
          LOCAL READABILITY SUPPORT

          Mobile receives slightly more bottom/left contrast because the
          copy occupies a larger percentage of the photograph. These
          gradients are transparent outside the content zones.
      ──────────────────────────────────────── */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,15,23,0.48) 0%, rgba(0,15,23,0.24) 58%, rgba(0,15,23,0.04) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%] sm:h-[42%]"
        style={{
          background:
            "linear-gradient(to top, rgba(2,18,27,0.68), rgba(2,18,27,0.25) 58%, transparent)",
        }}
      />

      {/* ───────────────────────────────────────
          MAIN CONTENT
      ──────────────────────────────────────── */}

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-5 pt-12 sm:px-6 sm:pb-8 sm:pt-20 lg:px-8 lg:pb-10 lg:pt-24">
        {/* Hero statement */}
        <div className="max-w-5xl">
          {/* Geography / history */}
          <motion.div
            className="mb-3.5 flex items-center gap-2.5 sm:mb-5 sm:gap-3"
            initial={
              loaded && !reduced
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
              className="h-px w-8 bg-[#67E8F9] sm:w-10"
            />

            <p
              className="text-[0.57rem] font-extrabold uppercase tracking-[0.27em] text-[#FFE78F] sm:text-[0.7rem] sm:tracking-[0.34em]"
              style={{
                textShadow:
                  "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              Eastern India · since 2009
            </p>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={
              loaded && !reduced
                ? {
                    opacity: 0,
                    y: 18,
                  }
                : {}
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease,
            }}
            className="max-w-[970px] bg-gradient-to-r from-[#FFF4DE] via-[#FFFFFF] to-[#B9F6FF] bg-clip-text font-serif text-[clamp(2.55rem,11.5vw,3.25rem)] font-bold leading-[0.94] tracking-[-0.045em] text-transparent sm:text-[4rem] sm:leading-[1.01] lg:text-[5rem] xl:text-[5.35rem]"
            style={{
              filter:
                "drop-shadow(0 4px 11px rgba(0,0,0,0.60))",
            }}
          >
            {title}
          </motion.h1>

          {/* Editorial accent */}
          <motion.div
            aria-hidden
            initial={
              loaded && !reduced
                ? {
                    scaleX: 0,
                  }
                : {}
            }
            animate={{
              scaleX: 1,
            }}
            transition={{
              delay: 0.7,
              duration: 0.6,
              ease,
            }}
            className="mt-4 h-px w-20 origin-left bg-gradient-to-r from-[#67E8F9] via-[#FFE78F] to-transparent sm:mt-6 sm:w-24"
          />

          {/* Subtitle */}
          <motion.p
            className="mt-4 max-w-[720px] text-[0.92rem] font-semibold leading-[1.62] text-white sm:mt-5 sm:text-[1.08rem] sm:leading-[1.8] lg:text-[1.13rem]"
            style={{
              textShadow:
                "0 2px 5px rgba(0,0,0,0.92), 0 8px 20px rgba(0,0,0,0.48)",
            }}
            initial={
              loaded && !reduced
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
              delay: 0.44,
              duration: 0.6,
              ease,
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ─────────────────────────────────────
            IMPACT BAND

            Compact 2 × 2 register on phones.
            Returns to the existing 4-column treatment from sm upward.
        ────────────────────────────────────── */}

        <motion.div
          initial={
            loaded && !reduced
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
            delay: 0.64,
            duration: 0.55,
            ease,
          }}
          className="relative mt-6 overflow-hidden rounded-[1.15rem] border border-white/20 bg-[#031E2B]/48 shadow-[0_14px_38px_rgba(0,0,0,0.18)] backdrop-blur-[4px] sm:mt-9 sm:rounded-[1.4rem] sm:backdrop-blur-[5px]"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#67E8F9]/90 via-[#B9F6FF]/55 to-[#FFE78F]/70"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4">
            {metrics.map(
              (stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={
                    loaded && !reduced
                      ? {
                          opacity: 0,
                          y: 7,
                        }
                      : {}
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      0.7 +
                      i * 0.065,
                    duration: 0.42,
                    ease,
                  }}
                  className="group relative min-h-[92px] px-4 py-3.5 sm:min-h-0 sm:px-6 sm:py-6"
                >
                  {/* Desktop vertical separators */}
                  {i > 0 && (
                    <div
                      aria-hidden
                      className="absolute left-0 top-[22%] hidden h-[56%] w-px bg-white/14 sm:block"
                    />
                  )}

                  {/* Mobile centre vertical divider */}
                  {(i === 1 || i === 3) && (
                    <div
                      aria-hidden
                      className="absolute left-0 top-[18%] h-[64%] w-px bg-white/12 sm:hidden"
                    />
                  )}

                  {/* Mobile horizontal divider */}
                  {i > 1 && (
                    <div
                      aria-hidden
                      className="absolute inset-x-4 top-0 h-px bg-white/12 sm:hidden"
                    />
                  )}

                  {/* Metric */}
                  <div
                    className="bg-gradient-to-r from-[#FFF4DE] via-white to-[#B9F6FF] bg-clip-text font-serif text-[2rem] font-bold leading-none tracking-[-0.045em] text-transparent sm:text-[2.85rem] lg:text-[3.15rem]"
                    style={{
                      filter:
                        "drop-shadow(0 3px 9px rgba(0,0,0,0.45))",
                    }}
                  >
                    <CountUp
                      value={stat.value}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="mt-2 max-w-[155px] text-[0.52rem] font-extrabold uppercase leading-[1.45] tracking-[0.13em] text-white/76 sm:mt-2.5 sm:max-w-[190px] sm:text-[0.64rem] sm:leading-[1.55] sm:tracking-[0.16em]"
                    style={{
                      textShadow:
                        "0 2px 6px rgba(0,0,0,0.62)",
                    }}
                  >
                    {stat.label}
                  </div>

                  <span
                    aria-hidden
                    className="absolute bottom-0 left-4 h-[2px] w-0 bg-[#67E8F9] transition-all duration-300 group-hover:w-8 sm:left-5 sm:group-hover:w-10"
                  />
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* ─────────────────────────────────────
            LOWER NAVIGATION
        ────────────────────────────────────── */}

        <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5 sm:items-end sm:gap-5">
          <motion.a
            href="#story"
            aria-label="Begin the story"
            className="group inline-flex w-fit items-center gap-2.5 text-[0.56rem] font-extrabold uppercase tracking-[0.19em] text-white/78 transition-colors duration-200 hover:text-[#B9F6FF] sm:gap-3 sm:text-[0.64rem] sm:tracking-[0.23em]"
            initial={
              loaded && !reduced
                ? {
                    opacity: 0,
                  }
                : {}
            }
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.92,
              duration: 0.5,
            }}
          >
            <span>
              Begin the story
            </span>

            <motion.span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-black/18 text-xs sm:h-7 sm:w-7 sm:text-sm"
              animate={
                reduced
                  ? {}
                  : {
                      y: [0, 3, 0],
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
              className="flex shrink-0 items-center gap-2 sm:gap-3"
            >
              <span className="hidden font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-white/55 sm:block">
                {String(
                  index + 1
                ).padStart(2, "0")}

                <span className="mx-1.5 text-white/25">
                  /
                </span>

                {String(
                  slides.length
                ).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-1">
                {slides.map(
                  (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setIndex(i)
                      }
                      aria-label={`Slide ${
                        i + 1
                      }`}
                      aria-pressed={
                        i === index
                      }
                      className="relative h-6 min-w-2.5 sm:min-w-3"
                    >
                      <span
                        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full transition-all duration-300"
                        style={{
                          width:
                            i === index
                              ? 22
                              : 8,
                          backgroundColor:
                            i === index
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

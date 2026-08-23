"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Philosophy as a manifesto lockup, not values cards.
 * Both statements are verified verbatim from AHEAD's own materials.
 *
 * Mobile optimisation:
 * - preserves the same content and desktop visual language
 * - reduces oversized vision typography on narrow screens
 * - tightens spacing/padding without flattening the editorial hierarchy
 * - keeps missions fully readable and stacked naturally on phones
 */
export default function Manifesto({
  vision,
  missions,
}: {
  vision: string;
  missions: string[];
}) {
  const reduced =
    useReducedMotion();

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Decorative atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-6 -z-10 h-56 w-56 rounded-full bg-[#67E8F9]/8 blur-3xl sm:-left-24 sm:top-10 sm:h-72 sm:w-72 sm:bg-[#67E8F9]/10"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-56 w-56 rounded-full bg-[#D8A441]/6 blur-3xl sm:-right-20 sm:h-72 sm:w-72 sm:bg-[#D8A441]/8"
      />

      {/* ─────────────────────────────────────────
          VISION
      ────────────────────────────────────────── */}

      <motion.div
        initial={
          reduced
            ? {}
            : {
                opacity: 0,
                y: 16,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin:
            "0px 0px -8% 0px",
        }}
        transition={{
          duration: 0.65,
          ease,
        }}
        className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/12 bg-[#FFF8EA]/82 shadow-[0_16px_42px_rgba(6,78,122,0.065)] sm:rounded-[2rem] sm:shadow-[0_22px_65px_rgba(6,78,122,0.07)]"
      >
        {/* Aqua identity rail */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-[#064E7A] via-[#0891B2] to-[#67E8F9] sm:w-[5px]"
        />

        <div className="px-5 py-6 sm:px-10 sm:py-11 lg:px-14 lg:py-14">
          {/* Small visual marker */}
          <div
            aria-hidden
            className="mb-5 flex items-center gap-2.5 sm:mb-7 sm:gap-3"
          >
            <span className="h-px w-9 bg-[#0891B2]/60 sm:w-12" />

            <span className="h-1.5 w-1.5 rounded-full bg-[#67E8F9] sm:h-2 sm:w-2" />

            <span className="h-px w-14 bg-gradient-to-r from-[#67E8F9]/55 to-transparent sm:w-20" />
          </div>

          <p className="max-w-5xl text-balance font-serif text-[clamp(1.7rem,7.9vw,2.1rem)] font-bold leading-[1.18] tracking-[-0.03em] text-[#064E7A] sm:text-[2.55rem] sm:leading-[1.28] lg:text-[3.15rem] lg:leading-[1.22]">
            {vision}
          </p>
        </div>

        {/* Bottom accent */}
        <div
          aria-hidden
          className="h-[2px] w-full bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-transparent sm:h-[3px]"
        />
      </motion.div>

      {/* Mission connector */}
      <motion.div
        aria-hidden
        initial={
          reduced
            ? {}
            : {
                scaleY: 0,
                originY: 0,
              }
        }
        whileInView={{
          scaleY: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.55,
          delay: 0.18,
          ease,
        }}
        className="mx-auto h-8 w-px bg-gradient-to-b from-[#0891B2]/50 to-transparent sm:h-12"
      />

      {/* ─────────────────────────────────────────
          MISSIONS
      ────────────────────────────────────────── */}

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {missions.map(
          (
            mission,
            i
          ) => (
            <motion.article
              key={i}
              initial={
                reduced
                  ? {}
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin:
                  "0px 0px -8% 0px",
              }}
              transition={{
                duration: 0.52,
                delay:
                  0.22 +
                  i * 0.1,
                ease,
              }}
              className="group relative overflow-hidden rounded-[1.35rem] border border-[#064E7A]/12 bg-[#FFFBF2] p-5 shadow-[0_12px_32px_rgba(6,78,122,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0891B2]/30 hover:shadow-[0_18px_42px_rgba(6,78,122,0.10)] sm:rounded-[1.6rem] sm:p-8 sm:shadow-[0_16px_42px_rgba(6,78,122,0.07)] sm:hover:-translate-y-1"
            >
              {/* Top rule */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9] sm:h-1"
              />

              {/* Quiet background motif */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border border-[#0891B2]/8 bg-[#67E8F9]/5 transition-transform duration-500 group-hover:scale-110 sm:-right-12 sm:-top-12 sm:h-32 sm:w-32 sm:bg-[#67E8F9]/6"
              />

              <div className="relative">
                {/* Mission label */}
                <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5 sm:gap-4">
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <span className="h-px w-6 shrink-0 bg-[#B96543]/65 sm:w-8" />

                    <span className="truncate font-[var(--font-display)] text-[0.58rem] font-extrabold uppercase tracking-[0.22em] text-[#B96543] sm:text-[0.68rem] sm:tracking-[0.28em]">
                      {i === 0
                        ? "MISSION — I"
                        : "MISSION — II"}
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className="shrink-0 font-[var(--font-display)] text-[1.65rem] font-extrabold leading-none text-[#0891B2]/10 sm:text-3xl sm:text-[#0891B2]/12"
                  >
                    {String(
                      i + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                {/* Mission statement */}
                <p className="max-w-xl text-[0.94rem] font-semibold leading-[1.65] text-[#344B55] sm:text-[1.08rem] sm:leading-[1.75]">
                  {mission}
                </p>
              </div>
            </motion.article>
          )
        )}
      </div>
    </div>
  );
}

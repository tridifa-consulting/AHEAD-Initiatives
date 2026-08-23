"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Established AHEAD partners migrated from the
 * existing public website.
 *
 * This component is intentionally independent of
 * Supabase and any CMS/database types.
 */
const partners = [
  {
    name: "iiINTERest",
    logo: "/partners/interest.png",
    logoClass:
      "max-h-[128px] max-w-[92%]",
  },
  {
    name: "CISU — Civilsamfund i Udvikling",
    logo: "/partners/cisu.png",
    logoClass:
      "max-h-[110px] max-w-[90%]",
  },
  {
    name: "Embee",
    logo: "/partners/embee.png",
    logoClass:
      "max-h-[115px] max-w-[82%]",
  },
  {
    name: "Smriti Sasankha Memorial Foundation",
    logo:
      "/partners/smriti-sasankha-memorial-foundation.png",
    logoClass:
      "max-h-[140px] max-w-[94%]",
  },
] as const;

export default function PartnersGrid() {
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      {/* ─────────────────────────────────────────
          Background atmosphere
      ────────────────────────────────────────── */}

      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -top-24 -z-10 h-72 w-72 rounded-full bg-[#67E8F9]/8 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-[#D8A441]/7 blur-3xl"
      />

      {/* ─────────────────────────────────────────
          Editorial divider
      ────────────────────────────────────────── */}

      <motion.div
        aria-hidden
        initial={
          reduced
            ? {}
            : {
                opacity: 0,
                scaleX: 0.7,
              }
        }
        whileInView={{
          opacity: 1,
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.55,
          ease,
        }}
        className="mb-9 flex origin-left items-center gap-3"
      >
        <span className="h-px w-12 bg-[#0891B2]/55" />

        <span className="h-1.5 w-1.5 rotate-45 bg-[#0891B2]" />

        <span className="h-px w-24 bg-gradient-to-r from-[#0891B2]/32 to-transparent" />
      </motion.div>

      {/* ─────────────────────────────────────────
          Partner grid
      ────────────────────────────────────────── */}

      <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {partners.map(
          (partner, index) => (
            <motion.li
              key={partner.name}
              initial={
                reduced
                  ? {}
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin:
                  "0px 0px -7% 0px",
              }}
              transition={{
                duration: 0.5,
                delay:
                  index * 0.07,
                ease,
              }}
              className="h-full"
            >
              <article className="group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[1.7rem] border border-[#064E7A]/10 bg-[#FFFDF8] shadow-[0_10px_34px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/25 hover:shadow-[0_22px_52px_rgba(6,78,122,0.11)] motion-reduce:hover:translate-y-0">

                {/* Blue / aqua identity rule */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
                />

                {/* Quiet archival number */}
                <span
                  aria-hidden
                  className="absolute right-6 top-5 font-serif text-[2.5rem] font-bold leading-none tracking-[-0.06em] text-[#0891B2]/[0.065]"
                >
                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>

                {/* Decorative corner geometry */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#0891B2]/7 bg-[#67E8F9]/[0.035] transition-transform duration-500 group-hover:scale-110"
                />

                {/* ───────────────────────────────
                    Logo stage
                ─────────────────────────────── */}

                <div className="relative flex min-h-[220px] flex-1 items-center justify-center px-7 pb-5 pt-10 sm:px-10">
                  <div
                    aria-hidden
                    className="absolute inset-x-10 bottom-6 top-8 rounded-[1.25rem] bg-gradient-to-br from-white/60 via-white/20 to-[#FFF8EA]/30 opacity-60"
                  />

                  <div className="relative flex h-[150px] w-full items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={720}
                      height={300}
                      sizes="(max-width: 768px) 90vw, 45vw"
                      className={`h-auto w-auto object-contain object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none ${partner.logoClass}`}
                    />
                  </div>
                </div>

                {/* ───────────────────────────────
                    Partner identity
                ─────────────────────────────── */}

                <div className="relative mx-6 border-t border-[#064E7A]/8 px-1 py-5 sm:mx-8">
                  <div className="flex items-center justify-center gap-3">
                    <span
                      aria-hidden
                      className="h-px w-5 bg-[#B96543]/45"
                    />

                    <h3 className="text-center font-serif text-[1rem] font-bold leading-snug tracking-[-0.015em] text-[#064E7A] sm:text-[1.05rem]">
                      {partner.name}
                    </h3>

                    <span
                      aria-hidden
                      className="h-px w-5 bg-[#B96543]/45"
                    />
                  </div>
                </div>

                {/* Warm hover accent */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#D8A441] to-[#B96543] transition-all duration-500 group-hover:w-24"
                />
              </article>
            </motion.li>
          )
        )}
      </ul>
    </div>
  );
}

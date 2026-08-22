"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Philosophy as a manifesto lockup, not values cards.
 * Both statements are verified verbatim from AHEAD's own materials.
 */
export default function Manifesto({
  vision,
  missions,
}: {
  vision: string;
  missions: string[];
}) {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Decorative atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-[#67E8F9]/10 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#D8A441]/8 blur-3xl"
      />

      {/* Vision */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          margin: "0px 0px -12% 0px",
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden rounded-[2rem] border border-[#064E7A]/12 bg-[#FFF8EA]/82 shadow-[0_22px_65px_rgba(6,78,122,0.07)]"
      >
        {/* Aqua identity rail */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[5px] bg-gradient-to-b from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
        />

        <div className="px-7 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14">
          {/* Small visual marker */}
          <div
            aria-hidden
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-12 bg-[#0891B2]/60" />
            <span className="h-2 w-2 rounded-full bg-[#67E8F9]" />
            <span className="h-px w-20 bg-gradient-to-r from-[#67E8F9]/55 to-transparent" />
          </div>

          <p className="max-w-5xl font-serif text-[2rem] font-bold leading-[1.32] tracking-[-0.035em] text-[#064E7A] sm:text-[2.55rem] lg:text-[3.15rem] lg:leading-[1.22]">
            {vision}
          </p>
        </div>

        {/* Bottom accent */}
        <div
          aria-hidden
          className="h-[3px] w-full bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-transparent"
        />
      </motion.div>

      {/* Mission connector */}
      <motion.div
        aria-hidden
        initial={reduced ? {} : { scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.65,
          delay: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto h-12 w-px bg-gradient-to-b from-[#0891B2]/50 to-transparent"
      />

      {/* Missions */}
      <div className="grid gap-5 md:grid-cols-2">
        {missions.map((mission, i) => (
          <motion.article
            key={i}
            initial={reduced ? {} : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "0px 0px -10% 0px",
            }}
            transition={{
              duration: 0.58,
              delay: 0.28 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden rounded-[1.6rem] border border-[#064E7A]/12 bg-[#FFFBF2] p-7 shadow-[0_16px_42px_rgba(6,78,122,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/30 hover:shadow-[0_22px_55px_rgba(6,78,122,0.11)] sm:p-8"
          >
            {/* Top rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
            />

            {/* Quiet background motif */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-[#0891B2]/8 bg-[#67E8F9]/6 transition-transform duration-500 group-hover:scale-110"
            />

            <div className="relative">
              {/* Mission label */}
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#B96543]/65" />

                  <span className="font-[var(--font-display)] text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-[#B96543]">
                    {i === 0 ? "MISSION — I" : "MISSION — II"}
                  </span>
                </div>

                <span
                  aria-hidden
                  className="font-[var(--font-display)] text-3xl font-extrabold leading-none text-[#0891B2]/12"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Mission statement */}
              <p className="max-w-xl text-[1.03rem] font-semibold leading-[1.75] text-[#344B55] sm:text-[1.08rem]">
                {mission}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

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
    <div className="relative mx-auto max-w-5xl">
      {/* Soft archival background frame */}
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(223,175,69,0.15),transparent_22rem),linear-gradient(180deg,rgba(255,250,241,0.88),rgba(247,239,228,0.78))] sm:-inset-x-10 sm:-inset-y-10"
      />

      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] border border-[#14314d]/10 sm:-inset-x-10 sm:-inset-y-10"
      />

      {/* Manuscript-style top rule */}
      <motion.div
        aria-hidden
        initial={reduced ? {} : { scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 h-px w-full bg-gradient-to-r from-[#b85c38]/70 via-[#dfaf45]/45 to-transparent"
      />

      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div
          aria-hidden
          className="absolute -left-5 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-[#b85c38]/55 via-[#dfaf45]/38 to-transparent lg:block"
        />

        <p className="font-serif text-2xl font-medium leading-snug tracking-[-0.015em] text-[#14314d] sm:text-3xl lg:text-[2.25rem] lg:leading-[1.28]">
          {vision}
        </p>
      </motion.div>

      <motion.div
        aria-hidden
        initial={reduced ? {} : { scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="my-10 h-px w-28 bg-gradient-to-r from-[#b85c38] via-[#dfaf45] to-transparent"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {missions.map((m, i) => (
          <motion.div
            key={i}
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.55, delay: 0.35 + i * 0.12 }}
            className="group relative overflow-hidden rounded-2xl border border-[#14314d]/10 bg-[#fffaf1]/72 p-6 shadow-[0_12px_34px_rgba(16,42,67,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b85c38]/28 hover:shadow-[0_18px_44px_rgba(16,42,67,0.10)]"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b85c38]/70 via-[#dfaf45]/55 to-[#2f5f46]/45"
            />

            <div
              aria-hidden
              className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#dfaf45]/10 transition-transform duration-500 group-hover:scale-125"
            />

            <div className="relative mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b85c38]/55" />
              <div className="font-mono text-xs font-semibold tracking-[0.3em] text-[#b85c38]">
                {i === 0 ? "MISSION — I" : "MISSION — II"}
              </div>
            </div>

            <p className="relative text-base leading-relaxed text-[#17212b]/78">
              {m}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Manuscript-style bottom rule */}
      <motion.div
        aria-hidden
        initial={reduced ? {} : { scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 h-px w-full bg-gradient-to-l from-[#2f5f46]/45 via-[#dfaf45]/35 to-transparent"
      />
    </div>
  );
}

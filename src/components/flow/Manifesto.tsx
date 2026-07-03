"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Philosophy as a manifesto lockup, not values cards.
 * Both statements are verified verbatim from AHEAD's own materials.
 */
export default function Manifesto({
  vision, missions,
}: { vision: string; missions: string[] }) {
  const reduced = useReducedMotion();
  return (
    <div className="mx-auto max-w-4xl">
      <motion.p
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-2xl font-medium leading-snug text-[#16324F] sm:text-3xl lg:text-[2.1rem] lg:leading-[1.3]"
      >
        {vision}
      </motion.p>

      <motion.div
        aria-hidden
        initial={reduced ? {} : { scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="my-10 h-px w-24 bg-gradient-to-r from-[#C65D3B] to-[#E9B44C]"
      />

      <div className="grid gap-8 sm:grid-cols-2">
        {missions.map((m, i) => (
          <motion.div
            key={i}
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.35 + i * 0.12 }}
          >
            <div className="mb-2 font-mono text-xs font-semibold tracking-[0.3em] text-[#C65D3B]">
              {i === 0 ? "MISSION — I" : "MISSION — II"}
            </div>
            <p className="text-base leading-relaxed text-[#1F2933]/80">{m}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

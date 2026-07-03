"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Clapperboard, ChevronDown } from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";

export default function FilmLibrary({
  documentaries, learning,
}: { documentaries: MediaRow[]; learning: MediaRow[] }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const shown = expanded ? learning : learning.slice(0, 12);

  return (
    <div className="space-y-16">
      {/* Documentary poster cards */}
      {documentaries.length > 0 && (
        <section aria-label="Documentaries">
          <h3 className="mb-1 font-serif text-xl font-semibold text-[#16324F]">Stories of Hope and Initiative</h3>
          <p className="mb-6 text-sm text-[#1F2933]/60">
            Field documentaries produced by AHEAD&apos;s studio, filmed with the communities they work alongside.
          </p>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {documentaries.map((f, i) => (
              <motion.li
                key={f.id}
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06 }}
              >
                <motion.a
                  href={f.url ?? "#media"}
                  target="_blank" rel="noopener"
                  whileHover={reduced ? {} : { y: -4, scale: 1.01 }}
                  transition={{ duration: 0.22 }}
                  className="group flex h-full flex-col rounded-2xl border border-[#16324F]/8 bg-white p-6 shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
                >
                  <motion.span
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#16324F] text-[#E9B44C]"
                    whileHover={reduced ? {} : { scale: 1.12, backgroundColor: "#C65D3B" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play className="ml-0.5 h-5 w-5" />
                  </motion.span>
                  <h4 className="font-serif text-base font-semibold text-[#16324F]">{f.title}</h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1F2933]/65">{t(f.caption)}</p>
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </section>
      )}

      {/* Learning library */}
      {learning.length > 0 && (
        <section aria-label="Learning for All film library">
          <h3 className="mb-1 font-serif text-xl font-semibold text-[#16324F]">
            Learning for All — {learning.length} Films
          </h3>
          <p className="mb-6 text-sm text-[#1F2933]/60">
            Bengali films, translations and animations produced or curated for rural schools: health,
            nutrition, trees, water, local self-government, and the classics.
          </p>
          <motion.ul className="grid gap-2 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {shown.map((f, i) => (
                <motion.li
                  key={f.id}
                  initial={reduced ? {} : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduced ? {} : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, delay: i > 11 ? Math.min(i - 11, 8) * 0.025 : 0 }}
                >
                  <a
                    href={f.url ?? "#media"} target="_blank" rel="noopener"
                    className="flex items-start gap-2.5 rounded-xl border border-[#16324F]/8 bg-white px-4 py-3 transition-colors hover:border-[#C65D3B]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
                  >
                    <Clapperboard aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#C65D3B]" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-[#16324F]">{f.title}</span>
                      <span className="block truncate text-xs text-[#1F2933]/55">{t(f.caption)}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {learning.length > 12 && (
            <motion.button
              onClick={() => setExpanded((e) => !e)}
              whileHover={reduced ? {} : { x: 2 }}
              className="mt-5 flex items-center gap-2 text-sm text-[#1F2933]/60 hover:text-[#C65D3B]"
            >
              <motion.span
                animate={reduced ? {} : { rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
              {expanded ? "Show fewer films" : `Show all ${learning.length} films`}
            </motion.button>
          )}
        </section>
      )}
    </div>
  );
}

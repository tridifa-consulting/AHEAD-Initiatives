"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function Chapter({
  slug, number, title, subtitle, tone = "paper", children,
}: {
  slug: string; number: number; title: string;
  subtitle?: string; tone?: "paper" | "white" | "ink"; children: React.ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();

  const bg = tone === "ink" ? "bg-[#16324F] text-[#FAF7F0]"
    : tone === "white"      ? "bg-white text-[#1F2933]"
                            : "bg-[#FAF7F0] text-[#1F2933]";
  const rule  = tone === "ink" ? "border-[#FAF7F0]/15" : "border-[#16324F]/10";
  const sub   = tone === "ink" ? "text-[#FAF7F0]/60"   : "text-[#1F2933]/55";
  const plate = tone === "ink" ? "text-[#E9B44C]"       : "text-[#C65D3B]";

  return (
    <section id={slug} className={`${bg} scroll-mt-20 py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Chapter header */}
        <div className={`mb-12 border-b ${rule} pb-6 sm:mb-16`}>
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-2 font-mono text-xs font-semibold tracking-[0.3em] ${plate}`}
          >
            {String(number).padStart(2, "0")}
          </motion.div>
          <motion.h2
            ref={ref}
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={reduced ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`mt-2 text-sm sm:text-base ${sub}`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

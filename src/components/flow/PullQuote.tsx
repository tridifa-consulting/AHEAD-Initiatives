"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function PullQuote({ text, attribution }: { text: string; attribution?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-24, 24]);

  return (
    <figure ref={ref} className="relative overflow-hidden bg-[#16324F] px-4 py-24 sm:py-32">
      {/* Parallax amber oval */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#E9B44C]/5 blur-3xl"
        style={{ y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#C65D3B]/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, -24]) }}
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.blockquote
          initial={reduced ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-[3px] border-[#E9B44C] pl-7 sm:pl-12"
        >
          <p className="font-serif text-2xl font-medium leading-snug text-[#FAF7F0] sm:text-3xl lg:text-4xl lg:leading-[1.2]">
            {text}
          </p>
        </motion.blockquote>
        {attribution && (
          <motion.figcaption
            initial={reduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-7 pl-7 text-xs uppercase tracking-[0.25em] text-[#FAF7F0]/50 sm:pl-12"
          >
            {attribution}
          </motion.figcaption>
        )}
      </div>
    </figure>
  );
}

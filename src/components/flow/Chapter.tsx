"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function Chapter({
  slug,
  number,
  title,
  subtitle,
  tone = "paper",
  children,
}: {
  slug: string;
  number: number;
  title: string;
  subtitle?: string;
  tone?: "paper" | "white" | "ink";
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();

  const sectionTone =
    tone === "ink"
      ? "bg-[#0f3f3e] text-[#fff8ea]"
      : tone === "white"
        ? "bg-[#fff8ea] text-[#102a2d]"
        : "bg-[#f4e8d4] text-[#102a2d]";

  const overlayTone =
    tone === "ink"
      ? "opacity-100"
      : tone === "white"
        ? "opacity-70"
        : "opacity-90";

  const rule =
    tone === "ink"
      ? "border-[#fff8ea]/16"
      : "border-[#0f3f3e]/12";

  const sub =
    tone === "ink"
      ? "text-[#fff8ea]/68"
      : "text-[#4c5f61]";

  const plate =
    tone === "ink"
      ? "text-[#d8a441]"
      : "text-[#b96543]";

  const titleColor =
    tone === "ink"
      ? "text-[#fff8ea]"
      : "text-[#0f3f3e]";

  return (
    <section
      id={slug}
      className={`${sectionTone} relative scroll-mt-20 overflow-hidden py-24 sm:py-32 lg:py-36`}
    >
      {/* Section atmosphere */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${overlayTone}`}
        style={{
          background:
            tone === "ink"
              ? "radial-gradient(circle at 8% 0%, rgba(216,164,65,0.13), transparent 28rem), radial-gradient(circle at 92% 12%, rgba(185,101,67,0.10), transparent 30rem), linear-gradient(135deg, #0f3f3e 0%, #123c46 58%, #0b2f35 100%)"
              : "radial-gradient(circle at 8% 0%, rgba(216,164,65,0.13), transparent 28rem), radial-gradient(circle at 94% 10%, rgba(31,111,104,0.08), transparent 30rem)",
        }}
      />

      {/* Quiet paper grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.26]"
        style={{
          backgroundImage:
            tone === "ink"
              ? "linear-gradient(rgba(255,248,234,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,234,0.035) 1px, transparent 1px)"
              : "linear-gradient(rgba(185,101,67,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,63,62,0.03) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Chapter header */}
        <div className={`mb-14 border-b ${rule} pb-7 sm:mb-18 lg:mb-20`}>
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-3 flex items-center gap-3 font-mono text-[0.72rem] font-extrabold uppercase tracking-[0.34em] ${plate}`}
          >
            <span>{String(number).padStart(2, "0")}</span>
            <span
              aria-hidden
              className={
                tone === "ink"
                  ? "h-px w-10 bg-[#d8a441]/58"
                  : "h-px w-10 bg-[#b96543]/52"
              }
            />
          </motion.div>

          <motion.h2
            ref={ref}
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`max-w-5xl font-serif text-[2.75rem] font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-[4rem] ${titleColor}`}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={reduced ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`mt-4 max-w-3xl text-base font-medium leading-7 sm:text-lg ${sub}`}
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

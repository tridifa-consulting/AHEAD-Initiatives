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
      ? "bg-[#064E7A] text-[#fff8ea]"
      : tone === "white"
        ? "bg-[#fff8ea] text-[#102a2d]"
        : "bg-[#f5ead6] text-[#102a2d]";

  const overlayTone =
    tone === "ink"
      ? "opacity-100"
      : tone === "white"
        ? "opacity-70"
        : "opacity-90";

  const rule =
    tone === "ink"
      ? "border-[#fff8ea]/16"
      : "border-[#075985]/12";

  const sub =
    tone === "ink"
      ? "text-[#fff8ea]/70"
      : "text-[#4c5f61]";

  const plate =
    tone === "ink"
      ? "text-[#67E8F9]"
      : "text-[#b96543]";

  const titleColor =
    tone === "ink"
      ? "text-[#fff8ea]"
      : "text-[#064E7A]";

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
              ? "radial-gradient(circle at 8% 0%, rgba(103,232,249,0.12), transparent 28rem), radial-gradient(circle at 92% 12%, rgba(185,101,67,0.10), transparent 30rem), linear-gradient(135deg, #064E7A 0%, #075985 52%, #083344 100%)"
              : "radial-gradient(circle at 8% 0%, rgba(216,164,65,0.12), transparent 28rem), radial-gradient(circle at 94% 10%, rgba(8,145,178,0.11), transparent 30rem)",
        }}
      />

      {/* Quiet paper grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.24]"
        style={{
          backgroundImage:
            tone === "ink"
              ? "linear-gradient(rgba(255,248,234,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,234,0.035) 1px, transparent 1px)"
              : "linear-gradient(rgba(185,101,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.035) 1px, transparent 1px)",
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
                  ? "h-px w-10 bg-[#67E8F9]/55"
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

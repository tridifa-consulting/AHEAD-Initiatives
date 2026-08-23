"use client";

import {
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

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
  const ref =
    useRef<HTMLHeadingElement>(
      null
    );

  const inView = useInView(
    ref,
    {
      once: true,
      margin:
        "0px 0px -10% 0px",
    }
  );

  const reduced =
    useReducedMotion();

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
      className={`${sectionTone} relative scroll-mt-16 overflow-hidden py-14 sm:scroll-mt-20 sm:py-24 lg:py-32`}
    >
      {/* ───────────────────────────────────────
          Section atmosphere
      ──────────────────────────────────────── */}

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

      {/* ───────────────────────────────────────
          Quiet paper grid
      ──────────────────────────────────────── */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] sm:opacity-[0.24]"
        style={{
          backgroundImage:
            tone === "ink"
              ? "linear-gradient(rgba(255,248,234,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,248,234,0.035) 1px, transparent 1px)"
              : "linear-gradient(rgba(185,101,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.035) 1px, transparent 1px)",
          backgroundSize:
            "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─────────────────────────────────────
            Chapter header

            Mobile intentionally uses a more compact editorial
            rhythm. Desktop proportions remain generous.
        ────────────────────────────────────── */}

        <div
          className={`mb-8 border-b ${rule} pb-5 sm:mb-12 sm:pb-7 lg:mb-16`}
        >
          {/* Chapter number */}
          <motion.div
            initial={
              reduced
                ? {}
                : {
                    opacity: 0,
                    x: -12,
                  }
            }
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              ease,
            }}
            className={`mb-2.5 flex items-center gap-2.5 font-mono text-[0.62rem] font-extrabold uppercase tracking-[0.28em] sm:mb-3 sm:gap-3 sm:text-[0.72rem] sm:tracking-[0.34em] ${plate}`}
          >
            <span>
              {String(
                number
              ).padStart(
                2,
                "0"
              )}
            </span>

            <span
              aria-hidden
              className={
                tone === "ink"
                  ? "h-px w-8 bg-[#67E8F9]/55 sm:w-10"
                  : "h-px w-8 bg-[#b96543]/52 sm:w-10"
              }
            />
          </motion.div>

          {/* Chapter title */}
          <motion.h2
            ref={ref}
            initial={
              reduced
                ? {}
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.58,
              delay: 0.05,
              ease,
            }}
            className={`max-w-5xl text-balance font-serif text-[clamp(2.2rem,10.5vw,2.7rem)] font-bold leading-[0.98] tracking-[-0.04em] sm:text-5xl sm:leading-[0.97] lg:text-[4rem] lg:leading-[0.95] ${titleColor}`}
          >
            {title}
          </motion.h2>

          {/* Optional subtitle */}
          {subtitle && (
            <motion.p
              initial={
                reduced
                  ? {}
                  : {
                      opacity: 0,
                      y: 6,
                    }
              }
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.48,
                delay: 0.13,
                ease,
              }}
              className={`mt-3 max-w-3xl text-[0.95rem] font-medium leading-[1.6] sm:mt-4 sm:text-lg sm:leading-7 ${sub}`}
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

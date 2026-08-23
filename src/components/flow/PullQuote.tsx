"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PullQuote({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const upperDrift = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-22, 22]
  );

  const lowerDrift = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [22, -22]
  );

  return (
    <figure
      ref={ref}
      className="relative isolate overflow-hidden bg-[#064E7A] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* Blue / aqua depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, #053B5E 0%, #064E7A 46%, #075985 72%, #087C99 100%)",
        }}
      />

      {/* Soft aqua atmosphere */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#67E8F9]/10 blur-3xl"
        style={{ y: upperDrift }}
      />

      {/* Warm counterbalance */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-36 -left-28 -z-10 h-[26rem] w-[26rem] rounded-full bg-[#D8A441]/8 blur-3xl"
        style={{ y: lowerDrift }}
      />

      {/* Quiet archival grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      {/* Aqua top rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#67E8F9] via-[#A5F3FC] to-[#D8A441]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section marker */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "0px 0px -15% 0px",
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-[#67E8F9]/65" />

          <span className="font-[var(--font-display)] text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-[#B9F6FF]/80">
            AHEAD Initiatives
          </span>

          <span className="h-px w-10 bg-[#67E8F9]/65" />
        </motion.div>

        {/* Quote composition */}
        <div className="relative mx-auto max-w-5xl">
          {/* Oversized quotation mark */}
          <motion.div
            aria-hidden
            initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="pointer-events-none absolute -left-2 -top-16 font-serif text-[9rem] font-bold leading-none text-[#67E8F9]/10 sm:-left-10 sm:-top-20 sm:text-[12rem]"
          >
            “
          </motion.div>

          <motion.blockquote
            initial={
              reduced
                ? {}
                : {
                    opacity: 0,
                    y: 26,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "0px 0px -15% 0px",
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="relative text-center"
          >
            <p className="font-serif text-[2rem] font-bold leading-[1.35] tracking-[-0.03em] text-[#FFF8EA] sm:text-[2.6rem] sm:leading-[1.28] lg:text-[3.35rem] lg:leading-[1.2]">
              {text}
            </p>
          </motion.blockquote>

          {/* Closing rule */}
          <motion.div
            aria-hidden
            initial={
              reduced
                ? {}
                : {
                    scaleX: 0,
                  }
            }
            whileInView={{
              scaleX: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.28,
              ease,
            }}
            className="mx-auto mt-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#67E8F9]/75 to-transparent"
          />

          {attribution && (
            <motion.figcaption
              initial={
                reduced
                  ? {}
                  : {
                      opacity: 0,
                      y: 8,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.38,
                duration: 0.55,
                ease,
              }}
              className="mt-6 text-center font-[var(--font-display)] text-[0.67rem] font-bold uppercase tracking-[0.24em] text-[#B9F6FF]/62"
            >
              {attribution}
            </motion.figcaption>
          )}
        </div>
      </div>

      {/* Bottom transition line */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/28 to-transparent"
      />
    </figure>
  );
}

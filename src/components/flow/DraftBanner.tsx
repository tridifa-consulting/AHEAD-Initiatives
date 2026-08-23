"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, X } from "lucide-react";

/**
 * Staff-only indicator shown while Next.js draft preview is enabled.
 *
 * Important:
 * - Exact preview wording is preserved.
 * - Existing /api/draft?disable=1 behaviour is preserved.
 * - This remains visually secondary to the public website.
 */
export default function DraftBanner() {
  const reduced = useReducedMotion();

  return (
    <motion.aside
      aria-label="Draft preview mode"
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: -8,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative z-[60] overflow-hidden border-b border-[#064E7A]/10 bg-[#EAFBFD]"
    >
      {/* Quiet aqua depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(103,232,249,0.12),rgba(255,248,234,0.55),rgba(103,232,249,0.10))]"
      />

      {/* Preview-status rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
      />

      <div className="relative mx-auto flex min-h-10 max-w-7xl items-center justify-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#0891B2]/18 bg-white/65 text-[#075985]">
          <Eye
            aria-hidden
            className="h-3.5 w-3.5"
          />
        </span>

        <p className="text-center text-[0.75rem] font-semibold leading-relaxed text-[#344F59] sm:text-[0.8rem]">
          Draft preview — you are seeing unpublished content.{" "}

          <a
            href="/api/draft?disable=1"
            className="group ml-1 inline-flex items-center gap-1 font-bold text-[#064E7A] underline decoration-[#0891B2]/35 underline-offset-[3px] transition-colors hover:text-[#0891B2]"
          >
            Exit preview

            <X
              aria-hidden
              className="h-3 w-3 transition-transform duration-200 group-hover:rotate-90"
            />
          </a>
        </p>
      </div>
    </motion.aside>
  );
}

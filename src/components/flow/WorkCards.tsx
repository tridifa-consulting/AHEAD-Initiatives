"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Wheat, GraduationCap, Palette, Sparkles, Landmark, ArrowUpRight } from "lucide-react";
import type { SiteSection } from "@/lib/types";
import { t } from "@/lib/types";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat, GraduationCap, Palette, Sparkles, Landmark,
};

/**
 * The five areas as one connected system, not a card grid:
 * Local Self Governance is AHEAD's fundamental strategy (verified from the
 * mission text), so it anchors the layout as the root territory; the four
 * programme areas branch from it. A drawn connector encodes that structure.
 */
function Territory({
  area, index, isRoot = false, inView, reduced,
}: { area: SiteSection; index: number; isRoot?: boolean; inView: boolean; reduced: boolean | null }) {
    const extra = area.extra as { icon?: string; color?: string; legacy_href?: string };
    const Icon = icons[extra.icon ?? ""] ?? Wheat;
    return (
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.15 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        <Link
          href={extra.legacy_href ?? "#work"}
          className={`group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B] ${
            isRoot
              ? "border-[#16324F]/15 bg-[#16324F] text-[#FAF7F0] hover:shadow-xl sm:flex-row sm:items-center sm:gap-8 sm:p-8"
              : "border-[#16324F]/8 bg-white hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
          }`}
        >
          <div className={isRoot ? "sm:flex sm:items-center sm:gap-6" : ""}>
            <span
              className={`inline-flex shrink-0 items-center justify-center rounded-xl text-white ${isRoot ? "h-14 w-14" : "mb-4 h-11 w-11"}`}
              style={{ backgroundColor: extra.color ?? "#2D6A4F" }}
            >
              <Icon className={isRoot ? "h-6 w-6" : "h-5 w-5"} />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            {isRoot && (
              <div className="mb-1 mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E9B44C] sm:mt-0">
                The fundamental strategy
              </div>
            )}
            <h3 className={`font-serif font-semibold ${isRoot ? "text-2xl" : "text-lg text-[#16324F]"}`}>
              {t(area.title)}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${isRoot ? "max-w-2xl text-[#FAF7F0]/75" : "text-[#1F2933]/70"}`}>
              {t(area.body)}
            </p>
          </div>
          <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${isRoot ? "text-[#E9B44C] sm:mt-0" : "text-[#C65D3B]"}`}>
            Explore
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
          </span>
        </Link>
      </motion.div>
    );
}

export default function WorkCards({ areas }: { areas: SiteSection[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const root = areas.find((a) => a.slug === "work-strategy");
  const branches = areas.filter((a) => a.slug !== "work-strategy");

  return (
    <div ref={ref}>
      {root && <Territory area={root} index={0} isRoot inView={inView} reduced={reduced} />}

      {/* connector: strategy feeds the four territories */}
      <div aria-hidden className="mx-auto my-2 flex w-full max-w-xs items-start justify-center">
        <motion.div
          initial={reduced ? {} : { scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="h-8 w-px bg-gradient-to-b from-[#16324F]/40 to-[#C65D3B]/40"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {branches.map((a, i) => <Territory key={a.id} area={a} index={i + 1} inView={inView} reduced={reduced} />)}
      </div>
    </div>
  );
}

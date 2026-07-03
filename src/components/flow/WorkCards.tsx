"use client";

import Link from "next/link";
import { Wheat, GraduationCap, Palette, Sparkles, Landmark, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { SiteSection } from "@/lib/types";
import { t } from "@/lib/types";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat, GraduationCap, Palette, Sparkles, Landmark,
};

function WorkCard({ area, index }: { area: SiteSection; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const extra = area.extra as { icon?: string; color?: string; legacy_href?: string };
  const Icon = icons[extra.icon ?? ""] ?? Wheat;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? {} : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={reduced ? {} : { y: -5, scale: 1.015 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-full"
      >
        <Link
          href={extra.legacy_href ?? "#work"}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#16324F]/8 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
        >
          {/* Colour band */}
          <div
            className="h-1.5 w-full"
            style={{ background: `linear-gradient(90deg, ${extra.color ?? "#2D6A4F"}, ${extra.color ?? "#2D6A4F"}99)` }}
          />
          <div className="flex flex-1 flex-col p-6">
            <motion.span
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: extra.color ?? "#2D6A4F" }}
              whileHover={reduced ? {} : { rotate: [0, -6, 6, 0] }}
              transition={{ duration: 0.4 }}
            >
              <Icon className="h-5 w-5" />
            </motion.span>
            <h3 className="font-serif text-xl font-semibold text-[#16324F]">{t(area.title)}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1F2933]/70">{t(area.body)}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#C65D3B]">
              Read the full story
              <motion.span
                className="inline-block"
                animate={reduced ? {} : { x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function WorkCards({ areas }: { areas: SiteSection[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((a, i) => <WorkCard key={a.id} area={a} index={i} />)}
    </div>
  );
}

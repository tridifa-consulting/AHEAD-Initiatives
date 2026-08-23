"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SiteSection } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const markers = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
];

function programmeMarker(index: number) {
  return markers[index] ?? String(index + 1).padStart(2, "0");
}

/**
 * AHEAD's areas of work are presented as one connected programme system.
 *
 * Local Self Governance remains the fundamental strategy and visual
 * foundation. The remaining programme areas branch from that strategy.
 *
 * Content, links and ordering are preserved from the CMS.
 */
function RootTerritory({
  area,
  inView,
  reduced,
}: {
  area: SiteSection;
  inView: boolean;
  reduced: boolean | null;
}) {
  const extra = area.extra as {
    icon?: string;
    color?: string;
    legacy_href?: string;
  };

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.08,
        ease,
      }}
    >
      <Link
        href={extra.legacy_href ?? "#work"}
        className="group relative block overflow-hidden rounded-[2rem] border border-[#8EDFEA]/25 bg-[#064E7A] text-white shadow-[0_24px_70px_rgba(6,78,122,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_80px_rgba(6,78,122,0.26)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0891B2] motion-reduce:hover:translate-y-0"
      >
        {/* Background depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(103,232,249,0.18),transparent_24rem),radial-gradient(circle_at_8%_100%,rgba(216,164,65,0.10),transparent_22rem),linear-gradient(135deg,#064E7A_0%,#075985_58%,#083B59_100%)]"
        />

        {/* Archival line pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Top identity line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#67E8F9] via-[#A5F3FC] to-[#D8A441]"
        />

        <div className="relative grid gap-8 px-7 py-8 sm:px-9 sm:py-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:px-11 lg:py-10">
          <div className="max-w-4xl">
            {/* Existing institutional label */}
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-10 bg-[#67E8F9]/70"
              />

              <span className="font-[var(--font-display)] text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-[#FFE29A]">
                The fundamental strategy
              </span>
            </div>

            <h3 className="max-w-3xl font-serif text-[1.8rem] font-bold leading-tight tracking-[-0.035em] text-[#FFF8EA] sm:text-[2.15rem]">
              {t(area.title)}
            </h3>

            <p className="mt-4 max-w-3xl text-[0.98rem] font-medium leading-[1.8] text-white/78 sm:text-[1.03rem]">
              {t(area.body)}
            </p>
          </div>

          <div className="flex items-center lg:justify-end">
            <span className="inline-flex items-center gap-2 border-b border-[#67E8F9]/35 pb-1 font-[var(--font-display)] text-sm font-bold text-[#B9F6FF] transition-colors duration-200 group-hover:border-[#FFE29A]/70 group-hover:text-[#FFE29A]">
              Explore

              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ProgrammeTerritory({
  area,
  index,
  inView,
  reduced,
}: {
  area: SiteSection;
  index: number;
  inView: boolean;
  reduced: boolean | null;
}) {
  const extra = area.extra as {
    icon?: string;
    color?: string;
    legacy_href?: string;
  };

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.58,
        delay: 0.26 + index * 0.09,
        ease,
      }}
      className="h-full"
    >
      <Link
        href={extra.legacy_href ?? "#work"}
        className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[1.65rem] border border-[#064E7A]/12 bg-[#FFFBF2] p-7 shadow-[0_14px_42px_rgba(6,78,122,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0891B2]/28 hover:shadow-[0_24px_60px_rgba(6,78,122,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0891B2] motion-reduce:hover:translate-y-0"
      >
        {/* Top programme line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
        />

        {/* Restrained background motif */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full border border-[#0891B2]/8 bg-[#67E8F9]/5 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Programme marker */}
        <div className="relative mb-7 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-7 bg-[#B96543]/65"
            />

            <span className="font-[var(--font-display)] text-[0.67rem] font-extrabold uppercase tracking-[0.26em] text-[#B96543]">
              {programmeMarker(index)}
            </span>
          </div>

          <span
            aria-hidden
            className="font-[var(--font-display)] text-[2.8rem] font-extrabold leading-none tracking-[-0.06em] text-[#0891B2]/10"
          >
            {programmeMarker(index)}
          </span>
        </div>

        {/* Programme content */}
        <div className="relative flex flex-1 flex-col">
          <h3 className="max-w-xs font-serif text-[1.3rem] font-bold leading-[1.25] tracking-[-0.025em] text-[#064E7A] sm:text-[1.4rem]">
            {t(area.title)}
          </h3>

          <p className="mt-4 flex-1 text-[0.94rem] font-medium leading-[1.75] text-[#435B65]">
            {t(area.body)}
          </p>

          <div className="mt-7">
            <span className="inline-flex items-center gap-2 border-b border-[#B96543]/25 pb-1 font-[var(--font-display)] text-[0.82rem] font-bold text-[#B96543] transition-all duration-200 group-hover:border-[#0891B2]/50 group-hover:text-[#075985]">
              Explore

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkCards({
  areas,
}: {
  areas: SiteSection[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -12% 0px",
  });

  const reduced = useReducedMotion();

  const root = areas.find(
    (area) => area.slug === "work-strategy"
  );

  const branches = areas.filter(
    (area) => area.slug !== "work-strategy"
  );

  return (
    <div ref={ref} className="relative">
      {/* Fundamental strategy */}
      {root && (
        <RootTerritory
          area={root}
          inView={inView}
          reduced={reduced}
        />
      )}

      {/* Strategy-to-programmes connector */}
      {root && branches.length > 0 && (
        <div
          aria-hidden
          className="relative mx-auto h-16 w-full"
        >
          {/* Vertical stem */}
          <motion.div
            initial={
              reduced
                ? {}
                : {
                    scaleY: 0,
                    originY: 0,
                  }
            }
            animate={
              inView
                ? {
                    scaleY: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.45,
              delay: 0.26,
              ease,
            }}
            className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-[#064E7A]/55 to-[#0891B2]/35"
          />

          {/* Horizontal branch */}
          <motion.div
            initial={
              reduced
                ? {}
                : {
                    scaleX: 0,
                  }
            }
            animate={
              inView
                ? {
                    scaleX: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.55,
              delay: 0.43,
              ease,
            }}
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px origin-center bg-gradient-to-r from-transparent via-[#0891B2]/32 to-transparent lg:block"
          />

          {/* Centre detail */}
          <motion.div
            initial={
              reduced
                ? {}
                : {
                    opacity: 0,
                    scale: 0.7,
                  }
            }
            animate={
              inView
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.35,
              delay: 0.48,
            }}
            className="absolute left-1/2 top-[29px] h-2 w-2 -translate-x-1/2 rounded-full border-2 border-[#FFF8EA] bg-[#0891B2] shadow-[0_0_0_1px_rgba(8,145,178,0.28)]"
          />
        </div>
      )}

      {/* Programme territories */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {branches.map((area, index) => (
          <ProgrammeTerritory
            key={area.id}
            area={area}
            index={index}
            inView={inView}
            reduced={reduced}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";
import CountUp from "./CountUp";

/** Full-bleed opening: slow photographic cross-fade beneath the serif thesis. */
export default function Hero({
  title,
  subtitle,
  stats,
  slides,
}: {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  slides: MediaRow[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section id="top" className="relative isolate min-h-[88vh] overflow-hidden bg-[#16324F]">
      {slides.map((s, i) => (
        <Image
          key={s.id}
          src={s.file_path ?? s.url ?? ""}
          alt={i === index ? t(s.alt_text) : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1800ms] motion-reduce:transition-none ${
            i === index ? "kenburns-active opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#16324F] via-[#16324F]/55 to-[#16324F]/25" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#E9B44C]">
          Eastern India · since 2009
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[#FAF7F0] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#FAF7F0]/85 sm:text-lg">{subtitle}</p>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#FAF7F0]/20 pt-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl font-semibold text-[#FAF7F0] sm:text-4xl"><CountUp value={s.value} /></div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#FAF7F0]/70 sm:text-sm sm:normal-case sm:tracking-normal">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <a
          href="#story"
          aria-label="Scroll to begin the story"
          className="mt-10 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FAF7F0]/70 transition-colors hover:text-[#E9B44C]"
        >
          Scroll to begin
          <span aria-hidden className="inline-block animate-bounce motion-reduce:animate-none">↓</span>
        </a>
      </div>
    </section>
  );
}

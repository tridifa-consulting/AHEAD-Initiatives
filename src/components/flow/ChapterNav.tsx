"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export type Chapter = { slug: string; label: string };

export default function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.slug ?? "");
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* scroll-spy */
  useEffect(() => {
    const els: [string, HTMLElement][] = chapters
      .map((c) => [c.slug, document.getElementById(c.slug)] as [string, HTMLElement | null])
      .filter(([, el]) => el !== null) as [string, HTMLElement][];

    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) setActive(visible[0].target.id);
        });
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );

    els.forEach(([, el]) => obs.observe(el));

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [chapters]);

  /* navbar shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-centre the active pill — horizontal ONLY, scoped to the nav strip. */
  useEffect(() => {
    const bar = barRef.current;
    const link = bar?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!bar || !link) return;

    const targetLeft = link.offsetLeft - bar.clientWidth / 2 + link.clientWidth / 2;

    bar.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  return (
    <header
      className="sticky top-0 z-50 overflow-hidden border-b border-[#14314d]/10 transition-shadow duration-300"
      style={{
        backgroundColor: "rgba(255, 250, 241, 0.94)",
        backdropFilter: "blur(18px)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(20,49,77,0.08), 0 16px 42px rgba(16,42,67,0.08)"
          : "0 1px 0 rgba(20,49,77,0.04)",
      }}
    >
      {/* Quiet archival paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,92,56,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,49,77,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Fine terracotta manuscript rule */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(184,92,56,0.85), rgba(223,175,69,0.65), rgba(47,95,70,0.55), rgba(20,49,77,0.50))",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo + Wordmark */}
        <Link
          href="#top"
          className="group flex shrink-0 items-center gap-3 py-3.5"
          aria-label="AHEAD Initiatives — back to top"
        >
          <motion.div
            whileHover={reduced ? {} : { scale: 1.04 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-full border border-[#b85c38]/25 bg-[#fffaf1]" />
            <div className="relative rounded-full border border-[#14314d]/10 bg-[#fffaf1] p-1 shadow-sm">
              <Image
                src="/logo.jpg"
                alt=""
                width={34}
                height={34}
                className="rounded-full"
                priority
              />
            </div>
          </motion.div>

          <span className="hidden sm:block">
            <span className="block font-serif text-[1.05rem] font-semibold leading-none tracking-tight text-[#14314d]">
              AHEAD
            </span>
            <span className="mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#b85c38]">
              Initiatives
            </span>
          </span>
        </Link>

        {/* Small vertical divider */}
        <div
          aria-hidden
          className="hidden h-8 w-px bg-gradient-to-b from-transparent via-[#14314d]/18 to-transparent sm:block"
        />

        {/* Chapter pills */}
        <nav
          ref={barRef}
          aria-label="Chapters"
          className="scrollbar-none -mb-px flex flex-1 items-center gap-1 overflow-x-auto py-3"
        >
          {chapters.map((c) => {
            const current = active === c.slug;

            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                aria-current={current ? "true" : undefined}
                className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b85c38]"
                style={{
                  color: current ? "#fffaf1" : "rgba(20, 49, 77, 0.72)",
                  backgroundColor: current ? "#14314d" : "rgba(255, 250, 241, 0.34)",
                  border: current
                    ? "1px solid rgba(20,49,77,0.92)"
                    : "1px solid rgba(20,49,77,0.08)",
                  boxShadow: current
                    ? "0 8px 20px rgba(20,49,77,0.18)"
                    : "0 1px 0 rgba(255,255,255,0.55)",
                }}
              >
                {current && (
                  <motion.span
                    layoutId="chapter-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(20,49,77,1), rgba(29,63,95,1))",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}

                <span className="relative z-10">{c.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Reading thread */}
      <div aria-hidden className="relative h-[3px] w-full overflow-hidden bg-[#14314d]/8">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: progressWidth,
            background:
              "linear-gradient(90deg, #2f5f46 0%, #b85c38 45%, #dfaf45 72%, #14314d 100%)",
          }}
        />
      </div>
    </header>
  );
}

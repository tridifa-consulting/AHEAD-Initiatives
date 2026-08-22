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
      className="sticky top-0 z-50 overflow-hidden border-b border-[#0f3f3e]/10 transition-shadow duration-300"
      style={{
        backgroundColor: "rgba(255, 248, 234, 0.94)",
        backdropFilter: "blur(18px)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(15,63,62,0.08), 0 16px 42px rgba(15,63,62,0.08)"
          : "0 1px 0 rgba(15,63,62,0.04)",
      }}
    >
      {/* Quiet beige paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,101,67,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,63,62,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Fine teal-beige manuscript rule */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,63,62,0.85), rgba(31,111,104,0.72), rgba(216,164,65,0.62), rgba(185,101,67,0.58))",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo + wordmark */}
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
            <div className="absolute -inset-1 rounded-full border border-[#b96543]/25 bg-[#fff8ea]" />
            <div className="relative rounded-full border border-[#0f3f3e]/12 bg-[#fff8ea] p-1 shadow-sm">
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
            <span className="block font-serif text-[1.1rem] font-bold leading-none tracking-tight text-[#0f3f3e]">
              AHEAD
            </span>
            <span className="mt-0.5 block text-[0.64rem] font-bold uppercase tracking-[0.30em] text-[#b96543]">
              Initiatives
            </span>
          </span>
        </Link>

        {/* Small vertical divider */}
        <div
          aria-hidden
          className="hidden h-8 w-px bg-gradient-to-b from-transparent via-[#0f3f3e]/18 to-transparent sm:block"
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
                className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b96543]"
                style={{
                  color: current ? "#fff8ea" : "rgba(16, 42, 45, 0.74)",
                  backgroundColor: current ? "#0f3f3e" : "rgba(255, 248, 234, 0.42)",
                  border: current
                    ? "1px solid rgba(15,63,62,0.92)"
                    : "1px solid rgba(15,63,62,0.10)",
                  boxShadow: current
                    ? "0 8px 20px rgba(15,63,62,0.20)"
                    : "0 1px 0 rgba(255,255,255,0.55)",
                }}
              >
                {current && (
                  <motion.span
                    layoutId="chapter-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(15,63,62,1), rgba(18,60,70,1))",
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
      <div aria-hidden className="relative h-[3px] w-full overflow-hidden bg-[#0f3f3e]/8">
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: progressWidth,
            background:
              "linear-gradient(90deg, #0f3f3e 0%, #1f6f68 38%, #d8a441 68%, #b96543 100%)",
          }}
        />
      </div>
    </header>
  );
}

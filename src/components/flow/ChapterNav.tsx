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
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [chapters]);

  /* navbar shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-centre the active pill — horizontal ONLY, scoped to the nav strip.
     (scrollIntoView could nudge the page vertically on every scroll-spy
     change, which is exactly the "page jumps while scrolling" bug.) */
  useEffect(() => {
    const bar = barRef.current;
    const link = bar?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!bar || !link) return;
    const targetLeft = link.offsetLeft - bar.clientWidth / 2 + link.clientWidth / 2;
    bar.scrollTo({ left: Math.max(0, targetLeft), behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{ backgroundColor: "rgba(250,247,240,0.97)", backdropFilter: "blur(12px)",
               boxShadow: scrolled ? "0 1px 0 rgba(22,50,79,0.10), 0 4px 16px rgba(22,50,79,0.06)" : "none" }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo + wordmark */}
        <Link href="#top" className="flex shrink-0 items-center gap-2.5 py-3" aria-label="AHEAD Initiatives — back to top">
          <motion.div whileHover={reduced ? {} : { scale: 1.04 }} whileTap={reduced ? {} : { scale: 0.97 }}>
            <Image src="/logo.jpg" alt="" width={32} height={32} className="rounded-full" />
          </motion.div>
          <span className="hidden font-serif text-base font-semibold tracking-tight text-[#16324F] sm:block">
            AHEAD <span className="font-normal text-[#16324F]/60">Initiatives</span>
          </span>
        </Link>

        {/* Chapter pills */}
        <nav
          ref={barRef}
          aria-label="Chapters"
          className="scrollbar-none -mb-px flex flex-1 items-center gap-0.5 overflow-x-auto py-2.5"
        >
          {chapters.map((c) => {
            const current = active === c.slug;
            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                aria-current={current ? "true" : undefined}
                className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65D3B]"
                style={{
                  color: current ? "#FAF7F0" : "rgba(22,50,79,0.7)",
                  backgroundColor: current ? "#16324F" : "transparent",
                }}
              >
                {c.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Reading thread — Framer Motion spring-driven */}
      <div aria-hidden className="relative h-[2.5px] w-full overflow-hidden bg-[#16324F]/6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2D6A4F] via-[#C65D3B] to-[#E9B44C]"
          style={{ width: reduced ? progressWidth : progressWidth }}
        />
      </div>
    </header>
  );
}

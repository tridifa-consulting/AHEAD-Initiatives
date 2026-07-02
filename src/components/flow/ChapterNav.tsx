"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type Chapter = { slug: string; label: string };

/**
 * Sticky chapter navigator.
 * - Highlights the chapter currently in view (IntersectionObserver)
 * - A hairline "reading thread" under the bar fills with scroll progress
 * - Horizontally scrollable on small screens; keyboard friendly
 */
export default function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.slug ?? "");
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // choose the visible section closest to the top of the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapters]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // keep the active pill in view on small screens
  useEffect(() => {
    const link = barRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    link?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F0]/95 backdrop-blur border-b border-[#16324F]/10">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5 py-3" aria-label="AHEAD Initiatives — back to top">
          <Image src="/logo.jpg" alt="" width={34} height={34} className="rounded-full" />
          <span className="hidden font-serif text-lg font-semibold tracking-tight text-[#16324F] sm:block">
            AHEAD <span className="font-normal text-[#16324F]/70">Initiatives</span>
          </span>
        </a>
        <nav
          ref={barRef}
          aria-label="Chapters"
          className="scrollbar-none -mb-px flex flex-1 items-center gap-1 overflow-x-auto py-2"
        >
          {chapters.map((c) => {
            const current = active === c.slug;
            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                aria-current={current ? "true" : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65D3B] ${
                  current
                    ? "bg-[#16324F] text-[#FAF7F0]"
                    : "text-[#16324F]/75 hover:bg-[#16324F]/8 hover:text-[#16324F]"
                }`}
              >
                {c.label}
              </a>
            );
          })}
        </nav>
      </div>
      {/* reading thread */}
      <div aria-hidden className="h-[2px] w-full bg-[#16324F]/8">
        <div
          className="h-full bg-gradient-to-r from-[#2D6A4F] via-[#C65D3B] to-[#E9B44C] transition-[width] duration-150 motion-reduce:transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}

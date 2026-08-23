"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export type Chapter = {
  slug: string;
  label: string;
  href?: string;
};

export default function ChapterNav({
  chapters,
  activeSlug,
}: {
  chapters: Chapter[];
  activeSlug?: string;
}) {
  const [active, setActive] = useState(activeSlug ?? "");
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  useEffect(() => {
    if (activeSlug) setActive(activeSlug);
  }, [activeSlug]);

  useEffect(() => {
    if (activeSlug) return;

    const els = chapters
      .map((chapter) => {
        const el = document.getElementById(chapter.slug);
        return el ? ([chapter.slug, el] as [string, HTMLElement]) : null;
      })
      .filter(
        (item): item is [string, HTMLElement] => item !== null
      );

    if (els.length === 0) {
      setActive("");
      return;
    }

    setActive((current) => {
      if (current && els.some(([slug]) => slug === current)) {
        return current;
      }
      return els[0][0];
    });

    let raf = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                a.boundingClientRect.top - b.boundingClientRect.top
            );

          if (visible[0]) setActive(visible[0].target.id);
        });
      },
      {
        rootMargin: "-24% 0px -62% 0px",
      }
    );

    els.forEach(([, el]) => observer.observe(el));

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [chapters, activeSlug]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!active) return;

    const bar = barRef.current;
    const link = bar?.querySelector<HTMLAnchorElement>(
      `[data-chapter="${active}"]`
    );

    if (!bar || !link) return;

    const targetLeft =
      link.offsetLeft - bar.clientWidth / 2 + link.clientWidth / 2;

    const maxLeft = Math.max(0, bar.scrollWidth - bar.clientWidth);

    bar.scrollTo({
      left: Math.min(maxLeft, Math.max(0, targetLeft)),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  return (
    <header
      className="sticky top-0 z-50 overflow-hidden border-b border-[#064E7A]/8 transition-shadow duration-300"
      style={{
        backgroundColor: "rgba(255,248,234,0.97)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(6,78,122,0.07), 0 10px 28px rgba(6,78,122,0.075)"
          : "0 1px 0 rgba(6,78,122,0.035)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,101,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #064E7A 0%, #0891B2 38%, #67E8F9 60%, #D8A441 82%, #B96543 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center px-2.5 sm:px-6 lg:px-8">
        <Link
          href="/#top"
          aria-label="AHEAD Initiatives — back to homepage"
          className="group flex shrink-0 items-center gap-3 py-2 sm:py-3"
        >
          <motion.div
            whileHover={reduced ? {} : { scale: 1.035 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-[3px] rounded-full border border-[#0891B2]/16 sm:-inset-1" />

            <div className="relative overflow-hidden rounded-full border border-[#064E7A]/12 bg-[#FFF8EA] p-[2px] shadow-[0_3px_10px_rgba(6,78,122,0.07)] sm:p-[3px]">
              <Image
                src="/logo.jpg"
                alt=""
                width={38}
                height={38}
                priority
                className="h-8 w-8 rounded-full object-cover sm:h-[38px] sm:w-[38px]"
              />
            </div>
          </motion.div>

          <span className="hidden sm:block">
            <span className="block font-serif text-[1.18rem] font-bold leading-[0.95] tracking-[-0.025em] text-[#064E7A]">
              AHEAD
            </span>

            <span className="mt-1 block text-[0.61rem] font-extrabold uppercase tracking-[0.31em] text-[#B96543]">
              Initiatives
            </span>
          </span>
        </Link>

        <div
          aria-hidden
          className="mx-4 hidden h-8 w-px bg-gradient-to-b from-transparent via-[#064E7A]/14 to-transparent sm:block lg:mx-5"
        />

        <div className="relative min-w-0 flex-1">
          <nav
            ref={barRef}
            aria-label="Chapters"
            className="scrollbar-none flex min-w-0 touch-pan-x items-center gap-0.5 overflow-x-auto overscroll-x-contain py-2 pl-2 pr-6 [-webkit-overflow-scrolling:touch] sm:gap-1.5 sm:py-2.5 sm:pl-0 sm:pr-0"
          >
            {chapters.map((chapter) => {
              const current = active === chapter.slug;
              const href = chapter.href ?? `#${chapter.slug}`;
              const localAnchor =
                !chapter.href || chapter.href.startsWith("#");

              return (
                <a
                  key={chapter.slug}
                  href={href}
                  data-chapter={chapter.slug}
                  aria-current={current ? "location" : undefined}
                  onClick={() => {
                    if (localAnchor && !activeSlug) {
                      setActive(chapter.slug);
                    }
                  }}
                  className={`group relative shrink-0 whitespace-nowrap rounded-full px-3 py-[0.42rem] text-[0.76rem] font-semibold leading-none transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2] sm:px-3.5 sm:py-2 sm:text-[0.84rem] ${
                    current
                      ? "text-[#FFF8EA]"
                      : "text-[#344F59] hover:text-[#064E7A]"
                  }`}
                >
                  {current && (
                    <motion.span
                      layoutId="chapter-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, #064E7A 0%, #075985 52%, #087F9C 100%)",
                        boxShadow: "0 5px 14px rgba(6,78,122,0.16)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  {!current && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-[#E6F8FA]/0 transition-colors duration-200 group-hover:bg-[#E6F8FA]/70"
                    />
                  )}

                  <span className="relative z-10">{chapter.label}</span>

                  {!current && (
                    <span
                      aria-hidden
                      className="absolute bottom-[3px] left-1/2 h-px w-0 -translate-x-1/2 bg-[#0891B2]/65 transition-all duration-300 group-hover:w-5 sm:bottom-[4px]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-[#FFF8EA]/95 to-transparent sm:hidden"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="relative h-[2px] w-full overflow-hidden bg-[#064E7A]/6"
      >
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: progressWidth,
            background:
              "linear-gradient(90deg, #064E7A 0%, #0891B2 40%, #67E8F9 63%, #D8A441 83%, #B96543 100%)",
          }}
        />
      </div>
    </header>
  );
}

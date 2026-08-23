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

  /**
   * Optional explicit destination.
   *
   * - Omit on the homepage to use the local anchor: #story, #work, etc.
   * - Use "/#story", "/#work", etc. from inner pages so the global
   *   navigation always returns to the corresponding homepage chapter.
   */
  href?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ChapterNav({
  chapters,
  activeSlug,
}: {
  chapters: Chapter[];

  /**
   * Optional fixed active chapter for pages that use the global navigation
   * but do not contain the homepage section IDs.
   *
   * Example:
   *   <ChapterNav chapters={globalChapters} activeSlug="work" />
   *
   * Homepage usage does not need this prop; scroll-spy remains automatic.
   */
  activeSlug?: string;
}) {
  const [active, setActive] = useState(
    activeSlug ?? ""
  );

  const [scrolled, setScrolled] =
    useState(false);

  const barRef =
    useRef<HTMLElement>(null);

  const reduced =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll();

  const progressWidth =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", "100%"]
    );

  /* ─────────────────────────────────────────────
     Honour an explicitly controlled active chapter
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (activeSlug) {
      setActive(activeSlug);
    }
  }, [activeSlug]);

  /* ─────────────────────────────────────────────
     Scroll spy

     Only chapters that actually exist on the current page are observed.
     This lets the same component safely power:
       - homepage local navigation (#story, #work, ...)
       - inner-page global navigation (/#story, /#work, ...)
  ───────────────────────────────────────────── */

  useEffect(() => {
    /*
     * Inner pages can explicitly pin the relevant global chapter
     * (for example activeSlug="work"). In that mode we do not let
     * an unrelated local element override the global context.
     */
    if (activeSlug) return;

    const els = chapters
      .map((chapter) => {
        const el =
          document.getElementById(
            chapter.slug
          );

        return el
          ? ([chapter.slug, el] as [
              string,
              HTMLElement
            ])
          : null;
      })
      .filter(
        (
          item
        ): item is [
          string,
          HTMLElement
        ] => item !== null
      );

    /*
     * No matching sections on this route means this is acting as
     * global navigation rather than local chapter navigation.
     */
    if (els.length === 0) {
      setActive("");
      return;
    }

    /*
     * Give the homepage an immediate sensible active state before
     * IntersectionObserver reports its first entry.
     */
    setActive((current) => {
      if (
        current &&
        els.some(
          ([slug]) =>
            slug === current
        )
      ) {
        return current;
      }

      return els[0][0];
    });

    let raf = 0;

    const observer =
      new IntersectionObserver(
        (entries) => {
          cancelAnimationFrame(
            raf
          );

          raf =
            requestAnimationFrame(
              () => {
                const visible =
                  entries
                    .filter(
                      (entry) =>
                        entry.isIntersecting
                    )
                    .sort(
                      (a, b) =>
                        a.boundingClientRect
                          .top -
                        b.boundingClientRect
                          .top
                    );

                if (visible[0]) {
                  setActive(
                    visible[0].target.id
                  );
                }
              }
            );
        },
        {
          rootMargin:
            "-25% 0px -60% 0px",
        }
      );

    els.forEach(([, el]) =>
      observer.observe(el)
    );

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [chapters, activeSlug]);

  /* ─────────────────────────────────────────────
     Header depth after scrolling
  ───────────────────────────────────────────── */

  useEffect(() => {
    const onScroll = () =>
      setScrolled(
        window.scrollY > 60
      );

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  /* ─────────────────────────────────────────────
     Keep current chapter visible horizontally

     data-chapter is used instead of querying the href, because href may
     now be either "#work" or "/#work".
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (!active) return;

    const bar =
      barRef.current;

    const link =
      bar?.querySelector<HTMLAnchorElement>(
        `[data-chapter="${active}"]`
      );

    if (!bar || !link) return;

    const targetLeft =
      link.offsetLeft -
      bar.clientWidth / 2 +
      link.clientWidth / 2;

    bar.scrollTo({
      left: Math.max(
        0,
        targetLeft
      ),
      behavior: reduced
        ? "auto"
        : "smooth",
    });
  }, [active, reduced]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#064E7A]/8 transition-shadow duration-300"
      style={{
        backgroundColor:
          "rgba(255,248,234,0.965)",
        backdropFilter:
          "blur(18px)",
        WebkitBackdropFilter:
          "blur(18px)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(6,78,122,0.07), 0 12px 34px rgba(6,78,122,0.08)"
          : "0 1px 0 rgba(6,78,122,0.035)",
      }}
    >
      {/* ────────────────────────────────────────
          Paper texture
      ───────────────────────────────────────── */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,101,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.025) 1px, transparent 1px)",
          backgroundSize:
            "36px 36px",
        }}
      />

      {/* ────────────────────────────────────────
          Fine manuscript line
      ───────────────────────────────────────── */}

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #064E7A 0%, #0891B2 38%, #67E8F9 60%, #D8A441 82%, #B96543 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* ──────────────────────────────────────
            Brand
        ─────────────────────────────────────── */}

        <Link
          href="/#top"
          aria-label="AHEAD Initiatives — back to homepage"
          className="group flex shrink-0 items-center gap-3 py-2.5 sm:py-3"
        >
          <motion.div
            whileHover={
              reduced
                ? {}
                : {
                    scale: 1.035,
                  }
            }
            whileTap={
              reduced
                ? {}
                : {
                    scale: 0.97,
                  }
            }
            transition={{
              duration: 0.2,
            }}
            className="relative"
          >
            {/* Outer institutional seal */}
            <div className="absolute -inset-1 rounded-full border border-[#0891B2]/17" />

            <div className="relative overflow-hidden rounded-full border border-[#064E7A]/12 bg-[#FFF8EA] p-[3px] shadow-[0_3px_12px_rgba(6,78,122,0.08)]">
              <Image
                src="/logo.jpg"
                alt=""
                width={38}
                height={38}
                priority
                className="rounded-full"
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

        {/* Brand separator */}

        <div
          aria-hidden
          className="mx-4 hidden h-8 w-px bg-gradient-to-b from-transparent via-[#064E7A]/14 to-transparent sm:block lg:mx-5"
        />

        {/* ──────────────────────────────────────
            Chapter navigation
        ─────────────────────────────────────── */}

        <nav
          ref={barRef}
          aria-label="Chapters"
          className="scrollbar-none flex flex-1 items-center gap-1 overflow-x-auto py-2.5 sm:gap-1.5"
        >
          {chapters.map((chapter) => {
            const current =
              active ===
              chapter.slug;

            const href =
              chapter.href ??
              `#${chapter.slug}`;

            return (
              <a
                key={chapter.slug}
                href={href}
                data-chapter={
                  chapter.slug
                }
                aria-current={
                  current
                    ? "location"
                    : undefined
                }
                className={`group relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0891B2] sm:text-[0.84rem] ${
                  current
                    ? "text-[#FFF8EA]"
                    : "text-[#344F59] hover:text-[#064E7A]"
                }`}
              >
                {/* Active chapter */}
                {current && (
                  <motion.span
                    layoutId="chapter-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #064E7A 0%, #075985 52%, #087F9C 100%)",
                      boxShadow:
                        "0 7px 18px rgba(6,78,122,0.18)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}

                {/* Inactive hover wash */}
                {!current && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[#E6F8FA]/0 transition-colors duration-200 group-hover:bg-[#E6F8FA]/70"
                  />
                )}

                <span className="relative z-10">
                  {chapter.label}
                </span>

                {/* Editorial aqua underline on hover */}
                {!current && (
                  <span
                    aria-hidden
                    className="absolute bottom-[4px] left-1/2 h-px w-0 -translate-x-1/2 bg-[#0891B2]/65 transition-all duration-300 group-hover:w-5"
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* ────────────────────────────────────────
          Page reading thread
      ───────────────────────────────────────── */}

      <div
        aria-hidden
        className="relative h-[2px] w-full overflow-hidden bg-[#064E7A]/6"
      >
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width:
              progressWidth,
            background:
              "linear-gradient(90deg, #064E7A 0%, #0891B2 40%, #67E8F9 63%, #D8A441 83%, #B96543 100%)",
          }}
        />
      </div>
    </header>
  );
}

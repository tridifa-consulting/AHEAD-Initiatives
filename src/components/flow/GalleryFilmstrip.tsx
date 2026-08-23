"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Pause,
  Play,
} from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────────── */

function Lightbox({
  img,
  onClose,
}: {
  img: MediaRow;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photograph"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031F2E]/96 p-4 backdrop-blur-sm"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[88vh] max-w-6xl overflow-hidden rounded-[1.4rem] border border-white/15 bg-black shadow-[0_35px_100px_rgba(0,0,0,0.55)]"
        initial={
          reduced
            ? {}
            : {
                scale: 0.96,
                opacity: 0,
              }
        }
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={
          reduced
            ? {}
            : {
                scale: 0.96,
                opacity: 0,
              }
        }
        transition={{
          duration: 0.3,
          ease,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url ?? img.file_path ?? ""}
          alt={t(img.alt_text)}
          className="max-h-[84vh] w-full object-contain"
        />
      </motion.div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-200 hover:border-[#67E8F9]/55 hover:bg-[#064E7A]/70 hover:text-[#B9F6FF]"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FIELD STORY STRIP

   The marquee track is permanently present but PAUSED initially.

   Play:
   continuous seamless right-to-left movement

   Pause:
   freezes exactly at the current position

   Manual navigation:
   pauses the marquee first, then scrolls manually
───────────────────────────────────────────────────────────── */

export default function GalleryFilmstrip({
  title,
  images,
}: {
  title: string;
  images: MediaRow[];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const [lightbox, setLightbox] =
    useState<MediaRow | null>(null);

  /*
   * IMPORTANT:
   * The initial state is false.
   * Nothing moves until the visitor explicitly presses Play.
   */
  const [playing, setPlaying] = useState(false);

  const reduced = useReducedMotion();

  if (images.length === 0) {
    return null;
  }

  /*
   * Continuous animation is useful only when there are enough
   * photographs to create a meaningful strip.
   *
   * Reduced-motion users never receive automatic movement.
   */
  const canPlay =
    !reduced &&
    images.length > 3;

  /*
   * Duplicate the track for seamless CSS marquee looping.
   *
   * Unlike the previous implementation, duplication DOES NOT
   * mean autoplay. The animation remains paused until Play
   * is explicitly selected.
   */
  const loop =
    canPlay
      ? [...images, ...images]
      : images;

  /*
   * Duration scales with the number of photographs.
   *
   * This creates the smooth slow archive-film movement of the
   * original gallery instead of moving one image at a time.
   */
  const marqueeDuration =
    Math.max(55, images.length * 6.5);

  const togglePlay = () => {
    if (!canPlay) return;

    setPlaying((current) => !current);
  };

  const nudge = (dir: 1 | -1) => {
    /*
     * Manual navigation always gives control back to the visitor.
     */
    setPlaying(false);

    const el = scroller.current;

    if (!el) return;

    const step = Math.min(
      380,
      Math.max(
        300,
        el.clientWidth * 0.34
      )
    );

    el.scrollBy({
      left: dir * step,
      behavior:
        reduced
          ? "auto"
          : "smooth",
    });
  };

  const openPhoto = (img: MediaRow) => {
    /*
     * Freeze the strip while viewing an image.
     */
    setPlaying(false);
    setLightbox(img);
  };

  return (
    <section
      aria-label={title}
      className="relative"
    >
      {/* ──────────────────────────────────────────
          Strip heading
      ─────────────────────────────────────────── */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-7 bg-[#0891B2]/55"
            />

            <h3 className="font-serif text-[1.2rem] font-bold leading-tight tracking-[-0.02em] text-[#064E7A] sm:text-[1.35rem]">
              {title}
            </h3>
          </div>

          <div className="ml-10 mt-1.5 font-[var(--font-display)] text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#526B75]/65">
            {images.length} photographs
          </div>
        </div>

        {/* ────────────────────────────────────────
            Controls
        ───────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          {canPlay && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                playing
                  ? `Pause ${title} slideshow`
                  : `Play ${title} slideshow`
              }
              aria-pressed={playing}
              className={`group flex h-10 items-center gap-2 rounded-full border px-3.5 font-[var(--font-display)] text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                playing
                  ? "border-[#0891B2]/35 bg-[#064E7A] text-white shadow-[0_7px_20px_rgba(6,78,122,0.16)]"
                  : "border-[#064E7A]/14 bg-[#FFF8EA]/70 text-[#064E7A] hover:border-[#0891B2]/35 hover:bg-[#E6FAFD]"
              }`}
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-current" />
              )}

              <span className="hidden sm:inline">
                {playing
                  ? "Pause"
                  : "Play"}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label={`Scroll ${title} back`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#064E7A]/14 bg-[#FFF8EA]/70 text-[#064E7A]/70 transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#E6FAFD] hover:text-[#064E7A]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label={`Scroll ${title} forward`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#064E7A]/14 bg-[#FFF8EA]/70 text-[#064E7A]/70 transition-all duration-200 hover:border-[#0891B2]/35 hover:bg-[#E6FAFD] hover:text-[#064E7A]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────
          Gallery viewport
      ─────────────────────────────────────────── */}
      <div className="relative">
        {/* Left edge fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#FFF8EA] to-transparent opacity-75"
        />

        {/* Right edge fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#FFF8EA] to-transparent opacity-75"
        />

        <div
          ref={scroller}
          className="scrollbar-none -mx-4 overflow-x-auto px-4 pb-2"
        >
          {/*
           * The marquee animation exists continuously but its play-state
           * is controlled entirely by the Play / Pause button.
           *
           * This means:
           *
           * initial state → paused
           * Play          → smooth continuous drift
           * Pause         → freezes exactly where it is
           */}
          <div
            className={
              canPlay
                ? "marquee flex w-max gap-3.5"
                : "flex w-max gap-3.5"
            }
            style={
              canPlay
                ? {
                    animationDuration:
                      `${marqueeDuration}s`,
                    animationPlayState:
                      playing
                        ? "running"
                        : "paused",
                  }
                : undefined
            }
          >
            {loop.map((img, i) => {
              /*
               * The second half of the track exists only to make the
               * animation seamless. It should not appear twice to
               * keyboard or screen-reader users.
               */
              const duplicate =
                canPlay &&
                i >= images.length;

              const originalIndex =
                i % images.length;

              return (
                <button
                  key={`${img.id}-${i}`}
                  type="button"
                  onClick={() =>
                    openPhoto(img)
                  }
                  tabIndex={
                    duplicate
                      ? -1
                      : 0
                  }
                  aria-hidden={
                    duplicate
                      ? true
                      : undefined
                  }
                  aria-label={
                    duplicate
                      ? undefined
                      : `Open photo: ${
                          t(
                            img.alt_text
                          ) || title
                        }`
                  }
                  className="group relative block h-48 w-[17rem] shrink-0 overflow-hidden rounded-[1.15rem] border border-[#064E7A]/10 bg-[#F3E7D2] shadow-[0_8px_24px_rgba(6,78,122,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-[#0891B2]/28 hover:shadow-[0_15px_35px_rgba(6,78,122,0.12)] sm:h-56 sm:w-80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      img.url ??
                      img.file_path ??
                      ""
                    }
                    alt={
                      duplicate
                        ? ""
                        : t(
                            img.alt_text
                          )
                    }
                    loading="lazy"
                    width={320}
                    height={224}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                  />

                  {/* Very light hover treatment */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#031F2E]/28 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Archive sequence number */}
                  {!duplicate && (
                    <span
                      aria-hidden
                      className="absolute bottom-3 left-3 translate-y-1 rounded-full border border-white/25 bg-black/28 px-2.5 py-1 font-[var(--font-display)] text-[0.62rem] font-bold tracking-[0.12em] text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      {String(
                        originalIndex + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────
          Playing indicator
      ─────────────────────────────────────────── */}
      <AnimatePresence>
        {playing && (
          <motion.div
            aria-hidden
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-3 flex items-center gap-3"
          >
            <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-[#064E7A]/8">
              <motion.div
                className="h-full w-1/4 bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
                animate={
                  reduced
                    ? {}
                    : {
                        x: [
                          "-100%",
                          "400%",
                        ],
                      }
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <span className="font-[var(--font-display)] text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#0891B2]/65">
              Playing
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────
          Lightbox
      ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            img={lightbox}
            onClose={() =>
              setLightbox(null)
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}

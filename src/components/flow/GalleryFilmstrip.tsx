"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Pause, Play } from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";

function Lightbox({ img, onClose }: { img: MediaRow; onClose: () => void }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <motion.div
      role="dialog" aria-modal="true" aria-label="Photograph"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16324F]/95 p-4"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[88vh] max-w-5xl overflow-hidden rounded-xl"
        initial={reduced ? {} : { scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={reduced ? {} : { scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.url ?? img.file_path ?? ""} alt={t(img.alt_text)} className="max-h-[84vh] w-full object-contain" />
      </motion.div>
      <button onClick={onClose} aria-label="Close"
        className="absolute right-4 top-4 rounded-full bg-[#FAF7F0]/10 p-2.5 text-[#FAF7F0] hover:bg-[#FAF7F0]/25">
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

/**
 * Field gallery: auto-drifts right→left like archive film passing a viewer.
 * Pauses on hover/focus/press, offers manual arrows, opens a lightbox, and
 * does not auto-move at all under prefers-reduced-motion. Track content is
 * doubled so the CSS loop is seamless; width is fixed per tile so CLS ≈ 0.
 */
export default function GalleryFilmstrip({ title, images }: { title: string; images: MediaRow[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<MediaRow | null>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  if (images.length === 0) return null;

  const autoplay = !reduced && images.length > 3;
  const loop = autoplay ? [...images, ...images] : images;
  const nudge = (dir: 1 | -1) => {
    setPaused(true);
    scroller.current?.scrollBy({ left: dir * 340, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section aria-label={title}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-serif text-lg font-semibold text-[#16324F]">
          {title} <span className="ml-1 text-sm font-normal text-[#1F2933]/45">{images.length} photographs</span>
        </h3>
        <div className="flex gap-1.5">
          {autoplay && (
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? `Resume ${title} slideshow` : `Pause ${title} slideshow`}
              aria-pressed={paused}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#16324F]/12 text-[#16324F]/60 hover:border-[#16324F]/30 hover:text-[#16324F]"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          )}
          <button onClick={() => nudge(-1)} aria-label={`Scroll ${title} back`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#16324F]/12 text-[#16324F]/60 hover:border-[#16324F]/30 hover:text-[#16324F]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => nudge(1)} aria-label={`Scroll ${title} forward`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#16324F]/12 text-[#16324F]/60 hover:border-[#16324F]/30 hover:text-[#16324F]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onMouseEnter={() => autoplay && setPaused(true)}
        onMouseLeave={() => autoplay && setPaused(false)}
        onFocusCapture={() => autoplay && setPaused(true)}
        className="scrollbar-none -mx-4 overflow-x-auto px-4 pb-2"
      >
        <div
          className={autoplay ? "marquee flex w-max gap-3" : "flex w-max gap-3"}
          style={autoplay ? {
            animationDuration: `${Math.max(60, images.length * 7)}s`,
            animationPlayState: paused ? "paused" : "running",
          } : undefined}
        >
          {loop.map((img, i) => (
            <button
              key={`${img.id}-${i}`}
              onClick={() => setLightbox(img)}
              tabIndex={autoplay && i >= images.length ? -1 : 0}
              aria-hidden={autoplay && i >= images.length ? true : undefined}
              aria-label={`Open photo: ${t(img.alt_text) || title}`}
              className="group relative block h-48 w-72 shrink-0 overflow-hidden rounded-xl border border-[#16324F]/10 sm:h-56 sm:w-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url ?? img.file_path ?? ""} alt={t(img.alt_text)}
                loading="lazy" width={320} height={224}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#16324F]/35 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightbox && <Lightbox img={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
}

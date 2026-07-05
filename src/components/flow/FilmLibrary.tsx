"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Clapperboard, ChevronDown, X } from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";

/** Modal player for an MP4 film. */
function FilmPlayer({ film, onClose }: { film: MediaRow; onClose: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      role="dialog" aria-modal="true" aria-label={film.title ?? "Film"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16324F]/95 p-4"
      initial={reduced ? {} : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-black"
        initial={reduced ? {} : { scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={reduced ? {} : { scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <video src={film.url ?? undefined} controls autoPlay playsInline className="aspect-video w-full">
          <track kind="captions" />
        </video>
      </motion.div>
      <button onClick={onClose} aria-label="Close film"
        className="absolute right-4 top-4 rounded-full bg-[#FAF7F0]/10 p-2.5 text-[#FAF7F0] hover:bg-[#FAF7F0]/25">
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

/** A documentary card whose thumbnail is the film's own first frame. */
function FilmPoster({ film, index, onPlay }: { film: MediaRow; index: number; onPlay: () => void }) {
  const vref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  return (
    <motion.li
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "0px 0px 12% 0px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
    >
      <button
        onClick={onPlay}
        onMouseEnter={() => { if (!reduced) vref.current?.play().catch(() => {}); }}
        onMouseLeave={() => { vref.current?.pause(); if (vref.current) vref.current.currentTime = 0.5; }}
        className="group block h-full w-full overflow-hidden rounded-2xl border border-[#16324F]/8 bg-white text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
        aria-label={`Play: ${film.title}`}
      >
        <div className="relative aspect-video overflow-hidden bg-[#16324F]">
          {/* first frame as poster; muted so hover-preview can autoplay */}
          <video
            ref={vref}
            src={`${film.url ?? ""}#t=0.5`}
            muted loop playsInline preload="metadata"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#16324F]/50 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF7F0]/90 text-[#16324F] shadow-lg transition-transform duration-200 group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6" />
            </span>
          </span>
        </div>
        <div className="p-5">
          <h4 className="font-serif text-base font-semibold text-[#16324F]">{film.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-[#1F2933]/65">{t(film.caption)}</p>
        </div>
      </button>
    </motion.li>
  );
}

export default function FilmLibrary({
  documentaries, learning,
}: { documentaries: MediaRow[]; learning: MediaRow[] }) {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState<MediaRow | null>(null);
  const reduced = useReducedMotion();
  const shown = expanded ? learning : learning.slice(0, 12);

  return (
    <div className="space-y-16">
      {documentaries.length > 0 && (
        <section aria-label="Documentaries">
          <h3 className="mb-1 font-serif text-xl font-semibold text-[#16324F]">Stories of Hope and Initiative</h3>
          <p className="mb-6 text-sm text-[#1F2933]/60">
            Field documentaries produced by AHEAD&apos;s studio — hover to preview, click to watch.
          </p>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {documentaries.map((f, i) => (
              <FilmPoster key={f.id} film={f} index={i} onPlay={() => setPlaying(f)} />
            ))}
          </ul>
        </section>
      )}

      {learning.length > 0 && (
        <section aria-label="Learning for All film library">
          <h3 className="mb-1 font-serif text-xl font-semibold text-[#16324F]">
            Learning for All — {learning.length} Films
          </h3>
          <p className="mb-6 text-sm text-[#1F2933]/60">
            Bengali films, translations and animations for rural schools.
          </p>
          <motion.ul className="grid gap-2 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {shown.map((f, i) => (
                <motion.li
                  key={f.id}
                  initial={reduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? {} : { opacity: 0 }}
                  transition={{ duration: 0.2, delay: i > 11 ? Math.min(i - 11, 8) * 0.02 : 0 }}
                >
                  <button
                    onClick={() => setPlaying(f)}
                    className="flex w-full items-start gap-2.5 rounded-xl border border-[#16324F]/8 bg-white px-4 py-3 text-left transition-colors hover:border-[#C65D3B]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
                  >
                    <Clapperboard aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#C65D3B]" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-[#16324F]">{f.title}</span>
                      <span className="block truncate text-xs text-[#1F2933]/55">{t(f.caption)}</span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {learning.length > 12 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-5 flex items-center gap-2 text-sm text-[#1F2933]/60 hover:text-[#C65D3B]"
            >
              <motion.span animate={reduced ? {} : { rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
              {expanded ? "Show fewer films" : `Show all ${learning.length} films`}
            </button>
          )}
        </section>
      )}

      <AnimatePresence>
        {playing && <FilmPlayer film={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </div>
  );
}

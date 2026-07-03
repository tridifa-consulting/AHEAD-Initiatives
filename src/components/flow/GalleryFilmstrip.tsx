"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";

function Lightbox({ img, onClose }: { img: MediaRow; onClose: () => void }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16324F]/95 p-4"
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-xl"
          initial={reduced ? {} : { scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={reduced ? {} : { scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.url ?? img.file_path ?? ""} alt={t(img.alt_text)}
            className="max-h-[85vh] w-full object-contain" />
        </motion.div>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-4 top-4 rounded-full bg-[#FAF7F0]/10 p-2 text-[#FAF7F0] hover:bg-[#FAF7F0]/20"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GalleryFilmstrip({ title, images }: { title: string; images: MediaRow[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [lightbox, setLightbox] = useState<MediaRow | null>(null);
  const reduced = useReducedMotion();
  if (images.length === 0) return null;

  const nudge = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * (track.current.clientWidth * 0.75), behavior: reduced ? "instant" : "smooth" });

  return (
    <section aria-label={title}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-[#16324F]">{title}</h3>
        <div className="flex gap-1.5">
          {[[-1, ChevronLeft, `Scroll ${title} back`],[1, ChevronRight, `Scroll ${title} forward`]].map(([dir, Icon, label]) => (
            <motion.button
              key={String(dir)}
              onClick={() => nudge(Number(dir) as 1 | -1)}
              aria-label={String(label)}
              whileHover={reduced ? {} : { scale: 1.08 }}
              whileTap={reduced ? {} : { scale: 0.93 }}
              className="rounded-full border border-[#16324F]/12 p-2 text-[#16324F]/60 hover:border-[#16324F]/30 hover:text-[#16324F]"
            >
              {/* @ts-expect-error dynamic icon */}
              <Icon className="h-4 w-4" />
            </motion.button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3"
      >
        {images.map((img, i) => (
          <motion.li
            key={img.id}
            className="w-64 shrink-0 snap-start sm:w-80"
            initial={reduced ? {} : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px -20% 0px 0px" }}
            transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.04 }}
          >
            <button
              onClick={() => setLightbox(img)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#16324F]/10"
              aria-label={`Open photo: ${t(img.alt_text) || title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url ?? img.file_path ?? ""} alt={t(img.alt_text)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-[#16324F]/0 transition-colors duration-200 group-hover:bg-[#16324F]/40"
                whileHover={reduced ? {} : {}}
              >
                <ZoomIn className="h-7 w-7 scale-75 text-[#FAF7F0] opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
              </motion.div>
            </button>
          </motion.li>
        ))}
      </ul>
      {lightbox && <Lightbox img={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}

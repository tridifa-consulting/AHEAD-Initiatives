"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";

/**
 * A horizontal filmstrip of field photographs — scroll-snap, swipe on touch,
 * arrow buttons and native keyboard scrolling on desktop.
 */
export default function GalleryFilmstrip({ title, images }: { title: string; images: MediaRow[] }) {
  const track = useRef<HTMLUListElement>(null);
  if (images.length === 0) return null;

  const nudge = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section aria-label={title} className="group">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-[#16324F]">{title}</h3>
        <div className="flex gap-1.5">
          <button onClick={() => nudge(-1)} aria-label={`Scroll ${title} backwards`}
            className="rounded-full border border-[#16324F]/15 p-1.5 text-[#16324F]/70 hover:bg-[#16324F]/5">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => nudge(1)} aria-label={`Scroll ${title} forwards`}
            className="rounded-full border border-[#16324F]/15 p-1.5 text-[#16324F]/70 hover:bg-[#16324F]/5">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
      >
        {images.map((img) => (
          <li key={img.id} className="w-64 shrink-0 snap-start sm:w-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url ?? img.file_path ?? ""}
              alt={t(img.alt_text)}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg border border-[#16324F]/10 object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

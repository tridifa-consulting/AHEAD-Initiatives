"use client";

import {
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Play,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Deliberately narrower than the old Supabase VideoRow type.
 * Both the existing CMS rows and the new YouTube Atom-feed rows satisfy
 * this shape, which lets us migrate the data source without changing the UI.
 */
export type VideoGridItem = {
  id: string;
  title: string;
  youtube_video_id: string;
  thumbnail_url?: string | null;
};

/**
 * YouTube facade pattern:
 * only the lightweight thumbnail is rendered initially;
 * the iframe mounts after the visitor clicks Play.
 */
function VideoCard({
  v,
  index,
}: {
  v: VideoGridItem;
  index: number;
}) {
  const [
    active,
    setActive,
  ] =
    useState(false);

  const reduced =
    useReducedMotion();

  const thumb =
    v.thumbnail_url ||
    `https://i.ytimg.com/vi/${v.youtube_video_id}/hqdefault.jpg`;

  return (
    <motion.figure
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: 14,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin:
          "0px 0px -8% 0px",
      }}
      transition={{
        duration: 0.42,
        delay:
          Math.min(
            index,
            5
          ) * 0.05,
        ease,
      }}
      className="group overflow-hidden rounded-[1.3rem] border border-[#064E7A]/10 bg-[#FFFDF8] shadow-[0_8px_24px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/28 hover:shadow-[0_18px_42px_rgba(6,78,122,0.11)]"
    >
      <div className="relative aspect-video overflow-hidden bg-[#031F2E]">
        {active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.youtube_video_id}?autoplay=1`}
            title={v.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() =>
              setActive(true)
            }
            className="absolute inset-0 h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#67E8F9]"
            aria-label={`Play video: ${v.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />

            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#031F2E]/52 via-[#031F2E]/8 to-transparent transition-colors"
            />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#FFF8EA]/94 text-[#064E7A] shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition-transform duration-250 group-hover:scale-110 group-hover:bg-white sm:h-16 sm:w-16">
                <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
              </span>
            </span>

            <span className="absolute bottom-3 left-3 rounded-full border border-white/18 bg-black/28 px-2.5 py-1 font-[var(--font-display)] text-[0.54rem] font-extrabold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
              YouTube
            </span>
          </button>
        )}
      </div>

      <figcaption className="p-4 sm:p-5">
        <div className="mb-2 font-[var(--font-display)] text-[0.56rem] font-extrabold uppercase tracking-[0.17em] text-[#0891B2]/65">
          From AHEAD&apos;s channel
        </div>

        <h4 className="font-serif text-[1rem] font-bold leading-[1.35] tracking-[-0.018em] text-[#064E7A]">
          {v.title}
        </h4>
      </figcaption>
    </motion.figure>
  );
}

export default function VideoGrid({
  videos,
}: {
  videos: VideoGridItem[];
}) {
  if (
    videos.length === 0
  ) {
    return (
      <p className="text-sm font-medium text-[#526B75]/60">
        Videos from AHEAD&apos;s YouTube channel will appear here once the sync is configured.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map(
        (
          video,
          index
        ) => (
          <VideoCard
            key={
              video.id
            }
            v={
              video
            }
            index={
              index
            }
          />
        )
      )}
    </div>
  );
}

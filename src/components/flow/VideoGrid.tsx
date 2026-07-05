"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import type { VideoRow } from "@/lib/types";

/**
 * YouTube previews via the channel's thumbnail; the iframe only mounts after
 * the visitor clicks Play (the "facade" pattern) — fast first paint, real
 * preview image, no autoplaying embeds.
 */
function VideoCard({ v, index }: { v: VideoRow; index: number }) {
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();
  const thumb = v.thumbnail_url || `https://i.ytimg.com/vi/${v.youtube_video_id}/hqdefault.jpg`;

  return (
    <motion.figure
      initial={reduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "0px 0px 12% 0px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.06 }}
      className="overflow-hidden rounded-2xl border border-[#16324F]/8 bg-white shadow-sm"
    >
      <div className="relative aspect-video bg-[#16324F]">
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
            onClick={() => setActive(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${v.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span aria-hidden className="absolute inset-0 bg-[#16324F]/20 transition-colors group-hover:bg-[#16324F]/35" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C65D3B] text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-5 py-3.5 text-sm font-medium text-[#16324F]">{v.title}</figcaption>
    </motion.figure>
  );
}

export default function VideoGrid({ videos }: { videos: VideoRow[] }) {
  if (videos.length === 0) return (
    <p className="text-sm text-[#1F2933]/55">Videos from AHEAD&apos;s YouTube channel will appear here once the sync is configured.</p>
  );
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => <VideoCard key={v.id} v={v} index={i} />)}
    </div>
  );
}

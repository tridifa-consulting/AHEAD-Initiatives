"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { VideoRow } from "@/lib/types";

export default function VideoGrid({ videos }: { videos: VideoRow[] }) {
  const reduced = useReducedMotion();
  if (videos.length === 0) return (
    <p className="text-sm text-[#1F2933]/55">Videos from AHEAD&apos;s YouTube channel will appear here once the sync is configured.</p>
  );
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <motion.figure
          key={v.id}
          initial={reduced ? {} : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.06 }}
          className="overflow-hidden rounded-2xl border border-[#16324F]/8 bg-white shadow-sm"
        >
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.youtube_video_id}`}
              title={v.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <figcaption className="px-5 py-3.5 text-sm font-medium text-[#16324F]">{v.title}</figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

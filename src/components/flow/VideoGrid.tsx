import type { VideoRow } from "@/lib/types";
import Reveal from "./Reveal";

/** YouTube embeds, featured first. Titles come from the channel or manual entry. */
export default function VideoGrid({ videos }: { videos: VideoRow[] }) {
  if (videos.length === 0) {
    return <p className="text-sm text-[#1F2933]/60">Videos are on their way — visit AHEAD&apos;s YouTube channel meanwhile.</p>;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <Reveal key={v.id} delay={Math.min(i, 5) * 60}>
          <figure className="overflow-hidden rounded-xl border border-[#16324F]/10 bg-white">
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
            <figcaption className="px-4 py-3 text-sm font-medium text-[#16324F]">{v.title}</figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

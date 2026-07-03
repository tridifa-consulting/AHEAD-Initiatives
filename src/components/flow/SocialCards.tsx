import { ExternalLink } from "lucide-react";
import type { SocialPostRow } from "@/lib/types";
import Reveal from "./Reveal";

export default function SocialCards({ posts }: { posts: SocialPostRow[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 5) * 50}>
          <a
            href={p.link_url ?? "#social"}
            target={p.link_url ? "_blank" : undefined}
            rel={p.link_url ? "noopener" : undefined}
            className="flex h-full flex-col rounded-xl border border-[#16324F]/10 bg-white p-5 transition-shadow hover:shadow-sm"
          >
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#C65D3B]">{p.platform}</span>
            <h3 className="mt-2 text-sm font-semibold text-[#16324F]">{p.title}</h3>
            {p.description && <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#1F2933]/70">{p.description}</p>}
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#2D6A4F]">
              {p.posted_at && new Date(p.posted_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
              {p.link_url && <ExternalLink className="h-3 w-3" />}
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

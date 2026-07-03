"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { SocialPostRow } from "@/lib/types";

export default function SocialCards({ posts }: { posts: SocialPostRow[] }) {
  const reduced = useReducedMotion();
  if (posts.length === 0) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((p, i) => (
        <motion.a
          key={p.id}
          href={p.link_url ?? "#social"}
          target={p.link_url ? "_blank" : undefined}
          rel={p.link_url ? "noopener" : undefined}
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.06 }}
          whileHover={reduced ? {} : { y: -4, boxShadow: "0 8px 24px rgba(22,50,79,0.10)" }}
          className="flex h-full flex-col rounded-2xl border border-[#16324F]/8 bg-white p-5"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C65D3B]">{p.platform}</span>
          <h3 className="mt-2 text-sm font-semibold text-[#16324F]">{p.title}</h3>
          {p.description && <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#1F2933]/65">{p.description}</p>}
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#2D6A4F]">
            {p.posted_at && new Date(p.posted_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            {p.link_url && <ExternalLink className="h-3 w-3" />}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

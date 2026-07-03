"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { BlogPostRow } from "@/lib/types";
import { t } from "@/lib/types";

export default function BlogCards({ posts }: { posts: BlogPostRow[] }) {
  const reduced = useReducedMotion();
  if (posts.length === 0) return (
    <p className="text-sm text-[#1F2933]/55">Updates from the field will appear here.</p>
  );
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <motion.div
          key={p.id}
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.07 }}
          whileHover={reduced ? {} : { y: -4 }}
        >
          <Link
            href={`/blog/${p.slug}`}
            className="flex h-full flex-col rounded-2xl border border-[#16324F]/8 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
          >
            {p.published_at && (
              <time className="text-xs text-[#1F2933]/45">
                {new Date(p.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
            <h3 className="mt-2 font-serif text-lg font-semibold text-[#16324F]">{t(p.title)}</h3>
            {t(p.excerpt) && (
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1F2933]/65">{t(p.excerpt)}</p>
            )}
            <span className="mt-4 text-sm font-medium text-[#C65D3B]">Read more →</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

import Link from "next/link";
import type { BlogPostRow } from "@/lib/types";
import { t } from "@/lib/types";
import Reveal from "./Reveal";

export default function BlogCards({ posts }: { posts: BlogPostRow[] }) {
  if (posts.length === 0) {
    return <p className="text-sm text-[#1F2933]/60">Updates from the field will appear here.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 5) * 50}>
          <Link href={`/blog/${p.slug}`} className="flex h-full flex-col rounded-xl border border-[#16324F]/10 bg-white p-5 transition-shadow hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]">
            {p.published_at && (
              <time className="text-xs text-[#1F2933]/50">
                {new Date(p.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
            <h3 className="mt-1.5 font-serif text-lg font-semibold text-[#16324F]">{t(p.title)}</h3>
            {t(p.excerpt) && <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1F2933]/70">{t(p.excerpt)}</p>}
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

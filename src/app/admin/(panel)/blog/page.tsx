import Link from "next/link";
import { Plus } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/ui";

export const metadata = { title: "Blog — AHEAD Admin", robots: { index: false } };

export default async function BlogList() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, status, published_at")
    .order("published_at", { ascending: false, nullsFirst: true });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Blog & updates</h1>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-1.5 rounded-lg bg-[#2D6A4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#245a42]">
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>
      {(data ?? []).length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-[#16324F]/20 p-8 text-sm text-[#1F2933]/60">
          No posts yet. The Updates chapter appears on the public site once the chapter is
          published and at least one post is live.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
          {data!.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/blog/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F0]">
                <span className="min-w-0 flex-1 truncate text-sm text-[#16324F]">
                  {(p.title as { en?: string })?.en ?? p.slug}
                </span>
                {p.published_at && (
                  <time className="hidden text-xs text-[#1F2933]/50 sm:block">
                    {new Date(p.published_at).toLocaleDateString("en-IN")}
                  </time>
                )}
                <StatusBadge status={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

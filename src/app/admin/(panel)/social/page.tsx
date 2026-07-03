import Link from "next/link";
import { Plus } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/ui";

export const metadata = { title: "Social cards — AHEAD Admin", robots: { index: false } };

export default async function SocialList() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_posts")
    .select("id, platform, title, posted_at, status")
    .order("posted_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Social cards</h1>
        <Link href="/admin/social/new" className="inline-flex items-center gap-1.5 rounded-lg bg-[#2D6A4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#245a42]">
          <Plus className="h-4 w-4" /> New card
        </Link>
      </div>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        Hand-picked highlights from AHEAD&apos;s social channels. LinkedIn&apos;s API restricts automated
        reading of company posts, so cards are added here manually — official API sync can be
        revisited if AHEAD obtains partner access.
      </p>
      {(data ?? []).length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-[#16324F]/20 p-8 text-sm text-[#1F2933]/60">
          No cards yet. Add one with a title, a short description, and a link to the post.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
          {data!.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/social/${c.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F0]">
                <span className="w-20 shrink-0 text-xs uppercase tracking-wide text-[#1F2933]/50">{c.platform}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-[#16324F]">{c.title}</span>
                <StatusBadge status={c.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

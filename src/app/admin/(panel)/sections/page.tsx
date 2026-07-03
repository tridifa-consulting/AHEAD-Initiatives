import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/ui";

export const metadata = { title: "Page chapters — AHEAD Admin", robots: { index: false } };

export default async function SectionsList() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_sections")
    .select("slug, parent_slug, title, status, sort_order")
    .order("sort_order");

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Page chapters</h1>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        Each row is one chapter of the public page. Draft chapters stay invisible to visitors.
      </p>
      <ul className="mt-6 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
        {(data ?? []).map((s) => (
          <li key={s.slug}>
            <Link
              href={`/admin/sections/${s.slug}`}
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#FAF7F0]"
            >
              <span className={`min-w-0 truncate text-sm ${s.parent_slug ? "pl-5 text-[#1F2933]/75" : "font-medium text-[#16324F]"}`}>
                {(s.title as { en?: string })?.en ?? s.slug}
              </span>
              <StatusBadge status={s.status} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

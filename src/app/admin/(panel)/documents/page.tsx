import Link from "next/link";
import { Plus } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/ui";

export const metadata = { title: "Documents — AHEAD Admin", robots: { index: false } };

const filters = [
  ["all", "All"], ["annual_report", "Annual reports"], ["fcra_quarterly", "FCRA quarterly"],
  ["fcra_annual", "FCRA annual"], ["mca_filing", "MCA"], ["it_return", "IT returns"],
  ["policy", "Policies"], ["publication", "Publications"], ["other", "Other"],
] as const;

export default async function DocumentsList({
  searchParams,
}: { searchParams: Promise<{ category?: string }> }) {
  await requireStaff();
  const { category = "all" } = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from("documents")
    .select("id, title, category, year, status, file_available")
    .order("category").order("sort_order").order("year", { ascending: false })
    .limit(300);
  if (category !== "all") query = query.eq("category", category);
  const { data } = await query;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Documents</h1>
        <Link
          href="/admin/documents/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2D6A4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#245a42]"
        >
          <Plus className="h-4 w-4" /> Add document
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {filters.map(([key, label]) => (
          <Link
            key={key}
            href={key === "all" ? "/admin/documents" : `/admin/documents?category=${key}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              category === key ? "bg-[#16324F] text-white" : "bg-[#16324F]/5 text-[#16324F]/75 hover:bg-[#16324F]/10"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
        {(data ?? []).map((d) => (
          <li key={d.id}>
            <Link href={`/admin/documents/${d.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F0]">
              <span className="min-w-0 flex-1 truncate text-sm text-[#16324F]">{d.title}</span>
              {d.year && <span className="hidden text-xs text-[#1F2933]/50 sm:block">{d.year}</span>}
              {!d.file_available && (
                <span className="rounded-full bg-[#16324F]/8 px-2 py-0.5 text-xs text-[#1F2933]/60">no file</span>
              )}
              <StatusBadge status={d.status} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

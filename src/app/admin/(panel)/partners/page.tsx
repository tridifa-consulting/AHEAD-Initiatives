import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/ui";

export const metadata = { title: "Partners — AHEAD Admin", robots: { index: false } };

export default async function PartnersList() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("partners")
    .select("id, name, kind, status")
    .order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Partners</h1>
        <Link href="/admin/partners/new" className="inline-flex items-center gap-1.5 rounded-lg bg-[#2D6A4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#245a42]">
          <Plus className="h-4 w-4" /> Add partner
        </Link>
      </div>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        The Partnerships chapter appears on the website once its chapter is published and at
        least one partner here is published. Add only confirmed partners.
      </p>
      {(data ?? []).length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-[#16324F]/20 p-8 text-sm text-[#1F2933]/60">
          No partners recorded yet.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
          {data!.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/partners/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F0]">
                <span className="min-w-0 flex-1 truncate text-sm text-[#16324F]">{p.name}</span>
                <span className="text-xs text-[#1F2933]/50">{p.kind}</span>
                <StatusBadge status={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

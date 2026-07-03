import Link from "next/link";
import { Plus } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Notices — AHEAD Admin", robots: { index: false } };

export default async function NoticesList() {
  await requireStaff();
  const supabase = await createClient();
  const { data } = await supabase
    .from("emergency_notices")
    .select("id, message, severity, active, ends_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Emergency notices</h1>
        <Link href="/admin/notices/new" className="inline-flex items-center gap-1.5 rounded-lg bg-[#2D6A4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#245a42]">
          <Plus className="h-4 w-4" /> New notice
        </Link>
      </div>
      {(data ?? []).length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-[#16324F]/20 p-8 text-sm text-[#1F2933]/60">
          No notices. Create one to show a banner across the top of the website.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
          {data!.map((n) => (
            <li key={n.id}>
              <Link href={`/admin/notices/${n.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F0]">
                <span className="min-w-0 flex-1 truncate text-sm text-[#16324F]">
                  {(n.message as { en?: string })?.en ?? "(no English text)"}
                </span>
                <span className="text-xs text-[#1F2933]/50">{n.severity}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${n.active ? "bg-[#2D6A4F]/10 text-[#2D6A4F]" : "bg-[#16324F]/8 text-[#1F2933]/60"}`}>
                  {n.active ? "live" : "off"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

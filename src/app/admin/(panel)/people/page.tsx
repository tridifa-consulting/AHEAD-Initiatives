import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/ui";

export const metadata = { title: "People — AHEAD Admin", robots: { index: false } };

const groupLabels: Record<string, string> = {
  board: "Board of Directors",
  project_directors: "Project Directors",
  field_team: "Core Field Team",
  advisors: "Advisors",
};

export default async function PeopleList() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase
    .from("people")
    .select("id, name, role, group_name, show_email, status, sort_order")
    .order("group_name").order("sort_order");

  const groups = ["board", "project_directors", "field_team", "advisors"];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-[#16324F]">People</h1>
        <Link href="/admin/people/new" className="inline-flex items-center gap-1.5 rounded-lg bg-[#2D6A4F] px-4 py-2 text-sm font-medium text-white hover:bg-[#245a42]">
          <Plus className="h-4 w-4" /> Add person
        </Link>
      </div>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        Editing people needs the admin role. Emails and phone numbers stay off the website
        unless consent is recorded on the person&apos;s page.
      </p>
      {groups.map((g) => {
        const members = (data ?? []).filter((p) => p.group_name === g);
        if (members.length === 0) return null;
        return (
          <div key={g} className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F2933]/55">{groupLabels[g]}</h2>
            <ul className="mt-2 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
              {members.map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/people/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAF7F0]">
                    <span className="min-w-0 flex-1 truncate text-sm text-[#16324F]">{p.name}</span>
                    <span className="hidden max-w-56 truncate text-xs text-[#1F2933]/50 sm:block">{p.role}</span>
                    {p.show_email && <span className="rounded-full bg-[#2D6A4F]/10 px-2 py-0.5 text-xs text-[#2D6A4F]">email public</span>}
                    <StatusBadge status={p.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

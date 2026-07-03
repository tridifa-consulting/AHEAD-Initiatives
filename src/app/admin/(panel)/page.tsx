import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard — AHEAD Admin", robots: { index: false } };

export default async function Dashboard() {
  await requireStaff();
  const supabase = await createClient();

  const [sections, docs, drafts, audits] = await Promise.all([
    supabase.from("site_sections").select("id", { count: "exact", head: true }),
    supabase.from("documents").select("id", { count: "exact", head: true }),
    supabase.from("site_sections").select("slug, title").eq("status", "draft"),
    supabase.from("audit_logs").select("action, entity, at").order("at", { ascending: false }).limit(8),
  ]);

  const cards = [
    { label: "Page chapters", value: sections.count ?? 0, href: "/admin/sections" },
    { label: "Documents in library", value: docs.count ?? 0, href: "/admin/documents" },
    { label: "Chapters still in draft", value: drafts.data?.length ?? 0, href: "/admin/sections" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        Edit a chapter, publish it, and the public site updates within seconds.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-xl border border-[#16324F]/10 bg-white p-5 hover:shadow-sm">
            <div className="font-serif text-3xl font-semibold text-[#16324F]">{c.value}</div>
            <div className="mt-1 text-sm text-[#1F2933]/65">{c.label}</div>
          </Link>
        ))}
      </div>

      {(drafts.data?.length ?? 0) > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F2933]/55">Waiting to be published</h2>
          <ul className="mt-3 space-y-2">
            {drafts.data!.map((d) => (
              <li key={d.slug}>
                <Link href={`/admin/sections/${d.slug}`} className="text-sm text-[#C65D3B] hover:underline">
                  {(d.title as { en?: string })?.en ?? d.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F2933]/55">Recent activity</h2>
        {audits.data && audits.data.length > 0 ? (
          <ul className="mt-3 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
            {audits.data.map((a, i) => (
              <li key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span className="text-[#1F2933]/80">{a.action} · {a.entity}</span>
                <time className="text-xs text-[#1F2933]/50">{new Date(a.at).toLocaleString("en-IN")}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-xl border border-dashed border-[#16324F]/20 p-6 text-sm text-[#1F2933]/60">
            No activity yet. Your first edit will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/ui";
import MediaAddForm from "./MediaAddForm";
import { deleteMedia } from "./actions";

export const metadata = { title: "Images — AHEAD Admin", robots: { index: false } };

export default async function MediaPage({
  searchParams,
}: { searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("media_items")
    .select("id, title, collection, source, url, file_path, status")
    .order("collection").order("sort_order");

  const collections = [...new Set((data ?? []).map((m) => m.collection ?? "other"))];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Image gallery</h1>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        Images are organised into collections — the hero slideshow reads from “hero”, galleries
        from “gallery_…”, and so on.
      </p>
      <div className="mt-6">
        <MediaAddForm />
      </div>
      {saved === "1" && <p role="status" className="mt-3 text-sm font-medium text-[#2D6A4F]">Image added.</p>}

      {collections.map((c) => (
        <div key={c} className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F2933]/55">{c}</h2>
          <ul className="mt-2 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
            {(data ?? []).filter((m) => (m.collection ?? "other") === c).map((m) => (
              <li key={m.id} className="flex items-center gap-3 px-4 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.url ?? m.file_path ?? ""}
                  alt=""
                  className="h-10 w-14 shrink-0 rounded object-cover"
                />
                <span className="min-w-0 flex-1 truncate text-sm text-[#16324F]">{m.title}</span>
                <span className="text-xs text-[#1F2933]/50">{m.source}</span>
                <StatusBadge status={m.status} />
                {staff.role === "admin" && (
                  <form action={deleteMedia}>
                    <input type="hidden" name="id" value={m.id} />
                    <button className="text-xs text-[#C65D3B] hover:underline">Delete</button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

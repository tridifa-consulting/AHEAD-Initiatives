import { Star } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Field, StatusBadge, TextInput } from "@/components/admin/ui";
import { addVideo, deleteVideo, toggleVideo } from "./actions";

export const metadata = { title: "Videos — AHEAD Admin", robots: { index: false } };

export default async function VideosPage({
  searchParams,
}: { searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("id, youtube_video_id, title, featured, status, sync_source, published_at")
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Videos</h1>
      <p className="mt-1 text-sm text-[#1F2933]/65">
        Automatic sync from the AHEAD YouTube channel arrives in the next phase; until then,
        add any video by pasting its link.
      </p>

      <form action={addVideo} className="mt-6 grid gap-4 rounded-xl border border-[#16324F]/10 bg-white p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <Field label="YouTube link or video ID">
          <TextInput name="url" required placeholder="https://youtu.be/…" />
        </Field>
        <Field label="Title">
          <TextInput name="title" required />
        </Field>
        <button className="h-9 rounded-lg bg-[#2D6A4F] px-4 text-sm font-medium text-white hover:bg-[#245a42]">
          Add video
        </button>
      </form>
      {saved === "1" && <p role="status" className="mt-3 text-sm font-medium text-[#2D6A4F]">Video added.</p>}

      <ul className="mt-6 divide-y divide-[#16324F]/8 rounded-xl border border-[#16324F]/10 bg-white">
        {(videos ?? []).map((v) => (
          <li key={v.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
            {v.featured && <Star aria-label="Featured" className="h-4 w-4 fill-[#E9B44C] text-[#E9B44C]" />}
            <a
              href={`https://www.youtube.com/watch?v=${v.youtube_video_id}`}
              target="_blank" rel="noopener"
              className="min-w-0 flex-1 truncate text-sm text-[#16324F] hover:underline"
            >
              {v.title}
            </a>
            <StatusBadge status={v.status} />
            <form action={toggleVideo}>
              <input type="hidden" name="id" value={v.id} />
              <input type="hidden" name="field" value="featured" />
              <button className="text-xs text-[#16324F]/70 hover:underline">
                {v.featured ? "Unfeature" : "Feature"}
              </button>
            </form>
            <form action={toggleVideo}>
              <input type="hidden" name="id" value={v.id} />
              <input type="hidden" name="field" value="status" />
              <button className="text-xs text-[#16324F]/70 hover:underline">
                {v.status === "published" ? "Hide" : "Publish"}
              </button>
            </form>
            {staff.role === "admin" && (
              <form action={deleteVideo}>
                <input type="hidden" name="id" value={v.id} />
                <button className="text-xs text-[#C65D3B] hover:underline">Delete</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

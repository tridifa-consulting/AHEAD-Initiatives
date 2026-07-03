"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { mutate, str } from "@/lib/admin";

/** Accepts full YouTube URLs (watch, youtu.be, shorts, embed) or a bare 11-char ID. */
function parseYouTubeId(input: string): string | null {
  const bare = input.trim();
  if (/^[\w-]{11}$/.test(bare)) return bare;
  try {
    const u = new URL(bare);
    if (u.hostname === "youtu.be") return u.pathname.slice(1, 12) || null;
    if (u.hostname.endsWith("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/\/(shorts|embed)\/([\w-]{11})/);
      if (m) return m[2];
    }
  } catch { /* not a URL */ }
  return null;
}

export async function addVideo(form: FormData) {
  const url = z.string().min(1).parse(str(form, "url"));
  const title = z.string().min(1).max(200).parse(str(form, "title"));
  const videoId = parseYouTubeId(url);
  if (!videoId) throw new Error("That doesn't look like a YouTube link or video ID.");

  await mutate("create", "videos", async (db) => {
    const { error } = await db.from("videos").upsert(
      {
        youtube_video_id: videoId,
        title,
        thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        sync_source: "manual",
        status: "published",
        published_at: new Date().toISOString(),
      },
      { onConflict: "youtube_video_id" }
    );
    if (error) throw new Error(error.message);
    return videoId;
  });
  redirect("/admin/videos?saved=1");
}

export async function toggleVideo(form: FormData) {
  const id = z.string().uuid().parse(str(form, "id"));
  const field = z.enum(["featured", "status"]).parse(str(form, "field"));
  await mutate("update", "videos", async (db) => {
    const { data: v } = await db.from("videos").select("featured, status").eq("id", id).single();
    if (!v) throw new Error("Video not found");
    const patch =
      field === "featured"
        ? { featured: !v.featured }
        : { status: v.status === "published" ? "draft" : "published" };
    const { error } = await db.from("videos").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  });
  redirect("/admin/videos");
}

export async function deleteVideo(form: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  await mutate("delete", "videos", async (db) => {
    const { error } = await db.from("videos").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  });
  redirect("/admin/videos");
}

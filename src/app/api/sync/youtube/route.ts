import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type YtPlaylistItem = {
  contentDetails: { videoId: string; videoPublishedAt: string };
  snippet: {
    title: string;
    description: string;
    thumbnails?: { high?: { url: string }; medium?: { url: string } };
  };
};

/**
 * Scheduled YouTube sync (Vercel Cron, see vercel.json).
 * Auth: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`.
 * Reads the channel's uploads playlist via YouTube Data API v3 and
 * upserts into `videos`. Manual rows (sync_source='manual') are never
 * overwritten; admins can hide any synced video from the panel.
 */
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ skipped: "YOUTUBE_API_KEY not configured" });
  }

  const db = createAdminClient();

  // Channel ID: env var wins; else the admin-editable setting.
  let channelId = process.env.YOUTUBE_CHANNEL_ID ?? "";
  if (!channelId) {
    const { data } = await db.from("settings").select("value").eq("key", "channels").single();
    channelId = (data?.value as { youtube_channel_id?: string })?.youtube_channel_id ?? "";
  }
  if (!channelId) {
    return NextResponse.json({ skipped: "No YouTube channel ID in env or settings" });
  }

  // Uploads playlist ID is the channel ID with 'UC' → 'UU'.
  const uploads = channelId.replace(/^UC/, "UU");
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", uploads);
  url.searchParams.set("maxResults", "25");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: `YouTube API ${res.status}`, body }, { status: 502 });
  }
  const json = (await res.json()) as { items?: YtPlaylistItem[] };
  const items = json.items ?? [];

  let upserted = 0;
  for (const item of items) {
    const videoId = item.contentDetails.videoId;
    // never clobber a manually curated row
    const { data: existing } = await db
      .from("videos").select("sync_source").eq("youtube_video_id", videoId).maybeSingle();
    if (existing?.sync_source === "manual") continue;

    const { error } = await db.from("videos").upsert(
      {
        youtube_video_id: videoId,
        title: item.snippet.title,
        description: item.snippet.description?.slice(0, 500) || null,
        thumbnail_url: item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.medium?.url ?? null,
        published_at: item.contentDetails.videoPublishedAt,
        sync_source: "auto",
      },
      { onConflict: "youtube_video_id" }
    );
    if (!error) upserted++;
  }

  await db.from("audit_logs").insert({
    actor: null, action: "sync", entity: "videos", entity_id: null,
    diff: { found: items.length, upserted },
  });

  return NextResponse.json({ ok: true, found: items.length, upserted });
}

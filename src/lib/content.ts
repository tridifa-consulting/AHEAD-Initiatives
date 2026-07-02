import { createPublicClient } from "@/lib/supabase/public";
import type {
  BlogPostRow, DocumentRow, MediaRow, NoticeRow,
  PersonRow, SiteSection, SocialPostRow, VideoRow,
} from "@/lib/types";

/**
 * Public content readers. RLS already limits the anon client to
 * published + visible rows, so no status filters are needed here.
 * The home page uses ISR (revalidate) — admin publishes will call
 * revalidatePath('/') in Phase 3 for near-instant updates.
 */

export async function getSections(): Promise<SiteSection[]> {
  const { data, error } = await createPublicClient()
    .from("site_sections")
    .select("id, slug, parent_slug, title, subtitle, body, media, extra, sort_order, status, visible")
    .order("sort_order");
  if (error) throw new Error(`sections: ${error.message}`);
  return (data ?? []) as SiteSection[];
}

export async function getDocuments(): Promise<DocumentRow[]> {
  const { data, error } = await createPublicClient()
    .from("documents")
    .select("id, title, description, category, subcategory, author, year, quarter, language, source, file_path, external_url, drive_url, thumbnail_url, file_available, sort_order")
    .order("sort_order");
  if (error) throw new Error(`documents: ${error.message}`);
  return (data ?? []) as DocumentRow[];
}

export async function getPeople(): Promise<PersonRow[]> {
  const { data, error } = await createPublicClient()
    .from("people_public") // masks email/phone unless the person opted in
    .select("id, name, role, group_name, bio, email, phone, photo_media_id, sort_order")
    .order("sort_order");
  if (error) throw new Error(`people: ${error.message}`);
  return (data ?? []) as PersonRow[];
}

export async function getMedia(collection: string): Promise<MediaRow[]> {
  const { data, error } = await createPublicClient()
    .from("media_items")
    .select("id, title, alt_text, collection, file_path, url, sort_order")
    .eq("collection", collection)
    .order("sort_order");
  if (error) throw new Error(`media: ${error.message}`);
  return (data ?? []) as MediaRow[];
}

export async function getVideos(limit = 12): Promise<VideoRow[]> {
  const { data, error } = await createPublicClient()
    .from("videos")
    .select("id, youtube_video_id, title, description, thumbnail_url, published_at, featured")
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`videos: ${error.message}`);
  return (data ?? []) as VideoRow[];
}

export async function getSocialPosts(limit = 8): Promise<SocialPostRow[]> {
  const { data, error } = await createPublicClient()
    .from("social_posts")
    .select("id, platform, title, description, link_url, posted_at")
    .order("posted_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`social: ${error.message}`);
  return (data ?? []) as SocialPostRow[];
}

export async function getBlogPosts(limit = 6): Promise<BlogPostRow[]> {
  const { data, error } = await createPublicClient()
    .from("blog_posts")
    .select("id, slug, title, excerpt, published_at")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`blog: ${error.message}`);
  return (data ?? []) as BlogPostRow[];
}

export async function getActiveNotices(): Promise<NoticeRow[]> {
  const { data, error } = await createPublicClient()
    .from("emergency_notices")
    .select("id, message, link_url, severity");
  if (error) throw new Error(`notices: ${error.message}`);
  return (data ?? []) as NoticeRow[];
}

export async function getSettings(): Promise<Record<string, Record<string, string>>> {
  const { data, error } = await createPublicClient().from("settings").select("key, value");
  if (error) throw new Error(`settings: ${error.message}`);
  return Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
}

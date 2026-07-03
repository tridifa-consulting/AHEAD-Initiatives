"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { mutate, str } from "@/lib/admin";

const schema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  platform: z.enum(["linkedin", "facebook", "instagram", "x", "other"]),
  title: z.string().min(1).max(200),
  link_url: z.string().url().max(600).optional().or(z.literal("")),
  posted_at: z.string().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
});

export async function saveSocialPost(form: FormData) {
  const parsed = schema.parse({
    id: str(form, "id"),
    platform: str(form, "platform"),
    title: str(form, "title"),
    link_url: str(form, "link_url"),
    posted_at: str(form, "posted_at"),
    status: str(form, "status"),
  });
  const row = {
    platform: parsed.platform,
    title: parsed.title,
    description: str(form, "description") || null,
    link_url: parsed.link_url || null,
    posted_at: parsed.posted_at || null,
    status: parsed.status,
  };
  let id = parsed.id || null;
  await mutate(id ? "update" : "create", "social_posts", async (db) => {
    if (id) {
      const { error } = await db.from("social_posts").update(row).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data, error } = await db.from("social_posts").insert(row).select("id").single();
      if (error) throw new Error(error.message);
      id = data.id;
    }
    return id;
  });
  redirect(`/admin/social/${id}?saved=1`);
}

export async function deleteSocialPost(form: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  await mutate("delete", "social_posts", async (db) => {
    const { error } = await db.from("social_posts").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  });
  redirect("/admin/social");
}

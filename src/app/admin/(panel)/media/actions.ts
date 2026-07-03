"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { bool, mutate, str } from "@/lib/admin";

const schema = z.object({
  title: z.string().min(1).max(200),
  collection: z.string().min(1).max(100),
  source: z.enum(["local", "drive", "external"]),
  url: z.string().url().max(1000).optional().or(z.literal("")),
  file_path: z.string().max(500).optional().or(z.literal("")),
  drive_file_id: z.string().max(200).optional().or(z.literal("")),
});

export async function addMedia(form: FormData) {
  const parsed = schema.parse({
    title: str(form, "title"),
    collection: str(form, "collection"),
    source: str(form, "source"),
    url: str(form, "url"),
    file_path: str(form, "file_path"),
    drive_file_id: str(form, "drive_file_id"),
  });
  if (!parsed.url && !parsed.file_path) {
    throw new Error("Provide either an image link or a site file path.");
  }

  await mutate("create", "media_items", async (db) => {
    const { data, error } = await db.from("media_items").insert({
      title: parsed.title,
      alt_text: { en: str(form, "alt") || parsed.title },
      collection: parsed.collection,
      source: parsed.source,
      url: parsed.url || null,
      file_path: parsed.file_path || null,
      drive_file_id: parsed.drive_file_id || null,
      status: bool(form, "published") ? "published" : "draft",
    }).select("id").single();
    if (error) throw new Error(error.message);
    return data.id;
  });
  redirect("/admin/media?saved=1");
}

export async function deleteMedia(form: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  await mutate("delete", "media_items", async (db) => {
    const { error } = await db.from("media_items").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  });
  redirect("/admin/media");
}

"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { bool, mutate, str } from "@/lib/admin";

const schema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  title: z.string().min(1, "Title is required").max(300),
  category: z.enum([
    "annual_report", "financial", "fcra_quarterly", "fcra_annual",
    "mca_filing", "it_return", "policy", "publication", "newsletter", "other",
  ]),
  language: z.enum(["en", "bn", "multi"]),
  source: z.enum(["local", "drive", "storage", "external"]),
  status: z.enum(["draft", "published"]),
  external_url: z.string().url().max(1000).optional().or(z.literal("")),
  file_path: z.string().max(500).optional().or(z.literal("")),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export async function saveDocument(form: FormData) {
  const parsed = schema.parse({
    id: str(form, "id"),
    title: str(form, "title"),
    category: str(form, "category"),
    language: str(form, "language"),
    source: str(form, "source"),
    status: str(form, "status"),
    external_url: str(form, "external_url"),
    file_path: str(form, "file_path"),
    sort_order: str(form, "sort_order") || "0",
  });

  const row = {
    title: parsed.title,
    description: str(form, "description") || null,
    author: str(form, "author") || null,
    category: parsed.category,
    subcategory: str(form, "subcategory") || null,
    year: str(form, "year") || null,
    quarter: str(form, "quarter") || null,
    language: parsed.language,
    tags: str(form, "tags") ? str(form, "tags").split(",").map((t) => t.trim()).filter(Boolean) : [],
    source: parsed.source,
    file_path: parsed.file_path || null,
    external_url: parsed.external_url || null,
    drive_file_id: str(form, "drive_file_id") || null,
    drive_url: str(form, "drive_url") || null,
    thumbnail_url: str(form, "drive_thumbnail") || null,
    file_available: bool(form, "file_available"),
    status: parsed.status,
    visible: bool(form, "visible"),
    sort_order: parsed.sort_order,
  };

  let id = parsed.id || null;
  await mutate(id ? "update" : "create", "documents", async (db) => {
    if (id) {
      const { error } = await db.from("documents").update(row).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data, error } = await db.from("documents").insert(row).select("id").single();
      if (error) throw new Error(error.message);
      id = data.id;
    }
    return id;
  });

  redirect(`/admin/documents/${id}?saved=1`);
}

export async function deleteDocument(form: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  await mutate("delete", "documents", async (db) => {
    const { error } = await db.from("documents").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  });
  redirect("/admin/documents");
}

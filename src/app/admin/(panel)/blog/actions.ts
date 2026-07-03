"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { mutate, packI18n, str } from "@/lib/admin";

const schema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens"),
  status: z.enum(["draft", "published"]),
});

export async function savePost(form: FormData) {
  const parsed = schema.parse({
    id: str(form, "id"),
    slug: str(form, "slug"),
    status: str(form, "status"),
  });

  const title = packI18n(form, "title");
  if (!title.en && !title.bn) throw new Error("A title is required in at least one language.");

  const row = {
    slug: parsed.slug,
    title,
    excerpt: packI18n(form, "excerpt"),
    body: packI18n(form, "body"),
    tags: str(form, "tags") ? str(form, "tags").split(",").map((t) => t.trim()).filter(Boolean) : [],
    status: parsed.status,
  };

  let id = parsed.id || null;
  await mutate(parsed.status === "published" ? "publish" : id ? "update" : "create", "blog_posts", async (db) => {
    if (id) {
      // set published_at the first time a post goes live
      const { data: existing } = await db.from("blog_posts").select("published_at").eq("id", id).single();
      const published_at =
        parsed.status === "published" ? existing?.published_at ?? new Date().toISOString() : existing?.published_at;
      const { error } = await db.from("blog_posts").update({ ...row, published_at }).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data, error } = await db
        .from("blog_posts")
        .insert({ ...row, published_at: parsed.status === "published" ? new Date().toISOString() : null })
        .select("id").single();
      if (error) throw new Error(error.message);
      id = data.id;
    }
    return id;
  });

  revalidatePath(`/blog/${parsed.slug}`);
  redirect(`/admin/blog/${id}?saved=1`);
}

export async function deletePost(form: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  await mutate("delete", "blog_posts", async (db) => {
    const { error } = await db.from("blog_posts").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  });
  redirect("/admin/blog");
}

"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { bool, mutate, packI18n, str } from "@/lib/admin";

const schema = z.object({
  slug: z.string().min(1).max(100),
  status: z.enum(["draft", "published"]),
});

export async function saveSection(form: FormData) {
  const { slug, status } = schema.parse({
    slug: str(form, "slug"),
    status: str(form, "status"),
  });

  await mutate(status === "published" ? "publish" : "update", "site_sections", async (db) => {
    const { error } = await db
      .from("site_sections")
      .update({
        title: packI18n(form, "title"),
        subtitle: packI18n(form, "subtitle"),
        body: packI18n(form, "body"),
        status,
        visible: bool(form, "visible"),
      })
      .eq("slug", slug);
    if (error) throw new Error(error.message);
    return slug;
  });

  redirect(`/admin/sections/${slug}?saved=1`);
}

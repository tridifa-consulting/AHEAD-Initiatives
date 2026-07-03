"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { bool, mutate, packI18n, str } from "@/lib/admin";

const schema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  severity: z.enum(["info", "warning", "urgent"]),
  link_url: z.string().url().max(500).optional().or(z.literal("")),
  ends_at: z.string().optional().or(z.literal("")),
});

export async function saveNotice(form: FormData) {
  const parsed = schema.parse({
    id: str(form, "id"),
    severity: str(form, "severity"),
    link_url: str(form, "link_url"),
    ends_at: str(form, "ends_at"),
  });
  const message = packI18n(form, "message");
  if (!message.en && !message.bn) throw new Error("The notice needs a message.");

  const row = {
    message,
    severity: parsed.severity,
    link_url: parsed.link_url || null,
    ends_at: parsed.ends_at ? new Date(parsed.ends_at).toISOString() : null,
    active: bool(form, "active"),
  };

  let id = parsed.id || null;
  await mutate(id ? "update" : "create", "emergency_notices", async (db) => {
    if (id) {
      const { error } = await db.from("emergency_notices").update(row).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { data, error } = await db.from("emergency_notices").insert(row).select("id").single();
      if (error) throw new Error(error.message);
      id = data.id;
    }
    return id;
  });
  redirect(`/admin/notices/${id}?saved=1`);
}

export async function deleteNotice(form: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  await mutate("delete", "emergency_notices", async (db) => {
    const { error } = await db.from("emergency_notices").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return id;
  });
  redirect("/admin/notices");
}

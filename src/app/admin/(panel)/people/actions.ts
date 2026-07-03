"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { bool, packI18n, str } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const schema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  name: z.string().min(1).max(200),
  group_name: z.enum(["board", "project_directors", "field_team", "advisors"]),
  email: z.string().email().max(200).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  sort_order: z.coerce.number().int().min(0).default(0),
});

/** People changes are admin-only (RLS also enforces this). */
export async function savePerson(form: FormData) {
  const admin = await requireAdmin();
  const parsed = schema.parse({
    id: str(form, "id"),
    name: str(form, "name"),
    group_name: str(form, "group_name"),
    email: str(form, "email"),
    status: str(form, "status"),
    sort_order: str(form, "sort_order") || "0",
  });
  const row = {
    name: parsed.name,
    role: str(form, "role") || null,
    group_name: parsed.group_name,
    bio: packI18n(form, "bio"),
    email: parsed.email || null,
    show_email: bool(form, "show_email"),
    phone: str(form, "phone") || null,
    show_phone: bool(form, "show_phone"),
    status: parsed.status,
    sort_order: parsed.sort_order,
  };
  const db = await createClient();
  let id = parsed.id || null;
  if (id) {
    const { error } = await db.from("people").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await db.from("people").insert(row).select("id").single();
    if (error) throw new Error(error.message);
    id = data.id;
  }
  await logAudit(admin.id, parsed.id ? "update" : "create", "people", id);
  revalidatePath("/");
  redirect(`/admin/people/${id}?saved=1`);
}

export async function deletePerson(form: FormData) {
  const admin = await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  const db = await createClient();
  const { error } = await db.from("people").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAudit(admin.id, "delete", "people", id);
  revalidatePath("/");
  redirect("/admin/people");
}

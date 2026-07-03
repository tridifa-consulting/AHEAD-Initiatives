"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { packI18n, str } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  name: z.string().min(1).max(200),
  kind: z.enum(["csr", "institutional", "government", "network", "donor", "other"]),
  url: z.string().url().max(500).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export async function savePartner(form: FormData) {
  const admin = await requireAdmin();
  const parsed = schema.parse({
    id: str(form, "id"),
    name: str(form, "name"),
    kind: str(form, "kind"),
    url: str(form, "url"),
    status: str(form, "status"),
    sort_order: str(form, "sort_order") || "0",
  });
  const row = {
    name: parsed.name,
    kind: parsed.kind,
    description: packI18n(form, "description"),
    url: parsed.url || null,
    status: parsed.status,
    sort_order: parsed.sort_order,
  };
  const db = await createClient();
  let id = parsed.id || null;
  if (id) {
    const { error } = await db.from("partners").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await db.from("partners").insert(row).select("id").single();
    if (error) throw new Error(error.message);
    id = data.id;
  }
  await logAudit(admin.id, parsed.id ? "update" : "create", "partners", id);
  revalidatePath("/");
  redirect(`/admin/partners/${id}?saved=1`);
}

export async function deletePartner(form: FormData) {
  const admin = await requireAdmin();
  const id = z.string().uuid().parse(str(form, "id"));
  const db = await createClient();
  const { error } = await db.from("partners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAudit(admin.id, "delete", "partners", id);
  revalidatePath("/");
  redirect("/admin/partners");
}

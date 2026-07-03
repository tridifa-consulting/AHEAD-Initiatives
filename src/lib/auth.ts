import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Staff = {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor";
};

/**
 * Resolve the signed-in staff member (or redirect to login).
 * The proxy already gates /admin, but server actions and layouts
 * re-verify — never trust the client for authorisation.
 */
export async function requireStaff(): Promise<Staff> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();
  if (!profile) redirect("/admin/login");

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profile.full_name ?? user.email ?? "",
    role: profile.role as Staff["role"],
  };
}

export async function requireAdmin(): Promise<Staff> {
  const staff = await requireStaff();
  if (staff.role !== "admin") redirect("/admin?error=admin-only");
  return staff;
}

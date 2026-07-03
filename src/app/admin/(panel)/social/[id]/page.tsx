import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import SocialForm from "../SocialForm";

export const metadata = { title: "Edit social card — AHEAD Admin", robots: { index: false } };

export default async function EditSocial({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: card } = await supabase.from("social_posts").select("*").eq("id", id).single();
  if (!card) notFound();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Edit social card</h1>
      <SocialForm card={card} saved={saved === "1"} isAdmin={staff.role === "admin"} />
    </div>
  );
}

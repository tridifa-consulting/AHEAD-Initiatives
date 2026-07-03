import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import NoticeForm from "../NoticeForm";

export const metadata = { title: "Edit notice — AHEAD Admin", robots: { index: false } };

export default async function EditNotice({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: notice } = await supabase.from("emergency_notices").select("*").eq("id", id).single();
  if (!notice) notFound();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Edit notice</h1>
      <NoticeForm notice={notice} saved={saved === "1"} isAdmin={staff.role === "admin"} />
    </div>
  );
}

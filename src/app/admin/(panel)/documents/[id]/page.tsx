import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import DocumentForm from "../DocumentForm";

export const metadata = { title: "Edit document — AHEAD Admin", robots: { index: false } };

export default async function EditDocument({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: doc } = await supabase.from("documents").select("*").eq("id", id).single();
  if (!doc) notFound();
  return (
    <div>
      <h1 className="truncate font-serif text-2xl font-semibold text-[#16324F]">Edit · {doc.title}</h1>
      <DocumentForm doc={doc} saved={saved === "1"} isAdmin={staff.role === "admin"} />
    </div>
  );
}

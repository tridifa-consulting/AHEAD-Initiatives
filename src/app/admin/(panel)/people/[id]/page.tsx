import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import PersonForm from "../PersonForm";

export const metadata = { title: "Edit person — AHEAD Admin", robots: { index: false } };

export default async function EditPerson({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: person } = await supabase.from("people").select("*").eq("id", id).single();
  if (!person) notFound();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Edit · {person.name}</h1>
      <PersonForm person={person} saved={saved === "1"} />
    </div>
  );
}

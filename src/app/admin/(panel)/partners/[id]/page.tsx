import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import PartnerForm from "../PartnerForm";

export const metadata = { title: "Edit partner — AHEAD Admin", robots: { index: false } };

export default async function EditPartner({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: partner } = await supabase.from("partners").select("*").eq("id", id).single();
  if (!partner) notFound();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Edit · {partner.name}</h1>
      <PartnerForm partner={partner} saved={saved === "1"} />
    </div>
  );
}

import { requireAdmin } from "@/lib/auth";
import PartnerForm from "../PartnerForm";

export const metadata = { title: "Add partner — AHEAD Admin", robots: { index: false } };

export default async function NewPartner() {
  await requireAdmin();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Add a partner</h1>
      <PartnerForm />
    </div>
  );
}

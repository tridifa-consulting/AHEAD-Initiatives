import { requireAdmin } from "@/lib/auth";
import PersonForm from "../PersonForm";

export const metadata = { title: "Add person — AHEAD Admin", robots: { index: false } };

export default async function NewPerson() {
  await requireAdmin();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Add a person</h1>
      <PersonForm />
    </div>
  );
}

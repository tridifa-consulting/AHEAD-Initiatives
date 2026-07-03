import { requireStaff } from "@/lib/auth";
import DocumentForm from "../DocumentForm";

export const metadata = { title: "Add document — AHEAD Admin", robots: { index: false } };

export default async function NewDocument() {
  const staff = await requireStaff();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">Add a document</h1>
      <DocumentForm isAdmin={staff.role === "admin"} />
    </div>
  );
}

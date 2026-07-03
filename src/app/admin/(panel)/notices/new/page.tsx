import { requireStaff } from "@/lib/auth";
import NoticeForm from "../NoticeForm";

export const metadata = { title: "New notice — AHEAD Admin", robots: { index: false } };

export default async function NewNotice() {
  const staff = await requireStaff();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">New notice</h1>
      <NoticeForm isAdmin={staff.role === "admin"} />
    </div>
  );
}

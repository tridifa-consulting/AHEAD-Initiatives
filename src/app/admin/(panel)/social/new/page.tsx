import { requireStaff } from "@/lib/auth";
import SocialForm from "../SocialForm";

export const metadata = { title: "New social card — AHEAD Admin", robots: { index: false } };

export default async function NewSocial() {
  const staff = await requireStaff();
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[#16324F]">New social card</h1>
      <SocialForm isAdmin={staff.role === "admin"} />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard, BookOpenText, PenSquare, FileText, Clapperboard, Share2,
  Megaphone, Users, Handshake, Settings, Eye, LogOut, ImageIcon,
} from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sections", label: "Page chapters", icon: BookOpenText },
  { href: "/admin/blog", label: "Blog & updates", icon: PenSquare },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/media", label: "Images", icon: ImageIcon },
  { href: "/admin/videos", label: "Videos", icon: Clapperboard },
  { href: "/admin/social", label: "Social cards", icon: Share2 },
  { href: "/admin/notices", label: "Notices", icon: Megaphone },
  { href: "/admin/people", label: "People", icon: Users },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
];

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();

  return (
    <div className="flex min-h-screen bg-[#FAF7F0] text-[#1F2933]">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[#16324F]/10 bg-white lg:flex">
        <div className="flex items-center gap-2.5 border-b border-[#16324F]/10 px-5 py-4">
          <Image src="/logo.jpg" alt="" width={32} height={32} className="rounded-full" />
          <div>
            <div className="font-serif text-sm font-semibold text-[#16324F]">AHEAD Admin</div>
            <div className="text-[11px] text-[#1F2933]/55">{staff.fullName} · {staff.role}</div>
          </div>
        </div>
        <nav aria-label="Admin modules" className="flex-1 space-y-0.5 p-3">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#16324F]/80 hover:bg-[#16324F]/5 hover:text-[#16324F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-[#16324F]/10 p-3">
          <a
            href="/api/draft?to=/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#2D6A4F] hover:bg-[#2D6A4F]/10"
          >
            <Eye className="h-4 w-4" /> Preview drafts on site
          </a>
          <form action={signOut}>
            <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[#1F2933]/70 hover:bg-[#16324F]/5">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* small-screen module bar */}
        <nav aria-label="Admin modules" className="scrollbar-none flex gap-1 overflow-x-auto border-b border-[#16324F]/10 bg-white px-3 py-2 lg:hidden">
          {nav.map(({ href, label }) => (
            <Link key={href} href={href} className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs text-[#16324F]/75 hover:bg-[#16324F]/8">
              {label}
            </Link>
          ))}
        </nav>
        <div className="mx-auto max-w-4xl p-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

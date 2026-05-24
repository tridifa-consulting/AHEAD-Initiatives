"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Lightbulb,
  BookOpen,
  Phone,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "About Us",
    href: "/about",
    icon: Info,
    children: [
      { label: "History & Purpose", href: "/about" },
      { label: "Memorandum & Articles", href: "/about#moa" },
      { label: "Financials & Reports", href: "/about#financials" },
      { label: "Compliances", href: "/about#compliances" },
      { label: "Policies", href: "/about#policies" },
    ],
  },
  {
    label: "Our Initiatives",
    href: "/initiatives",
    icon: Lightbulb,
    children: [
      { label: "Strategy of Self Governance", href: "/initiatives#strategy" },
      { label: "Addressing Hunger", href: "/initiatives#hunger" },
      { label: "Education Initiative", href: "/initiatives#education" },
      { label: "Culture & Development", href: "/initiatives#culture" },
      { label: "Srijangan", href: "/initiatives#srijangan" },
    ],
  },
  {
    label: "Resources",
    href: "/resources/print",
    icon: BookOpen,
    children: [
      { label: "Printed Materials", href: "/resources/print" },
      { label: "Audio-Visual Resources", href: "/resources/av" },
      { label: "Image Gallery", href: "/resources/gallery" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: Phone,
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1E3F66] via-[#2d6a4f] to-[#e07a5f]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#1E3F66] to-[#2d6a4f] flex items-center justify-center text-white font-bold text-sm lg:text-base shadow-lg group-hover:shadow-xl transition-shadow">
              AH
            </div>
            <div className="hidden sm:block">
              <div className="text-[#1E3F66] font-bold text-lg lg:text-xl tracking-tight leading-tight">
                AHEAD
              </div>
              <div className="text-gray-500 text-[10px] lg:text-xs tracking-wider uppercase leading-tight">
                Initiatives
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-[#1E3F66] bg-blue-50/80"
                      : "text-gray-600 hover:text-[#1E3F66] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1 min-w-[220px] animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                      <div className="h-0.5 bg-gradient-to-r from-[#1E3F66] to-[#e07a5f] mx-3 mb-2 rounded-full" />
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#1E3F66] hover:bg-blue-50/50 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#e07a5f] to-[#d4654a] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            Support Us
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-[#1E3F66] bg-blue-50"
                      : "text-gray-600 hover:text-[#1E3F66] hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    if (!item.children) setMobileOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-11 space-y-0.5 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-500 hover:text-[#1E3F66] rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Link
                href="/contact"
                className="block text-center px-5 py-3 bg-gradient-to-r from-[#e07a5f] to-[#d4654a] text-white text-sm font-semibold rounded-full shadow-md"
                onClick={() => setMobileOpen(false)}
              >
                Support Our Initiatives
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

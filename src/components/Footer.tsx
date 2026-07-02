import Link from "next/link";
import { Heart, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const footerLinks = {
  initiatives: [
    { label: "Addressing Hunger", href: "/initiatives#hunger" },
    { label: "Education Initiative", href: "/initiatives#education" },
    { label: "Culture & Development", href: "/initiatives#culture" },
    { label: "Srijangan", href: "/initiatives#srijangan" },
    { label: "Strategy", href: "/initiatives#strategy" },
  ],
  resources: [
    { label: "Publications", href: "/#publications" },
    { label: "Videos & Media", href: "/#media" },
    { label: "Reports & Transparency", href: "/#reports" },
  ],
  organization: [
    { label: "Our Story", href: "/#story" },
    { label: "Board & Team", href: "/#contact" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "Contact & Support", href: "/#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1E3F66] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm border border-white/20">
                AH
              </div>
              <div>
                <div className="font-bold text-lg tracking-tight">AHEAD</div>
                <div className="text-blue-200 text-xs tracking-wider uppercase">
                  Initiatives
                </div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Addressing Hunger, Empowerment and Development through local
              self-governance in Eastern India.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-blue-200">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>32/6 Gariahat Road (S), Kolkata - 700031, India</span>
              </div>
              <a
                href="tel:+910334067369"
                className="flex items-center gap-2.5 text-blue-200 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91-033-40670369
              </a>
              <a
                href="mailto:ahead@aheadinitiatives.in"
                className="flex items-center gap-2.5 text-blue-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                ahead@aheadinitiatives.in
              </a>
            </div>
          </div>

          {/* Our Initiatives */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Our Initiatives
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.initiatives.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 mt-8">
              Organization
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.organization.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Partners & Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.nabodisha.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-200 text-sm hover:text-white transition-colors"
                >
                  Nabodisha Portal
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <p className="text-blue-100 text-xs leading-relaxed">
                AHEAD Initiatives is a registered not-for-profit organization.
                All contributions are eligible for tax benefits under applicable
                Indian tax laws.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-blue-300 text-xs">
            <p>
              &copy; {new Date().getFullYear()} AHEAD Initiatives. All rights
              reserved.
            </p>
            <p className="flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 text-[#e07a5f] fill-[#e07a5f]" /> for
              communities in Eastern India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

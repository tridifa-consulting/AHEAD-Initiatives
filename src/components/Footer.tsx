import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  initiatives: [
    {
      label: "Addressing Hunger",
      href: "/initiatives#hunger",
    },
    {
      label: "Education Initiative",
      href: "/initiatives#education",
    },
    {
      label: "Culture & Development",
      href: "/initiatives#culture",
    },
    {
      label: "Srijangan",
      href: "/initiatives#srijangan",
    },
    {
      label: "Strategy",
      href: "/initiatives#strategy",
    },
  ],

  resources: [
    {
      label: "Publications",
      href: "/#publications",
    },
    {
      label: "Videos & Media",
      href: "/#media",
    },
    {
      label: "Reports & Transparency",
      href: "/#reports",
    },
  ],

  organization: [
    {
      label: "Our Story",
      href: "/#story",
    },
    {
      label: "Board & Team",
      href: "/#contact",
    },
    {
      label: "Philosophy",
      href: "/#philosophy",
    },
    {
      label: "Contact & Support",
      href: "/#contact",
    },
  ],
};

const footerLinkClass =
  "group relative inline-flex items-center text-[0.82rem] font-medium leading-relaxed text-white/68 transition-colors duration-200 hover:text-[#B9F6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#67E8F9]";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={footerLinkClass}
    >
      <span className="relative">
        {children}

        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-0 bg-[#67E8F9]/75 transition-all duration-300 group-hover:w-full"
        />
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#053B5E] text-white">
      {/* ─────────────────────────────────────────────
          BACKGROUND ATMOSPHERE
      ───────────────────────────────────────────── */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.05) 1px, transparent 1px)",
          backgroundSize:
            "42px 42px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-12 h-96 w-96 rounded-full bg-[#0891B2]/10 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-36 right-8 h-96 w-96 rounded-full bg-[#D8A441]/8 blur-3xl"
      />

      {/* Institutional top rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#67E8F9] via-[#0891B2] to-[#D8A441]"
      />

      {/* ─────────────────────────────────────────────
          MAIN FOOTER
      ───────────────────────────────────────────── */}

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1fr_1fr] lg:gap-12">
          {/* ─────────────────────────────────────────
              BRAND / ORGANISATION IDENTITY
          ───────────────────────────────────────── */}

          <div>
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full border border-[#67E8F9]/20" />

                <div className="relative overflow-hidden rounded-full border border-white/12 bg-[#FFF8EA] p-1 shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
                  <Image
                    src="/logo.jpg"
                    alt="AHEAD Initiatives"
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="font-serif text-[1.3rem] font-bold leading-none tracking-[-0.02em] text-[#FFF8EA]">
                  AHEAD
                </div>

                <div className="mt-1 text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-[#67E8F9]">
                  Initiatives
                </div>
              </div>
            </div>

            <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#67E8F9]/80 to-transparent" />

            <p className="mt-5 max-w-sm text-[0.84rem] font-medium leading-[1.75] text-white/68">
              Addressing Hunger, Empowerment and
              Development through local self-
              governance in Eastern India.
            </p>

            {/* Contact details */}
            <div className="mt-7 space-y-3.5">
              <div className="flex items-start gap-3 text-[0.79rem] leading-relaxed text-white/67">
                <MapPin className="mt-[3px] h-4 w-4 shrink-0 text-[#67E8F9]/75" />

                <span>
                  32/6 Gariahat Road (S), Kolkata -
                  700031, India
                </span>
              </div>

              <a
                href="tel:+910334067369"
                className="group flex items-center gap-3 text-[0.79rem] text-white/67 transition-colors hover:text-[#B9F6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#67E8F9]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#67E8F9]/75" />

                <span className="border-b border-transparent transition-colors group-hover:border-[#67E8F9]/35">
                  +91-033-40670369
                </span>
              </a>

              <a
                href="mailto:ahead@aheadinitiatives.in"
                className="group flex items-center gap-3 text-[0.79rem] text-white/67 transition-colors hover:text-[#B9F6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#67E8F9]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#67E8F9]/75" />

                <span className="border-b border-transparent transition-colors group-hover:border-[#67E8F9]/35">
                  ahead@aheadinitiatives.in
                </span>
              </a>
            </div>
          </div>

          {/* ─────────────────────────────────────────
              INITIATIVES
          ───────────────────────────────────────── */}

          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#D8A441]/70" />

                <h3 className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#FFF8EA]">
                  Our Initiatives
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5">
              {footerLinks.initiatives.map(
                (link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ─────────────────────────────────────────
              RESOURCES + ORGANIZATION
          ───────────────────────────────────────── */}

          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#D8A441]/70" />

                <h3 className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#FFF8EA]">
                  Resources
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5">
              {footerLinks.resources.map(
                (link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                )
              )}
            </ul>

            <div className="mb-6 mt-9">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#D8A441]/70" />

                <h3 className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#FFF8EA]">
                  Organization
                </h3>
              </div>
            </div>

            <ul className="space-y-3.5">
              {footerLinks.organization.map(
                (link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* ─────────────────────────────────────────
              PARTNERS & LINKS
          ───────────────────────────────────────── */}

          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-5 bg-[#D8A441]/70" />

                <h3 className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#FFF8EA]">
                  Partners &amp; Links
                </h3>
              </div>
            </div>

            <a
              href="https://www.nabodisha.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[0.82rem] font-medium text-white/68 transition-colors hover:text-[#B9F6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#67E8F9]"
            >
              <span className="relative">
                Nabodisha Portal

                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-[#67E8F9]/75 transition-all duration-300 group-hover:w-full"
                />
              </span>

              <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Institutional status note */}
            <div className="relative mt-8 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#67E8F9]/75 via-[#D8A441]/55 to-transparent"
              />

              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#67E8F9]" />

                <span className="text-[0.57rem] font-extrabold uppercase tracking-[0.17em] text-[#B9F6FF]/70">
                  Institutional note
                </span>
              </div>

              <p className="text-[0.71rem] font-medium leading-[1.7] text-white/66">
                AHEAD Initiatives is a registered
                not-for-profit organization. All
                contributions are eligible for tax
                benefits under applicable Indian tax
                laws.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          CLOSING RULE
      ───────────────────────────────────────────── */}

      <div
        aria-hidden
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      {/* ─────────────────────────────────────────────
          BOTTOM BAR
      ───────────────────────────────────────────── */}

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-[0.64rem] font-medium text-white/42">
              &copy; {new Date().getFullYear()} AHEAD
              Initiatives. All rights reserved.
            </p>

            <p className="flex items-center gap-1.5 text-[0.64rem] font-medium text-white/42">
              Built with

              <Heart
                aria-hidden
                className="h-3 w-3 fill-[#B96543] text-[#B96543]"
              />

              for communities in Eastern India
            </p>
          </div>
        </div>

        {/* Warm closing thread */}
        <div
          aria-hidden
          className="h-[2px] w-full bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#B96543]/75"
        />
      </div>
    </footer>
  );
}

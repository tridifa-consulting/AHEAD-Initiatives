"use client";

import {
  Mail,
  MapPin,
  Phone,
  Clapperboard,
  Link2,
  ArrowUpRight,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Closing chapter:
 * verified contact details + registered-office map.
 *
 * All organisational information, map URL and destination links
 * remain unchanged. This component only improves presentation.
 */
export default function ContactBlock({
  org,
  channels,
}: {
  org: Record<string, string>;
  channels: Record<string, string>;
}) {
  const reduced = useReducedMotion();

  const email =
    org.email ||
    "ahead@aheadinitiatives.in";

  const enterLeft = reduced
    ? {}
    : {
        initial: {
          opacity: 0,
          x: -18,
        },
        whileInView: {
          opacity: 1,
          x: 0,
        },
        viewport: {
          once: true,
          amount: 0 as const,
          margin:
            "0px 0px -10% 0px",
        },
      };

  const enterRight = reduced
    ? {}
    : {
        initial: {
          opacity: 0,
          x: 18,
        },
        whileInView: {
          opacity: 1,
          x: 0,
        },
        viewport: {
          once: true,
          amount: 0 as const,
          margin:
            "0px 0px -10% 0px",
        },
      };

  return (
    <div className="relative">
      {/* Quiet section atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -top-24 -z-10 h-72 w-72 rounded-full bg-[#67E8F9]/8 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-20 -z-10 h-72 w-72 rounded-full bg-[#D8A441]/7 blur-3xl"
      />

      {/* Unified contact composition */}
      <div className="overflow-hidden rounded-[2rem] border border-[#064E7A]/12 bg-[#FFFDF8] shadow-[0_22px_65px_rgba(6,78,122,0.10)]">
        {/* Institutional top line */}
        <div
          aria-hidden
          className="h-[4px] w-full bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
        />

        <div className="grid lg:grid-cols-[390px_minmax(0,1fr)]">
          {/* ─────────────────────────────────────
              CONTACT DETAILS
          ────────────────────────────────────── */}
          <motion.div
            {...enterLeft}
            transition={{
              duration: 0.58,
              ease,
            }}
            className="relative flex flex-col border-b border-[#064E7A]/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10"
          >
            {/* Archival label */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-8 bg-[#B96543]/65"
                />

                <span className="font-[var(--font-display)] text-[0.64rem] font-extrabold uppercase tracking-[0.26em] text-[#B96543]">
                  Registered office
                </span>
              </div>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-[#064E7A]/15 via-[#0891B2]/10 to-transparent" />
            </div>

            {/* Contact routes */}
            <ul className="space-y-1">
              {org.address && (
                <li>
                  <div className="group grid grid-cols-[38px_minmax(0,1fr)] gap-4 border-b border-[#064E7A]/8 py-5 first:pt-0">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0891B2]/14 bg-[#EAFBFD] text-[#075985] transition-colors duration-200 group-hover:border-[#0891B2]/28">
                      <MapPin
                        aria-hidden
                        className="h-4 w-4"
                      />
                    </span>

                    <div>
                      <div className="mb-1 font-[var(--font-display)] text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[#526B75]/60">
                        Address
                      </div>

                      <p className="text-[0.9rem] font-medium leading-[1.7] text-[#344B55]">
                        {org.address}
                      </p>
                    </div>
                  </div>
                </li>
              )}

              {org.phone && (
                <li>
                  <a
                    href={`tel:${org.phone.replace(
                      /\s/g,
                      ""
                    )}`}
                    className="group grid grid-cols-[38px_minmax(0,1fr)] gap-4 border-b border-[#064E7A]/8 py-5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0891B2]/14 bg-[#EAFBFD] text-[#075985] transition-all duration-200 group-hover:border-[#0891B2]/30 group-hover:bg-[#DDF8FB]">
                      <Phone
                        aria-hidden
                        className="h-4 w-4"
                      />
                    </span>

                    <div>
                      <div className="mb-1 font-[var(--font-display)] text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[#526B75]/60">
                        Telephone
                      </div>

                      <span className="text-[0.9rem] font-semibold text-[#064E7A] transition-colors group-hover:text-[#0891B2]">
                        {org.phone}
                      </span>
                    </div>
                  </a>
                </li>
              )}

              <li>
                <a
                  href={`mailto:${email}`}
                  className="group grid grid-cols-[38px_minmax(0,1fr)] gap-4 py-5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0891B2]/14 bg-[#EAFBFD] text-[#075985] transition-all duration-200 group-hover:border-[#0891B2]/30 group-hover:bg-[#DDF8FB]">
                    <Mail
                      aria-hidden
                      className="h-4 w-4"
                    />
                  </span>

                  <div className="min-w-0">
                    <div className="mb-1 font-[var(--font-display)] text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[#526B75]/60">
                      Email
                    </div>

                    <span className="break-all text-[0.9rem] font-semibold text-[#064E7A] transition-colors group-hover:text-[#0891B2]">
                      {email}
                    </span>
                  </div>
                </a>
              </li>
            </ul>

            {/* Social channels */}
            {(channels.youtube_handle ||
              channels.linkedin) && (
              <div className="mt-2 border-t border-[#064E7A]/8 pt-6">
                <div className="mb-3 font-[var(--font-display)] text-[0.59rem] font-extrabold uppercase tracking-[0.2em] text-[#526B75]/55">
                  Follow AHEAD
                </div>

                <div className="flex flex-wrap gap-2">
                  {channels.youtube_handle && (
                    <a
                      href={`https://www.youtube.com/${channels.youtube_handle}`}
                      target="_blank"
                      rel="noopener"
                      className="group inline-flex items-center gap-2 rounded-full border border-[#064E7A]/12 bg-[#FFF8EA] px-3.5 py-2 text-xs font-bold text-[#064E7A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0891B2]/30 hover:bg-[#EAFBFD]"
                    >
                      <Clapperboard className="h-3.5 w-3.5 text-[#0891B2]" />

                      YouTube

                      <ArrowUpRight className="h-3 w-3 opacity-45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}

                  {channels.linkedin && (
                    <a
                      href={
                        channels.linkedin
                      }
                      target="_blank"
                      rel="noopener"
                      className="group inline-flex items-center gap-2 rounded-full border border-[#064E7A]/12 bg-[#FFF8EA] px-3.5 py-2 text-xs font-bold text-[#064E7A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0891B2]/30 hover:bg-[#EAFBFD]"
                    >
                      <Link2 className="h-3.5 w-3.5 text-[#0891B2]" />

                      LinkedIn

                      <ArrowUpRight className="h-3 w-3 opacity-45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Existing support CTA */}
            <div className="mt-auto pt-8">
              <a
                href={`mailto:${email}?subject=Supporting%20AHEAD%20Initiatives`}
                className="group flex min-h-12 w-full items-center justify-between gap-4 rounded-[1rem] bg-[#064E7A] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(6,78,122,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#075985] hover:shadow-[0_16px_36px_rgba(6,78,122,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0891B2]"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#B9F6FF]" />

                  Write to us about supporting AHEAD
                </span>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#B9F6FF]/70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────
              REGISTERED OFFICE MAP
          ────────────────────────────────────── */}
          <motion.div
            {...enterRight}
            transition={{
              duration: 0.58,
              delay: 0.08,
              ease,
            }}
            className="relative min-h-[390px] overflow-hidden bg-[#EAF3F4] lg:min-h-[540px]"
          >
            <iframe
              title="AHEAD Initiatives — registered office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9428143436057!2d88.36535831432441!3d22.506328641073274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027128cceb4325%3A0x1fd2f48f5ff0eda7!2sAhead%20INITIATIVES!5e0!3m2!1sen!2sin!4v1593321333151!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                border: 0,
                minHeight: 390,
              }}
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />

            {/* Map identity marker */}
            <div className="pointer-events-none absolute bottom-5 left-5 hidden sm:block">
              <div className="rounded-full border border-white/40 bg-[#064E7A]/88 px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#67E8F9]" />

                  <span className="font-[var(--font-display)] text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-white">
                    AHEAD Initiatives
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

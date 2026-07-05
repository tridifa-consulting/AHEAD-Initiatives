"use client";

import { Mail, MapPin, Phone, Clapperboard, Link2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Closing chapter: verified contact details + the registered-office map.
 * Map embed URL is the one AHEAD uses on its own contact page (verified).
 * No fake contact form — a mailto CTA keeps every action real and working.
 */
export default function ContactBlock({
  org, channels,
}: {
  org: Record<string, string>;
  channels: Record<string, string>;
}) {
  const reduced = useReducedMotion();
  const enter = reduced ? {} : {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0 as const, margin: "0px 0px 15% 0px" },
  };

  const email = org.email || "ahead@aheadinitiatives.in";

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Details + support CTA */}
      <motion.div {...enter} transition={{ duration: 0.5 }} className="lg:col-span-2">
        <div className="rounded-2xl border border-[#16324F]/10 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-[#16324F]">Registered office</h3>
          <ul className="mt-4 space-y-4 text-sm text-[#1F2933]/80">
            {org.address && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#16324F]/5">
                  <MapPin aria-hidden className="h-4 w-4 text-[#16324F]" />
                </span>
                <span>{org.address}</span>
              </li>
            )}
            {org.phone && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2D6A4F]/8">
                  <Phone aria-hidden className="h-4 w-4 text-[#2D6A4F]" />
                </span>
                <a href={`tel:${org.phone.replace(/\s/g, "")}`} className="hover:text-[#C65D3B]">{org.phone}</a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C65D3B]/8">
                <Mail aria-hidden className="h-4 w-4 text-[#C65D3B]" />
              </span>
              <a href={`mailto:${email}`} className="hover:text-[#C65D3B]">{email}</a>
            </li>
          </ul>

          {/* Channels */}
          {(channels.youtube_handle || channels.linkedin) && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[#16324F]/8 pt-5">
              {channels.youtube_handle && (
                <a href={`https://www.youtube.com/${channels.youtube_handle}`} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#16324F]/12 px-3 py-1.5 text-xs font-medium text-[#16324F]/75 hover:border-[#C65D3B]/40 hover:text-[#C65D3B]">
                  <Clapperboard className="h-3.5 w-3.5" /> YouTube
                </a>
              )}
              {channels.linkedin && (
                <a href={channels.linkedin} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#16324F]/12 px-3 py-1.5 text-xs font-medium text-[#16324F]/75 hover:border-[#C65D3B]/40 hover:text-[#C65D3B]">
                  <Link2 className="h-3.5 w-3.5" /> LinkedIn
                </a>
              )}
            </div>
          )}

          {/* Support CTA — real mailto, no fake form */}
          <a
            href={`mailto:${email}?subject=Supporting%20AHEAD%20Initiatives`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C65D3B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b04e2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65D3B]"
          >
            <Mail className="h-4 w-4" /> Write to us about supporting AHEAD
          </a>
        </div>
      </motion.div>

      {/* Map */}
      <motion.div {...enter} transition={{ duration: 0.5, delay: 0.08 }} className="lg:col-span-3">
        <div className="h-full overflow-hidden rounded-2xl border border-[#16324F]/10 bg-white shadow-sm">
          <iframe
            title="AHEAD Initiatives — registered office location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9428143436057!2d88.36535831432441!3d22.506328641073274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027128cceb4325%3A0x1fd2f48f5ff0eda7!2sAhead%20INITIATIVES!5e0!3m2!1sen!2sin!4v1593321333151!5m2!1sen!2sin"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, minHeight: 340 }}
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import type { PartnerRow } from "@/lib/types";
import { t } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const kindLabels: Record<string, string> = {
  csr: "CSR partner",
  institutional: "Institutional",
  government: "Government",
  network: "Network",
  donor: "Donor",
  other: "Partner",
};

/* ─────────────────────────────────────────────────────────────
   PARTNER CARD
───────────────────────────────────────────────────────────── */

function PartnerCard({
  partner,
  index,
  reduced,
}: {
  partner: PartnerRow;
  index: number;
  reduced: boolean | null;
}) {
  const kind =
    kindLabels[partner.kind] ??
    partner.kind;

  const content = (
    <>
      {/* Aqua institutional rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#064E7A] via-[#0891B2] to-[#67E8F9]"
      />

      {/* Quiet decorative geometry */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full border border-[#0891B2]/8 bg-[#67E8F9]/5 transition-transform duration-500 group-hover:scale-110"
      />

      {/* Category + archive number */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-px w-7 bg-[#B96543]/55"
          />

          <span className="font-[var(--font-display)] text-[0.61rem] font-extrabold uppercase tracking-[0.2em] text-[#B96543]">
            {kind}
          </span>
        </div>

        <span
          aria-hidden
          className="font-[var(--font-display)] text-[2.25rem] font-extrabold leading-none tracking-[-0.055em] text-[#0891B2]/9"
        >
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </span>
      </div>

      {/* Partner identity */}
      <div className="relative mt-7 flex flex-1 flex-col">
        <h3 className="max-w-[95%] font-serif text-[1.25rem] font-bold leading-[1.3] tracking-[-0.025em] text-[#064E7A]">
          {partner.name}
        </h3>

        {t(partner.description) && (
          <p className="mt-4 flex-1 text-[0.84rem] font-medium leading-[1.75] text-[#526B75]/72">
            {t(partner.description)}
          </p>
        )}
      </div>

      {/* Destination */}
      {partner.url && (
        <div className="relative mt-7 border-t border-[#064E7A]/8 pt-4">
          <span className="inline-flex items-center gap-2 font-[var(--font-display)] text-[0.66rem] font-extrabold uppercase tracking-[0.12em] text-[#B96543] transition-colors duration-200 group-hover:text-[#075985]">
            Visit website

            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      )}
    </>
  );

  return (
    <motion.li
      initial={
        reduced
          ? {}
          : {
              opacity: 0,
              y: 16,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0,
        margin:
          "0px 0px -6% 0px",
      }}
      transition={{
        duration: 0.45,
        delay:
          Math.min(index, 7) *
          0.045,
        ease,
      }}
      className="h-full"
    >
      {partner.url ? (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener"
          className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-6 shadow-[0_8px_28px_rgba(6,78,122,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/28 hover:shadow-[0_18px_42px_rgba(6,78,122,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0891B2]"
        >
          {content}
        </a>
      ) : (
        <article className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-6 shadow-[0_8px_28px_rgba(6,78,122,0.055)]">
          {content}
        </article>
      )}
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────────────
   PARTNERS NETWORK
───────────────────────────────────────────────────────────── */

export default function PartnersGrid({
  partners,
}: {
  partners: PartnerRow[];
}) {
  const reduced =
    useReducedMotion();

  if (partners.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Quiet background atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-20 -z-10 h-64 w-64 rounded-full bg-[#67E8F9]/7 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-[#D8A441]/6 blur-3xl"
      />

      {/* Small collection summary */}
      <motion.div
        initial={
          reduced
            ? {}
            : {
                opacity: 0,
                y: 10,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.45,
          ease,
        }}
        className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-[#064E7A]/9 pb-5"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#0891B2]/55" />

          <span className="font-[var(--font-display)] text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-[#526B75]/65">
            Partnership Network
          </span>
        </div>

        <div className="flex items-end gap-2">
          <span className="font-serif text-[1.65rem] font-bold leading-none text-[#064E7A]">
            {partners.length}
          </span>

          <span className="pb-[2px] font-[var(--font-display)] text-[0.57rem] font-bold uppercase tracking-[0.16em] text-[#526B75]/52">
            {partners.length === 1
              ? "partner"
              : "partners"}
          </span>
        </div>
      </motion.div>

      {/* All partners remain visible */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map(
          (partner, index) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              index={index}
              reduced={reduced}
            />
          )
        )}
      </ul>

      {/* Small external-link key */}
      {partners.some(
        (partner) =>
          Boolean(partner.url)
      ) && (
        <div className="mt-6 flex items-center gap-2 border-t border-[#064E7A]/8 pt-4">
          <ExternalLink
            aria-hidden
            className="h-3 w-3 text-[#0891B2]/52"
          />

          <p className="text-[0.64rem] font-medium text-[#526B75]/55">
            Partner website links open in a new tab.
          </p>
        </div>
      )}
    </div>
  );
}

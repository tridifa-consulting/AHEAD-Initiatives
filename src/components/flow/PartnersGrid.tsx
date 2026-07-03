"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { PartnerRow } from "@/lib/types";
import { t } from "@/lib/types";

const kindLabels: Record<string, string> = {
  csr: "CSR partner", institutional: "Institutional", government: "Government",
  network: "Network", donor: "Donor", other: "Partner",
};

export default function PartnersGrid({ partners }: { partners: PartnerRow[] }) {
  const reduced = useReducedMotion();
  if (partners.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {partners.map((p, i) => (
        <motion.li
          key={p.id}
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.06 }}
          whileHover={reduced ? {} : { y: -3 }}
          className="h-full rounded-2xl border border-[#16324F]/8 bg-white p-5 shadow-sm"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2D6A4F]">
            {kindLabels[p.kind] ?? p.kind}
          </span>
          <h3 className="mt-1.5 text-sm font-semibold text-[#16324F]">{p.name}</h3>
          {t(p.description) && <p className="mt-1.5 text-sm leading-relaxed text-[#1F2933]/65">{t(p.description)}</p>}
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-xs text-[#C65D3B] hover:underline">
              Visit website <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </motion.li>
      ))}
    </ul>
  );
}

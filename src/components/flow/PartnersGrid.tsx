import { ExternalLink } from "lucide-react";
import type { PartnerRow } from "@/lib/types";
import { t } from "@/lib/types";
import Reveal from "./Reveal";

const kindLabels: Record<string, string> = {
  csr: "CSR partner", institutional: "Institutional", government: "Government",
  network: "Network", donor: "Donor", other: "Partner",
};

export default function PartnersGrid({ partners }: { partners: PartnerRow[] }) {
  if (partners.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {partners.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 5) * 50}>
          <li className="h-full rounded-xl border border-[#16324F]/10 bg-white p-5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#2D6A4F]">
              {kindLabels[p.kind] ?? p.kind}
            </span>
            <h3 className="mt-1.5 text-sm font-semibold text-[#16324F]">{p.name}</h3>
            {t(p.description) && (
              <p className="mt-1.5 text-sm leading-relaxed text-[#1F2933]/70">{t(p.description)}</p>
            )}
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-xs text-[#C65D3B] hover:underline">
                Visit website <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

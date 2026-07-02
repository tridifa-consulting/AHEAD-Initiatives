"use client";

import { useState } from "react";
import { FileText, ExternalLink } from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import { documentHref } from "@/lib/types";

const tabs: { key: string; label: string; categories: DocumentRow["category"][]; sub?: string }[] = [
  { key: "annual", label: "Annual Reports", categories: ["annual_report"] },
  { key: "fcra", label: "FCRA", categories: ["fcra_quarterly", "fcra_annual"] },
  { key: "mca", label: "MCA & IT", categories: ["mca_filing", "it_return"] },
  { key: "policy", label: "Policies", categories: ["policy"] },
  { key: "founding", label: "Founding Documents", categories: ["other"] },
];

/**
 * The transparency archive: every statutory document AHEAD files,
 * grouped the way a records shelf would be — by filing type, then year.
 */
export default function DocumentShelf({ items }: { items: DocumentRow[] }) {
  const [tab, setTab] = useState("annual");
  const current = tabs.find((x) => x.key === tab)!;
  const rows = items.filter((d) => current.categories.includes(d.category));

  return (
    <div>
      <div role="tablist" aria-label="Document type" className="mb-6 flex flex-wrap gap-1.5">
        {tabs.map((x) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={tab === x.key}
            onClick={() => setTab(x.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9B44C] ${
              tab === x.key
                ? "bg-[#FAF7F0] text-[#16324F]"
                : "bg-[#FAF7F0]/10 text-[#FAF7F0]/75 hover:bg-[#FAF7F0]/20"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-[#FAF7F0]/12 rounded-xl border border-[#FAF7F0]/15">
        {rows.map((d) => {
          const href = documentHref(d);
          return (
            <li key={d.id}>
              <a
                href={href ?? "#reports"}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener" : undefined}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#FAF7F0]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9B44C] sm:px-5"
              >
                <FileText aria-hidden className="h-4 w-4 shrink-0 text-[#E9B44C]" />
                <span className="min-w-0 flex-1 truncate text-sm text-[#FAF7F0]">{d.title}</span>
                {d.year && (
                  <span className="hidden shrink-0 text-xs text-[#FAF7F0]/55 sm:block">{d.year}</span>
                )}
                {d.source === "external" && (
                  <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#FAF7F0]/45" />
                )}
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-[#FAF7F0]/55">
        FCRA registration 147120965 · CIN U85300WB2009NPL134655 · Documents marked
        <ExternalLink aria-hidden className="mx-1 inline h-3 w-3" />
        open on AHEAD&apos;s records archive.
      </p>
    </div>
  );
}

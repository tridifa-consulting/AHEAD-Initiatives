"use client";

import { useMemo, useState } from "react";
import { Search, BookOpen, Download } from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import { documentHref } from "@/lib/types";

const shelves: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "english_publications", label: "English" },
  { key: "bengali_publications", label: "Bengali" },
  { key: "nabodisha", label: "Nabodisha Journal" },
  { key: "other_materials", label: "Field Reports" },
];

/** Searchable, filterable catalogue of AHEAD's published materials. */
export default function PublicationsExplorer({ items }: { items: DocumentRow[] }) {
  const [query, setQuery] = useState("");
  const [shelf, setShelf] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (d) =>
        (shelf === "all" || d.subcategory === shelf) &&
        (!q ||
          d.title.toLowerCase().includes(q) ||
          (d.description ?? "").toLowerCase().includes(q) ||
          (d.author ?? "").toLowerCase().includes(q))
    );
  }, [items, query, shelf]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search publications</span>
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#16324F]/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 82 published materials…"
            className="w-full rounded-lg border border-[#16324F]/15 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#C65D3B] focus:ring-1 focus:ring-[#C65D3B]"
          />
        </label>
        <div role="group" aria-label="Filter by collection" className="flex flex-wrap gap-1.5">
          {shelves.map((s) => (
            <button
              key={s.key}
              onClick={() => setShelf(s.key)}
              aria-pressed={shelf === s.key}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B] ${
                shelf === s.key
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-[#16324F]/5 text-[#16324F]/75 hover:bg-[#16324F]/10"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[#16324F]/20 p-8 text-center text-sm text-[#1F2933]/60">
          No publications match “{query}”. Try a different word, or clear the search.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((d) => {
            const href = documentHref(d);
            const inner = (
              <>
                <BookOpen aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#2D6A4F]" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-[#16324F]">{d.title}</span>
                  {(d.description || d.author) && (
                    <span className="mt-0.5 block truncate text-xs text-[#1F2933]/60">
                      {[d.author, d.description].filter(Boolean).join(" — ")}
                    </span>
                  )}
                </span>
                {href && <Download aria-hidden className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-[#C65D3B]" />}
              </>
            );
            const cls =
              "flex items-start gap-3 rounded-lg border border-[#16324F]/10 bg-white px-4 py-3";
            return (
              <li key={d.id}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener" className={`${cls} transition-shadow hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]`}>
                    {inner}
                  </a>
                ) : (
                  <div className={cls} title="Available in print — contact AHEAD">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-4 text-xs text-[#1F2933]/55">
        Titles without a download link are available in print from AHEAD&apos;s office.
      </p>
    </div>
  );
}

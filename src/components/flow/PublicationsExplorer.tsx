"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, BookOpen, Download, X } from "lucide-react";
import type { DocumentRow } from "@/lib/types";
import { documentHref } from "@/lib/types";

const shelves = [
  { key: "all",                 label: "All 82",        count: 0 },
  { key: "english_publications",label: "English",       count: 0 },
  { key: "bengali_publications", label: "Bengali",      count: 0 },
  { key: "nabodisha",           label: "Nabodisha",     count: 0 },
  { key: "other_materials",     label: "Field Reports", count: 0 },
];

export default function PublicationsExplorer({ items }: { items: DocumentRow[] }) {
  const [query, setQuery] = useState("");
  const [shelf, setShelf] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const counted = shelves.map((s) => ({
    ...s,
    count: s.key === "all" ? items.length : items.filter((d) => d.subcategory === s.key).length,
  }));

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
      {/* Search bar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#16324F]/35" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 82 published materials…"
            className="w-full rounded-xl border border-[#16324F]/12 bg-white py-3 pl-10 pr-9 text-sm outline-none transition-shadow focus:border-[#C65D3B]/60 focus:shadow-[0_0_0_3px_rgba(198,93,59,0.1)]"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#16324F]/40 hover:text-[#16324F]"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Collection chips */}
        <div role="group" aria-label="Filter by collection" className="flex flex-wrap gap-1.5">
          {counted.map((s) => (
            <motion.button
              key={s.key}
              onClick={() => setShelf(s.key)}
              aria-pressed={shelf === s.key}
              whileHover={reduced ? {} : { scale: 1.04 }}
              whileTap={reduced ? {} : { scale: 0.96 }}
              className="relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
              style={{ color: shelf === s.key ? "#FAF7F0" : "rgba(22,50,79,0.7)" }}
            >
              {shelf === s.key && (
                <motion.span layoutId="pub-chip" className="absolute inset-0 rounded-full bg-[#2D6A4F]"
                  transition={{ duration: 0.22, ease: [0.22,1,0.36,1] }} />
              )}
              <span className="relative">{s.label} <span className="opacity-60">({s.count})</span></span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="rounded-xl border border-dashed border-[#16324F]/15 p-10 text-center text-sm text-[#1F2933]/55"
          >
            No results for &ldquo;{query}&rdquo; — try a different word or clear the search.
          </motion.p>
        ) : (
          <motion.ul
            key={`${shelf}-${query}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid gap-2.5 sm:grid-cols-2"
          >
            {filtered.map((d, i) => {
              const href = documentHref(d);
              const inner = (
                <>
                  <BookOpen aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#2D6A4F]" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-[#16324F]">{d.title}</span>
                    {(d.description || d.author) && (
                      <span className="mt-0.5 block truncate text-xs text-[#1F2933]/55">
                        {[d.author, d.description].filter(Boolean).join(" — ")}
                      </span>
                    )}
                  </span>
                  {href
                    ? <Download aria-hidden className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-[#C65D3B]" />
                    : <span className="ml-auto mt-0.5 shrink-0 rounded-full bg-[#16324F]/6 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#1F2933]/50">In print</span>}
                </>
              );
              return (
                <motion.li
                  key={d.id}
                  initial={reduced ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i, 12) * 0.02, duration: 0.3 }}
                >
                  {href ? (
                    <a href={href} target="_blank" rel="noopener"
                      className="flex items-start gap-3 rounded-xl border border-[#16324F]/8 bg-white px-4 py-3 transition-shadow hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 rounded-xl border border-[#16324F]/8 bg-white px-4 py-3" title="Available in print from AHEAD">
                      {inner}
                    </div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <p className="mt-4 text-xs text-[#1F2933]/45">
        Titles without a download link are available in print from AHEAD&apos;s office.
      </p>
    </div>
  );
}

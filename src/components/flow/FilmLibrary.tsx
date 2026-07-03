"use client";

import { useState } from "react";
import { Clapperboard, Play } from "lucide-react";
import type { MediaRow } from "@/lib/types";
import { t } from "@/lib/types";
import Reveal from "./Reveal";

/**
 * AHEAD's own film archive — documentaries produced in the field, and the
 * "Learning for All" library of Bengali educational films for rural schools.
 */
export default function FilmLibrary({
  documentaries, learning,
}: { documentaries: MediaRow[]; learning: MediaRow[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? learning : learning.slice(0, 12);

  return (
    <div className="space-y-14">
      {documentaries.length > 0 && (
        <section aria-label="Documentaries">
          <h3 className="mb-1 font-serif text-lg font-semibold text-[#16324F]">
            Stories of Hope and Initiative
          </h3>
          <p className="mb-5 text-sm text-[#1F2933]/60">
            Documentaries filmed with the communities AHEAD works alongside.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documentaries.map((f, i) => (
              <Reveal key={f.id} delay={Math.min(i, 5) * 50}>
                <li className="h-full">
                  <a
                    href={f.url ?? "#media"}
                    target="_blank" rel="noopener"
                    className="group flex h-full flex-col rounded-xl border border-[#16324F]/10 bg-white p-5 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
                  >
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#16324F] text-[#E9B44C]">
                      <Play className="ml-0.5 h-4 w-4" />
                    </span>
                    <h4 className="font-serif text-base font-semibold text-[#16324F]">{f.title}</h4>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#1F2933]/70">{t(f.caption)}</p>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {learning.length > 0 && (
        <section aria-label="Learning for All film library">
          <h3 className="mb-1 font-serif text-lg font-semibold text-[#16324F]">
            Learning for All — {learning.length} films
          </h3>
          <p className="mb-5 text-sm text-[#1F2933]/60">
            Bengali films, dubs and animations produced or curated for rural schools:
            health, nutrition, trees, water, local self-government, and the classics.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {shown.map((f) => (
              <li key={f.id}>
                <a
                  href={f.url ?? "#media"} target="_blank" rel="noopener"
                  className="flex items-start gap-2.5 rounded-lg border border-[#16324F]/10 bg-white px-4 py-2.5 transition-colors hover:border-[#C65D3B]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
                >
                  <Clapperboard aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#C65D3B]" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-[#16324F]">{f.title}</span>
                    <span className="block truncate text-xs text-[#1F2933]/60">{t(f.caption)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {learning.length > 12 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-4 rounded-full border border-[#16324F]/15 px-4 py-2 text-sm font-medium text-[#16324F] hover:bg-[#16324F]/5"
            >
              {expanded ? "Show fewer films" : `Show all ${learning.length} films`}
            </button>
          )}
        </section>
      )}
    </div>
  );
}

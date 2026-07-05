"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import type { PersonRow } from "@/lib/types";
import { t } from "@/lib/types";

const groups: { key: PersonRow["group_name"]; label: string }[] = [
  { key: "board", label: "Board of Directors" },
  { key: "project_directors", label: "Project Directors" },
  { key: "field_team", label: "Core Field Team" },
  { key: "advisors", label: "Advisors" },
];

function Portrait({ src, name, size = "md" }: { src?: string; name: string; size?: "md" | "lg" }) {
  const cls = size === "lg" ? "h-20 w-20 text-xl" : "h-12 w-12 text-sm";
  if (!src) {
    return (
      <span aria-hidden className={`flex ${cls} shrink-0 items-center justify-center rounded-full bg-[#16324F]/8 font-serif font-semibold text-[#16324F]/55`}>
        {name.replace(/\(.*?\)/g, "").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("")}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" width={size === "lg" ? 80 : 48} height={size === "lg" ? 80 : 48} className={`${cls} shrink-0 rounded-full object-cover`} />;
}

/**
 * Governance & team. Cards are visible by DEFAULT (opacity-1); motion is a
 * gentle enhancement layered on top via `whileInView` with amount:0 so it can
 * never leave a card stuck invisible — the bug seen when a long list sits below
 * the fold and the observer never reports intersection.
 */
export default function PeopleGrid({
  people, portraits,
}: { people: PersonRow[]; portraits: Record<string, string> }) {
  const reduced = useReducedMotion();
  const founder = people.find((p) => p.group_name === "founder");

  const enter = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0 as const, margin: "0px 0px 15% 0px" },
      };

  return (
    <div className="space-y-14">
      {founder && (
        <motion.figure
          {...enter}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-5 rounded-2xl border border-[#E9B44C]/40 bg-[#16324F] p-6 text-[#FAF7F0] sm:p-7"
        >
          {portraits[founder.photo_media_id ?? ""] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={portraits[founder.photo_media_id!]} alt={`Portrait of ${founder.name}`} loading="lazy" width={80} height={80}
              className="h-20 w-20 shrink-0 rounded-full border-2 border-[#E9B44C]/60 object-cover" />
          ) : (
            <Portrait name={founder.name} size="lg" />
          )}
          <figcaption>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E9B44C]">Our Founder &amp; Inspirer</div>
            <div className="mt-1 font-serif text-xl font-semibold sm:text-2xl">{founder.name}</div>
            <div className="mt-0.5 text-sm text-[#FAF7F0]/70">{founder.role}</div>
          </figcaption>
        </motion.figure>
      )}

      {groups.map((g) => {
        const members = people.filter((p) => p.group_name === g.key);
        if (members.length === 0) return null;
        return (
          <div key={g.key}>
            <h3 className="mb-5 font-serif text-lg font-semibold text-[#16324F]">
              {g.label} <span className="ml-1 text-sm font-normal text-[#1F2933]/45">{members.length}</span>
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((p, i) => (
                <motion.li
                  key={p.id}
                  {...enter}
                  transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full items-start gap-3.5 rounded-xl border border-[#16324F]/10 bg-white px-4 py-3.5 transition-shadow hover:shadow-sm"
                >
                  <Portrait src={portraits[p.photo_media_id ?? ""]} name={p.name} />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#16324F]">{p.name}</span>
                    {p.role && <span className="mt-0.5 block text-xs leading-relaxed text-[#1F2933]/65">{p.role}</span>}
                    {t(p.bio) && <span className="mt-1 block text-xs text-[#1F2933]/55">{t(p.bio)}</span>}
                    {p.email && (
                      <a href={`mailto:${p.email}`} className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#2D6A4F] hover:underline">
                        <Mail className="h-3 w-3" /> <span className="truncate">{p.email}</span>
                      </a>
                    )}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

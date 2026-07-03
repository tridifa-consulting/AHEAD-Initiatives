import { Mail } from "lucide-react";
import type { PersonRow } from "@/lib/types";
import { t } from "@/lib/types";
import Reveal from "./Reveal";

const groups: { key: PersonRow["group_name"]; label: string }[] = [
  { key: "board", label: "Board of Directors" },
  { key: "project_directors", label: "Project Directors" },
  { key: "field_team", label: "Core Field Team" },
  { key: "advisors", label: "Advisors" },
];

function Portrait({ src, name }: { src?: string; name: string }) {
  if (!src) {
    return (
      <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16324F]/8 font-serif text-sm font-semibold text-[#16324F]/60">
        {name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
      </span>
    );
  }
  // legacy-hosted portraits are plain JPEGs; a native img keeps them simple
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover" />;
}

/**
 * Governance and team, with portraits. Emails render only for people
 * who have opted in. The founder is remembered first.
 */
export default function PeopleGrid({
  people, portraits,
}: { people: PersonRow[]; portraits: Record<string, string> }) {
  const founder = people.find((p) => p.group_name === "founder");

  return (
    <div className="space-y-12">
      {founder && (
        <Reveal>
          <figure className="flex items-center gap-5 rounded-xl border border-[#E9B44C]/40 bg-[#16324F] p-6 text-[#FAF7F0]">
            {portraits[founder.photo_media_id ?? ""] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portraits[founder.photo_media_id!]} alt={`Portrait of ${founder.name}`} loading="lazy"
                className="h-20 w-20 shrink-0 rounded-full border-2 border-[#E9B44C]/60 object-cover" />
            ) : null}
            <figcaption>
              <div className="text-xs uppercase tracking-[0.2em] text-[#E9B44C]">Our Founder &amp; Inspirer</div>
              <div className="mt-1 font-serif text-xl font-semibold">{founder.name}</div>
              <div className="mt-0.5 text-sm text-[#FAF7F0]/70">{founder.role}</div>
            </figcaption>
          </figure>
        </Reveal>
      )}

      {groups.map((g) => {
        const members = people.filter((p) => p.group_name === g.key);
        if (members.length === 0) return null;
        return (
          <div key={g.key}>
            <h3 className="mb-5 font-serif text-lg font-semibold text-[#16324F]">{g.label}</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 40}>
                  <li className="flex h-full items-start gap-3.5 rounded-lg border border-[#16324F]/10 bg-white px-4 py-3.5">
                    <Portrait src={portraits[p.photo_media_id ?? ""]} name={p.name} />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[#16324F]">{p.name}</span>
                      {p.role && <span className="mt-0.5 block text-xs leading-relaxed text-[#1F2933]/65">{p.role}</span>}
                      {t(p.bio) && <span className="mt-1 block text-xs text-[#1F2933]/55">{t(p.bio)}</span>}
                      {p.email && (
                        <a href={`mailto:${p.email}`} className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#2D6A4F] hover:underline">
                          <Mail className="h-3 w-3" /> {p.email}
                        </a>
                      )}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

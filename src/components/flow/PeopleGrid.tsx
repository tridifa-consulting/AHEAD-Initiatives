import { Mail } from "lucide-react";
import type { PersonRow } from "@/lib/types";
import Reveal from "./Reveal";

const groups: { key: PersonRow["group_name"]; label: string }[] = [
  { key: "board", label: "Board of Directors" },
  { key: "project_directors", label: "Project Directors" },
  { key: "field_team", label: "Core Field Team" },
];

/** Governance and team. Emails render only for people who opted in. */
export default function PeopleGrid({ people }: { people: PersonRow[] }) {
  return (
    <div className="space-y-12">
      {groups.map((g) => {
        const members = people.filter((p) => p.group_name === g.key);
        if (members.length === 0) return null;
        return (
          <div key={g.key}>
            <h3 className="mb-5 font-serif text-lg font-semibold text-[#16324F]">{g.label}</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 40}>
                  <li className="h-full rounded-lg border border-[#16324F]/10 bg-white px-4 py-3.5">
                    <div className="text-sm font-medium text-[#16324F]">{p.name}</div>
                    {p.role && <div className="mt-0.5 text-xs leading-relaxed text-[#1F2933]/65">{p.role}</div>}
                    {p.email && (
                      <a
                        href={`mailto:${p.email}`}
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#2D6A4F] hover:underline"
                      >
                        <Mail className="h-3 w-3" /> {p.email}
                      </a>
                    )}
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

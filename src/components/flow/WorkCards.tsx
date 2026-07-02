import Link from "next/link";
import { Wheat, GraduationCap, Palette, Sparkles, Landmark, ArrowRight } from "lucide-react";
import type { SiteSection } from "@/lib/types";
import { t } from "@/lib/types";
import Reveal from "./Reveal";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat, GraduationCap, Palette, Sparkles, Landmark,
};

/** The five areas of work, rendered from work-* child sections. */
export default function WorkCards({ areas }: { areas: SiteSection[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((a, i) => {
        const extra = a.extra as { icon?: string; color?: string; legacy_href?: string };
        const Icon = icons[extra.icon ?? ""] ?? Wheat;
        const href = extra.legacy_href ?? "#work";
        return (
          <Reveal key={a.id} delay={i * 60}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-xl border border-[#16324F]/10 bg-white p-6 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C65D3B]"
            >
              <span
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: extra.color ?? "#2D6A4F" }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#16324F]">{t(a.title)}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1F2933]/75">{t(a.body)}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#C65D3B]">
                Read the full story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

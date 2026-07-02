import Chapter from "@/components/flow/Chapter";
import ChapterNav, { type Chapter as NavChapter } from "@/components/flow/ChapterNav";
import ContactBlock from "@/components/flow/ContactBlock";
import DocumentShelf from "@/components/flow/DocumentShelf";
import Hero from "@/components/flow/Hero";
import NoticeBanner from "@/components/flow/NoticeBanner";
import PeopleGrid from "@/components/flow/PeopleGrid";
import Prose from "@/components/flow/Prose";
import PublicationsExplorer from "@/components/flow/PublicationsExplorer";
import Reveal from "@/components/flow/Reveal";
import WorkCards from "@/components/flow/WorkCards";
import {
  getActiveNotices, getDocuments, getMedia, getPeople, getSections, getSettings,
} from "@/lib/content";
import { t } from "@/lib/types";

/**
 * The single-flow site. Every chapter renders from the database;
 * RLS hides draft chapters from anonymous readers, so unfinished
 * sections (field stories, blog, media, social, partners) simply
 * do not appear until AHEAD publishes them from the admin panel.
 * ISR keeps the page static; admin publish actions will call
 * revalidatePath("/") for near-instant updates (Phase 3).
 */
export const revalidate = 300;

const navLabels: Record<string, string> = {
  story: "Story",
  philosophy: "Philosophy",
  work: "Work",
  field: "Field Stories",
  publications: "Publications",
  blog: "Updates",
  media: "Media",
  social: "Social",
  reports: "Reports",
  partners: "Partners",
  contact: "Contact",
};

export default async function Home() {
  const [sections, documents, people, heroSlides, notices, settings] = await Promise.all([
    getSections(), getDocuments(), getPeople(), getMedia("hero"), getActiveNotices(), getSettings(),
  ]);

  const bySlug = Object.fromEntries(sections.map((s) => [s.slug, s]));
  const workAreas = sections.filter((s) => s.parent_slug === "work");
  const publications = documents.filter((d) => d.category === "publication");
  const transparency = documents.filter((d) => d.category !== "publication");
  const hero = bySlug["hero"];
  const heroStats = ((hero?.extra?.stats as { value: string; label: string }[]) ?? []);
  const registration = (bySlug["story"]?.extra?.registration ?? {}) as Record<string, string>;

  const chapterOrder = ["story", "philosophy", "work", "field", "publications", "blog", "media", "social", "reports", "partners", "contact"];
  const present = chapterOrder.filter((slug) => bySlug[slug]);
  const chapters: NavChapter[] = present.map((slug) => ({ slug, label: navLabels[slug] ?? slug }));
  const num = (slug: string) => present.indexOf(slug) + 1;

  return (
    <>
      <NoticeBanner notices={notices} />
      <ChapterNav chapters={chapters} />

      {hero && (
        <Hero
          title={t(hero.title)}
          subtitle={t(hero.subtitle)}
          stats={heroStats}
          slides={heroSlides}
        />
      )}

      {bySlug["story"] && (
        <Chapter slug="story" number={num("story")} title={t(bySlug["story"].title)} subtitle={t(bySlug["story"].subtitle)}>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <Reveal>
              <Prose text={t(bySlug["story"].body)} className="max-w-3xl text-[#1F2933]/85" />
            </Reveal>
            <Reveal delay={100}>
              <dl className="h-fit rounded-xl border border-[#16324F]/10 bg-white p-6 text-sm">
                <div className="pb-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">Registered</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.registered}</dd>
                </div>
                <div className="border-t border-[#16324F]/10 py-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">CIN</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.cin}</dd>
                </div>
                <div className="border-t border-[#16324F]/10 py-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">MCA licence</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.licence}</dd>
                </div>
                <div className="border-t border-[#16324F]/10 pt-3">
                  <dt className="text-xs uppercase tracking-wider text-[#1F2933]/50">FCRA registration</dt>
                  <dd className="mt-0.5 font-medium text-[#16324F]">{registration.fcra}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Chapter>
      )}

      {bySlug["philosophy"] && (
        <Chapter slug="philosophy" number={num("philosophy")} title={t(bySlug["philosophy"].title)} tone="white">
          <Reveal>
            <Prose text={t(bySlug["philosophy"].body)} className="max-w-3xl text-[#1F2933]/85" />
          </Reveal>
        </Chapter>
      )}

      {bySlug["work"] && (
        <Chapter slug="work" number={num("work")} title={t(bySlug["work"].title)} subtitle={t(bySlug["work"].subtitle)}>
          <WorkCards areas={workAreas} />
        </Chapter>
      )}

      {bySlug["publications"] && (
        <Chapter slug="publications" number={num("publications")} title={t(bySlug["publications"].title)} subtitle={`${publications.length} published materials across four collections`} tone="white">
          <PublicationsExplorer items={publications} />
        </Chapter>
      )}

      {bySlug["reports"] && (
        <Chapter slug="reports" number={num("reports")} title={t(bySlug["reports"].title)} subtitle={t(bySlug["reports"].subtitle)} tone="ink">
          <DocumentShelf items={transparency} />
        </Chapter>
      )}

      {bySlug["contact"] && (
        <Chapter slug="contact" number={num("contact")} title={t(bySlug["contact"].title)}>
          <div className="space-y-14">
            <ContactBlock
              org={(settings.org ?? {}) as Record<string, string>}
              channels={(settings.channels ?? {}) as Record<string, string>}
            />
            <PeopleGrid people={people} />
          </div>
        </Chapter>
      )}
    </>
  );
}

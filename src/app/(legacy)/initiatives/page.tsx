"use client";

import React, { useEffect, useState } from "react";
import {
  Wheat,
  GraduationCap,
  Palette,
  Sparkles,
  Landmark,
  ChevronDown,
  ArrowUp,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import ChapterNav, {
  type Chapter as NavChapter,
} from "@/components/flow/ChapterNav";

/* ───────────────────────── Design Tokens ───────────────────────── */
const COLOR = {
  primary: "#064E7A",
  secondary: "#0891B2",
  accent: "#B96543",
  gold: "#D8A441",
  aqua: "#67E8F9",
  cream: "#FFF8EA",
  paper: "#FFFDF8",
  bg: "#ffffff",
  bgAlt: "#FFF8EA",
  text: "#243841",
  textLight: "#526B75",
} as const;

/* ───────────────────────── Global Navigation ────────────────────── */
/**
 * The initiatives route is a child experience of the homepage Work chapter.
 *
 * The five initiative sections remain addressable through:
 *   /initiatives#hunger
 *   /initiatives#education
 *   /initiatives#culture
 *   /initiatives#srijangan
 *   /initiatives#strategy
 *
 * They are intentionally NOT exposed as top-level ChapterNav items.
 * The global AHEAD navigation stays consistent, with Work highlighted.
 */
const globalChapters: NavChapter[] = [
  { slug: "story", label: "Story", href: "/#story" },
  { slug: "philosophy", label: "Philosophy", href: "/#philosophy" },
  { slug: "work", label: "Work", href: "/#work" },
  { slug: "field", label: "Field Stories", href: "/#field" },
  { slug: "publications", label: "Publications", href: "/#publications" },
  { slug: "media", label: "Media", href: "/#media" },
  { slug: "reports", label: "Reports", href: "/#reports" },
  { slug: "partners", label: "Partners", href: "/#partners" },
  { slug: "contact", label: "Contact", href: "/#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ───────────────────────── Reusable Components ──────────────────── */

function SectionHeading({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div
        aria-hidden
        className="mb-5 flex items-center gap-3"
      >
        <span className="h-px w-12 bg-[#0891B2]/55" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[#D8A441]" />
        <span className="h-px w-20 bg-gradient-to-r from-[#D8A441]/35 to-transparent" />
      </div>

      <div className="flex items-start gap-4 sm:gap-5">
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0891B2]/18 bg-[#EAFBFD] text-[#064E7A] shadow-[0_6px_18px_rgba(6,78,122,0.07)]">
          {icon}
        </span>

        <h2 className="max-w-4xl font-serif text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#064E7A] sm:text-[2.55rem] lg:text-[3rem]">
          {children}
        </h2>
      </div>
    </div>
  );
}

function SubHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 mb-6">
      <div
        aria-hidden
        className="mb-3 h-[2px] w-10 bg-gradient-to-r from-[#B96543] to-[#D8A441]"
      />

      <h3 className="max-w-4xl font-serif text-[1.35rem] font-bold leading-[1.35] tracking-[-0.02em] text-[#064E7A] sm:text-[1.6rem]">
        {children}
      </h3>
    </div>
  );
}

function Paragraph({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mb-0 text-[0.96rem] font-medium leading-[1.9] text-[#344F59] sm:text-[1.02rem]">
      {children}
    </p>
  );
}

function AccentCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.55rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-7 shadow-[0_12px_38px_rgba(6,78,122,0.055)] sm:p-8">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#0891B2] via-[#67E8F9] to-[#D8A441]"
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      className="my-12 flex items-center gap-4"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#064E7A]/12" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#D8A441]" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#064E7A]/12" />
    </div>
  );
}

/* ───────────────────────── Back‑to‑top Button ───────────────────── */

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reduced ? "auto" : "smooth",
        })
      }
      initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={reduced ? {} : { y: -2 }}
      aria-label="Back to top"
      className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#67E8F9]/25 bg-[#064E7A]/95 text-[#FFF8EA] shadow-[0_12px_34px_rgba(6,78,122,0.24)] backdrop-blur-md transition-colors hover:bg-[#075985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#67E8F9] sm:bottom-8 sm:right-8"
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function InitiativesPage() {
  const reduced = useReducedMotion();

  return (
    <main className="bg-[#FFF8EA] antialiased">
      {/* ════════════════════ CHAPTER NAVIGATION ════════════════════ */}
      <ChapterNav
        chapters={globalChapters}
        activeSlug="work"
      />

      {/* ════════════════════ HERO BANNER ════════════════════ */}
      <section
        id="top"
        className="relative isolate overflow-hidden bg-[#053B5E]"
      >
        {/* Deep institutional background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(103,232,249,0.14),transparent_24rem),radial-gradient(circle_at_8%_100%,rgba(216,164,65,0.10),transparent_24rem),linear-gradient(135deg,#053B5E_0%,#064E7A_52%,#073B56_100%)]"
        />

        {/* Quiet archival grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Fine manuscript rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#67E8F9] via-[#0891B2] to-[#D8A441]"
        />

        <div className="relative z-10 mx-auto flex min-h-[64svh] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="max-w-5xl">
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease,
              }}
              className="mb-6 flex items-center gap-3"
              aria-hidden
            >
              <span className="h-px w-10 bg-[#67E8F9]/80" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#D8A441]" />
            </motion.div>

            <motion.h1
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease,
              }}
              className="max-w-4xl font-serif text-[3.25rem] font-bold leading-[0.98] tracking-[-0.055em] text-[#FFF8EA] sm:text-[4.4rem] lg:text-[5.7rem]"
            >
              Our Initiatives
            </motion.h1>

            <motion.p
              initial={reduced ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.62,
                delay: 0.2,
                ease,
              }}
              className="mt-7 max-w-3xl text-[1rem] font-medium leading-[1.85] text-white/76 sm:text-[1.14rem]"
            >
              Addressing hunger, transforming education, and preserving culture
              through local self-governance.
            </motion.p>

            <motion.a
              href="#hunger"
              aria-label="Continue to Addressing Hunger"
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.42,
              }}
              className="mt-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-[#B9F6FF] transition-colors hover:border-[#67E8F9]/45 hover:bg-[#67E8F9]/10"
            >
              <motion.span
                animate={reduced ? {} : { y: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ════════════════════ SECTION 2 — HUNGER ════════════════════ */}
      <section id="hunger" className="relative overflow-hidden bg-[#FFF8EA] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={<Wheat className="w-6 h-6" />}>
            Addressing Hunger
          </SectionHeading>

          <div className="mb-10 grid gap-6 lg:grid-cols-2">
            <AccentCard>
              <Paragraph>
                Inspite of the economic growth that India has witnessed, Eastern
                India still has more than 30% of its population below a poverty
                line which is starkly defined as sufficient expenditure for the
                basic required calorie intake ! The grim picture was first
                brought to light by the National Rural Household Survey of 2005
                (RHS), which nationally exposed the depth of food insecurity in
                rural areas. Over 70% of the population of Eastern India lives
                in its rural areas which is largely dependant on mono-cropped
                rainfed agriculture. Its backward districts are also home to a
                large proportion of minorities including tribal groups and ethnic
                minorities whose eroding culture was once a resource to combat
                marginalisation and food insecurity.
              </Paragraph>
            </AccentCard>
            <AccentCard>
              <Paragraph>
                In India, the government has recognised food security as one of
                the most urgent items on the national agenda. Recent trends have
                focussed on palliatives such as the Food Security Act to address
                the alarming situation of absolute hunger among the poorest,
                apart from the more widespread food and nutritional insecurity.
                However, Ahead Initiatives firmly believes in the old adage that
                it is better to teach a man how to fish than to give him a fish.
              </Paragraph>
            </AccentCard>
          </div>

          <Divider />

          <SubHeading>
            Addressing Hunger Empowerment And Development
          </SubHeading>

          <div
            className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
            style={{
              borderColor: COLOR.secondary,
              backgroundColor: COLOR.bgAlt,
            }}
          >
            <Paragraph>
              The mainstay of Ahead Initiatives&apos; field activities is
              addressing hunger. However, our strategy advocates a Local Self
              Governance Approach to sustainable and decentralized Natural
              Resource Management as the principal means of addressing hunger and
              thereby food, nutrition and livelihood insecurity
            </Paragraph>
          </div>
        </div>
      </section>

      {/* ════════════════════ SECTION 3 — EDUCATION ════════════════════ */}
      <section
        id="education"
        className="relative overflow-hidden bg-white py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={<GraduationCap className="w-6 h-6" />}>
            Education Initiative
          </SectionHeading>

          {/* First two paragraphs side by side on large screens */}
          <div className="mb-10 grid gap-6 lg:grid-cols-2">
            <AccentCard>
              <Paragraph>
                Over the two to three decades that many at Ahead have been
                involved with rural development in West Bengal, it has become
                apparent that the education provided in rural schools, which
                include the children of the poorest families, is urban-centric,
                highly inappropriate to the educational needs of the children and
                far removed from the local socio-cultural setting of their
                communities. The other more insidious problem is the attitudinal
                change which the present educational system inculcates, where a
                multitude of, diverse cultures are fast eroding and being
                replaced by a &lsquo;better&rsquo; urban culture and consumer
                driven economy the sustainability of which intellectuals
                worldwide are now beginning to question
              </Paragraph>
            </AccentCard>
            <AccentCard>
              <Paragraph>
                It could be argued that local indigenous knowledge, values and
                &lsquo;agri&rsquo; - culture are the very obstacles to
                &lsquo;development&rsquo; that education aims to replace so as
                to provide an opportunity to the poor to benefit from the higher
                standards of living afforded by urbanised modern industrial
                society. However, even if that were true, the present stark
                reality is that of a growing number of frustrated youth,
                including the very poor, who neither have the vocation skills to
                address their livelihood issues in the rural context nor life
                skills such as participative democratic processes, which are so
                necessary to combat marginalisation, impoverishment and poverty
                for improved health, nutrition, etc.
              </Paragraph>
            </AccentCard>
          </div>

          <AccentCard>
            <Paragraph>
              This leads to the unusual development paradox that &lsquo;capacity
              building&rsquo; on local self governance, health, nutrition,
              sanitation and natural resource management is still seen as the
              critical need for even those who have been through compulsory
              education till Class 8. Many of these necessary life skills need to
              be part of their education. This includes local indigenous
              knowledge because of a breakdown in its traditional transmission
              mechanisms.
            </Paragraph>
          </AccentCard>

          <Divider />

          <SubHeading>
            A Local Self Governance Approach to supplementing rural education
            with contextual appropriate localised input
          </SubHeading>

          <div className="space-y-6">
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.secondary,
                backgroundColor: '#ffffff',
              }}
            >
              <Paragraph>
                One of the principal causes of the above situation is the
                cultural divide between Urban and Rural segments, including the
                fact that the uniform content of education is determined by the
                Central and State Governments primarily for an urban setting.
                Local Self Government, in spite of constitutional amendments, are
                yet to play a role in even managing the education sector, let
                alone determine part of its content. This prevents content shaped
                by an understanding of local conditions and perceived local
                needs, supplemented with local indigenous knowledge which thereby
                helps to preserve the latter.
              </Paragraph>
            </div>

            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.secondary,
                backgroundColor: '#ffffff',
              }}
            >
              <Paragraph>
                The National Curriculum Framework (2005) and even the National
                Knowledge Commission report on School Education (2008) has
                recognised the mismatch and advocated change, including the use
                of community resource persons and the proactive role of local
                government. However, much of it will remain just lip service
                without exemplary initiatives with mainstream rural schools to
                demonstrate how changes may be wrought through a Local Self
                Governance Approach to supplementing rural education with
                contextual appropriate localised input.
              </Paragraph>
            </div>

            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.accent,
                backgroundColor: '#ffffff',
              }}
            >
              <Paragraph>
                It is with this in mind that Ahead Initiatives has floated a
                platform for rural teachers which includes a vernacular
                newsletter &lsquo;Nabodisha&rsquo; and a web portal
                (www.nabodisha.in) of the same name for sharing experiences and
                to promote peer learning in this regard. It has also in
                partnership with 25 Gram Panchayats (LSGIs) launched a practical
                grassroot field initiative with schools of their area to learn
                what is pragmatically possible in contextualising rural education
                with localised input
              </Paragraph>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ SECTION 4 — CULTURE ════════════════════ */}
      <section id="culture" className="relative overflow-hidden bg-[#FFF8EA] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={<Palette className="w-6 h-6" />}>
            Culture and Development
          </SectionHeading>

          <div className="mb-10 grid gap-6 lg:grid-cols-3">
            <AccentCard>
              <Paragraph>
                Culture has been said to be an indivisible part of development
                when understood not simply in terms of economic growth, but also
                as a means of achieving a satisfactory intellectual, emotional,
                moral and spiritual existence. Culture is thus acknowledged as
                intrinsic to sustainable human development because it is our
                cultural values which determine our goals and our sense of
                fulfilment
              </Paragraph>
            </AccentCard>
            <AccentCard>
              <Paragraph>
                It is no doubt true that it is through culture that we build
                identity, that essential component of humanity and community and
                whereby we communicate our ideas, feelings and insights. Culture
                allows us to learn and develop as people. Its role is so
                fundamental that it is inevitably the starting point in a more
                broad based sustainable development paradigm which has been
                defined as that set of capacities that allows groups, communities
                and nations to define their futures in an integrated manner.
                Development processes which fail to recognise this, struggle to
                produce lasting improvements in people&apos;s lives
              </Paragraph>
            </AccentCard>
            <AccentCard>
              <Paragraph>
                Culture is thus far more than entertainment &amp; the performing
                arts. It represents a cumulative body of knowledge, know-how,
                practices and representations. These sophisticated sets of
                understandings, interpretations and meanings are part and parcel
                of a cultural complex that encompasses language, naming and
                classification systems, resource use practices, ritual,
                spirituality and worldview
              </Paragraph>
            </AccentCard>
          </div>

          <Divider />

          <SubHeading>School Engagement Programme</SubHeading>

          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.secondary,
                backgroundColor: COLOR.bgAlt,
              }}
            >
              <Paragraph>
                In spite of Cultural Activities being one of the 29 subjects
                entrusted to local self government by the Constitution in its
                Eleventh Schedule, most local government institutions are unaware
                of their responsibilities in this regard. Thus Ahead Initiatives
                hopes to work with Gram Panchayats and Panchayat Samitis (Local
                Self Government Institutions) so as to engage schools to fill
                the vacuum that exists in this regard in formal education.
              </Paragraph>
            </div>
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.secondary,
                backgroundColor: COLOR.bgAlt,
              }}
            >
              <Paragraph>
                This focus is the outcome of our understanding that the
                collective creative capacity of our children holds the key to how
                humanity&apos;s future unfolds. It is thus important to focus on
                the young in our efforts to examine anew the cultural basis of
                our development paradigm and explore development pathways which
                are not only sustainable but also include those non tangible
                elements of development and progress which are normative in
                nature. Children&apos;s attitudes and lifestyles, their
                responsiveness to educational programmes, their growing sense of
                ownership of the drive to preserve a decent future for ensuing
                generations, are all intimately linked to their own cultural
                identities and values, and no worldwide commitment to sustainable
                development will get anywhere without that recognition.
              </Paragraph>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ SECTION 5 — SRIJANGAN ════════════════════ */}
      <section
        id="srijangan"
        className="relative overflow-hidden bg-white py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={<Sparkles className="w-6 h-6" />}>
            &lsquo;Srijangan&rsquo; — An Open Creative Learning Space for All
          </SectionHeading>

          <div className="space-y-6">
            <AccentCard>
              <Paragraph>
                Ahead Initiatives strives to support communities and in
                particular the marginalized of the rural milieu to build on
                their capacity to use their cultural heritage and local and
                indigenous knowledge as a key resource for empowering themselves.
                This will not only help them to combat marginalization, poverty
                and impoverishment but also help them to pursue sustainable
                development pathways and strengthen their own cultural identities
                and values through renewal and innovation.
              </Paragraph>
            </AccentCard>

            <AccentCard>
              <Paragraph>
                Towards this end there is a need to promote and nurture creative
                initiatives of people of all ages through lifelong learning and
                education not only to better their lives materially and
                otherwise, but foster well being and &lsquo;happiness&rsquo;.
                Given eroding traditional structures and mechanisms there is a
                strong need for easy accessible skilling &amp; learning
                opportunities, including creative pursuits in artistic expression
                and the performing arts. The latter being acknowledged as the
                medium of communication whereby we understand our experiences,
                ideas, feelings and insights and build identity, that essential
                component of humanity and community which allows us to learn and
                develop as people
              </Paragraph>
            </AccentCard>

            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 bg-[#FFFDF8] p-7 shadow-[0_12px_36px_rgba(6,78,122,0.06)] md:p-9"
              style={{ borderColor: COLOR.accent }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-1 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: COLOR.accent }}
                >
                  <Sparkles className="w-4 h-4" />
                </span>
                <Paragraph>
                  In this context Ahead Initiatives has launched a
                  &lsquo;SRIJANGAN&rsquo; initiative to transform the
                  neighbourhood primary school after school hours into a creative
                  learning space for lifelong learning for all ages. Its
                  distinguishing features are its easy accessibility and short
                  term modular late afternoon approach which endears it to the
                  home bound poor&apos;s continuous struggle with their
                  multipronged livelihood strategy apart from being pre-occupied
                  as they often are during the day providing wage labour
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ SECTION 6 — STRATEGY ════════════════════ */}
      <section id="strategy" className="relative overflow-hidden bg-[#FFF8EA] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={<Landmark className="w-6 h-6" />}>
            A Strategy of Strengthening Local Self Governance
          </SectionHeading>

          <div className="mb-10 grid gap-6 md:grid-cols-2">
            <AccentCard>
              <Paragraph>
                Our activities are based on the fundamental strategy of
                strengthening Local Self-Government to become inclusive,
                participatory, just and efficient institutions of the people,
                which address food &amp; livelihood security, health, education
                and other primary entitlements.
              </Paragraph>
            </AccentCard>
            <AccentCard>
              <Paragraph>
                We therefore strive to advocate necessary changes in society and
                governance so that powers, responsibilities and functions move
                outwards from the community only on the basis of necessity and
                subsidiarity, through concentric tiers of governance, from the
                local through the state to the national and global.
              </Paragraph>
            </AccentCard>
          </div>

          <Divider />

          {/* ── CSO - Panchayat Partnerships ── */}
          <SubHeading>CSO - Panchayat Partnerships</SubHeading>

          <div className="mb-10 space-y-6">
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.secondary,
                backgroundColor: COLOR.bgAlt,
              }}
            >
              <Paragraph>
                In this context the recent past has seen the emergence of
                Panchayati Raj Institutions being more vigorously promoted as the
                principal proactive stakeholders in poverty alleviation and rural
                development processes as had been enshrined by the 73rd Amendment
                of India&apos;s constitution. Panchayats (local self government
                institutions) have been entrusted with the responsibility to
                implement various development programmes for which they are still
                ill equipped in terms of experience, capacity or resources for
                critical gaps. Though a far cry from the vision expounded above
                they provide a starting point on which future generations will
                have to build
              </Paragraph>
            </div>

            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.secondary,
                backgroundColor: COLOR.bgAlt,
              }}
            >
              <Paragraph>
                On the other hand we would do well to remember that NGOs whose
                role ideally should be temporary and catalytic in nature to
                provide support in strengthening mainstream participatory
                democratic processes often evolve into externally funded centres
                of power. Apart from their lack of accountability and
                transparency, they more often than not undermine grass root
                democratically elected people&apos;s institutions by bypassing
                them and often usurp their decision making authority. Experience
                has also shown that the efforts of NGOs where not embedded in
                mainstream institutions and processes are of little lasting value
                and in the long run unsustainable.
              </Paragraph>
            </div>
          </div>

          <Divider />

          {/* ── LSG Approach ── */}
          <SubHeading>
            Local Self Governance Approach as a development strategy for NGOs
          </SubHeading>

          <div className="mb-10 grid gap-6 md:grid-cols-2">
            <AccentCard>
              <Paragraph>
                Ahead Initiatives believes that a local self governance approach
                is not only a more sustainable development strategy, but one that
                will strengthen local self government through supportive
                partnerships
              </Paragraph>
            </AccentCard>
            <AccentCard>
              <Paragraph>
                Ahead aims to support and foster such CSO - Panchayat
                Partnerships, which also need to be formulated in the context of
                the vast number of flagship programmes and concomitant, albeit
                schematic funds flowing to Gram Panchayats, where there is a
                lack of capacity within the GP and more so among the poor to
                participate in the institutions and processes of local self
                governance so as to benefit from these mainstream resources.
              </Paragraph>
            </AccentCard>
          </div>

          <Divider />

          {/* ── CSR ── */}
          <SubHeading>Facilitating Corporate Social Responsibility</SubHeading>
          <SubHeading>
            Corporate - Local Self Government Partnerships
          </SubHeading>

          <div className="mb-10 grid gap-6 md:grid-cols-2">
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.accent,
                backgroundColor: COLOR.bgAlt,
              }}
            >
              <Paragraph>
                Corporate Social Responsibilty (CSR) in developed countries has
                emphasised the need for environmental sensibilities, business
                ethics and social issues which infringe on business processes. In
                India though, the government has called on the corporate sector
                to &ldquo;share the burden&rdquo; in the wider context of rural
                development to address poverty alleviation.
              </Paragraph>
            </div>
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-[#064E7A]/10 p-7 shadow-[0_10px_32px_rgba(6,78,122,0.045)] md:p-9"
              style={{
                borderColor: COLOR.accent,
                backgroundColor: COLOR.bgAlt,
              }}
            >
              <Paragraph>
                However, given the central role that Gram Panchayats (Local Self
                Government) need to assume as an institution of the people, it
                can be argued that Corporate Social Responsibility initiatives in
                rural development to alleviate poverty need to be done in
                partnership with institutions of local self governance, namely
                Gram Panchayats if they are to be sustainably integrated into the
                fabric of the local community. This requires the facilitation of
                NGOs who have the requisite local knowledge
              </Paragraph>
            </div>
          </div>

          <Divider />

          {/* ── Tripartite Strategy ── */}
          <SubHeading>Strategy of a tripartite partnership</SubHeading>

          <div
            className="mb-6 rounded-[1.5rem] border border-[#064E7A]/14 bg-[#EAFBFD]/55 p-7 text-center shadow-[0_10px_30px_rgba(6,78,122,0.05)] md:p-9"
            style={{
              borderColor: COLOR.primary,
              backgroundColor: `${COLOR.primary}08`,
            }}
          >
            <p
              className="font-serif text-lg font-bold leading-relaxed md:text-xl"
              style={{ color: COLOR.primary }}
            >
              Corporate — LSGI (Panchayati Raj Institution) Partnerships
              facilitated by Ahead Initiatives
            </p>
          </div>

          <div className="space-y-6">
            <AccentCard>
              <Paragraph>
                It is proposed that an innovative attempt be made to take
                Corporate Social Responsibility into the sphere of strengthening
                local self government through partnerships so that apart from
                ensuring concrete deliverables which benefit the community, best
                practices in eliciting participation of the poorest and
                efficiently utilizing mainstream resources are demonstrated which
                can be emulated elsewhere. Such a strategy seeks to address
                issues of long-term sustainability and continuity, by
                integrating people&apos;s &lsquo;voice&rsquo; &amp;
                &lsquo;pro-active participation&rsquo; in formulation and
                execution of initiatives on a continuing basis as part of local
                self governance
              </Paragraph>
            </AccentCard>

            <AccentCard>
              <Paragraph>
                Such partnerships will also perhaps create a meeting ground to
                bridge the cultural divide and help corporates to understand the
                worldview and cultural context from within which Local Self
                Government operates
              </Paragraph>
            </AccentCard>
          </div>
        </div>
      </section>

      {/* ════════════════════ BACK TO TOP ════════════════════ */}
      <BackToTop />
    </main>
  );
}

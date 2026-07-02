'use client';

import React, { useState, useEffect } from 'react';
import {
  Wheat,
  GraduationCap,
  Palette,
  Sparkles,
  Landmark,
  ChevronDown,
  ArrowUp,
} from 'lucide-react';

/* ───────────────────────── Design Tokens ───────────────────────── */
const COLOR = {
  primary: '#1E3F66',
  secondary: '#2d6a4f',
  accent: '#e07a5f',
  bg: '#ffffff',
  bgAlt: '#f9fafb',
  text: '#374151', // gray-700
  textLight: '#6b7280', // gray-500
} as const;

/* ───────────────────────── Section Meta ─────────────────────────── */
interface SectionMeta {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sections: SectionMeta[] = [
  { id: 'hunger', label: 'Hunger', icon: <Wheat className="w-4 h-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'culture', label: 'Culture', icon: <Palette className="w-4 h-4" /> },
  { id: 'srijangan', label: 'Srijangan', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'strategy', label: 'Strategy', icon: <Landmark className="w-4 h-4" /> },
];

/* ───────────────────────── Reusable Components ──────────────────── */

function SectionHeading({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span
        className="flex items-center justify-center w-12 h-12 rounded-xl shadow-md text-white"
        style={{ backgroundColor: COLOR.primary }}
      >
        {icon}
      </span>
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight"
        style={{ color: COLOR.primary }}
      >
        {children}
      </h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xl md:text-2xl font-semibold mt-10 mb-4"
      style={{ color: COLOR.secondary }}
    >
      {children}
    </h3>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6">
      {children}
    </p>
  );
}

function AccentCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-l-4 rounded-r-xl bg-white shadow-sm p-6 md:p-8 mb-8"
      style={{ borderColor: COLOR.accent }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px bg-gray-200" />
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: COLOR.accent }}
      />
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

/* ───────────────────────── Sticky Jump Nav ──────────────────────── */

function JumpNav({ activeId }: { activeId: string }) {
  return (
    <nav
      className="sticky top-0 z-40 border-b backdrop-blur-md bg-white/80"
      aria-label="Jump to section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: COLOR.primary }
                      : undefined
                  }
                >
                  {s.icon}
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/* ───────────────────────── Back‑to‑top Button ───────────────────── */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
      style={{ backgroundColor: COLOR.primary }}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function InitiativesPage() {
  /* ── Track active section for jump‑nav highlight ── */
  const [activeId, setActiveId] = useState('hunger');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="font-[Inter] antialiased">
      {/* ════════════════════ HERO BANNER ════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${COLOR.primary} 0%, #163352 50%, #0f2540 100%)`,
          }}
        />
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-5 bg-white" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-36 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Our Initiatives
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Addressing hunger, transforming education, and preserving culture
            through local self-governance.
          </p>
          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center animate-bounce">
            <ChevronDown className="w-6 h-6 text-blue-200" />
          </div>
        </div>
      </section>

      {/* ════════════════════ JUMP NAVIGATION ════════════════════ */}
      <JumpNav activeId={activeId} />

      {/* ════════════════════ SECTION 2 — HUNGER ════════════════════ */}
      <section id="hunger" className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading icon={<Wheat className="w-6 h-6" />}>
            Addressing Hunger
          </SectionHeading>

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
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
            className="rounded-xl p-6 md:p-8 border-l-4"
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
        className="py-16 md:py-20"
        style={{ backgroundColor: COLOR.bgAlt }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading icon={<GraduationCap className="w-6 h-6" />}>
            Education Initiative
          </SectionHeading>

          {/* First two paragraphs side by side on large screens */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
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
              className="rounded-xl p-6 md:p-8 border-l-4"
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
              className="rounded-xl p-6 md:p-8 border-l-4"
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
              className="rounded-xl p-6 md:p-8 border-l-4"
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
      <section id="culture" className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading icon={<Palette className="w-6 h-6" />}>
            Culture and Development
          </SectionHeading>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
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

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-xl p-6 md:p-8 border-l-4"
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
              className="rounded-xl p-6 md:p-8 border-l-4"
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
        className="py-16 md:py-20"
        style={{ backgroundColor: COLOR.bgAlt }}
      >
        <div className="max-w-6xl mx-auto px-6">
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
              className="rounded-xl p-6 md:p-8 border-l-4 bg-white shadow-sm"
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
      <section id="strategy" className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading icon={<Landmark className="w-6 h-6" />}>
            A Strategy of Strengthening Local Self Governance
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
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

          <div className="space-y-6 mb-10">
            <div
              className="rounded-xl p-6 md:p-8 border-l-4"
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
              className="rounded-xl p-6 md:p-8 border-l-4"
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

          <div className="grid md:grid-cols-2 gap-8 mb-10">
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

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div
              className="rounded-xl p-6 md:p-8 border-l-4"
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
              className="rounded-xl p-6 md:p-8 border-l-4"
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
            className="rounded-xl p-6 md:p-8 mb-6 text-center border-2"
            style={{
              borderColor: COLOR.primary,
              backgroundColor: `${COLOR.primary}08`,
            }}
          >
            <p
              className="text-lg md:text-xl font-semibold"
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

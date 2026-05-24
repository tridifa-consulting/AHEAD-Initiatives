"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  History,
  Heart,
  Target,
  FileText,
  BarChart3,
  ShieldCheck,
  ScrollText,
  Download,
  ChevronUp,
  ExternalLink,
  Building2,
  Scale,
  Receipt,
} from "lucide-react";

/* ── Section definitions ── */
const sections = [
  { id: "history", label: "History & Purpose", icon: History },
  { id: "moa", label: "Memorandum & Articles", icon: FileText },
  { id: "financials", label: "Financials & Reports", icon: BarChart3 },
  { id: "compliances", label: "Compliances", icon: ShieldCheck },
  { id: "policies", label: "Policies", icon: ScrollText },
];

/* ── Annual Reports ── */
const annualReports = [
  { year: "2025", file: "/pdf/Annual Report and Financial Statements 2025.pdf" },
  { year: "2024", file: "/pdf/Annual Report and Financial Statements 2024.pdf" },
  { year: "2023", file: "/pdf/2023.pdf" },
  { year: "2022", file: "/pdf/2022.pdf" },
  { year: "2021", file: "/pdf/2021.pdf" },
  { year: "2020", file: "/pdf/2020.pdf" },
  { year: "2019", file: "/pdf/2019.pdf" },
  { year: "2018", file: "/pdf/2018.pdf" },
  { year: "2017", file: "/pdf/2017.pdf" },
];

/* ── FCRA Compliances ── */
const fcraQuarterly = [
  { label: "FCRA Q1 Fund Receipts FY 24-25", file: "FCRA Q1 fund receipts FY 24-25.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 23-24", file: "FCRA Q4 fund receipts FY 23-24.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 23-24", file: "FCRA Q3 fund receipts FY 23-24.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 23/24", file: "FCRA 23-24 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 23/24", file: "FCRA 23-24 Q1.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 22/23", file: "FCRA 22-23 Q4.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 22/23", file: "FCRA 22-23 Q3.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 22/23", file: "FCRA 22-23 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 22/23", file: "FCRA 22-23 Q1.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 21/22", file: "FCRA 21-22 Q4.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 21/22", file: "FCRA 21-22 Q3.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 21/22", file: "FCRA 21-22 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 21/22", file: "FCRA 21-22 Q1.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 20/21", file: "FCRA 20-21 Q4.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 20/21", file: "FCRA 20-21 Q3.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 20/21", file: "FCRA 20-21 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 20/21", file: "FCRA 20-21 Q1.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 19/20", file: "FCRA 19-20 Q4.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 19/20", file: "FCRA 19-20 Q3.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 19/20", file: "FCRA 19-20 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 19/20", file: "FCRA 19-20 Q1.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 18/19", file: "FCRA 18-19 Q4.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 18/19", file: "FCRA 18-19 Q3.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 18/19", file: "FCRA 18-19 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 18/19", file: "FCRA 18-19 Q1.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 17/18", file: "FCRA 17-18 Q4.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 17/18", file: "FCRA 17-18 Q3.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 17/18", file: "FCRA 17-18 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 17/18", file: "FCRA 17-18 Q1.pdf" },
  { label: "FCRA Q4 Fund Receipts FY 16/17", file: "FCRA 16-17 Q4.pdf" },
  { label: "FCRA Q3 Fund Receipts FY 16/17", file: "FCRA 16-17 Q3.pdf" },
  { label: "FCRA Q2 Fund Receipts FY 16/17", file: "FCRA 16-17 Q2.pdf" },
  { label: "FCRA Q1 Fund Receipts FY 16/17", file: "FCRA 16-17 Q1.pdf" },
];

const fcraAnnual = [
  { label: "FCRA Financial Statements FY 24-25", file: "FCRA Financial Statements for FY 24-25.pdf" },
  { label: "FCRA Financial Statements FY 23-24", file: "Audited Statement of Accounts FCRA 2023-24.pdf" },
  { label: "FCRA Financial Statements FY 22-23", file: "FCRA Financial Statements for FY 22-23.pdf" },
  { label: "FCRA Financial Statements FY 21-22", file: "FCRA_2022.pdf" },
  { label: "FCRA Financial Statements FY 20-21", file: "FCRA_2021.pdf" },
  { label: "FCRA Financial Statements FY 19-20", file: "FCRA_2020.pdf" },
  { label: "FCRA Financial Statements FY 18-19", file: "FCRA_2019.pdf" },
  { label: "FCRA Financial Statements FY 17-18", file: "FCRA_2018.pdf" },
  { label: "FCRA Financial Statements FY 16-17", file: "FCRA_2017.pdf" },
];

/* ── MCA Compliances ── */
const mcaAOC = [
  "AOC for FY 24-25", "AOC-4 FY 23-24", "AOC-4 FY 22-23",
  "AOC for FY 21/22", "AOC for FY 20/21", "AOC for FY 19/20",
  "AOC for FY 18/19", "AOC for FY 17/18", "AOC for FY 16/17",
];

const mcaMGT = [
  "MGT-7 for FY 24-25", "MGT-7 FY 23-24", "MGT-7 for FY 22-23",
  "MGT-7 for FY 21/22", "MGT-7 for FY 20/21", "MGT-7 for FY 19/20",
  "MGT-7 for FY 18/19", "MGT-7 for FY 17/18", "MGT-7 for FY 16/17",
];

/* ── IT Compliances ── */
const itReturns = [
  "Acknowledgement of IT returns for FY 24-25",
  "Acknowledgement of IT returns for FY 23-24",
  "Acknowledgement of IT returns for FY 22-23",
  "Acknowledgement of IT return for FY 21/22",
  "Acknowledgement of IT return for FY 20/21",
  "Acknowledgement of IT return for FY 19/20",
  "Acknowledgement of IT return for FY 18/19",
  "Acknowledgement of IT return for FY 17/18",
  "Acknowledgement of IT return for FY 16/17",
];

/* ── Policies ── */
const policies = [
  { label: "AHEAD Retainer Policy 2025", file: "AHEAD Retainer Policy 2025.pdf" },
  { label: "AHEAD Anti Corruption Policy Jan 2024", file: "AHEAD Anti Corruption Policy Jan 2024.pdf" },
  { label: "AHEAD Child Safeguarding Policy Jan 2024", file: "AHEAD Child Safeguarding Policy Jan 2024.pdf" },
  { label: "AHEAD Code of Ethics Jan 2024", file: "AHEAD Code of Ethics Jan 2024.pdf" },
  { label: "AHEAD Initiatives Finance Policy Jan 2024", file: "AHEAD Initiatives Finance Policy Jan 2024.pdf" },
  { label: "AHEAD Anti-Terrorism Policy Feb 2024", file: "AHEAD Anti-terrorism-policy February 2024.pdf" },
  { label: "AHEAD Initiatives HR Policy Jan 2024", file: "AHEAD Initiatives HR Policy Jan 2024.pdf" },
  { label: "AHEAD Whistleblower Policy Jan 2024", file: "AHEAD Whistleblower Policy 2024.pdf" },
  { label: "AHEAD Policy Against Sexual Harassment at Workplace Jan 2024", file: "AHEAD POLICY AGAINST SEXUAL HARASSMENT AT WORKPLACE Jan 2024.pdf" },
  { label: "AHEAD Procurement Policy 2024", file: "AHEAD Procurement Policy 2024.pdf" },
];

/* ── Reusable Components ── */
function SectionHeading({ icon: Icon, title, id }: { icon: React.ElementType; title: string; id: string }) {
  return (
    <div id={id} className="scroll-mt-32 flex items-center gap-4 mb-8">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1E3F66]/10 text-[#1E3F66] shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold text-[#1E3F66]">{title}</h2>
    </div>
  );
}

function DocLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 hover:border-[#1E3F66]/20 hover:bg-blue-50/50 transition-all duration-200"
    >
      <Download className="w-4 h-4 text-[#e07a5f] shrink-0 group-hover:scale-110 transition-transform" />
      <span className="text-sm text-gray-700 group-hover:text-[#1E3F66] transition-colors">{label}</span>
      <ExternalLink className="w-3 h-3 text-gray-300 ml-auto shrink-0" />
    </a>
  );
}

/* ── Page Component ── */
export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("history");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E3F66] via-[#1a365d] to-[#0f2847] py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#2d6a4f]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#e07a5f]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Our history, governance, financial transparency, and organisational policies — all in one place.
          </p>
        </div>
      </section>

      {/* Sticky Jump Navigation */}
      <nav className="sticky top-[65px] lg:top-[81px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {sections.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeSection === id
                    ? "bg-[#1E3F66] text-white shadow-md"
                    : "text-gray-500 hover:text-[#1E3F66] hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ━━━━━ SECTION 1: History & Purpose ━━━━━ */}
        <section className="py-16 lg:py-20">
          <SectionHeading icon={History} title="History & Purpose" id="history" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — History text */}
            <div className="lg:col-span-2 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Ahead Initiatives brings together over a hundred years of experience in Rural Development, stretching from exemplary grassroots Action Research &amp; Capacity Building to successful evidence based Advocacy, which has led to policy changes in Local Governance.
              </p>
              <p className="text-gray-700 leading-relaxed">
                It has been constituted as a Not-for-Profit Association under Section 25 of the Companies Act, 1956 to ensure greater transparency, accountability and monitoring which would help inspire public confidence and participation. It hopes to transform itself into a widely held Not-for-Profit Association which, while focusing on basic issues of Hunger will also endeavour to bridge the cultural divide and work towards redefining a more sustainable development paradigm.
              </p>

              {/* Registration details */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 space-y-2">
                <p className="text-sm text-gray-700"><strong className="text-[#1E3F66]">License:</strong> Special license (100531) as a Not-for-Profit Association by the Ministry of Corporate Affairs, New Delhi</p>
                <p className="text-sm text-gray-700"><strong className="text-[#1E3F66]">CIN:</strong> U85300WB2009NPL134655 (2009-2010)</p>
              </div>

              {/* Our Endeavour & Objectives */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-[#2d6a4f] mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" /> Our Endeavour
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To promote a society where people of diverse cultures are able to define their own development paradigm and fulfil their economic, social, cultural, and spiritual aspirations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#2d6a4f] mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" /> Our Objectives
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e07a5f] mt-2 shrink-0" />
                    <p className="text-gray-700 leading-relaxed">Alleviate poverty by addressing Hunger and Food &amp; Nutritional insecurity as the primary focus of our development endeavour.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e07a5f] mt-2 shrink-0" />
                    <p className="text-gray-700 leading-relaxed">Engage with development in the context and through the medium of human cultures.</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right — Our Commitment quote card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1E3F66] to-[#0f2847] rounded-2xl p-8 text-center shadow-xl">
                <Heart className="w-8 h-8 text-[#e07a5f] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-5">Our Commitment</h3>
                <div className="border-t border-white/20 pt-5">
                  <p className="text-blue-200 italic leading-loose text-sm">
                    ... to go to the people,<br />
                    live among them,<br />
                    learn from them,<br />
                    start with what they know,<br />
                    build on what they have.<br />
                    <br />
                    ... that the best leaders,<br />
                    when their work is done,<br />
                    the people all remark,<br />
                    &quot;We have done it ourselves&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ━━━━━ SECTION 2: Memorandum & Articles ━━━━━ */}
        <section className="py-16 lg:py-20">
          <SectionHeading icon={FileText} title="Memorandum & Articles of Association" id="moa" />

          <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
            Our Brochure and Memorandum &amp; Articles of Association are available for public review as part of our commitment to transparency.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <a
              href="/pdf/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-xl border-2 border-gray-100 hover:border-[#e07a5f]/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-[#e07a5f]" />
              </div>
              <div>
                <div className="font-semibold text-[#1E3F66] text-sm">Brochure</div>
                <div className="text-xs text-gray-400">circa 2008 • PDF</div>
              </div>
            </a>
            <a
              href="/pdf/moa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-xl border-2 border-gray-100 hover:border-[#2d6a4f]/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ScrollText className="w-6 h-6 text-[#2d6a4f]" />
              </div>
              <div>
                <div className="font-semibold text-[#1E3F66] text-sm">Memorandum &amp; Articles</div>
                <div className="text-xs text-gray-400">of Association • PDF</div>
              </div>
            </a>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ━━━━━ SECTION 3: Financials & Reports ━━━━━ */}
        <section className="py-16 lg:py-20 bg-[#f9fafb] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-2xl">
          <SectionHeading icon={BarChart3} title="Director's Reports & Financial Statements" id="financials" />

          <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
            To build public confidence and elicit greater participation and contribution to our efforts, our Director&apos;s Reports and audited Financial Statements are presented below so as to ensure the transparency and accountability necessary when dealing with public funds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {annualReports.map((report) => (
              <a
                key={report.year}
                href={report.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-[#1E3F66]/20 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-16 rounded-lg bg-gradient-to-b from-[#1E3F66] to-[#0f2847] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-xs">{report.year}</span>
                </div>
                <div>
                  <div className="font-semibold text-[#1E3F66] text-sm">Annual Report &amp; Financial Statements</div>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Download className="w-3 h-3" /> Download PDF
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ━━━━━ SECTION 4: Compliances ━━━━━ */}
        <section className="py-16 lg:py-20">
          <SectionHeading icon={ShieldCheck} title="Compliances" id="compliances" />

          {/* FCRA */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-[#2d6a4f] mb-6 flex items-center gap-2 border-l-4 border-[#2d6a4f] pl-4">
              <Scale className="w-5 h-5" /> FCRA Compliances
            </h3>

            {/* FCRA Annual Returns */}
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Annual Financial Statements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {fcraAnnual.map((doc) => (
                <DocLink key={doc.label} label={doc.label} href={`https://www.aheadinitiatives.in/pdf/${doc.file}`} />
              ))}
            </div>

            {/* FCRA Quarterly */}
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quarterly Fund Receipts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {fcraQuarterly.map((doc) => (
                <DocLink key={doc.label} label={doc.label} href={`https://www.aheadinitiatives.in/pdf/${doc.file}`} />
              ))}
            </div>
          </div>

          {/* MCA */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-[#2d6a4f] mb-6 flex items-center gap-2 border-l-4 border-[#1E3F66] pl-4">
              <Building2 className="w-5 h-5" /> Ministry of Corporate Affairs (MCA) Compliances
            </h3>

            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">AOC Filings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {mcaAOC.map((label) => (
                <DocLink key={label} label={label} href={`https://www.aheadinitiatives.in/pdf/${label}.pdf`} />
              ))}
            </div>

            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">MGT-7 Filings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {mcaMGT.map((label) => (
                <DocLink key={label} label={label} href={`https://www.aheadinitiatives.in/pdf/${label}.pdf`} />
              ))}
            </div>
          </div>

          {/* Income Tax */}
          <div>
            <h3 className="text-xl font-semibold text-[#2d6a4f] mb-6 flex items-center gap-2 border-l-4 border-[#e07a5f] pl-4">
              <Receipt className="w-5 h-5" /> Income Tax Compliances
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {itReturns.map((label) => (
                <DocLink key={label} label={label} href={`https://www.aheadinitiatives.in/pdf/${label}.pdf`} />
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* ━━━━━ SECTION 5: Policies ━━━━━ */}
        <section className="py-16 lg:py-20 bg-[#f9fafb] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8">
          <SectionHeading icon={ScrollText} title="Policies" id="policies" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {policies.map((policy) => (
              <a
                key={policy.label}
                href={`https://www.aheadinitiatives.in/pdf/policies/${policy.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-[#2d6a4f]/20 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ScrollText className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm group-hover:text-[#1E3F66] transition-colors">{policy.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Download className="w-3 h-3" /> PDF
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Back to Top */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="#history"
          className="flex items-center justify-center w-12 h-12 bg-[#1E3F66] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
}

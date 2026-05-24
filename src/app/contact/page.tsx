'use client';

import React, { useState, FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Users,
  Heart,
  Send,
  Star,
  ChevronRight,
  Globe,
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */

interface TeamMember {
  name: string;
  role: string;
  email: string;
}

const directors: TeamMember[] = [
  { name: 'Dibya Gopal Ghatak', role: 'Director', email: 'dgghatak@aheadinitiatives.in' },
  { name: 'Dibyendu Sarkar (Retd. IAS)', role: 'Chief Executive Officer', email: 'dibyen@aheadinitiatives.in' },
  { name: 'Dilip Ghosh (Retd. IAS)', role: 'Director', email: 'dilipghosh1952@gmail.com' },
  { name: 'Suman Talukdar', role: 'Director', email: 'suman_taluk@yahoo.co.in' },
  { name: 'Dr. Indrani De', role: 'Director', email: 'indrani.de87@gmail.com' },
  { name: 'Sukamal Mukherjee', role: 'Director', email: 'sukamal@hotmail.com' },
  { name: 'Dr. Udita Ghosh Sarkar', role: 'Director', email: 'udita.dgs@gmail.com' },
];

const projectDirectors: TeamMember[] = [
  {
    name: 'Swapan Das',
    role: 'Project Director Education, Project Administrator EDU & AS',
    email: 'swapankumardas@aheadinitiatives.in',
  },
  {
    name: 'Sumit Kumar Sanyal',
    role: 'Dy. Project Director FS-IV, Co-Project Administrator AS & Handicraft',
    email: 'sumitkumarsanyal@aheadinitiatives.in',
  },
  {
    name: 'Rajkumar Maity',
    role: 'Director, Accounts & Admin',
    email: 'rajkumarmaity@aheadinitiatives.in',
  },
];

const fieldTeam: TeamMember[] = [
  { name: 'Kalpana Sardar', role: 'Field Manager', email: 'kalpanasardar@aheadinitiatives.in' },
  { name: 'Debahutii Mukherjee', role: 'Administration Assistant', email: 'debahutimukherjee@aheadinitiatives.in' },
  { name: 'Mrinmoy Bhattacharjee', role: 'Coordinator ICT', email: 'mrinmoy@aheadinitiatives.in' },
  { name: 'Dinanath Singha', role: 'Field Manager', email: 'dinanathsingha@aheadinitiatives.in' },
  { name: 'Biswajit Nath', role: 'Field Director', email: 'biswajitnath@aheadinitiatives.in' },
  { name: 'Manik Singha', role: 'Senior Field Manager', email: 'maniksingha@aheadinitiatives.in' },
  { name: 'Indrajit Mitra', role: 'Senior Field Manager', email: 'indrajitmitra@aheadinitiatives.in' },
  { name: 'Mamul Hassan Gazi', role: 'Field Manager', email: 'mamulhassan@aheadinitiatives.in' },
  { name: 'Sayed Tapan Azad', role: 'Sr. Field Manager', email: 'sayedtapanazad@aheadinitiatives.in' },
  { name: 'Tapas Mete', role: 'Sr. Field Manager', email: 'tapasmete@aheadinitiatives.in' },
  { name: 'Adrish Das', role: 'Manager, Studio & Production', email: 'adrishdas@aheadinitiatives.in' },
  { name: 'Debjani Roy', role: 'Field Director', email: 'debjaniroy@aheadinitiatives.in' },
  { name: 'Malay Ghosal', role: 'Field Director (NRM)', email: 'malayghoshal@aheadinitiatives.in' },
  { name: 'Himanshu Kayal', role: 'Sr. NRM Director', email: 'himanshukayal@aheadinitiatives.in' },
  { name: 'Sukumar Gaine', role: 'Sr. Field Director', email: 'sukumargaine@aheadinitiatives.in' },
  {
    name: 'Arunesh Majumder',
    role: 'Dy Project Director, Education, Director Research & Advocacy',
    email: 'aruneshmajumder@aheadinitiatives.in',
  },
];

/* ──────────────────────── HELPERS ─────────────────────────── */

function getInitials(name: string): string {
  const cleaned = name
    .replace(/^(Dr\.\s*)/i, '')
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ─────────────────── TEAM MEMBER CARD ─────────────────────── */

function TeamCard({
  member,
  index,
  variant = 'default',
}: {
  member: TeamMember;
  index: number;
  variant?: 'default' | 'compact';
}) {
  const bgColors = ['bg-[#1E3F66]', 'bg-[#2d6a4f]'];
  const avatarBg = bgColors[index % 2];

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-gray-100 shadow-sm
        hover:shadow-lg hover:border-[#e07a5f]/30 transition-all duration-300
        ${variant === 'compact' ? 'p-4' : 'p-6'}`}
    >
      {/* Subtle top accent line */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-16
          transition-all duration-300 rounded-full
          ${index % 2 === 0 ? 'bg-[#1E3F66]' : 'bg-[#2d6a4f]'}`}
      />

      <div className={`flex ${variant === 'compact' ? 'flex-row items-center gap-3' : 'flex-col items-center text-center gap-4'}`}>
        {/* Avatar */}
        <div
          className={`${avatarBg} ${
            variant === 'compact' ? 'w-11 h-11 text-sm flex-shrink-0' : 'w-16 h-16 text-lg'
          } rounded-full flex items-center justify-center text-white font-semibold
            ring-2 ring-white shadow-md`}
        >
          {getInitials(member.name)}
        </div>

        {/* Info */}
        <div className={variant === 'compact' ? 'min-w-0' : ''}>
          <h4
            className={`font-semibold text-gray-900 ${
              variant === 'compact' ? 'text-sm' : 'text-base'
            }`}
          >
            {member.name}
          </h4>
          <p
            className={`text-gray-500 mt-0.5 leading-snug ${
              variant === 'compact' ? 'text-xs' : 'text-sm'
            }`}
          >
            {member.role}
          </p>
          <a
            href={`mailto:${member.email}`}
            className={`inline-flex items-center gap-1 text-[#1E3F66] hover:text-[#e07a5f]
              transition-colors mt-1.5 ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}
          >
            <Mail className={variant === 'compact' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            <span className="truncate">{member.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── SECTION HEADING ────────────────────────── */

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  light = false,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-12">
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4
          ${light ? 'bg-white/10' : 'bg-[#1E3F66]/5'}`}
      >
        <Icon className={`w-7 h-7 ${light ? 'text-white' : 'text-[#1E3F66]'}`} />
      </div>
      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight
          ${light ? 'text-white' : 'text-gray-900'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg max-w-2xl mx-auto ${light ? 'text-blue-100' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        <span className={`h-1 w-8 rounded-full ${light ? 'bg-[#e07a5f]' : 'bg-[#e07a5f]'}`} />
        <span className={`h-1 w-3 rounded-full ${light ? 'bg-white/30' : 'bg-gray-200'}`} />
        <span className={`h-1 w-3 rounded-full ${light ? 'bg-white/20' : 'bg-gray-100'}`} />
      </div>
    </div>
  );
}

/* ───────────────────── MAIN PAGE ──────────────────────────── */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app this would call an API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', organisation: '', email: '', mobile: '', message: '' });
  };

  return (
    <main className="font-[Inter] antialiased">
      {/* ═══════════════════  SECTION 1 — HERO  ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3F66] via-[#17325a] to-[#0f2440]">
        {/* Decorative background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#e07a5f]/[0.04] translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#2d6a4f]/[0.06] to-transparent" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
            <Heart className="w-4 h-4 text-[#e07a5f]" />
            <span className="text-sm text-blue-100 font-medium">Get in Touch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Contact <span className="text-[#e07a5f]">&amp;</span> Support Us
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
            Join us in our mission to strengthen local self-governance and address hunger in Eastern India.
          </p>

          {/* Scroll-down hint */}
          <div className="mt-12 flex justify-center">
            <div className="animate-bounce p-2 bg-white/10 rounded-full">
              <ChevronRight className="w-5 h-5 text-white rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  SECTION 2 — SUPPORT OUR INITIATIVES  ═══════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading icon={Heart} title="Support Our Initiatives" />

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p className="relative pl-6 border-l-4 border-[#e07a5f]/60">
              It is our endeavour to continue working with support from the general public on basic
              issues of Hunger, both of the body and of the spirit too, the latter indispensable for
              that sense of fulfillment that the poor also aspire to.
            </p>
            <p className="relative pl-6 border-l-4 border-[#2d6a4f]/50">
              Our efforts would be misplaced and meaningless if we are not able to evoke the humanity
              in all of us to support our simple initiatives.
            </p>
            <p className="relative pl-6 border-l-4 border-[#1E3F66]/50">
              We welcome any manner of support that may be forthcoming from various quarters both
              financial and otherwise. To know more about us and how you may support us do contact
              any member of our Board or Core Team or even consider becoming a member if you share
              our vision.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════  SECTION 3 — CONTACT FORM + DETAILS  ═══════════════ */}
      <section className="bg-[#f9fafb] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Mail}
            title="Reach Out to Us"
            subtitle="We'd love to hear from you. Fill out the form or reach us directly."
          />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* ── Contact Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#e07a5f]" />
                  Send us a Message
                </h3>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                    ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row: Name & Organisation */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Name <span className="text-[#e07a5f]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f9fafb]
                          text-gray-900 placeholder-gray-400 text-sm
                          focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent
                          transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="org"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Organisation
                      </label>
                      <input
                        id="org"
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f9fafb]
                          text-gray-900 placeholder-gray-400 text-sm
                          focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent
                          transition-all duration-200"
                        placeholder="Your organisation"
                      />
                    </div>
                  </div>

                  {/* Row: Email & Mobile */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Email <span className="text-[#e07a5f]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f9fafb]
                          text-gray-900 placeholder-gray-400 text-sm
                          focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent
                          transition-all duration-200"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Mobile
                      </label>
                      <input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f9fafb]
                          text-gray-900 placeholder-gray-400 text-sm
                          focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent
                          transition-all duration-200"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f9fafb]
                        text-gray-900 placeholder-gray-400 text-sm resize-none
                        focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent
                        transition-all duration-200"
                      placeholder="How can we help? Tell us about your interest in supporting AHEAD…"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#e07a5f] hover:bg-[#c96a52]
                      text-white font-semibold rounded-xl shadow-md shadow-[#e07a5f]/20
                      hover:shadow-lg hover:shadow-[#e07a5f]/30 active:scale-[0.98]
                      transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* ── Contact Details ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Address Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#1E3F66]" />
                  Contact Details
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-[#1E3F66]/5 flex items-center justify-center">
                      <MapPin className="w-4.5 h-4.5 text-[#1E3F66]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Postal Address</p>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                        32/6 Gariahat Road (S),
                        <br />
                        Kolkata - 700031, INDIA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-[#2d6a4f]/5 flex items-center justify-center">
                      <Phone className="w-4.5 h-4.5 text-[#2d6a4f]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Telephone</p>
                      <a
                        href="tel:+910334067 0369"
                        className="text-sm text-[#1E3F66] hover:text-[#e07a5f] transition-colors mt-0.5 block"
                      >
                        +91-033-40670369
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg bg-[#e07a5f]/5 flex items-center justify-center">
                      <Mail className="w-4.5 h-4.5 text-[#e07a5f]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Email</p>
                      <a
                        href="mailto:ahead@aheadinitiatives.in"
                        className="text-sm text-[#1E3F66] hover:text-[#e07a5f] transition-colors mt-0.5 block"
                      >
                        ahead@aheadinitiatives.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 pb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#2d6a4f]" />
                    Find Us
                  </h3>
                </div>
                <div className="p-4 pt-2">
                  <div className="rounded-2xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.9428143436057!2d88.36535831432441!3d22.506328641073274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027128cceb4325%3A0x1fd2f48f5ff0eda7!2sAhead%20INITIATIVES!5e0!3m2!1sen!2sin!4v1593321333151!5m2!1sen!2sin"
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="AHEAD Initiatives Location"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  SECTION 4 — FOUNDER & INSPIRER  ═══════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Star}
            title="Our Founder & Inspirer"
            subtitle="Honoring the vision that set AHEAD on its journey."
          />

          {/* Memorial Card */}
          <div className="relative max-w-2xl mx-auto">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3F66]/10 via-[#2d6a4f]/5 to-[#e07a5f]/10 rounded-3xl blur-xl" />

            <div
              className="relative bg-white rounded-3xl border border-gray-100 shadow-lg p-8 sm:p-12
                text-center overflow-hidden"
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E3F66] via-[#2d6a4f] to-[#e07a5f]" />

              {/* Memorial avatar */}
              <div className="relative inline-flex">
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E3F66] to-[#2d6a4f]
                    flex items-center justify-center text-white text-2xl font-bold
                    ring-4 ring-[#1E3F66]/10 shadow-lg"
                >
                  RD
                </div>
                {/* Subtle halo */}
                <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#e07a5f]/20 animate-[spin_30s_linear_infinite]" />
              </div>

              <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
                Rathnadeep De
              </h3>
              <p className="mt-1 text-[#1E3F66] font-semibold text-lg">
                1957 – 2021
              </p>
              <p className="mt-2 text-gray-500 text-base">
                Managing Director, 2009 – 2021
              </p>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 my-6">
                <span className="h-px w-12 bg-gray-200" />
                <Heart className="w-4 h-4 text-[#e07a5f] fill-[#e07a5f]/20" />
                <span className="h-px w-12 bg-gray-200" />
              </div>

              <p className="text-gray-500 text-sm italic max-w-md mx-auto leading-relaxed">
                His unwavering dedication to uplifting communities in Eastern India continues to
                inspire every initiative we undertake. His legacy lives on through our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════  SECTION 5 — PRESENT DIRECTORS  ═══════════════ */}
      <section className="bg-[#f9fafb] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Users}
            title="Present Directors of the Board"
            subtitle="The leadership guiding AHEAD's mission and strategic direction."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {directors.map((member, i) => (
              <TeamCard key={member.email} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  SECTION 6 — PROJECT DIRECTORS  ═══════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Building2}
            title="Core Team – Project Directors"
            subtitle="Leading the planning and execution of our programmes on the ground."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projectDirectors.map((member, i) => (
              <TeamCard key={member.email} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  SECTION 7 — FIELD TEAM  ═══════════════ */}
      <section className="bg-[#f9fafb] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Users}
            title="The Rest of the Core Team"
            subtitle="Our dedicated field team driving impact across Eastern India every day."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {fieldTeam.map((member, i) => (
              <TeamCard key={member.email} member={member} index={i} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

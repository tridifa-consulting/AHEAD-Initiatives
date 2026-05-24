"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wheat,
  GraduationCap,
  Palette,
  Sparkles,
  Landmark,
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Heart,
  ChevronRight,
  MapPin,
} from "lucide-react";

const heroSlides = [
  { src: "/hero/hero-children-sunset.jpg", alt: "Children playing at sunset in rural India" },
  { src: "/hero/hero-education.jpg", alt: "Children learning with slates in a rural school" },
  { src: "/hero/hero-farmland.jpg", alt: "Aerial view of lush green farmlands in Eastern India" },
];

const initiatives = [
  {
    icon: Wheat,
    title: "Addressing Hunger",
    description:
      "Advocating a Local Self Governance Approach to sustainable and decentralized Natural Resource Management as the principal means of addressing food, nutrition and livelihood insecurity.",
    href: "/initiatives#hunger",
    color: "#e07a5f",
    bgColor: "bg-orange-50",
  },
  {
    icon: GraduationCap,
    title: "Contextual Education",
    description:
      "Supplementing rural education with contextually appropriate localised input through partnerships with 25 Gram Panchayats and the Nabodisha platform for rural teachers.",
    href: "/initiatives#education",
    color: "#2d6a4f",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Palette,
    title: "Culture & Development",
    description:
      "Recognising culture as intrinsic to sustainable human development, engaging schools and communities to preserve cultural heritage and foster creative expression.",
    href: "/initiatives#culture",
    color: "#1E3F66",
    bgColor: "bg-blue-50",
  },
  {
    icon: Sparkles,
    title: "Srijangan",
    description:
      "Transforming neighbourhood primary schools into open creative learning spaces for lifelong learning for all ages, accessible to the homebound poor.",
    href: "/initiatives#srijangan",
    color: "#7c3aed",
    bgColor: "bg-violet-50",
  },
  {
    icon: Landmark,
    title: "Local Self Governance",
    description:
      "Strengthening Local Self-Government to become inclusive, participatory, just and efficient institutions through CSO-Panchayat and Corporate partnerships.",
    href: "/initiatives#strategy",
    color: "#0891b2",
    bgColor: "bg-cyan-50",
  },
];

const stats = [
  { value: "25+", label: "Gram Panchayat Partnerships", icon: Landmark },
  { value: "82", label: "Published Materials", icon: BookOpen },
  { value: "16+", label: "Years of Impact", icon: Globe },
  { value: "30+", label: "Core Team Members", icon: Users },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section with Image Slideshow */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Slideshow Background */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3F66]/85 via-[#1a365d]/80 to-[#0f2847]/85" />

        {/* Subtle decorative elements on top of overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm mb-8 border border-white/10 animate-fade-in-up">
              <MapPin className="w-4 h-4" />
              <span>Eastern India &middot; Since 2009</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up delay-100">
              Addressing Hunger,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e07a5f] to-[#f4a261]">
                Empowerment
              </span>{" "}
              <span className="text-white/90">&</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] to-[#80ed99]">
                Development
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-blue-200 leading-relaxed mb-10 max-w-2xl animate-fade-in-up delay-200">
              A registered not-for-profit strengthening local self-governance,
              natural resource management, and contextual education to combat
              hunger and poverty in Eastern India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <Link
                href="/initiatives"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#e07a5f] to-[#d4654a] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                Our Initiatives
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Support Us
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators + scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-6">
          {/* Slide dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all duration-500 ${
                  currentSlide === index
                    ? "w-8 h-2 bg-[#e07a5f]"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Scroll indicator */}
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-[#1E3F66] mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-[#1E3F66] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-[#f9fafb] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E3F66]/10 rounded-full text-[#1E3F66] text-xs font-semibold uppercase tracking-wider mb-6">
              Our Mission
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F66] mb-6">
              Strengthening Local Self-Governance
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Our activities are based on the fundamental strategy of
              strengthening Local Self-Government to become inclusive,
              participatory, just and efficient institutions of the people,
              which address food &amp; livelihood security, health, education and
              other primary entitlements.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We strive to advocate necessary changes in society and governance
              so that powers, responsibilities and functions move outwards from
              the community only on the basis of necessity and subsidiarity,
              through concentric tiers of governance, from the local through the
              state to the national and global.
            </p>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2d6a4f]/10 rounded-full text-[#2d6a4f] text-xs font-semibold uppercase tracking-wider mb-6">
              What We Do
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F66] mb-4">
              Our Initiatives
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Five interconnected pillars driving sustainable change in Eastern
              India through community empowerment and institutional
              strengthening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative p-7 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bgColor} mb-5 group-hover:scale-110 transition-transform`}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: item.color }}
                  />
                </div>

                <h3 className="text-lg font-bold text-[#1E3F66] mb-3 group-hover:text-[#2d6a4f] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#e07a5f] group-hover:gap-2 transition-all">
                  Learn more
                  <ChevronRight className="w-4 h-4" />
                </span>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  style={{ backgroundColor: item.color }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources CTA */}
      <section className="bg-[#f9fafb] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#1E3F66] to-[#0f2847] rounded-3xl p-10 sm:p-14 overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e07a5f]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2d6a4f]/15 rounded-full blur-2xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-blue-200 text-xs font-semibold uppercase tracking-wider mb-5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Resource Library
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  82+ Publications & Materials
                </h2>
                <p className="text-blue-200 leading-relaxed">
                  Explore our extensive collection of printed materials spanning
                  education, natural resource management, governance, and
                  culture — available in English and Bengali.
                </p>
              </div>
              <Link
                href="/resources/print"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E3F66] font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex-shrink-0"
              >
                Browse Resources
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-[#e07a5f] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F66] mb-4">
            Support Our Mission
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-lg">
            It is our endeavour to continue working with support from the
            general public on basic issues of Hunger, both of the body and of
            the spirit too. We welcome any manner of support that may be
            forthcoming.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#e07a5f] to-[#d4654a] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E3F66] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              About Us
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

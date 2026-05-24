'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, Library, FileText } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────────
type Category =
  | 'English Publications'
  | 'Bengali Publications'
  | 'Nabodisha Journal'
  | 'Other Materials';

interface PrintDocument {
  id: number;
  title: string;
  author: string;
  description: string;
  category: Category;
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const documents: PrintDocument[] = [
  // ── English Publications ──────────────────────────────────────────────────────
  { id: 1, title: 'Local Government in Ancient India', author: 'Radha Kumud Mukherjee', description: 'English translation', category: 'English Publications' },
  { id: 2, title: 'Culture Spirituality and Development', author: '', description: 'A dialogue on redefining the development paradigm', category: 'English Publications' },
  { id: 3, title: 'PRI-SHG Synergy', author: '', description: 'Consultative Study on Synergy between Panchayati Raj Institutions and Self Help Groups (2009)', category: 'English Publications' },

  // ── Bengali Publications ──────────────────────────────────────────────────────
  { id: 4, title: 'Culture Spirituality and Development (Bengali)', author: '', description: 'Redefining the development paradigm', category: 'Bengali Publications' },
  { id: 5, title: "UNESCO's Great Thinkers in Education (Bengali)", author: '', description: 'A UNESCO compilation of great thinkers in education throughout the world, throughout the ages', category: 'Bengali Publications' },
  { id: 6, title: 'Shantiniketan Sriniketan (Bengali)', author: '', description: "An insight into Rabindranath's philosophy of education and how it was realised", category: 'Bengali Publications' },
  { id: 7, title: 'Come lets Act (Bengali)', author: '', description: 'A manual for street theatre, stage theatre and jatra for rural areas to foster creativity and communication', category: 'Bengali Publications' },
  { id: 8, title: 'Natural Resource Management and tree based livelihoods (Bengali)', author: '', description: 'Published by the West Bengal Government for use in MGNREGA Initiatives', category: 'Bengali Publications' },
  { id: 9, title: 'An Introduction to Activity Based Learning innovations in pedagogy – 1 (Classes 3 to 5)', author: '', description: 'School Curriculum and Syllabus based opportunities for contextually appropriate Activity Based Learning', category: 'Bengali Publications' },
  { id: 10, title: 'Activity Based Learning innovations in pedagogy for Class 3', author: '', description: 'School Curriculum and Syllabus based opportunities for Activity Based Learning', category: 'Bengali Publications' },
  { id: 11, title: 'Activity Based Learning innovations in pedagogy for Class 4', author: '', description: 'School Curriculum and Syllabus based opportunities for Activity Based Learning', category: 'Bengali Publications' },
  { id: 12, title: 'Activity Based Learning innovations in pedagogy for Class 5', author: '', description: 'School Curriculum and Syllabus based opportunities for Activity Based Learning', category: 'Bengali Publications' },
  { id: 13, title: "Akashi's Panchayat (Bengali)", author: '', description: "A comic book story of a young woman's journey as a successful Gram Panchayat Pradhan", category: 'Bengali Publications' },
  { id: 14, title: 'Draft Resolutions for the Gram Sabha/Sansad', author: '', description: 'An array of issues for neighbourhood meetings and resolutions for the gram sabha for consideration', category: 'Bengali Publications' },
  { id: 15, title: 'Ecology and Rural Education (Bengali)', author: '', description: 'Ecology and Rural Education Manual for Rural Teachers produced by FAO of the United Nations', category: 'Bengali Publications' },
  { id: 16, title: 'Nutrition Education for primary school children (Bengali)', author: '', description: "A FAO (UN) primer on an often neglected aspect of a child's education", category: 'Bengali Publications' },
  { id: 17, title: "A Teachers Tale (Bengali)", author: '', description: 'Story of how a young rural teacher transforms a moribund school with the help of the Gram Panchayat', category: 'Bengali Publications' },
  { id: 18, title: "Mala's Story (Bengali)", author: '', description: 'A young bride takes on transforming her new neighbourhood to the virtues of homestead vegetable gardens and Natural Resource Management', category: 'Bengali Publications' },
  { id: 19, title: 'A primer on the Mangroves of the Sunderbans (Bengali)', author: 'Dr. Kumud Ranjan Naskar', description: 'Primer on the Mangroves of the Sunderbans', category: 'Bengali Publications' },
  { id: 20, title: 'Mastermashai Samopeshu [Dear Teacher] (Bengali)', author: '', description: 'An epistle to his teacher from a marginalised child in a rural school', category: 'Bengali Publications' },
  { id: 21, title: 'Seeds - the Freedom of knowledge (Bengali)', author: '', description: 'A simple primer on collection and preservation of heirloom seeds', category: 'Bengali Publications' },
  { id: 22, title: "Miyawaki's Rapid Afforestation (Bengali)", author: '', description: "A translation of Afforest manual on Miyawaki's methodology", category: 'Bengali Publications' },
  { id: 23, title: 'Natural Dyes - their Production and Use (Part 1)', author: '', description: 'A collection of valuable information on the production and use of natural dyes', category: 'Bengali Publications' },
  { id: 24, title: 'Natural Dyes - their Production and Use (Part 2)', author: '', description: 'A collection of valuable information on the production and use of natural dyes', category: 'Bengali Publications' },
  { id: 25, title: 'Perennials for the Home Garden', author: '', description: 'Information on how to include a few perennials in a home Garden', category: 'Bengali Publications' },
  { id: 26, title: 'Training Modules for Gram Rojgar Sevaks (GRS) and MGNREGS Supervisors (Draft)', author: '', description: 'Training modules for facilitating Asset Creation under MGNREGS', category: 'Bengali Publications' },
  { id: 27, title: 'NCF (2005)', author: '', description: 'National Curriculum Framework 2005 (Bengali)', category: 'Bengali Publications' },
  { id: 28, title: 'Proverbs of Khanna (Bengali)', author: '', description: 'Traditional knowledge of Bengal on agriculture, etc distilled as quatrains for posterity', category: 'Bengali Publications' },
  { id: 29, title: 'Nursery (Bengali)', author: '', description: 'A compendium to strengthen an essential skill for rural areas', category: 'Bengali Publications' },
  { id: 30, title: 'The interim Report on School Education in West Bengal 2011 (Bengali)', author: '', description: "The Government's report that was a turning point for school education", category: 'Bengali Publications' },
  { id: 31, title: "The West Bengal Government's Syllabus and Curriculum for Classes 1-5 (Bengali)", author: '', description: 'A consolidated government publication', category: 'Bengali Publications' },
  { id: 32, title: "The West Bengal Government's Syllabus and Curriculum for Classes 6-8 (Bengali)", author: '', description: 'A consolidated government publication', category: 'Bengali Publications' },
  { id: 33, title: 'Activity Based Modules for Classes 3 & 4 (Bengali)', author: '', description: 'A compilation of activity based modules to make learning more vibrant and contextual', category: 'Bengali Publications' },
  { id: 34, title: 'Activity Based Modules for Classes 5 to 8 (Bengali)', author: '', description: 'A compilation of activity based modules to make learning more vibrant and contextual', category: 'Bengali Publications' },
  { id: 35, title: "Leaflet on Miyawaki's Afforestation", author: '', description: 'Distilled from the Bengali booklet', category: 'Bengali Publications' },
  { id: 36, title: 'Salt tolerant crop list (Bengali)', author: '', description: 'A list compiled by FAO', category: 'Bengali Publications' },
  { id: 37, title: 'Crops through the seasons of Bengal', author: '', description: 'Leaflet for rural schoolchildren', category: 'Bengali Publications' },
  { id: 38, title: 'Nursery (Bengali) - Leaflet', author: '', description: 'A leaflet for schoolchildren', category: 'Bengali Publications' },
  { id: 39, title: 'Azolla (Bengali)', author: '', description: 'A leaflet', category: 'Bengali Publications' },
  { id: 40, title: 'Vermicompost', author: '', description: 'A leaflet for schoolchildren', category: 'Bengali Publications' },
  { id: 41, title: 'Novel Methods of Bamboo Propagation (Bengali)', author: '', description: 'A rapid surefire method of Bamboo propagation from branching shoots', category: 'Bengali Publications' },
  { id: 42, title: 'System of Rice Intensification [SRI] (Bengali)', author: '', description: 'A leaflet', category: 'Bengali Publications' },
  { id: 43, title: 'System of Wheat Intensification [SWI] (Bengali)', author: '', description: 'A leaflet', category: 'Bengali Publications' },
  { id: 44, title: 'Animal Husbandry Healthcare (Bengali)', author: '', description: 'A booklet', category: 'Bengali Publications' },
  { id: 45, title: 'Breeding chicks [First 28 days] (Bengali)', author: '', description: 'A booklet', category: 'Bengali Publications' },

  // ── Nabodisha Journal ─────────────────────────────────────────────────────────
  { id: 46, title: 'Nabodisha - Latest Issue', author: '', description: 'The latest issue', category: 'Nabodisha Journal' },
  { id: 47, title: 'Nabodisha - April 2020', author: '', description: 'April 2020', category: 'Nabodisha Journal' },
  { id: 48, title: 'Nabodisha - December 2019', author: '', description: 'December 2019', category: 'Nabodisha Journal' },
  { id: 49, title: 'Nabodisha - September 2018', author: '', description: 'September 2018', category: 'Nabodisha Journal' },
  { id: 50, title: 'Nabodisha - January 2018', author: '', description: 'January 2018', category: 'Nabodisha Journal' },
  { id: 51, title: 'Nabodisha - March 2017', author: '', description: 'March 2017', category: 'Nabodisha Journal' },
  { id: 52, title: 'Nabodisha - December 2016', author: '', description: 'December 2016', category: 'Nabodisha Journal' },
  { id: 53, title: 'Nabodisha - April 2016', author: '', description: 'April 2016', category: 'Nabodisha Journal' },
  { id: 54, title: 'Nabodisha - Special Compendium 2015', author: '', description: 'Special Compendium issue 2015', category: 'Nabodisha Journal' },
  { id: 55, title: 'Nabodisha - December 2015', author: '', description: 'December 2015', category: 'Nabodisha Journal' },
  { id: 56, title: 'Nabodisha - March 2015', author: '', description: 'March 2015', category: 'Nabodisha Journal' },
  { id: 57, title: 'Nabodisha - Special Compendium 2014', author: '', description: 'Special Compendium Issue 2014', category: 'Nabodisha Journal' },
  { id: 58, title: 'Nabodisha - September 2014', author: '', description: 'September 2014', category: 'Nabodisha Journal' },
  { id: 59, title: 'Nabodisha - April 2014', author: '', description: 'April 2014', category: 'Nabodisha Journal' },
  { id: 60, title: 'Nabodisha - January 2014', author: '', description: 'January 2014', category: 'Nabodisha Journal' },
  { id: 61, title: 'Nabodisha - October 2013', author: '', description: 'October 2013', category: 'Nabodisha Journal' },
  { id: 62, title: 'Nabodisha - July 2013', author: '', description: 'July 2013', category: 'Nabodisha Journal' },
  { id: 63, title: 'Nabodisha - April 2013', author: '', description: 'April 2013', category: 'Nabodisha Journal' },
  { id: 64, title: 'Nabodisha - December 2012', author: '', description: 'December 2012', category: 'Nabodisha Journal' },

  // ── Other Materials (Gram Panchayat Reports) ──────────────────────────────────
  { id: 65, title: 'Mednabari GP Education Initiative Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative with Ahead Initiatives', category: 'Other Materials' },
  { id: 66, title: 'Kalchini Panchayat Samiti Education Initiative Report (Bengali)', author: '', description: 'A report by Kalchini PS documenting the partnership initiative', category: 'Other Materials' },
  { id: 67, title: 'Kantabari GP Education Initiative Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 68, title: 'Tonto GP Food & Livelihood Security Report (Hindi)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 69, title: 'Kusmi GP Food & Livelihood Security Report (Oriya)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 70, title: 'Udaipur GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 71, title: 'Baroghoria GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 72, title: 'Jharalta II GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 73, title: 'Magurmari I GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 74, title: 'Boaldar GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 75, title: 'Serendhi GP Education Initiative Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 76, title: 'Burda Kalimati GP Education Initiative Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 77, title: 'Boaldhar GP Education Initiative Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 78, title: 'Bhetaguri-I GP Education Initiative Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 79, title: 'Satali GP Education Initiative Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 80, title: 'Burda Kalimati GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 81, title: 'Nakaijuri GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
  { id: 82, title: 'Salbari II GP Food & Livelihood Security Report (Bengali)', author: '', description: 'A report by the GP documenting the partnership initiative', category: 'Other Materials' },
];

// ─── Constants ──────────────────────────────────────────────────────────────────
const categories: ('All' | Category)[] = [
  'All',
  'English Publications',
  'Bengali Publications',
  'Nabodisha Journal',
  'Other Materials',
];

const categoryBadgeStyles: Record<Category, string> = {
  'English Publications': 'bg-blue-100 text-blue-800',
  'Bengali Publications': 'bg-emerald-100 text-emerald-800',
  'Nabodisha Journal': 'bg-amber-100 text-amber-800',
  'Other Materials': 'bg-purple-100 text-purple-800',
};

const categoryIconBg: Record<Category, string> = {
  'English Publications': 'bg-blue-50 text-blue-600',
  'Bengali Publications': 'bg-emerald-50 text-emerald-600',
  'Nabodisha Journal': 'bg-amber-50 text-amber-600',
  'Other Materials': 'bg-purple-50 text-purple-600',
};

// ─── Component ──────────────────────────────────────────────────────────────────
export default function PrintedMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return documents.filter((doc) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'All' || doc.category === activeCategory;

      // Search filter (across title + description)
      const matchesSearch =
        query === '' ||
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const searchFiltered = documents.filter(
      (doc) =>
        query === '' ||
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query)
    );

    const counts: Record<string, number> = { All: searchFiltered.length };
    for (const cat of categories.slice(1)) {
      counts[cat] = searchFiltered.filter((d) => d.category === cat).length;
    }
    return counts;
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-white font-[Inter]">
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #1E3F66 0%, #162d4a 60%, #0f1f33 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-white/[0.03]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Library className="h-7 w-7 text-white" />
            </div>
            <span className="rounded-full bg-[#e07a5f]/20 px-4 py-1.5 text-sm font-medium text-[#e07a5f]">
              Resource Library
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Printed Materials
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-blue-100/80 sm:text-xl">
            Explore our comprehensive library of publications, journals, leaflets, 
            and reports — resources developed for education, livelihood, and 
            community empowerment across India.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { label: 'Publications', value: '82' },
              { label: 'Categories', value: '4' },
              { label: 'Languages', value: '4' },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-blue-200/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search & Filter Section ──────────────────────────────────────────── */}
      <section className="bg-[#f9fafb] border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Search bar */}
          <div className="relative max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search publications by title or description…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#1E3F66] focus:outline-none focus:ring-2 focus:ring-[#1E3F66]/20 transition-all duration-200"
            />
          </div>

          {/* Category filter pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/30
                    ${
                      isActive
                        ? 'bg-[#e07a5f] text-white shadow-md shadow-[#e07a5f]/25'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#e07a5f]/40 hover:text-[#e07a5f]'
                    }
                  `}
                >
                  {cat}
                  <span
                    className={`
                      inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold
                      ${isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'}
                    `}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Results Section ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Results count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-semibold text-gray-900">
              {filteredDocuments.length}
            </span>{' '}
            {filteredDocuments.length === 1 ? 'publication' : 'publications'}
            {activeCategory !== 'All' && (
              <span>
                {' '}
                in{' '}
                <span className="font-medium text-[#1E3F66]">
                  {activeCategory}
                </span>
              </span>
            )}
            {searchQuery.trim() && (
              <span>
                {' '}
                for &ldquo;
                <span className="font-medium text-[#1E3F66]">
                  {searchQuery.trim()}
                </span>
                &rdquo;
              </span>
            )}
          </p>
        </div>

        {/* Card grid or empty state */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => (
              <article
                key={doc.id}
                className="group relative flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-200"
              >
                {/* Top row: icon + badge */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryIconBg[doc.category]} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {doc.category === 'Nabodisha Journal' ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${categoryBadgeStyles[doc.category]}`}
                  >
                    {doc.category === 'English Publications'
                      ? 'English'
                      : doc.category === 'Bengali Publications'
                        ? 'Bengali'
                        : doc.category === 'Nabodisha Journal'
                          ? 'Nabodisha'
                          : 'GP Report'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-semibold leading-snug text-gray-900 group-hover:text-[#1E3F66] transition-colors duration-200">
                  {doc.title}
                </h3>

                {/* Author (if present) */}
                {doc.author && (
                  <p className="mt-1.5 text-sm font-medium text-[#2d6a4f]">
                    {doc.author}
                  </p>
                )}

                {/* Description */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                  {doc.description}
                </p>

                {/* Subtle bottom accent on hover */}
                <div className="mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#e07a5f] to-[#1E3F66] transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#f9fafb] py-20 px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              No publications found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              We couldn&apos;t find any publications matching your search
              criteria. Try adjusting your search terms or clearing the category
              filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-6 rounded-lg bg-[#1E3F66] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#162d4a] focus:outline-none focus:ring-2 focus:ring-[#1E3F66]/30"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

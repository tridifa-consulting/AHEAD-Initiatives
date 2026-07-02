import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aheadinitiatives.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AHEAD Initiatives — Addressing Hunger, Empowerment and Development",
  description:
    "AHEAD Initiatives is a registered not-for-profit in Eastern India focused on local self-governance, natural resource management, and contextual education.",
  keywords: [
    "AHEAD Initiatives", "NGO", "Eastern India", "self-governance", "food security",
    "rural education", "Panchayati Raj", "natural resource management",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "AHEAD Initiatives",
    description:
      "Addressing Hunger, Empowerment and Development through local self-governance in Eastern India.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "AHEAD Initiatives",
  url: siteUrl,
  logo: `${siteUrl}/logo.jpg`,
  foundingDate: "2009-04-20",
  address: {
    "@type": "PostalAddress",
    streetAddress: "32/6 Gariahat Road (S)",
    addressLocality: "Kolkata",
    postalCode: "700031",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  email: "ahead@aheadinitiatives.in",
  telephone: "+91-33-40670369",
  sameAs: [
    "https://www.linkedin.com/company/theahead-initiatives/",
    "https://www.youtube.com/@aheadinitiatives4836",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

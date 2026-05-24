import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AHEAD Initiatives — Addressing Hunger, Empowerment and Development",
  description:
    "AHEAD Initiatives is a registered not-for-profit in Eastern India focused on local self-governance, natural resource management, and contextual education.",
  keywords: [
    "AHEAD Initiatives",
    "NGO",
    "Eastern India",
    "self-governance",
    "food security",
    "rural education",
    "Panchayati Raj",
    "natural resource management",
  ],
  openGraph: {
    title: "AHEAD Initiatives",
    description:
      "Addressing Hunger, Empowerment and Development through local self-governance in Eastern India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

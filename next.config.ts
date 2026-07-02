import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // old multi-page routes now live as chapters of the single flow
      { source: "/about", destination: "/#story", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/resources/print", destination: "/#publications", permanent: true },
      // previously-broken nav targets — resolve to the nearest chapter
      { source: "/resources/av", destination: "/#media", permanent: false },
      { source: "/resources/gallery", destination: "/#field", permanent: false },
    ];
  },
};

export default nextConfig;

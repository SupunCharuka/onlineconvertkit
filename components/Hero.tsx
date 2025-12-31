import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-10 shadow-2xl">
      <div className="absolute -left-20 -bottom-10 w-56 h-56 bg-white/10 blur-3xl rounded-full mix-blend-overlay pointer-events-none" />
      <div className="absolute right-6 top-0 w-48 h-48 bg-white/10 blur-2xl rounded-full mix-blend-overlay pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">All-in-one Converter</h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl">Fast, private image and unit converters that run entirely in your browser — no logging, no accounts. Optimized for performance and SEO.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/image-converter/png-to-jpg" className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 px-5 py-2 font-semibold shadow hover:scale-[1.02] transition-transform">
            Try PNG → JPG
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M10 5v10m5-5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/unit-converter/meters-to-feet" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 text-white px-4 py-2 font-medium hover:bg-white/20 transition">
            Try Meters → Feet
          </Link>
        </div>

        <div className="mt-8 text-sm text-white/80 flex flex-wrap gap-2">
          <span className="mr-2 font-medium opacity-90">Built with:</span>
          <span className="inline-block bg-white/10 px-2 py-0.5 rounded">Client-side Canvas</span>
          <span className="inline-block bg-white/10 px-2 py-0.5 rounded ml-2">SSG pages</span>
          <span className="inline-block bg-white/10 px-2 py-0.5 rounded ml-2">no logging</span>
        </div>
      </div>
    </header>
  );
}

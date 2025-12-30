import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-10 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">All-in-one Converter</h1>
        <p className="mt-4 text-lg text-indigo-100/90 max-w-2xl">Fast, private image and unit converters that run entirely in your browser — no uploads, no accounts. Optimized for performance and SEO.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/image-converter/png-to-jpg" className="inline-block rounded-md bg-white/90 text-indigo-700 px-4 py-2 font-medium shadow hover:bg-white">
            Try PNG → JPG
          </Link>
          <Link href="/unit-converter/meters-to-feet" className="inline-block rounded-md bg-white/10 border border-white/30 text-white px-4 py-2 font-medium hover:bg-white/20">
            Try Meters → Feet
          </Link>
        </div>

        <div className="mt-8 text-sm text-indigo-100/80">
          <span className="mr-2">Built with:</span>
          <span className="inline-block bg-white/10 px-2 py-0.5 rounded">Client-side Canvas</span>
          <span className="inline-block bg-white/10 px-2 py-0.5 rounded ml-2">SSG pages</span>
        </div>
      </div>
    </header>
  );
}

import React from "react";
import Link from "next/link";
import { unitConverters } from "../../data/unitConverters";

export default function UnitIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50">Unit Converters</h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">Quick, private unit conversions running entirely in your browser.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {unitConverters.map((c) => (
            <Link key={c.slug} href={`/unit-converter/${c.slug}`} className="group block rounded-2xl p-4 relative overflow-hidden bg-gradient-to-b from-white/60 to-white/30 dark:from-black/50 dark:to-black/30 border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-transform transform-gpu hover:-translate-y-1">
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-500/8 via-purple-400/6 to-pink-400/8" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                        <path d="M12 3v10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">{c.from} → <span className="font-semibold text-zinc-900 dark:text-zinc-50">{c.to}</span></div>
                      <div className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{c.name}</div>
                    </div>
                  </div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 opacity-80 group-hover:opacity-100">Open →</div>
                </div>

                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 flex-1">{c.description}</p>

                <div className="mt-4 flex items-center gap-2 flex-wrap hidden">
                  {c.keywords.slice(0, 3).map((k) => (
                    <span key={k} className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{k}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

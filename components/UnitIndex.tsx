"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { unitConverters } from "../data/unitConverters";

export default function UnitIndex() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<string>("All");

    const categories = useMemo(() => {
        const set = new Set<string>();
        for (const c of unitConverters) set.add(c.category ?? "Other");
        return ["All", ...Array.from(set)];
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return unitConverters.filter((c) => {
            if (category !== "All" && (c.category ?? "Other") !== category) return false;
            if (!q) return true;
            return (
                c.name.toLowerCase().includes(q) ||
                c.slug.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q) ||
                c.from.toLowerCase().includes(q) ||
                c.to.toLowerCase().includes(q)
            );
        });
    }, [query, category]);

    const grouped = useMemo(() => {
        const g: Record<string, typeof unitConverters> = {} as any;
        for (const c of filtered) {
            const cat = c.category ?? "Other";
            if (!g[cat]) g[cat] = [];
            g[cat].push(c);
        }
        return g;
    }, [filtered]);

    function highlight(text: string, q: string) {
        if (!q) return text;
        const idx = text.toLowerCase().indexOf(q.toLowerCase());
        if (idx === -1) return text;
        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + q.length);
        const after = text.slice(idx + q.length);
        return (
            <>
                {before}
                <mark className="bg-yellow-200/80 dark:bg-yellow-600/40 rounded px-0.5">{match}</mark>
                {after}
            </>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                            <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="11" cy="11" r="6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <input
                        aria-label="Search converters"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search converters, e.g. 'm to ft'"
                        className="w-full rounded-lg border px-10 py-3 bg-white/60 dark:bg-black/40 placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-300"
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700">
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 6l8 8M6 14L14 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <button onClick={() => setCategory("All")} className={`px-3 py-1 rounded-full text-sm ${category === 'All' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                        All
                    </button>
                    {categories.slice(1).map((c) => (
                        <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full text-sm ${category === c ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'} hover:scale-[1.02] transition`}>{c}</button>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                {Object.keys(grouped).length === 0 && (
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">No converters match your filter.</div>
                )}

                {Object.keys(grouped).map((cat) => (
                    <section key={cat}>
                        <h3 className="text-xl font-semibold mb-4">{cat}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {grouped[cat].map((c) => (
                                <Link key={c.slug} href={`/unit-converter/${c.slug}`} className="group block rounded-2xl p-4 relative overflow-hidden bg-gradient-to-b from-white/60 to-white/30 dark:from-black/50 dark:to-black/30 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-transform transform-gpu hover:-translate-y-1 hover:scale-[1.01]">
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
                                                    <div className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{highlight(c.name, query) as any}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-indigo-600 dark:text-indigo-400 opacity-80 group-hover:opacity-100">Open →</div>
                                        </div>

                                        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 flex-1">{highlight(c.description, query) as any}</p>
                                        <div className="mt-4 flex items-center gap-2 flex-wrap hidden">
                                            {c.keywords.slice(0, 3).map((k) => (
                                                <span key={k} className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{k}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

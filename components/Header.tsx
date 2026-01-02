"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        try {
            const stored = localStorage.getItem('theme');
            const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initial = (stored === 'light' || stored === 'dark') ? (stored as 'light' | 'dark') : (prefersDark ? 'dark' : 'light');
            setTheme(initial);
            applyTheme(initial);
        } catch (e) {
            // ignore
        }
    }, []);

    function applyTheme(t: 'light' | 'dark') {
        const root = document.documentElement;
        if (t === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
    }

    function toggleTheme() {
        const next = theme === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem('theme', next);
        } catch (e) {}
        setTheme(next);
        applyTheme(next);
    }
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-100 dark:border-zinc-800 bg-white/60 dark:bg-black/50 backdrop-blur-lg">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <img src="/logo.svg" alt="OnlineConvertKit" className="w-11 h-11 rounded-lg shadow-xl object-cover" />
                    <div className="hidden sm:block">
                        <div className="text-lg font-extrabold tracking-tight leading-none">OnlineConvertKit</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 -mt-0.5">all-in-one</div>
                    </div>
                </Link>

                <nav aria-label="Primary" className="hidden md:flex items-center gap-6 mx-auto">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/image-converter">Images</NavLink>
                    <NavLink href="/unit-converter">Units</NavLink>
                    <NavLink href="/math">Math</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </nav>

                <div className="ml-auto hidden md:flex items-center gap-3">
                    <Link href="/math" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow hover:scale-[1.02] transition-transform">Try Math</Link>
                    <button
                        aria-label="Toggle theme"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        aria-pressed={theme === 'dark'}
                        onClick={toggleTheme}
                        className="p-2 rounded-md bg-white/80 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700 hover:scale-105 transition">
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </button>
                </div>

                <div className="md:hidden ml-auto flex items-center gap-2">
                    <button
                        aria-label="Toggle theme"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        aria-pressed={theme === 'dark'}
                        onClick={toggleTheme}
                        className="p-2 rounded-md bg-white/80 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700 shadow-sm">
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </button>

                    <button aria-expanded={open} aria-label="Open menu" onClick={() => setOpen((v) => !v)} className="p-2 rounded-md bg-white/70 dark:bg-black/30 shadow-sm">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            {open ? (
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </button>
                </div>

                {open && (
                    <div className="absolute left-4 right-4 top-16 z-40 bg-gradient-to-b from-white/95 to-white/90 dark:from-zinc-900/90 dark:to-black/80 rounded-lg shadow-2xl p-4 md:hidden">
                        <ul className="flex flex-col gap-2">
                            <li><Link href="/" onClick={() => setOpen(false)} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Home</Link></li>
                            <li><Link href="/image-converter" onClick={() => setOpen(false)} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Images</Link></li>
                            <li><Link href="/unit-converter/meters-to-feet" onClick={() => setOpen(false)} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Units</Link></li>
                            <li><Link href="/math" onClick={() => setOpen(false)} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Math</Link></li>
                            <li><Link href="/contact" onClick={() => setOpen(false)} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">Contact</Link></li>
                            <li className="mt-2"><Link href="/math" onClick={() => setOpen(false)} className="block text-center rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2">Try Math</Link></li>
                            <li className="mt-2 flex justify-center">
                                <button
                                    onClick={() => { toggleTheme(); setOpen(false); }}
                                    className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm px-4 py-2">
                                    {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href ?? '');

    return (
        <Link
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`relative text-sm ${isActive ? 'text-indigo-600 dark:text-indigo-300 font-semibold' : 'text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white'}`}>
            <span className={`after:block after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'hover:after:w-full'}`}>{children}</span>
        </Link>
    );
}

"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    // avoid reading localStorage during render to prevent hydration mismatch
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // on mount, read saved preference or system preference and mark mounted
    useEffect(() => {
        setMounted(true);
        try {
            const s = localStorage.getItem('theme');
            if (s === 'dark' || s === 'light') {
                setTheme(s as 'dark' | 'light');
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            }
        } catch (e) {}
    }, []);

    useEffect(() => {
        try {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.body.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.body.classList.remove('dark');
                document.body.classList.add('theme-light');
            }
            if (theme === 'dark') {
                document.body.classList.remove('theme-light');
            }
            // add a short transition class to animate the change
            try {
                document.body.classList.add('theme-change');
                window.setTimeout(() => document.body.classList.remove('theme-change'), 420);
            } catch (e) {}

            localStorage.setItem('theme', theme);
        } catch (e) {}
    }, [theme]);

    function toggleTheme() {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    }

    return (
        <header className="border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-b from-white/50 to-transparent dark:from-black/40 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md transform-gpu hover:scale-105 transition"> 
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                            <path d="M12 3v10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-lg font-extrabold tracking-tight leading-none">Converter</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 -mt-0.5">all-in-one</div>
                    </div>
                </Link>

                <nav aria-label="Primary" className="hidden md:flex items-center gap-6 ml-auto">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/image-converter/png-to-jpg">Images</NavLink>
                    <NavLink href="/unit-converter/meters-to-feet">Units</NavLink>
                    <button onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label="Toggle theme" className="ml-2 p-2 rounded-md bg-white/60 dark:bg-black/30 shadow-sm">
                        {mounted ? (
                        theme === 'dark' ? (
                            <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) ) : (
                            <svg className="w-5 h-5 opacity-0" aria-hidden>
                                <circle cx="2" cy="2" r="2" />
                            </svg>
                        )}
                    </button>

                </nav>

                <div className="md:hidden ml-auto flex items-center gap-2">
                    <button onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label="Toggle theme" className="p-2 rounded-md bg-white/60 dark:bg-black/30 shadow-sm">
                        {mounted ? (
                        theme === 'dark' ? (
                            <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                                <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        ) ) : (
                            <svg className="w-5 h-5 opacity-0" aria-hidden>
                                <circle cx="2" cy="2" r="2" />
                            </svg>
                        )}
                    </button>
                    <button aria-expanded={open} aria-label="Open menu" onClick={() => setOpen((v) => !v)} className="p-2 rounded-md bg-white/60 dark:bg-black/30 shadow-sm">
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
                    <div className="absolute left-4 right-4 top-20 z-40 bg-white/90 dark:bg-black/80 rounded-lg shadow-lg p-4 md:hidden">
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900">Home</Link></li>
                            <li><Link href="/image-converter/png-to-jpg" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900">Images</Link></li>
                            <li><Link href="/unit-converter/meters-to-feet" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900">Units</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="relative text-sm text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white">
            <span className="after:block after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full">{children}</span>
        </Link>
    );
}

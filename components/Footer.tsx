import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-gradient-to-t from-white/70 dark:from-black/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl flex-shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                            <path d="M12 3v10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Converter</div>
                        <div className="text-xs text-zinc-500">© {new Date().getFullYear()} — Client-side only</div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start w-full md:w-auto">
                    <Link href="/privacy" className="px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300">Privacy</Link>
                    <Link href="/terms" className="px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300">Terms</Link>
                    <Link href="#" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 21s-6-4.35-9-7.18C-1 9.27 3 3.5 9 6c0 0 1-1 3-1s3 1 3 1c6-2.5 10 3.27 6 7.82C18 16.65 12 21 12 21z" /></svg>
                        <span className="text-xs">Made with care</span>
                    </Link>
                </div>

               
            </div>
        </footer>
    );
}

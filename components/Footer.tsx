import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from-white/60 to-transparent dark:from-black/40 border-t border-zinc-100 dark:border-zinc-800">
            <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-zinc-600 dark:text-zinc-400 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm"> 
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                            <path d="M12 3v10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>© {new Date().getFullYear()} Converter — Client-side only</div>
                </div>

                <div className="flex items-center gap-4">
                    <a href="/" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900">Privacy</a>
                    <a href="/" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900">Terms</a>
                    <a href="#" className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-red-500">
                        Made with <svg className="w-4 h-4 text-red-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6-4.35-9-7.18C-1 9.27 3 3.5 9 6c0 0 1-1 3-1s3 1 3 1c6-2.5 10 3.27 6 7.82C18 16.65 12 21 12 21z"/></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

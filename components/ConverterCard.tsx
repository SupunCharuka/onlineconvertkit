import React from "react";
import Link from "next/link";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";

type Props = { converter: ImageConverter | UnitConverter; kind: "image" | "unit" };

export default function ConverterCard({ converter, kind }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 shadow-sm hover:shadow-lg transition transform-gpu hover:-translate-y-0.5">
      <div className="absolute -top-6 -right-10 w-36 h-36 bg-gradient-to-br from-indigo-200 to-pink-200 opacity-30 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:from-indigo-900 dark:to-pink-800 dark:opacity-10" />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{converter.name}</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 max-w-xl">{converter.description}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-xs font-medium">{kind === 'image' ? 'Image' : 'Unit'}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link href={`/${kind}-converter/${converter.slug}`} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-semibold shadow hover:scale-[1.02] transition-transform">
          Open
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414L9.414 16H6v-3.414L12.293 3.293z" clipRule="evenodd" />
          </svg>
        </Link>

        <div className="text-xs text-zinc-500 flex items-center gap-2 hidden">
          {converter.keywords?.slice(0,3).map((k) => (
            <span key={k} className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">{k}</span>
          ))}
          {!converter.keywords && <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">{converter.from} → {converter.to}</span>}
        </div>
      </div>
    </article>
  );
}

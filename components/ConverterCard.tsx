import React from "react";
import Link from "next/link";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";

type Props = { converter: ImageConverter | UnitConverter; kind: "image" | "unit" };

export default function ConverterCard({ converter, kind }: Props) {
  return (
    <article className="group bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{converter.name}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{converter.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <Link href={`/${kind}-converter/${converter.slug}`} className="text-indigo-600 hover:underline font-medium">
          Open converter
        </Link>
        <div className="text-xs text-zinc-500">{converter.keywords?.[0] ?? converter.from + " → " + converter.to}</div>
      </div>
    </article>
  );
}

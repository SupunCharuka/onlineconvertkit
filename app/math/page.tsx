import React from "react";
import ConverterClient from "../../components/ConverterClient";
import SeoContent from "../../components/SeoContent";

export const metadata = {
  title: 'Math Converter',
  description: 'Numeric and symbolic math converter — evaluate, simplify, differentiate, integrate in the browser.'
};

export default function MathPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50">Math Converter</h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">Evaluate numeric expressions and perform symbolic operations locally in your browser.</p>
        </header>

        <section className="bg-white dark:bg-zinc-900 rounded-xl border p-6">
          <ConverterClient mode="math" />
        </section>
      </div>
    </main>
  );
}

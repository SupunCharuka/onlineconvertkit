import Link from "next/link";
import { imageConverters } from "../data/imageConverters";
import { unitConverters } from "../data/unitConverters";
import Hero from "../components/Hero";
import ConverterCard from "../components/ConverterCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-16 px-6">
      <div className="mx-auto max-w-6xl relative">
        {/* decorative blob */}
        <div className="pointer-events-none hidden md:block absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-pink-200 opacity-40 blur-3xl rounded-full mix-blend-multiply dark:from-indigo-900 dark:to-pink-800 dark:opacity-20" />

        <Hero />

        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-zinc-600 dark:text-zinc-300">Quick, private converters that run entirely in your browser — image formats, units, and symbolic math. No logging, no tracking, just fast client-side tools.</p>
        </div>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Image Converters</h2>
              <p className="text-sm text-zinc-500 mt-1">Resize, convert, and prepare images for the web.</p>
            </div>
            <Link href="/image-converter" className="text-sm text-indigo-600 font-medium">See all</Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {imageConverters.slice(0, 4).map((c) => (
              <div key={c.slug} className="transform-gpu hover:scale-[1.02] transition-shadow transition-transform shadow-sm hover:shadow-lg rounded-xl">
                <ConverterCard converter={c} kind="image" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Unit Converters</h2>
              <p className="text-sm text-zinc-500 mt-1">Find units, convert instantly, and copy results.</p>
            </div>
            <Link href="/unit-converter" className="text-sm text-indigo-600 font-medium">See all</Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {unitConverters.slice(0, 4).map((c) => (
              <div key={c.slug} className="transform-gpu hover:scale-[1.02] transition-shadow transition-transform shadow-sm hover:shadow-lg rounded-xl">
                <ConverterCard converter={c} kind="unit" />
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Built with Next.js App Router — SEO-first, client-side converters, no logging.</div>
          <div className="mt-4 text-xs text-zinc-400">Tip: open the Math converter for symbolic operations and step-by-step examples.</div>
        </footer>
      </div>
    </main>
  );
}

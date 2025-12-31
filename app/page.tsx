import Link from "next/link";
import { imageConverters } from "../data/imageConverters";
import { unitConverters } from "../data/unitConverters";
import Hero from "../components/Hero";
import ConverterCard from "../components/ConverterCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <Hero />

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Image Converters</h2>
            <Link href="/image-converter" className="text-sm text-indigo-600">See all</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {imageConverters.map((c) => (
              <ConverterCard key={c.slug} converter={c} kind="image" />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Unit Converters</h2>
            <Link href="/unit-converter" className="text-sm text-indigo-600">See all</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {unitConverters.map((c) => (
              <ConverterCard key={c.slug} converter={c} kind="unit" />
            ))}
          </div>
        </section>

        <footer className="mt-16 text-center text-sm text-zinc-500">
          Built with Next.js App Router — SEO-first, client-side conversions, and no uploads.
        </footer>
      </div>
    </main>
  );
}

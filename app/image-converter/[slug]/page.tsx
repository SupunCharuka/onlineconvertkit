import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { imageConverters, imageConverterBySlug, allImageSlugs } from "../../../data/imageConverters";
import SeoContent, { generateMetaDescription } from "../../../components/SeoContent";
import FAQ, { FAQJsonLd } from "../../../components/FAQ";
import ConverterClient from "../../../components/ConverterClient";

type Params = { slug: string | string[] };

export async function generateStaticParams() {
  return allImageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params | Promise<Params> }): Promise<Metadata> {
  const resolved = await params;
  const slug = Array.isArray(resolved?.slug) ? resolved.slug[0] : resolved?.slug ?? "";
  if (!slug) return ({ title: "Converter not found" } as Metadata);
  const converter = imageConverterBySlug[slug];
  if (!converter) return ({ title: "Converter not found" } as Metadata);
  const title = `${converter.name} — ${converter.from} to ${converter.to}`;
  const description = generateMetaDescription(converter);
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Page({ params }: { params: Params | Promise<Params> }) {
  const resolved = await params;
  const slug = Array.isArray(resolved?.slug) ? resolved.slug[0] : resolved?.slug ?? "";
  const converter = slug ? imageConverterBySlug[slug] : undefined;
  if (!converter) {
    return <div>Converter not found.</div>;
  }

  const faqs = [
    { question: `Is ${converter.name} free to use?`, answer: `Yes — ${converter.name} runs in your browser and is free to use.` },
    { question: `Do files leave my device?`, answer: `No. All processing happens locally in your browser with no uploads.` },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-700 dark:text-zinc-300">{converter.name}</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50">{converter.name}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{converter.description}</p>
        </header>

        {/* Full-width converter row */}
        <section className="mb-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Convert {converter.from} → {converter.to}</h2>
          <ConverterClient mode="image" imageConverter={converter} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mt-0">
              <h3 className="text-lg font-semibold">About this converter</h3>
              <div className="prose max-w-none dark:prose-invert mt-4">
                <SeoContent converter={converter} />
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <section className="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <h4 className="text-sm font-semibold">Related converters</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {converter.related?.map((s) => (
                  <li key={s}>
                    <Link className="text-indigo-600 hover:underline" href={`/image-converter/${s}`}>{imageConverterBySlug[s]?.name ?? s}</Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <h4 className="text-sm font-semibold">FAQ</h4>
              <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                <FAQ faqs={faqs} />
              </div>
            </section>
          </aside>
        </div>

        <FAQJsonLd faqs={faqs} url={`https://example.com/image-converter/${converter.slug}`} name={converter.name} />
      </div>
    </main>
  );
}

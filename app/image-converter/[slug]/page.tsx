import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { imageConverters, imageConverterBySlug, allImageSlugs } from "../../../data/imageConverters";
import SeoContent, { generateMetaDescription } from "../../../components/SeoContent";
import buildConverterMetadata, { generateConverterJsonLd } from "../../../lib/seo";
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
  const url = `https://onlineconvertkit.com/image-converter/${slug}`;
  return buildConverterMetadata(converter, url);
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
    { question: `Do files leave my device?`, answer: `No. All processing happens locally in your browser with no logging.` },
    { question: `Which file formats are supported?`, answer: `This converter supports common formats such as PNG, JPEG, WebP, and GIF. For HEIC/HEIF or PDF support the app may dynamically load optional libraries when needed.` },
    { question: `Are there file size limits?`, answer: `Large files may hit browser memory limits; typical practical limits depend on device RAM and browser — try resizing large images before converting or use smaller batches.` },
    { question: `Which browsers work best?`, answer: `Modern Chromium-based browsers, recent Firefox, and Safari provide the best Canvas and Web API support. Older browsers may lack some format encoders.` },
    { question: `How is quality controlled?`, answer: `Use the quality slider and resize options in the converter UI to balance file size and visual fidelity. You can preview results before downloading.` },
    { question: `How do I report a problem or suggest a format?`, answer: `Open an issue in the project's repository or contact the maintainer via the links in the README — include a sample file and browser details if possible.` },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/image-converter">Images Converters</Link>
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
              <div className="rounded-2xl p-6 bg-white/70 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-none p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/25 text-indigo-600 dark:text-indigo-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24M15.83 15.83l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24M15.83 8.17l4.24-4.24" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">About this converter</h3>
                    <div className="prose max-w-none dark:prose-invert mt-4">
                      <SeoContent converter={converter} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <section className="rounded-xl p-4 bg-white/60 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
                Related converters
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {converter.related?.map((s) => (
                  <li key={s}>
                    <Link href={`/image-converter/${s}`} className="flex items-center justify-between p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      <span className="text-indigo-600 font-medium">{imageConverterBySlug[s]?.name ?? s}</span>
                      <span className="text-xs text-zinc-500">Open</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl p-4 bg-white/60 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 8V7a2 2 0 00-2-2h-3.6a2 2 0 01-1.79-1.1L12 1 9.39 2.9A2 2 0 017.6 4H4a2 2 0 00-2 2v1" />
                </svg>
                FAQ
              </h4>
              <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                <FAQ faqs={faqs} />
              </div>
            </section>
          </aside>
        </div>

        <FAQJsonLd faqs={faqs} url={`https://onlineconvertkit.com/image-converter/${converter.slug}`} name={converter.name} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateConverterJsonLd(converter, `https://onlineconvertkit.com/image-converter/${converter.slug}`)) }} />
      </div>
    </main>
  );
}

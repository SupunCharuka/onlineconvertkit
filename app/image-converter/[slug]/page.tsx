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
    <main>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <h1>{converter.name}</h1>
      <p>{converter.description}</p>

      <section>
        <ConverterClient mode="image" imageConverter={converter} />
      </section>

      <section>
        <h2>About this converter</h2>
        <SeoContent converter={converter} />
      </section>

      <section>
        <h2>Related converters</h2>
        <ul>
          {converter.related?.map((s) => (
            <li key={s}>
              <Link href={`/image-converter/${s}`}>{imageConverterBySlug[s]?.name ?? s}</Link>
            </li>
          ))}
        </ul>
      </section>

      <FAQ faqs={faqs} />
      <FAQJsonLd faqs={faqs} url={`https://example.com/image-converter/${converter.slug}`} name={converter.name} />
    </main>
  );
}

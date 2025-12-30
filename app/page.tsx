import Link from "next/link";
import { imageConverters } from "../data/imageConverters";
import { unitConverters } from "../data/unitConverters";

export default function Home() {
  return (
    <main style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <header>
        <h1>All-in-one Converter — Image & Unit Tools</h1>
        <p>Fast, private converters that run in your browser. No uploads, no accounts.</p>
      </header>

      <section>
        <h2>Image Converters</h2>
        <ul>
          {imageConverters.map((c) => (
            <li key={c.slug}>
              <Link href={`/image-converter/${c.slug}`}>{c.name}</Link> — {c.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Unit Converters</h2>
        <ul>
          {unitConverters.map((c) => (
            <li key={c.slug}>
              <Link href={`/unit-converter/${c.slug}`}>{c.name}</Link> — {c.description}
            </li>
          ))}
        </ul>
      </section>

      <footer style={{ marginTop: 48 }}>
        <p>Built with Next.js App Router — SSG pages for each converter for SEO-friendly URLs.</p>
      </footer>
    </main>
  );
}

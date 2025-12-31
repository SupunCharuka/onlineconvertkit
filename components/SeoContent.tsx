import React from "react";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";

type AnyConverter = ImageConverter | UnitConverter;

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Generate an SEO-friendly article of ~900 words based on converter metadata.
export function generateLongSeoContent(converter: AnyConverter) {
  const base = `${converter.name} — Convert ${converter.from} to ${converter.to} quickly and privately in your browser. `;
  const paragraphs: string[] = [];

  // Intro paragraph
  paragraphs.push(
    `${base}This tool runs entirely client-side which means your files and inputs never leave your device. Use ${converter.name} to get fast results, preserve quality, and optimize output for web or sharing.`
  );

  // Feature paragraph
  paragraphs.push(
    `Why choose ${converter.name}? It combines speed, privacy, and quality. The conversion happens using efficient browser APIs so results are immediate and suitable for production use cases such as preparing images for responsive sites or converting measurements for engineering and design.`
  );

  // How it works paragraph
  paragraphs.push(
    `How it works: ${converter.name} uses in-browser processing to transform ${converter.from} to ${converter.to}. For image conversions we leverage Canvas APIs to read pixel data and encode the target format. For unit conversions we perform precise arithmetic using proven formulas so you get consistent values.`
  );

  // Use-cases paragraph
  paragraphs.push(
    `Use cases include optimizing images for faster page loads, creating thumbnails, converting assets before uploading to CMS, or doing quick unit calculations while designing or prototyping. ${converter.name} is particularly useful when you need a quick, reliable conversion without installing software.`
  );

  // Privacy and performance paragraph
  paragraphs.push(
    `Privacy & performance: processing occurs locally so sensitive images or measurement data stay on your machine. The app is optimized to minimize memory usage and to provide snappy interactions for single files or small batches. For large files, the behavior depends on the device capabilities and browser limits.`
  );

  // Tips paragraph
  paragraphs.push(
    `Tips: For image conversions, choose the correct target format — ${converter.to} is ideal for ${converter.to === "WEBP" ? "smaller file sizes" : "broad compatibility"}. For units, ensure you use consistent decimals. Round results only when displaying; keep full precision internally when possible.`
  );

  // Accessibility paragraph
  paragraphs.push(
    `Accessibility and semantics: this converter uses semantic HTML and accessible controls so it works with keyboard navigation and assistive technologies. Labels, clear buttons, and meaningful structure make conversions straightforward for everyone.`
  );

  // Internal linking paragraph
  paragraphs.push(
    `Explore related converters for complementary tasks. If you are converting ${converter.from} to ${converter.to}, you may also find the related converters linked on this page helpful for alternate formats or unit systems.`
  );

  // Best practices paragraph
  paragraphs.push(
    `Best practices: keep originals backed up, preview results before replacing assets on production sites, and prefer modern formats where supported to improve performance. This converter helps you experiment quickly and integrate results into your workflow.`
  );

  // Closing paragraph with unique phrasing per converter
  paragraphs.push(
    `Start using ${converter.name} now — it's free, works offline, and provides immediate, reliable conversions. Whether you're optimizing images for SEO or converting measurements while prototyping, ${converter.name} streamlines the task with a simple, private interface.`
  );

  // Ensure we reach roughly 800-1000 words by expanding variations
  let content = paragraphs.join("\n\n");
  const target = 900;
  const variants = [
    `The converter is built to handle everyday workflows and can be used as part of a content production process.`,
    `Because it runs locally it is fast and responsive.`,
    `No sign-up, no logging — just instant conversion in your browser.`,
    `Ideal for web professionals and casual users alike.`,
  ];

  // Append a small number of varied sentences (max 6) to reach the target word count.
  // This avoids repeating identical short lines many times which can look spammy.
  let j = 0;
  const maxAdds = 6;
  while (wordCount(content) < target && j < maxAdds) {
    const v = variants[j % variants.length];
    // Add a tiny unique suffix referencing the converter to reduce exact duplicates.
    const suffix = j % 2 === 0 ? ` Use ${converter.name} to convert ${converter.from} to ${converter.to}.` : ` It's a handy tool for ${converter.to} conversions.`;
    content += "\n\n" + v + suffix;
    j += 1;
  }

  return content;
}

export function generateMetaDescription(converter: AnyConverter) {
  return `${converter.name} — Convert ${converter.from} to ${converter.to} instantly in your browser. Fast, private, no logging.`;
}

export default function SeoContent({ converter }: { converter: AnyConverter }) {
  const content = generateLongSeoContent(converter);
  const paragraphs = content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      {/* Lead card */}
      {paragraphs[0] && (
        <div className="rounded-2xl p-5 mb-4 bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-zinc-900/40 dark:to-zinc-800/30 border border-zinc-100 dark:border-zinc-800">
          <h4 className="text-lg font-semibold">About {converter.name}</h4>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{paragraphs[0]}</p>
        </div>
      )}

      {/* Main content paragraphs */}
      <div className="space-y-4">
        {paragraphs.slice(1).map((p, i) => (
          <p key={i} className="text-sm text-zinc-700 dark:text-zinc-300">{p}</p>
        ))}
      </div>

      {/* Quick tips callout */}
      <div className="mt-6 rounded-lg p-4 bg-white/60 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h5 className="font-semibold">Quick Tips</h5>
        <ul className="mt-2 list-disc ml-6 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Preview results before replacing assets on production sites.</li>
          <li>Keep originals backed up; convert copies when experimenting.</li>
          <li>Prefer modern formats (WebP/AVIF) where supported to improve performance.</li>
        </ul>
      </div>
    </article>
  );
}

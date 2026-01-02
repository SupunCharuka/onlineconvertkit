import React from "react";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";

type AnyConverter = ImageConverter | UnitConverter;

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Generate an SEO-friendly article of ~900 words based on converter metadata.
export function generateLongSeoContent(converter: AnyConverter) {
  const base = `${converter.name} is a free online tool that allows you to convert ${converter.from} to ${converter.to} directly in your browser.`;
  const paragraphs: string[] = [];

  // Intro paragraph
  paragraphs.push(
    `${base}The conversion runs entirely client-side, meaning your files and data never leave your device. This makes the tool fast, private,
    and ideal for everyday conversion tasks without installing software.`
  );

  // Why choose this converter paragraph
  paragraphs.push(
    `Why choose ${converter.name}? This converter is designed for speed, accuracy, and simplicity. Whether you are a developer, designer, student, or casual user,
    ${converter.name} helps you convert ${converter.from} to ${converter.to} in seconds. No sign-up, no tracking, and no file uploads
    are required, making it a secure choice for sensitive content. The intuitive interface allows you to drag & drop files, enter values, and get instant results with just a few clicks.`
  );

  // How it works paragraph
  paragraphs.push(
    `How it works: The conversion process happens directly in your browser using modern web technologies.
    Image conversions rely on optimized Canvas APIs to preserve quality while changing formats.
    Unit conversions use precise mathematical formulas to ensure accurate and consistent results.`
  );

  // Use-cases paragraph
  paragraphs.push(
    `Common Use Cases: ${converter.name} is commonly used for optimizing images for faster websites, preparing assets for social media,
    converting measurements during engineering or design work, and quickly transforming files before uploading them to a CMS.
    It is especially useful when you need instant results without relying on external software.`
  );

  // Privacy and performance paragraph
  paragraphs.push(
    `Privacy & performance: All conversions are processed locally on your device. This means your files remain private and are never sent to a server.
    The tool is optimized for performance and works smoothly on modern browsers. For larger files, performance depends on your device
    and available memory.`
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
    `Best practices: Always keep a backup of your original files before converting. Preview the output to ensure quality meets your needs.
    When working with images, choose the format that balances quality and file size. For unit conversions, avoid rounding values
    too early to maintain precision.`
  );

  // Closing paragraph with unique phrasing per converter
  paragraphs.push(
    `${converter.name} is a fast, free, and reliable way to convert ${converter.from} to ${converter.to} online.
    It works entirely in your browser, respects your privacy, and delivers immediate results. Whether for professional workflows or casual use, this tool is a valuable addition to your digital toolkit. Try it out today and experience hassle-free conversions!`
  );

  // Ensure we reach roughly 800-1000 words by expanding variations
  let content = paragraphs.join("\n\n");
  const target = 900;
  const variants = [
    `The converter is built to handle everyday workflows and can be used as part of a content production process.`,
    `Because it runs locally it is fast and responsive.`,
    `No sign-up, no tracking — just instant conversion in your browser.`,
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
  return `Free ${converter.name} to convert ${converter.from} to ${converter.to} online. Fast, private, and works directly in your browser.`;
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
          <li>Preview converted results before using them in production.</li>
          <li>Keep original files backed up.</li>
          <li>Use modern formats where supported for better performance.</li>
        </ul>
      </div>
    </article>
  );
}

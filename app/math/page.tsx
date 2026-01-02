import React from "react";
import ConverterClient from "../../components/ConverterClient";

export const metadata = {
  title: 'Math Converter | OnlineConvertKit',
  description: 'A powerful online math converter and solver. Simplify algebraic expressions, calculate derivatives, integrals, and evaluate complex numeric formulas instantly.',
  keywords: ['math converter', 'symbolic math solver', 'derivative calculator', 'integral solver', 'simplify expressions online'],
  openGraph: {
    title: 'Math Converter | OnlineConvertKit',
    description: 'A powerful online math converter and solver. Simplify algebraic expressions, calculate derivatives, integrals, and evaluate complex numeric formulas instantly.',
    url: 'https://onlineconvertkit.com/math',
    images: [
      { url: 'https://onlineconvertkit.com/og-1200x630.png', width: 1200, height: 630, alt: 'Math Converter' },
      { url: 'https://onlineconvertkit.com/og-600x600.png', width: 600, height: 600, alt: 'Math Converter' },
    ],
  },
};

export default function MathPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50">Math Converter</h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">Evaluate numeric expressions and perform symbolic operations locally in your browser.</p>
        </header>

        <section className="bg-white dark:bg-zinc-900 rounded-xl p-6">
          <ConverterClient mode="math" />
        </section>

        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebPage',
                  '@id': 'https://onlineconvertkit.com/math#webpage',
                  'url': 'https://onlineconvertkit.com/math',
                  'name': 'Math Converter',
                  'description': 'Numeric and symbolic math converter — evaluate, simplify, differentiate, integrate in the browser.',
                },
                {
                  '@type': 'BreadcrumbList',
                  'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://onlineconvertkit.com/' },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Math Converter', 'item': 'https://onlineconvertkit.com/math' },
                  ],
                },
                {
                  '@type': 'SoftwareApplication',
                  'name': 'Math Converter',
                  'url': 'https://onlineconvertkit.com/math',
                  'description': 'Evaluate numeric expressions and perform symbolic operations locally in your browser.',
                  'applicationCategory': 'EducationalApplication',
                },
              ],
            }),
          }}
        />
      </div>
    </main>
  );
}

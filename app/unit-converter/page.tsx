import React from "react";
import Link from "next/link";
import UnitIndex from "../../components/UnitIndex";

export const metadata = {
  title: 'Unit Converters | OnlineConvertKit',
  description: 'Quick, private unit conversions running entirely in your browser — convert length, mass, volume, area, temperature, and more.',
  keywords: ['unit converter', 'convert units', 'online unit converter', 'free unit converter', 'convert length', 'convert mass', 'convert volume', 'onlineconvertkit'],
  openGraph: {
    title: 'Unit Converters | OnlineConvertKit',
    description: 'Quick, private unit conversions running entirely in your browser — convert length, mass, volume, area, temperature, and more.',
    siteName: 'OnlineConvertKit',
    type: 'website',
    url: 'https://onlineconvertkit.com/unit-converter',
  },
  twitter: { card: 'summary_large_image' },
};

export default function UnitIndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-900 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50">Unit Converters</h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-600 dark:text-zinc-400">Quick, private unit conversions running entirely in your browser.</p>
        </header>

        <UnitIndex />

        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebPage',
                  '@id': 'https://onlineconvertkit.com/unit-converter#webpage',
                  'url': 'https://onlineconvertkit.com/unit-converter',
                  'name': 'Unit Converters',
                  'description': 'Quick, private unit conversions running entirely in your browser — convert length, mass, volume, area, temperature, and more.',
                },
                {
                  '@type': 'BreadcrumbList',
                  'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://onlineconvertkit.com/' },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Unit Converters', 'item': 'https://onlineconvertkit.com/unit-converter' },
                  ],
                },
                {
                  '@type': 'CollectionPage',
                  'name': 'Unit Converters',
                  'url': 'https://onlineconvertkit.com/unit-converter',
                  'description': 'A collection of quick, private unit conversion tools running entirely in the browser.',
                },
              ],
            }),
          }}
        />
      </div>
    </main>
  );
}

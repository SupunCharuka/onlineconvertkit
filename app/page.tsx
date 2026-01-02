import Link from "next/link";
import { imageConverters } from "../data/imageConverters";
import { unitConverters } from "../data/unitConverters";
import Hero from "../components/Hero";
import ConverterCard from "../components/ConverterCard";

export const metadata = {
  title: 'Free Online File, Image & Unit Converter | OnlineConvertKit',
  description:
    'Free all-in-one online converter to convert files, images, videos & units instantly. Fast, secure, and works directly in your browser.',
  keywords: [
    'online converter',
    'free converter',
    'file converter',
    'image converter',
    'unit converter',
    'math converter',
    'convert online',
    'convert images',
    'convert units',
    'onlineconvertkit',
  ],
  openGraph: {
    title: 'Free Online File, Image & Unit Converter | OnlineConvertKit',
    description:
      'Free all-in-one online converter to convert files, images, videos & units instantly. Fast, secure, and works directly in your browser.',
    siteName: 'OnlineConvertKit',
    type: 'website',
    url: 'https://onlineconvertkit.com/',
    images: [
      { url: 'https://onlineconvertkit.com/og-1200x630.png', alt: 'OnlineConvertKit', width: 1200, height: 630 },
      { url: 'https://onlineconvertkit.com/og-600x600.png', alt: 'OnlineConvertKit', width: 600, height: 600 },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-16 px-6" aria-label="Converter home">
      <div className="mx-auto max-w-6xl relative">
        {/* decorative blob */}
        <div className="pointer-events-none hidden md:block absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-pink-200 opacity-40 blur-3xl rounded-full mix-blend-multiply dark:from-indigo-900 dark:to-pink-800 dark:opacity-20" />

        <Hero />

        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-zinc-600 dark:text-zinc-300">The ultimate all-in-one toolkit to convert images, math expressions, and units. 100% secure, browser-based, and fast. No file uploads to servers required.</p>
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


        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://onlineconvertkit.com/#website',
                  'url': 'https://onlineconvertkit.com/',
                  'name': 'OnlineConvertKit',
                  'description': 'Free all-in-one online converter to convert files, images, videos & units instantly. Fast, secure, and works directly in your browser.',
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://onlineconvertkit.com/#org',
                  'name': 'OnlineConvertKit',
                  'url': 'https://onlineconvertkit.com/',
                },
                {
                  '@type': 'BreadcrumbList',
                  'itemListElement': [
                    {
                      '@type': 'ListItem',
                      'position': 1,
                      'name': 'Home',
                      'item': 'https://onlineconvertkit.com/',
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </div>
    </main>
  );
}

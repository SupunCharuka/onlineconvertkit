export const metadata = {
  title: 'About | OnlineConvertKit',
  description: 'Learn about OnlineConvertKit — mission, purpose and how the converters work entirely in the browser.',
  keywords: ['about','onlineconvertkit','converter','about us'],
  openGraph: {
    title: 'About | OnlineConvertKit',
    description: 'Learn about OnlineConvertKit — mission, purpose and how the converters work entirely in the browser.',
    url: 'https://onlineconvertkit.com/about',
    images: [
      { url: 'https://onlineconvertkit.com/og-1200x630.png', width: 1200, height: 630, alt: 'OnlineConvertKit' },
    ],
    siteName: 'OnlineConvertKit',
    type: 'website',
  },
};

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-6">
      <div className="mx-auto max-w-5xl relative">
        <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 bg-gradient-to-br from-indigo-200 to-pink-200 opacity-30 blur-3xl rounded-full mix-blend-multiply dark:from-indigo-900 dark:to-pink-800 dark:opacity-20" />

        <header className="mb-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50">About</h1>
          <p className="mt-3 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">Fast, private, client-side tools to convert images, files and units directly in your browser — no uploads required.</p>
        </header>

        <section className="relative z-10 rounded-3xl p-8 bg-white/80 dark:bg-zinc-900/60 shadow-2xl ring-1 ring-zinc-100 dark:ring-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Our mission</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">We aim to provide simple, fast and privacy-first conversion tools that work entirely on your device. Whether you need to resize an image, change formats, or convert units, OnlineConvertKit makes it quick and easy.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <h3 className="text-lg font-semibold">How it works</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Most conversion features run client-side using modern browser APIs and small WebAssembly helpers where appropriate. That means your files do not leave your browser unless you explicitly share them.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Privacy</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Privacy is important — we do not store or transmit your files by default. For any feature that requires external processing, we clearly document what is sent and why.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Performance</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">We optimize for speed — many operations run purely in the browser without server roundtrips, keeping latency low and preserving privacy.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Open source & reuse</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Where possible we use community libraries and lightweight WebAssembly modules. Optional features are loaded only when needed.</p>
                </div>
              </div>

              <div className="rounded-xl p-4 bg-white/60 dark:bg-zinc-900/60 ring-1 ring-zinc-100 dark:ring-zinc-800">
                <div className="text-sm font-medium">Contact & questions</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">See the <Link href="/contact" className="text-indigo-600">Contact page</Link></div>
              </div>
            </div>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'WebPage',
                    '@id': 'https://onlineconvertkit.com/about#webpage',
                    'url': 'https://onlineconvertkit.com/about',
                    'name': 'About',
                    'description': 'About OnlineConvertKit — mission, purpose and how the converters work entirely in the browser.',
                  },
                  {
                    '@type': 'Organization',
                    '@id': 'https://onlineconvertkit.com/#org',
                    'name': 'OnlineConvertKit',
                    'url': 'https://onlineconvertkit.com/',
                  },
                ],
              }),
            }}
          />
        </section>
      </div>
    </main>
  );
}

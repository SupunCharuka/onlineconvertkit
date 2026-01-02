import Link from "next/link";

export const metadata = {
  title: 'Terms of Use | OnlineConvertKit',
  description: 'Terms of use for Converter — client-side image, unit and math tools. Read usage, disclaimers, and liability limits.',
  keywords: ['terms of use','terms','disclaimer','liability','onlineconvertkit','converter terms'],
  openGraph: {
    title: 'Terms of Use | OnlineConvertKit',
    description: 'Terms of use for Converter — client-side image, unit and math tools. Read usage, disclaimers, and liability limits.',
    url: 'https://onlineconvertkit.com/terms',
    images: [
      { url: 'https://onlineconvertkit.com/og-1200x630.png', width: 1200, height: 630, alt: 'Terms — OnlineConvertKit' },
      { url: 'https://onlineconvertkit.com/og-600x600.png', width: 600, height: 600, alt: 'Terms — OnlineConvertKit' },
    ],
    siteName: 'OnlineConvertKit',
    type: 'website',
  },
  twitter: { card: 'summary' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-6">
      <div className="mx-auto max-w-5xl relative">
        <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 bg-gradient-to-br from-indigo-200 to-pink-200 opacity-30 blur-3xl rounded-full mix-blend-multiply dark:from-indigo-900 dark:to-pink-800 dark:opacity-20" />

        <header className="mb-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50">Terms of Use</h1>
          <p className="mt-3 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">By using Converter you agree to the terms below. Read them carefully.</p>
        </header>

        <section className="relative z-10 rounded-3xl p-8 bg-white/80 dark:bg-zinc-900/60 shadow-2xl ring-1 ring-zinc-100 dark:ring-zinc-800">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Acceptance</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">By accessing or using the Converter site, you agree to these Terms of Use. If you do not agree, do not use the site.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Permitted use</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">You may use the site for lawful purposes, including converting images and performing unit and math conversions in your browser.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Prohibited use</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">You may not use the site to upload, share, or distribute content that violates laws, infringes rights, or contains malware. The service is provided for individual use; automated scraping or abusive requests are not allowed.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Disclaimer</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">All tools are provided "as is" without warranties. Conversions are best-effort; results may vary depending on browser and file characteristics.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Limitation of liability</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">To the maximum extent permitted by law, the site and its maintainers are not liable for damages arising from use of the service, including data loss or incompatibility.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Changes</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">We may update these Terms from time to time. Continued use after changes constitutes acceptance.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Contact</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Questions about these Terms? See the <Link href="/contact" className="text-indigo-600">Contact page</Link></p>
            </div>
          </div>

        {/* JSON-LD structured data for Terms page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebPage',
                  '@id': 'https://onlineconvertkit.com/terms#webpage',
                  'url': 'https://onlineconvertkit.com/terms',
                  'name': 'Terms of Use',
                  'description': 'Terms of use for Converter — client-side image, unit and math tools. Read usage, disclaimers, and liability limits.',
                },
                {
                  '@type': 'BreadcrumbList',
                  'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://onlineconvertkit.com/' },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Terms', 'item': 'https://onlineconvertkit.com/terms' },
                  ],
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

import Link from "next/link";

export const metadata = {
    title: 'Privacy Policy | OnlineConvertKit',
    description: 'Privacy policy — Converter is a privacy-first, client-side collection of converters. We do not collect or store your files or input.',
    keywords: ['privacy policy','privacy-first','client-side converter','no tracking','no storage','onlineconvertkit'],
    openGraph: {
        title: 'Privacy Policy | OnlineConvertKit',
        description: 'Privacy policy — Converter is a privacy-first, client-side collection of converters. We do not collect or store your files or input.',
        url: 'https://onlineconvertkit.com/privacy',
        siteName: 'OnlineConvertKit',
        type: 'website',
    },
    twitter: { card: 'summary' },
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900 py-12 px-6">
            <div className="mx-auto max-w-5xl relative">
                {/* decorative blob */}
                <div className="pointer-events-none absolute -right-16 -top-16 w-72 h-72 bg-gradient-to-br from-indigo-200 to-pink-200 opacity-30 blur-3xl rounded-full mix-blend-multiply dark:from-indigo-900 dark:to-pink-800 dark:opacity-20" />

                <header className="mb-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50">Privacy Policy</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">Converter runs entirely in your browser — no tracking, and no storage of your files or inputs by default.</p>
                </header>

                <section className="relative z-10 rounded-3xl p-8 bg-white/80 dark:bg-zinc-900/60 shadow-2xl ring-1 ring-zinc-100 dark:ring-zinc-800">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Local processing</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">All conversions and processing run in your browser. Files never leave your device unless you explicitly share them.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold">No storage</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">We do not store uploaded files, inputs, or results on our servers. Downloads and clipboard actions are handled by your browser.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                               <div>
                                    <h3 className="text-lg font-semibold">Optional libraries</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Heavy or optional features (image decoders, symbolic math) are dynamically loaded into your browser only when you use them.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold">No tracking</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">This site does not include analytics or tracking scripts. Hosting provider cookies (if any) are outside the app's control.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">Security</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Keep your browser updated. Since operations are client-side, your data isn't transmitted unless you choose to share it.</p>
                                </div>
                            </div>

                            <div className="rounded-xl p-4 bg-white/60 dark:bg-zinc-900/60 ring-1 ring-zinc-100 dark:ring-zinc-800">
                                <div className="text-sm font-medium">Contact & questions</div>
                                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">See the <Link href="/contact" className="text-indigo-600">Contact page</Link> </div>
                            </div>
                        </div>
                    </div>

                                {/* JSON-LD structured data for Privacy page */}
                                <script
                                    type="application/ld+json"
                                    dangerouslySetInnerHTML={{
                                        __html: JSON.stringify({
                                            '@context': 'https://schema.org',
                                            '@graph': [
                                                {
                                                    '@type': 'WebPage',
                                                    '@id': 'https://onlineconvertkit.com/privacy#webpage',
                                                    'url': 'https://onlineconvertkit.com/privacy',
                                                    'name': 'Privacy Policy',
                                                    'description': 'Privacy policy — Converter is a privacy-first, client-side collection of converters. We do not collect or store your files or input.',
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

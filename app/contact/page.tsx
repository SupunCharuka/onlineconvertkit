import ContactForm from "../../components/ContactForm";
import Link from "next/link";

export const metadata = {
  title: 'Contact | OnlineConvertKit',
  description: 'Contact the Converter project — client-side image, unit and math tools. Reach out for feedback or help.',
  keywords: ['contact','support','feedback','converter contact','onlineconvertkit'],
  openGraph: {
    title: 'Contact | OnlineConvertKit',
    description: 'Contact the Converter project — client-side image, unit and math tools. Reach out for feedback or help.',
    url: 'https://onlineconvertkit.com/contact',
    siteName: 'OnlineConvertKit',
    type: 'website',
  },
  twitter: { card: 'summary' },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900 py-12 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-zinc-50">Get in touch</h1>
          <p className="mt-3 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">Have feedback, a feature request, or found a bug? Drop a message — everything stays your. </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="rounded-3xl p-6 bg-white/80 dark:bg-zinc-900/60 shadow-2xl ring-1 ring-zinc-100 dark:ring-zinc-800">
            <ContactForm />
          </div>
        </div>
        {/* JSON-LD structured data for Contact page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebPage',
                  '@id': 'https://onlineconvertkit.com/contact#webpage',
                  'url': 'https://onlineconvertkit.com/contact',
                  'name': 'Contact',
                  'description': 'Contact the Converter project — client-side image, unit and math tools. Reach out for feedback or help.',
                },
                {
                  '@type': 'ContactPage',
                  'url': 'https://onlineconvertkit.com/contact',
                  'name': 'Contact',
                },
              ],
            }),
          }}
        />
      </div>
    </main>
  );
}

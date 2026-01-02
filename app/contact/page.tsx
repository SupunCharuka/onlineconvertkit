import ContactForm from "../../components/ContactForm";
import Link from "next/link";

export const metadata = {
  title: 'Contact — Converter',
  description: 'Contact the Converter project — client-side image, unit and math tools. Reach out for feedback or help.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900 py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50">Get in touch</h1>
          <p className="mt-3 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">Have feedback, a feature request, or found a bug? Drop a message — everything stays your. </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="rounded-3xl p-6 bg-white/80 dark:bg-zinc-900/60 shadow-2xl ring-1 ring-zinc-100 dark:ring-zinc-800">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

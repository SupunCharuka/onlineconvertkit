"use client";
import React, { useState } from "react";

type FAQItem = { question: string; answer: string };

export function FAQJsonLd({ faqs, url, name }: { faqs: FAQItem[]; url: string; name: string }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
    description: `${name} - free, online & fast converter`,
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
    </>
  );
}

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex((cur) => (cur === i ? null : i));
  }

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-lg font-semibold mb-3">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="rounded-lg border bg-white/60 dark:bg-zinc-900/60 border-zinc-100 dark:border-zinc-800 p-3 shadow-sm">
              <button
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between text-left gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v12" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-50">{f.question}</div>
                    <div className="text-xs text-zinc-500">{isOpen ? 'Open' : 'Tap to expand'}</div>
                  </div>
                </div>
                <div className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 114.293 8.293l5-5A1 1 0 0110 3z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              <div id={`faq-${i}`} className={`mt-3 text-sm text-zinc-700 dark:text-zinc-300 transition-all ${isOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
                <p>{f.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

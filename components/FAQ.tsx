import React from "react";

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
    description: `${name} - client-side converter`,
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
    </>
  );
}

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      <dl>
        {faqs.map((f, i) => (
          <div key={i}>
            <dt style={{ fontWeight: "600" }}>{f.question}</dt>
            <dd style={{ marginBottom: 12 }}>{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

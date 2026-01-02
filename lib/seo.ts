import type { Metadata } from "next";
import type { ImageConverter } from "../data/imageConverters";
import type { UnitConverter } from "../data/unitConverters";

type AnyConverter = ImageConverter | UnitConverter;

export function buildConverterMetadata(converter: AnyConverter, url?: string): Metadata {
  const title = `${converter.name} | ${converter.from} to ${converter.to}`;
  // Combine short description and longDescription into a single SEO description
  const combined = [String((converter as AnyConverter).description || ""), String((converter as AnyConverter).longDescription || "")].filter(Boolean).join(' ');
  const description = String(combined).slice(0, 160);

  // combine primary keyword + keywords into a unique array
  // Use only the converter's `keywords` array for metadata (do not merge `primaryKeyword`)
  const kws = Array.isArray((converter as any).keywords) ? (converter as any).keywords : [];
  const keywords = kws.slice(0, 20);

  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: url,
      images: [
        { url: 'https://onlineconvertkit.com/og-1200x630.png', width: 1200, height: 630, alt: converter.name },
        { url: 'https://onlineconvertkit.com/og-600x600.png', width: 600, height: 600, alt: converter.name },
      ],
    },
    twitter: {
      title,
      description,
      images: ['https://onlineconvertkit.com/og-1200x630.png'],
    },
  };

  return metadata;
}


// Generate JSON-LD structured data for a converter
export function generateConverterJsonLd(converter: AnyConverter, url?: string) {
  // Build a full description merging short and long descriptions
  const fullDescription = [String((converter as any).description || ""), String((converter as any).longDescription || "")].filter(Boolean).join(' ');

  const ld: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: converter.name,
    description: fullDescription || undefined,
    url: url,
    mainEntity: {
      "@type": "CreativeWork",
      name: converter.name,
      description: fullDescription || undefined,
    },
    keywords: Array.isArray((converter as any).keywords) ? (converter as any).keywords.join(", ") : undefined,
  };

  // Add structured useCases and benefits as additionalProperty (PropertyValue) entries
  const additionalProperty: Array<Record<string, any>> = [];
  if (Array.isArray((converter as any).useCases)) {
    (converter as any).useCases.forEach((u: string, i: number) => {
      additionalProperty.push({ "@type": "PropertyValue", name: `useCase${i + 1}`, value: u });
    });
  }
  if (Array.isArray((converter as any).benefits)) {
    (converter as any).benefits.forEach((b: string, i: number) => {
      additionalProperty.push({ "@type": "PropertyValue", name: `benefit${i + 1}`, value: b });
    });
  }

  if (additionalProperty.length) {
    ld.additionalProperty = additionalProperty;
  }

  return ld;
}

export default buildConverterMetadata;

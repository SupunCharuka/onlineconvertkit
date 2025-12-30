export type ImageConverter = {
  slug: string;
  name: string;
  from: string;
  to: string;
  description: string;
  keywords: string[];
  related?: string[];
};

export const imageConverters: ImageConverter[] = [
  {
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    from: "PNG",
    to: "JPG",
    description:
      "Convert PNG images to high-quality JPG format in the browser using Canvas API. Supports drag & drop and batch downloads.",
    keywords: ["png to jpg", "convert png to jpg", "png jpg converter"],
    related: ["jpg-to-webp"],
  },
  {
    slug: "jpg-to-webp",
    name: "JPG to WEBP Converter",
    from: "JPG",
    to: "WEBP",
    description:
      "Convert JPG images to modern WEBP for smaller file sizes and faster loading. Runs fully in-browser with no uploads.",
    keywords: ["jpg to webp", "convert jpg to webp", "jpg webp converter"],
    related: ["png-to-jpg"],
  },
  {
    slug: "png-to-webp",
    name: "PNG to WEBP Converter",
    from: "PNG",
    to: "WEBP",
    description:
      "Convert PNG images to modern WEBP format for smaller files while preserving quality. Processing is done locally in your browser.",
    keywords: ["png to webp", "convert png to webp", "png webp converter"],
    related: ["png-to-jpg", "jpg-to-webp"],
  },
  {
    slug: "webp-to-png",
    name: "WEBP to PNG Converter",
    from: "WEBP",
    to: "PNG",
    description:
      "Convert WEBP images back to PNG while preserving transparency. Runs fully in your browser with no uploads.",
    keywords: ["webp to png", "convert webp to png", "webp png converter"],
    related: ["png-to-webp", "webp-to-jpg"],
  },
  {
    slug: "webp-to-jpg",
    name: "WEBP to JPG Converter",
    from: "WEBP",
    to: "JPG",
    description:
      "Convert WEBP images to JPG for wider compatibility and smaller files. Runs locally in the browser with no uploads.",
    keywords: ["webp to jpg", "convert webp to jpg", "webp jpg converter"],
    related: ["jpg-to-webp", "webp-to-png"],
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    from: "JPG",
    to: "PNG",
    description:
      "Convert JPG images to PNG. Useful when you need lossless format or transparency-aware workflows. Conversion runs fully in your browser.",
    keywords: ["jpg to png", "convert jpg to png", "jpg png converter"],
    related: ["png-to-jpg", "webp-to-png"],
  },
];

export const imageConverterBySlug: Record<string, ImageConverter> = imageConverters.reduce(
  (acc, cur) => ({ ...acc, [cur.slug]: cur }),
  {} as Record<string, ImageConverter>
);

export const allImageSlugs = imageConverters.map((c) => c.slug);

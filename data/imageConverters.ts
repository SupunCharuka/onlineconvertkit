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
];

export const imageConverterBySlug: Record<string, ImageConverter> = imageConverters.reduce(
  (acc, cur) => ({ ...acc, [cur.slug]: cur }),
  {} as Record<string, ImageConverter>
);

export const allImageSlugs = imageConverters.map((c) => c.slug);

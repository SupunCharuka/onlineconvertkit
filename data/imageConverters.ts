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
      "Convert PNG images to high-quality JPG format in the browser. Supports drag & drop and batch downloads.",
    keywords: ["png to jpg", "convert png to jpg", "png jpg converter"],
    related: ["jpg-to-webp"],
  },
  {
    slug: "jpg-to-webp",
    name: "JPG to WEBP Converter",
    from: "JPG",
    to: "WEBP",
    description:
      "Convert JPG images to modern WEBP for smaller file sizes and faster loading. Runs fully in-browser with no logging.",
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
      "Convert WEBP images back to PNG while preserving transparency. Runs fully in your browser with no logging.",
    keywords: ["webp to png", "convert webp to png", "webp png converter"],
    related: ["png-to-webp", "webp-to-jpg"],
  },
  {
    slug: "webp-to-jpg",
    name: "WEBP to JPG Converter",
    from: "WEBP",
    to: "JPG",
    description:
      "Convert WEBP images to JPG for wider compatibility and smaller files. Runs locally in the browser with no logging.",
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
  {
    slug: "image-to-pdf",
    name: "Image to PDF Converter",
    from: "Image",
    to: "PDF",
    description:
      "Embed one image per PDF page and download as a .pdf file. Uses client-side PDF generation (pdf-lib).",
    keywords: ["image to pdf", "png to pdf", "jpg to pdf", "convert image to pdf"],
    related: ["jpg-to-png", "png-to-jpg"],
  },
  {
    slug: "png-to-svg",
    name: "PNG to SVG Converter",
    from: "PNG",
    to: "SVG",
    description:
      "Export a PNG image wrapped inside an SVG file (embedded raster). This is useful when you need an .svg container but don't require vector tracing.",
    keywords: ["png to svg", "png svg converter", "embed png in svg"],
    related: ["png-to-webp", "png-to-jpg"],
  },
  {
    slug: "jpg-to-svg",
    name: "JPG to SVG Converter",
    from: "JPG",
    to: "SVG",
    description:
      "Export a JPG image wrapped inside an SVG file (embedded raster). Useful for packaging raster inside an SVG container without vectorization.",
    keywords: ["jpg to svg", "jpg svg converter", "embed jpg in svg"],
    related: ["jpg-to-png", "jpg-to-webp"],
  },
  {
    slug: "svg-to-png",
    name: "SVG to PNG Converter",
    from: "SVG",
    to: "PNG",
    description:
      "Rasterize an SVG to PNG in the browser. Useful for exporting vector art as a raster image for compatibility or embedding.",
    keywords: ["svg to png", "convert svg to png", "rasterize svg"],
    related: ["png-to-svg", "jpg-to-png"],
  },
  {
    slug: "heic-to-png",
    name: "HEIC to PNG Converter",
    from: "HEIC",
    to: "PNG",
    description:
      "Convert HEIC/HEIF photos to PNG in the browser. Requires optional `heic2any` or native browser HEIC support.",
    keywords: ["heic to png", "convert heic", "heif converter"],
    related: ["jpg-to-png", "png-to-jpg"],
  },
  {
    slug: "image-to-heic",
    name: "Image to HEIC Converter",
    from: "Image",
    to: "HEIC",
    description:
      "Convert images to HEIC. Note: browser-side HEIC encoding is not widely supported; this option may require server-side tooling.",
    keywords: ["image to heic", "jpg to heic", "png to heic"],
    related: ["image-to-pdf", "png-to-webp"],
  },
];

export const imageConverterBySlug: Record<string, ImageConverter> = imageConverters.reduce(
  (acc, cur) => ({ ...acc, [cur.slug]: cur }),
  {} as Record<string, ImageConverter>
);

export const allImageSlugs = imageConverters.map((c) => c.slug);

export type ImageConverter = {
  slug: string;

  /** SEO essentials */
  name: string;                // H1
  from: string;
  to: string;
  primaryKeyword: string;      // Main SEO keyword
  keywords: string[];          // Secondary keywords

  /** Content & intent */
  description: string;         // Short SEO description
  longDescription?: string;    // Optional rich intro
  useCases?: string[];         // For SEO sections
  benefits?: string[];         // Bullet points

  /** Linking & structure */
  related?: string[];


  /** SEO flags */
  searchable: true;
};

export const imageConverters: ImageConverter[] = [
  {
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    from: "PNG",
    to: "JPG",
    primaryKeyword: "png to jpg",
    description:
      "Free PNG to JPG converter that works directly in your browser. Convert PNG images to high-quality JPG instantly with no signup.",
    keywords: ["png to jpg",
      "convert png to jpg",
      "png jpg converter",
      "png to jpg online",
      "free png to jpg",
    ],
    longDescription:
      "This PNG to JPG converter allows you to quickly convert PNG images into JPG format online. The conversion runs entirely in your browser, ensuring fast results and complete privacy.",

    useCases: [
      "Reducing image file size for faster websites",
      "Converting PNG images for email or social media",
      "Preparing images for CMS uploads",
    ],

    benefits: [
      "Runs 100% in your browser",
      "No file uploads or sign-up required",
      "High-quality JPG output",
    ],
    related: ["jpg-to-webp"],
    searchable: true,
  },
  {
    slug: "jpg-to-webp",
    name: "JPG to WEBP Converter",
    from: "JPG",
    to: "WEBP",
    primaryKeyword: "jpg to webp",
    description:
      "Quickly convert JPG images to modern WEBP in your browser for smaller file sizes and faster page loads. Conversion happens locally — no uploads, no tracking.",
    keywords: ["jpg to webp", "convert jpg to webp", "jpg webp converter", "jpg to webp online", "jpeg to webp", "webp converter", "free jpg to webp", "free convert jpg to webp"],
    longDescription:
      "Convert existing JPG photos to the modern WEBP format in your browser for improved compression without perceptible quality loss. No upload required — everything stays local.",
    useCases: [
      "Optimize photos for the web",
      "Reduce bandwidth for image-heavy pages",
      "Prepare images for modern browsers and CDNs",
    ],
    benefits: ["Smaller file sizes", "Fast in-browser processing", "No server uploads"],
    related: ["png-to-jpg"],
    searchable: true,
  },
  {
    slug: "png-to-webp",
    name: "PNG to WEBP Converter",
    from: "PNG",
    to: "WEBP",
    primaryKeyword: "png to webp",
    description:
      "Convert PNG to WEBP in the browser to reduce file size while keeping image quality. Works offline in your browser so files never leave your device.",
    keywords: ["png to webp", "convert png to webp", "png webp converter", "png to webp online", "convert png to webp without upload", "free png to webp", "free convert png to webp"],
    longDescription:
      "Turn PNG files into WEBP to gain improved compression and smaller downloads while keeping image fidelity high. Ideal for web performance improvements.",
    useCases: ["Reduce PNG payloads", "Optimize sprites and illustrations", "Improve page load times"],
    benefits: ["Smaller assets", "Client-side conversion", "Preserves transparency when supported"],
    related: ["png-to-jpg", "jpg-to-webp"],
    searchable: true,
  },
  {
    slug: "webp-to-png",
    name: "WEBP to PNG Converter",
    from: "WEBP",
    to: "PNG",
    primaryKeyword: "webp to png",
    description:
      "Convert WEBP images to PNG locally in your browser — preserves transparency and broadens compatibility with editors and legacy platforms.",
    keywords: ["webp to png", "convert webp to png", "webp png converter", "webp to png online", "convert webp to png without upload", "free webp to png", "free convert webp to png"],
    longDescription:
      "Rasterize WEBP images into widely-supported PNG files. Useful when targeting older browsers or workflows that require PNG assets.",
    useCases: ["Restore compatibility for legacy platforms", "Edit WEBP in tools that don’t support WEBP", "Preserve alpha channels"],
    benefits: ["Broad compatibility", "Preserves transparency", "Local conversion"],
    related: ["png-to-webp", "webp-to-jpg"],
    searchable: true,
  },
  {
    slug: "webp-to-jpg",
    name: "WEBP to JPG Converter",
    from: "WEBP",
    to: "JPG",
    primaryKeyword: "webp to jpg",
    description:
      "Convert WEBP to JPEG in your browser for wider compatibility with tools and services that expect JPG. Quick, local conversion with no uploads.",
    keywords: ["webp to jpg", "convert webp to jpg", "webp jpg converter", "webp to jpeg", "convert webp to jpg online", "free webp to jpg", "free convert webp to jpg"],
    longDescription:
      "Convert WEBP images to JPG format for compatibility with older tools and platforms that expect JPEGs, while retaining reasonable file sizes.",
    useCases: ["Compatibility with older editors", "Prepare images for services that don’t accept WEBP"],
    benefits: ["Simple JPEG output", "Local processing", "No uploads"],
    related: ["jpg-to-webp", "webp-to-png"],
    searchable: true,
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    from: "JPG",
    to: "PNG",
    primaryKeyword: "jpg to png",
    description:
      "Convert JPG to PNG in-browser when you need lossless editing or alpha/transparency support. All processing is local and private.",
    keywords: ["jpg to png", "convert jpg to png", "jpg png converter", "jpeg to png", "convert jpeg to png online", "free jpg to png", "free convert jpg to png"],
    longDescription:
      "Transform lossy JPEGs into PNGs when you need lossless editing or alpha channel support. This conversion embeds the raster into a PNG container locally.",
    useCases: ["Prepare images for editing", "Add alpha/transparency", "Preserve pixels for archival"],
    benefits: ["Lossless container", "Better editing fidelity", "Local, private conversion"],
    related: ["png-to-jpg", "webp-to-png"],
    searchable: true,
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF Converter",
    from: "Image",
    to: "PDF",
    primaryKeyword: "image to pdf",
    description:
      "Embed images into a printable PDF directly in your browser and download a ready-to-share .pdf file. No servers involved — everything runs locally.",
    keywords: ["image to pdf", "png to pdf", "jpg to pdf", "convert image to pdf", "image to pdf online", "photo to pdf", "free image to pdf", "free convert image to pdf"],
    longDescription:
      "Create a downloadable PDF that embeds your image on a single page. Useful for sharing, printing, or packaging images into a portable document format without leaving the browser.",
    useCases: ["Generate print-ready PDFs", "Share images as documents", "Package images for email"],
    benefits: ["Printable output", "Single-file distribution", "Client-side generation"],
    related: ["jpg-to-png", "png-to-jpg"],
    searchable: true,
  },
  {
    slug: "png-to-svg",
    name: "PNG to SVG Converter",
    from: "PNG",
    to: "SVG",
    primaryKeyword: "png to svg",
    description:
      "Wrap a PNG inside an SVG container so it can be used where SVG uploads are required while retaining the original raster image. No vector tracing is performed.",
    keywords: ["png to svg", "png svg converter", "embed png in svg", "png inside svg", "convert png to svg online", "free png to svg", "free convert png to svg"],
    longDescription:
      "Wrap a raster PNG inside an SVG container so it can be embedded where SVGs are required while keeping the original pixels intact.",
    useCases: ["Embed images in SVG workflows", "Maintain aspect ratio in vector formats"],
    benefits: ["SVG container compatibility", "No raster tracing required", "Client-side export"],
    related: ["png-to-webp", "png-to-jpg"],
    searchable: true,
  },
  {
    slug: "jpg-to-svg",
    name: "JPG to SVG Converter",
    from: "JPG",
    to: "SVG",
    primaryKeyword: "jpg to svg",
    description:
      "Package a JPEG inside an SVG wrapper for systems that accept only SVG files, preserving the original raster image without conversion to vectors.",
    keywords: ["jpg to svg", "jpg svg converter", "embed jpg in svg", "jpeg to svg", "convert jpg to svg online", "free jpg to svg", "free convert jpg to svg"],
    longDescription:
      "Place JPEG content inside an SVG wrapper for workflows that accept only SVG files while preserving the original raster image.",
    useCases: ["Conform to SVG-only upload requirements", "Package JPEGs into SVG assets"],
    benefits: ["Compatibility wrapper", "Preserves original image", "No external services"],
    related: ["jpg-to-png", "jpg-to-webp"],
    searchable: true,
  },
  {
    slug: "svg-to-png",
    name: "SVG to PNG Converter",
    from: "SVG",
    to: "PNG",
    primaryKeyword: "svg to png",
    description:
      "Render SVG vector art into a PNG bitmap at the resolution you choose, right in the browser — ideal for legacy systems and editors that need raster files.",
    keywords: ["svg to png", "convert svg to png", "rasterize svg", "svg to png online", "export svg to png", "free svg to png", "free convert svg to png"],
    longDescription:
      "Render vector SVG artwork into a PNG bitmap for use in environments or tools that only accept raster images.",
    useCases: ["Export icons for legacy systems", "Prepare artwork for CMS that requires PNGs"],
    benefits: ["Broad compatibility", "Control output resolution", "Fast client-side render"],
    related: ["png-to-svg", "jpg-to-png"],
    searchable: true,
  },
  {
    slug: "heic-to-png",
    name: "HEIC to PNG Converter",
    from: "HEIC",
    to: "PNG",
    primaryKeyword: "heic to png",
    description:
      "Decode HEIC/HEIF photos (commonly from iPhones) to PNG in your browser. Optional `heic2any` can be used if the browser lacks native support.",
    keywords: ["heic to png", "convert heic", "heif converter", "heic to png online", "convert heic to png without upload", "free heic to png", "free convert heic to png"],
    longDescription:
      "Decode HEIC/HEIF images (commonly produced by iPhones) into PNG so they can be viewed and edited in tools that don’t support HEIC natively.",
    useCases: ["Open iPhone HEIC photos on non-supporting platforms", "Archive photos as PNG"],
    benefits: ["Cross-platform compatibility", "No server upload", "Preserves photo quality"],
    related: ["jpg-to-png", "png-to-jpg"],
    searchable: true,
  },
  {
    slug: "image-to-heic",
    name: "Image to HEIC Converter",
    from: "Image",
    to: "HEIC",
    primaryKeyword: "image to heic",
    description:
      "Attempt to encode images into HEIC for better compression. Browser-side HEIC encoding is limited — server-side tools may provide more consistent results.",
    keywords: ["image to heic", "jpg to heic", "png to heic", "convert image to heic", "heic encoder", "free image to heic", "free convert image to heic"],
    longDescription:
      "Attempt to encode images into HEIC for improved compression. Due to limited browser encoder support, results may vary and server-side tools are recommended for production use.",
    useCases: ["Experiment with HEIC compression", "Prepare images for platforms that accept HEIC"],
    benefits: ["Potentially smaller files", "Modern codec advantages"],
    related: ["image-to-pdf", "png-to-webp"],
    searchable: true,
  },
];

export const imageConverterBySlug: Record<string, ImageConverter> = imageConverters.reduce(
  (acc, cur) => ({ ...acc, [cur.slug]: cur }),
  {} as Record<string, ImageConverter>
);

export const allImageSlugs = imageConverters.map((c) => c.slug);

export type UnitConverter = {
  slug: string;
  name: string;
  from: string;
  to: string;
  description: string;
  keywords: string[];
  related?: string[];
};

export const unitConverters: UnitConverter[] = [
  {
    slug: "meters-to-feet",
    name: "Meters to Feet Converter",
    from: "Meters",
    to: "Feet",
    description: "Quickly convert meters to feet with precision and optional rounding.",
    keywords: ["meters to feet", "m to ft", "convert meters to feet"],
    related: ["celsius-to-fahrenheit"],
  },
  {
    slug: "celsius-to-fahrenheit",
    name: "Celsius to Fahrenheit Converter",
    from: "°C",
    to: "°F",
    description: "Convert temperatures between Celsius and Fahrenheit instantly in your browser.",
    keywords: ["celsius to fahrenheit", "°C to °F", "temperature converter"],
    related: ["meters-to-feet"],
  },
];

export const unitConverterBySlug: Record<string, UnitConverter> = unitConverters.reduce(
  (acc, cur) => ({ ...acc, [cur.slug]: cur }),
  {} as Record<string, UnitConverter>
);

export const allUnitSlugs = unitConverters.map((c) => c.slug);

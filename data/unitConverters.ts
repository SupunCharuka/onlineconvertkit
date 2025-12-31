export type UnitConverter = {
  slug: string;
  name: string;
  from: string;
  to: string;
  description: string;
  keywords: string[];
  related?: string[];
  category?: string;
};

export const unitConverters: UnitConverter[] = [
  // Length
  {
    slug: "meters-to-feet",
    name: "Meters → Feet",
    category: "Length",
    from: "Meters",
    to: "Feet",
    description: "Convert meters to feet quickly and accurately.",
    keywords: ["meters to feet", "m to ft", "length converter"],
    related: ["kilometers-to-miles", "centimeters-to-inches"],
  },
  {
    slug: "kilometers-to-miles",
    name: "Kilometers → Miles",
    category: "Length",
    from: "Kilometers",
    to: "Miles",
    description: "Convert kilometers to miles for distance and travel calculations.",
    keywords: ["km to mi", "kilometers to miles", "distance converter"],
    related: ["meters-to-feet"],
  },
  {
    slug: "centimeters-to-inches",
    name: "Centimeters → Inches",
    category: "Length",
    from: "Centimeters",
    to: "Inches",
    description: "Convert centimeters to inches for small-length measurements.",
    keywords: ["cm to in", "centimeters to inches"],
    related: ["inches-to-centimeters"],
  },
  {
    slug: "inches-to-centimeters",
    name: "Inches → Centimeters",
    category: "Length",
    from: "Inches",
    to: "Centimeters",
    description: "Convert inches to centimeters.",
    keywords: ["in to cm", "inches to cm"],
    related: ["centimeters-to-inches"],
  },

  // Mass
  {
    slug: "kilograms-to-pounds",
    name: "Kilograms → Pounds",
    category: "Mass",
    from: "Kilograms",
    to: "Pounds",
    description: "Convert kilograms to pounds for weight measurements.",
    keywords: ["kg to lb", "kilograms to pounds", "weight converter"],
    related: ["grams-to-ounces"],
  },
  {
    slug: "grams-to-ounces",
    name: "Grams → Ounces",
    category: "Mass",
    from: "Grams",
    to: "Ounces",
    description: "Convert grams to ounces for cooking and small weights.",
    keywords: ["g to oz", "grams to ounces"],
    related: ["kilograms-to-pounds"],
  },

  // Volume
  {
    slug: "liters-to-gallons",
    name: "Liters → Gallons (US)",
    category: "Volume",
    from: "Liters",
    to: "Gallons",
    description: "Convert liters to US gallons.",
    keywords: ["L to gal", "liters to gallons"],
    related: ["milliliters-to-fluid-ounces"],
  },
  {
    slug: "milliliters-to-fluid-ounces",
    name: "Milliliters → Fluid Ounces",
    category: "Volume",
    from: "Milliliters",
    to: "Fl oz",
    description: "Convert milliliters to fluid ounces for recipes and dosing.",
    keywords: ["ml to fl oz", "milliliters to fluid ounces"],
    related: ["liters-to-gallons"],
  },

  // Temperature
  {
    slug: "celsius-to-fahrenheit",
    name: "Celsius → Fahrenheit",
    category: "Temperature",
    from: "°C",
    to: "°F",
    description: "Convert temperatures between Celsius and Fahrenheit instantly in your browser.",
    keywords: ["celsius to fahrenheit", "°C to °F", "temperature converter"],
    related: ["fahrenheit-to-celsius", "celsius-to-kelvin"],
  },
  {
    slug: "fahrenheit-to-celsius",
    name: "Fahrenheit → Celsius",
    category: "Temperature",
    from: "°F",
    to: "°C",
    description: "Convert temperatures from Fahrenheit to Celsius.",
    keywords: ["°F to °C", "fahrenheit to celsius"],
    related: ["celsius-to-fahrenheit"],
  },
  {
    slug: "celsius-to-kelvin",
    name: "Celsius → Kelvin",
    category: "Temperature",
    from: "°C",
    to: "K",
    description: "Convert Celsius to Kelvin (thermodynamic temperature).",
    keywords: ["celsius to kelvin", "°C to K"],
    related: ["kelvin-to-celsius"],
  },
  {
    slug: "kelvin-to-celsius",
    name: "Kelvin → Celsius",
    category: "Temperature",
    from: "K",
    to: "°C",
    description: "Convert Kelvin to Celsius.",
    keywords: ["K to °C", "kelvin to celsius"],
    related: ["celsius-to-kelvin"],
  },

  // Speed
  {
    slug: "kmh-to-mph",
    name: "km/h → mph",
    category: "Speed",
    from: "km/h",
    to: "mph",
    description: "Convert kilometers per hour to miles per hour.",
    keywords: ["km/h to mph", "speed converter"],
    related: [],
  },

  // Area
  {
    slug: "square-meters-to-square-feet",
    name: "m² → ft²",
    category: "Area",
    from: "Square meters",
    to: "Square feet",
    description: "Convert area between square meters and square feet.",
    keywords: ["m2 to ft2", "square meters to square feet"],
    related: [],
  },
  // More length & area
  {
    slug: "miles-to-kilometers",
    name: "Miles → Kilometers",
    category: "Length",
    from: "Miles",
    to: "Kilometers",
    description: "Convert miles to kilometers.",
    keywords: ["mi to km", "miles to kilometers"],
    related: ["kilometers-to-miles"],
  },
  {
    slug: "yards-to-meters",
    name: "Yards → Meters",
    category: "Length",
    from: "Yards",
    to: "Meters",
    description: "Convert yards to meters.",
    keywords: ["yd to m", "yards to meters"],
    related: ["meters-to-feet"],
  },
  {
    slug: "feet-to-meters",
    name: "Feet → Meters",
    category: "Length",
    from: "Feet",
    to: "Meters",
    description: "Convert feet to meters.",
    keywords: ["ft to m", "feet to meters"],
    related: ["meters-to-feet"],
  },
  {
    slug: "acres-to-square-meters",
    name: "Acres → m²",
    category: "Area",
    from: "Acres",
    to: "Square meters",
    description: "Convert acres to square meters.",
    keywords: ["acres to m2", "acre to sqm"],
    related: ["square-meters-to-square-feet"],
  },
  {
    slug: "hectares-to-square-meters",
    name: "Hectares → m²",
    category: "Area",
    from: "Hectares",
    to: "Square meters",
    description: "Convert hectares to square meters.",
    keywords: ["ha to m2", "hectares to square meters"],
    related: ["square-meters-to-square-feet"],
  },

  // Volume (additional)
  {
    slug: "cups-to-milliliters",
    name: "Cups → Milliliters (US)",
    category: "Volume",
    from: "Cups",
    to: "Milliliters",
    description: "Convert US cups to milliliters for recipes.",
    keywords: ["cups to ml", "cup to ml"],
    related: ["milliliters-to-fluid-ounces"],
  },
  {
    slug: "pints-to-liters",
    name: "Pints → Liters (US)",
    category: "Volume",
    from: "Pints",
    to: "Liters",
    description: "Convert US pints to liters.",
    keywords: ["pints to liters", "pt to L"],
    related: ["liters-to-gallons"],
  },
  {
    slug: "quarts-to-liters",
    name: "Quarts → Liters (US)",
    category: "Volume",
    from: "Quarts",
    to: "Liters",
    description: "Convert US quarts to liters.",
    keywords: ["qt to L", "quarts to liters"],
    related: ["liters-to-gallons"],
  },
  {
    slug: "gallons-to-liters",
    name: "Gallons → Liters (US)",
    category: "Volume",
    from: "Gallons",
    to: "Liters",
    description: "Convert US gallons to liters.",
    keywords: ["gal to L", "gallons to liters"],
    related: ["liters-to-gallons"],
  },

  // Pressure
  {
    slug: "bar-to-psi",
    name: "Bar → PSI",
    category: "Pressure",
    from: "Bar",
    to: "psi",
    description: "Convert bar to pounds per square inch (psi).",
    keywords: ["bar to psi", "pressure converter"],
    related: [],
  },

  // Energy
  {
    slug: "joules-to-calories",
    name: "Joules → Calories (small)",
    category: "Energy",
    from: "J",
    to: "cal",
    description: "Convert joules to small (thermochemical) calories.",
    keywords: ["J to cal", "joules to calories"],
    related: [],
  },
  {
    slug: "joules-to-kilocalories",
    name: "Joules → kilocalories (kcal)",
    category: "Energy",
    from: "J",
    to: "kcal",
    description: "Convert joules to kilocalories (food Calories).",
    keywords: ["J to kcal", "joules to kilocalories"],
    related: [],
  },

  // Time
  {
    slug: "seconds-to-minutes",
    name: "Seconds → Minutes",
    category: "Time",
    from: "Seconds",
    to: "Minutes",
    description: "Convert seconds to minutes.",
    keywords: ["s to min", "seconds to minutes"],
    related: ["minutes-to-hours"],
  },
  {
    slug: "minutes-to-hours",
    name: "Minutes → Hours",
    category: "Time",
    from: "Minutes",
    to: "Hours",
    description: "Convert minutes to hours.",
    keywords: ["min to hr", "minutes to hours"],
    related: ["seconds-to-minutes"],
  },
  {
    slug: "hours-to-days",
    name: "Hours → Days",
    category: "Time",
    from: "Hours",
    to: "Days",
    description: "Convert hours to days.",
    keywords: ["hr to days", "hours to days"],
    related: ["minutes-to-hours"],
  },

  // Data
  {
    slug: "bytes-to-kilobytes",
    name: "Bytes → KB",
    category: "Data",
    from: "Bytes",
    to: "KB",
    description: "Convert bytes to kilobytes (1024-based).",
    keywords: ["bytes to kb", "B to KB"],
    related: ["kilobytes-to-megabytes"],
  },
  {
    slug: "kilobytes-to-megabytes",
    name: "KB → MB",
    category: "Data",
    from: "KB",
    to: "MB",
    description: "Convert kilobytes to megabytes (1024-based).",
    keywords: ["KB to MB", "kilobytes to megabytes"],
    related: ["bytes-to-kilobytes"],
  },

  // Angle
  {
    slug: "degrees-to-radians",
    name: "Degrees → Radians",
    category: "Angle",
    from: "°",
    to: "rad",
    description: "Convert degrees to radians.",
    keywords: ["deg to rad", "degrees to radians"],
    related: ["radians-to-degrees"],
  },
  {
    slug: "radians-to-degrees",
    name: "Radians → Degrees",
    category: "Angle",
    from: "rad",
    to: "°",
    description: "Convert radians to degrees.",
    keywords: ["rad to deg", "radians to degrees"],
    related: ["degrees-to-radians"],
  },
];

export const unitConverterBySlug: Record<string, UnitConverter> = unitConverters.reduce(
  (acc, cur) => ({ ...acc, [cur.slug]: cur }),
  {} as Record<string, UnitConverter>
);

export const allUnitSlugs = unitConverters.map((c) => c.slug);

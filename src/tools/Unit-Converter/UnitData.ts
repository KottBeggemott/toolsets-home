export type UnitDef = {
  value: number;
  label: string;
};

export type Category =
  | "length"
  | "mass"
  | "volume"
  | "speed"
  | "temperature"
  | "time";

export const units: Record<
  Category,
  Record<string, UnitDef>
> = {
  length: {
    m: { value: 1, label: "Meter (m)" },
    km: { value: 1000, label: "Kilometer (km)" },
    cm: { value: 0.01, label: "Centimeter (cm)" },
    mm: { value: 0.001, label: "Millimeter (mm)" },
    in: { value: 0.0254, label: "Inch (in)" },
    ft: { value: 0.3048, label: "Foot (ft)" },
    ftin: { value: 1, label: "Feet + Inches (ft-in)" },
    yd: { value: 0.9144, label: "Yard (yd)" },
    mi: { value: 1609.34, label: "Mile (mi)" },
    nmi: { value: 1852, label: "Nautical Mile (nmi)" },
    ly: { value: 9.461e15, label: "Light Year (ly)" },
  },

  mass: {
    g: { value: 0.001, label: "Gram (g)" },
    kg: { value: 1, label: "Kilogram (kg)" },
    mg: { value: 1e-6, label: "Milligram (mg)" },
    µg: { value: 1e-9, label: "Microgram (µg)" },
    oz: { value: 0.0283495, label: "Ounce (oz)" },
    lb: { value: 0.453592, label: "Pound (lb)" },
    st: { value: 6.35029, label: "Stone (st)" },
    t: { value: 1000, label: "Metric Ton (t)" },
  },

  volume: {
    mL: { value: 0.001, label: "Milliliter (mL)" },
    L: { value: 1, label: "Liter (L)" },
    gal: { value: 3.78541, label: "Gallon (gal)" },
    qt: { value: 0.946353, label: "Quart (qt)" },
    pt: { value: 0.473176, label: "Pint (pt)" },
    "fl oz": {
      value: 0.0295735,
      label: "Fluid Ounce (fl oz)",
    },
    cup: { value: 0.24, label: "Cup" },
    tbsp: {
      value: 0.0147868,
      label: "Tablespoon (tbsp)",
    },
    tsp: {
      value: 0.00492892,
      label: "Teaspoon (tsp)",
    },
  },

  speed: {
    "m/s": {
      value: 1,
      label: "Meters per second (m/s)",
    },
    "km/h": {
      value: 0.277778,
      label: "Kilometers per hour (km/h)",
    },
    mph: {
      value: 0.44704,
      label: "Miles per hour (mph)",
    },
    kt: { value: 0.514444, label: "Knot (kt)" },
    "ft/s": {
      value: 0.3048,
      label: "Feet per second (ft/s)",
    },
  },

  temperature: {
    C: { value: 1, label: "Celsius (°C)" },
    F: { value: 1, label: "Fahrenheit (°F)" },
    K: { value: 1, label: "Kelvin (K)" },
    gasMark: { value: 1, label: "Gas Mark" },
  },

  time: {
    ms: { value: 0.001, label: "Millisecond (ms)" },
    s: { value: 1, label: "Second (s)" },
    min: { value: 60, label: "Minute (min)" },
    h: { value: 3600, label: "Hour (h)" },
    d: { value: 86400, label: "Day (d)" },
    wk: { value: 604800, label: "Week (wk)" },
    mo: { value: 2629800, label: "Month (mo)" },
    yr: { value: 31557600, label: "Year (yr)" },
  },
};

export const categoryLabels: Record<Category, string> = {
  length: "Length",
  mass: "Mass",
  volume: "Volume",
  speed: "Speed",
  temperature: "Temperature",
  time: "Time",
};
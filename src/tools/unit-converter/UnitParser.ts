import { units, type Category } from "./UnitData";
import { aliases } from "./UnitAliases";

export type ParsedInput = {
  value: number | null;
  from: string;
  to?: string;
};

export function resolveUnit(
  token: string
): { category: Category; unit: string } | null {
  const raw = token.trim();

  if (!raw) return null;

  const lower = raw.toLowerCase();

  if (aliases[lower]) {
    return aliases[lower];
  }

  for (const category of Object.keys(units) as Category[]) {
    for (const unit of Object.keys(units[category])) {
      if (unit.toLowerCase() === lower) {
        return {
          category,
          unit,
        };
      }
    }
  }

  return null;
}

export function parseInput(input: string): ParsedInput | null {
  const cleaned = input
    .trim()
    .replace(/,/g, "")
    .replace(/feet and inches/gi, "ftin")
    .replace(/feet and inch/gi, "ftin")
    .replace(/foot and inches/gi, "ftin")
    .replace(/foot and inch/gi, "ftin")
    .replace(/feet inches/gi, "ftin")
    .replace(/foot inches/gi, "ftin")
    .replace(/ft and in/gi, "ftin")
    .replace(/ft in/gi, "ftin")
    .replace(/height/gi, "ftin");

  const feetInchesMatch = cleaned.match(
    /(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')\s*(\d+(?:\.\d+)?)?\s*(?:in|inch|inches|")?/i
  );

  if (feetInchesMatch) {
    const feet = parseFloat(feetInchesMatch[1]);
    const inches = feetInchesMatch[2]
      ? parseFloat(feetInchesMatch[2])
      : 0;

    const meters = (feet * 12 + inches) * 0.0254;

    const toMatch = cleaned.match(
      /\s+(?:to|in|=|-|->)\s+(.+)$/i
    );

    const toUnitText = toMatch
      ? toMatch[1].trim()
      : "cm";

    const resolvedTo = resolveUnit(toUnitText);

    return {
      value: meters,
      from: "m",
      to: resolvedTo?.unit ?? "cm",
    };
  }

  const regex =
    /^(-?\d+(?:\.\d+)?(?:e-?\d+)?)\s*([a-zA-Zµ°/ ]+?)(?:\s+(?:to|in|=|->)\s+([a-zA-Zµ°/ ]+))?\s*$/i;

  const match = cleaned.match(regex);

  if (!match) return null;

  return {
    value:
      match[1] !== undefined
        ? parseFloat(match[1])
        : null,
    from: match[2].trim(),
    to: match[3]?.trim(),
  };
}
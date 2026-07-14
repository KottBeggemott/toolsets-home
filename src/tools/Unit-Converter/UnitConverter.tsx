import { useState, useEffect, useMemo } from "react";
import { Sparkles } from "lucide-react";
import {
  units,
  categoryLabels,
  type Category,
} from "./UnitData";
import { aliases } from "./UnitAliases";
import { exampleQueries } from "./UnitExamples";
import { getEasterEgg } from "./UnitEasterEggs";
import {
  gasMarkToCelsius,
  celsiusToGasMark,
} from "./GasMark";

function resolveUnit(token: string): { category: Category; unit: string } | null {
  const raw = token.trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();

  if (aliases[lower]) return aliases[lower];

  for (const cat of Object.keys(units) as Category[]) {
    for (const u of Object.keys(units[cat])) {
      if (u.toLowerCase() === lower) return { category: cat, unit: u };
    }
  }
  return null;
}

function temperatureToKelvin(value: number, from: string): number {
  if (from === "K") return value;
  if (from === "C") return value + 273.15;
  if (from === "F") return (value - 32) * (5 / 9) + 273.15;
  return value;
}

function convertTemperature(value: number, from: string, to: string): number {
  const kelvin = temperatureToKelvin(value, from);

if (kelvin < 0) {
  return NaN;
}
  let celsius: number;

if (from === "C")
    celsius = value;
else if (from === "F")
    celsius = (value - 32) * (5 / 9);
else if (from === "gasMark")
    celsius = gasMarkToCelsius(value);
else
    celsius = value - 273.15;

  if (to === "C") return celsius;
if (to === "F") return celsius * (9 / 5) + 32;
if (to === "gasMark") return celsiusToGasMark(celsius);
return celsius + 273.15;
}

function convert(value: number, from: string, to: string, category: Category): number {
  if (category === "temperature") return convertTemperature(value, from, to);
  return (value * units[category][from].value) / units[category][to].value;
}

function parseInput(input: string): { value: number | null; from: string; to?: string } | null {
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
  const toMatch = cleaned.match(/\s+(?:to|in|=|-|->)\s+(.+)$/i);
  const toUnitText = toMatch ? toMatch[1].trim() : "cm";
  const resolvedTo = resolveUnit(toUnitText);

  return {
    value: meters,
    from: "m",
    to: resolvedTo?.unit ?? "cm",
  };
}
  // Match: number + unit (+ optional "to"/"in"/"=" + unit)
  const regex = /^(-?\d+(?:\.\d+)?(?:e-?\d+)?)\s*([a-zA-Zµ°/ ]+?)(?:\s+(?:to|in|=|->)\s+([a-zA-Zµ°/ ]+))?\s*$/i;
  const match = cleaned.match(regex);
  if (!match) return null;

  return {
    value: match[1] !== undefined ? parseFloat(match[1]) : null,
    from: match[2].trim(),
    to: match[3]?.trim(),
  };
}

function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.0001 || abs >= 1e15)) {
    return n.toExponential(6);
  }
  return n.toLocaleString(undefined, { minimumFractionDigits: 0,
    maximumFractionDigits: 3,
   });
}
function metersToFeetInches(meters: number): string {
  const totalInches = meters / 0.0254;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return `${feet} ft ${inches} in`;
}
function feetInchesToMeters(text: string): number {
  const match = text.match(
    /(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')\s*(\d+(?:\.\d+)?)?\s*(?:in|inch|inches|")?/i
  );

  if (!match) return parseFloat(text) * 0.3048;

  const feet = parseFloat(match[1]);
  const inches = match[2] ? parseFloat(match[2]) : 0;

  return (feet * 12 + inches) * 0.0254;
}

function formatTimeSmart(seconds: number): string {
  if (!isFinite(seconds)) return "";
  let remaining = Math.round(seconds);
  const years = Math.floor(remaining / 31536000);
  remaining %= 31536000;
  const months = Math.floor(remaining / 2629800);
  remaining %= 2629800;
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} yr`);
  if (months > 0) parts.push(`${months} mo`);
  if (days > 0) parts.push(`${days} d`);
  if (hours > 0) parts.push(`${hours} h`);
  if (minutes > 0) parts.push(`${minutes} min`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} sec`);

  return parts.join(" ");
}
function formatTimeForTarget(seconds: number, target: string): string {
  if (!isFinite(seconds)) return "";

  const totalSeconds = Math.round(seconds);

  if (target === "wk") {
    const weeks = Math.floor(totalSeconds / 604800);
    const days = Math.floor((totalSeconds % 604800) / 86400);
    return days > 0 ? `${weeks} wk ${days} d` : `${weeks} wk`;
  }

  if (target === "yr") {
    return formatTimeSmart(totalSeconds);
  }

  if (target === "mo") {
    const months = Math.floor(totalSeconds / 2629800);
    const days = Math.floor((totalSeconds % 2629800) / 86400);
    return days > 0 ? `${months} mo ${days} d` : `${months} mo`;
  }

  return formatTimeSmart(totalSeconds);
}
function getResultUnitLabel(category: Category, unit: string): string {
  if (category === "temperature" && unit === "gasMark") {
    return "Gas Mark";
  }

  return unit;
}

export default function Converter() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<string>("m");
  const [to, setTo] = useState<string>("ft");
  const [input, setInput] = useState<string>("");
  const [parseError, setParseError] = useState<string>("");

  const easterEgg = getEasterEgg(input);

  const numericValue =
  value === "" || value === null
    ? 0
    : from === "ftin"
      ? feetInchesToMeters(value)
      : parseFloat(value) || 0;
  const result = useMemo(
    () => convert(numericValue, from, to, category),
    [numericValue, from, to, category],
  );
  const options = Object.keys(units[category]);
  const resultUnitLabel = getResultUnitLabel(category, to);

  // Smart parsing
  useEffect(() => {
    if (!input.trim()) {
      setParseError("");
      return;
    }
   const gasMarkFirstMatch = input.match(
  /(?:gas\s*mark|oven\s*gas|gas\s*oven|uk\s*gas\s*mark)\s*(\d+(?:\.\d+)?)\s*(?:to|in)\s*(c|f|k|celsius|fahrenheit|kelvin)/i
);

if (gasMarkFirstMatch) {
  const value = Number(gasMarkFirstMatch[1]);
  const target = gasMarkFirstMatch[2].toLowerCase();

  const targetUnit =
    target === "c" || target === "celsius"
      ? "C"
      : target === "f" || target === "fahrenheit"
      ? "F"
      : "K";

  setCategory("temperature");
  setFrom("gasMark");
  setTo(targetUnit);
  setValue(String(value));
  return;
}
    const parsed = parseInput(input);
    if (!parsed) {
      setParseError("");
      return;
    }

    const fromInfo = resolveUnit(parsed.from);
    if (!fromInfo) {
      setParseError(`Don't recognize "${parsed.from}"`);
      return;
    }

    if (parsed.to) {
      const toInfo = resolveUnit(parsed.to);
      if (!toInfo) {
        setParseError(`Don't recognize "${parsed.to}"`);
        return;
      }
      if (toInfo.category !== fromInfo.category) {
        setParseError(`Can't convert ${fromInfo.category} to ${toInfo.category}`);
        return;
      }
      setParseError("");
      setCategory(fromInfo.category);
      setFrom(fromInfo.unit);
      setTo(toInfo.unit);
      if (parsed.value !== null) {
        setValue(String(parsed.value));
      }
    } else {
      setParseError("");
      setCategory(fromInfo.category);
      setFrom(fromInfo.unit);
      // Pick a sensible default destination if current `to` doesn't match category
      const catUnits = Object.keys(units[fromInfo.category]);
      const fallback = catUnits.find((u) => u !== fromInfo.unit) ?? fromInfo.unit;
      if (!units[fromInfo.category][to]) setTo(fallback);
      if (parsed.value !== null) {
        setValue(String(parsed.value));
      }
    }
    
  }, [input]);

  // When category changes from dropdown, reset units
  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const keys = Object.keys(units[cat]);
    setFrom(keys[0]);
    setTo(keys[1] ?? keys[0]);
    setInput("");
    setParseError("");
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/40 text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-20">
        <header className="mb-10 text-center">
          <a href="/" className="back-button">
          ← Back to Toolsets
          </a>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Type naturally — like a search bar
          </div>
          <h1 style={{ color: "white" }}className="text-6xl font-extrabold tracking-tight">
            Instant Unit Converter
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Length, mass, volume, speed, temperature, and time — all in one place.
          </p>
        </header>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
          {/* Search-style input */}
          <div className="relative">
            <input
              type="text"
              inputMode="text"
              autoFocus
              placeholder="e.g. 100 kg to lb"
              className="w-full rounded-2xl border-2 px-6 py-4 text-xl outline-none shadow-xl"
              style={{
                backgroundColor: "#111827",
                color: "white",
                border: "2px solid #a855f7",
                padding: "14px 16px",
                fontSize: "18px",
                borderRadius: "14px",
                width: "100%",
                maxWidth: "900px",
                margin: "0 auto",
                display: "block",
                boxSizing: "border-box"
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {parseError && (
            <p className="mt-2 text-sm text-destructive">{parseError}</p>
          )}

          {/* Example chips */}
          <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "8px",
            justifyContent: window.innerWidth < 640 ? "flex-start" : "center",
            overflowX: window.innerWidth < 640 ? "auto" : "visible",
            flexWrap: window.innerWidth < 640 ? "nowrap" : "wrap",
            whiteSpace: window.innerWidth < 640 ? "nowrap" : "normal",
            padding: "0 12px 6px",
            maxWidth: "100%",
            scrollbarWidth: "none",
          }}
          >
            {exampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                style={{
                  backgroundColor: "#111827",
                  color: "#d1d5db",
                  border: "1px solid #374151",
                  borderRadius: "9999px",
                  padding: "4px 10px",
                  margin: "2px",
                  cursor: "pointer",
                  fontSize: "12px",
                  flex: "0 0 auto",
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Category tabs */}
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className=""
                style={{
                  backgroundColor: category === cat ? "a855f7" : "1f2937",
                  color: "white",
                  border: "1px solid #374151",
                  borderRadius: "9999px",
                  padding: "7px 12px",
                  margin: "2px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "13px",
                  transition: "all 2.0 ease",
                }}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
{/* Manual selectors */}
<div
  style={{
    marginTop: "20px",
    display: "14",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
  }}
>
  {/* From / Swap / To row */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
      window.innerWidth < 640 ? "minmax(0, 1fr) 44px minmax(0, 1fr)" : "280px 72px 280px",
      gap: window.innerWidth < 640 ? "4px" : "28px",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "720px",
      margin: "0 auto",
    }}
  >
    <div>
      <label style={{
        display: window.innerWidth < 640 ? "block" : "none",
        marginBottom: "10px",
        color: "#d1d5db"
      }}>
        From
      </label>

      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        style={{
          maxWidth: "100%",
          minWidth: "0",
          boxSizing: "border-box",
          width: "100%",
          overflow: "hidden",
          padding: window.innerWidth < 640 ? "10px 8px" : "14px 16px",
          borderRadius: "12px",
          backgroundColor: "#070b12",
          color: "white",
          border: "1px solid #374151",
          fontSize: window.innerWidth < 640 ? "13px" : "16px",
        }}
      >
        {options.map((u) => (
          <option key={u} value={u}>
            {units[category][u].label}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={swap}
      aria-label="Swap units"
      style={{
        width: window.innerWidth < 640 ? "42px" : "56px",
        height: window.innerWidth < 640 ? "42px" : "56px",
        borderRadius: "9999px",
        backgroundColor: "#7c3aed",
        boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
        color: "white",
        border: "none",
        fontSize: window.innerWidth < 640 ? "20px" : "26px",
        cursor: "pointer",
        justifySelf: "center",
        alignSelf: "center",
      }}
    >
      ⇄
    </button>

    <div>
      <label style={{ 
        display: window.innerWidth < 640 ? "block" : "none",
        marginBottom: "10px",
        color: "#d1d5db"
      }}>
        To
      </label>

      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{
          maxWidth: "100%",
          minWidth: "0",
          boxSizing: "border-box",
          width: "100%",
          overflow: "hidden",
          padding: window.innerWidth < 640 ? "10px 8px" : "14px 16px",
          borderRadius: "12px",
          backgroundColor: "#070b12",
          color: "white",
          border: "1px solid #374151",
          fontSize: window.innerWidth < 640 ? "13px" : "16px",
        }}
      >
        {options.map((u) => (
          <option key={u} value={u}>
            {units[category][u].label}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Value input below From/To */}
  <div
  style={{
    width: "100%",
    maxWidth: "560px",
    margin: "12px auto 0",
    textAlign: "center",
  }}
>
    <label
      style={{
        display: "block",
        marginBottom: "10px",
        color: "#d1d5db",
        textAlign: "center",
      }}
    >
      Enter value
    </label>

    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter a number"
      style={{
        width: "100%",
        maxWidth: "560px",
        padding: "12px 16px",
        borderRadius: "12px",
        backgroundColor: "#070b12",
        color: "white",
        border: "1px solid #374151",
        fontSize: "16px",
      }}
    />
  </div>
</div>          
          {/* Result */}
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "16px",
              backgroundColor: "#111827",
              border: "1px solid #374151",
            }}
          >
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Result
            </div>
            <div
            style={{
              marginTop: "8px",
              fontSize: "32px",
              fontWeight: "700",
              color: "ffffff",
              lineHeight: "1.1",
              textShadow: "none",
            }}
            >
            {easterEgg
            ?easterEgg.title
            : category === "temperature" && !isFinite(result)
             ? "Below absolute zero"
             : to === "ftin"
             ? metersToFeetInches(numericValue * units[category][from].value)
             : `${formatNumber(result)} ${resultUnitLabel}`
             }
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
             {easterEgg
             ? easterEgg.subtitle
             : category === "temperature" && !isFinite(result)
             ? "Temperature cannot go below 0 K (-273.15 °C or -459.67 °F)"
             : to === "ftin"
             ? metersToFeetInches(numericValue * units[category][from].value)
             : category === "time"
             ? formatTimeForTarget(numericValue * units[category][from].value, to)
             : `${formatNumber(result)} ${resultUnitLabel}`
             }
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Try natural language like "5 miles in km" or "350 F to C"
        </p>
      </div>
    </div>
  );
}

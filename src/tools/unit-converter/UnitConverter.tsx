import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

import {
  units,
  categoryLabels,
  type Category,
} from "./UnitData";

import { exampleQueries } from "./UnitExamples";
import { getEasterEgg } from "./UnitEasterEggs";
import { convertTemperature } from "./TemperatureUtils";

import {
  feetInchesToMeters,
  formatNumber,
  formatTimeForTarget,
  metersToFeetInches,
} from "./FormatUtils";

import {
  parseInput,
  resolveUnit,
} from "./UnitParser";

import "./UnitConverter.css";

function convert(
  value: number,
  from: string,
  to: string,
  category: Category,
): number {
  if (category === "temperature") {
    return convertTemperature(value, from, to);
  }

  return (
    value * units[category][from].value
  ) / units[category][to].value;
}

function getResultUnitLabel(
  category: Category,
  unit: string,
): string {
  if (category === "temperature" && unit === "gasMark") {
    return "Gas Mark";
  }

  return unit;
}

export default function Converter() {
  const [category, setCategory] =
    useState<Category>("length");

  const [value, setValue] = useState("");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");

  const [input, setInput] = useState("");
  const [parseError, setParseError] = useState("");

  const easterEgg = getEasterEgg(input);

  const options = Object.keys(units[category]);

  const numericValue = useMemo(() => {
    if (value.trim() === "") {
      return 0;
    }

    if (from === "ftin") {
      return feetInchesToMeters(value);
    }

    const parsedValue = Number.parseFloat(value);

    return Number.isFinite(parsedValue)
      ? parsedValue
      : 0;
  }, [value, from]);

  const result = useMemo(
    () => convert(
      numericValue,
      from,
      to,
      category,
    ),
    [numericValue, from, to, category],
  );

  const resultUnitLabel =
    getResultUnitLabel(category, to);

  useEffect(() => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setParseError("");
      return;
    }

    const gasMarkFirstMatch = trimmedInput.match(
      /(?:gas\s*mark|oven\s*gas|gas\s*oven|uk\s*gas\s*mark)\s*(\d+(?:\.\d+)?)\s*(?:to|in)\s*(c|f|k|celsius|fahrenheit|kelvin)/i,
    );

    if (gasMarkFirstMatch) {
      const parsedValue = Number(
        gasMarkFirstMatch[1],
      );

      const target =
        gasMarkFirstMatch[2].toLowerCase();

      const targetUnit =
        target === "c" || target === "celsius"
          ? "C"
          : target === "f" ||
              target === "fahrenheit"
            ? "F"
            : "K";

      setParseError("");
      setCategory("temperature");
      setFrom("gasMark");
      setTo(targetUnit);
      setValue(String(parsedValue));

      return;
    }

    const parsed = parseInput(trimmedInput);

    if (!parsed) {
      setParseError("");
      return;
    }

    const fromInfo = resolveUnit(parsed.from);

    if (!fromInfo) {
      setParseError(
        `Don't recognize "${parsed.from}"`,
      );

      return;
    }

    if (parsed.to) {
      const toInfo = resolveUnit(parsed.to);

      if (!toInfo) {
        setParseError(
          `Don't recognize "${parsed.to}"`,
        );

        return;
      }

      if (toInfo.category !== fromInfo.category) {
        setParseError(
          `Can't convert ${fromInfo.category} to ${toInfo.category}`,
        );

        return;
      }

      setParseError("");
      setCategory(fromInfo.category);
      setFrom(fromInfo.unit);
      setTo(toInfo.unit);

      if (parsed.value !== null) {
        setValue(String(parsed.value));
      }

      return;
    }

    const categoryUnits =
      Object.keys(units[fromInfo.category]);

    const fallbackUnit =
      categoryUnits.find(
        (unit) => unit !== fromInfo.unit,
      ) ?? fromInfo.unit;

    setParseError("");
    setCategory(fromInfo.category);
    setFrom(fromInfo.unit);
    setTo(fallbackUnit);

    if (parsed.value !== null) {
      setValue(String(parsed.value));
    }
  }, [input]);

  const handleCategoryChange = (
    nextCategory: Category,
  ) => {
    const categoryUnits =
      Object.keys(units[nextCategory]);

    setCategory(nextCategory);
    setFrom(categoryUnits[0]);
    setTo(categoryUnits[1] ?? categoryUnits[0]);

    setInput("");
    setParseError("");
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const getMainResult = (): string => {
    if (easterEgg) {
      return easterEgg.title;
    }

    if (
      category === "temperature" &&
      !Number.isFinite(result)
    ) {
      return "Below absolute zero";
    }

    if (to === "ftin") {
      return metersToFeetInches(
        numericValue *
          units[category][from].value,
      );
    }

    return `${formatNumber(result)} ${resultUnitLabel}`;
  };

  const getResultDescription = (): string => {
    if (easterEgg) {
      return easterEgg.subtitle;
    }

    if (
      category === "temperature" &&
      !Number.isFinite(result)
    ) {
      return "Temperature cannot go below 0 K (-273.15 °C or -459.67 °F)";
    }

    if (to === "ftin") {
      return metersToFeetInches(
        numericValue *
          units[category][from].value,
      );
    }

    if (category === "time") {
      return formatTimeForTarget(
        numericValue *
          units[category][from].value,
        to,
      );
    }

    return `${formatNumber(result)} ${resultUnitLabel}`;
  };

  return (
    <div className="converter-page">
      <div className="converter-container">
        <header className="converter-header">
          <a href="/" className="back-button">
            ← Back to Toolsets
          </a>

          <div className="converter-eyebrow">
            <Sparkles
              className="converter-eyebrow-icon"
              aria-hidden="true"
            />

            <span>
              Type naturally — like a search bar
            </span>
          </div>

          <h1 className="converter-title">
            Instant Unit Converter
          </h1>

          <p className="converter-description">
            Length, mass, volume, speed,
            temperature, and time — all in one
            place.
          </p>
        </header>

        <main className="converter-card">
          <input
            type="text"
            inputMode="text"
            autoFocus
            className="converter-search"
            placeholder="e.g. 100 kg to lb"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
          />

          {parseError && (
            <p
              className="converter-error"
              role="alert"
            >
              {parseError}
            </p>
          )}

          <div className="converter-examples">
            {exampleQueries.map((query) => (
              <button
                key={query}
                type="button"
                className="example-chip"
                onClick={() => setInput(query)}
              >
                {query}
              </button>
            ))}
          </div>

          <div className="converter-categories">
            {(
              Object.keys(
                categoryLabels,
              ) as Category[]
            ).map((categoryKey) => (
              <button
                key={categoryKey}
                type="button"
                className={`category-button ${
                  category === categoryKey
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleCategoryChange(
                    categoryKey,
                  )
                }
              >
                {categoryLabels[categoryKey]}
              </button>
            ))}
          </div>

          <section className="converter-manual-section">
            <div className="converter-controls">
              <label className="converter-field">
                <span className="converter-field-label">
                  From
                </span>

                <select
                  className="converter-select"
                  value={from}
                  onChange={(event) =>
                    setFrom(event.target.value)
                  }
                >
                  {options.map((unit) => (
                    <option
                      key={unit}
                      value={unit}
                    >
                      {units[category][unit].label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className="swap-button"
                aria-label="Swap units"
                onClick={handleSwap}
              >
                ⇄
              </button>

              <label className="converter-field">
                <span className="converter-field-label">
                  To
                </span>

                <select
                  className="converter-select"
                  value={to}
                  onChange={(event) =>
                    setTo(event.target.value)
                  }
                >
                  {options.map((unit) => (
                    <option
                      key={unit}
                      value={unit}
                    >
                      {units[category][unit].label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="converter-value-field">
              <span className="converter-value-label">
                Enter value
              </span>

              <input
                type="text"
                inputMode="decimal"
                className="converter-input"
                value={value}
                placeholder="Enter a number"
                onChange={(event) =>
                  setValue(event.target.value)
                }
              />
            </label>
          </section>

          <section
            className="converter-result"
            aria-live="polite"
          >
            <div className="result-label">
              Result
            </div>

            <div className="result-value">
              {getMainResult()}
            </div>

            <div className="result-description">
              {getResultDescription()}
            </div>
          </section>
        </main>

        <p className="converter-footer-note">
          Try natural language like “5 miles in
          km” or “350 F to C”
        </p>
      </div>
    </div>
  );
}
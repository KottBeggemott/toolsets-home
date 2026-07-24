import { useMemo, useState } from "react";
import CalculatorLayout from "../../components/CalculatorLayout";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import NumberInput from "../../components/NumberInput";
import SelectField from "../../components/SelectField";
import ResultCard from "../../components/ResultCard";
import "./WaistToHeightCalculator.css";

function WaistToHeightCalculator() {
  const [unit, setUnit] = useState("cm");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");

  const handleUnitChange = (newUnit: string) => {
  if (newUnit === unit) return;

  const convertValue = (value: string) => {
    if (!value) return "";

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return value;
    }

    const convertedValue =
      newUnit === "in"
        ? numericValue / 2.54
        : numericValue * 2.54;

    return convertedValue.toFixed(1);
  };

  setHeight((currentHeight) => convertValue(currentHeight));
  setWaist((currentWaist) => convertValue(currentWaist));
  setUnit(newUnit);
};

  const result = useMemo(() => {
    const heightNum = Number(height);
    const waistNum = Number(waist);

    if (
      !Number.isFinite(heightNum) ||
      !Number.isFinite(waistNum) ||
      heightNum <= 0 ||
      waistNum <= 0
    ) {
      return null;
    }

    const heightCm = unit === "in" ? heightNum * 2.54 : heightNum;
    const waistCm = unit === "in" ? waistNum * 2.54 : waistNum;

    if (waistCm >= heightCm) {
      return null;
    }

    const ratio = waistCm / heightCm;

    let category = "";
    let risk = "";
    let message = "";

    if (ratio < 0.4) {
      category = "Very lean";
      risk = "Low";
      message =
        "Your waist circumference is very small relative to your height. Consider your overall health, nutrition and body composition rather than relying on this ratio alone.";
    } else if (ratio < 0.5) {
      category = "Healthy range";
      risk = "Lower";
      message =
        "Your waist-to-height ratio is within the commonly recommended range below 0.5.";
    } else if (ratio < 0.6) {
      category = "Increased risk";
      risk = "Moderate";
      message =
        "Your waist is more than half your height. Reducing waist circumference may help improve long-term health.";
    } else {
      category = "High risk";
      risk = "Higher";
      message =
        "Your waist circumference is high relative to your height. Consider discussing your result with a qualified healthcare professional.";
    }

    const targetMaximumWaist = heightCm * 0.5;
    const waistDifference = waistCm - targetMaximumWaist;

    return {
      ratio,
      category,
      risk,
      message,
      heightCm,
      waistCm,
      targetMaximumWaist,
      waistDifference,
    };
  }, [height, waist, unit]);

  const resetCalculator = () => {
    setUnit("cm");
    setHeight("");
    setWaist("");
  };

  const copyResult = async () => {
    if (!result) return;

    const targetWaist =
      unit === "in"
        ? `${(result.targetMaximumWaist / 2.54).toFixed(1)} in`
        : `${result.targetMaximumWaist.toFixed(1)} cm`;

    const text = `Waist-to-Height Ratio Calculator Result:
Ratio: ${result.ratio.toFixed(2)}
Category: ${result.category}
Health risk: ${result.risk}
Maximum waist at a 0.50 ratio: ${targetWaist}`;

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Could not copy result:", error);
    }
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `My waist-to-height ratio is ${result.ratio.toFixed(
      2
    )}, classified as ${result.category.toLowerCase()}.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Waist-to-Height Ratio Result",
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `${text} ${window.location.href}`
        );
      }
    } catch (error) {
      console.error("Could not share result:", error);
    }
  };

  const targetWaistDisplay = result
    ? unit === "in"
      ? `${(result.targetMaximumWaist / 2.54).toFixed(1)} in`
      : `${result.targetMaximumWaist.toFixed(1)} cm`
    : "--";

  const waistDifferenceDisplay = result
    ? result.waistDifference > 0
      ? unit === "in"
        ? `${(result.waistDifference / 2.54).toFixed(1)} in above`
        : `${result.waistDifference.toFixed(1)} cm above`
      : "Within target"
    : "--";

    const ratioScalePosition = result
    ? Math.min(
      100,
      Math.max(0, ((result.ratio - 0.3) / (0.7 - 0.3)) * 100)
    )
    : 0;

  return (
    <>
      <SEO
        title="Waist-to-Height Ratio Calculator"
        description="Calculate your waist-to-height ratio and compare your waist circumference with the commonly recommended 0.5 threshold."
        canonicalPath="/waist-to-height-calculator"
      />

      <CalculatorLayout
        title="Waist-to-Height Ratio Calculator"
        subtitle="Compare your waist circumference with your height and estimate your level of health risk."
        result={
          result ? (
            <>
              <ResultCard
                title="Waist-to-height ratio"
                mainResult={result.ratio.toFixed(2)}
                items={[
                  {
                    label: "Category",
                    value: result.category,
                  },
                  {
                    label: "Health risk",
                    value: result.risk,
                  },
                  {
                    label: "Waist as % of height",
                    value: `${(result.ratio * 100).toFixed(1)}%`,
                  },
                  {
                    label: "Maximum waist at 0.50",
                    value: targetWaistDisplay,
                  },
                  {
                    label: "Compared with 0.50 target",
                    value: waistDifferenceDisplay,
                  },
                ]}
              />
<div className="ratio-visual">
  <div className="ratio-scale">
    <div className="ratio-zone ratio-zone-lean" />
    <div className="ratio-zone ratio-zone-healthy" />
    <div className="ratio-zone ratio-zone-increased" />
    <div className="ratio-zone ratio-zone-high" />

    <div
      className="ratio-marker"
      style={{ left: `${ratioScalePosition}%` }}
      aria-label={`Your waist-to-height ratio is ${result.ratio.toFixed(2)}`}
    >
      <span className="ratio-marker-value">
        {result.ratio.toFixed(2)}
      </span>
    </div>
  </div>

  <div className="ratio-scale-values">
    <span>0.30</span>
    <span>0.40</span>
    <span>0.50</span>
    <span>0.60</span>
    <span>0.70</span>
  </div>

  <div className="ratio-scale-labels">
    <span>Very lean</span>
    <span>Healthy</span>
    <span>Increased</span>
    <span>High</span>
  </div>
</div>

              <p className="result-message">{result.message}</p>
            </>
          ) : (
            <p className="result-label">
              Enter your height and waist circumference to calculate.
            </p>
          )
        }
        actions={
          <ActionButtons
            onReset={resetCalculator}
            onCopy={copyResult}
            onShare={shareResult}
          />
        }
        infoTitle="How to measure"
        info={
          <>
            <p>
              Measure your height without shoes while standing upright against a
              wall.
            </p>

            <p>
              Measure your waist with a flexible tape around your abdomen. Keep
              the tape horizontal and avoid pulling it too tightly.
            </p>

            <p>
              Use the same unit for both measurements. The calculator supports
              centimetres and inches.
            </p>

            <p>
              Waist-to-height ratio is a screening estimate only. It does not
              diagnose a medical condition or replace professional advice.
            </p>
          </>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What is waist-to-height ratio?",
                answer:
                  "Waist-to-height ratio compares your waist circumference with your height. It is calculated by dividing waist circumference by height.",
              },
              {
                question: "What is a healthy waist-to-height ratio?",
                answer:
                  "A ratio below 0.50 is commonly used as a simple general target, although individual health, age and body composition should also be considered.",
              },
              {
                question: "Why should my waist be less than half my height?",
                answer:
                  "A larger waist relative to height can indicate greater abdominal fat. Keeping the waist below half of height is a simple screening guideline.",
              },
              {
                question: "Is waist-to-height ratio better than BMI?",
                answer:
                  "The two measurements describe different things. BMI compares weight with height, while waist-to-height ratio focuses more directly on abdominal size.",
              },
              {
                question: "Does it matter whether I use centimetres or inches?",
                answer:
                  "No. The ratio will be the same as long as both height and waist are entered using the same unit.",
              },
            ]}
          />
        }
        relatedTools={
          <RelatedTools
            tools={[
              {
                name: "BMI Calculator",
                url: "/bmi-calculator",
                description:
                  "Calculate your BMI and estimated healthy weight range.",
              },
              {
                name: "Body Fat Calculator",
                url: "/body-fat-calculator",
                description:
                  "Estimate body fat percentage using body measurements.",
              },
              {
                name: "TDEE Calculator",
                url: "/tdee-calculator",
                description:
                  "Estimate daily calorie needs and macro targets.",
              },
            ]}
          />
        }
      >
        <div className="input-grid">
          <SelectField
            label="Units"
            value={unit}
            onChange={handleUnitChange}
            options={[
              { value: "cm", label: "Centimetres" },
              { value: "in", label: "Inches" },
            ]}
          />

          <NumberInput
            label={`Height (${unit === "cm" ? "cm" : "in"})`}
            value={height}
            onChange={setHeight}
            min="1"
            placeholder={
              unit === "cm"
                ? "Enter height in cm"
                : "Enter height in inches"
            }
          />

          <NumberInput
            label={`Waist (${unit === "cm" ? "cm" : "in"})`}
            value={waist}
            onChange={setWaist}
            min="1"
            placeholder={
              unit === "cm"
                ? "Enter waist in cm"
                : "Enter waist in inches"
            }
          />
        </div>
      </CalculatorLayout>
    </>
  );
}

export default WaistToHeightCalculator;
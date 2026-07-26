import { useMemo, useState } from "react";
import CalculatorLayout from "../../components/CalculatorLayout";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import NumberInput from "../../components/NumberInput";
import SelectField from "../../components/SelectField";
import ResultCard from "../../components/ResultCard";

function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("cm");
  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo(() => {
    const heightNum = Number(height);
    const waistNum = Number(waist);
    const neckNum = Number(neck);
    const hipNum = Number(hip);
    const weightNum = Number(weight);

    const toInches = (value: number) =>
      unit === "cm" ? value / 2.54 : value;

    const h = toInches(heightNum);
    const w = toInches(waistNum);
    const n = toInches(neckNum);
    const hp = toInches(hipNum);

    let bodyFat: number | null = null;

    if (gender === "male" && h > 0 && w > 0 && n > 0 && w > n) {
      bodyFat = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    }

    if (
      gender === "female" &&
      h > 0 &&
      w > 0 &&
      n > 0 &&
      hp > 0 &&
      w + hp > n
    ) {
      bodyFat =
        163.205 * Math.log10(w + hp - n) -
        97.684 * Math.log10(h) -
        78.387;
    }

    if (bodyFat === null || bodyFat <= 0 || bodyFat > 75) {
      return null;
    }

    const leanBodyMass =
      weightNum > 0 ? weightNum * (1 - bodyFat / 100) : null;

    const fatMass =
      weightNum > 0 ? weightNum * (bodyFat / 100) : null;

    const leanMassPercent = 100 - bodyFat;

    let category = "";
    let message = "";

    if (gender === "male") {
      if (bodyFat < 6) {
        category = "Very low";
        message = "This is extremely lean and may not be healthy long term.";
      } else if (bodyFat < 14) {
        category = "Athletic";
        message = "This is a lean athletic range.";
      } else if (bodyFat < 18) {
        category = "Fit";
        message = "This is a healthy and fit range for many men.";
      } else if (bodyFat < 25) {
        category = "Average";
        message =
          "This is a common range. Nutrition and activity can improve it.";
      } else {
        category = "High";
        message =
          "A calorie deficit, strength training and daily movement may help.";
      }
    } else {
      if (bodyFat < 14) {
        category = "Very low";
        message = "This is extremely lean and may not be healthy long term.";
      } else if (bodyFat < 21) {
        category = "Athletic";
        message = "This is a lean athletic range.";
      } else if (bodyFat < 25) {
        category = "Fit";
        message = "This is a healthy and fit range for many women.";
      } else if (bodyFat < 32) {
        category = "Average";
        message =
          "This is a common range. Nutrition and activity can improve it.";
      } else {
        category = "High";
        message =
          "A calorie deficit, strength training and daily movement may help.";
      }
    }

    return {
      bodyFat,
      leanBodyMass,
      fatMass,
      leanMassPercent,
      category,
      message,
    };
  }, [gender, unit, height, waist, neck, hip, weight]);

  const resetCalculator = () => {
    setGender("male");
    setUnit("cm");
    setHeight("");
    setWaist("");
    setNeck("");
    setHip("");
    setWeight("");
  };

  const copyResult = async () => {
    if (!result) return;

    const text = `Body Fat Calculator Result:
Estimated body fat: ${result.bodyFat.toFixed(1)}%
Category: ${result.category}
Lean body mass: ${
      result.leanBodyMass ? `${result.leanBodyMass.toFixed(1)} kg` : "Not calculated"
    }
Fat mass: ${
      result.fatMass ? `${result.fatMass.toFixed(1)} kg` : "Not calculated"
    }
Method: U.S. Navy Formula`;

    await navigator.clipboard.writeText(text);
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `My estimated body fat is ${result.bodyFat.toFixed(
      1
    )}% using the U.S. Navy formula.`;

    if (navigator.share) {
      await navigator.share({
        title: "Body Fat Calculator Result",
        text,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    }
  };

  return (
    <>
      <SEO
        title="Body Fat Calculator"
        description="Estimate your body fat percentage using the U.S. Navy body fat formula."
        canonicalPath="/body-fat-calculator"
      />

      <CalculatorLayout
        title="U.S. Navy Body Fat Calculator"
        subtitle="Estimate your body fat percentage using body measurements."
        result={
          result ? (
            <>
              <ResultCard
                title="Estimated body fat"
                mainResult={`${result.bodyFat.toFixed(1)}%`}
                items={[
                  {
                    label: "Category",
                    value: result.category,
                  },
                  {
                    label: "Lean mass",
                    value: result.leanBodyMass
                      ? `${result.leanBodyMass.toFixed(1)} kg`
                      : "--",
                  },
                  {
                    label: "Fat mass",
                    value: result.fatMass
                      ? `${result.fatMass.toFixed(1)} kg`
                      : "--",
                  },
                  {
                    label: "Lean mass %",
                    value: `${result.leanMassPercent.toFixed(1)}%`,
                  },
                  {
                    label: "Method",
                    value: "U.S. Navy Formula",
                  },
                ]}
              />

              <p className="result-message">{result.message}</p>
            </>
          ) : (
            <p className="result-label">Enter your measurements to calculate.</p>
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
              Measure your waist around the narrowest point or around navel
              level. Measure your neck just below the Adam&apos;s apple.
            </p>

            <p>
              For female calculations, hip measurement is also required. Measure
              around the widest part of the hips.
            </p>

            <p>
              This calculator gives an estimate only and does not replace a
              medical or professional body composition assessment.
            </p>
          </>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What formula does this calculator use?",
                answer:
                  "This calculator uses the U.S. Navy body fat formula, which estimates body fat percentage from body measurements.",
              },
              {
                question: "Is the U.S. Navy body fat formula exact?",
                answer:
                  "No. It is an estimate. Measurement accuracy, body shape, and individual differences can affect the result.",
              },
              {
                question: "Why is hip measurement needed for women?",
                answer:
                  "The female version of the U.S. Navy formula uses waist, neck, hip, and height measurements.",
              },
            ]}
          />
        }
        relatedTools={
          <RelatedTools
            tools={[
              {
                name: "TDEE Calculator",
                url: "/tdee-calculator",
                description:
                  "Calculate maintenance calories and daily macro targets.",
              },
              {
                name: "BMI Calculator",
                url: "/bmi-calculator",
                description: "Calculate BMI and healthy weight range.",
              },
            ]}
          />
        }
      >
        <div className="input-grid">
          <SelectField
            label="Gender"
            value={gender}
            onChange={setGender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />

          <SelectField
            label="Units"
            value={unit}
            onChange={setUnit}
            options={[
              { value: "cm", label: "Centimeters" },
              { value: "in", label: "Inches" },
            ]}
          />

          <NumberInput
            label={`Height (${unit === "cm" ? "cm" : "in"})`}
            value={height}
            onChange={setHeight}
            min="1"
            placeholder={unit === "cm" ? "Enter height in cm" : "Enter height in inches"}
          />

          <NumberInput
            label={`Waist (${unit === "cm" ? "cm" : "in"})`}
            value={waist}
            onChange={setWaist}
            min="1"
            placeholder={unit === "cm" ? "Enter waist in cm" : "Enter waist in inches"}
          />

          <NumberInput
            label={`Neck (${unit === "cm" ? "cm" : "in"})`}
            value={neck}
            onChange={setNeck}
            min="1"
            placeholder={unit === "cm" ? "Enter neck in cm" : "Enter neck in inches"}
          />

          <NumberInput
            label="Weight (kg, optional)"
            value={weight}
            onChange={setWeight}
            min="1"
            placeholder="Enter weight in kg"
          />

          {gender === "female" && (
            <NumberInput
              label={`Hip (${unit === "cm" ? "cm" : "in"})`}
              value={hip}
              onChange={setHip}
              min="1"
              placeholder={unit === "cm" ? "Enter hip in cm" : "Enter hip in inches"}
            />
          )}
        </div>
      </CalculatorLayout>
    </>
  );
}

export default BodyFatCalculator;
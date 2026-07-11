import { useMemo, useState } from "react";
import "./BMICalculator.css";
import CalculatorLayout from "../../components/CalculatorLayout";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import NumberInput from "../../components/NumberInput";
import SelectField from "../../components/SelectField";
import ResultCard from "../../components/ResultCard";

type Gender = "male" | "female";
type HeightUnit = "cm" | "ftin";
type WeightUnit = "kg" | "lb";

function BMICalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");

  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo(() => {
    const heightNumber = Number.parseFloat(height);
    const feetNumber = Number.parseFloat(feet);
    const inchesNumber = Number.parseFloat(inches);
    const weightNumber = Number.parseFloat(weight);
    const ageNumber = Number.parseFloat(age);

    const safeFeet = Number.isFinite(feetNumber) ? feetNumber : 0;
    const safeInches = Number.isFinite(inchesNumber) ? inchesNumber : 0;

    const heightInCm =
      heightUnit === "cm"
        ? heightNumber
        : safeFeet * 30.48 + safeInches * 2.54;

    const weightInKg =
      weightUnit === "kg" ? weightNumber : weightNumber * 0.453592;

    if (
      !Number.isFinite(heightInCm) ||
      !Number.isFinite(weightInKg) ||
      heightInCm <= 0 ||
      weightInKg <= 0
    ) {
      return null;
    }

    const bmi = weightInKg / Math.pow(heightInCm / 100, 2);

    const estimatedBodyFat =
      Number.isFinite(ageNumber) && ageNumber > 0
        ? gender === "male"
          ? 1.2 * bmi + 0.23 * ageNumber - 16.2
          : 1.2 * bmi + 0.23 * ageNumber - 5.4
        : null;

    const minHealthyWeightKg =
      18.5 * Math.pow(heightInCm / 100, 2);

    const maxHealthyWeightKg =
      24.9 * Math.pow(heightInCm / 100, 2);

    const minHealthyWeight =
      weightUnit === "kg"
        ? minHealthyWeightKg
        : minHealthyWeightKg / 0.453592;

    const maxHealthyWeight =
      weightUnit === "kg"
        ? maxHealthyWeightKg
        : maxHealthyWeightKg / 0.453592;

    let category = "";
    let message = "";

    if (bmi < 18.5) {
      category = "Underweight";
      message =
        "Your BMI is below the standard healthy range. Gradual weight gain and balanced nutrition may be appropriate.";
    } else if (bmi < 25) {
      category = "Healthy weight";
      message = "Your BMI is within the standard healthy range.";
    } else if (bmi < 30) {
      category = "Overweight";
      message =
        "Your BMI is above the standard healthy range. Nutrition, activity and gradual fat loss may help.";
    } else {
      category = "Obese";
      message =
        "Your BMI is within the obesity range. Consider discussing your health goals with a qualified professional.";
    }

    return {
      bmi,
      category,
      message,
      estimatedBodyFat:
        estimatedBodyFat !== null ? Math.max(0, estimatedBodyFat) : null,
      minHealthyWeight,
      maxHealthyWeight,
      healthyWeightUnit: weightUnit === "kg" ? "kg" : "lb",
    };
  }, [
    age,
    gender,
    heightUnit,
    weightUnit,
    height,
    feet,
    inches,
    weight,
  ]);

  const switchHeightUnit = (newUnit: HeightUnit) => {
    if (newUnit === heightUnit) return;

    if (newUnit === "ftin" && height) {
      const currentHeight = Number.parseFloat(height);

      if (Number.isFinite(currentHeight)) {
        const totalInches = currentHeight / 2.54;
        const convertedFeet = Math.floor(totalInches / 12);
        const convertedInches = totalInches % 12;

        setFeet(convertedFeet.toString());
        setInches(convertedInches.toFixed(1));
      }
    }

    if (newUnit === "cm" && (feet || inches)) {
      const currentFeet = Number.parseFloat(feet);
      const currentInches = Number.parseFloat(inches);

      const safeFeet = Number.isFinite(currentFeet) ? currentFeet : 0;
      const safeInches = Number.isFinite(currentInches)
        ? currentInches
        : 0;

      const totalCm = safeFeet * 30.48 + safeInches * 2.54;

      setHeight(totalCm.toFixed(1));
    }

    setHeightUnit(newUnit);
  };

  const switchWeightUnit = (newUnit: WeightUnit) => {
    if (newUnit === weightUnit) return;

    if (weight) {
      const currentWeight = Number.parseFloat(weight);

      if (Number.isFinite(currentWeight)) {
        if (newUnit === "lb") {
          setWeight((currentWeight / 0.453592).toFixed(1));
        } else {
          setWeight((currentWeight * 0.453592).toFixed(1));
        }
      }
    }

    setWeightUnit(newUnit);
  };

  const resetCalculator = () => {
    setAge("");
    setGender("male");
    setHeightUnit("cm");
    setWeightUnit("kg");
    setHeight("");
    setFeet("");
    setInches("");
    setWeight("");
  };

  const copyResult = async () => {
    if (!result) return;

    const bodyFatText =
      result.estimatedBodyFat !== null
        ? `${result.estimatedBodyFat.toFixed(1)}%`
        : "Not calculated";

    const text = `BMI Calculator Result:
BMI: ${result.bmi.toFixed(1)}
Category: ${result.category}
Estimated body fat: ${bodyFatText}
Healthy weight range: ${result.minHealthyWeight.toFixed(
      1
    )}–${result.maxHealthyWeight.toFixed(1)} ${
      result.healthyWeightUnit
    }`;

    await navigator.clipboard.writeText(text);
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `My estimated BMI is ${result.bmi.toFixed(1)} (${
      result.category
    }).`;

    if (navigator.share) {
      await navigator.share({
        title: "BMI Calculator Result",
        text,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        `${text} ${window.location.href}`
      );
    }
  };

  return (
    <>
      <SEO
        title="BMI Calculator"
        description="Calculate your BMI, estimated body fat percentage and healthy weight range using metric or imperial units."
        canonicalPath="/bmi-calculator"
      />

      <CalculatorLayout
        title="BMI Calculator"
        subtitle="Calculate your Body Mass Index using your height and weight."
        result={
          result ? (
            <>
              <ResultCard
                title="Your estimated BMI"
                mainResult={result.bmi.toFixed(1)}
                items={[
                  {
                    label: "Category",
                    value: result.category,
                  },
                  {
                    label: "Healthy weight",
                    value: `${result.minHealthyWeight.toFixed(
                      1
                    )}–${result.maxHealthyWeight.toFixed(1)} ${
                      result.healthyWeightUnit
                    }`,
                  },
                  {
                    label: "Estimated body fat",
                    value:
                      result.estimatedBodyFat !== null
                        ? `${result.estimatedBodyFat.toFixed(1)}%`
                        : "Enter age",
                  },
                  {
                    label: "Height unit",
                    value:
                      heightUnit === "cm"
                        ? "Centimeters"
                        : "Feet + inches",
                  },
                ]}
              />

              <p className="bmi-result-message">{result.message}</p>
            </>
          ) : (
            <p className="result-label">
              Enter your height and weight to calculate.
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
        infoTitle="BMI categories"
        info={
          <div className="bmi-category-list">
            <p>
              <strong>Underweight:</strong> below 18.5
            </p>

            <p>
              <strong>Healthy weight:</strong> 18.5–24.9
            </p>

            <p>
              <strong>Overweight:</strong> 25–29.9
            </p>

            <p>
              <strong>Obese:</strong> 30 or higher
            </p>

            <p className="bmi-disclaimer">
              BMI is a screening estimate. It does not directly measure
              body fat or account for differences in muscle mass, body
              composition, health history or fat distribution.
            </p>
          </div>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What is BMI?",
                answer:
                  "BMI stands for Body Mass Index. It compares weight with height to provide a general weight-category estimate.",
              },
              {
                question: "Is BMI accurate for muscular people?",
                answer:
                  "BMI can classify muscular people as overweight because it does not distinguish muscle mass from fat mass.",
              },
              {
                question: "How is estimated body fat calculated?",
                answer:
                  "The optional body-fat estimate uses BMI, age and gender. It is a rough estimate and is less accurate than direct body-composition measurements.",
              },
              {
                question:
                  "Why does the calculator show a healthy weight range?",
                answer:
                  "The range is calculated from BMI values of 18.5 to 24.9 at the entered height.",
              },
            ]}
          />
        }
        relatedTools={
          <RelatedTools
            tools={[
              {
                name: "Body Fat Calculator",
                url: "/body-fat-calculator",
                description:
                  "Estimate body fat percentage using the U.S. Navy measurement formula.",
              },
              {
                name: "TDEE Calculator",
                url: "/tdee-calculator",
                description:
                  "Calculate maintenance calories, cutting targets and bulking targets.",
              },
            ]}
          />
        }
      >
        <div className="bmi-input-grid">
          <SelectField
            label="Gender"
            value={gender}
            onChange={(value) => setGender(value as Gender)}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />

          <NumberInput
            label="Age (optional)"
            value={age}
            onChange={setAge}
            min="1"
            max="120"
            placeholder="Enter age"
          />

          <SelectField
            label="Height unit"
            value={heightUnit}
            onChange={(value) =>
              switchHeightUnit(value as HeightUnit)
            }
            options={[
              { value: "cm", label: "Centimeters" },
              { value: "ftin", label: "Feet + inches" },
            ]}
          />

          {heightUnit === "cm" ? (
            <NumberInput
              label="Height (cm)"
              value={height}
              onChange={setHeight}
              min="1"
              placeholder="Enter height in cm"
            />
          ) : (
            <div className="bmi-double-input">
              <NumberInput
                label="Feet"
                value={feet}
                onChange={setFeet}
                min="1"
                placeholder="Feet"
              />

              <NumberInput
                label="Inches"
                value={inches}
                onChange={setInches}
                min="0"
                max="11.9"
                step="0.1"
                placeholder="Inches"
              />
            </div>
          )}

          <SelectField
            label="Weight unit"
            value={weightUnit}
            onChange={(value) =>
              switchWeightUnit(value as WeightUnit)
            }
            options={[
              { value: "kg", label: "Kilograms" },
              { value: "lb", label: "Pounds" },
            ]}
          />

          <NumberInput
            label={`Weight (${weightUnit})`}
            value={weight}
            onChange={setWeight}
            min="1"
            step="0.1"
            placeholder={
              weightUnit === "kg"
                ? "Enter weight in kg"
                : "Enter weight in lb"
            }
          />
        </div>
      </CalculatorLayout>
    </>
  );
}

export default BMICalculator;
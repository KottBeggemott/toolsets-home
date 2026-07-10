import { useMemo, useState } from "react";
import "./TDEECalculator.css";
import CalculatorLayout from "../../components/CalculatorLayout";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import NumberInput from "../../components/NumberInput";
import SelectField from "../../components/SelectField";
import ResultCard from "../../components/ResultCard";
import NutritionResultCard from "../../components/NutritionResultCard";

const macroSplits = {
  highProtein: {
    label: "High Protein — 40 / 30 / 30",
    protein: 40,
    fat: 30,
    carbs: 30,
  },
  balanced: {
    label: "Balanced — 30 / 30 / 40",
    protein: 30,
    fat: 30,
    carbs: 40,
  },
  highCarb: {
    label: "High Carb — 25 / 25 / 50",
    protein: 25,
    fat: 25,
    carbs: 50,
  },
  lowerCarb: {
    label: "Lower Carb — 35 / 35 / 30",
    protein: 35,
    fat: 35,
    carbs: 30,
  },
};

function TDEECalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");
  const [bodyFat, setBodyFat] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [calorieStep, setCalorieStep] = useState("500");
  const [macroSplit, setMacroSplit] = useState("balanced");

  const result = useMemo(() => {
    const ageNumber = Number(age);
    const heightNumber = Number(height);
    const weightNumber = Number(weight);
    const bodyFatNumber = Number(bodyFat);
    const activityNumber = Number(activity);
    const calorieStepNumber = Number(calorieStep);

    if (
      ageNumber <= 0 ||
      heightNumber <= 0 ||
      weightNumber <= 0 ||
      activityNumber <= 0 ||
      calorieStepNumber <= 0
    ) {
      return null;
    }

    const hasValidBodyFat =
      bodyFat !== "" && bodyFatNumber > 0 && bodyFatNumber < 70;

    const leanBodyMass = hasValidBodyFat
      ? weightNumber * (1 - bodyFatNumber / 100)
      : weightNumber;

    const standardBmr =
      gender === "male"
        ? 10 * weightNumber + 6.25 * heightNumber - 5 * ageNumber + 5
        : 10 * weightNumber + 6.25 * heightNumber - 5 * ageNumber - 161;

    const leanMassBmr = 370 + 21.6 * leanBodyMass;
    const bmr = hasValidBodyFat ? leanMassBmr : standardBmr;
    const tdee = bmr * activityNumber;

    const selectedSplit = macroSplits[macroSplit as keyof typeof macroSplits];

    const goals = [
      {
        name: "Cutting",
        calories: tdee - calorieStepNumber,
        note: `${calorieStepNumber} kcal deficit for fat loss.`,
      },
      {
        name: "Maintaining",
        calories: tdee,
        note: "Maintenance calories for stable body weight.",
      },
      {
        name: "Bulking",
        calories: tdee + calorieStepNumber,
        note: `${calorieStepNumber} kcal surplus for muscle gain.`,
      },
    ];

    return {
      bmr,
      tdee,
      hasValidBodyFat,
      selectedSplit,
      goals,
    };
  }, [
    gender,
    age,
    height,
    weight,
    bodyFat,
    activity,
    calorieStep,
    macroSplit,
  ]);

  const resetCalculator = () => {
    setGender("male");
    setAge("30");
    setHeight("175");
    setWeight("75");
    setBodyFat("");
    setActivity("1.55");
    setCalorieStep("500");
    setMacroSplit("balanced");
  };

  const copyResult = async () => {
    if (!result) return;

    const text = `TDEE Calculator Result:
BMR: ${Math.round(result.bmr)} kcal/day
TDEE: ${Math.round(result.tdee)} kcal/day
Cutting: ${Math.round(result.goals[0].calories)} kcal/day
Maintaining: ${Math.round(result.goals[1].calories)} kcal/day
Bulking: ${Math.round(result.goals[2].calories)} kcal/day
Macro split: ${result.selectedSplit.label}`;

    await navigator.clipboard.writeText(text);
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `My estimated TDEE is ${Math.round(
      result.tdee
    )} kcal/day.`;

    if (navigator.share) {
      await navigator.share({
        title: "TDEE Calculator Result",
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
        title="TDEE Calculator"
        description="Calculate your BMR, maintenance calories, fat loss calories, bulking calories, and daily macro targets."
        canonicalPath="/tdee-calculator"
      />

      <CalculatorLayout
        title="TDEE Calculator"
        subtitle="Calculate your BMR, maintenance calories and daily macro targets."
        result={
          result ? (
            <>
              <ResultCard
                title="Estimated daily energy needs"
                mainResult={`${Math.round(result.tdee)} kcal/day`}
                items={[
                  {
                    label: "BMR",
                    value: `${Math.round(result.bmr)} kcal/day`,
                  },
                  {
                    label: "TDEE",
                    value: `${Math.round(result.tdee)} kcal/day`,
                  },
                  {
                    label: "Macro split",
                    value:
                    macroSplit === "balanced"
                    ? "Balanced"
                    : macroSplit === "highProtein"
                    ? "High Protein"
                    : macroSplit === "highCarb"
                    ? "High Carb"
                    : "Lower Carb",
                  },
                  {
                    label: "Formula mode",
                    value: result.hasValidBodyFat
                      ? "Lean mass based"
                      : "Standard BMR",
                  },
                ]}
              />

              <NutritionResultCard
                goals={result.goals.map((goal) => {
                  const protein =
                    (goal.calories * (result.selectedSplit.protein / 100)) / 4;
                  const fat =
                    (goal.calories * (result.selectedSplit.fat / 100)) / 9;
                  const carbs =
                    (goal.calories * (result.selectedSplit.carbs / 100)) / 4;

                  return {
                    name: goal.name,
                    calories: `${Math.round(goal.calories)} kcal/day`,
                    macros: [
                      {
                        label: `Protein ${result.selectedSplit.protein}%`,
                        value: `${Math.round(protein)} g`,
                      },
                      {
                        label: `Fat ${result.selectedSplit.fat}%`,
                        value: `${Math.round(fat)} g`,
                      },
                      {
                        label: `Carbs ${result.selectedSplit.carbs}%`,
                        value: `${Math.round(carbs)} g`,
                      },
                    ],
                    note: goal.note,
                  };
                })}
              />
            </>
          ) : (
            <p className="result-label">Enter valid values to calculate.</p>
          )
        }
        actions={
          <ActionButtons
            onReset={resetCalculator}
            onCopy={copyResult}
            onShare={shareResult}
          />
        }
        infoTitle="Macro Preference Guide"
        info={
          <>
            <p>
              <strong>Balanced (30/30/40)</strong>
              <br />
              Best for most people. Ideal for maintaining weight, general health
              and everyday training.
            </p>

            <p>
              <strong>High Protein (40/30/30)</strong>
              <br />
              Helps preserve muscle during fat loss and can improve satiety
              while dieting.
            </p>

            <p>
              <strong>High Carb (25/25/50)</strong>
              <br />
              Useful for endurance athletes or people doing high-volume
              training.
            </p>

            <p>
              <strong>Lower Carb (35/35/30)</strong>
              <br />
              Suitable for people who prefer higher protein and fat intake or
              naturally eat fewer carbohydrates.
            </p>
          </>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What is TDEE?",
                answer:
                  "TDEE stands for Total Daily Energy Expenditure. It estimates how many calories you burn per day including activity.",
              },
              {
                question: "What is BMR?",
                answer:
                  "BMR is Basal Metabolic Rate. It estimates how many calories your body burns at rest.",
              },
              {
                question: "Are macro targets exact?",
                answer:
                  "No. Macro targets are useful starting points, but individual needs vary based on training, goals, health, and preferences.",
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
                  "Estimate body fat percentage using body measurements.",
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

          <NumberInput label="Age" value={age} onChange={setAge} min="1" />

          <NumberInput
            label="Height (cm)"
            value={height}
            onChange={setHeight}
            min="1"
          />

          <NumberInput
            label="Weight (kg)"
            value={weight}
            onChange={setWeight}
            min="1"
          />

          <NumberInput
            label="Body Fat % (optional)"
            value={bodyFat}
            onChange={setBodyFat}
            min="1"
            max="69"
            placeholder="Leave empty if unknown"
          />

          <SelectField
            label="Activity Level"
            value={activity}
            onChange={setActivity}
            options={[
              { value: "1.2", label: "Sedentary — little exercise" },
              { value: "1.375", label: "Light — 1-3 days/week" },
              { value: "1.55", label: "Moderate — 3-5 days/week" },
              { value: "1.725", label: "Active — 6-7 days/week" },
              {
                value: "1.9",
                label: "Very active — physical job + training",
              },
            ]}
          />

          <SelectField
            label="Cut / Bulk Amount"
            value={calorieStep}
            onChange={setCalorieStep}
            options={[
              { value: "250", label: "250 kcal — slower, cleaner progress" },
              { value: "500", label: "500 kcal — faster progress" },
            ]}
          />

          <SelectField
            label="Macro Preference"
            value={macroSplit}
            onChange={setMacroSplit}
            options={[
              { value: "balanced", label: "Balanced — 30 / 30 / 40" },
              { value: "highProtein", label: "High Protein — 40 / 30 / 30" },
              { value: "highCarb", label: "High Carb — 25 / 25 / 50" },
              { value: "lowerCarb", label: "Lower Carb — 35 / 35 / 30" },
            ]}
          />
        </div>
      </CalculatorLayout>
    </>
  );
}

export default TDEECalculator;
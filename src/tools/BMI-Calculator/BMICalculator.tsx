import { useState } from "react";
import "./BMICalculator.css";

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

  const heightNumber = Number.parseFloat(height);
  const feetNumber = Number.parseFloat(feet);
  const inchesNumber = Number.parseFloat(inches);
  const weightNumber = Number.parseFloat(weight);
  const ageNumber = Number.parseFloat(age);

  const validFeet = Number.isFinite(feetNumber) ? feetNumber : 0;
  const validInches = Number.isFinite(inchesNumber) ? inchesNumber : 0;

  const heightInCm =
    heightUnit === "cm"
      ? heightNumber
      : validFeet * 30.48 + validInches * 2.54;

  const weightInKg =
    weightUnit === "kg" ? weightNumber : weightNumber * 0.453592;

  const bmi =
    Number.isFinite(heightInCm) &&
    Number.isFinite(weightInKg) &&
    heightInCm > 0 &&
    weightInKg > 0
      ? weightInKg / Math.pow(heightInCm / 100, 2)
      : null;

  const roundedBmi = bmi !== null ? bmi.toFixed(1) : "";

  const bodyFat =
    bmi !== null && Number.isFinite(ageNumber) && ageNumber > 0
      ? gender === "male"
        ? 1.2 * bmi + 0.23 * ageNumber - 16.2
        : 1.2 * bmi + 0.23 * ageNumber - 5.4
      : null;

  const roundedBodyFat =
    bodyFat !== null ? Math.max(0, bodyFat).toFixed(1) : "";

  const minHealthyWeightKg =
    Number.isFinite(heightInCm) && heightInCm > 0
      ? 18.5 * Math.pow(heightInCm / 100, 2)
      : null;

  const maxHealthyWeightKg =
    Number.isFinite(heightInCm) && heightInCm > 0
      ? 24.9 * Math.pow(heightInCm / 100, 2)
      : null;

  const minHealthyWeight =
    minHealthyWeightKg !== null
      ? weightUnit === "kg"
        ? minHealthyWeightKg.toFixed(1)
        : (minHealthyWeightKg / 0.453592).toFixed(1)
      : "";

  const maxHealthyWeight =
    maxHealthyWeightKg !== null
      ? weightUnit === "kg"
        ? maxHealthyWeightKg.toFixed(1)
        : (maxHealthyWeightKg / 0.453592).toFixed(1)
      : "";

  const healthyWeightUnit = weightUnit === "kg" ? "kg" : "lb";

  let category = "";
  let message = "";

  if (bmi !== null) {
    if (bmi < 18.5) {
      category = "Underweight";
      message = "You may need to gain some healthy weight.";
    } else if (bmi < 25) {
      category = "Healthy weight";
      message = "Your BMI is in the normal range.";
    } else if (bmi < 30) {
      category = "Overweight";
      message = "A small calorie deficit and movement can help.";
    } else {
      category = "Obese";
      message =
        "It may be worth improving diet, movement, and health habits.";
    }
  }

  const clearInputs = () => {
    setAge("");
    setHeight("");
    setFeet("");
    setInches("");
    setWeight("");
  };

  const switchHeightUnit = (newUnit: HeightUnit) => {
    if (newUnit === heightUnit) return;

    if (newUnit === "ftin" && height) {
      const currentHeight = Number.parseFloat(height);

      if (Number.isFinite(currentHeight)) {
        const totalInches = currentHeight / 2.54;
        const newFeet = Math.floor(totalInches / 12);
        const newInches = totalInches % 12;

        setFeet(newFeet.toString());
        setInches(newInches.toFixed(1));
      }
    }

    if (newUnit === "cm" && (feet || inches)) {
      const currentFeet = Number.parseFloat(feet);
      const currentInches = Number.parseFloat(inches);

      const safeFeet = Number.isFinite(currentFeet) ? currentFeet : 0;
      const safeInches = Number.isFinite(currentInches) ? currentInches : 0;

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

  return (
    <div className="app">
      <div className="tool-card">
        <a href="/" className="back-button">
          ← Back to Toolsets
        </a>

        <h1>BMI Calculator</h1>

        <p className="subtitle">
          Calculate your Body Mass Index using your height and weight.
        </p>

        <div className="unit-buttons">
          <button
            type="button"
            className={gender === "male" ? "active" : ""}
            onClick={() => setGender("male")}
          >
            Male
          </button>

          <button
            type="button"
            className={gender === "female" ? "active" : ""}
            onClick={() => setGender("female")}
          >
            Female
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="bmi-age">Age</label>
          <input
            id="bmi-age"
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>

        <label>Height</label>

        <div className="unit-buttons">
          <button
            type="button"
            className={heightUnit === "cm" ? "active" : ""}
            onClick={() => switchHeightUnit("cm")}
          >
            cm
          </button>

          <button
            type="button"
            className={heightUnit === "ftin" ? "active" : ""}
            onClick={() => switchHeightUnit("ftin")}
          >
            ft + in
          </button>
        </div>

        {heightUnit === "cm" ? (
          <div className="input-group">
            <input
              type="number"
              placeholder="Enter height in cm"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </div>
        ) : (
          <div className="double-input">
            <div className="input-group">
              <label htmlFor="bmi-feet">Feet</label>
              <input
                id="bmi-feet"
                type="number"
                placeholder="Feet"
                value={feet}
                onChange={(event) => setFeet(event.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="bmi-inches">Inches</label>
              <input
                id="bmi-inches"
                type="number"
                placeholder="Inches"
                value={inches}
                onChange={(event) => setInches(event.target.value)}
              />
            </div>
          </div>
        )}

        <label>Weight</label>

        <div className="unit-buttons">
          <button
            type="button"
            className={weightUnit === "kg" ? "active" : ""}
            onClick={() => switchWeightUnit("kg")}
          >
            kg
          </button>

          <button
            type="button"
            className={weightUnit === "lb" ? "active" : ""}
            onClick={() => switchWeightUnit("lb")}
          >
            lb
          </button>
        </div>

        <div className="input-group">
          <input
            type="number"
            placeholder={
              weightUnit === "kg"
                ? "Enter weight in kg"
                : "Enter weight in lb"
            }
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </div>

        <button
          type="button"
          className="clear-button"
          onClick={clearInputs}
        >
          Clear
        </button>

        <div className="result-box">
          {bmi !== null ? (
            <>
              <p className="result-label">Your BMI is</p>
              <div className="result-number">{roundedBmi}</div>

              <p className="category">{category}</p>
              <p className="message">{message}</p>

              {roundedBodyFat && (
                <>
                  <hr />

                  <p className="result-label">Estimated Body Fat</p>
                  <div className="result-number-small">
                    {roundedBodyFat}%
                  </div>

                  <p className="result-label">Healthy Weight Range</p>
                  <div className="result-number-small">
                    {minHealthyWeight} – {maxHealthyWeight}{" "}
                    {healthyWeightUnit}
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="placeholder">Enter your height and weight</p>
          )}
        </div>

        <div className="info-box">
          <p>BMI categories:</p>
          <span>Underweight: below 18.5</span>
          <span>Healthy: 18.5–24.9</span>
          <span>Overweight: 25–29.9</span>
          <span>Obese: 30+</span>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;
import { useState } from "react";
import "./BodyFatCalculator.css";

function BodyFatCalculator() {
    const [weight, setWeight] = useState("");

  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  const [height, setHeight] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");

  const heightNum = parseFloat(height);
  const waistNum = parseFloat(waist);
  const neckNum = parseFloat(neck);
  const hipNum = parseFloat(hip);
  const weightNum = parseFloat(weight);

  const toInches = (value: number) => (unit === "cm" ? value / 2.54 : value);

  const h = toInches(heightNum);
  const w = toInches(waistNum);
  const n = toInches(neckNum);
  const hp = toInches(hipNum);

  let bodyFat: number | null = null;

  if (gender === "male" && h > 0 && w > 0 && n > 0 && w > n) {
    bodyFat = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
  }

  if (gender === "female" && h > 0 && w > 0 && n > 0 && hp > 0 && w + hp > n) {
    bodyFat =
      163.205 * Math.log10(w + hp - n) -
      97.684 * Math.log10(h) -
      78.387;
  }

  const roundedBodyFat = bodyFat !== null ? bodyFat.toFixed(1) : "";
  const leanBodyMass =
  bodyFat !== null && weightNum > 0
    ? (weightNum * (1 - bodyFat / 100)).toFixed(1)
    : "";
    const fatMass =
  bodyFat !== null && weightNum > 0
    ? (weightNum * (bodyFat / 100)).toFixed(1)
    : "";

  let category = "";
  let message = "";

  if (bodyFat !== null) {
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
        message = "This is a common range. Nutrition and activity can improve it.";
      } else {
        category = "High";
        message = "A calorie deficit, strength training and daily movement may help.";
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
        message = "This is a common range. Nutrition and activity can improve it.";
      } else {
        category = "High";
        message = "A calorie deficit, strength training and daily movement may help.";
      }
    }
  }

  function clearInputs() {
    setHeight("");
    setWaist("");
    setNeck("");
    setHip("");
  }

  return (
    <div className="app">
      <div className="tool-card">
        <a href="/" className="back-link">
        ← Back to Toolsets
        </a>
        <h1>U.S. Navy Body Fat Calculator</h1>

        <p className="subtitle">
          Estimate your body fat percentage using the U.S. Navy body fat formula.
        </p>

        <div className="unit-buttons">
          <button
            className={gender === "male" ? "active" : ""}
            onClick={() => setGender("male")}
          >
            Male
          </button>

          <button
            className={gender === "female" ? "active" : ""}
            onClick={() => setGender("female")}
          >
            Female
          </button>
        </div>

        <label>Units</label>

        <div className="unit-buttons">
          <button
            className={unit === "cm" ? "active" : ""}
            onClick={() => setUnit("cm")}
          >
            cm
          </button>

          <button
            className={unit === "in" ? "active" : ""}
            onClick={() => setUnit("in")}
          >
            inches
          </button>
        </div>

        <div className="input-group">
          <label>Height ({unit === "cm" ? "cm" : "in"})</label>
          <input
            type="number"
            placeholder={unit === "cm" ? "Enter height in cm" : "Enter height in inches"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Waist ({unit === "cm" ? "cm" : "in"})  </label>
          <input
            type="number"
            placeholder={unit === "cm" ? "Enter waist in cm" : "Enter waist in inches"}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Neck ({unit === "cm" ? "cm" : "in"})</label>
          <input
            type="number"
            placeholder={unit === "cm" ? "Enter neck in cm" : "Enter neck in inches"}
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
          />
        </div>
        <div className="input-group">
            <label>Weight (kg)</label>
            <input
            type="number"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            />
        </div>

        {gender === "female" && (
          <div className="input-group">
            <label>Hip ({unit === "cm" ? "cm" : "in"})</label>
            <input
              type="number"
              placeholder={unit === "cm" ? "Enter hip in cm" : "Enter hip in inches"}
              value={hip}
              onChange={(e) => setHip(e.target.value)}
            />
          </div>
        )}

        <button className="clear-button" onClick={clearInputs}>
          Clear
        </button>

        <div className="result-box">
          {bodyFat !== null ? (
            <>
              <p className="result-label">Estimated Body Fat</p>
              <div className="result-number">{roundedBodyFat}%</div>
              <hr />
              <p className="result-label">Category</p>
              <div className="result-number-small">{category}</div>
              <p className="message">{message}</p>
              <hr />
              <p className="result-label">Method</p>
              <div className="result-number-small">U.S. Navy Formula</div>
              <hr />
              <p className="result-label">Lean Body Mass</p>
              <div className="result-number-small">
                {leanBodyMass ? `${leanBodyMass} kg` : "--"}
                </div>
                <hr />
                <p className="result-label">Fat Mass</p>
                <div className="result-number-small">{fatMass ? `${fatMass} kg` : "--"}

                </div>
            </>  
          ) : (
            <p className="placeholder">Enter your measurements</p>
          )}
        </div>

        <div className="info-box">
          <p>How to measure:</p>
          <span>Waist: measure around the narrowest point or navel level.</span>
          <span>Neck: measure just below the Adam’s apple.</span>
          <span>Hip: only needed for female calculation.</span>
          <span>This calculator gives an estimate, not a medical diagnosis.</span>
        </div>
      </div>
    </div>
  );
}

export default BodyFatCalculator;
import { useState } from "react";

export default function TDEECalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState(1.55);

  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const tdee = bmr * activity;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: "32px 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
          }}
        >
          TDEE Calculator
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "28px",
          }}
        >
          Calculate your maintenance calories, fat loss target and muscle gain target.
        </p>

        <div
          style={{
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: "18px",
            padding: "22px",
          }}
        >
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={inputStyle}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={inputStyle}
          />

          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            style={inputStyle}
          />

          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            style={inputStyle}
          />

          <label>Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
            style={inputStyle}
          >
            <option value={1.2}>Sedentary — little exercise</option>
            <option value={1.375}>Light — 1-3 days/week</option>
            <option value={1.55}>Moderate — 3-5 days/week</option>
            <option value={1.725}>Active — 6-7 days/week</option>
            <option value={1.9}>Very active — physical job + training</option>
          </select>

          <div
            style={{
              marginTop: "22px",
              background: "#020617",
              border: "1px solid #374151",
              borderRadius: "14px",
              padding: "18px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#9ca3af" }}>
              Estimated Maintenance Calories
            </p>

            <div
              style={{
                fontSize: "36px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              {Math.round(tdee)} kcal/day
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <Result label="Fat Loss" value={Math.round(tdee - 500)} />
            <Result label="Slow Cut" value={Math.round(tdee - 250)} />
            <Result label="Lean Bulk" value={Math.round(tdee + 250)} />
            <Result label="Fast Bulk" value={Math.round(tdee + 500)} />
          </div>

          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            Results are estimates. Adjust calories based on real-world progress.
          </p>
        </div>
      </div>
    </div>
  );
}

function Result({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      style={{
        background: "#020617",
        border: "1px solid #374151",
        borderRadius: "12px",
        padding: "14px",
        display: "flex",
        justifyContent: "space-between",
        fontWeight: 700,
      }}
    >
      <span>{label}</span>
      <span>{value} kcal</span>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#020617",
  color: "#f9fafb",
  border: "1px solid #374151",
  borderRadius: "12px",
  padding: "14px",
  fontSize: "16px",
  margin: "8px 0 16px",
  boxSizing: "border-box" as const,
};
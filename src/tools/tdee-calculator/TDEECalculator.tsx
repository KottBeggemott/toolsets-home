import { useState } from "react";

export default function TDEECalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");
  const [bodyFat, setBodyFat] = useState("");
  const [activity, setActivity] = useState(1.55);

  const bodyFatNumber = Number(bodyFat);

  const ageNumber = Number(age);
  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  const standardBmr =
  gender === "male"
    ? 10 * weightNumber + 6.25 * heightNumber - 5 * ageNumber + 5
    : 10 * weightNumber + 6.25 * heightNumber - 5 * ageNumber - 161;

    const leanBodyMass =
    bodyFat && bodyFatNumber > 0 && bodyFatNumber < 70
    ? weightNumber * (1 - bodyFatNumber / 100)
    : null;

  const bodyFatBmr = leanBodyMass ? 370 + 21.6 * leanBodyMass : null;

  const bmr = bodyFatBmr || standardBmr;
  const tdee = bmr * activity;

  const cutCalories = tdee * 0.8;
  const maintainCalories = tdee;
  const bulkCalories = tdee * 1.1;

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1 style={titleStyle}>TDEE Calculator</h1>

        <p style={subtitleStyle}>
          Calculate your BMR, maintenance calories and daily nutrition targets.
        </p>

        <div style={cardStyle}>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle} />

          <label>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} style={inputStyle} />

          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={inputStyle} />

          <label>Body Fat % (optional)</label>
          <input
            type="number"
            placeholder="Leave empty if unknown"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
            style={inputStyle}
          />

          <label>Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} style={inputStyle}>
            <option value={1.2}>Sedentary — little exercise</option>
            <option value={1.375}>Light — 1-3 days/week</option>
            <option value={1.55}>Moderate — 3-5 days/week</option>
            <option value={1.725}>Active — 6-7 days/week</option>
            <option value={1.9}>Very active — physical job + training</option>
          </select>

          <div style={mainResultStyle}>
            <Result title="BMR" value={`${Math.round(bmr)} kcal/day`} />
            <Result title="TDEE / Maintenance" value={`${Math.round(tdee)} kcal/day`} />
          </div>

          <MacroCard
            title="Cutting"
            calories={cutCalories}
            protein={40}
            fat={30}
            carbs={30}
          />

          <MacroCard
            title="Maintaining"
            calories={maintainCalories}
            protein={30}
            fat={30}
            carbs={40}
          />

          <MacroCard
            title="Bulking"
            calories={bulkCalories}
            protein={25}
            fat={25}
            carbs={50}
          />

          <p style={noteStyle}>
            If body fat percentage is entered, the calculator uses lean body mass for BMR.
            Otherwise, it uses the standard male/female formula.
          </p>
        </div>
      </div>
    </div>
  );
}

function Result({ title, value }: { title: string; value: string }) {
  return (
    <div style={resultBoxStyle}>
      <p style={{ color: "#9ca3af" }}>{title}</p>
      <div style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>
        {value}
      </div>
    </div>
  );
}

function MacroCard({
  title,
  calories,
  protein,
  fat,
  carbs,
}: {
  title: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}) {
  const proteinGrams = (calories * (protein / 100)) / 4;
  const fatGrams = (calories * (fat / 100)) / 9;
  const carbsGrams = (calories * (carbs / 100)) / 4;

  return (
    <div style={macroCardStyle}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>

      <div style={{ fontSize: "26px", fontWeight: 800, color: "#ffffff" }}>
        {Math.round(calories)} kcal/day
      </div>

      <div style={macroGridStyle}>
        <MacroItem label="Protein" percent={protein} grams={proteinGrams} />
        <MacroItem label="Fat" percent={fat} grams={fatGrams} />
        <MacroItem label="Carbs" percent={carbs} grams={carbsGrams} />
      </div>
    </div>
  );
}

function MacroItem({
  label,
  percent,
  grams,
}: {
  label: string;
  percent: number;
  grams: number;
}) {
  return (
    <div style={macroItemStyle}>
      <strong>{label}</strong>
      <span>{percent}%</span>
      <span>{Math.round(grams)} g</span>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#020617",
  color: "#e5e7eb",
  padding: "32px 16px",
  fontFamily: "system-ui, sans-serif",
};

const titleStyle = {
  textAlign: "center" as const,
  fontSize: "36px",
};

const subtitleStyle = {
  textAlign: "center" as const,
  color: "#9ca3af",
  marginBottom: "28px",
};

const cardStyle = {
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "18px",
  padding: "22px",
};

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

const mainResultStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "12px",
  marginTop: "16px",
};

const resultBoxStyle = {
  background: "#020617",
  border: "1px solid #374151",
  borderRadius: "14px",
  padding: "18px",
  textAlign: "center" as const,
};

const macroCardStyle = {
  marginTop: "16px",
  background: "#020617",
  border: "1px solid #374151",
  borderRadius: "14px",
  padding: "18px",
  textAlign: "center" as const,
};

const macroGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "12px",
  marginTop: "16px",
};

const macroItemStyle = {
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "12px",
  padding: "12px",
  display: "grid",
  gap: "4px",
};

const noteStyle = {
  marginTop: "16px",
  fontSize: "13px",
  color: "#9ca3af",
  textAlign: "center" as const,
};
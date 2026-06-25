import { useState } from "react";

export default function TDEECalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");
  const [bodyFat, setBodyFat] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [calorieStep, setCalorieStep] = useState("500");
  const [macroSplit, setMacroSplit] = useState("balanced");

  const ageNumber = Number(age);
  const heightNumber = Number(height);
  const weightNumber = Number(weight);
  const bodyFatNumber = Number(bodyFat);
  const activityNumber = Number(activity);
  const calorieStepNumber = Number(calorieStep);
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

const selectedSplit = macroSplits[macroSplit as keyof typeof macroSplits];

  const hasValidBodyFat = bodyFat !== "" && bodyFatNumber > 0 && bodyFatNumber < 70;

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

  const resetInputs = () => {
  setGender("male");
  setAge("30");
  setHeight("175");
  setWeight("75");
  setBodyFat("");
  setActivity("1.55");
  setCalorieStep("500");
  setMacroSplit("balanced");
};

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>TDEE Calculator</h1>

        <p style={subtitleStyle}>
          Calculate your BMR, maintenance calories and daily macro targets.
        </p>

        <div style={cardStyle}>
          <div style={inputGridStyle}>
            <InputGroup label="Gender">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={inputStyle}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </InputGroup>

            <InputGroup label="Age">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={inputStyle}
              />
            </InputGroup>

            <InputGroup label="Height (cm)">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={inputStyle}
              />
            </InputGroup>

            <InputGroup label="Weight (kg)">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={inputStyle}
              />
            </InputGroup>
          </div>

          <InputGroup label="Body Fat % (optional)">
            <input
              type="number"
              placeholder="Leave empty if unknown"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              style={inputStyle}
            />
          </InputGroup>

          <InputGroup label="Activity Level">
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={inputStyle}
            >
              <option value="1.2">Sedentary — little exercise</option>
              <option value="1.375">Light — 1-3 days/week</option>
              <option value="1.55">Moderate — 3-5 days/week</option>
              <option value="1.725">Active — 6-7 days/week</option>
              <option value="1.9">Very active — physical job + training</option>
            </select>
          </InputGroup>

          <InputGroup label="Cut / Bulk Amount">
          <select
          value={calorieStep}
          onChange={(e) => setCalorieStep(e.target.value)}
          style={inputStyle}
          >
            <option value="250">250 kcal — slower, cleaner progress</option>
            <option value="500">500 kcal — faster progress</option>
            </select>
            </InputGroup>
            
            <InputGroup label="Macro Preference* (Optional)">
            <select
            value={macroSplit}
            onChange={(e) => setMacroSplit(e.target.value)}
            style={inputStyle}
            >
              <option value="balanced">Balanced — 30 / 30 / 40</option>
              <option value="highProtein">High Protein — 40 / 30 / 30</option>
              <option value="highCarb">High Carb — 25 / 25 / 50</option>
              <option value="lowerCarb">Lower Carb — 35 / 35 / 30</option>
              </select>
              </InputGroup>

          <div style={summaryGridStyle}>
            <SummaryCard title="BMR" value={`${Math.round(bmr)} kcal/day`} />
            <SummaryCard title="TDEE" value={`${Math.round(tdee)} kcal/day`} />
          </div>

          <div style={goalGridStyle}>
            {goals.map((goal) => (
              <GoalCard
              key={goal.name}
              name={goal.name}
              calories={goal.calories}
              proteinPercent={selectedSplit.protein}
              fatPercent={selectedSplit.fat}
              carbsPercent={selectedSplit.carbs}
              note={goal.note}
              />
            ))}
          </div>

          <button onClick={resetInputs} style={resetButtonStyle}>
            Reset
          </button>

          <p style={noteStyle}>
            If body fat percentage is entered, protein and BMR use lean body mass.
            Otherwise, calculations use total body weight and the standard male/female formula.
          </p>
          <div style={infoBoxStyle}>
  <h3 style={infoTitleStyle}>Macro Preference Guide*</h3>

  <p>
    <strong>Balanced (30/30/40)</strong><br />
    Best for most people. Ideal for maintaining weight, general health and
    everyday training.
  </p>

  <p>
    <strong>High Protein (40/30/30)</strong><br />
    Helps preserve muscle during fat loss and can improve satiety while
    dieting.
  </p>

  <p>
    <strong>High Carb (25/25/50)</strong><br />
    Recommended for endurance athletes or people performing large amounts of
    cardio or high-volume training.
  </p>

  <p>
    <strong>Lower Carb (35/35/30)</strong><br />
    Suitable for people who prefer higher protein and fat intake or naturally
    eat fewer carbohydrates.
  </p>

  <p style={{ marginTop: "18px", opacity: 0.75 }}>
    *These are evidence-based starting points. Individual needs vary depending
    on goals, training style, medical conditions and personal preference.
  </p>
</div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={labelStyle}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={summaryCardStyle}>
      <p style={smallTextStyle}>{title}</p>
      <div style={summaryValueStyle}>{value}</div>
    </div>
  );
}

function GoalCard({
  name,
  calories,
  proteinPercent,
  fatPercent,
  carbsPercent,
  note,
}: {
  name: string;
  calories: number;
  proteinPercent: number;
  fatPercent: number;
  carbsPercent: number;
  note: string;
}) {
  const protein = (calories * (proteinPercent / 100)) / 4;
  const fat = (calories * (fatPercent / 100)) / 9;
  const carbs = (calories * (carbsPercent / 100)) / 4;

  return (
    <div style={goalCardStyle}>
      <h2 style={goalTitleStyle}>{name}</h2>

      <div style={goalCaloriesStyle}>{Math.round(calories)} kcal/day</div>

      <div style={macroListStyle}>
        <MacroRow label={`Protein ${proteinPercent}%`} value={`${Math.round(protein)} g`} />
        <MacroRow label={`Fat ${fatPercent}%`} value={`${Math.round(fat)} g`} />
        <MacroRow label={`Carbs ${carbsPercent}%`} value={`${Math.round(carbs)} g`} />
      </div>

      <p style={goalNoteStyle}>{note}</p>
    </div>
  );
}
function MacroRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={macroRowStyle}>
      <span>{label}</span>
      <strong>{value}</strong>
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

const containerStyle = {
  maxWidth: "900px",
  margin: "0 auto",
};

const titleStyle = {
  textAlign: "center" as const,
  fontSize: "36px",
  marginBottom: "10px",
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
  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
};

const inputGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
};

const labelStyle = {
  display: "grid",
  gap: "8px",
  color: "#d1d5db",
  fontWeight: 700,
  marginBottom: "16px",
};

const inputStyle = {
  width: "100%",
  background: "#020617",
  color: "#f9fafb",
  border: "1px solid #374151",
  borderRadius: "12px",
  padding: "14px",
  fontSize: "16px",
  boxSizing: "border-box" as const,
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
  marginTop: "8px",
};

const summaryCardStyle = {
  background: "#020617",
  border: "1px solid #374151",
  borderRadius: "14px",
  padding: "18px",
  textAlign: "center" as const,
};

const smallTextStyle = {
  color: "#9ca3af",
  margin: 0,
};

const summaryValueStyle = {
  fontSize: "30px",
  fontWeight: 800,
  color: "#ffffff",
  marginTop: "6px",
};

const goalGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "14px",
  marginTop: "16px",
};

const goalCardStyle = {
  background: "#020617",
  border: "1px solid #374151",
  borderRadius: "14px",
  padding: "18px",
};

const goalTitleStyle = {
  margin: "0 0 8px",
  fontSize: "22px",
  color: "#ffffff",
};

const goalCaloriesStyle = {
  fontSize: "26px",
  fontWeight: 800,
  color: "#ffffff",
  marginBottom: "14px",
};

const macroListStyle = {
  display: "grid",
  gap: "8px",
};

const macroRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "10px",
  padding: "10px 12px",
};

const goalNoteStyle = {
  color: "#9ca3af",
  fontSize: "13px",
  marginTop: "12px",
};

const resetButtonStyle = {
  width: "100%",
  marginTop: "16px",
  background: "#facc15",
  color: "#020617",
  border: "none",
  borderRadius: "12px",
  padding: "14px",
  fontSize: "16px",
  fontWeight: 800,
  cursor: "pointer",
};

const noteStyle = {
  color: "#9ca3af",
  fontSize: "13px",
  textAlign: "center" as const,
  marginTop: "16px",
};
const infoBoxStyle = {
  marginTop: "30px",
  padding: "24px",
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "16px",
  color: "#d1d5db",
  lineHeight: "1.7",
};

const infoTitleStyle = {
  textAlign: "center" as const,
  marginBottom: "18px",
  color: "#fff",
  fontSize: "24px",
};
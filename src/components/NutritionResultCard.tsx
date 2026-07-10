import "./NutritionResultCard.css";

type MacroItem = {
  label: string;
  value: string;
};

type NutritionGoal = {
  name: string;
  calories: string;
  macros: MacroItem[];
  note?: string;
};

type NutritionResultCardProps = {
  goals: NutritionGoal[];
};

export default function NutritionResultCard({
  goals,
}: NutritionResultCardProps) {
  return (
    <div className="nutrition-goal-grid">
      {goals.map((goal) => (
        <div key={goal.name} className="nutrition-goal-card">

          <h3 className="nutrition-goal-title">
            {goal.name}
          </h3>

          <div className="nutrition-goal-calories">
            {goal.calories}
          </div>

          <div className="nutrition-macro-list">
            {goal.macros.map((macro) => (
              <div
                key={macro.label}
                className="nutrition-macro-row"
              >
                <span>{macro.label}</span>
                <strong>{macro.value}</strong>
              </div>
            ))}
          </div>

          {goal.note && (
            <p className="nutrition-goal-note">
              {goal.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
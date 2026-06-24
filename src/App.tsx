import WorldCupMatchPredictor from "./tools/world-cup-match-predictor/WorldCupMatchPredictor";
import WorldCupTimezoneConverter from "./tools/world-cup-timezone-converter/WorldCupTimezoneConverter";
import TDEECalculator from "./tools/tdee-calculator/TDEECalculator";
import "./App.css";

function App() {
  if (window.location.pathname === "/tdee-calculator") {
  return <TDEECalculator />;
}
  if (window.location.pathname === "/world-cup-timezone-converter") {
  return <WorldCupTimezoneConverter />;
}
if (window.location.pathname === "/world-cup-match-predictor") {
  return <WorldCupMatchPredictor />;
}
  const tools = [
    {
      name: "World Cup Time Zone Converter",
      url: "/world-cup-timezone-converter",
      description: "Convert World Cup match times across different countries.",
    },
    {
      name: "World Cup Match Predictor",
      url: "/world-cup-match-predictor",
      description: "Generate fun World Cup score predictions.",
    },
    {
      name: "Unit Converter",
      url: "/unit-converter",
      description: "Convert length, weight, time and more.",
    },
    {
      name: "BMI Calculator",
      url: "/bmi-calculator",
      description: "Calculate BMI, body fat and healthy weight range.",
    },
    {
      name: "TDEE Calculator",
      url: "/tdee-calculator",
      description: "Calculate maintenance calories, fat loss and muscle gain targets.",
    },
  ];

  return (
    <div className="container">
      <h1>Toolsets</h1>

      <p className="subtitle">
        Simple, fast and free online tools.
      </p>

      <div className="grid">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            className="card"
          >
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
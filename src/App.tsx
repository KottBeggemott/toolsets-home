import CompoundInterestCalculator from "./tools/compound-interest/CompoundInterestCalculator";
import WorldCupMatchPredictor from "./tools/world-cup-match-predictor/WorldCupMatchPredictor";
import WorldCupTimezoneConverter from "./tools/world-cup-timezone-converter/WorldCupTimezoneConverter";
import TDEECalculator from "./tools/tdee-calculator/TDEECalculator";
import BodyFatCalculator from "./tools/Body-Fat-Calculator/BodyFatCalculator";
import PercentageCalculator from "./tools/percentage-calculator/App.tsx";
import SavingsCalculator from "./tools/savings-calculator/SavingsCalculator";
import LoanCalculator from "./tools/loan-calculator/LoanCalculator";
import BMICalculator from "./tools/BMI-Calculator/BMICalculator";
import UnitConverter from "./tools/Unit-Converter/UnitConverter";
function App() {
  if (window.location.pathname === "/compound-interest") {
  return <CompoundInterestCalculator />;
}
  if (window.location.pathname === "/tdee-calculator") {
  return <TDEECalculator />;
}
  if (window.location.pathname === "/world-cup-timezone-converter") {
  return <WorldCupTimezoneConverter />;
}
if (window.location.pathname === "/world-cup-match-predictor") {
  return <WorldCupMatchPredictor />;
}
if (window.location.pathname === "/body-fat-calculator") {
  return <BodyFatCalculator />;
}
if (window.location.pathname === "/percentage-calculator") {
  return <PercentageCalculator />;
}
if (window.location.pathname === "/savings-calculator") {
  return <SavingsCalculator />;
} 
if (window.location.pathname === "/loan-calculator") {
  return <LoanCalculator />;
}
if (window.location.pathname === "/bmi-calculator") {
  return <BMICalculator />;
}
if (window.location.pathname === "/unit-converter") {
  return <UnitConverter />;
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
    {
      name: "Body Fat Calculator",
      url: "/body-fat-calculator",
      description: "Estimate your body fat percentage using the U.S. Navy formula.",
    },
    {
  name: "Compound Interest Calculator",
  url: "/compound-interest",
  description: "Calculate investment growth with compound interest.",
},
{
  name: "Percentage Calculator",
  url: "/percentage-calculator",
  description: "Calculate percentages, increases, decreases, discounts and markups.",
},
{
  name: "Savings Calculator",
  url: "/savings-calculator",
  description: "Calculate how long it takes to reach your savings goal.",
},
{
  name: "Loan Calculator",
  url: "/loan-calculator",
  description: "Estimate monthly payments and total loan interest.",
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
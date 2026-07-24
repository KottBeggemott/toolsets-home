import { useState } from "react";
import "./App.css";
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
import AgeCalculator from "./tools/age-calculator/AgeCalculator";
import TimezoneDifferenceCalculator from "./tools/TimezoneDifferenceCalculator/TimezoneDifferenceCalculator";
import WaistToHeightCalculator from "./tools/waist-to-height-calculator/WaistToHeightCalculator";

 /*
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
    */
    const healthTools = [
  {
    name: "BMI Calculator",
    url: "/bmi-calculator",
    description: "Calculate BMI, body fat and healthy weight range.",
    keywords: [
  "bmi",
  "body mass index",
  "weight",
  "height",
  "health",
  "fitness",
  "fat",
  "obesity",
  "underweight",
  "overweight"
]
  },
  {
    name: "TDEE Calculator",
    url: "/tdee-calculator",
    description:
      "Calculate maintenance calories, fat loss and muscle gain targets.",
    keywords: [
  "tdee",
  "calories",
  "diet",
  "nutrition",
  "maintenance",
  "cutting",
  "bulking",
  "protein",
  "macros",
  "weight loss"
]
  },
  {
    name: "Body Fat Calculator",
    url: "/body-fat-calculator",
    description:
      "Estimate your body fat percentage using the U.S. Navy formula.",
    keywords: [
  "body fat",
  "body fat percentage",
  "fat",
  "body composition",
  "fitness",
  "health",
  "lean mass",
  "muscle",
  "weight",
  "waist",
  "neck",
  "hip",
  "navy method",
  "body fat calculator",
  "obesity",
  "weight loss",
  "cutting",
  "bulking"
]
  },
  {
  name: "Waist-to-Height Ratio Calculator",
  url: "/waist-to-height-calculator",
  description:
    "Compare your waist circumference with your height and estimate your health risk.",
    keywords: [
  "waist-to-height ratio",
  "waist",
  "height",
  "body composition",
  "fitness",
  "health",
  "lean mass",
  "muscle",
  "weight",
  "waist",
  "neck",
  "hip",
  "navy method",
  "body fat calculator",
  "obesity",
  "weight loss",
  "cutting",
  "bulking"
]
},
];

const financeTools = [
  {
    name: "Compound Interest Calculator",
    url: "/compound-interest",
    description: "Calculate investment growth with compound interest.",
    keywords: [
  "compound",
  "interest",
  "investment",
  "investing",
  "savings",
  "bank",
  "money",
  "wealth",
  "finance",
  "returns"
]
  },
  {
    name: "Savings Calculator",
    url: "/savings-calculator",
    description: "Calculate how long it takes to reach your savings goal.",
    keywords: [
  "saving",
  "savings",
  "goal",
  "money",
  "budget",
  "finance",
  "monthly",
  "deposit",
  "plan"
]
  },
  {
    name: "Loan Calculator",
    url: "/loan-calculator",
    description: "Estimate monthly payments and total loan interest.",
    keywords: [
  "loan",
  "mortgage",
  "credit",
  "bank",
  "borrow",
  "borrowing",
  "interest",
  "apr",
  "repayment",
  "monthly payment",
  "payment",
  "installment",
  "finance",
  "debt",
  "principal",
  "amortization",
  "car loan",
  "home loan",
  "personal loan"
]
  },
];

const utilityTools = [
  {
    name: "Unit Converter",
    url: "/unit-converter",
    description: "Convert length, weight, time and more.",
    keywords: [
  "convert",
  "conversion",
  "units",
  "metric",
  "imperial",
  "temperature",
  "length",
  "weight",
  "mass",
  "distance",
  "speed",
  "currency",
  "gas mark"
]
  },
  {
    name: "Percentage Calculator",
    url: "/percentage-calculator",
    description:
      "Calculate percentages, increases, decreases, discounts and markups.",
      keywords: [
  "percentage",
  "percent",
  "%",
  "increase",
  "decrease",
  "discount",
  "sale",
  "tax",
  "vat",
  "tip",
  "markup",
  "profit",
  "loss",
  "difference",
  "ratio",
  "fraction",
  "math",
  "calculate"
]
  },
  {
  name: "Age Calculator",
  url: "/age-calculator",
  description:
    "Calculate your exact age, total days lived and time until your next birthday.",
    keywords: [
  "age",
  "birthday",
  "birth",
  "date",
  "years",
  "months",
  "days",
  "time",
  "anniversary"
]
},
{
  name: "Timezone Difference Calculator",
  url: "/timezone-difference",
  description:
    "Calculate the time difference between two locations.",
    keywords: [
  "timezone",
  "time zone",
  "utc",
  "gmt",
  "clock",
  "meeting",
  "world",
  "countries",
  "travel"
]
}
];

function App() {

  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearch = searchQuery.trim().toLowerCase();

const matchesSearch = (
  tool: {
    name: string;
    description: string;
    keywords?: string[];
  },
  category: string
) => {
  if (!normalizedSearch) return true;

  return (
    tool.name.toLowerCase().includes(normalizedSearch) ||
    tool.description.toLowerCase().includes(normalizedSearch) ||
    category.toLowerCase().includes(normalizedSearch) ||
    tool.keywords?.some((keyword) =>
      keyword.toLowerCase().includes(normalizedSearch)
    )
  );
};

const filteredHealthTools = healthTools.filter((tool) =>
  matchesSearch(tool, "health")
);

const filteredFinanceTools = financeTools.filter((tool) =>
  matchesSearch(tool, "finance")
);

const filteredUtilityTools = utilityTools.filter((tool) =>
  matchesSearch(tool, "utilities")
);

const hasSearchResults =
  filteredHealthTools.length > 0 ||
  filteredFinanceTools.length > 0 ||
  filteredUtilityTools.length > 0;

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
if (window.location.pathname === "/age-calculator") {
  return <AgeCalculator />;
}
if (window.location.pathname === "/timezone-difference") {
  return <TimezoneDifferenceCalculator />;
}
if (window.location.pathname === "/waist-to-height-calculator") {
  return <WaistToHeightCalculator />;
}
   

  return (
    <div className="container">
      <h1>Toolsets</h1>

      <p className="subtitle">
        Simple, fast and free online tools.
      </p>

      <div className="search-container">
  <input
    type="text"
    placeholder="🔍 Search Toolsets..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-input"
  />
</div>

     <div className="category-grid">
      {filteredHealthTools.length > 0 && (
  <section className="category-section">
    <h2>Health</h2>

    <div className="tool-stack">
      {filteredHealthTools.map((tool) => (
        <a
          key={tool.name}
          href={tool.url}
          className="card"
        >
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>
          <span>Open →</span>
        </a>
      ))}
    </div>
  </section>
      )}

{filteredFinanceTools.length > 0 && (
  <section className="category-section">
    <h2>Finance</h2>

    <div className="tool-stack">
      {filteredFinanceTools.map((tool) => (
        <a
          key={tool.name}
          href={tool.url}
          className="card"
        >
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>
          <span>Open →</span>
        </a>
      ))}
    </div>
  </section>
)}
{filteredUtilityTools.length > 0 && (
  <section className="category-section">
    <h2>Utilities</h2>

    <div className="tool-stack">
      {filteredUtilityTools.map((tool) => (
        <a
          key={tool.name}
          href={tool.url}
          className="card"
        >
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>
          <span>Open →</span>
        </a>
      ))}
    </div>
  </section>
)}
</div>
{!hasSearchResults && normalizedSearch && (
  <p className="no-search-results">
    No tools found for “{searchQuery}”.
  </p>
)}
    </div>
  );
}

export default App;
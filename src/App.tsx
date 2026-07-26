import { useState } from "react";
import "./App.css";
import CompoundInterestCalculator from "./tools/finances/compound-interest/CompoundInterestCalculator";
import WorldCupMatchPredictor from "./tools/world-cup-match-predictor/WorldCupMatchPredictor";
import WorldCupTimezoneConverter from "./tools/world-cup-timezone-converter/WorldCupTimezoneConverter";
import TDEECalculator from "./tools/health/tdee-calculator/TDEECalculator";
import BodyFatCalculator from "./tools/health/body-fat-calculator/BodyFatCalculator";
import PercentageCalculator from "./tools/utilities/percentage-calculator/App.tsx";
import SavingsCalculator from "./tools/finances/savings-calculator/SavingsCalculator";
import LoanCalculator from "./tools/finances/loan-calculator/LoanCalculator";
import BMICalculator from "./tools/health/bmi-calculator/BMICalculator";
import UnitConverter from "./tools/utilities/unit-converter/UnitConverter.tsx";
import AgeCalculator from "./tools/utilities/age-calculator/AgeCalculator";
import TimezoneDifferenceCalculator from "./tools/utilities/timezone-difference-calculator/TimezoneDifferenceCalculator";
import WaistToHeightCalculator from "./tools/health/waist-to-height-calculator/WaistToHeightCalculator";
import InvestmentReturnCalculator from "./tools/finances/investment-return-calculator/InvestmentReturnCalculator";

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
  {
  name: "Investment Return Calculator",
  url: "/investment-return-calculator",
  description:
    "Calculate investment profit, total return, and annualized return.",
    keywords: [
  "investment return",
  "investment return calculator",
  "return on investment",
  "roi",
  "roi calculator",
  "investment profit",
  "investment loss",
  "investment gain",
  "investment performance",
  "investment growth",
  "total return",
  "total return calculator",
  "annualized return",
  "annualised return",
  "annual return",
  "yearly return",
  "average annual return",
  "cagr",
  "cagr calculator",
  "compound annual growth rate",
  "investment multiple",
  "money multiple",
  "growth multiple",
  "portfolio return",
  "stock return",
  "fund return",
  "crypto return",
  "property investment return",
  "initial investment",
  "final investment value",
  "investment percentage",
  "profit percentage",
  "investment calculator"
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
if (window.location.pathname === "/investment-return-calculator") {
  return <InvestmentReturnCalculator />;
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
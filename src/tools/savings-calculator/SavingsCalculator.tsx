import { useMemo, useState } from "react";
import "./SavingsCalculator.css";
import CalculatorLayout from "../../components/CalculatorLayout";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import NumberInput from "../../components/NumberInput";
import SelectField from "../../components/SelectField";
import { formatDuration } from "../../utils/FormatDuration";
import ResultCard from "../../components/ResultCard";

function SavingsCalculator() {
  const [startingAmount, setStartingAmount] = useState("500");
  const [monthlySavings, setMonthlySavings] = useState("250");
  const [goalAmount, setGoalAmount] = useState("10000");
  const [annualInterest, setAnnualInterest] = useState("3");
  const [currency, setCurrency] = useState("CHF");

  const result = useMemo(() => {
    const start = Number(startingAmount);
    const monthly = Number(monthlySavings);
    const goal = Number(goalAmount);
    const rate = Number(annualInterest) / 100 / 12;

    if (start < 0 || monthly <= 0 || goal <= start || rate < 0) {
      return null;
    }

    let balance = start;
    let months = 0;

    while (balance < goal && months < 1200) {
      balance = balance * (1 + rate) + monthly;
      months++;
    }

    return {
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      finalBalance: balance,
      totalSaved: start + monthly * months,
      interestEarned: balance - (start + monthly * months),
    };
  }, [startingAmount, monthlySavings, goalAmount, annualInterest]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });

  const timeToGoal = result
    ? formatDuration(result.years, result.remainingMonths)
    : "";

  const resetCalculator = () => {
    setStartingAmount("500");
    setMonthlySavings("250");
    setGoalAmount("10000");
    setAnnualInterest("3");
    setCurrency("CHF");
  };

  const copyResult = async () => {
    if (!result) return;

    const text = `Savings Calculator Result:
Time to goal: ${timeToGoal}
Final balance: ${money(result.finalBalance)}
Total saved: ${money(result.totalSaved)}
Interest earned: ${money(result.interestEarned)}
Total months: ${result.months}`;

    await navigator.clipboard.writeText(text);
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `I can reach my savings goal in ${timeToGoal}.`;

    if (navigator.share) {
      await navigator.share({
        title: "Savings Calculator Result",
        text,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    }
  };

  return (
    <>
      <SEO
        title="Savings Calculator"
        description="Calculate how long it will take to reach your savings goal with monthly savings and compound interest."
        canonicalPath="/savings-calculator"
      />

      <CalculatorLayout
        title="Savings Calculator"
        subtitle="Calculate how long it will take to reach your savings goal."
        result={
  result && (
    <ResultCard
      title="Time to reach your goal"
      mainResult={timeToGoal}
      items={[
        {
          label: "Final balance",
          value: money(result.finalBalance),
        },
        {
          label: "Total saved",
          value: money(result.totalSaved),
        },
        {
          label: "Interest earned",
          value: money(result.interestEarned),
        },
        {
          label: "Total months",
          value: result.months,
        },
      ]}
    />
  )
}
        actions={
          <ActionButtons
            onReset={resetCalculator}
            onCopy={copyResult}
            onShare={shareResult}
          />
        }
        infoTitle="How this savings calculator works"
        info={
          <p>
            This calculator estimates how long it will take to reach a savings
            goal based on your starting amount, monthly savings, and annual
            interest rate.
          </p>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What is a savings calculator?",
                answer:
                  "A savings calculator estimates how long it may take to reach a savings goal based on your starting amount, monthly savings, and interest rate.",
              },
              {
                question: "Does this include compound interest?",
                answer:
                  "Yes. This calculator applies monthly compounding based on the annual interest rate you enter.",
              },
              {
                question: "Is this financial advice?",
                answer:
                  "No. This calculator is for educational estimation only and does not replace professional financial advice.",
              },
            ]}
          />
        }
        relatedTools={
          <RelatedTools
            tools={[
              {
                name: "Compound Interest Calculator",
                url: "/compound-interest",
                description: "Estimate how investments grow over time.",
              },
              {
                name: "Loan Calculator",
                url: "/loan-calculator",
                description: "Estimate monthly loan payments and total interest.",
              },
            ]}
          />
        }
      >
        <div className="input-grid">
          <NumberInput
            label="Starting amount"
            value={startingAmount}
            onChange={setStartingAmount}
          />

          <NumberInput
            label="Monthly savings"
            value={monthlySavings}
            onChange={setMonthlySavings}
          />

          <NumberInput
            label="Savings goal"
            value={goalAmount}
            onChange={setGoalAmount}
          />

          <NumberInput
            label="Annual interest rate (%)"
            value={annualInterest}
            onChange={setAnnualInterest}
            step="0.1"
          />

          <SelectField
            label="Currency"
            value={currency}
            onChange={setCurrency}
            options={[
              { value: "CHF", label: "CHF" },
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
              { value: "GBP", label: "GBP" },
            ]}
          />
        </div>
      </CalculatorLayout>
    </>
  );
}

export default SavingsCalculator;
import { useMemo, useState } from "react";
import CalculatorLayout from "../../../components/CalculatorLayout";
import ActionButtons from "../../../components/ActionButtons";
import FAQ from "../../../components/FAQ";
import RelatedTools from "../../../components/RelatedTools";
import SEO from "../../../components/SEO";
import NumberInput from "../../../components/NumberInput";
import SelectField from "../../../components/SelectField";
import ResultCard from "../../../components/ResultCard";
import "./InvestmentReturnCalculator.css";

function InvestmentReturnCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [finalValue, setFinalValue] = useState("15000");
  const [years, setYears] = useState("5");
  const [months, setMonths] = useState("0");
  const [currency, setCurrency] = useState("CHF");

  const result = useMemo(() => {
    const initial = Number(initialInvestment);
    const final = Number(finalValue);
    const yearCount = Number(years);
    const monthCount = Number(months);

    if (
      initial <= 0 ||
      final < 0 ||
      yearCount < 0 ||
      monthCount < 0 ||
      monthCount > 11
    ) {
      return null;
    }

    const totalYears = yearCount + monthCount / 12;

    if (totalYears <= 0) {
      return null;
    }

    const gain = final - initial;
    const totalReturn = (gain / initial) * 100;
    const investmentMultiple = final / initial;

    const annualizedReturn =
      final === 0
        ? -100
        : (Math.pow(final / initial, 1 / totalYears) - 1) * 100;

    return {
      gain,
      totalReturn,
      annualizedReturn,
      investmentMultiple,
      totalYears,
    };
  }, [initialInvestment, finalValue, years, months]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });

  const percentage = (value: number) =>
    `${value >= 0 ? "+" : ""}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;

  const formatPeriod = () => {
    const yearCount = Number(years);
    const monthCount = Number(months);

    const parts: string[] = [];

    if (yearCount > 0) {
      parts.push(`${yearCount} ${yearCount === 1 ? "year" : "years"}`);
    }

    if (monthCount > 0) {
      parts.push(`${monthCount} ${monthCount === 1 ? "month" : "months"}`);
    }

    return parts.join(" ") || "0 months";
  };

  const resetCalculator = () => {
    setInitialInvestment("10000");
    setFinalValue("15000");
    setYears("5");
    setMonths("0");
    setCurrency("CHF");
  };

  const copyResult = async () => {
    if (!result) return;

    const text = `Investment Return Calculator Result:
Initial investment: ${money(Number(initialInvestment))}
Final value: ${money(Number(finalValue))}
Profit or loss: ${money(result.gain)}
Total return: ${percentage(result.totalReturn)}
Annualized return: ${percentage(result.annualizedReturn)}
Investment multiple: ${result.investmentMultiple.toFixed(2)}×
Investment period: ${formatPeriod()}`;

    await navigator.clipboard.writeText(text);
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `My investment returned ${percentage(
      result.totalReturn
    )} over ${formatPeriod()}, with an estimated annualized return of ${percentage(
      result.annualizedReturn
    )}.`;

    if (navigator.share) {
      await navigator.share({
        title: "Investment Return Calculator Result",
        text,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    }
  };

  const resultStatus =
    result && result.gain > 0
      ? "Profit"
      : result && result.gain < 0
        ? "Loss"
        : "No gain or loss";

  return (
    <>
      <SEO
        title="Investment Return Calculator"
        description="Calculate investment profit or loss, total return, annualized return, and investment growth multiple."
        canonicalPath="/investment-return-calculator"
      />

      <CalculatorLayout
        title="Investment Return Calculator"
        subtitle="Calculate your investment profit or loss, total return, and estimated annualized return."
        result={
          result ? (
            <ResultCard
              title={resultStatus}
              mainResult={money(result.gain)}
              items={[
                {
                  label: "Total return",
                  value: percentage(result.totalReturn),
                },
                {
                  label: "Annualized return",
                  value: percentage(result.annualizedReturn),
                },
                {
                  label: "Final value",
                  value: money(Number(finalValue)),
                },
                {
                  label: "Investment multiple",
                  value: `${result.investmentMultiple.toFixed(2)}×`,
                },
                {
                  label: "Initial investment",
                  value: money(Number(initialInvestment)),
                },
                {
                  label: "Investment period",
                  value: formatPeriod(),
                },
              ]}
            />
          ) : (
            <p className="result-label">
              Enter valid investment values and a period longer than zero.
            </p>
          )
        }
        actions={
          <ActionButtons
            onReset={resetCalculator}
            onCopy={copyResult}
            onShare={shareResult}
          />
        }
        infoTitle="How investment return is calculated"
        info={
          <>
            <p>
              Investment return measures how much an investment gained or lost
              compared with its initial value. A positive result represents a
              profit, while a negative result represents a loss.
            </p>

            <p>
              Total return shows the overall percentage change. Annualized
              return estimates the average yearly growth rate over the selected
              investment period.
            </p>

            <p>
              This calculator assumes there were no additional deposits,
              withdrawals, dividends, taxes, or fees during the investment
              period.
            </p>
          </>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What is total investment return?",
                answer:
                  "Total investment return is the percentage gain or loss compared with the amount originally invested.",
              },
              {
                question:
                  "What is the difference between total and annualized return?",
                answer:
                  "Total return measures the complete gain or loss over the entire period. Annualized return expresses that growth as an estimated average yearly rate.",
              },
              {
                question: "What does investment multiple mean?",
                answer:
                  "Investment multiple compares the final value with the initial investment. For example, 1.50× means the investment grew to one and a half times its original value.",
              },
              {
                question: "Does this calculator include dividends and fees?",
                answer:
                  "No. Version one assumes no additional deposits, withdrawals, dividends, taxes, or fees. Include reinvested returns in the final investment value.",
              },
              {
                question: "Is this investment advice?",
                answer:
                  "No. This calculator provides an educational estimate and does not replace professional financial advice.",
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
                description:
                  "Estimate how investments may grow with compound interest.",
              },
              {
                name: "Savings Calculator",
                url: "/savings-calculator",
                description:
                  "Calculate how long it may take to reach a savings goal.",
              },
              {
                name: "Loan Calculator",
                url: "/loan-calculator",
                description:
                  "Estimate monthly loan payments and total interest.",
              },
            ]}
          />
        }
      >
        <div className="input-grid">
          <NumberInput
            label="Initial investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            min="0"
            step="0.01"
          />

          <NumberInput
            label="Final investment value"
            value={finalValue}
            onChange={setFinalValue}
            min="0"
            step="0.01"
          />

          <NumberInput
            label="Investment period (years)"
            value={years}
            onChange={setYears}
            min="0"
            step="1"
          />

          <NumberInput
            label="Additional months"
            value={months}
            onChange={setMonths}
            min="0"
            max="11"
            step="1"
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

export default InvestmentReturnCalculator;
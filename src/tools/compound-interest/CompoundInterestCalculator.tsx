import { useMemo, useState } from "react";
import CalculatorLayout from "../../components/CalculatorLayout";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import NumberInput from "../../components/NumberInput";
import SelectField from "../../components/SelectField";
import ResultCard from "../../components/ResultCard";

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compoundFrequency, setCompoundFrequency] = useState("12");
  const [currency, setCurrency] = useState("CHF");

  const result = useMemo(() => {
    const p = Number(principal);
    const c = Number(monthlyContribution);
    const r = Number(rate) / 100;
    const t = Number(years);
    const n = Number(compoundFrequency);

    if (p < 0 || c < 0 || r < 0 || t <= 0 || n <= 0) {
      return null;
    }

    const months = t * 12;
    const periodicRate = r / n;
    const principalGrowth = p * Math.pow(1 + periodicRate, n * t);

    let contributionGrowth = 0;

    for (let i = 1; i <= months; i++) {
      const remainingYears = (months - i) / 12;
      contributionGrowth += c * Math.pow(1 + periodicRate, n * remainingYears);
    }

    const finalAmount = principalGrowth + contributionGrowth;
    const totalContributions = p + c * months;
    const interestEarned = finalAmount - totalContributions;

    return {
      finalAmount,
      totalContributions,
      interestEarned,
      months,
    };
  }, [principal, monthlyContribution, rate, years, compoundFrequency]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });

  const resetCalculator = () => {
    setPrincipal("1000");
    setMonthlyContribution("100");
    setRate("7");
    setYears("10");
    setCompoundFrequency("12");
    setCurrency("CHF");
  };

  const copyResult = async () => {
    if (!result) return;

    const text = `Compound Interest Calculator Result:
Future value: ${money(result.finalAmount)}
Total invested: ${money(result.totalContributions)}
Interest earned: ${money(result.interestEarned)}
Years: ${years}
Monthly contribution: ${money(Number(monthlyContribution))}`;

    await navigator.clipboard.writeText(text);
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `My estimated future value is ${money(
      result.finalAmount
    )} after ${years} years.`;

    if (navigator.share) {
      await navigator.share({
        title: "Compound Interest Calculator Result",
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
        title="Compound Interest Calculator"
        description="Estimate how your money can grow over time with compound interest and monthly contributions."
        canonicalPath="/compound-interest"
      />

      <CalculatorLayout
        title="Compound Interest Calculator"
        subtitle="Estimate how your money can grow over time with compound interest and monthly contributions."
        result={
          result ? (
            <ResultCard
              title="Future value"
              mainResult={money(result.finalAmount)}
              items={[
                {
                  label: "Total invested",
                  value: money(result.totalContributions),
                },
                {
                  label: "Interest earned",
                  value: money(result.interestEarned),
                },
                {
                  label: "Investment period",
                  value: `${years} years`,
                },
                {
                  label: "Monthly contribution",
                  value: money(Number(monthlyContribution)),
                },
              ]}
            />
          ) : (
            <p className="result-label">Enter valid values to calculate.</p>
          )
        }
        actions={
          <ActionButtons
            onReset={resetCalculator}
            onCopy={copyResult}
            onShare={shareResult}
          />
        }
        infoTitle="How compound interest works"
        info={
          <p>
            Compound interest means your money earns interest, and then that
            interest can also earn interest. Over long periods of time, this can
            make a big difference.
          </p>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What is compound interest?",
                answer:
                  "Compound interest means earning interest on both your original money and the interest already earned.",
              },
              {
                question: "Why does time matter so much?",
                answer:
                  "The longer money stays invested, the more time compound growth has to build on itself.",
              },
              {
                question: "Is this investment advice?",
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
                name: "Savings Calculator",
                url: "/savings-calculator",
                description: "Calculate how long it will take to reach a savings goal.",
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
            label="Initial amount"
            value={principal}
            onChange={setPrincipal}
            min="0"
          />

          <NumberInput
            label="Monthly contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            min="0"
          />

          <NumberInput
            label="Annual interest rate (%)"
            value={rate}
            onChange={setRate}
            min="0"
            step="0.1"
          />

          <NumberInput
            label="Years"
            value={years}
            onChange={setYears}
            min="1"
          />

          <SelectField
            label="Compounding frequency"
            value={compoundFrequency}
            onChange={setCompoundFrequency}
            options={[
              { value: "1", label: "Yearly" },
              { value: "4", label: "Quarterly" },
              { value: "12", label: "Monthly" },
              { value: "365", label: "Daily" },
            ]}
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

export default CompoundInterestCalculator;
import { useMemo, useState } from "react";
import CalculatorLayout from "../../components/CalculatorLayout";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import NumberInput from "../../components/NumberInput";
import SelectField from "../../components/SelectField";
import ResultCard from "../../components/ResultCard";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [annualInterest, setAnnualInterest] = useState("6");
  const [loanTerm, setLoanTerm] = useState("5");
  const [termType, setTermType] = useState("years");
  const [currency, setCurrency] = useState("CHF");

  const result = useMemo(() => {
    const amount = Number(loanAmount);
    const annualRate = Number(annualInterest) / 100;
    const term = Number(loanTerm);

    if (amount <= 0 || annualRate < 0 || term <= 0) return null;

    const months = termType === "years" ? term * 12 : term;
    const monthlyRate = annualRate / 12;

    const monthlyPayment =
      monthlyRate === 0
        ? amount / months
        : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;
    const firstMonthInterest = amount * monthlyRate;
    const firstMonthPrincipal = monthlyPayment - firstMonthInterest;

    return {
      months,
      monthlyPayment,
      totalPayment,
      totalInterest,
      firstMonthInterest,
      firstMonthPrincipal,
    };
  }, [loanAmount, annualInterest, loanTerm, termType]);

  const money = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });

  const resetCalculator = () => {
    setLoanAmount("10000");
    setAnnualInterest("6");
    setLoanTerm("5");
    setTermType("years");
    setCurrency("CHF");
  };

  const copyResult = async () => {
    if (!result) return;

    const text = `Loan Calculator Result:
Monthly payment: ${money(result.monthlyPayment)}
Total repayment: ${money(result.totalPayment)}
Total interest: ${money(result.totalInterest)}
Loan length: ${result.months} months
Principal borrowed: ${money(Number(loanAmount))}`;

    await navigator.clipboard.writeText(text);
  };

  const shareResult = async () => {
    if (!result) return;

    const text = `Estimated monthly loan payment: ${money(
      result.monthlyPayment
    )}.`;

    if (navigator.share) {
      await navigator.share({
        title: "Loan Calculator Result",
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
        title="Loan Calculator"
        description="Estimate your monthly loan payment, total repayment, and total interest cost."
        canonicalPath="/loan-calculator"
      />

      <CalculatorLayout
        title="Loan Calculator"
        subtitle="Estimate your monthly loan payment, total repayment, and total interest cost."
        result={
          result ? (
            <ResultCard
              title="Estimated monthly payment"
              mainResult={money(result.monthlyPayment)}
              items={[
                {
                  label: "Total repayment",
                  value: money(result.totalPayment),
                },
                {
                  label: "Total interest",
                  value: money(result.totalInterest),
                },
                {
                  label: "Loan length",
                  value: `${result.months} months`,
                },
                {
                  label: "Principal borrowed",
                  value: money(Number(loanAmount)),
                },
                {
                  label: "First month interest",
                  value: money(result.firstMonthInterest),
                },
                {
                  label: "First month principal",
                  value: money(result.firstMonthPrincipal),
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
        infoTitle="How loan payments are calculated"
        info={
          <>
            <p>
              This calculator uses a standard fixed-payment loan formula. Your
              monthly payment depends on the loan amount, interest rate, and loan
              term.
            </p>

            <p>
              A longer term usually lowers the monthly payment but increases the
              total interest paid over time.
            </p>

            <p>
              This is an estimate only. Real loan offers may include fees,
              insurance, taxes, variable interest rates, or lender-specific
              conditions.
            </p>
          </>
        }
        faq={
          <FAQ
            items={[
              {
                question: "What does a loan calculator show?",
                answer:
                  "A loan calculator estimates your monthly payment, total repayment, and total interest based on the loan amount, interest rate, and loan term.",
              },
              {
                question: "Does a longer loan term reduce monthly payments?",
                answer:
                  "Usually yes. A longer loan term often lowers the monthly payment, but it can increase the total interest paid over the full loan period.",
              },
              {
                question: "Is this loan calculator exact?",
                answer:
                  "No. It is an estimate. Real loans may include fees, insurance, taxes, variable rates, or lender-specific conditions.",
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
                name: "Compound Interest Calculator",
                url: "/compound-interest",
                description: "Estimate how investments grow over time.",
              },
            ]}
          />
        }
      >
        <div className="input-grid">
          <NumberInput
            label="Loan amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min="0"
          />

          <NumberInput
            label="Annual interest rate (%)"
            value={annualInterest}
            onChange={setAnnualInterest}
            min="0"
            step="0.1"
          />

          <NumberInput
            label="Loan term"
            value={loanTerm}
            onChange={setLoanTerm}
            min="1"
          />

          <SelectField
            label="Term type"
            value={termType}
            onChange={setTermType}
            options={[
              { value: "years", label: "Years" },
              { value: "months", label: "Months" },
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

export default LoanCalculator;
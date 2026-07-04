import { useMemo, useState } from "react";
import "./LoanCalculator.css";

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

    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = amount / months;
    } else {
      monthlyPayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

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
Loan length: ${result.months} months`;

    await navigator.clipboard.writeText(text);
  };

  return (
    <main className="loan-page">
      <section className="loan-container">
        <a className="back-link" href="/">
          ← Back to Toolsets
        </a>

        <h1>Loan Calculator</h1>

        <p className="loan-subtitle">
          Estimate your monthly loan payment, total repayment, and total
          interest cost.
        </p>

        <div className="calculator-card">
          <div className="input-grid">
            <label>
              Loan amount
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                min="0"
              />
            </label>

            <label>
              Annual interest rate (%)
              <input
                type="number"
                value={annualInterest}
                onChange={(e) => setAnnualInterest(e.target.value)}
                min="0"
                step="0.1"
              />
            </label>

            <label>
              Loan term
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                min="1"
              />
            </label>

            <label>
              Term type
              <select
                value={termType}
                onChange={(e) => setTermType(e.target.value)}
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </label>

            <label>
              Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="CHF">CHF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
          </div>

          <div className="button-row">
            <button type="button" onClick={resetCalculator}>
              Reset
            </button>

            <button type="button" onClick={copyResult} disabled={!result}>
              Copy result
            </button>
          </div>

          {result ? (
            <>
              <div className="result-card">
                <p className="result-label">Estimated monthly payment</p>
                <p className="result-main">{money(result.monthlyPayment)}</p>

                <div className="result-breakdown">
                  <div>
                    <span>Total repayment</span>
                    <strong>{money(result.totalPayment)}</strong>
                  </div>

                  <div>
                    <span>Total interest</span>
                    <strong>{money(result.totalInterest)}</strong>
                  </div>

                  <div>
                    <span>Loan length</span>
                    <strong>{result.months} months</strong>
                  </div>

                  <div>
                    <span>Principal borrowed</span>
                    <strong>{money(Number(loanAmount))}</strong>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <h2>First payment estimate</h2>
                <p>
                  In the first month, about{" "}
                  <strong>{money(result.firstMonthInterest)}</strong> goes
                  toward interest and{" "}
                  <strong>{money(result.firstMonthPrincipal)}</strong> goes
                  toward reducing the loan balance.
                </p>
              </div>
            </>
          ) : (
            <div className="result-card">
              <p className="result-label">Enter valid values to calculate.</p>
            </div>
          )}
        </div>

        <section className="info-card">
          <h2>How loan payments are calculated</h2>
          <p>
            This calculator uses a standard fixed-payment loan formula. Your
            monthly payment depends on the loan amount, interest rate, and loan
            term. A longer term usually lowers the monthly payment but increases
            the total interest paid over time.
          </p>

          <h2>Important note</h2>
          <p>
            This is an estimate only. Real loan offers may include fees,
            insurance, taxes, variable interest rates, or lender-specific
            conditions.
          </p>
        </section>
      </section>
    </main>
  );
}

export default LoanCalculator;
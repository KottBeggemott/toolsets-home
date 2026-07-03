import { useMemo, useState } from "react";
import "./SavingsCalculator.css";

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

    if (start < 0 || monthly <= 0 || goal <= start || rate < 0) return null;

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

  return (
    <main className="savings-page">
      <section className="savings-container">
        <a className="back-link" href="/">← Back to Toolsets</a>

        <h1>Savings Calculator</h1>

        <p className="savings-subtitle">
          Calculate how long it will take to reach your savings goal.
        </p>

        <div className="calculator-card">
          <div className="input-grid">
            <label>
              Starting amount
              <input
                type="number"
                value={startingAmount}
                onChange={(e) => setStartingAmount(e.target.value)}
              />
            </label>

            <label>
              Monthly savings
              <input
                type="number"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(e.target.value)}
              />
            </label>

            <label>
              Savings goal
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />
            </label>

            <label>
              Annual interest rate (%)
              <input
                type="number"
                value={annualInterest}
                onChange={(e) => setAnnualInterest(e.target.value)}
                step="0.1"
              />
            </label>

            <label>
              Currency
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="CHF">CHF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
          </div>

          {result ? (
            <div className="result-card">
              <p className="result-label">Time to reach goal</p>
              <p className="result-main">
                {result.years} years {result.remainingMonths} months
              </p>

              <div className="result-breakdown">
                <div>
                  <span>Final balance</span>
                  <strong>{money(result.finalBalance)}</strong>
                </div>

                <div>
                  <span>Total saved</span>
                  <strong>{money(result.totalSaved)}</strong>
                </div>

                <div>
                  <span>Interest earned</span>
                  <strong>{money(result.interestEarned)}</strong>
                </div>

                <div>
                  <span>Total months</span>
                  <strong>{result.months}</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-card">
              <p className="result-label">Enter valid values to calculate.</p>
            </div>
          )}
        </div>

        <section className="info-card">
          <h2>What this calculator shows</h2>
          <p>
            This savings calculator estimates how long it may take to reach a
            savings goal based on your starting amount, monthly savings, and
            optional interest rate.
          </p>
        </section>
      </section>
    </main>
  );
}

export default SavingsCalculator;
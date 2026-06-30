import { useMemo, useState } from "react";
import "./CompoundInterestCalculator.css";

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compoundFrequency, setCompoundFrequency] = useState("12");

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
    };
  }, [principal, monthlyContribution, rate, years, compoundFrequency]);

  const formatMoney = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  return (
    <main className="compound-page">
      <section className="compound-container">
        <a className="back-link" href="/">
          ← Back to Toolsets
        </a>

        <h1>Compound Interest Calculator</h1>

        <p className="compound-subtitle">
          Estimate how your money can grow over time with compound interest and
          monthly contributions.
        </p>

        <div className="calculator-card">
          <div className="input-grid">
            <label>
              Initial amount
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                min="0"
              />
            </label>

            <label>
              Monthly contribution
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                min="0"
              />
            </label>

            <label>
              Annual interest rate (%)
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min="0"
                step="0.1"
              />
            </label>

            <label>
              Years
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="1"
              />
            </label>

            <label>
              Compounding frequency
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
              >
                <option value="1">Yearly</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="365">Daily</option>
              </select>
            </label>
          </div>

          {result ? (
            <div className="result-card">
              <p className="result-label">Future value</p>
              <p className="result-main">{formatMoney(result.finalAmount)}</p>

              <div className="result-breakdown">
                <div>
                  <span>Total invested</span>
                  <strong>{formatMoney(result.totalContributions)}</strong>
                </div>

                <div>
                  <span>Interest earned</span>
                  <strong>{formatMoney(result.interestEarned)}</strong>
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
          <h2>How compound interest works</h2>
          <p>
            Compound interest means your money earns interest, and then that
            interest can also earn interest. Over long periods of time, this can
            make a big difference.
          </p>
        </section>
      </section>
    </main>
  );
}

export default CompoundInterestCalculator;
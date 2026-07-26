import { useState } from "react";
import "./App.css";

type Mode = "percentOf" | "whatPercent" | "change" | "addSubtract";

function App() {
  const [mode, setMode] = useState<Mode>("percentOf");

  const [percent, setPercent] = useState("");
  const [value, setValue] = useState("");

  const [part, setPart] = useState("");
  const [whole, setWhole] = useState("");

  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  const [baseValue, setBaseValue] = useState("");
  const [adjustPercent, setAdjustPercent] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const formatNumber = (num: number) => {
    if (!isFinite(num)) return "Invalid input";
    return Number(num.toFixed(4)).toString();
  };

  const calculateResult = () => {
    if (mode === "percentOf") {
      const p = Number(percent);
      const v = Number(value);
      if (!percent || !value) return "Enter values";
      return `${formatNumber((p / 100) * v)}`;
    }

    if (mode === "whatPercent") {
      const p = Number(part);
      const w = Number(whole);
      if (!part || !whole) return "Enter values";
      if (w === 0) return "Cannot divide by zero";
      return `${formatNumber((p / w) * 100)}%`;
    }

    if (mode === "change") {
      const start = Number(startValue);
      const end = Number(endValue);
      if (!startValue || !endValue) return "Enter values";
      if (start === 0) return "Cannot divide by zero";

      const change = ((end - start) / start) * 100;
      const direction = change > 0 ? "increase" : change < 0 ? "decrease" : "change";

      return `${formatNumber(Math.abs(change))}% ${direction}`;
    }

    if (mode === "addSubtract") {
      const base = Number(baseValue);
      const p = Number(adjustPercent);
      if (!baseValue || !adjustPercent) return "Enter values";

      const amount = (p / 100) * base;
      const result = operation === "add" ? base + amount : base - amount;

      return `${formatNumber(result)}`;
    }

    return "";
  };

  return (
    <main className="app">
      <section className="calculator-card">
        <a href="/" className="back-button">
         ← Back to Toolsets
         </a>
        <h1>Percentage Calculator</h1>
        <p className="subtitle">
          Quickly calculate percentages, increases, decreases, discounts, and markups.
        </p>

        <div className="mode-grid">
          <button
            className={mode === "percentOf" ? "active" : ""}
            onClick={() => setMode("percentOf")}
          >
            % of number
          </button>

          <button
            className={mode === "whatPercent" ? "active" : ""}
            onClick={() => setMode("whatPercent")}
          >
            What %
          </button>

          <button
            className={mode === "change" ? "active" : ""}
            onClick={() => setMode("change")}
          >
            Increase / decrease
          </button>

          <button
            className={mode === "addSubtract" ? "active" : ""}
            onClick={() => setMode("addSubtract")}
          >
            Add / subtract %
          </button>
        </div>

        <div className="input-area">
          {mode === "percentOf" && (
            <>
              <label>
                Percentage
                <input
                  type="number"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  placeholder="15"
                />
              </label>

              <label>
                Number
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="200"
                />
              </label>
            </>
          )}

          {mode === "whatPercent" && (
            <>
              <label>
                Part
                <input
                  type="number"
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  placeholder="30"
                />
              </label>

              <label>
                Whole
                <input
                  type="number"
                  value={whole}
                  onChange={(e) => setWhole(e.target.value)}
                  placeholder="200"
                />
              </label>
            </>
          )}

          {mode === "change" && (
            <>
              <label>
                Starting value
                <input
                  type="number"
                  value={startValue}
                  onChange={(e) => setStartValue(e.target.value)}
                  placeholder="200"
                />
              </label>

              <label>
                Final value
                <input
                  type="number"
                  value={endValue}
                  onChange={(e) => setEndValue(e.target.value)}
                  placeholder="250"
                />
              </label>
            </>
          )}

          {mode === "addSubtract" && (
            <>
              <label>
                Number
                <input
                  type="number"
                  value={baseValue}
                  onChange={(e) => setBaseValue(e.target.value)}
                  placeholder="200"
                />
              </label>

              <label>
                Percentage
                <input
                  type="number"
                  value={adjustPercent}
                  onChange={(e) => setAdjustPercent(e.target.value)}
                  placeholder="15"
                />
              </label>

              <div className="toggle-row">
                <button
                  className={operation === "add" ? "active small" : "small"}
                  onClick={() => setOperation("add")}
                >
                  Add
                </button>
                <button
                  className={operation === "subtract" ? "active small" : "small"}
                  onClick={() => setOperation("subtract")}
                >
                  Subtract
                </button>
              </div>
            </>
          )}
        </div>

        <div className="result-box">
          <p>Result</p>
          <h2>{calculateResult()}</h2>
        </div>

        <div className="example-box">
          <h3>Examples</h3>
          <p>15% of 200 = 30</p>
          <p>30 is 15% of 200</p>
          <p>200 to 250 = 25% increase</p>
          <p>200 minus 15% = 170</p>
        </div>
      </section>
    </main>
  );
}

export default App;
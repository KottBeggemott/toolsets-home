import "./App.css";

function App() {
  const tools = [
    {
      name: "Unit Converter",
      url: "https://unit-converter-snowy-sigma.vercel.app",
      description: "Convert length, weight, time and more.",
    },
    {
      name: "BMI Calculator",
      url: "https://bmi-calculator-blond-eight.vercel.app",
      description: "Calculate BMI, body fat and healthy weight range.",
    },
  ];

  return (
    <div className="container">
      <h1>Toolsets</h1>

      <p className="subtitle">
        Simple, fast and free online tools.
      </p>

      <div className="grid">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noreferrer"
            className="card"
          >
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
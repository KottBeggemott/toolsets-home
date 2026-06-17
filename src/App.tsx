import "./App.css";

function App() {
  const tools = [
    {
      name: "Unit Converter",
      url: "/unit-converter",
      description: "Convert length, weight, time and more.",
    },
    {
      name: "BMI Calculator",
      url: "/bmi-calculator",
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
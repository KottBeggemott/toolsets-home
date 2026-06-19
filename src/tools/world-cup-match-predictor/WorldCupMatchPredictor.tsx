import { useState } from "react";

const teams = [
  "Mexico",
  "South Africa",
  "South Korea",
  "Czechia",
  "Canada",
  "Bosnia and Herzegovina",
  "Qatar",
  "Switzerland",
  "Brazil",
  "Morocco",
  "Haiti",
  "Scotland",
  "United States",
  "Paraguay",
  "Australia",
  "Turkey",
  "Germany",
  "Curacao",
  "Ivory Coast",
  "Ecuador",
  "Netherlands",
  "Japan",
  "Sweden",
  "Tunisia",
  "Belgium",
  "Egypt",
  "Iran",
  "New Zealand",
  "Spain",
  "Cape Verde",
  "Saudi Arabia",
  "Uruguay",
  "France",
  "Senegal",
  "Iraq",
  "Norway",
  "Argentina",
  "Algeria",
  "Austria",
  "Jordan",
  "Portugal",
  "DR Congo",
  "Uzbekistan",
  "Colombia",
  "England",
  "Croatia",
  "Ghana",
  "Panama",
];

const reasons = [
  "Momentum is on their side.",
  "The midfield looks dangerous today.",
  "Set pieces could decide this one.",
  "Chaos factor activated.",
  "Underdog magic is loading.",
  "The football gods are feeling dramatic.",
  "Counter-attacking danger is high.",
  "The goalkeeper might become the hero.",
  "One mistake could decide the whole match.",
  "VAR drama probability is unusually high.",
  "A last-minute winner feels possible.",
  "Penalty shootout energy detected.",
  "The algorithm has chosen violence.",
  "Pure World Cup madness incoming.",
  "Big-game aura detected.",
  "The striker is due a goal.",
  "The midfield battle decides everything.",
  "The fans are about to lose their voices.",
  "One moment of brilliance changes everything.",
  "This match smells like chaos.",
  "The defense bends but does not break.",
  "A surprise goal changes everything.",
  "Tournament nerves are kicking in.",
  "Experience gives them the edge.",
  "Youthful energy could shock everyone.",
  "Their pressing looks intense.",
  "Clinical finishing makes the difference.",
  "Cold nerves. Hot finish.",
  "Extra-time vibes detected.",
  "The underdog refuses to disappear.",
  "The captain steps up when it matters.",
  "Halftime team talk will change the game.",
  "The referee may need emotional support.",
  "Someone is definitely hitting the post.",
  "A defender will suddenly become prime Maldini.",
  "Goalkeeper gloves are glowing today.",
  "The ball has chosen drama.",
  "A random substitute becomes a national hero.",
  "Tactical chaos but somehow it works.",
  "The crowd energy is suspiciously powerful.",
  "Football logic has left the stadium.",
  "A 90th-minute heart attack is loading.",
  "Someone’s group chat will explode.",
  "The manager’s face will become a meme.",
  "The xG gods are confused.",
  "This one belongs to the brave.",
  "A corner kick changes destiny.",
  "The commentator will lose his voice.",
  "The first 15 minutes decide everything.",
  "A defensive mistake opens the gates.",
  "The vibes are dangerously unpredictable.",
  "One tackle changes the temperature.",
  "A wonder goal is hiding somewhere.",
  "The scoreboard is ready for nonsense.",
  "This match has meme potential.",
  "The football spirits demand entertainment.",
];
export default function WorldCupMatchPredictor() {
  const [teamA, setTeamA] = useState("Brazil");
  const [teamB, setTeamB] = useState("Argentina");
  const [prediction, setPrediction] = useState("");

  const predictMatch = () => {
    if (teamA === teamB) {
      setPrediction("Choose two different teams.");
      return;
    }
    
    const scoreA = Math.floor(Math.random() * 5);
    const scoreB = Math.floor(Math.random() * 5);
    const confidence = Math.floor(Math.random() * 36) + 55;
    const reason = reasons[Math.floor(Math.random() * reasons.length)];

    setPrediction(
      `${teamA} ${scoreA} - ${scoreB} ${teamB}\nConfidence: ${confidence}%\nReason: ${reason}`
    );
  };
  const copyPrediction = () => {
  if (!prediction) return;

  navigator.clipboard.writeText(
    `${prediction}\n\nGenerated with Toolsets World Cup Match Predictor`
  );
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: "32px 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", fontSize: "36px" }}>
          World Cup Match Predictor
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginBottom: "28px",
          }}
        >
          Pick two teams and generate a fun World Cup score prediction.
        </p>

        <div
          style={{
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: "18px",
            padding: "22px",
          }}
        >
          <select
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            style={{
              width: "100%",
              background: "#020617",
              color: "#f9fafb",
              border: "1px solid #374151",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "16px",
              marginBottom: "14px",
            }}
          >
            {teams.map((team) => (
              <option key={team}>
                {team}
              </option>
            ))}
          </select>

          <select
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            style={{
              width: "100%",
              background: "#020617",
              color: "#f9fafb",
              border: "1px solid #374151",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "16px",
              marginBottom: "18px",
            }}
          >
            {teams.map((team) => (
              <option key={team}>
                {team}
              </option>
            ))}
          </select>

          <button
            onClick={predictMatch}
            style={{
              width: "100%",
              background: "#facc15",
              color: "#020617",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "17px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Predict Match
          </button>

          {prediction && (
            <div
              style={{
                whiteSpace: "pre-line",
                marginTop: "22px",
                background: "#020617",
                border: "1px solid #374151",
                borderRadius: "14px",
                padding: "18px",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              {prediction}
            </div>
          )}
          {prediction && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginTop: "14px",
    }}
  >
    <button
      onClick={copyPrediction}
      style={{
        background: "#111827",
        color: "#f9fafb",
        border: "1px solid #374151",
        borderRadius: "12px",
        padding: "12px",
        fontSize: "15px",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      Copy Prediction
    </button>

    <button
      onClick={predictMatch}
      style={{
        background: "#111827",
        color: "#f9fafb",
        border: "1px solid #374151",
        borderRadius: "12px",
        padding: "12px",
        fontSize: "15px",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      Generate New
    </button>
  </div>
)}
<p
  style={{
    marginTop: "16px",
    fontSize: "13px",
    color: "#9ca3af",
    textAlign: "center",
  }}
>
  ⚽ For entertainment purposes only. Our crystal ball has a questionable
  football record.
</p>
        </div>
      </div>
    </div>
  );
}
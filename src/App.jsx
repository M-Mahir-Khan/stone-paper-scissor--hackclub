import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

const CHOICES = [
  { key: "stone", label: "Stone", emoji: "✊" },
  { key: "paper", label: "Paper", emoji: "✋" },
  { key: "scissors", label: "Scissors", emoji: "✌️" },
];

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [cpuChoice, setCpuChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, cpu: 0 });

  const playGame = (choice) => {
    setUserChoice(choice);
    const cpuPick = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setCpuChoice(cpuPick);

    if (choice.key === cpuPick.key) {
      setResult("🤝 It's a Draw!");
    } else if (
      (choice.key === "stone" && cpuPick.key === "scissors") ||
      (choice.key === "paper" && cpuPick.key === "stone") ||
      (choice.key === "scissors" && cpuPick.key === "paper")
    ) {
      setResult("🎉 You Win!");
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
    } else {
      setResult("🤖 CPU Wins!");
      setScore((prev) => ({ ...prev, cpu: prev.cpu + 1 }));
    }

    const modal = new bootstrap.Modal(document.getElementById("resultModal"));
    modal.show();
  };

  const resetGame = () => {
    setUserChoice(null);
    setCpuChoice(null);
    setResult("");
    setScore({ user: 0, cpu: 0 });
  };

  return (
    <main className="game-bg min-vh-100 d-flex align-items-center justify-content-center text-white p-4">
      <div className="container text-center">
        {/* Title */}
        <header className="mb-5">
          <h1 className="display-3 fw-bold neon-text">Stone · Paper · Scissors</h1>
          <p className="lead text-light">Play against CPU & test your luck! 🎮</p>
        </header>

        {/* Scoreboard */}
        <div className="scoreboard glass-card mb-5 p-3 d-flex justify-content-between align-items-center">
          <span className="badge neon-badge fs-5">🧑 You: {score.user}</span>
          <button onClick={resetGame} className="btn btn-outline-light btn-sm">Reset</button>
          <span className="badge neon-badge fs-5">🤖 CPU: {score.cpu}</span>
        </div>

        {/* Choices */}
        <div className="row g-4 mb-5">
          {CHOICES.map((c) => (
            <div className="col-12 col-sm-4" key={c.key}>
              <button
                className="choice-btn w-100 py-4"
                onClick={() => playGame(c)}
              >
                <span className="fs-1 d-block mb-2">{c.emoji}</span>
                <span className="fw-bold">{c.label}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Result Display */}
        <div className="glass-card p-4">
          <h5 className="text-uppercase text-muted">Last Round</h5>
          <h2 className="fw-bold">{result || "—"}</h2>
          <div className="d-flex justify-content-center gap-4 mt-3 fs-3">
            <span>🧑 {userChoice ? userChoice.emoji : "—"}</span>
            <span>🤖 {cpuChoice ? cpuChoice.emoji : "—"}</span>
          </div>
        </div>

        {/* Modal */}
        <div className="modal fade" id="resultModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-dark">
              <div className="modal-body text-center fs-3 fw-bold">
                {result}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-5 text-light small">
          Made with ❤️ by <a href="https://github.com/M-Mahir-Khan" target="_blank" rel="noreferrer">Mohammed Mahir</a>
        </footer>
      </div>
    </main>
  );
}

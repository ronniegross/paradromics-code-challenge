import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Game } from "./GameContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Game.Provider>
      <App />
    </Game.Provider>
  </StrictMode>
);

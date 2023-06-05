import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GameProvider } from "./GameContext";
import "./index.css";

// This is the main entry point of the application.
// The ReactDOM.render() function is used to render the App component into the DOM.
ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

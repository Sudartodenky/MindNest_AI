import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DetoxProvider } from "./context/DetoxContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DetoxProvider>
      <App />
    </DetoxProvider>
  </React.StrictMode>
);

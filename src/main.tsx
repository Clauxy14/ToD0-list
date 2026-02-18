import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";

// Clear any invalid tokens on app load
const token = localStorage.getItem("auth_token");
if (token) {
  console.log("Clearing potentially invalid token on app load");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("refresh_token");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

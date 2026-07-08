import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 1. Import the router
import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* 2. Wrap your application shell here */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
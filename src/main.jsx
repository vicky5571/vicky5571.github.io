import React from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domMax } from "framer-motion";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LazyMotion features={domMax} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>
);

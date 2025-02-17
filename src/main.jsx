import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import './index.css';

const isProduction = import.meta.env.MODE === "production";
const basename = isProduction ? "/secrets-of-flowers-site" : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);

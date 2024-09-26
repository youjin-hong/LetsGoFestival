import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/myreset.css";
import "./assets/index.css";
import "./assets/App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/myreset.css";
import "./assets/index.css";
import "./assets/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Router />
    </StrictMode>
  </QueryClientProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { initializeCsrf } from "./lib/initializeCsrf";
import "./index.css";
import "./styles/theme.css";

const queryClient = new QueryClient();

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

initializeCsrf()
  .then(renderApp)
  .catch(() => {
    console.error("CSRF init failed — rendering anyway");
    renderApp();
  });

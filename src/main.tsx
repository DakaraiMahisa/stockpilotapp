import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { AppToaster } from "./components/ui/AppToaster";
import { initializeCsrf } from "./lib/initializeCsrf";
import "./index.css";
import "./styles/theme.css";
import "flag-icons/css/flag-icons.min.css";
const queryClient = new QueryClient();

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <AppToaster />
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

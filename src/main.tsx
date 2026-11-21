/* Entry point — providers + router */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/I18nContext";
import { TemaProvider } from "@/tema/TemaContext";
import { router } from "@/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <TemaProvider>
        <RouterProvider router={router} />
      </TemaProvider>
    </I18nProvider>
  </StrictMode>
);

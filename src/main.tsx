import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

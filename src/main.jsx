import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import router from "./router";
import "./index.css";

import { supabase } from "./lib/supabase";
supabase.auth.getSession().then(({ data, error }) => console.log("supabase:", { data, error }));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

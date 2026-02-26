import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Providers } from "./app/Providers";
import { router } from "./app/router/router";

import "./styles/index.scss";

import "~/api/mock/adapter";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);

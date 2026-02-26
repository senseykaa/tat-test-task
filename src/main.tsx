import { createRoot } from "react-dom/client";

import { App } from "./app/App";
import { Providers } from "./app/Providers";

import "./styles/index.scss";

import "~/api/mock/adapter";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);

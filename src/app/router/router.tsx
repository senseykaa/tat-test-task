import { createBrowserRouter } from "react-router-dom";

import { Home } from "~/pages/Home";

import { ErrorBoundary } from "../ErrorBoundary";
import { NotFound } from "../NotFound";

import { PATHS } from "./routes";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: PATHS.HOME,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

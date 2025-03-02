import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@pages/HomePage.jsx";
import MovieDetail from "@pages/MovieDetail.jsx";
import RootLayout from "./RootLayout.jsx";
import TVShowDetail from "@pages/TVShowDetail";
import ModelProvider from "@contexts/ModelProvider";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TVShowDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ModelProvider>
    <RouterProvider router={router} />,
  </ModelProvider>,
);

import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout.jsx";
import ModelProvider from "@contexts/ModelProvider";
import { lazy } from "react";
import SearchPage from "@pages/SearchPage";

// Lazy import //
const MovieDetail = lazy(() => import("@pages/MovieDetail.jsx"));
const TVShowDetail = lazy(() => import("@pages/TVShowDetail"));
const PeoplePage = lazy(() => import("@pages/PeoplePage"));
const HomePage = lazy(() => import("@pages/HomePage.jsx"));

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
      {
        path: "/people/:id",
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
              },
            },
          );
          return response;
        },
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ModelProvider>
    <RouterProvider router={router} />,
  </ModelProvider>,
);

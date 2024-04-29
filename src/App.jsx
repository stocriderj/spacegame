import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthComponent from "./AuthComponent";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import FleetPage from "./pages/FleetPage";
import MapPage from "./pages/MapPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";

function Home() {
  return (
    <>
      {" "}
      <AuthComponent />
    </>
  );
}

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/game",
              loader: async () => {
                if (!user) {
                  return redirect("/register");
                }
                return null;
              },
              children: [
                { index: true, element: <Home /> },
                { path: "/game/map", element: <MapPage /> },
                { path: "/game/fleet", element: <FleetPage /> },
              ],
            },
            {path: "/", element: <RegisterPage/>},
            { path: "/register", element: <RegisterPage /> },
          ],
        },
      ])}
    />
  );
}

export default App;

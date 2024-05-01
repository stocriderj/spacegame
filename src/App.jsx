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
import HomePage from "./pages/HomePage";
import StarSystemPage from "./pages/StarSystemPage";
import PlanetPage from "./pages/PlanetPage";

function Home() {
  return (
    <main className="main container">
      <AuthComponent />
    </main>
  );
}

function App() {
  const {user, loading} = useSelector(state => state.auth);

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
                if (!user && !loading) {
                  return redirect("/register");
                } else {
                  return <div>Loading...</div>;
                }
              },
              children: [
                {index: true, element: <Home />},
                {path: "/game/map", element: <MapPage />},
                {path: "/game/fleet", element: <FleetPage />},
                {path: "/game/star/:starId", element: <StarSystemPage />},
                {path: "/game/star/:starId/:orbitId", element: <PlanetPage />},
              ],
            },
            {path: "/", element: <HomePage />},
            {path: "/register", element: <RegisterPage />},
          ],
        },
      ])}
    />
  );
}

export default App;

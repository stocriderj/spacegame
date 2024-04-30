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

function Home() {
  return (
    <main className="main container">
      <AuthComponent />
    </main>
  );
}

function App() {
  const {user} = useSelector(state => state.auth);

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
                if (!user && user !== null) {
                  return redirect("/register");
                } else {
                  return <div>Loading...</div>;
                }
              },
              children: [
                {index: true, element: <Home />},
                {path: "/game/map", element: <MapPage />},
                {path: "/game/fleet", element: <FleetPage />},
                {path: "/game/star/:starId", element: <StarSystemPage/>}
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

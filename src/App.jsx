import React, {useEffect, useState} from "react";
// import supabase from "./supabase";
import AuthComponent from "./AuthComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FleetPage from "./pages/FleetPage";
import MapPage from "./pages/MapPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";

function Home() {
  return<> <AuthComponent /></>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/fleet" element={<FleetPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

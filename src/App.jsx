import React, {useEffect, useState} from "react";
import supabase from "./supabase";
import AuthComponent from "./AuthComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";

function Sigma() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const {data, error} = await supabase.from("ship_classes").select("*");
    if (error) console.log("Error:", error);
    else setData(data);
    console.log(data);
  };

  return (
    <div>
      {/* <h1>lorem</h1> */}
      {data.map(item => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <ul>
            <li>{item.description}</li>
            <li>{item.hull} HIMR</li>
            <li>{item.attack} HIDR</li>
            <li>{item.speed_warp} LM/s</li>
            <li>{item.speed_cruise} Mm/s</li>
            <li>{item.cost} Irium</li>
            <li>{item?.storage} m3 storage</li>
          </ul>
        </div>
      ))}

      <AuthComponent />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Sigma />} />
          <Route path="/fleet" element={<div></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, {useEffect, useState} from "react";
import supabase from "./supabase";

function App() {
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
      <h1>lorem</h1>
      {data.map(item => (
        <div key={item.id}>
          <ul>
            <li>{item.name}</li>
            <li>{item.description}</li>
            <li>{item.hull} HIMR</li>
            <li>{item.attack} HIDR</li>
            <li>{item.speed} LM/s</li>
            <li>{item.cost} UC</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;

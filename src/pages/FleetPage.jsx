import React, {useEffect, useState} from "react";
import supabase from "../supabase";

export default function FleetPage() {
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
    <div className="container">
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
    </div>
  );
}
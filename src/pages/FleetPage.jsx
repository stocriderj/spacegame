import React, {useEffect, useState} from "react";
import supabase from "../supabase";
import { useSelector } from "react-redux";

export default function FleetPage() {
  const {user} = useSelector(state => state.auth)
  
  const [data, setData] = useState([]);
  const [userShips, setUserShips] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
      fetchUserShips();
    }
  }, [user]);

  const fetchData = async () => {
    const {data, error} = await supabase.from("ship_classes").select("*");
    if (error) console.log("Error:", error);
    else setData(data);
    console.log(data);
  };

  async function fetchUserShips() {
    const {data, error} = await supabase.from("ships").select("*").eq("user_id", user.user.id);
    if (error) console.log("Error fetchin user ships:", error);
    else setUserShips(data);
    console.log("user ships", data);
  }

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
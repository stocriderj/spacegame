import React, {useEffect, useState} from "react";
import supabase from "../supabase";
import {useSelector} from "react-redux";

export default function FleetPage() {
  const {user} = useSelector(state => state.auth);

  const [userShips, setUserShips] = useState([]);

  useEffect(() => {
    if (user) {
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
    const {data, error} = await supabase
      .from("ships")
      .select("*, ship_classes(*)")
      .eq("user_id", user.user.id);
    if (error) console.log("Error fetching user ships:", error);
    else setUserShips(data);
    console.log("user ships", data);
  }

  return (
    <div className="container">
      <div>
        <h2>Ships</h2>
        <ul className="fleet-shiplist">
          {userShips.map(ship => (
            <li key={ship.id} className="fleet-shiplist-ship">
              <h3 className="fleet-shiplist-ship-name">{ship.name}</h3>
              <p className="fleet-shiplist-ship-class">
                <u>{ship.ship_classes.name}</u> at ({ship.coordinates.x},{" "}
                {ship.coordinates.y}), o-{ship.orbit}
              </p>

              <progress
                min="0"
                max={ship.ship_classes.hull}
                value={ship.hull}
              ></progress>
              <p>
                HULL: {ship.hull}/{ship.ship_classes.hull}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

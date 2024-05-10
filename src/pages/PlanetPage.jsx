import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {planetImages} from "../assets/images/imageHelpers";
import {Link} from "../components/Links";
import {useEffect, useState} from "react";
import {fetchPlanets} from "../features/galaxySlice";
import supabase from "../supabase";

const StyledPlanet = styled.div`
  margin: 0 auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img.planet-img {
    position: relative;
    top: 0;
    width: 100%;
    max-width: 36rem;
  }

  & .planet-title {
    text-align: center;
  }

  & h1 {
    margin-top: 1.2rem;
    margin-bottom: -1rem;
    font-size: 3.6rem;
    text-decoration: dashed underline;
  }
`;

function Planet({star, planet, owner: ownerProp}) {
  const [shipClasses, setShipClasses] = useState([]);
  const [userCommands, setUserCommands] = useState([]);
  const buildCommands = userCommands.filter(cmd => cmd.type === "shipbuilding");

  useEffect(() => {
    fetchShipClasses();
    fetchUserCommands();

    const channel = supabase
      .channel("user_commands")
      .on(
        "postgres_changes",
        {event: "INSERT", schema: "public", table: "user_commands"},
        fetchUserCommands
      )
      .on(
        "postgres_changes",
        {event: "UPDATE", schema: "public", table: "user_commands"},
        fetchUserCommands
      )
      .on(
        "postgres_changes",
        {event: "DELETE", schema: "public", table: "user_commands"},
        fetchUserCommands
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchShipClasses() {
    const {data, error} = await supabase.from("ship_classes").select("*");
    if (error) console.error("Error fetching ship classes:", error);
    else setShipClasses(data);
  }

  async function fetchUserCommands() {
    try {
      const {data, error} = await supabase
        .from("user_commands")
        .select("*, ship_classes (*)")
        .eq("planet_id", planet.id)
        .order("created_at", {ascending: true});

      if (error) {
        throw error;
      }

      setUserCommands(data);
      // console.log("user commands:", data);
    } catch (error) {
      console.error("Failed to fetch user commands:", error);
    }
  }

  const owner = ownerProp ? ownerProp : {username: "Unclaimed"};
  const {user, loading} = useSelector(state => state.auth);
  const {authUser} = useSelector(state => state.user);

  async function handleBuildShipCommand(ship) {
    if (authUser.irium >= ship.cost) {
      try {
        const {error} = await supabase.from("user_commands").insert({
          user_id: user.user.id,
          type: "shipbuilding",
          // tick time is handled server-side
          ship_class_id: ship.id,
          planet_id: planet.id,
        });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Failed to add ship to build queue:", error);
      }
    } else {
      alert("There's no way you can afford that, brokey");
    }
  }

  return (
    <StyledPlanet>
      <Link to={`/game/star/${star.id}`}>&larr; Back to {star.name}</Link>

      <div className="planet-title">
        <h1>{planet.name}</h1>
        {planet.type !== "Space Dust" && (
          <h2>{ownerProp ? `Owner: ${owner?.username}` : "Unclaimed"}</h2>
        )}
      </div>

      <img
        className="planet-img"
        src={planetImages[planet.type]}
        alt="Image of the planet"
      />

      <ul>
        <li>Type: {planet.type}</li>
        {/* Doesn't display these for space dust and empty space */}
        {planet.type !== "Space Dust" && (
          <>
            <li>Atmospheric Pressure: {planet.pressure} pascals</li>
            <li>Radius: {planet.radius} km</li>
          </>
        )}
        <li>Iridite: {planet.iridite}</li>
      </ul>

      {owner?.id === user?.user.id && (
        <div>
          <h2>Shipyard build queue</h2>
          <ul>
            {buildCommands.length ? (
              buildCommands.map(command => (
                <li key={command.id}>
                  Building {command.ship_classes.name} (
                  {command.ticks_until_resolution} starminutes left)
                </li>
              ))
            ) : (
              <p>The lazy shipbuilders are taking a snooze &#128564;</p>
            )}
          </ul>

          <h2>Build ships</h2>
          <ul>
            {shipClasses.map(ship => (
              <li key={ship.id}>
                <h3>{ship.name}</h3>
                <ul>
                  <li>{ship.description}</li>
                  <li>{ship.hull} hull</li>
                  <li>{ship.attack} attack</li>
                  <li>{ship.speed_warp} LM/s (warp speed)</li>
                  <li>{ship.speed_cruise} Mm/s (cruise speed)</li>
                  <li>{ship.cost} Irium</li>
                  <li>{ship?.storage} m3 storage</li>
                </ul>
                <button onClick={() => handleBuildShipCommand(ship)}>
                  Build {ship.name} ({ship.build_time} starminutes)
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </StyledPlanet>
  );
}

export default function PlanetPage() {
  const dispatch = useDispatch();

  const {starId, orbitId} = useParams();

  const {
    stars,
    fetchedPlanets,
    loading: galaxyLoading,
  } = useSelector(state => state.galaxy);

  const star = stars ? stars.find(star => star.id == starId) : null;
  const planets = fetchedPlanets?.planets;
  const planet = planets
    ? planets.find(
        planet => planet.star_id == starId && planet.orbit == orbitId
      )
    : null;

  // FETCH PLANETS
  useEffect(() => {
    if (starId && starId != fetchedPlanets?.starId)
      dispatch(fetchPlanets(starId));
  }, [dispatch, starId, planets]);

  if (galaxyLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      {star && planet ? (
        <Planet star={star} planet={planet} owner={planet.users} />
      ) : (
        <div>Planet not found</div>
      )}
    </div>
  );
}

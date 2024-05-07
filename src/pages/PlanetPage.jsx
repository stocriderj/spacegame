import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {planetImages} from "../assets/images/imageHelpers";
import {Link} from "../components/Links";
import {useEffect} from "react";
import {fetchPlanets} from "../features/galaxySlice";

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
  const owner = ownerProp ? ownerProp : {username: "Unclaimed"};

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
        planet => planet.star_id == starId && planet.orbit == orbitId - 1
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
      {planet ? (
        <Planet star={star} planet={planet} owner={planet.users} />
      ) : (
        <div>Planet not found</div>
      )}
    </div>
  );
}

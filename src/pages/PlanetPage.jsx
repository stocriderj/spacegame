import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {planetImages} from "../assets/images/imageHelpers";
import {Link} from "../components/Links";

const StyledPlanet = styled.div`
  margin: 0 auto;
  width: fit-content;
  display: flex;
  gap: 2.4rem;
  flex-direction: column;
  align-items: center;

  & img.planet-img {
    position: relative;
    top: 0;
    width: 100%;
  }
`;

function Planet({star, planet}) {
  return (
    <StyledPlanet>
      <Link to={`/game/star/${star.id}`}>&larr; Back to {star.name}</Link>
      <h1>{planet.name}</h1>

      <img
        className="planet-img"
        src={planetImages[planet.type]}
        alt="Image of the planet"
      />

      <ul>
        <li>Type: {planet.type}</li>
        {/* Doesn't display these for space dust and empty space */}
        {["Space Dust", "Empty Space"].indexOf(planet.type) < 0 && (
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
  const {starId, orbitId} = useParams();
  const {stars, planets, loading} = useSelector(state => state.galaxy);

  const star = stars ? stars.filter(star => star.id == starId)[0] : null;
  const planet = planets
    ? planets.filter(
        planet => planet.star_id == starId && planet.orbit == orbitId
      )[0]
    : null;
  console.log(planet);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : planet ? (
        <Planet star={star} planet={planet} />
      ) : (
        <div>Planet not found</div>
      )}
    </div>
  );
}

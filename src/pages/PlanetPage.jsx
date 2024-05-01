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

function Planet({starSystem, planet}) {
  console.log(planet);
  return (
    <StyledPlanet>
      <Link to={`/game/star/${starSystem.id}`}>
        &larr; Back to {starSystem.name}
      </Link>
      <h1>{planet.name}</h1>

      <img
        className="planet-img"
        src={planetImages[planet.type]}
        alt="Image of the planet"
      />

      <ul>
        <li>Type: {planet.type}</li>
        <li>Atmospheric Pressure: {planet.pressure} pascals</li>
        <li>Radius: {planet.radius} km</li>
        <li>Iridite: {planet.iridite}</li>
      </ul>
    </StyledPlanet>
  );
}

export default function PlanetPage() {
  const {starId, orbitId} = useParams();
  const {galaxy, loading} = useSelector(state => state.galaxy);

  const starSystem = galaxy
    ? galaxy.filter(starSys => starSys.id == starId)[0]
    : null;
  const planet = starSystem?.planets[parseInt(orbitId)];

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : planet ? (
        <Planet starSystem={starSystem} planet={planet} />
      ) : (
        <div>Planet not found</div>
      )}
    </div>
  );
}

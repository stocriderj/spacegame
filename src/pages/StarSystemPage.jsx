import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {planetImages, starImages} from "../assets/images/imageHelpers";
import {Link} from "../components/Links";

const StyledStarSystem = styled.div`
  margin: 0 auto;
  text-align: center;
  width: fit-content;
  display: flex;
  gap: 2.4rem;
  flex-direction: column;
  align-items: center;

  & .star-system-star {
    position: relative;
    top: 0;
    width: 100%;
  }

  & .star-system-planet img {
    min-width: 5%;
    max-width: min(100%, 16rem);
  }
  & .star-system-planet p {
    margin-top: -1rem;
  }
`;

function StarSystem({starSystem}) {
  const star = starSystem.star;
  const planets = starSystem.planets;
  return (
    <StyledStarSystem>
      <Link to="/game/map">&larr; Back to map</Link>
      <h1>{starSystem.name}</h1>

      <img
        className="star-system-star"
        src={starImages[star.color]}
        alt={`${star.name}, class ${star.spectralClass} ${star.color}`}
      />

      {planets.map((planet, orbit) =>
        planet ? (
          <Link
            className="star-system-planet"
            to={`/game/star/${starSystem.id}/${orbit}`}
            key={orbit}
          >
            <img
              src={planetImages[planet.type]}
              alt="Picture of the planet"
              style={{width: `${planet.radius / 5000 + 5}rem`}}
            />
            <p>{planet.name}</p>
          </Link>
        ) : (
          <p key={orbit}>-</p>
        )
      )}
    </StyledStarSystem>
  );
}

export default function StarSystemPage() {
  const dispatch = useDispatch();
  const {starId} = useParams();
  const {galaxy, loading} = useSelector(state => state.galaxy);

  const starSystem = galaxy
    ? galaxy.filter(starSys => starSys.id == starId)[0]
    : null;

  console.log(starSystem);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : starSystem ? (
        <StarSystem starSystem={starSystem} />
      ) : (
        <div>Star not found</div>
      )}
    </div>
  );
}

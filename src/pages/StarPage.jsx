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

function StarSystem({star, planets}) {
  console.log(star, planets);
  return (
    <StyledStarSystem>
      <Link to="/game/map">&larr; Back to map</Link>
      <h1>{star.name}</h1>

      <img
        className="star-system-star"
        src={starImages[star.color]}
        alt={`${star.name}, class ${star.spectral_class} ${star.color}`}
      />

      {planets.map((planet, orbit) =>
        planet ? (
          <Link
            className="star-system-planet"
            to={`/game/star/${star.id}/${orbit + 1}`}
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

export default function StarPage() {
  const dispatch = useDispatch();
  const {starId} = useParams();
  const {
    stars,
    planets: allPlanets,
    loading,
  } = useSelector(state => state.galaxy);

  const star = stars ? stars.filter(star => star.id == starId)[0] : null;
  const planets = allPlanets
    ? allPlanets
        .filter(planet => planet.star_id == starId) // Find planet
        .sort((a, b) => a.orbit - b.orbit) // Sort in ascending order
    : null;

  console.log(star);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : star ? (
        <StarSystem star={star} planets={planets} />
      ) : (
        <div>Star not found</div>
      )}
    </div>
  );
}

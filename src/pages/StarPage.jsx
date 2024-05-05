import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {planetImages, starImages} from "../assets/images/imageHelpers";
import {Link} from "../components/Links";
import {useEffect} from "react";
import {fetchPlanets} from "../features/galaxySlice";

const StyledStarSystem = styled.div`
  margin: 0 auto;
  text-align: center;
  width: fit-content;
  display: flex;
  gap: 2.4rem;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;

  & .star-system-star {
    position: relative;
    top: 0;
    width: 100%;
  }

  & .star-system-planet img {
    min-width: 5%;
    max-width: min(100%, 16rem);
  }

  /* captions */
  & .star-system-planet-owner {
    font-size: 1rem;
    letter-spacing: 1px;
    text-decoration: underline;
  }
  & .star-system-planet-name {
    margin-top: -0.6rem;
    letter-spacing: 2px;
    font-size: 1.6rem;
  }
  & .star-system-empty-space .star-system-planet-name {
    font-size: 2.4rem;
    margin: 10% auto;
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
            className={`star-system-planet  ${
              planet.type == "Empty Space" ? "star-system-empty-space" : ""
            }`}
            to={`/game/star/${star.id}/${orbit + 1}`}
            key={orbit}
          >
            {planet.type != "Empty Space" && (
              <>
                <img
                  src={planetImages[planet.type]}
                  alt="Picture of the planet"
                  style={{width: `${planet.radius / 5000 + 5}rem`}}
                />
              </>
            )}

            <div className="star-system-planet-details">
              {["Empty Space", "Space Dust"].indexOf(planet.type) < 0 && (
                <p className="star-system-planet-owner">
                  {planet.users?.username || "Unclaimed"}
                </p>
              )}

              <p className="star-system-planet-name">{planet.name}</p>
            </div>
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
    fetchedPlanets: planets,
    loading,
    error,
  } = useSelector(state => state.galaxy);

  const star = stars ? stars.find(star => star.id == starId) : null;

  // FETCH PLANETS
  useEffect(() => {
    if (star && star?.id != planets?.starId) dispatch(fetchPlanets(star.id));
  }, [dispatch, star, planets]);

  console.log(star);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      {error ? (
        <>
          <h1>ERROR {error.code}</h1>
          <h2>{error.details}</h2>
          <p>{error.message}</p>
          <p>Hint: {error.hint || "none"}</p>
        </>
      ) : star && planets?.planets ? (
        <StarSystem star={star} planets={planets.planets} />
      ) : (
        <div>Star not found</div>
      )}
    </div>
  );
}

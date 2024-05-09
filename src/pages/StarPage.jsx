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
  & .star-system-planet-name {
    letter-spacing: 2px;
    font-size: 1.6rem;
    text-decoration: underline;
  }
  & .star-system-planet-owner {
    margin-top: -0.6rem;
    font-size: 1rem;
    letter-spacing: 1px;
  }
  & .star-system-empty-space {
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
            className={`star-system-planet`}
            to={`/game/star/${star.id}/${orbit + 1}`}
            key={orbit}
          >
            <img
              src={planetImages[planet.type]}
              alt="Picture of the planet"
              style={{width: `${planet.radius / 5000 + 5}rem`}}
            />

            <p className="star-system-planet-name">{planet.name}</p>

            <div className="star-system-planet-details">
              {planet.type !== "Space Dust" && (
                <p className="star-system-planet-owner">
                  {planet.users?.username || "Unclaimed"}
                </p>
              )}
            </div>
          </Link>
        ) : (
          <p key={orbit} className="star-system-empty-space">
            Empty Space
          </p>
        )
      )}
    </StyledStarSystem>
  );
}

export default function StarPage() {
  const dispatch = useDispatch();

  const {starId} = useParams();

  const {stars, fetchedPlanets, loading, error} = useSelector(
    state => state.galaxy
  );

  const star = stars ? stars.find(star => star.id == starId) : null;
  const planets =
    star?.id == fetchedPlanets?.starId
      ? Array.from(
          {length: 8},
          (_, i) => fetchedPlanets.planets.find(p => p.orbit === i) || null
        )
      : null;

  // FETCH PLANETS
  useEffect(() => {
    // console.log("fetched planets", fetchedPlanets);
    if (star && star?.id != fetchedPlanets?.starId)
      dispatch(fetchPlanets(star.id));
  }, [dispatch, star, fetchedPlanets]);

  console.log(star, planets);

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
      ) : star && planets ? (
        <StarSystem star={star} planets={planets} />
      ) : (
        <div>Star not found</div>
      )}
    </div>
  );
}

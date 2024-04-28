import {useDispatch, useSelector} from "react-redux";
import {getGalaxy} from "../features/galaxySlice";
import {useEffect} from "react";

export default function Map() {
  const dispatch = useDispatch();
  const {galaxy, loading, error} = useSelector(state => state.galaxy);

  useEffect(() => {
    if (!galaxy) dispatch(getGalaxy());
  }, []);

  console.log(galaxy, loading, error);

  //   useEffect(() => {
  //     if (galaxy && !loading && !error) {
  //       for (let i = 0; i < 36; i++) {
  //         // i = y
  //         map.push([]);
  //         console.log(map);
  //         for (let j = 0; j < 36; j++) {
  //           // j = x
  //           console.log(j);
  //           const starSystem = galaxy.filter(
  //             starSystem => starSystem.coordinates == [j - 18, i - 18]
  //           );
  //           if (starSystem) {
  //             map[i].push(starSystem);
  //           } else {
  //             map[i].push(null);
  //           }
  //         }
  //       }

  //   console.log(map);
  //     }
  //   }, [galaxy]);

  /*
[null, null,null],
[null, null,null],
[null, null,null],
[null, null,null],
*/

  function render_map() {
    const map = [];
    for (let y = 0; y < 36; y++) {
      map.push([]);
      for (let x = 0; x < 36; x++) {
        map[y].push(null);
      }
    }

    for (let y = 0; y < 36; y++) {
      for (let x = 0; x < 36; x++) {
        const starSystem = galaxy.filter(
          ss => ss.coordinates.x == x - 18 && ss.coordinates.y == y - 18
        );
        if (starSystem.length) {
          map[y][x] = starSystem[0];
        }
      }
    }

    console.log(map);

    return (
      <ul className="galaxy-map">
        {map.map((row, rowIt) => (
          <li key={rowIt}>
            {row.map((star, starIt) => (
              <span className="galaxy-map-star" key={starIt}>
                {star ? star.name[0] : " - "}
              </span>
            ))}
          </li>
        ))}
      </ul>
    );
  }

  return <div>{!galaxy ? <p>Loading...</p> : render_map()}</div>;
}

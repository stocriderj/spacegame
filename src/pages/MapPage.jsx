import {useDispatch, useSelector} from "react-redux";
import {getGalaxy} from "../features/galaxySlice";
import {useEffect} from "react";
import {ImageOverlay, MapContainer, Marker, Popup, useMap} from "react-leaflet";
import {Icon} from "leaflet";
import {Link} from "../components/Links";

import GalaxyImg from "../assets/images/galaxy.jpg";
import {starImages} from "../assets/images/imageHelpers";

const starIcons = {};
for (let star in starImages) {
  starIcons[star] = new Icon({
    iconUrl: starImages[star],
    iconSize: [38, 38],
  });
}
// export {starIcons};

export default function MapPage() {
  const dispatch = useDispatch();
  const {stars, loading, error} = useSelector(state => state.galaxy);

  const imageBounds = [
    [90, -90],
    [-90, 90],
  ]; // Update this based on your image's geographical bounds

  const SetBounds = ({bounds}) => {
    const map = useMap();
    map.setMaxBounds(bounds);
    map.setMinZoom(map.getBoundsZoom(bounds, false));
    return null;
  };

  console.log(stars);

  return stars ? (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={1}
      maxZoom={4}
      scrollWheelZoom={true}
    >
      {/* <SetBounds bounds={imageBounds} /> */}
      <ImageOverlay
        url={GalaxyImg}
        bounds={[
          [90, 180],
          [-90, -180],
        ]}
        noWrap={true}
      />

      {/* <Marker position={[86, 180]}>test</Marker> */}

      {stars.map(star => (
        <Marker
          position={[star.y_coord * 0.86, star.x_coord * 1.8]}
          // magic numbers 0_0
          icon={starIcons[star.color]}
          key={star.id}
        >
          <Popup>
            <p>{star.name}</p>
            <p>
              ({star.x_coord}, {star.y_coord})
            </p>
            <p>
              <Link to={`/game/star/${star.id}`}>Click</Link>
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <p>Loading...</p>
  );
}

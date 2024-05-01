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
  const {galaxy, loading, error} = useSelector(state => state.galaxy);

  //   console.log(galaxy, loading, error);

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

  console.log(galaxy);

  return galaxy ? (
    <MapContainer
      center={[0, 0]}
      zoom={4}
      minZoom={0}
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

      {galaxy.map(starSys => (
        <Marker
          position={[starSys.coordinates.y * 0.86, starSys.coordinates.x * 1.8]}
          icon={starIcons[starSys.star.color]}
          key={starSys.id}
        >
          <Popup>
            <p>{starSys.name}</p>
            <p>
              ({starSys.coordinates.x}, {starSys.coordinates.y})
            </p>
            <p>
              <Link to={`/game/star/${starSys.id}`}>Click</Link>
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <p>Loading...</p>
  );
}

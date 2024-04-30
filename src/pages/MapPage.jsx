import {useDispatch, useSelector} from "react-redux";
import {getGalaxy} from "../features/galaxySlice";
import {useEffect} from "react";
import {ImageOverlay, MapContainer, Marker, Popup, useMap} from "react-leaflet";
import {Icon} from "leaflet";

// images
import BlueStar from "../assets/images/stars/blue.png";
import BlueWhiteStar from "../assets/images/stars/blue-white.png";
import WhiteStar from "../assets/images/stars/white.png";
import WhiteYellowStar from "../assets/images/stars/white-yellow.png";
import YellowStar from "../assets/images/stars/yellow.png";
import OrangeStar from "../assets/images/stars/orange.png";
import RedStar from "../assets/images/stars/red.png";
import GalaxyImg from "../assets/images/galaxy.jpg";

// star icons
const starIconsBlueprint = [
  {name: "Blue", img: BlueStar},
  {name: "Blue-White", img: BlueWhiteStar},
  {name: "White", img: WhiteStar},
  {name: "White-Yellow", img: WhiteYellowStar},
  {name: "Yellow", img: YellowStar},
  {name: "Orange", img: OrangeStar},
  {name: "Red", img: RedStar},
];
const starIcons = {};
for (let icon of starIconsBlueprint) {
  starIcons[icon.name] = new Icon({
    iconUrl: icon.img,
    iconSize: [38, 38],
  });
}

export default function MapPage() {
  const dispatch = useDispatch();
  const {galaxy, loading, error} = useSelector(state => state.galaxy);

  useEffect(() => {
    if (!galaxy) dispatch(getGalaxy());
  }, []);

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
          [90, -180],
          [-90, 180],
        ]}
        noWrap={true}
      />

      {galaxy.map(starSys => (
        <Marker
          position={[starSys.coordinates.x, starSys.coordinates.y]}
          icon={starIcons[starSys.star.color]}
          key={starSys.id}
        >
          <Popup>{starSys.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <p>Loading...</p>
  );
}

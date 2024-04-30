import { useDispatch, useSelector } from "react-redux";

export default function StarSystemPage({ systemId }) {
  const dispatch = useDispatch();
  const { galaxy } = useSelector((state) => state.galaxy);

  const starSystem = galaxy.filter(starSys => starSys.id === systemId)[0]
  return <div className="container">{starSystem.name}</div>
}

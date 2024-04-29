import {NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signUp, signOut, changeUsername} from "../features/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector(state => state.auth);

  function handleSignOut() {
    dispatch(signOut);
  }

  return (
    <aside className="nav-sidebar">
      {user ? (
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/map">Map</NavLink>
            </li>
            <li>
              <NavLink to="/fleet">Fleet</NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <div></div>
      )}

      <div>
        <a>Log out</a>
      </div>
    </aside>
  );
}

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="main container">
        <Outlet />
      </main>
    </>
  );
}

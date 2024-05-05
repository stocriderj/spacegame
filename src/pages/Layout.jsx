import {useState} from "react";
import {NavLink} from "../components/Links";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../features/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const {user, loading: authLoading, error} = useSelector(state => state.auth);
  const {authUser, loading: userLoading} = useSelector(state => state.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <aside className="nav-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/game" end>
                  Empire
                </NavLink>
              </li>
              <li>
                <NavLink to="/game/map">Map</NavLink>
              </li>
              <li>
                <NavLink to="/game/fleet">Fleet</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div>
        {user && authUser ? (
          <>
            <p>Irium: {authUser.irium}</p>
            <a onClick={handleSignOut}>Log out</a>
          </>
        ) : (
          <>
            <NavLink to="/register">Login</NavLink>
          </>
        )}
      </div>
    </aside>
  );
}

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

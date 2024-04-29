import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp, signOut, changeUsername } from "../features/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    dispatch(signIn(email, password));
  }

  function handleSignOut() {
    dispatch(signOut());
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
        {user ? (
          <a onClick={handleSignOut}>Log out</a>
        ) : (
          <>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br />
            <a onClick={handleSignIn}>Log in</a>
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
      <main className="main container">
        <Outlet />
      </main>
    </>
  );
}

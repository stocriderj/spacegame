import { NavLink } from "../components/Links";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/authSlice";
import styled from "styled-components";

const StyledNavbar = styled.aside`
  background-color: #0d1b2a;
  padding: 2.4rem 1.2rem;
  letter-spacing: 1px;
  z-index: 100;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  font-size: 2.4rem;

  width: 100%;

  & ul {
    list-style-type: none;
  }

  & .navbar-bottom {
    font-size: 1.6rem;
  }
`;

function Navbar() {
  const dispatch = useDispatch();
  const {
    user,
    loading: authLoading,
    error,
  } = useSelector((state) => state.auth);
  const { authUser, loading: userLoading } = useSelector((state) => state.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <StyledNavbar>
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

      <div className="navbar-bottom">
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
    </StyledNavbar>
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

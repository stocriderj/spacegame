import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createBrowserRouter, RouterProvider, redirect} from "react-router-dom";
import FleetPage from "./pages/FleetPage";
import MapPage from "./pages/MapPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import StarPage from "./pages/StarPage";
import PlanetPage from "./pages/PlanetPage";

import {signOut} from "./features/authSlice";
import {setAuthUser, updateUser} from "./features/userSlice";
import supabase from "./supabase";

function Home() {
  const [username, setUsername] = useState("");
  const [nationName, setNationName] = useState("");
  const [nationDenon, setNationDenon] = useState("");

  const dispatch = useDispatch();
  const {user, loading: authLoading, error} = useSelector(state => state.auth);
  const {authUser, loading: usersLoading} = useSelector(state => state.user);

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.username);
      setNationName(authUser.nation_name);
      setNationDenon(authUser.nation_denonym);
    }
  }, [authUser]);

  // handlers
  const handleSignOut = () => {
    dispatch(signOut());
  };

  function handleUpdateUser() {
    dispatch(
      updateUser({
        fields: {
          username,
          nation_name: nationName,
          nation_denonym: nationDenon,
        },
        userId: user.user.id,
      })
    );
  }

  return (
    <main className="main container">
      {usersLoading ? (
        <p>Loading...</p>
      ) : authUser ? (
        <div>
          <p>
            Welcome, {authUser.username}! Your email is{" "}
            {user.user.identities[0].email}
          </p>
          <p>
            The {authUser.nation_denonym || "people"} of{" "}
            {authUser.nation_name || "your nation"} need your guidance.
          </p>
          Username
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          Nation name
          <input
            type="text"
            placeholder="Nation name"
            value={nationName}
            onChange={e => setNationName(e.target.value)}
          />
          <br />
          Nation denonym
          <input
            type="text"
            placeholder="Nation denonym"
            value={nationDenon}
            onChange={e => setNationDenon(e.target.value)}
          />
          <br />
          <button onClick={handleUpdateUser}>Save changes</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>you must login</p>
      )}
    </main>
  );
}

function App() {
  const dispatch = useDispatch();
  const {user, loading} = useSelector(state => state.auth);
  console.log("authenticated user", user);

  useEffect(() => {
    // console.log(user);

    const channel = supabase
      .channel("users")
      .on(
        "postgres_changes",
        {event: "UPDATE", schema: "public", table: "users"},
        payload => {
          console.log("User change received.");
          if (payload.new.id == user?.user.id) {
            console.log(
              "Authenticated user change received - likely a game tick",
              payload
            );
            dispatch(setAuthUser(payload.new));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, dispatch]);

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/game",
              loader: async () => {
                if (!user && !loading) {
                  return redirect("/register");
                } else {
                  return <div>Loading...</div>;
                }
              },
              children: [
                {index: true, element: <Home />},
                {path: "/game/map", element: <MapPage />},
                {path: "/game/fleet", element: <FleetPage />},
                {path: "/game/star/:starId", element: <StarPage />},
                {path: "/game/star/:starId/:orbitId", element: <PlanetPage />},
              ],
            },
            {path: "/", element: <HomePage />},
            {
              path: "/register",
              element: <RegisterPage />,
              loader: async () => {
                if (user && !loading) {
                  return redirect("/game");
                } else {
                  return <div>Loading...</div>;
                }
              },
            },
          ],
        },
      ])}
    />
  );
}

export default App;

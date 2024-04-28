import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signUp, signOut, changeUsername} from "./features/authSlice";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector(state => state.auth);
  const data = useSelector(state => state.auth);

  console.log(data);

  const handleSignIn = () => {
    dispatch(signIn(email, password));
  };

  const handleSignUp = () => {
    dispatch(signUp(email, password));
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleChangeUsername = () => {
    dispatch(changeUsername(username));
  };

  return (
    <div>
      {user ? (
        <div>
          <p>
            Welcome, {user.user.user_metadata.username}! Your email is{" "}
            {user.user.identities[0].email}
          </p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button onClick={handleChangeUsername}>Change Username</button>
          <br />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AuthComponent;

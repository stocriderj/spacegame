import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {signIn, signUp} from "../features/authSlice";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationName, setNationName] = useState("");
  const [nationDenon, setNationDenon] = useState("");

  const dispatch = useDispatch();

  const {user, loading, error} = useSelector(state => state.auth);

  console.log(user);

  const handleSignIn = () => {
    dispatch(signIn(email, password));
  };

  const handleSignUp = () => {
    dispatch(
      signUp({
        username,
        nation_name: nationName,
        nation_denonym: nationDenon,
        email,
        password,
      })
    );
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nation Name"
        value={nationName}
        onChange={e => setNationName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nation Denonym (What will your people be referred to as?)"
        value={nationDenon}
        onChange={e => setNationDenon(e.target.value)}
      />
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

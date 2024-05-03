import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp, signOut } from "../features/authSlice";
import { changeUsername, getUsers } from "../features/userSlice";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nationName, setNationName] = useState("");
  const [nationDenon, setNationDenon] = useState("");
  
  const dispatch = useDispatch();
  
  const { user, loading, error } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const authUser = users ? users.filter((u) => u.id == user.user.id)[0] : null;
  
  console.log(user);
  console.log(users);
  console.log(authUser);

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
      }),
    );
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleChangeUsername = () => {
    dispatch(changeUsername({ username, userId: user.user.id }));
  };

  return (
    <div className="container">
      {user && authUser ? (
        <div>
          <p>
            Welcome, {authUser.username}! Your email is{" "}
            {user.user.identities[0].email}
          </p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleChangeUsername}>Change Username</button>
          <br />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nation Name"
            value={nationName}
            onChange={(e) => setNationName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nation Denonym (What will your people be referred to as?)"
            value={nationDenon}
            onChange={(e) => setNationDenon(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

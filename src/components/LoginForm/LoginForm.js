import { useState, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { APIUrl } from "../../config/config";
import { AuthContext } from "../../context/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const { username, setUsername, password, setPassword } =
    useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  // username: "abczzz13",
  // password: "v$*UfieAepz7zuYphJ^^",

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch(`${APIUrl}/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // "Access-Control-Allow-Methods": true,
      },
      // credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const content = await response.json();
    console.log("content", content);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="formWrapper">
      <form className="form" onSubmit={login}>
        <h2>LOG IN</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>

      <div className="text">
        <p>No account?</p>{" "}
        <NavLink to="/signup">Click here to register.</NavLink>
      </div>
    </div>
  );
}

import { useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const { username, setUsername, password, setPassword, redirect, login } =
    useContext(AuthContext);

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
          required={true}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          value={password}
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

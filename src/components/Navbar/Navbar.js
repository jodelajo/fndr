import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { username } = useContext(AuthContext);
  return (
    <div className="links">
      <p>Welkom {username}</p>
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? "active" : "login")}
      >
        FNDR
      </NavLink>
      {username ? (
        <NavLink
          to="/logout"
          className={(navData) => (navData.isActive ? "active" : "login")}
        >
          Log out
        </NavLink>
      ) : (
        <>
          <NavLink
            to="/login"
            className={(navData) => (navData.isActive ? "active" : "login")}
          >
            Log in
          </NavLink>
          <NavLink
            to="/signup"
            className={(navData) => (navData.isActive ? "active" : "login")}
          >
            Sign up
          </NavLink>
        </>
      )}
    </div>
  );
}

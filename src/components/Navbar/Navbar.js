import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { userToken, logout, username } = useContext(AuthContext);

  return (
    <div className="links">
      {userToken && userToken.error !== "Unauthorized" && (
        <p className="welcome">Welkom {username}</p>
      )}
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? "active" : "login")}
      >
        FNDR
      </NavLink>
      {userToken ? (
        <NavLink
          to="/logout"
          className={(navData) => (navData.isActive ? "active" : "login")}
          onClick={logout}
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

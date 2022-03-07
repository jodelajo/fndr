import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { userToken, logout, username } = useContext(AuthContext);

  return (
    <div className="links">
      {userToken && userToken.error !== "Unauthorized" && (
        <p>
          Welkom <span className="welcome">{username}</span>
        </p>
      )}
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? "active" : "login")}
      >
        FNDR
      </NavLink>

      {userToken ? (
        <>
          <NavLink
            to="/signup"
            className={(navData) => (navData.isActive ? "active" : "login")}
          >
            Create new Admin
          </NavLink>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? "active" : "login")}
            onClick={logout}
          >
            Log out
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={(navData) => (navData.isActive ? "active" : "login")}
          >
            Log in
          </NavLink>
        </>
      )}
    </div>
  );
}

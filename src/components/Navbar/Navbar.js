import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="links">
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? "active" : "login")}
      >
        FNDR
      </NavLink>
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
    </div>
  );
}

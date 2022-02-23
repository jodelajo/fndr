import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="links">
      <NavLink to="/" className="login">
        FNDR
      </NavLink>
      <NavLink to="/login" className="login">
        Log In
      </NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </div>
  );
}

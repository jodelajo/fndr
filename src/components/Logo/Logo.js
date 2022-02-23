import { NavLink } from "react-router-dom";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo-title">
      <NavLink to="/">FNDR</NavLink>
    </div>
  );
}

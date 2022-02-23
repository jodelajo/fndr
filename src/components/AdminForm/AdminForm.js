import { NavLink } from "react-router-dom";
import "./AdminForm.css";

export default function AdminForm() {
  return (
    <div className="formWrapper">
      <form className="form">
        <input type="email" placeholder="Enter your emailaddress"></input>
        <input type="password" placeholder="password"></input>
        <button type="submit">Login</button>
      </form>
      No account? <NavLink to="/signup">Click here to register.</NavLink>
    </div>
  );
}

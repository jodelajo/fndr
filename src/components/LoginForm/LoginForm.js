import { NavLink } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
  return (
    <div className="formWrapper">
      <form className="form">
        <h2>LOG IN</h2>
        <input type="email" placeholder="Your email address" />
        <input type="password" placeholder="password" />
        <button type="submit">Log in</button>
      </form>

      <div className="text">
        <p>No account?</p>{" "}
        <NavLink to="/signup">Click here to register.</NavLink>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import "./SignupForm.css";

export default function SignupForm() {
  return (
    <div className="formWrapper">
      <form className="form">
        <h2>SIGN UP</h2>
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Your email address" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="Confirm password" />
        <button type="submit">Sign up</button>
      </form>

      <div className="text">
        <p>Already have an account?</p>
        <NavLink to="/login">Click here to log in.</NavLink>
      </div>
    </div>
  );
}

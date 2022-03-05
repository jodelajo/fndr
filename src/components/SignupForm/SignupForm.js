import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./SignupForm.css";

export default function SignupForm() {
  const { setUserName, setPassWord } = useContext(AuthContext);

  return (
    <div className="formWrapper">
      <form className="form">
        <h2>SIGN UP</h2>
        <input
          type="text"
          placeholder="Your username"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        {/* <input
          type="email"
          placeholder="Your email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassWord(e.target.value)}
        />
        {/* <input type="password" placeholder="Confirm password" /> */}
        <button type="submit">Sign up</button>
      </form>

      <div className="text">
        <p>Already have an account?</p>
        <NavLink to="/login">Click here to log in.</NavLink>
      </div>
    </div>
  );
}

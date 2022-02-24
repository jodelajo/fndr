import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./AdminForm.css";

export default function AdminForm() {
  const location = useLocation();
  const [form, setForm] = useState();
  const url = location.pathname;

  useEffect(() => {
    setForm(url);
  }, [url]);

  const formHandler = () => {
    if (form === "/signup") {
      return (
        <div>
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
    } else {
      return (
        <div>
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
  };

  return <div className="formWrapper">{formHandler()}</div>;
}

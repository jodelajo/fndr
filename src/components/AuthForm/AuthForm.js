import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./AuthForm.css";

export default function AuthForm() {
  const { login, user } = useContext(AuthContext);
  const [username, setUsername] = useState(
    process.env.REACT_APP_USERNAME || ""
  );
  const [password, setPassword] = useState(
    process.env.REACT_APP_PASSWORD || ""
  );
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("user", user);
  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
    } catch (error) {
      setFormError(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="formWrapper">
      <form className="form" onSubmit={submitLogin}>
        {user ? <h2>CREATE NEW ADMIN</h2> : <h2>LOG IN</h2>}
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          value={username}
        />
        {user && (
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          value={password}
        />

        {!user ? (
          <SubmitButton isLoading={isLoading} text="Log in" color="grey" />
        ) : (
          <SubmitButton
            isLoading={isLoading}
            text="Create new admin"
            color="grey"
          />
        )}

        <p>{formError}</p>
      </form>
    </div>
  );
}

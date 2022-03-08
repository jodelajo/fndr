import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState(
    process.env.REACT_APP_USERNAME || ""
  );
  const [password, setPassword] = useState(
    process.env.REACT_APP_PASSWORD || ""
  );
  const [formError, setFormError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <div className="formWrapper">
      <form className="form" onSubmit={submit}>
        <h2>LOG IN</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          value={password}
        />
        <button type="submit">Log in</button>
        <p>{formError}</p>
      </form>
    </div>
  );
}

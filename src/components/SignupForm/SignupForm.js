import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./SignupForm.css";

export default function SignupForm() {
  const { setUserName, setPassWord } = useContext(AuthContext);

  return (
    <div className="formWrapper">
      <form className="form">
        <h2>CREATE NEW ADMIN</h2>
        <input
          type="text"
          placeholder="Email address"
          required
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassWord(e.target.value)}
        />
        <button type="submit">Create new admin</button>
      </form>
    </div>
  );
}

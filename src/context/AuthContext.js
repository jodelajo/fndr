import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { APIUrl } from "../config/config";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [username, setUsername] = useState(
    process.env.REACT_APP_USERNAME || ""
  );
  const [password, setPassword] = useState(
    process.env.REACT_APP_PASSWORD || ""
  );
  const [userToken, setUserToken] = useState("");
  const [decoded, setDecoded] = useState({});
  const [redirect, setRedirect] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${APIUrl}/token`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer" + userToken && userToken.token,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const content = await response?.json();
      setUserToken(content);
      setRedirect(true);
      localStorage.setItem("token", content.token);
      const decoded = jwt_decode(content.token);
      setDecoded(decoded);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUserToken("");
    setRedirect(false);
  };

  const data = {
    username,
    setUsername,
    password,
    setPassword,
    userToken,
    setUserToken,
    login,
    redirect,
    logout,
    decoded,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { APIUrl } from "../config/config";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [username, setUsername] = useState("abczzz13");
  const [password, setPassword] = useState("v$*UfieAepz7zuYphJ^^");
  const [userToken, setUserToken] = useState("");
  const [decoded, setDecoded] = useState({});
  const [redirect, setRedirect] = useState(false);

  // console.log("userToken", userToken);
  // console.log("decoded", decoded);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${APIUrl}/token`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer" + userToken.token,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const content = await response?.json();
      setUserToken(content);
      setRedirect(true);
      const decoded = jwt_decode(content.token);
      setDecoded(decoded);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    window.location.reload(false);
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

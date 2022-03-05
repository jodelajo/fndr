import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { APIUrl } from "../config/config";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("abczzz13");
  const [password, setPassword] = useState("v$*UfieAepz7zuYphJ^^");
  const [userToken, setUserToken] = useState("");
  const [redirect, setRedirect] = useState(false);

  // username: "abczzz13",
  // password: "v$*UfieAepz7zuYphJ^^",
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const decoded = jwt_decode(userToken ? userToken.token : token);
  console.log("decoded", decoded);
  console.log("username-auth", username);
  console.log("userToken", userToken);

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch(`${APIUrl}/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const content = await response.json();
    setUserToken(content);
    setRedirect(true);
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
    // name,
    // setName,
    // email,
    // setEmail,
    login,
    redirect,
    logout,
    decoded,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

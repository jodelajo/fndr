import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const decoded = jwt_decode(token);
  console.log("decoded", decoded);
  console.log("username-auth", username);

  const data = {
    username,
    setUsername,
    password,
    setPassword,
    decoded,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

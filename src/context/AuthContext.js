import { createContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  const decoded = jwt_decode(token);
  console.log("decoded", decoded);

  const localStorageTest = localStorage.getItem(decoded.sub);
  console.log("localst", localStorageTest);

  const data = {
    username: "abczzz13",
    password: "v$*UfieAepz7zuYphJ^^",
    decoded,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

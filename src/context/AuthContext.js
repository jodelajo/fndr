import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIUrl } from "../config/config";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState("");

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${APIUrl}/token`, {
        username,
        password,
      });
      console.log(response);
      const content = response.data;

      setUserToken(content.token);
      navigate("/");
      localStorage.setItem("token", content.token);
    } catch (e) {
      console.log(e);
      if (e.request.status === 401) {
        const message = JSON.parse(e.request.response).message;
        throw new Error(message);
      } else {
        throw new Error(
          "Something went wrong, please visit https://github.com/jodelajo/fndr/issues, and let me know! "
        );
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    setUserToken("");
  };

  const data = {
    userToken,
    setUserToken,
    login,
    logout,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

import { createContext, useState } from "react";
import axios from "axios";
import { APIUrl } from "../config/config";

export const AgencyContext = createContext({});

export default function AgencyContextProvider({ children }) {
  const [selectedAgency, setSelectedAgency] = useState({ company_id: 1 });
  const [pop, setPop] = useState(false);
  const [cityList, setCityList] = useState({});
  const [error, setError] = useState(null);
  const [state, setState] = useState({});
  const header = {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
  };

  async function submitData() {
    if (localStorage.token) {
      const patchUrl = axios.patch(
        `${APIUrl}/companies/${selectedAgency?.company_id}`,
        state,
        header
      );
      try {
        await patchUrl;
      } catch (e) {
        if (e.request.status === 401) {
          const message = JSON.parse(e.request.response).message;
          setError(message);
          throw new Error(message);
        } else {
          throw new Error(
            "Something went wrong, please visit https://github.com/jodelajo/fndr/issues, and let me know!"
          );
        }
      }
    } else {
      return;
    }
  }

  function onChangeHandler(e) {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  }

  const data = {
    selectedAgency,
    setSelectedAgency,
    pop,
    setPop,
    cityList,
    setCityList,
    submitData,
    state,
    setState,
    error,
    onChangeHandler,
  };
  return (
    <AgencyContext.Provider value={data}>{children}</AgencyContext.Provider>
  );
}

import { createContext, useState, useEffect } from "react";
import { APIUrl } from "../config/config";
export const AgencyContext = createContext({});

export default function AgencyContextProvider({ children }) {
  const [selectedAgency, setSelectedAgency] = useState({});
  const [pop, setPop] = useState(false);
  const [cityList, setCityList] = useState({});
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    page: 1,
    agencies: [],
    isLoading: true,
    hasMore: true,
    selectedAgencyId: "",
  });

  console.log("state in agencycontext", state);
  useEffect(() => {
    fetch(`${APIUrl}/cities`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Data ophalen is mislukt");
        }
        return res.json();
      })
      .then((data) => {
        setCityList(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [setCityList]);

  const data = {
    selectedAgency,
    setSelectedAgency,
    pop,
    setPop,
    cityList,
    setCityList,
    error,
    state,
    setState,
  };
  return (
    <AgencyContext.Provider value={data}>{children}</AgencyContext.Provider>
  );
}

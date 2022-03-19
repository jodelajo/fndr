import { createContext, useState } from "react";

export const AgencyContext = createContext({});

export default function AgencyContextProvider({ children }) {
  const [selectedAgency, setSelectedAgency] = useState({});
  const [pop, setPop] = useState(false);
  const [cityList, setCityList] = useState({});

  console.log("agencyContext selectedAgency", selectedAgency);

  const data = {
    selectedAgency,
    setSelectedAgency,
    pop,
    setPop,
    cityList,
    setCityList,
  };
  return (
    <AgencyContext.Provider value={data}>{children}</AgencyContext.Provider>
  );
}

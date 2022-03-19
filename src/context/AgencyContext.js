import { createContext, useState } from "react";

export const AgencyContext = createContext({});

export default function AgencyContextProvider({ children }) {
  const [selectedAgency, setSelectedAgency] = useState({ company_id: 1 });
  const [pop, setPop] = useState(false);
  const [cityList, setCityList] = useState({});

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

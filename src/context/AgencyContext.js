import { createContext, useState } from "react";

export const AgencyContext = createContext({});

export default function AgencyContextProvider({ children }) {
  const [selectedAgency, setSelectedAgency] = useState();
  const [pop, setPop] = useState(false);
  //   console.log("selected agency", selectedAgency);
  //   console.log("context pop", pop);

  const data = {
    selectedAgency,
    setSelectedAgency,
    pop,
    setPop,
  };
  return (
    <AgencyContext.Provider value={data}>{children}</AgencyContext.Provider>
  );
}

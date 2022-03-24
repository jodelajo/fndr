import { createContext, useState, useEffect, useCallback } from "react";
// import axios from "axios";
import { APIUrl } from "../config/config";
import useCustomSearchParams from "../hooks/useCustomSearchParams";

export const AgencyContext = createContext({});

export default function AgencyContextProvider({ children }) {
  const [selectedAgency, setSelectedAgency] = useState();
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
  const [search, setSearch] = useCustomSearchParams();
  const { page, agencies, isLoading, hasMore, selectedAgencyId } = state;

  useEffect(() => {
    if (selectedAgencyId !== "") {
      setSelectedAgency(
        agencies?.find((agency) => agency.company_id === selectedAgencyId)
      );
    }
  }, [agencies, selectedAgencyId]);
  console.log(agencies);

  console.log("state in agency context", state);

  console.log("sel agency in agencycontext", selectedAgency);

  // const newAngenciesArrarHandler = () => {
  //   if (
  //     agencies?.find(
  //       (agency) => agency.company_id === selectedAgency?.company_id
  //     )
  //   ) {
  //     return selectedAgency;
  //   }
  // };

  // useEffect(() => {
  //   // let newAgenciesArray = [...agencies, selectedAgency];
  //   if (
  //     agencies?.find((agency) => agency?.company_id === selectedAgencyId) &&
  //     agencies?.find((agency) => agency !== selectedAgency)
  //   ) {
  //     // const vla = newAngenciesArrarHandler();

  //     // let newAgenciesArray = [vla];
  //     // console.log("newAGENCYarray", newAgenciesArray);
  //     console.log("wel");
  //     // setState((prevState) => {
  //     //   return {
  //     //     ...prevState,
  //     //     agencies: [...agencies, selectedAgency && selectedAgency],
  //     //     selectedAgencyId: "",
  //     //   };
  //     // });
  //   } else {
  //     console.log("niet");
  //   }
  // }, [
  //   agencies,
  //   selectedAgency,
  //   selectedAgency.company_id,
  //   selectedAgencyId,
  //   state,
  // ]);

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
    // fetchData,
    search,
    setSearch,
  };
  return (
    <AgencyContext.Provider value={data}>{children}</AgencyContext.Provider>
  );
}

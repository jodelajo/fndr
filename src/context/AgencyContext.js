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
  // const { page } = state;
  const [search, setSearch] = useCustomSearchParams();
  // const { city, company_size } = search;

  useEffect(() => {
    if (state.selectedAgencyId !== "") {
      setSelectedAgency(
        state?.agencies?.find(
          (agency) => agency.company_id === state?.selectedAgencyId
        )
      );
    }
  }, [state?.agencies, state.selectedAgencyId]);

  console.log("state in agency context", state);

  console.log("sel agency in agencycontext", selectedAgency);

  // const LIMIT = 18;

  // const fetchData = useCallback(async () => {
  //   let params = {
  //     per_page: LIMIT,
  //     page: page,
  //     city_like: city || null,
  //     size: company_size || null,
  //   };

  //   const response = await axios.get(`${APIUrl}/companies`, {
  //     params: params,
  //   });

  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       agencies: [...prevState.agencies, ...response.data.items],
  //       isLoading: false,
  //       hasMore: response.data._meta.page < response.data._meta.total_pages,
  //     };
  //   });
  // }, [page, city, company_size, setState]);

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

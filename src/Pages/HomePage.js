import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../Pages/HomePage.css";
import Agencies from "../components/Agencies/Agencies";
import LocationSearch from "../components/LocationSearch/LocationSearch";
import { isEndOfPage } from "../utils/dataTransformations";
import { APIUrl } from "../config/config";
import SizeFilter from "../components/SizeFilter/CompanySizeFilter";

const LIMIT = 15;

export default function HomePage() {
  const [state, setState] = useState({
    agencies: [],
    isLoading: true,
    page: 1,
    searchInput: "",
    companySize: "",
  });

  const { agencies, isLoading, page, searchInput, companySize } = state;

  const fetchData = useCallback(async () => {
    let params = {
      _limit: LIMIT,
      _page: page,
      city_like: searchInput || null,
      companySize: companySize || null,
    };

    const response = await axios.get(`${APIUrl}/agencies`, {
      params: params,
    });

    setState((previousState) => {
      return {
        ...previousState,
        agencies: [...previousState.agencies, ...response.data],
        isLoading: false,
      };
    });
  }, [searchInput, companySize, page]);

  const handleScroll = useCallback(
    (e) => {
      if (
        isEndOfPage(e) &&
        isLoading === false &&
        agencies.length === page * LIMIT
      ) {
        setState((previousState) => {
          return {
            ...previousState,
            page: previousState.page + 1,
            isLoading: true,
          };
        });
      }
    },
    [isLoading, agencies, page]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function setNewLocation(locationQuery) {
    setState({
      ...state,
      searchInput: locationQuery,
      page: 1,
      agencies: [],
      isLoading: true,
    });
  }

  function setNewCompanySize(size) {
    setState({
      ...state,
      companySize: size,
      page: 1,
      agencies: [],
      isLoading: true,
    });
  }

  console.log(`
    STATE:

    page: ${page},
    agencies length: ${agencies.length},
    loading: ${isLoading},
    searchInput: ${searchInput},
    location: ${companySize} 
  `);

  return (
    <div className="general">
      <div className="logo">
        <h1 className="logo-title">FNDR</h1>
        <div className="options">
          <LocationSearch
            setSearchInput={setNewLocation}
            searchInput={searchInput}
          />
          <SizeFilter
            companySize={companySize}
            setCompanySize={setNewCompanySize}
          />
        </div>
      </div>
      <div className="main-card">
        {agencies.map((agency) => {
          return (
            <div className="block" key={agency.id}>
              <Agencies agency={agency} />
            </div>
          );
        })}
      </div>
      {isLoading && (
        <div className="loading">
          <Oval color="#00BFFF" height={80} width={80} ariaLabel="loading" />
        </div>
      )}
    </div>
  );
}

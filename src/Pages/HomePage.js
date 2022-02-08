import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [companySize, setCompanySize] = useState("");

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

    const dataOfAgencies = response.data;
    setAgencies((oldData) => [...oldData, ...dataOfAgencies]);
    setIsLoading(false);
  }, [searchInput, companySize, page]);

  const handleScroll = useCallback(
    (e) => {
      if (
        isEndOfPage(e) &&
        isLoading === false &&
        agencies.length === page * LIMIT
      ) {
        setPage((currentPage) => currentPage + 1);
        setIsLoading(true);
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
    setSearchInput(locationQuery);
    setPage(1);
    setAgencies([]);
    setIsLoading(true);
  }

  function setNewCompanySize(size) {
    setCompanySize(size);
    setPage(1);
    setAgencies([]);
    setIsLoading(true);
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
      {/* {bla}
      <button onClick={updateState}>CLICK ME</button> */}
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

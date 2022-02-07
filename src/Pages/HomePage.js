import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../Pages/HomePage.css";
import Agencies from "../components/Agencies/Agencies";
import LocationSearch from "../components/LocationSearch/LocationSearch";
import { isEndOfPage } from "../utils/dataTransformations";

export default function HomePage() {
  const [agencies, setAgencies] = useState([]);
  const page = useRef(1);
  const [searchInput, setSearchInput] = useState("");

  const rightUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE;

  const fetchData = useCallback(async () => {
    const pageToFetch = page.current;
    page.current = page.current + 1;
    const response = await axios.get(
      `${rightUrl}?_limit=15&_page=${pageToFetch}&city_like=${searchInput}`
    );

    const dataOfAgencies = response.data;
    setAgencies((oldData) => [...oldData, ...dataOfAgencies]);
  }, [searchInput, rightUrl]);

  const handleScroll = useCallback(
    (e) => {
      if (isEndOfPage(e)) {
        fetchData();
      }
    },
    [fetchData]
  );

  useEffect(() => {
    page.current = 1;
    setAgencies([]);
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, handleScroll]);

  return (
    <div className="general">
      <div className="logo">
        <h1 className="logo-title">FNDR</h1>
        <LocationSearch
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>

      <div className="main-card">
        {agencies.map((agency) => {
          return (
            <div className="block" key={agency.id}>
              <Agencies agency={agency} />
            </div>
          );
        })}
        <div className="loading">
          <Oval color="#00BFFF" height={100} width={100} ariaLabel="loading" />
        </div>
      </div>
    </div>
  );
}

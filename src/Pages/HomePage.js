import React from "react";
import { useState, useEffect } from "react";
import db from "../db (1).json";
import "../Pages/HomePage.css";
import Agencies from "../components/Agencies/Agencies";
import LocationSearch from "../components/LocationSearch/LocationSearch";

export default function HomePage() {
  const [agencies, setAgencies] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = () => {
    const response = db;
    setAgencies(response.agencies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchInputEmpty = searchInput === "";
  const agencyMatchesSearchQuery = (searchInput, agency) =>
    agency.city.toLowerCase().includes(searchInput.toLocaleLowerCase());

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
        {agencies
          .filter(
            (agency) =>
              searchInputEmpty || agencyMatchesSearchQuery(searchInput, agency)
          )
          .map((agency) => {
            return (
              <div className="block" key={agency.id}>
                <Agencies agency={agency} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

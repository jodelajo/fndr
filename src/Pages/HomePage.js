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
  console.log("searchInput Homepage", searchInput);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="general">
      <div className="logo">
        <h1>FNDR</h1>
      </div>
      <LocationSearch setSearchInput={setSearchInput} />
      <div className="main-card">
        {agencies
          .filter((loc) => {
            if (searchInput === "") {
              return loc;
            } else if (
              loc.city.toLowerCase().includes(searchInput.toLocaleLowerCase())
            ) {
              return loc;
            }
            return false;
          })
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

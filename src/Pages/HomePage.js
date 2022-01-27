import React from "react";
import { useState, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../Pages/HomePage.css";
import Agencies from "../components/Agencies/Agencies";
import LocationSearch from "../components/LocationSearch/LocationSearch";

export default function HomePage() {
  const [agencies, setAgencies] = useState([]);
  const page = useRef(1);
  const [searchInput, setSearchInput] = useState("");

  console.log("AGENCIES", agencies);
  console.log("searchInput in component", searchInput);

  const fetchData = async () => {
    console.log("searchInput", searchInput);
    // const response = await axios.get(
    //   `http://localhost:8000/agencies?_limit=15&_page=${page.current}&city_like=${searchInput}`
    // );
    // console.log("GETMY", response);

    // const dataOfAgencies = response.data;
    // setAgencies((oldData) => [...oldData, ...dataOfAgencies]);
    // page.current = page.current + 1;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, [searchInput]);

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

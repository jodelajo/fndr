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

export default function HomePage() {
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const [searchInput, setSearchInput] = useState("");
  const [companySizes, setCompanySizes] = useState();

  const sizeOfCompany = () => {
    if (!companySizes) {
      return "";
    } else {
      return `companySize=${companySizes}`;
    }
  };
  const theSizes = sizeOfCompany();
  // console.log("sizeOfCompany", theSizes);

  const fetchData = useCallback(async () => {
    const pageToFetch = page.current;
    page.current = page.current + 1;
    setIsLoading(true);
    const response = await axios.get(
      `${APIUrl}/agencies?_limit=15&_page=${pageToFetch}&city_like=${searchInput}&${theSizes}`
    );

    const dataOfAgencies = response.data;
    setAgencies((oldData) => [...oldData, ...dataOfAgencies]);
    setIsLoading(false);
  }, [searchInput, theSizes]);

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
        <SizeFilter
          companySizes={companySizes}
          setCompanySizes={setCompanySizes}
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
      </div>
      {isLoading && (
        <div className="loading">
          <Oval color="#00BFFF" height={80} width={80} ariaLabel="loading" />
        </div>
      )}
    </div>
  );
}

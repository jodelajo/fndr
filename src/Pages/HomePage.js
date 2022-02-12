import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../Pages/HomePage.css";
import Agencies from "../components/Agencies/Agencies";
import LocationSearch from "../components/LocationSearch/LocationSearch";
import { isEndOfPage, hasNextPage } from "../utils/dataTransformations";
import { APIUrl } from "../config/config";
import SizeFilter from "../components/SizeFilter/CompanySizeFilter";

const LIMIT = 15;

export default function HomePage() {
  const [state, setState] = useState({
    page: 1,
    agencies: [],
    isLoading: true,
    city: "",
    companySize: "",
  });

  const { page, agencies, isLoading, city, companySize } = state;

  const fetchData = useCallback(async () => {
    let params = {
      _limit: LIMIT,
      _page: page,
      city_like: city || null,
      companySize: companySize || null,
    };

    const response = await axios.get(`${APIUrl}/agencies`, {
      params: params,
    });

    setState((prevState) => {
      return {
        ...prevState,
        agencies: [...response.data],
        isLoading: false,
      };
    });
  }, [page, city, companySize]);

  const handleScroll = useCallback(
    (e) => {
      if (
        isEndOfPage(e) &&
        !isLoading &&
        hasNextPage(agencies.length, page, LIMIT)
      ) {
        setState((prevState) => {
          return {
            ...prevState,
            page: prevState.page + 1,
            isLoading: true,
          };
        });
      }
    },
    [agencies, isLoading, page]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function updateQuery(key, value) {
    setState({
      ...state,
      [key]: value,
      page: 1,
      agencies: [],
      isLoading: true,
    });
  }

  return (
    <div className="general">
      <div className="logo">
        <h1 className="logo-title">FNDR</h1>
        <div className="options">
          <LocationSearch updateQuery={updateQuery} city={city} />
          <SizeFilter updateQuery={updateQuery} companySize={companySize} />
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

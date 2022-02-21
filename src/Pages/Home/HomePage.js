import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../Home/HomePage.css";
import Agencies from "../../components/Agencies/Agencies";
import useCustomSearchParams from "../../hooks/useCustomSearchParams";
import LocationSearch from "../../components/LocationSearch/LocationSearch";
import {
  isEndOfPage,
  hasNextPage,
  renameCompSize,
} from "../../utils/dataTransformations";
import { APIUrl } from "../../config/config";
import SizeFilter from "../../components/SizeFilter/CompanySizeFilter";
import HelmetSwitch from "../../components/HelmetSwitch/HelmetSwitch";

const LIMIT = 15;

export default function HomePage() {
  const location = useLocation();
  const [search, setSearch] = useCustomSearchParams();
  const [state, setState] = useState({
    page: 1,
    agencies: [],
    isLoading: true,
  });

  const { page, agencies, isLoading } = state;
  const { city, companySize } = search;
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
        agencies: [...prevState.agencies, ...response.data],
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

  const updateQuery = useCallback(
    (key, value) => {
      setState({
        ...state,
        page: 1,
        agencies: [],
        isLoading: true,
      });
      setSearch({
        ...search,
        [key]: value,
      });
    },
    [state, setSearch, search]
  );

  return (
    <div className="general">
      <HelmetSwitch location={location.search} search={search} />
      <div className="logo">
        <h1 className="logo-title">FNDR</h1>
        <div className="options">
          <LocationSearch
            updateQuery={updateQuery}
            city={city}
            setSearch={setSearch}
          />
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
          <Oval color="#00BFFF" height={60} width={60} ariaLabel="loading" />
        </div>
      )}
      {agencies.length === 0 && !isLoading && (
        <div className="noResult">
          Sorry, <span className="logoSpan">FNDR</span> couldn't find a digital
          agency {companySize && `${renameCompSize(companySize)} employees`} in{" "}
          {city} 😞. Please try again!💪
          <br />
          <br />
          <Link to={`/?city=${city}`}>
            Click here to look for all agencies from {city}?
          </Link>
        </div>
      )}
    </div>
  );
}

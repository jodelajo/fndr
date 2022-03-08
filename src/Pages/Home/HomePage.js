import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../Home/HomePage.css";
import AgencyCard from "../../components/AgencyCard/AgencyCard";
import useCustomSearchParams from "../../hooks/useCustomSearchParams";
import { isEndOfPage, renameCompSize } from "../../utils/dataTransformations";
import { APIUrl } from "../../config/config";
import Header from "../../components/Header/Header";

const LIMIT = 18;

export default function HomePage() {
  const location = useLocation();
  const [search, setSearch] = useCustomSearchParams();
  // const [limit, setLimit] = useState(18);
  const [state, setState] = useState({
    page: 1,
    agencies: [],
    isLoading: true,
    hasMore: true,
  });

  const { page, agencies, isLoading } = state;
  const { city, company_size } = search;
  const fetchData = useCallback(async () => {
    let params = {
      per_page: LIMIT,
      page: page,
      city_like: city || null,
      size: company_size || null,
    };

    const response = await axios.get(`${APIUrl}/companies`, {
      params: params,
    });

    setState((prevState) => {
      return {
        ...prevState,
        agencies: [...prevState.agencies, ...response.data.items],
        isLoading: false,
        hasMore: response.data._meta.page < response.data._meta.total_pages,
      };
    });
  }, [page, city, company_size]);

  const handleScroll = useCallback(
    (e) => {
      if (isEndOfPage(e) && !isLoading && state.hasMore) {
        setState((prevState) => {
          return {
            ...prevState,
            page: prevState.page + 1,
            isLoading: true,
          };
        });
      }
    },
    [isLoading, state.hasMore]
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
      <div className="header">
        <Header
          updateQuery={updateQuery}
          city_name={city}
          setSearch={setSearch}
          company_size={company_size}
          location={location.search}
          search={search}
        />
      </div>
      <div className="mainWrapper">
        <div className="main-card">
          {agencies.map((agency) => {
            return (
              <div key={agency.company_id}>
                <AgencyCard agency={agency} />
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
            Sorry, <span className="logoSpan">FNDR</span> couldn't find a
            digital agency{" "}
            {company_size && `${renameCompSize(company_size)} employees`} in{" "}
            {city} 😞. Please try again!💪
            <br />
            <br />
            <Link to={`/?city=${city}`}>
              Click here to look for all agencies from {city}?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

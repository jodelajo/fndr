import React from "react";
import { useState, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import "../Pages/HomePage.css";
import Agencies from "../components/Agencies";

export default function HomePage() {
  const [agencies, setAgencies] = useState([]);
  const page = useRef(1);

  console.log("AGENCIES", agencies);
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8000/agencies?_limit=15&_page=${page.current}`
    );
    console.log("GETMY", response);

    const dataOfAgencies = response.data;
    setAgencies((oldData) => [...oldData, ...dataOfAgencies]);
    page.current = page.current + 1;
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
  }, []);

  return (
    <div className="general">
      <div className="logo">
        <h1>FNDR</h1>
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

import React from "react";
import { useState, useEffect } from "react";
import db from "../db (1).json";
import "../Pages/HomePage.css";
import Agencies from "../components/Agencies";

export default function HomePage() {
  const [agencies, setAgencies] = useState([]);

  const fetchData = () => {
    const response = db;
    setAgencies(response.agencies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="logo">
        <h1>FNDR</h1>
      </div>
      <div className="main-card">
        {agencies.map((agency) => {
          return (
            <div className="block">
              <Agencies agency={agency} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

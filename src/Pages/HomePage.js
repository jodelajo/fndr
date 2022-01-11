import React from "react";
import { useState, useEffect } from "react";
import db from "../db (1).json";
import axios from "axios";

export default function HomePage() {
  const [agencies, setAgencies] = useState([]);
  console.log("Show Agency", agencies);

  const fetchData = () => {
    const response = db;
    setAgencies(response.agencies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>FNDR</h1>;
      {agencies.map((agency) => {
        return (
          <div key={agency.id}>
            <h2>Company Name: {agency.name}</h2>
            <h5>Company Size: {agency.companySize}</h5>
            <h5>{agency.city}</h5>
            <h5>{agency.website}</h5>
          </div>
        );
      })}
    </div>
  );
}

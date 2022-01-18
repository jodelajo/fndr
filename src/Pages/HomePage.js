import React from "react";
import { useState, useEffect } from "react";
import db from "../db (1).json";
import { MdLocationCity, MdWebAsset, MdLocationOn } from "react-icons/md";
import "../Pages/HomePage.css";

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
      {agencies.map((agency) => {
        return (
          <div className="block">
            <div className="agency-card-container">
              <div className="company-logo">
                <img src={agency.eguideImageSrc} />
              </div>
              <div className="agency-card-info" key={agency.id}>
                <div className="company-name">
                  <h2>{agency.name}</h2>
                </div>
                <div className="company-info">
                  <div>
                    <h5>
                      <span>
                        <MdLocationCity />
                      </span>
                      {agency.companySize} Employees
                    </h5>
                  </div>
                  <div>
                    <h5>
                      <span>
                        <MdLocationOn />
                      </span>
                      {agency.city}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      <span>
                        <MdWebAsset />
                      </span>
                      <a href={agency.website}>web site</a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

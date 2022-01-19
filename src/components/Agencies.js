import React from "react";

import { MdLocationCity, MdWebAsset, MdLocationOn } from "react-icons/md";
import "./Agencies.css";

export default function Agencies({ agency }) {
  return (
    <div className="main-card">
      <div className="agency-card-container">
        <div className="company-logo">
          <img
            src={agency.eguideImageSrc}
            alt={`${agency.name} company logo`}
          />
        </div>
        <div className="agency-card-info" key={agency.id}>
          <div className="company-name">
            <h2>{agency.name}</h2>
          </div>
          <div className="company-info">
            <div>
              <h5>
                <span className="icon-gap">
                  <MdLocationCity />
                </span>
                {agency.companySize} Employees
              </h5>
            </div>
            <div>
              <h5>
                <span className="icon-gap">
                  <MdLocationOn />
                </span>
                {agency.city}
              </h5>
            </div>
            <div className="www-link">
              <h5>
                <span className="icon-gap">
                  <MdWebAsset />
                </span>
                <a href={agency.website} target="_blank" rel="noreferrer">
                  web site
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

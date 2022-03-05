import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  MdLocationCity,
  MdWebAsset,
  MdLocationOn,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import "./AgencyCard.css";
import { NavLink } from "react-router-dom";

export default function Agencies({ agency }) {
  const { userToken } = useContext(AuthContext);
  return (
    <div className="main-agencies">
      <div className="agency-card-container">
        <div className="company-logo">
          <img
            src={agency.logo_image_src}
            alt={`${agency.company_name} company logo`}
          />
        </div>
        <div className="agency-card-info" key={agency.company_id}>
          <div className="company-name">
            <h2>{agency.company_name.replace("&amp;", "&")}</h2>
          </div>
          <div className="right-block">
            <div className="company-info">
              <div>
                <h5>
                  <span className="icon-gap">
                    <MdLocationCity />
                  </span>
                  {agency.company_size} Employees
                </h5>
              </div>
              <div>
                <h5>
                  <span className="icon-gap">
                    <MdLocationOn />
                  </span>
                  {agency.city_name}
                </h5>
              </div>
              <div className="www-link">
                <h5>
                  <span className="icon-gap">
                    <MdWebAsset />
                  </span>
                  <a href={agency.website} target="_blank" rel="noreferrer">
                    website
                  </a>
                </h5>
              </div>
            </div>
            {userToken && userToken.error !== "Unauthorized" && (
              <div>
                <NavLink to="#">
                  <span className="edit">
                    <MdOutlineModeEditOutline />
                  </span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

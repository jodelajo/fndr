import React, { useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import PopUp from "../PopUp/PopUp";
import AgencyLogo from "./AgencyLogo";
import "./AgencyCard.css";
import AgencyCardInfo from "./AgencyCardInfo";

export default function AgencyCard({ agency }) {
  const { setSelectedAgency, selectedAgency, pop, setPop } =
    useContext(AgencyContext);

  const agencyHandler = () => {
    setSelectedAgency(agency);
    setPop(!pop);
  };

  return (
    <div className="main-agencies">
      {agency && (
        <div
          className={
            pop ? "agency-card-container-pop" : "agency-card-container"
          }
          onClick={agencyHandler}
        >
          <div className="company-logo">
            <AgencyLogo agency={agency} />
          </div>
          <AgencyCardInfo agency={agency} />
        </div>
      )}
      {selectedAgency &&
      selectedAgency.company_id === agency.company_id &&
      pop ? (
        <PopUp selectedAgency={selectedAgency} />
      ) : null}
    </div>
  );
}

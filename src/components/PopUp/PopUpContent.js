import { useState, useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import AgencyCardInfo from "../AgencyCard/AgencyCardInfo";
import AgencyLogo from "../AgencyCard/AgencyLogo";

export default function PopUpContent() {
  const [showDetails, setShowDetails] = useState(false);
  const { selectedAgency } = useContext(AgencyContext);
  return (
    <div className="pop-content">
      <div className="pop-card">
        <div className="pop-logo">
          <AgencyLogo agency={selectedAgency} />
        </div>
        <div className="pop-info">
          <AgencyCardInfo agency={selectedAgency} />
        </div>
      </div>
      <div className="show-details">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="details-button"
        >
          {showDetails ? (
            <h2>Hide Company Details </h2>
          ) : (
            <h2>Show Company Details</h2>
          )}
        </button>
        {showDetails && (
          <div className="pop-details">
            <div className="pop-region">
              <h3>Region</h3>
              <p>{selectedAgency.region}</p>
            </div>
            <div>
              <h3>Disciplines</h3>
              <ul>
                {selectedAgency.disciplines.map((dis) => (
                  <li key={dis}>{dis}</li>
                ))}
              </ul>
              <h3>Branches</h3>
              <ul>
                {selectedAgency.branches.map((branche) => (
                  <li key={branche}>{branche.replace("&amp;", "&")}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Tags</h3>
              <ul>
                {selectedAgency.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

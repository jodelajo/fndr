import { useState, useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import { AuthContext } from "../../context/AuthContext";
import { MdOutlineModeEditOutline, MdOutlineIosShare } from "react-icons/md";
import "./PopUp.css";
import AgencyCardInfo from "../AgencyCard/AgencyCardInfo";
import AgencyLogo from "../AgencyCard/AgencyLogo";
import EditForm from "../EditForm/EditForm";

export default function PopUp() {
  const { setPop, selectedAgency } = useContext(AgencyContext);
  const [showDetails, setShowDetails] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const { userToken } = useContext(AuthContext);

  // console.log("showDetails", showDetails);
  // console.log("edit form", editForm);

  return (
    <div className="modal">
      <div className="icons">
        {userToken && userToken.error !== "Unauthorized" && (
          <span className="pop-icon" onClick={() => setEditForm(!editForm)}>
            <MdOutlineModeEditOutline />
          </span>
        )}
        <span className="close-icon" onClick={() => setPop(false)}>
          x
        </span>
        <span className="share">
          <MdOutlineIosShare />
        </span>
      </div>

      <div className="modal_content">
        {!editForm ? (
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
        ) : (
          <div>
            <EditForm selectedAgency={selectedAgency} />
          </div>
        )}
      </div>
    </div>
  );
}

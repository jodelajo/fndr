import { MdLocationCity, MdWebAsset, MdLocationOn } from "react-icons/md";
import "./AgencyCardInfo";

export default function AgencyCardInfo({ agency }) {
  return (
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
      </div>
    </div>
  );
}

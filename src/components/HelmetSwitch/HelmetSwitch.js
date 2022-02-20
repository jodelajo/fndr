import HelmetSearch from "../Helmet/HelmetSearch";
import { renameCompSize } from "../../utils/dataTransformations";

export default function HelmetSwitch({ content, location, search }) {
  const renameSize = renameCompSize(search.companySize);
  const city = search.city;
  const companySize = search.companySize;

  function renderSwitch(content) {
    switch (content) {
      case "city":
        return (
          <HelmetSearch
            titleContent={`Location: ${city}`}
            descriptionContent={`Find your agency in ${city}?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "companySize":
        return (
          <HelmetSearch
            titleContent={`Company size: ${renameSize}`}
            descriptionContent={`Find your agency ${renameSize} employees?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "all":
        return (
          <HelmetSearch
            titleContent={`Location: ${city} ${renameSize} employees.`}
            descriptionContent={`Find your agency in ${city} ${renameSize} employees?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      default:
        return (
          <HelmetSearch
            titleContent="Filter on location and company size."
            descriptionContent="Find your Dutch digital agency on FNDR"
            URLContent="https://fndr.netlify.app/"
          />
        );
    }
  }

  return (
    <div>
      {(city && companySize && renderSwitch((content = "all"))) ||
        (city && !companySize && renderSwitch((content = "city"))) ||
        (companySize && !city && renderSwitch((content = "companySize"))) ||
        renderSwitch()}
    </div>
  );
}

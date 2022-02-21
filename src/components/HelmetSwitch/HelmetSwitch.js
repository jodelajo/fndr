import HelmetSearch from "../Helmet/HelmetSearch";
import { renameCompSize } from "../../utils/dataTransformations";

export default function HelmetSwitch({ location, search }) {
  const renameSize = renameCompSize(search.companySize);
  const city = search.city;
  const companySize = search.companySize;

  function renderSwitch(city, companySize) {
    switch (true) {
      case Boolean(city) && !companySize:
        return (
          <HelmetSearch
            titleContent={`Location: ${city}`}
            descriptionContent={`Find your agency in ${city}?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case Boolean(companySize) && !city:
        return (
          <HelmetSearch
            titleContent={`Company size: ${companySize}`}
            descriptionContent={`Find your agency ${renameSize} employees?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case Boolean(city) && Boolean(companySize):
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

  return renderSwitch(city, companySize);
}

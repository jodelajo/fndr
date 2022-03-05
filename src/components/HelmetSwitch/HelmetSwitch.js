import HelmetSearch from "../Helmet/HelmetSearch";
import { renameCompSize } from "../../utils/dataTransformations";

export default function HelmetSwitch({ location, search }) {
  const renameSize = renameCompSize(search.company_size);
  const city = search.city;
  const company_size = search.company_size;

  function renderSwitch(city, company_size) {
    switch (true) {
      case Boolean(city) && !company_size:
        return (
          <HelmetSearch
            titleContent={`Location: ${city}`}
            descriptionContent={`Find your agency in ${city}?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case Boolean(company_size) && !city:
        return (
          <HelmetSearch
            titleContent={`Company size: ${company_size}`}
            descriptionContent={`Find your agency ${renameSize} employees?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case Boolean(city) && Boolean(company_size):
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

  return renderSwitch(city, company_size);
}

import HelmetSearch from "../Helmet/HelmetSearch";

export default function HelmetSwitch({ content, location, search }) {
  function renderSwitch(content) {
    switch (content) {
      case "city":
        return (
          <HelmetSearch
            titleContent={`Location: ${search.city}`}
            descriptionContent={`Find your agency in ${search.city}?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "companySize":
        return (
          <HelmetSearch
            titleContent={`Company size: ${search.companySize}`}
            descriptionContent={`Find your agency with ${search.companySize} employees?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "all":
        return (
          <HelmetSearch
            titleContent={`Location: ${search.city} with ${search.companySize} employees.`}
            descriptionContent={`Find your agency in ${search.city} with ${search.companySize} employees?`}
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
      {(search.city && search.companySize && renderSwitch((content = "all"))) ||
        (search.city &&
          !search.companySize &&
          renderSwitch((content = "city"))) ||
        (search.companySize &&
          !search.city &&
          renderSwitch((content = "companySize"))) ||
        renderSwitch()}
    </div>
  );
}

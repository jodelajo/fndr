import HelmetSearch from "../Helmet/HelmetSearch";

export default function HelmetSwitch({ content, location, search }) {
  function renderSwitch(content) {
    switch (content) {
      case "city":
        return (
          <HelmetSearch
            titleContent={`Locatie: ${search.city}`}
            descriptionContent={`Zoek je een agency in ${search.city}?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "companySize":
        return (
          <HelmetSearch
            titleContent={`Grootte: ${search.companySize}`}
            descriptionContent={`Zoek je een agency met ${search.companySize} medewerkers?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "all":
        return (
          <HelmetSearch
            titleContent={`Locatie: ${search.city} met ${search.companySize} medewerkers.`}
            descriptionContent={`Zoek je een agency in ${search.city} met ${search.companySize} medewerkers?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      default:
        return (
          <HelmetSearch
            titleContent="Zoek op locatie en aantal medewerkers."
            descriptionContent="Zoek je een agency in de FNDR-app"
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

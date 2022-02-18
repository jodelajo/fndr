import HelmetSearch from "../Helmet/HelmetSearch";

export default function HelmetSwitch({ content, location, search }) {
  function renderSwitch(content) {
    switch (content) {
      case "city":
        return (
          <HelmetSearch
            titleContent={`locatie: ${search.city}`}
            descriptionContent={`Zoek je een agency in ${search.city}?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "companySize":
        return (
          <HelmetSearch
            titleContent={`grootte: ${search.companySize}`}
            descriptionContent={`Zoek je een agency met ${search.companySize} medewerkers?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "all":
        return (
          <HelmetSearch
            titleContent={`locatie: ${search.city} en grootte: ${search.companySize}`}
            descriptionContent={`Zoek je een agency in ${search.city} met ${search.companySize} medewerkers?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      default:
        return (
          <HelmetSearch
            titleContent="Zoek op locatie en bedrijfsgrootte"
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

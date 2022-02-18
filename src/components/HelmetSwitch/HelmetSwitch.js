import HelmetSearch from "../Helmet/HelmetSearch";

export default function HelmetSwitch({
  content,
  inputValue,
  location,
  companySize,
  search,
}) {
  function renderSwitch(content) {
    switch (content) {
      case "city":
        return (
          <HelmetSearch
            titleContent={`locatie: ${inputValue}`}
            descriptionContent={`Zoek je een agency in ${inputValue}?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "companySize":
        return (
          <HelmetSearch
            titleContent={`grootte: ${companySize}`}
            descriptionContent={`Zoek je een agency met ${companySize} medewerkers?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      case "all":
        return (
          <HelmetSearch
            titleContent={`locatie: ${inputValue} en grootte: ${companySize}`}
            descriptionContent={`Zoek je een agency in ${inputValue} met ${companySize} medewerkers?`}
            URLContent={`https://fndr.netlify.app/${location}`}
          />
        );
      default:
        return (
          <HelmetSearch
            title="FNDR - Vind je digital agency in de FNDR-app"
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

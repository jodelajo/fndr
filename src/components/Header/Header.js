import Filter from "../Filter/Filter";
import Logo from "../Logo/Logo";
import HelmetSwitch from "../HelmetSwitch/HelmetSwitch";

export default function Header({
  updateQuery,
  city,
  setSearch,
  companySize,
  location,
  search,
}) {
  return (
    <div>
      <HelmetSwitch location={location} search={search} />

      <div className="logo">
        <Logo />
        <div className="options">
          <Filter
            updateQuery={updateQuery}
            city={city}
            setSearch={setSearch}
            companySize={companySize}
          />
        </div>
      </div>
    </div>
  );
}

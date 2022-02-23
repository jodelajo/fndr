import Navbar from "../Navbar/Navbar";
import Filter from "../Filter/Filter";
import Logo from "../Logo/Logo";
import HelmetSwitch from "../HelmetSwitch/HelmetSwitch";
import "./Header.css";

export default function Header({
  updateQuery,
  city,
  setSearch,
  companySize,
  location,
  search,
}) {
  return (
    <div className="headerWrap">
      <HelmetSwitch location={location} search={search} />
      <Navbar />
      <div>
        <Logo />
        <div>
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

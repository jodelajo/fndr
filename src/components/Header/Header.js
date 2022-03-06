import Navbar from "../Navbar/Navbar";
import Filter from "../Filter/Filter";
import Logo from "../Logo/Logo";
import HelmetSwitch from "../HelmetSwitch/HelmetSwitch";
import "./Header.css";

export default function Header({
  updateQuery,
  city,
  setSearch,
  company_size,
  location,
  search,
}) {
  return (
    <div className="header">
      <HelmetSwitch location={location} search={search} />
      <Navbar />
      <div>
        <Logo />
        <div>
          <Filter
            updateQuery={updateQuery}
            city={city}
            setSearch={setSearch}
            company_size={company_size}
          />
        </div>
      </div>
    </div>
  );
}

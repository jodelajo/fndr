import LocationSearch from "../LocationSearch/LocationSearch";
import SizeFilter from "../SizeFilter/CompanySizeFilter";
import "./Filter.css";

export default function Filter({ updateQuery, city, company_size, setSearch }) {
  return (
    <div className="optionsFilter">
      <LocationSearch
        updateQuery={updateQuery}
        city={city}
        setSearch={setSearch}
      />
      <SizeFilter
        updateQuery={updateQuery}
        company_size={company_size}
        className="compSize"
      />
    </div>
  );
}

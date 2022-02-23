import LocationSearch from "../LocationSearch/LocationSearch";
import SizeFilter from "../SizeFilter/CompanySizeFilter";
import "./Filter.css";

export default function Filter({ updateQuery, city, companySize, setSearch }) {
  return (
    <div className="options">
      <LocationSearch
        updateQuery={updateQuery}
        city={city}
        setSearch={setSearch}
      />
      <SizeFilter updateQuery={updateQuery} companySize={companySize} />
    </div>
  );
}

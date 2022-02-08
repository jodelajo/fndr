import "./CompanySizeFilter.css";

export default function SizeFilter({ companySize, setCompanySize }) {
  const handleChange = (e) => {
    setCompanySize(e.target.value);
  };

  return (
    <div>
      <label htmlFor="size">
        <select
          id="size"
          value={companySize}
          onChange={handleChange}
          className="compSize"
        >
          <option value="">Selecteer company size</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-100">51-100</option>
          <option value="GT-100"> &gt; 100</option>
        </select>
      </label>
    </div>
  );
}

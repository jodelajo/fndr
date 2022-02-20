import "./CompanySizeFilter.css";

export default function SizeFilter({ companySize, updateQuery }) {
  const onChangeHandler = (e) => {
    updateQuery(e.target.name, e.target.value);
  };

  const companySizeHandler = () => {
    if (companySize === undefined) {
      return (companySize = "");
    }
  };

  return (
    <div>
      <label htmlFor="size">
        <select
          id="size"
          name="companySize"
          value={companySizeHandler(companySize)}
          onChange={onChangeHandler}
          className="compSize"
        >
          <option value="">Select company size</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-100">51-100</option>
          <option value="GT-100"> &gt; 100</option>
        </select>
      </label>
    </div>
  );
}

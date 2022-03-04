import "./CompanySizeFilter.css";

export default function SizeFilter({ company_size, updateQuery }) {
  const onChangeHandler = (e) => {
    updateQuery(e.target.name, e.target.value);
  };
  console.log("comp_size", company_size);
  const companySizeHandler = () => (company_size ? company_size : "");

  return (
    <div>
      <label htmlFor="size">
        <select
          id="size"
          name="company_size"
          value={companySizeHandler(company_size)}
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

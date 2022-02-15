import "./CompanySizeFilter.css";

export default function SizeFilter({
  companySize,
  updateQuery,
  setSearch,
  search,
}) {
  const onChangeHandler = (e) => {
    updateQuery(e.target.name, e.target.value);
    setSearch({ ...search, companySize: e.target.value });
  };

  return (
    <div>
      <label htmlFor="size">
        <select
          id="size"
          name="companySize"
          value={companySize}
          onChange={onChangeHandler}
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

export default function SizeDropDown({ value, onChange, className }) {
  console.log(value);

  return (
    <label htmlFor="size">
      <select
        id="size"
        name="company_size"
        value={value}
        onChange={onChange}
        className={className}
      >
        {className === "compSize" && (
          <option value="">Select company size</option>
        )}
        <option value="1-10">1-10</option>
        <option value="11-50">11-50</option>
        <option value="51-100">51-100</option>
        <option value="GT-100"> &gt; 100</option>
      </select>
    </label>
  );
}

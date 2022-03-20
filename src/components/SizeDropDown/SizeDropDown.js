import "./SizeDropDown.css";

export default function SizeDropDown({ onChange, className }) {
  return (
    <label htmlFor="size">
      <select
        id="size"
        type="text"
        onChange={onChange}
        className={className}
        placeholder="Select company size"
      >
        <option value="">Select company size</option>
        <option value="1-10">1-10</option>
        <option value="11-50">11-50</option>
        <option value="51-100">51-100</option>
        <option value="GT-100"> &gt; 100</option>
      </select>
    </label>
  );
}

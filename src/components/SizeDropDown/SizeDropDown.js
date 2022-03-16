// import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "./SizeDropDown.css";

export default function SizeDropDown({ value, onChange, className }) {
  const location = useLocation();
  // const { register } = useForm();

  return (
    <label htmlFor="size">
      <select
        id="size"
        name="company_size"
        type="text"
        value={value}
        onChange={onChange}
        className={className}
        placeholder="Select company size"
        // {...register("company_size")}
      >
        {className === "dropDown" || location === "/add-agency" || (
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

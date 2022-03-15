import "./CompanySizeFilter.css";
import SizeDropDown from "../SizeDropDown/SizeDropDown";

export default function SizeFilter({ company_size, updateQuery }) {
  const onChangeHandler = (e) => {
    updateQuery(e.target.name, e.target.value);
  };

  const companySizeHandler = () => (company_size ? company_size : "");

  return (
    <div>
      <SizeDropDown
        value={companySizeHandler(company_size)}
        onChange={onChangeHandler}
        className="compSize"
      />
    </div>
  );
}

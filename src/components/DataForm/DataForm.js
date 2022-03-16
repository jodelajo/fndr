import { useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import AgencyLogo from "../AgencyCard/AgencyLogo";
import CityList from "../CityList/CityList";
import SizeDropDown from "../SizeDropDown/SizeDropDown";
import SubmitButton from "../SubmitButton/SubmitButton";
// import { useForm } from "react-hook-form";

export default function DataForm({
  onChangeHandler,
  isLoading,
  buttonText,
  onSubmit,
}) {
  const { error, selectedAgency, state, pop } = useContext(AgencyContext);

  return (
    <div>
      <div className="edit-form-wrapper">
        {error && <p>{error}</p>}
        {pop && <AgencyLogo agency={selectedAgency} />}
        <form className="edit-form" onSubmit={onSubmit}>
          <input
            value={
              state.company_name
                ? state.company_name
                : selectedAgency.company_name
            }
            type="text"
            onChange={onChangeHandler}
            name="company_name"
            placeholder="Agency name"
            // {...register("company_name")}
            required
          />
          <input
            value={state.city_name ? state.city_name : selectedAgency.city_name}
            type="text"
            id="places"
            list="places"
            name="city_name"
            onChange={onChangeHandler}
            placeholder="City name"
            // {...register("city_name")}
            required
          />

          <CityList />

          <SizeDropDown
            value={
              state.company_size
                ? state.company_size
                : selectedAgency.company_size
            }
            onChange={onChangeHandler}
            className="dropDown"
            placeholder="Agency size"
            required
          />

          <input
            value={state.website ? state.website : selectedAgency.website}
            name="website"
            type="url"
            onChange={onChangeHandler}
            placeholder="website"
            // {...register("website")}
            required
          />
          <p>{error?.message}</p>
          <SubmitButton
            isLoading={isLoading}
            text={buttonText}
            color="lightblue"
          />
        </form>
      </div>
    </div>
  );
}

import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgencyContext } from "../../context/AgencyContext";
import AgencyLogo from "../AgencyCard/AgencyLogo";
// import CityList from "../CityList/CityList";
// import SizeDropDown from "../SizeDropDown/SizeDropDown";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function DataForm({
  isLoading,
  setIsLoading,
  buttonText,
  state,
  submitData,
  setState,
}) {
  const { error, selectedAgency, pop } = useContext(AgencyContext);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    company_name: yup.string().min(2).max(64),
    //   .required("Companyname is required"),
    // city_name: yup.string().min(2).max(64).required(),
    // company_size: yup.string().min(2).max(64).required(),
    // website: yup.string().url().max(255).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log(data);
    setState(data);
    submitUpdate(data);
  };

  const submitUpdate = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        await submitData(data);
      } catch (error) {
        console.log("submit error", error);
      }
      setIsLoading(false);
      reset();
      window.location.reload(false);
    },
    [reset, setIsLoading, submitData]
  );

  console.log("navigate", navigate);
  console.log("is loading", isLoading);
  console.log("state in dataform", state);
  return (
    <div>
      <div className="edit-form-wrapper">
        {error && <p>{error}</p>}
        {pop && <AgencyLogo agency={selectedAgency} />}
        <form className="edit-form" onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            type="text"
            defaultValue={
              state ? state.company_name : selectedAgency.company_name
            }
            placeholder="Agency name"
            {...register("company_name")}
          />
          {/* <input
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
          /> */}
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

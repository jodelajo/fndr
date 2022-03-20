import { useContext, useEffect } from "react";
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
  submitData,
}) {
  const { selectedAgency, pop, setSelectedAgency } = useContext(AgencyContext);

  const schema = yup.object().shape({
    company_name: yup.string().min(2).max(64),
    //   .required("Companyname is required"),
    // city_name: yup.string().min(2).max(64),
    // company_size: yup.string().min(2).max(64).required(),
    // website: yup.string().url().max(255).required(),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company_name: selectedAgency.company_name,
    },
  });

  const onSubmitHandler = async (data) => {
    // console.log(data);
    setIsLoading(true);
    try {
      await submitData(data);
      setSelectedAgency({ ...selectedAgency, ...data });
    } catch (error) {
      console.log("submit error", error);
    }
    setIsLoading(false);
    window.location.reload(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...getValues() });
    }
  }, [getValues, isSubmitSuccessful, reset]);

  // console.log("is submitted successful?", isSubmitSuccessful);
  // console.log("sel agency in dataform", selectedAgency);

  return (
    <div>
      <div className="edit-form-wrapper">
        {pop && <AgencyLogo agency={selectedAgency} />}
        <form className="edit-form" onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            type="text"
            placeholder="Agency name"
            {...register("company_name")}
          />
          <p>{errors.company_name?.message}</p>
          {/* <input
            // value={state.city_name ? state.city_name : selectedAgency.city_name}
            defaultValue={
              cityName ? cityName.city_name : selectedAgency.city_name
            }
            type="text"
            id="places"
            list="places"
            // name="city_name"
            // onChange={onChangeHandler}
            placeholder="City name"
            {...register("city_name")}
            // required
          />

          <CityList id="places" /> */}

          {/* <SizeDropDown
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

import { useContext, useEffect, useState } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import AgencyLogo from "../AgencyCard/AgencyLogo";
import CityList from "../CityList/CityList";
import SizeDropDown from "../SizeDropDown/SizeDropDown";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function DataForm({ buttonText, submitData }) {
  const { selectedAgency, pop, setSelectedAgency } = useContext(AgencyContext);
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object().shape({
    company_name: yup.string().min(2).max(64),
    // .required("Companyname is required"),
    city_name: yup.string().min(2).max(64),
    company_size: yup.mixed().oneOf(["1-10", "11-50", "51-100", "GT-100"]),

    website: yup.string().url().max(255),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      company_name: selectedAgency.company_name,
      city_name: selectedAgency.city_name,
      company_size: selectedAgency.company_size,
      website: selectedAgency.website,
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

  console.log("sel agency in dataform", selectedAgency);

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
          <input
            type="text"
            id="places"
            list="places"
            placeholder="City name"
            {...register("city_name")}
            // required
          />

          <CityList id="places" />

          <SizeDropDown
            className="dropDown"
            placeholder="Agency size"
            onChange={(e) => setValue("company_size", e.target.value)}
            // required
          />

          <input
            type="url"
            placeholder="website"
            {...register("website")}
            required
          />

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

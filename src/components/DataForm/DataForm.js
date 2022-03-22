import { useContext, useEffect, useState } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import AgencyLogo from "../AgencyCard/AgencyLogo";
import CityList from "../CityList/CityList";
import { APIUrl } from "../../config/config";
import SizeDropDown from "../SizeDropDown/SizeDropDown";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./DataForm.css";

export default function DataForm({ buttonText, submitData }) {
  const { selectedAgency, pop, setPop, state, setState, setSelectedAgency } =
    useContext(AgencyContext);
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object().shape({
    company_name: yup
      .string()
      .min(2)
      .max(64)
      .required("Company name is required"),
    city_name: yup.string().min(2).max(64).required("City name is required"),
    company_size: yup
      .mixed()
      .oneOf(["1-10", "11-50", "51-100", "GT-100"])
      .required("Company size is required"),

    website: yup.string().url().max(255).required("Website is required"),
    logo_image_src: yup.string().url().max(255).required("Logo is required"),
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
      company_name: selectedAgency?.company_name,
      city_name: selectedAgency?.city_name,
      company_size: selectedAgency?.company_size,
      website: selectedAgency?.website,
      logo_image_src: selectedAgency?.logo_image_src,
    },
  });

  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    console.log("data in dataform", data);
    try {
      await submitData(data);
      setSelectedAgency({ ...selectedAgency, ...data });
    } catch (error) {
      console.log("submit error", error);
    }
    setIsLoading(false);
    // window.location.reload(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...getValues() });
      setState({ ...state, selectedAgencyId: "" });
      setPop(false);
    }
  }, [getValues, isSubmitSuccessful, reset, setPop, setState, state]);

  console.log("sel agency in dataform", selectedAgency);
  // console.log("state in dataform", state);

  return (
    <div>
      <div className="edit-form-wrapper">
        {pop && <AgencyLogo agency={selectedAgency} />}
        <form className="edit-form" onSubmit={handleSubmit(onSubmitHandler)}>
          <label htmlFor="name">Company name</label>
          <input
            id="name"
            type="text"
            placeholder="Agency name"
            {...register("company_name")}
            required
          />
          <p>{errors.company_name?.message}</p>
          <label htmlFor="places">City name</label>
          <input
            type="text"
            id="places"
            list="places"
            placeholder="City name"
            {...register("city_name")}
            required
          />
          <p>{errors.city_name?.message}</p>
          <CityList id="places" />
          <label htmlFor="size">Company size</label>
          <SizeDropDown
            className="dropDown"
            placeholder="Agency size"
            required
            register={register}
            name="company_size"
            id="size"
          />
          <p>{errors.company_size?.message}</p>

          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            placeholder="website"
            {...register("website")}
            required
          />
          <p>{errors.website?.message}</p>

          <label htmlFor="logo">Logo</label>
          <input
            type="url"
            placeholder="Agency logo"
            {...register("logo_image_src")}
            required
          />
          <p>{errors.logo_image_url?.message}</p>

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

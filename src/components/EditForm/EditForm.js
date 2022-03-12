import { useState, useContext } from "react";
import axios from "axios";
import { APIUrl } from "../../config/config";
import { AgencyContext } from "../../context/AgencyContext";
import AgencyLogo from "../AgencyCard/AgencyLogo";
import SizeDropDown from "../SizeDropDown/SizeDropDown";
import CityList from "../CityList/CityList";
import { convertLocationObjectToArray } from "../../utils/dataTransformations";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./EditForm.css";

export default function EditForm() {
  const { cityList, selectedAgency } = useContext(AgencyContext);
  const [formError, setFormError] = useState(null);
  const [state, setState] = useState({
    name: selectedAgency.company_name,
    city: selectedAgency.city_name,
    size: selectedAgency.company_size,
    url: selectedAgency.website,
  });

  const { name, city, size, url } = state;

  const [isLoading, setIsLoading] = useState();
  console.log("sel agency form", selectedAgency);
  console.log(size);
  console.log("state", state);

  const locationsArray = convertLocationObjectToArray(cityList);

  const submit = async () => {
    try {
      const response = await axios.patch(
        `${APIUrl}/companies/${selectedAgency.company_id}`,
        {
          company_name: name,
          city_name: city,
          company_size: size,
          website: url,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const content = response.data;
      console.log("content", content);
    } catch (error) {
      console.error(error);
    }
  };

  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submit(state);
    } catch (error) {
      setFormError(error.message);
    }
    setIsLoading(false);
    window.location.reload(false);
  }

  return (
    <div className="edit-form-wrapper">
      <AgencyLogo agency={selectedAgency} />
      <form className="edit-form" onSubmit={submitLogin}>
        <input
          defaultValue={name}
          //   value={name}
          type="text"
          //   {...register("company_name")}
          required
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <input
          defaultValue={city}
          type="text"
          id="places"
          list="places"
          //   {...register("city_name")}
          required
          onChange={(e) => setState({ ...state, city: e.target.value })}
        />

        <CityList locationsArray={locationsArray} id="places" />
        <SizeDropDown
          value={size}
          onChange={(e) => setState({ ...state, size: e.target.value })}
          className="dropDown"
        />

        <input
          defaultValue={url}
          type="url"
          //   {...register("website")}
          required
          onChange={(e) => setState({ ...state, url: e.target.value })}
        />
        {/* <p>{errors?.message}</p> */}
        <SubmitButton
          isLoading={isLoading}
          text="Edit an Agency"
          type="submit"
        />
      </form>
      <p>{formError}</p>
    </div>
  );
}

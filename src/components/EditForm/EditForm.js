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
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    company_name: selectedAgency.company_name,
    city_name: selectedAgency.city_name,
    company_size: selectedAgency.company_size,
    website: selectedAgency.website,
  });
  const [patchState, setPatchState] = useState({});

  const { company_name, city_name, company_size, website } = state;

  const [isLoading, setIsLoading] = useState();

  const locationsArray = convertLocationObjectToArray(cityList);

  async function patch() {
    try {
      const response = await axios.patch(
        `${APIUrl}/companies/${selectedAgency.company_id}`,
        patchState,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setState((prevState) => {
        return {
          ...response.data,
          ...prevState,
          ...patchState,
        };
      });
    } catch (e) {
      if (e.request.status === 401) {
        const message = JSON.parse(e.request.response).message;
        setError(message);
        throw new Error(message);
      } else {
        throw new Error(
          "Something went wrong, please visit https://github.com/jodelajo/fndr/issues, and let me know!"
        );
      }
    }
  }

  function onChangeHandler(e) {
    const value = e.target.value;
    setPatchState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  }

  async function submitUpdate(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await patch(patchState);
    } catch (error) {
      console.log("submit error", error);
    }
    setIsLoading(false);
    window.location.reload(false);
  }

  return (
    <div className="edit-form-wrapper">
      {error && <p>{error}</p>}
      <AgencyLogo agency={selectedAgency} />
      <form className="edit-form" onSubmit={submitUpdate}>
        <input
          value={
            patchState.company_name ? patchState.company_name : company_name
          }
          type="text"
          onChange={onChangeHandler}
          name="company_name"
        />
        <input
          value={patchState.city_name ? patchState.city_name : city_name}
          type="text"
          id="places"
          list="places"
          name="city_name"
          onChange={onChangeHandler}
        />

        <CityList locationsArray={locationsArray} id="places" />

        <SizeDropDown
          value={
            patchState.company_size ? patchState.company_size : company_size
          }
          onChange={onChangeHandler}
          className="dropDown"
        />

        <input
          value={patchState.website ? patchState.website : website}
          name="website"
          type="url"
          onChange={onChangeHandler}
        />
        <SubmitButton
          isLoading={isLoading}
          text="Edit an Agency"
          color="lightblue"
        />
      </form>
    </div>
  );
}

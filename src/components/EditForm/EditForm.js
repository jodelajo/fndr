import { useState, useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import AgencyLogo from "../AgencyCard/AgencyLogo";
import SizeDropDown from "../SizeDropDown/SizeDropDown";
import CityList from "../CityList/CityList";
import { convertLocationObjectToArray } from "../../utils/dataTransformations";

import "./EditForm.css";

export default function EditForm({ selectedAgency }) {
  const { cityList } = useContext(AgencyContext);
  const [name, setName] = useState(selectedAgency.company_name);
  const [city, setCity] = useState(selectedAgency.city_name);
  const [size, setSize] = useState(selectedAgency.company_size);
  const [url, setUrl] = useState(selectedAgency.website);
  const [isLoading, setIsLoading] = useState();
  console.log("sel agency form", selectedAgency);
  console.log(name);

  const locationsArray = convertLocationObjectToArray(cityList);

  console.log("loca aray edit form", locationsArray);

  function submit() {}
  return (
    <div className="edit-form-wrapper">
      <AgencyLogo agency={selectedAgency} />
      <form className="edit-form" onSubmit={submit}>
        <input
          defaultValue={name}
          //   value={name}
          type="text"
          //   {...register("company_name")}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          defaultValue={city}
          type="text"
          id="places"
          list="places"
          //   {...register("city_name")}
          required
          onChange={(e) => setCity(e.target.value)}
        />

        <CityList locationsArray={locationsArray} id="places" />
        <SizeDropDown
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="dropDown"
        />

        {/* <input
          defaultValue={size}
          type="text"
          //   {...register("company_size")}
          required
          onChange={(e) => setSize(e.target.value)}
        /> */}
        <input
          defaultValue={url}
          type="url"
          //   {...register("website")}
          required
          onChange={(e) => setUrl(e.target.value)}
        />
        {/* <p>{errors?.message}</p> */}
        <button type="submit">Edit an Agency</button>
      </form>
    </div>
  );
}

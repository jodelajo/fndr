import React, { useEffect, useState, useMemo } from "react";
import { convertLocationObjectToArray } from "../../utils/dataTransformations";
import "./LocationSearch.css";
import { APIUrl } from "../../config/config";
import debounce from "lodash.debounce";
import ResetButton from "../ResetButton/ResetButton";

export default function LocationSearch({
  updateQuery,
  search,
  setSearch,
  city,
  companySize,
}) {
  const [locations, setLocations] = useState({});
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState(
    city ? `${city}` : "",
    companySize ? `${companySize}` : ""
  );

  useEffect(() => {
    fetch(`${APIUrl}/cities`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Data ophalen is mislukt");
        }
        return res.json();
      })
      .then((data) => {
        setLocations(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const locationsArray = convertLocationObjectToArray(locations);

  const debouncedChangeHandler = useMemo(
    () => debounce(updateQuery, 400),
    [updateQuery]
  );
  const debouncedSearchHandler = useMemo(
    () => debounce(setSearch, 400),
    [setSearch]
  );
  const onChange = (e) => {
    setInputValue(e.target.value);
    debouncedChangeHandler(e.target.name, e.target.value);
    debouncedSearchHandler({ ...search, city: e.target.value });
  };

  const resetInputField = (event) => {
    event.preventDefault();
    const EMPTY_STRING = "";
    setInputValue(EMPTY_STRING);
    updateQuery("city", EMPTY_STRING);
    setSearch({});
  };

  return (
    <form className="searchbar">
      <input
        id="city"
        name="city"
        type="text"
        placeholder="Zoek op locatie..."
        onChange={onChange}
        list="places"
        autoComplete="off"
        className="inputField"
        value={inputValue}
      />
      {locations && (
        <datalist id="places">
          {locationsArray &&
            locationsArray.map((loc) => {
              const cityName = Object.keys(loc)[0];
              const agencyCount = Object.values(loc)[0];
              return (
                <option key={cityName} value={cityName}>
                  {cityName} - {agencyCount}
                </option>
              );
            })}
        </datalist>
      )}
      <ResetButton resetInputField={resetInputField} />
      {error && <div>{error}</div>}
    </form>
  );
}

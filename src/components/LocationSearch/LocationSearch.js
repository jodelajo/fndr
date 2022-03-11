import React, { useEffect, useState, useMemo } from "react";
import { convertLocationObjectToArray } from "../../utils/dataTransformations";
import "./LocationSearch.css";
import { APIUrl } from "../../config/config";
import debounce from "lodash.debounce";
import ResetButton from "../ResetButton/ResetButton";

export default function LocationSearch({ updateQuery, setSearch, city }) {
  const [locations, setLocations] = useState({});
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState(city ? `${city}` : "");

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

  const debouncedUpdateQuery = useMemo(
    () => debounce(updateQuery, 1200),
    [updateQuery]
  );

  const onInput = (e) => {
    setInputValue(e.target.value);

    const typeAheadInput = e.nativeEvent.inputType !== undefined;
    if (typeAheadInput) {
      debouncedUpdateQuery(e.target.name, e.target.value);
    } else {
      updateQuery(e.target.name, e.target.value);
    }
  };

  const resetInputField = (event) => {
    event.preventDefault();
    const EMPTY_STRING = "";
    setInputValue(EMPTY_STRING);
    updateQuery("city", EMPTY_STRING);
    setSearch({});
  };
  return (
    <div>
      <form className="searchbar">
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Enter a location..."
          onInput={onInput}
          list="places"
          autoComplete="off"
          className="inputField"
          value={inputValue}
        />
        {locations && (
          <datalist id="places">
            {locationsArray &&
              locationsArray.map((loc) => {
                const cityName = Object.values(loc)[0];
                const agencyCount = Object.values(loc)[0];
                return (
                  <option key={cityName[0]} value={cityName[0]}>
                    {cityName[0]} - {agencyCount[1]}
                  </option>
                );
              })}
          </datalist>
        )}
        <ResetButton resetInputField={resetInputField} />
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

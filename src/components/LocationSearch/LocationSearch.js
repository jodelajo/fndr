import React, { useEffect, useState, useMemo, useContext } from "react";
import "./LocationSearch.css";
import { APIUrl } from "../../config/config";
import debounce from "lodash.debounce";
import ResetButton from "../ResetButton/ResetButton";
import CityList from "../CityList/CityList";
import { AgencyContext } from "../../context/AgencyContext";

export default function LocationSearch({ updateQuery, setSearch, city }) {
  const { cityList, setCityList } = useContext(AgencyContext);
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
        setCityList(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [setCityList]);

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
        {cityList && <CityList />}
        <ResetButton resetInputField={resetInputField} />
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

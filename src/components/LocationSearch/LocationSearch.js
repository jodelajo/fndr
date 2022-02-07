import React, { useEffect, useState } from "react";
import { convertLocationObjectToArray } from "../../utils/dataTransformations";
import "./LocationSearch.css";
import { APIUrl } from "../../config/config";

export default function LocationSearch({ setSearchInput, searchInput }) {
  const [locations, setLocations] = useState({});
  const [error, setError] = useState(null);

  const searchLocation = (searchInput) => {
    setSearchInput(searchInput);
  };

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

  return (
    <form className="searchbar">
      <input
        id="city"
        name="city"
        type="text"
        placeholder="Zoek op locatie..."
        onChange={(e) => searchLocation(e.target.value)}
        list="places"
        autoComplete="off"
        className="inputField"
        value={searchInput}
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
      <button
        onClick={(e) => {
          searchLocation("");
          e.preventDefault();
        }}
        className="resetButton"
      >
        Clear
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

import React, { useEffect, useState } from "react";
import "./LocationSearch.css";

export default function LocationSearch({ setSearchInput }) {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  const searchLocation = (searchInput) => {
    setSearchInput(searchInput);
  };

  useEffect(() => {
    fetch("http://localhost:8000/cities")
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

  const locationsArray =
    locations &&
    Object.keys(locations).map((name) => {
      const obj = {};
      obj[name] = locations[name];
      return obj;
    });
  console.log(locationsArray);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <form className="searchbar">
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Zoek op locatie..."
          onChange={(e) => searchLocation(e.target.value)}
          list="places"
          pattern={locationsArray}
          autoComplete="off"
          className="inputField"
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
        <button onClick={refreshPage} className="resetButton">
          Clear
        </button>
      </form>
    </div>
  );
}

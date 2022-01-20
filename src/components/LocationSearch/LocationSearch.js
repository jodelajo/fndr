import React, { useEffect, useState } from "react";

export default function LocationSearch() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [searchInput, setSearchInput] = useState("");

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
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  console.log(locations);
  console.log(searchInput);
  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      Zoek op locatie
      <input
        placeholder="Zoek op locatie"
        onChange={(e) => searchLocation(e.target.value)}
      />
      <button>ga</button>
    </div>
  );
}

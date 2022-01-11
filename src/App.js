import React, { useEffect, useState } from "react";
import AgencyList from "./components/AgencyList";

function App() {
  const [agencies, setAgencies] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/agencies")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAgencies(data);
      });
  }, []);
  return (
    <div>
      {agencies && <AgencyList agencies={agencies} title="All Agencies!" />}
    </div>
  );
}

export default App;

import React from "react";

export default function AgencyList({ agencies, title }) {
  return (
    <div>
      <h2>{title}</h2>
      {agencies &&
        agencies.map((agency) => (
          <div key={agency.id}>
            <p>{agency.name}</p>
          </div>
        ))}
    </div>
  );
}

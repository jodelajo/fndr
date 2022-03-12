export default function CityList({ locationsArray, id }) {
  return (
    <datalist id={id}>
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
  );
}

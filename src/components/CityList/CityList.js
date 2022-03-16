import { useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import { convertLocationObjectToArray } from "../../utils/dataTransformations";

export default function CityList() {
  const { cityList } = useContext(AgencyContext);
  const locationsArray = convertLocationObjectToArray(cityList);
  return (
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
  );
}

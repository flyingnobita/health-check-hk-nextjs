import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { filterHospitals } from "./indexHelper";

function toDisableLocation(processedPlansRecords, planTypes, locations) {
  let filtered = filterHospitals(
    processedPlansRecords,
    planTypes,
    [],
    locations
  );

  filtered = filtered.filter(function (record) {
    return [locations].includes(record["Location"]);
  });

  if (filtered.length === 0) {
    return true;
  } else {
    return false;
  }
}

export default function LocationToggleButtonGroup({
  locations,
  handleLocation,
  language,
  planTypes,
  processedPlansRecords,
}) {
  return (
    <ToggleButtonGroup
      value={locations}
      exclusive
      onChange={handleLocation}
      aria-label="locations"
    >
      <ToggleButton
        value="hkIsland"
        aria-label="hkIsland"
        className="filter-selection"
        disabled={toDisableLocation(
          processedPlansRecords,
          planTypes,
          "hkIsland"
        )}
      >
        {language === "en" ? "HK ISLAND" : "港島"}
      </ToggleButton>
      <ToggleButton
        value="kowloon"
        aria-label="kowloon"
        className="filter-selection"
        disabled={toDisableLocation(
          processedPlansRecords,
          planTypes,
          "kowloon"
        )}
      >
        {language === "en" ? "KOWLOON" : "九龍"}
      </ToggleButton>
      <ToggleButton
        value="newTerritories"
        aria-label="newTerritories"
        className="filter-selection"
        disabled={toDisableLocation(
          processedPlansRecords,
          planTypes,
          "newTerritories"
        )}
      >
        {language === "en" ? "NT" : "新界"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

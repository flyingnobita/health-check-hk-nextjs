import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { filterHospitals } from "./indexHelper";

function toDisableLocation(
  processedPlansRecords,
  planTypes,
  locations,
  prices
) {
  let filtered = filterHospitals(
    processedPlansRecords,
    planTypes,
    [],
    locations,
    prices
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
  prices,
  processedPlansRecords,
  superWideScreen,
}) {
  return (
    <ToggleButtonGroup
      value={locations}
      exclusive
      onChange={handleLocation}
      aria-label="locations"
      size={superWideScreen ? "medium" : "small"}
    >
      <ToggleButton
        value="hkIsland"
        aria-label="hkIsland"
        className="filter-selection"
        disabled={toDisableLocation(
          processedPlansRecords,
          planTypes,
          "hkIsland",
          prices
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
          "kowloon",
          prices
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
          "newTerritories",
          prices
        )}
      >
        {language === "en" ? "NT" : "新界"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

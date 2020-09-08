import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { filterHospitals } from "./indexHelper";

function getLocationList(filtered) {
  let filteredLocationsList = [];
  if (filtered.length > 0) {
    filteredLocationsList = [
      ...new Set(filtered.map((item) => item["Location"])),
    ];
    filteredLocationsList.sort();
  } else {
    filteredLocationsList = [];
  }
  return filteredLocationsList;
}

export default function LocationSelect({
  locations,
  handleLocationSelect,
  language,
  planTypes,
  genders,
  processedPlansRecords,
}) {
  if (
    processedPlansRecords === undefined ||
    processedPlansRecords.length === 0
  ) {
    return null;
  } else {
    let filtered = filterHospitals(
      processedPlansRecords,
      planTypes,
      genders,
      []
    );
    const filteredLocationsList = getLocationList(filtered);

    return (
      <Select
        labelId="select-location-label"
        id="select-location"
        value={locations}
        onChange={handleLocationSelect}
        disabled={filteredLocationsList.length < 1}
      >
        {filteredLocationsList.map((location) => {
          if (location === "hkIsland") {
            return (
              <MenuItem key={location} value={location}>
                {language === "en" ? "HK ISLAND" : "港島"}
              </MenuItem>
            );
          } else if (location === "kowloon") {
            return (
              <MenuItem key={location} value={location}>
                {language === "en" ? "KOWLOON" : "九龍"}
              </MenuItem>
            );
          } else {
            return (
              <MenuItem key={location} value={location}>
                {language === "en" ? "NT" : "新界"}
              </MenuItem>
            );
          }
        })}
      </Select>
    );
  }
}

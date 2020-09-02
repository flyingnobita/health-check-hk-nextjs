import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

function toDisableLocation(hospitalLocationMap, planType, locations) {
  const locationList = hospitalLocationMap.get(planType);
  return !locationList.includes(locations);
}

export default function LocationToggleButtonGroup({
  locations,
  handleLocation,
  language,
  planTypes,
  hospitalLocationMap,
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
        // color="primary"
        className="filter-selection"
        disabled={toDisableLocation(hospitalLocationMap, planTypes, "hkIsland")}
      >
        {language === "en" ? "HK ISLAND" : "港島"}
      </ToggleButton>
      <ToggleButton
        value="kowloon"
        aria-label="kowloon"
        // color="primary"
        className="filter-selection"
        disabled={toDisableLocation(hospitalLocationMap, planTypes, "kowloon")}
      >
        {language === "en" ? "KOWLOON" : "九龍"}
      </ToggleButton>
      <ToggleButton
        value="newTerritories"
        aria-label="newTerritories"
        // color="primary"
        className="filter-selection"
        disabled={toDisableLocation(
          hospitalLocationMap,
          planTypes,
          "newTerritories"
        )}
      >
        {language === "en" ? "NT" : "新界"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

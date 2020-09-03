import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

function toDisableLocation(hospitalLocationMap, planTypes, locations) {
  const locationList = hospitalLocationMap.get(planTypes);
  if (locationList) {
    return !(locations in locationList);
  } else return true;
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
        className="filter-selection"
        disabled={toDisableLocation(hospitalLocationMap, planTypes, "hkIsland")}
      >
        {language === "en" ? "HK ISLAND" : "港島"}
      </ToggleButton>
      <ToggleButton
        value="kowloon"
        aria-label="kowloon"
        className="filter-selection"
        disabled={toDisableLocation(hospitalLocationMap, planTypes, "kowloon")}
      >
        {language === "en" ? "KOWLOON" : "九龍"}
      </ToggleButton>
      <ToggleButton
        value="newTerritories"
        aria-label="newTerritories"
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

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export default function LocationToggleButtonGroup({
  locations,
  handleLocation,
  language,
  planTypes,
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
      >
        {language === "en" ? "HK ISLAND" : "港島"}
      </ToggleButton>
      <ToggleButton
        value="kowloon"
        aria-label="kowloon"
        // color="primary"
        className="filter-selection"
        disabled={planTypes === "Child"}
      >
        {language === "en" ? "KOWLOON" : "九龍"}
      </ToggleButton>
      <ToggleButton
        value="newTerritories"
        aria-label="newTerritories"
        // color="primary"
        className="filter-selection"
        disabled={planTypes === "Child"}
      >
        {language === "en" ? "NT" : "新界"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

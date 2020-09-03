import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default function LocationSelect({
  locations,
  handleLocationSelect,
  language,
  planTypes,
  hospitalLocationMap,
}) {
  const locationList = hospitalLocationMap.get(planTypes);
  return (
    <Select
      labelId="select-location-label"
      id="select-location"
      value={locations}
      onChange={handleLocationSelect}
      disabled={Object.keys(locationList).length <= 1}
    >
      {Object.keys(locationList)
        .sort()
        .map((location) => {
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

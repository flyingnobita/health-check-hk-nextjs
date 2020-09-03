import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import GenderSelect from "./GenderSelect";
import GenderToggleButtonGroup from "./GenderToggleButtonGroup";
import HospitalSelect from "./HospitalSelect";
import HospitalToggleButtonGroup from "./HospitalToggleButtonGroup";
import LocationSelect from "./LocationSelect";
import LocationToggleButtonGroup from "./LocationToggleButtonGroup";
import PriceSelector from "./PriceSelector";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  searchBarIcon: {
    color: theme.palette.primary.dark,
  },
  mobileGridContainer: {
    paddingBottom: "16px",
  },
}));

export default function FilterUI({
  wideScreen,
  language,
  hospitals,
  handleHospital,
  handleHospitalSelect,
  locations,
  handleLocation,
  handleLocationSelect,
  genders,
  handleGender,
  handleGenderSelect,
  planTypes,
  handlePlanType,
  handlePlanTypeSelect,
  prices,
  handlePrice,
  searchTerm,
  handleSearch,
  hospitalInfo,
  hospitalLocationMap,
}) {
  const classes = useStyles();

  if (wideScreen) {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Box border={0} borderRadius={10}>
            <Grid container justify="space-around">
              <Grid
                item
                className={`${classes.buttonGroup} filter-button-group`}
              >
                <ToggleButtonGroup
                  value={planTypes}
                  exclusive
                  onChange={handlePlanType}
                  aria-label="planTypes"
                >
                  <ToggleButton
                    value="General"
                    aria-label="general"
                    className="filter-selection"
                  >
                    {language === "en" ? "GENERAL" : "一般"}
                  </ToggleButton>
                  <ToggleButton
                    value="Child"
                    aria-label="child"
                    className="filter-selection"
                  >
                    {language === "en" ? "CHILD" : "兒童"}
                  </ToggleButton>
                  <ToggleButton
                    value="Domestic Helper"
                    aria-label="child"
                    className="filter-selection"
                  >
                    {language === "en" ? "DOMESTIC HELPER" : "家庭傭工"}
                  </ToggleButton>
                  <ToggleButton
                    value="Pre-employment"
                    aria-label="both"
                    className="filter-selection"
                  >
                    {language === "en" ? "PRE-EMPLOYMENT" : "入職前"}
                  </ToggleButton>
                  <ToggleButton
                    value="Pre-marital"
                    aria-label="pre-marital"
                    className="filter-selection"
                  >
                    {language === "en" ? "PRE-MARITAL" : "婚前"}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item className={classes.buttonGroup}>
                <GenderToggleButtonGroup
                  genders={genders}
                  handleGender={handleGender}
                  language={language}
                  planTypes={planTypes}
                />
              </Grid>

              <Grid item className={classes.buttonGroup}>
                <LocationToggleButtonGroup
                  locations={locations}
                  handleLocation={handleLocation}
                  language={language}
                  planTypes={planTypes}
                  hospitalLocationMap={hospitalLocationMap}
                />
              </Grid>

              <HospitalToggleButtonGroup
                language={language}
                locations={locations}
                hospitals={hospitals}
                handleHospital={handleHospital}
                hospitalInfo={hospitalInfo}
                planTypes={planTypes}
              />

              <Grid item className={classes.buttonGroup}>
                <PriceSelector
                  prices={prices}
                  handlePrice={handlePrice}
                  planTypes={planTypes}
                />
              </Grid>

              <SearchBar
                language={language}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                wideScreen={wideScreen}
              />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    );
  } else {
    return (
      <Grid container className={classes.mobileGridContainer}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Grid container justify="space-around" alignItems="center">
            <Grid item>
              <Select
                labelId="select-plan-type-label"
                id="select-plan-type"
                value={planTypes}
                onChange={handlePlanTypeSelect}
              >
                <MenuItem value={"General"}>
                  {language === "en" ? "GENERAL" : "一般"}
                </MenuItem>
                <MenuItem value={"Child"}>
                  {language === "en" ? "CHILD" : "兒童"}
                </MenuItem>
                <MenuItem value={"Domestic Helper"}>
                  {language === "en" ? "DOMESTIC HELPER" : "家庭傭工"}
                </MenuItem>
                <MenuItem value={"Pre-employment"}>
                  {language === "en" ? "PRE-EMPLOYMENT" : "入職前"}
                </MenuItem>
                <MenuItem value={"Pre-marital"}>
                  {language === "en" ? "PRE-MARITAL" : "婚前"}
                </MenuItem>
              </Select>
            </Grid>

            <Grid item>
              <GenderSelect
                genders={genders}
                handleGenderSelect={handleGenderSelect}
                language={language}
                planTypes={planTypes}
              />
            </Grid>

            <Grid item>
              <LocationSelect
                locations={locations}
                handleLocationSelect={handleLocationSelect}
                language={language}
                planTypes={planTypes}
                hospitalLocationMap={hospitalLocationMap}
              />
            </Grid>

            <HospitalSelect
              language={language}
              locations={locations}
              hospitals={hospitals}
              handleHospitalSelect={handleHospitalSelect}
              hospitalInfo={hospitalInfo}
              planTypes={planTypes}
              hospitalLocationMap={hospitalLocationMap}
            />

            <Grid item className={classes.buttonGroup} xs={12} align="center">
              <PriceSelector
                prices={prices}
                handlePrice={handlePrice}
                planTypes={planTypes}
              />
            </Grid>

            <SearchBar
              language={language}
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              wideScreen={wideScreen}
            />
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    );
  }
}

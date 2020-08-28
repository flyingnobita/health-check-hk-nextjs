import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import HospitalButtons from "./hospitalButtons";
import MenuItem from "@material-ui/core/MenuItem";
import { PriceSelector } from "./PriceSelector";
import PropTypes from "prop-types";
import React from "react";
import { SearchBar } from "./SearchBar";
import Select from "@material-ui/core/Select";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 10000,
    label: "$10k",
  },
  {
    value: 20000,
    label: "$20k",
  },
  {
    value: 30000,
    label: "$30k",
  },
];

export function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.object.isRequired,
};

const useStyles = makeStyles({
  sliderTypography: {
    width: 200,
  },
  buttonGroup: {
    margin: 10,
  },
  // icon on search
  search: {
    color: "#f1faee",
    // backgroundColor: "white",
  },
  // input text color on search
  input: {
    color: "#f1faee",
  },
});

export default function MaterialUI({
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
}) {
  const classes = useStyles();
  const wideScreen = useMediaQuery("(min-width:600px)");

  if (wideScreen) {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Box border={0} borderColor="primary.main" borderRadius={10}>
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
                <ToggleButtonGroup
                  value={genders}
                  exclusive
                  onChange={handleGender}
                  aria-label="genders"
                >
                  <ToggleButton
                    value="Male"
                    aria-label="male"
                    className="filter-selection"
                  >
                    {language === "en" ? "MALE" : "男"}
                  </ToggleButton>
                  <ToggleButton
                    value="Female"
                    aria-label="female"
                    className="filter-selection"
                  >
                    {language === "en" ? "FEMALE" : "女"}
                  </ToggleButton>
                  <ToggleButton
                    value="Both"
                    aria-label="both"
                    className="filter-selection"
                  >
                    {language === "en" ? "BOTH" : "不分"}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item className={classes.buttonGroup}>
                <ToggleButtonGroup
                  value={locations}
                  exclusive
                  onChange={handleLocation}
                  aria-label="locations"
                >
                  <ToggleButton
                    value="hkIsland"
                    aria-label="hkIsland"
                    color="primary"
                    className="filter-selection"
                  >
                    {language === "en" ? "HK ISLAND" : "港島"}
                  </ToggleButton>
                  <ToggleButton
                    value="kowloon"
                    aria-label="kowloon"
                    color="primary"
                    className="filter-selection"
                  >
                    {language === "en" ? "KOWLOON" : "九龍"}
                  </ToggleButton>
                  <ToggleButton
                    value="newTerritories"
                    aria-label="newTerritories"
                    color="primary"
                    className="filter-selection"
                  >
                    {language === "en" ? "NT" : "新界"}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <HospitalButtons
                wideScreen={wideScreen}
                classes={classes}
                language={language}
                locations={locations}
                hospitals={hospitals}
                handleHospital={handleHospital}
                handleHospitalSelect={handleHospitalSelect}
                hospitalInfo={hospitalInfo}
              />

              <PriceSelector
                classes={classes}
                prices={prices}
                marks={marks}
                handlePrice={handlePrice}
                wideScreen={wideScreen}
              />

              <SearchBar
                classes={classes}
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
      <Grid container>
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
              <Select
                labelId="select-gender-label"
                id="select-gender"
                value={genders}
                onChange={handleGenderSelect}
              >
                <MenuItem value={"Male"}>
                  {language === "en" ? "MALE" : "男"}
                </MenuItem>
                <MenuItem value={"Female"}>
                  {language === "en" ? "FEMALE" : "女"}
                </MenuItem>
                <MenuItem value={"Both"}>
                  {language === "en" ? "BOTH" : "不分"}
                </MenuItem>
              </Select>
            </Grid>

            <Grid item>
              <Select
                labelId="select-location-label"
                id="select-location"
                value={locations}
                onChange={handleLocationSelect}
              >
                <MenuItem value={"hkIsland"}>
                  {language === "en" ? "HK ISLAND" : "港島"}
                </MenuItem>
                <MenuItem value={"kowloon"}>
                  {language === "en" ? "KOWLOON" : "九龍"}
                </MenuItem>
                <MenuItem value={"newTerritories"}>
                  {language === "en" ? "NT" : "新界"}
                </MenuItem>
              </Select>
            </Grid>

            <HospitalButtons
              wideScreen={wideScreen}
              classes={classes}
              language={language}
              locations={locations}
              hospitals={hospitals}
              handleHospital={handleHospital}
              handleHospitalSelect={handleHospitalSelect}
              hospitalInfo={hospitalInfo}
            />

            <PriceSelector
              classes={classes}
              prices={prices}
              marks={marks}
              handlePrice={handlePrice}
              wideScreen={wideScreen}
            />

            <SearchBar
              classes={classes}
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

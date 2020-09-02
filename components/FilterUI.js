import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PropTypes from "prop-types";
import React from "react";
import GenderSelect from "./GenderSelect";
import GenderToggleButtonGroup from "./GenderToggleButtonGroup";
import HospitalButtons from "./hospitalButtons";
import LocationToggleButtonGroup from "./LocationToggleButtonGroup";
import { PriceSelector } from "./PriceSelector";
import { SearchBar } from "./SearchBar";

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

const useStyles = makeStyles((theme) => ({
  sliderTypography: {
    width: 250,
  },
  buttonGroup: {
    margin: 10,
  },
  grid: {
    background: theme.palette.grey[50],
  },
}));

export default function FilterUI({
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
          {/* <Box border={0} borderColor="primary.main" borderRadius={10}> */}
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
                />
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
                planTypes={planTypes}
              />

              <Grid item className={classes.buttonGroup}>
                <PriceSelector
                  classes={classes}
                  prices={prices}
                  marks={marks}
                  handlePrice={handlePrice}
                  planTypes={planTypes}
                />
              </Grid>

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
              <GenderSelect
                genders={genders}
                handleGenderSelect={handleGenderSelect}
                language={language}
                planTypes={planTypes}
              />
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

            <Grid item className={classes.buttonGroup} xs={12} align="center">
              <PriceSelector
                classes={classes}
                prices={prices}
                marks={marks}
                handlePrice={handlePrice}
                planTypes={planTypes}
              />
            </Grid>

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

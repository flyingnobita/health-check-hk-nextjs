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
import PriceToggleButtonGroup from "./PriceToggleButtonGroup";
import SearchBar from "./SearchBar";

const useStyles = makeStyles(() => ({
  mobileGridContainer: {
    paddingBottom: "16px",
  },
  buttonGroup: {
    margin: 10,
  },
  priceButtonGroup: {
    marginTop: 10,
    marginRight: 7,
    marginBottom: 0,
    marginLeft: 10,
  },
  priceButtonGroupWideScreen: {
    marginTop: 10,
    marginRight: 7,
    marginBottom: 10,
    marginLeft: 10,
  },
  priceSelector: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 0,
    marginLeft: 10,
  },
  priceSelectorWideScreen: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
}));

export default function FilterUI({
  wideScreen,
  superWideScreen,
  language,
  hospitals,
  handleHospital,
  handleHospitalSelect,
  handleDeleteHospitalSelect,
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
  priceToggleValues,
  handlePrice,
  handlePriceToggle,
  searchTerm,
  handleSearch,
  hospitalInfo,
  processedPlansRecords,
}) {
  const classes = useStyles();

  if (wideScreen) {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Box border={0} borderRadius={10}>
            <Grid container justify="space-around">
              <Grid item className={classes.buttonGroup}>
                <ToggleButtonGroup
                  value={planTypes}
                  exclusive
                  onChange={handlePlanType}
                  aria-label="planTypes"
                  size={superWideScreen ? "medium" : "small"}
                >
                  <ToggleButton
                    value="General"
                    aria-label="general"
                    className="filter-selection"
                  >
                    {language === "en" ? "GENERAL" : "一般"}
                  </ToggleButton>
                  <ToggleButton
                    value="Cancer"
                    aria-label="cancer"
                    className="filter-selection"
                  >
                    {language === "en" ? "CANCER" : "癌症"}
                  </ToggleButton>
                  <ToggleButton
                    value="Cardiac"
                    aria-label="cardiac"
                    className="filter-selection"
                  >
                    {language === "en" ? "CARDIAC" : " 心臟"}
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
                    value="Gender Specific"
                    aria-label="gender specific"
                    className="filter-selection"
                  >
                    {language === "en" ? "GENDER SPECIFIC" : "性別特定"}
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
                  superWideScreen={superWideScreen}
                />
              </Grid>

              <Grid item className={classes.buttonGroup}>
                <LocationToggleButtonGroup
                  locations={locations}
                  handleLocation={handleLocation}
                  language={language}
                  planTypes={planTypes}
                  processedPlansRecords={processedPlansRecords}
                  superWideScreen={superWideScreen}
                />
              </Grid>

              <HospitalToggleButtonGroup
                language={language}
                locations={locations}
                hospitals={hospitals}
                handleHospital={handleHospital}
                hospitalInfo={hospitalInfo}
                planTypes={planTypes}
                genders={genders}
                processedPlansRecords={processedPlansRecords}
                superWideScreen={superWideScreen}
              />

              <Grid item>
                <Grid container>
                  <Grid item className={classes.priceButtonGroupWideScreen}>
                    <PriceToggleButtonGroup
                      priceToggleValues={priceToggleValues}
                      handlePriceToggle={handlePriceToggle}
                      language={language}
                      superWideScreen={superWideScreen}
                    />
                  </Grid>
                  <Grid item className={classes.priceSelectorWideScreen}>
                    <PriceSelector
                      prices={prices}
                      handlePrice={handlePrice}
                      language={language}
                      className={classes.priceSelector}
                    />
                  </Grid>
                </Grid>
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
                <MenuItem value={"Cancer"}>
                  {language === "en" ? "CANCER" : "癌症"}
                </MenuItem>
                <MenuItem value={"Cardiac"}>
                  {language === "en" ? "CARDIAC" : "心臟"}
                </MenuItem>
                <MenuItem value={"Child"}>
                  {language === "en" ? "CHILD" : "兒童"}
                </MenuItem>
                <MenuItem value={"Domestic Helper"}>
                  {language === "en" ? "DOMESTIC HELPER" : "家庭傭工"}
                </MenuItem>
                <MenuItem value={"Gender Specific"}>
                  {language === "en" ? "GENDER SPECIFIC" : "性別特定"}
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
                genders={genders}
                processedPlansRecords={processedPlansRecords}
              />
            </Grid>

            <HospitalSelect
              language={language}
              locations={locations}
              hospitals={hospitals}
              handleHospitalSelect={handleHospitalSelect}
              handleDeleteHospitalSelect={handleDeleteHospitalSelect}
              planTypes={planTypes}
              genders={genders}
              processedPlansRecords={processedPlansRecords}
            />

            <Grid item>
              <Grid container justify="center">
                <Grid item className={classes.priceButtonGroup}>
                  <PriceToggleButtonGroup
                    priceToggleValues={priceToggleValues}
                    handlePriceToggle={handlePriceToggle}
                    language={language}
                    superWideScreen={superWideScreen}
                  />
                </Grid>
                <Grid item className={classes.priceSelector}>
                  <PriceSelector
                    prices={prices}
                    handlePrice={handlePrice}
                    language={language}
                    className={classes.priceSelector}
                  />
                </Grid>
              </Grid>
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

import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import { ThemeProvider } from "@material-ui/styles";
import Airtable from "airtable";
import React, { useState } from "react";
import track, { useTracking } from "react-tracking";
import FeedbackForm from "../components/FeedbackForm";
import FilterUI from "../components/FilterUI";
import Footer from "../components/Footer";
import GetHead from "../components/head";
import Header from "../components/Header";
import HospitalInfos from "../components/HospitalInfos";
import { muiTheme } from "../components/muiTheme";
import ReactPivotTable from "../components/ReactPivotTable";
import useDebounce from "../components/useDebounce";

function Alert(props) {
  return <MuiAlert elevation={3} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  filterGrid: {
    background: theme.palette.grey[50],
    paddingTop: "10px",
  },
  pivotTableGrid: {
    paddingTop: "20px",
    paddingBottom: "10px",
  },
}));

function App({ airtableRecords }) {
  const classes = useStyles();
  const wideScreen = useMediaQuery("(min-width:600px)");

  const { trackEvent } = useTracking();

  const initialPriceRange = [1000, 4000];
  const maxPriceRange = [0, 30000];
  const priceRangeDiff = initialPriceRange[1] - initialPriceRange[0];

  const [language, setLanguage] = useState("en");
  const handleLanguage = (event) => {
    if (event.target.checked) {
      trackEvent({ event: "Language-set", lang: "en" });
      setLanguage("en");
    } else {
      trackEvent({ event: "Language-set", lang: "ch" });
      setLanguage("ch");
    }
  };

  // Plan Types
  const [planTypes, setPlanTypes] = useState("General");
  const handlePlanType = (event, newPlanTypes) => {
    if (newPlanTypes && newPlanTypes.length) {
      // Set default gender
      if (newPlanTypes === "General" || newPlanTypes === "Pre-marital") {
        setGenders("Male");
      } else {
        setGenders("Both");
      }
      // Set default price range
      if (newPlanTypes !== "General") {
        setPrice(maxPriceRange);
      } else {
        setPrice(initialPriceRange);
      }
      // Set default locations and hospitals
      const locationMap = hospitalLocationMap.get(newPlanTypes);
      const firstLocation = Object.keys(locationMap)[0];
      setLocation(firstLocation);
      setHospitals([locationMap[firstLocation][0]]);

      setPlanTypes(newPlanTypes);
    }
  };
  const handlePlanTypeSelect = (event) => {
    // Set default gender
    if (
      event.target.value === "General" ||
      event.target.value === "Pre-marital"
    ) {
      setGenders("Male");
    } else {
      setGenders("Both");
    }

    // Set default price range
    if (event.target.value !== "General") {
      setPrice(maxPriceRange);
    } else {
      setPrice(initialPriceRange);
    }

    // Set default locations and hospitals
    const locationMap = hospitalLocationMap.get(event.target.value);
    const firstLocation = Object.keys(locationMap)[0];
    setLocation(firstLocation);
    setHospitals([locationMap[firstLocation][0]]);

    setPlanTypes(event.target.value);
  };

  // Gender
  const [genders, setGenders] = useState("Male");
  const handleGender = (event, newGenders) => {
    if (newGenders && newGenders.length) {
      setGenders(newGenders);
    }
  };
  const handleGenderSelect = (event) => {
    setGenders(event.target.value);
  };

  // Location
  const [locations, setLocation] = useState("hkIsland");
  const handleLocation = (event, newLocation) => {
    if (newLocation) {
      // Set default hospitals
      const locationMap = hospitalLocationMap.get(planTypes);
      setHospitals([locationMap[newLocation][0]]);

      setLocation(newLocation);
    }
  };
  const handleLocationSelect = (event) => {
    // Set default hospitals
    const locationMap = hospitalLocationMap.get(planTypes);
    setHospitals([locationMap[event.target.value][0]]);

    setLocation(event.target.value);
  };

  // Hospital
  const [hospitals, setHospitals] = useState(() => ["Adventist - Stubbs"]);
  const handleHospital = (event, newHospitals) => {
    if (newHospitals && newHospitals.length) {
      if (newHospitals.length <= 2 || planTypes !== "General") {
        setHospitals(newHospitals);
      } else {
        setTooManyHospitalWarningOpen(true);
      }
    }
  };
  const handleHospitalSelect = (event) => {
    if (event.target.value.length <= 2 || planTypes !== "General") {
      setHospitals(event.target.value);
    } else {
      setTooManyHospitalWarningOpen(true);
    }
  };

  // Price
  const [prices, setPrice] = useState(initialPriceRange);
  const debouncedPriceFilter = useDebounce(prices, 800);
  const handlePrice = (event, newPrices) => {
    if (newPrices && newPrices.length) {
      if (prices[0] !== newPrices[0]) {
        newPrices[1] = newPrices[0] + priceRangeDiff;
      } else {
        newPrices[0] = newPrices[1] - priceRangeDiff;
      }
      setPrice(newPrices);
    }
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterByValue = function (array, searchString, keys) {
    return array.filter(function (record) {
      return keys.some((key) =>
        String(record[key]).toLowerCase().includes(searchString.toLowerCase())
      );
    });
  };

  const [tooManyHospitalWarningOpen, setTooManyHospitalWarningOpen] = useState(
    false
  );

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setTooManyHospitalWarningOpen(false);
  };

  const processRawAirtableRecords = function () {
    // filter out rows with empty Service Name
    const airtableRecordsFiltered = airtableRecords.filter(
      (row) => row["Service Name"]
    );

    const rawAirtableRecords = airtableRecordsFiltered.map((record) => {
      let newRecord = {};
      for (var key of Object.keys(record)) {
        const value = record[key];

        if (Array.isArray(value)) {
          if (value[0]) {
            typeof value[0] === "string"
              ? (newRecord[key] = value[0].trim())
              : (newRecord[key] = value[0].toString().trim());
          } else {
            newRecord[key] = null;
          }
        } else {
          typeof value === "string"
            ? (newRecord[key] = value.trim())
            : (newRecord[key] = value.toString().trim());
        }
      }
      return newRecord;
    });

    return rawAirtableRecords;
  };
  const processedAirtableRecords = processRawAirtableRecords();

  const getHospitalInfo = function () {
    const hospitalInfoTemp = [];
    const hospitalMap = new Map(); // keep track of hospitals that have been added
    for (const record of processedAirtableRecords) {
      if (!hospitalMap.has(record["Hospital"])) {
        hospitalMap.set(record["Hospital"], true);
        hospitalInfoTemp.push({
          hospital: record["Hospital"],
          hospitalCN: record["醫院"],
          buttonLabel: record["Button Label"],
          hospitalHours: record["Hospital Hours"],
          hospitalHoursCN: record["開放時間"],
          telephone: record["Telephone"],
          location: record["Location"],
          address: record["Address"],
          addressCN: record["Address CN"],
          addressLink: record["Address Link"],
          booking: record["Booking"],
          bookingCN: record["Booking CN"],
          website: record["Website"],
          websiteCN: record["Website CN"],
          planType: [record["Plan Type"]],
        });
      }
      const hospitalInArray = hospitalInfoTemp.find(
        (hospital) => hospital.hospital === record["Hospital"]
      );
      if (!hospitalInArray.planType.includes(record["Plan Type"])) {
        hospitalInArray.planType.push(record["Plan Type"]);
      }
    }
    // Sort by Hospital
    hospitalInfoTemp.sort((a, b) => {
      if (a.hospital && b.hospital) {
        return a.hospital.localeCompare(b.hospital);
      } else return null;
    });
    return hospitalInfoTemp;
  };
  const hospitalInfo = getHospitalInfo();

  const getHospitalLocationMap = function () {
    const hospitalLocationMapTemp = new Map();
    for (const hospitalInfoRecord of hospitalInfo) {
      for (const planTypeHospitalInfoRecord of hospitalInfoRecord.planType) {
        // check if Plan Type exist
        if (!hospitalLocationMapTemp.has(planTypeHospitalInfoRecord)) {
          const locationHospital = {};
          locationHospital[hospitalInfoRecord.location] = [
            hospitalInfoRecord.hospital,
          ];
          // Plan Type doesn't exist, add Plan Type, Location, Hospital
          hospitalLocationMapTemp.set(
            planTypeHospitalInfoRecord,
            locationHospital
          );
        } else {
          let currentLocations = hospitalLocationMapTemp.get(
            planTypeHospitalInfoRecord
          );
          // Check if Location exist
          if (!(hospitalInfoRecord.location in currentLocations)) {
            currentLocations[hospitalInfoRecord.location] = [
              hospitalInfoRecord.hospital,
            ];
            // Location doesn't exist, add Location & Hospital
            hospitalLocationMapTemp.set(
              planTypeHospitalInfoRecord,
              currentLocations
            );
          } else {
            // Check if hospital exist
            if (
              !currentLocations[hospitalInfoRecord.location].includes(
                hospitalInfoRecord.hospital
              )
            ) {
              currentLocations[hospitalInfoRecord.location].push(
                hospitalInfoRecord.hospital
              );
              // Hospital doesn't exist, add Hospital
              hospitalLocationMapTemp.set(
                planTypeHospitalInfoRecord,
                currentLocations
              );
            }
          }
        }
      }
    }
    return hospitalLocationMapTemp;
  };
  const hospitalLocationMap = getHospitalLocationMap();

  const filterAirtableRecords = function () {
    const filtered = processedAirtableRecords.filter(function (l) {
      return (
        genders.includes(l["Gender"]) &&
        hospitals.includes(l["Hospital"]) &&
        planTypes.includes(l["Plan Type"]) &&
        l["Price"] >= prices[0] &&
        l["Price"] <= prices[1]
      );
    });

    if (debouncedPriceFilter) {
      if (typeof window !== "undefined") {
        trackEvent({ event: "Filter-price", price: debouncedPriceFilter });
      }
    }

    if (debouncedSearchTerm) {
      // setIsSearching(true);
      trackEvent({ event: "Filter-search", searchQuery: debouncedSearchTerm });
      const filteredSearchTerm = filterByValue(filtered, debouncedSearchTerm, [
        "Service Type",
        "項目類別",
        "Service Subtype",
        "項目次類別",
        "Service Name",
        "項目名稱",
      ]);
      // setIsSearching(false);
      return filteredSearchTerm;
    } else {
      return filtered;
    }
  };
  const filteredDataArray = filterAirtableRecords();

  return (
    <React.StrictMode>
      <GetHead />
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Header
          language={language}
          handleLanguage={handleLanguage}
          wideScreen={wideScreen}
        />
        <Grid item xs={12} className={classes.filterGrid}>
          <FilterUI
            wideScreen={wideScreen}
            language={language}
            hospitals={hospitals}
            handleHospital={handleHospital}
            handleHospitalSelect={handleHospitalSelect}
            locations={locations}
            handleLocation={handleLocation}
            handleLocationSelect={handleLocationSelect}
            genders={genders}
            handleGender={handleGender}
            handleGenderSelect={handleGenderSelect}
            planTypes={planTypes}
            handlePlanType={handlePlanType}
            handlePlanTypeSelect={handlePlanTypeSelect}
            prices={prices}
            handlePrice={handlePrice}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            hospitalInfo={hospitalInfo}
            hospitalLocationMap={hospitalLocationMap}
          />
        </Grid>
        <Grid item xs={12} className={classes.pivotTableGrid} align="center">
          <ReactPivotTable csv={filteredDataArray} language={language} />
        </Grid>
        <HospitalInfos hospitalInfo={hospitalInfo} language={language} />
        <FeedbackForm hospitalInfo={hospitalInfo} language={language} />
        <Footer />
        <Snackbar
          open={tooManyHospitalWarningOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="warning">
            {language === "en"
              ? "For General plans, choose up to 2 hospitals"
              : "一般計劃, 最多兩間醫院"}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </React.StrictMode>
  );
}

const TrackedApp = track(
  // app-level tracking data
  // { app: "my-app" },

  {
    dispatch: (data) => {
      (window.dataLayer = window.dataLayer || []).push(data);
    },
  }
)(App);

export async function getStaticProps() {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: "keyWDj3X2WP9zxW7h",
  });
  var base = Airtable.base("appAV9kqsY6WcWOXt");
  let table = base("Service - Plans");
  let airtableRecords = [];

  let getRecords = new Promise((resolve, reject) => {
    table
      .select({
        view: "Grid view",
        maxRecords: 30000,
        pageSize: 100,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          const pageResult = records.map((record) => record.fields);
          airtableRecords = airtableRecords.concat(pageResult);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return null;
          } else {
            resolve(airtableRecords);
          }
        }
      );
  });

  const records = await getRecords;

  return {
    props: {
      airtableRecords,
    },
  };
}

export default TrackedApp;

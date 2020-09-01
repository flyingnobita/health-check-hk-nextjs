import { Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { ThemeProvider } from "@material-ui/styles";
import Airtable from "airtable";
import React, { useState } from "react";
import track, { useTracking } from "react-tracking";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";
import GetHead from "../components/head";
import Header from "../components/Header";
import HospitalInfos from "../components/HospitalInfos";
import FilterUI from "../components/FilterUI";
import { muiTheme } from "../components/muiTheme";
import ReactPivotTable from "../components/ReactPivotTable";
import useDebounce from "../components/useDebounce";

function Alert(props) {
  return <MuiAlert elevation={3} {...props} />;
}

function App({ airtableRecords }) {
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
      if (newPlanTypes === "General" || newPlanTypes === "Pre-marital") {
        setGenders("Male");
      } else {
        setGenders("Both");
      }
      if (newPlanTypes !== "General") {
        setPrice(maxPriceRange);
      } else {
        setPrice(initialPriceRange);
      }
      if (newPlanTypes === "Child") {
        setLocation("hkIsland");
        setHospitals(["Adventist - Stubbs", "Matilda"]);
      }
      setPlanTypes(newPlanTypes);
    }
  };
  const handlePlanTypeSelect = (event) => {
    if (
      event.target.value === "General" ||
      event.target.value === "Pre-marital"
    ) {
      setGenders("Male");
    } else {
      setGenders("Both");
    }
    if (event.target.value !== "General") {
      setPrice(maxPriceRange);
    } else {
      setPrice(initialPriceRange);
    }
    if (event.target.value === "Child") {
      setLocation("hkIsland");
      setHospitals(["Adventist - Stubbs"]);
    }
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
      if (newLocation === "hkIsland") {
        setHospitals(["Adventist - Stubbs"]);
      } else if (newLocation === "kowloon") {
        setHospitals(["Baptist"]);
      } else {
        setHospitals(["Adventist - Tsuen Wan"]);
      }
      setLocation(newLocation);
    }
  };
  const handleLocationSelect = (event) => {
    if (event.target.value === "hkIsland") {
      setHospitals(["Adventist - Stubbs"]);
    } else if (event.target.value === "kowloon") {
      setHospitals(["Baptist"]);
    } else {
      setHospitals(["Adventist - Tsuen Wan"]);
    }
    setLocation(event.target.value);
  };

  // Hospital
  const [hospitals, setHospitals] = useState(() => ["Adventist - Stubbs"]);
  const handleHospital = (event, newHospitals) => {
    if (newHospitals && newHospitals.length) {
      if (newHospitals.length <= 2) {
        setHospitals(newHospitals);
      } else {
        setTooManyHospitalWarningOpen(true);
      }
    }
  };
  const handleHospitalSelect = (event) => {
    if (event.target.value.length <= 2) {
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
    const hospitalMap = new Map();
    for (const item of processedAirtableRecords) {
      if (!hospitalMap.has(item["Hospital"])) {
        hospitalMap.set(item["Hospital"], true); // set any value to Map
        hospitalInfoTemp.push({
          hospital: item["Hospital"],
          hospitalCN: item["醫院"],
          buttonLabel: item["Button Label"],
          hospitalHours: item["Hospital Hours"],
          hospitalHoursCN: item["開放時間"],
          telephone: item["Telephone"],
          location: item["Location"],
          address: item["Address"],
          addressCN: item["Address CN"],
          addressLink: item["Address Link"],
          booking: item["Booking"],
          bookingCN: item["Booking CN"],
          website: item["Website"],
          websiteCN: item["Website CN"],
        });
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
        <Header language={language} handleLanguage={handleLanguage} />
        <Grid item xs={12}>
          <br />
          <FilterUI
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
          />
          <br />
        </Grid>
        <ReactPivotTable csv={filteredDataArray} language={language} />
        <br />
        <br />
        <HospitalInfos hospitalInfo={hospitalInfo} language={language} />
        <br />
        <FeedbackForm hospitalInfo={hospitalInfo} language={language} />
        <br />
        <Footer />
        <Snackbar
          open={tooManyHospitalWarningOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="warning">
            {language === "en" ? "Choose up to 2 hospitals" : "最多兩間醫院"}
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
        maxRecords: 10000,
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

// export default App;
export default TrackedApp;

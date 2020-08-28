import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@material-ui/styles";
import { muiTheme } from "./components/muiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import track, { useTracking } from "react-tracking";
import ReactPivotTable from "./components/ReactPivotTable";
import useDebounce from "./components/useDebounce";
import { getAirtable } from "./components/getAirtable";
// import MaterialUI from "./components/MaterialUI";

// const fetchMode = "csv";
const fetchMode = "airtable";
const csvFileName = "Service - Plans-Grid view.csv";

function Alert(props) {
  return <MuiAlert elevation={3} {...props} />;
}

function App() {
  const { trackEvent } = useTracking();

  const [dataArray, setDataArray] = useState(null);
  const [filteredDataArray, setFilteredDataArray] = useState(dataArray);
  const [hospitalInfo, setHospitalInfo] = useState([]);

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

  const [genders, setGenders] = useState(() => ["Male"]);
  const handleGender = (event, newGenders) => {
    if (newGenders && newGenders.length) {
      setGenders(newGenders);
    }
  };
  const handleGenderSelect = (event) => {
    setGenders(event.target.value);
  };

  const [planTypes, setPlanTypes] = useState(() => ["General"]);
  const handlePlanType = (event, newPlanTypes) => {
    if (newPlanTypes && newPlanTypes.length) {
      setPlanTypes(newPlanTypes);
    }
  };
  const handlePlanTypeSelect = (event) => {
    setPlanTypes(event.target.value);
  };

  const [prices, setPrice] = useState([0, 30000]);
  const handlePrice = (event, newPrices) => {
    if (newPrices && newPrices.length) {
      trackEvent({ event: "Filter-price", price: newPrices });
      setPrice(newPrices);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // delay search by 500ms
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

  useEffect(() => {
    // Directly call Papa Parse and setState
    // const fetchData = async () => {
    //   Papa.parse("Service.csv", {
    //     download: true,
    //     header: true,
    //     complete: function (results) {
    //       setdataArray(results.data);
    //     },
    //   });
    // };

    const loadDataArray = (csv) => {
      setDataArray(csv);
    };

    const loadAirtableRecords = (airtableRecords) => {
      // filter out rows with empty Services
      const airtableRecordsFiltered = airtableRecords.filter(
        (row) => row["Service Name"]
      );

      // console.log("airtableRecords");
      // console.log(airtableRecords);
      const rawAirtableRecords = airtableRecordsFiltered.map((record) => {
        let newRecord = {};
        for (var key of Object.keys(record)) {
          const value = record[key];
          // console.log(value);
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
        // console.log(newRecord);
        return newRecord;
      });
      // console.log("rawAirtableRecords");
      // console.log(rawAirtableRecords);
      setDataArray(rawAirtableRecords);
    };

    fetchMode === "airtable"
      ? getAirtable(loadAirtableRecords)
      : getData(csvFileName, loadDataArray);
  }, []);

  useEffect(() => {
    const filtered = !dataArray
      ? null
      : dataArray.filter(function (l) {
          return (
            genders.includes(l["Gender"]) &&
            hospitals.includes(l["Hospital"]) &&
            planTypes.includes(l["Plan Type"]) &&
            l["Price"] >= prices[0] &&
            l["Price"] <= prices[1]
          );
        });

    // Get Hospital Hours for each Hospital
    if (dataArray) {
      // console.log("dataArray");
      // console.log(dataArray);
      const hospitalInfoTemp = [];
      const hospitalMap = new Map();
      for (const item of dataArray) {
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
      setHospitalInfo(hospitalInfoTemp);
    }
    if (debouncedSearchTerm) {
      setIsSearching(true);
      trackEvent({ event: "Filter-search", searchQuery: debouncedSearchTerm });
      setFilteredDataArray(
        filterByValue(filtered, debouncedSearchTerm, [
          "Service Type",
          "項目類別",
          "Service Subtype",
          "項目次類別",
          "Service Name",
          "項目名稱",
        ])
      );
      setIsSearching(false);
    } else {
      setFilteredDataArray(filtered);
    }
  }, [
    dataArray,
    genders,
    hospitals,
    planTypes,
    prices,
    debouncedSearchTerm,
    trackEvent,
  ]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Header language={language} handleLanguage={handleLanguage} />
        <Grid item xs={12}>
          {/* <br />
          <MaterialUI
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
          <br /> */}
        </Grid>
        <ReactPivotTable csv={filteredDataArray} language={language} />
        <br />
        <br />
        {/* <HospitalInfos hospitalInfo={hospitalInfo} language={language} /> */}
        <br />
        {/* <FeedbackForm hospitalInfo={hospitalInfo} language={language} /> */}
        <br />
        {/* <Footer /> */}
        {/* <Snackbar
          open={tooManyHospitalWarningOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="warning">
            {language === "en" ? "Choose up to 2 hospitals" : "最多兩間醫院"}
          </Alert>
        </Snackbar> */}
      </ThemeProvider>
    </React.StrictMode>
  );
}

const TrackedApp = track(
  // app-level tracking data
  // { app: "my-app" },

  {
    // custom dispatch to console.log in addition to pushing to dataLayer[]
    dispatch: (data) => {
      // console.log(data);
      (window.dataLayer = window.dataLayer || []).push(data);
    },
  }
)(App);

export default TrackedApp;

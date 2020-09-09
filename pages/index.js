import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import { ThemeProvider } from "@material-ui/styles";
import Airtable from "airtable";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import React, { useState } from "react";
import track, { useTracking } from "react-tracking";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";
import { GetReactPivotTable } from "../components/GetReactPivotTable";
import GetHead from "../components/head";
import Header from "../components/Header";
import {
  filterHospitals,
  getHospitalInfo,
  processRawAirtableRecords,
} from "../components/indexHelper";
import {
  GENDER_SPECIFIC_PLAN_TYPES,
  INITIAL_PRICE_RANGE,
  MAX_AIRTABLE_RECORDS,
  MAX_PRICE_RANGE,
} from "../components/settings";
import useDebounce from "../components/useDebounce";
import muiTheme from "../styles/muiTheme";

const HospitalInfos = dynamic(() => import("../components/HospitalInfos"));

function Alert(props) {
  return <MuiAlert elevation={3} {...props} />;
}

function App({ servicePlansRecords, plansRecords }) {
  const wideScreen = useMediaQuery("(min-width:630px)");
  const superWideScreen = useMediaQuery("(min-width:725px)");

  const { trackEvent } = useTracking();

  const processedServicePlansRecords = processRawAirtableRecords(
    servicePlansRecords
  );
  const processedPlansRecords = processRawAirtableRecords(plansRecords);

  const [page, setPage] = useState("table");
  const handlePage = () => {
    if (page === "table") {
      trackEvent({ event: "Page-set", page: "hospitalInfo" });
      setPage("hospitalInfo");
    } else {
      trackEvent({ event: "Page-set", page: "table" });
      setPage("table");
    }
  };
  const handleInformationSource = () => {
    trackEvent({
      event: "Page-set",
      page: "hospitalInfo (information source)",
    });
    setPage("hospitalInfo");
  };

  const [language, setLanguage] = useState("ch");
  const handleLanguage = (event) => {
    if (event.target.checked) {
      trackEvent({ event: "Language-set", lang: "en" });
      setLanguage("en");
    } else {
      trackEvent({ event: "Language-set", lang: "ch" });
      setLanguage("ch");
    }
  };
  const handleLanguageClick = () => {
    if (language === "en") {
      trackEvent({ event: "Language-set", lang: "ch" });
      setLanguage("ch");
    } else {
      trackEvent({ event: "Language-set", lang: "en" });
      setLanguage("en");
    }
  };

  // Plan Types
  const [planTypes, setPlanTypes] = useState("General");
  const handlePlanType = (event, newPlanTypes) => {
    if (newPlanTypes && newPlanTypes.length) {
      setPlanTypes(newPlanTypes);

      // Set default gender
      if (GENDER_SPECIFIC_PLAN_TYPES.includes(newPlanTypes)) {
        if (genders === "Both") {
          setGenders("Male");
        }
      } else {
        setGenders("Both");
      }

      // Set default price range
      if (newPlanTypes !== "General") {
        setPrice(MAX_PRICE_RANGE);
      } else {
        setPrice(INITIAL_PRICE_RANGE);
      }

      // Set default locations and hospitals
      let filteredHospitals = filterHospitals(
        processedPlansRecords,
        newPlanTypes,
        genders,
        locations
      );
      if (filteredHospitals.length === 0) {
        filteredHospitals = filterHospitals(
          processedPlansRecords,
          newPlanTypes,
          genders,
          []
        );
        setHospitals([filteredHospitals[0]["Hospital"]]);
        setLocation(filteredHospitals[0]["Location"]);
      } else {
        setHospitals([filteredHospitals[0]["Hospital"]]);
        setLocation(filteredHospitals[0]["Location"]);
      }
    }
  };
  const handlePlanTypeSelect = (event) => {
    setPlanTypes(event.target.value);

    // Set default gender
    if (GENDER_SPECIFIC_PLAN_TYPES.includes(event.target.value)) {
      if (genders === "Both") {
        setGenders("Male");
      }
    } else {
      setGenders("Both");
    }

    // Set default price range
    if (event.target.value !== "General") {
      setPrice(MAX_PRICE_RANGE);
    } else {
      setPrice(INITIAL_PRICE_RANGE);
    }

    // Set default locations and hospitals
    let filteredHospitals = filterHospitals(
      processedPlansRecords,
      event.target.value,
      genders,
      locations
    );
    if (filteredHospitals.length === 0) {
      filteredHospitals = filterHospitals(
        processedPlansRecords,
        event.target.value,
        genders,
        []
      );
      setHospitals([filteredHospitals[0]["Hospital"]]);
      setLocation(filteredHospitals[0]["Location"]);
    } else {
      setHospitals([filteredHospitals[0]["Hospital"]]);
      setLocation(filteredHospitals[0]["Location"]);
    }
  };

  // Gender
  const [genders, setGenders] = useState("Male");
  const handleGender = (event, newGenders) => {
    if (newGenders && newGenders.length) {
      setGenders(newGenders);

      // Set default hospitals
      const filteredHospitals = filterHospitals(
        processedPlansRecords,
        planTypes,
        newGenders,
        locations
      );
      if (filteredHospitals.length === 0) setHospitals([]);
      else {
        setHospitals([filteredHospitals[0]["Hospital"]]);
      }
    }
  };
  const handleGenderSelect = (event) => {
    setGenders(event.target.value);

    // Set default hospitals
    const filteredHospitals = filterHospitals(
      processedPlansRecords,
      planTypes,
      event.target.value,
      locations
    );
    if (filteredHospitals.length === 0) setHospitals([]);
    else {
      setHospitals([filteredHospitals[0]["Hospital"]]);
    }
  };

  // Location
  const [locations, setLocation] = useState("hkIsland");
  const handleLocation = (event, newLocation) => {
    if (newLocation) {
      setLocation(newLocation);

      // Set default hospitals
      const filteredHospitals = filterHospitals(
        processedPlansRecords,
        planTypes,
        genders,
        newLocation
      );
      if (filteredHospitals.length === 0) setHospitals([]);
      else {
        setHospitals([filteredHospitals[0]["Hospital"]]);
      }
    }
  };
  const handleLocationSelect = (event) => {
    setLocation(event.target.value);

    // Set default hospitals
    const filteredHospitals = filterHospitals(
      processedPlansRecords,
      planTypes,
      genders,
      event.target.value
    );
    if (filteredHospitals.length === 0) setHospitals([]);
    else {
      setHospitals([filteredHospitals[0]["Hospital"]]);
    }
  };

  // Hospital
  const [hospitals, setHospitals] = useState(() => ["Adventist - Stubbs"]);
  const handleHospital = (event, newHospitals) => {
    if (newHospitals) {
      setHospitals(newHospitals);
    }
  };
  const handleHospitalSelect = (event) => {
    setHospitals(event.target.value);
  };
  const handleDeleteHospitalSelect = (value) => {
    if (value) {
      let newHospitals = hospitals.slice();
      const index = hospitals.indexOf(value);
      if (index > -1) {
        newHospitals.splice(index, 1);
        setHospitals(newHospitals);
      }
    }
  };

  // Price
  const [prices, setPrice] = useState(INITIAL_PRICE_RANGE);
  const debouncedPriceFilter = useDebounce(prices, 800);
  const handlePrice = (event, newPrices) => {
    if (newPrices && newPrices.length) {
      setPrice(newPrices);
    }
  };
  const [priceToggleValues, setPriceToggleValues] = useState(() => ["Mid"]);
  const handlePriceToggle = (event, newPricesToggleValues) => {
    if (newPricesToggleValues) {
      if (newPricesToggleValues.includes("Low")) {
        setPrice([0, 4999]);
      }
      if (newPricesToggleValues.includes("Mid")) {
        setPrice([5000, 10000]);
      }
      if (newPricesToggleValues.includes("High")) {
        setPrice([10000, 30000]);
      }
      setPriceToggleValues(newPricesToggleValues);
    }
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  // const [isSearching, setIsSearching] = useState(false);
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

  const hospitalInfo = getHospitalInfo(processedServicePlansRecords);

  const filterAirtableRecords = function (
    processedServicePlansRecords,
    genders,
    hospitals,
    planTypes,
    prices,
    debouncedPriceFilter,
    debouncedSearchTerm
  ) {
    let filtered;
    if (genders && hospitals && planTypes && prices) {
      filtered = processedServicePlansRecords.filter(function (l) {
        return (
          genders.includes(l["Gender"]) &&
          hospitals.includes(l["Hospital"]) &&
          planTypes.includes(l["Plan Type"]) &&
          l["Price"] >= prices[0] &&
          l["Price"] <= prices[1]
        );
      });
    } else {
      filtered = processedServicePlansRecords;
    }

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
  const filteredDataArray = filterAirtableRecords(
    processedServicePlansRecords,
    genders,
    hospitals,
    planTypes,
    prices,
    debouncedPriceFilter,
    debouncedSearchTerm
  );

  let mainPanel;
  if (page === "table") {
    mainPanel = (
      <GetReactPivotTable
        wideScreen={wideScreen}
        superWideScreen={superWideScreen}
        language={language}
        planTypes={planTypes}
        handlePlanType={handlePlanType}
        handlePlanTypeSelect={handlePlanTypeSelect}
        genders={genders}
        handleGender={handleGender}
        handleGenderSelect={handleGenderSelect}
        locations={locations}
        handleLocation={handleLocation}
        handleLocationSelect={handleLocationSelect}
        hospitals={hospitals}
        handleHospital={handleHospital}
        handleHospitalSelect={handleHospitalSelect}
        handleDeleteHospitalSelect={handleDeleteHospitalSelect}
        prices={prices}
        priceToggleValues={priceToggleValues}
        handlePrice={handlePrice}
        handlePriceToggle={handlePriceToggle}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        hospitalInfo={hospitalInfo}
        filteredDataArray={filteredDataArray}
        processedPlansRecords={processedPlansRecords}
      ></GetReactPivotTable>
    );
  } else {
    mainPanel = (
      <HospitalInfos hospitalInfo={hospitalInfo} language={language} />
    );
  }

  return (
    <React.StrictMode>
      <GetHead />
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Header
          language={language}
          handleLanguage={handleLanguage}
          handleLanguageClick={handleLanguageClick}
          wideScreen={wideScreen}
          page={page}
          handleHospitalInfoClick={handlePage}
        />
        {mainPanel}
        <FeedbackForm hospitalInfo={hospitalInfo} language={language} />
        <Footer
          language={language}
          handleInformationSource={handleInformationSource}
        />
        <Snackbar
          open={tooManyHospitalWarningOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="warning">
            {language === "en"
              ? "For General plans, choose up to 2 hospitals"
              : "一般計劃, 最多可選兩間醫院"}
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
  let servicePlansTable = base("Service - Plans");
  let plansTable = base("Plans");

  function retrieveAllRecords(base) {
    return (resolve) => {
      let airtableRecords = [];
      base
        .select({
          view: "Grid view",
          maxRecords: MAX_AIRTABLE_RECORDS,
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
    };
  }

  const servicePlansRecords = await new Promise(
    retrieveAllRecords(servicePlansTable)
  );
  const plansRecords = await new Promise(retrieveAllRecords(plansTable));

  return {
    props: {
      servicePlansRecords,
      plansRecords,
    },
  };
}

App.propTypes = {
  servicePlansRecords: PropTypes.array,
  plansRecords: PropTypes.array,
};

export default TrackedApp;

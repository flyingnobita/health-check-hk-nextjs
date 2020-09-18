import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import { ThemeProvider } from "@material-ui/styles";
import Airtable from "airtable";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
  DEFAULT_GENDER,
  DEFAULT_HOSPITAL,
  DEFAULT_LANGUAGE,
  DEFAULT_LOCATION,
  DEFAULT_PAGE,
  DEFAULT_PLAN_TYPE,
  DEFAULT_PRICE_RANGE,
  DEFAULT_PRICE_TOGGLE,
  GENDER_SPECIFIC_PLAN_TYPES,
  HIGH_PRICE_RANGE,
  LOW_PRICE_RANGE,
  MAX_AIRTABLE_RECORDS,
  MAX_PRICE_RANGE,
  MID_PRICE_RANGE,
} from "../components/settings";
import useDebounce from "../components/useDebounce";
import muiTheme from "../styles/muiTheme";

const HospitalInfos = dynamic(() => import("../components/HospitalInfos"));

function Alert(props) {
  return <MuiAlert elevation={3} {...props} />;
}

function App({ servicePlansRecords, plansRecords }) {
  const minFooterText = useMediaQuery("(min-width:440px)"); // rearrange footer components
  const minLandscape = useMediaQuery("(min-width:568px)"); // Rotation Alert, Language Switch
  const wideScreen = useMediaQuery("(min-width:667px)"); // switch from selects to small toggles
  const superWideScreen = useMediaQuery("(min-width:795px)"); // switch from small toggles to medium toggles

  const router = useRouter();

  useEffect(() => {
    // detect back and forward button which changes url but not the state
    if (Object.keys(router.query).length === 0) {
      trackEvent({ event: "Page-set", page: "table" });
      setPage("table");
    } else if ("hospitalInfo" in router.query) {
      trackEvent({ event: "Page-set", page: "hospitalInfo" });
      setPage("hospitalInfo");
    }
  }, [router.query]);

  const { trackEvent } = useTracking();

  const processedServicePlansRecords = processRawAirtableRecords(
    servicePlansRecords
  );
  const processedPlansRecords = processRawAirtableRecords(plansRecords);

  // Page
  const [page, setPage] = useState(DEFAULT_PAGE);
  const handlePage = () => {
    if (page === "table") {
      trackEvent({ event: "Page-set", page: "hospitalInfo" });
      setPage("hospitalInfo");
    } else {
      trackEvent({ event: "Page-set", page: "table" });
      setPage("table");
    }
  };

  // Language
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
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
  const [planTypes, setPlanTypes] = useState(DEFAULT_PLAN_TYPE);
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
        setPriceToggleValues("");
      } else {
        setPrice(DEFAULT_PRICE_RANGE);
        setPriceToggleValues(DEFAULT_PRICE_TOGGLE);
      }

      // Set default locations and hospitals
      let filteredHospitals = filterHospitals(
        processedPlansRecords,
        newPlanTypes,
        genders,
        locations,
        prices
      );

      if (filteredHospitals.length === 0) {
        filteredHospitals = filterHospitals(
          processedPlansRecords,
          newPlanTypes,
          genders,
          [],
          MAX_PRICE_RANGE
        );

        if (filteredHospitals.length === 0) {
          setHospitals([]);
          setLocation([]);
        } else {
          setHospitals([filteredHospitals[0]["Hospital"]]);
          setLocation(filteredHospitals[0]["Location"]);
        }
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
      setPriceToggleValues("");
    } else {
      setPrice(DEFAULT_PRICE_RANGE);
      setPriceToggleValues(DEFAULT_PRICE_TOGGLE);
    }

    // Set default locations and hospitals
    let filteredHospitals = filterHospitals(
      processedPlansRecords,
      event.target.value,
      genders,
      locations,
      prices
    );
    if (filteredHospitals.length === 0) {
      filteredHospitals = filterHospitals(
        processedPlansRecords,
        event.target.value,
        genders,
        [],
        MAX_PRICE_RANGE
      );
      if (filteredHospitals.length === 0) {
        setHospitals([]);
        setLocation([]);
      } else {
        setHospitals([filteredHospitals[0]["Hospital"]]);
        setLocation(filteredHospitals[0]["Location"]);
      }
    } else {
      setHospitals([filteredHospitals[0]["Hospital"]]);
      setLocation(filteredHospitals[0]["Location"]);
    }
  };

  // Gender
  const [genders, setGenders] = useState(DEFAULT_GENDER);
  const handleGender = (event, newGenders) => {
    if (newGenders && newGenders.length) {
      setGenders(newGenders);

      // Set default hospitals
      const filteredHospitals = filterHospitals(
        processedPlansRecords,
        planTypes,
        newGenders,
        locations,
        prices
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
      locations,
      prices
    );
    if (filteredHospitals.length === 0) setHospitals([]);
    else {
      setHospitals([filteredHospitals[0]["Hospital"]]);
    }
  };

  // Location
  const [locations, setLocation] = useState(DEFAULT_LOCATION);
  const handleLocation = (event, newLocation) => {
    if (newLocation) {
      setLocation(newLocation);

      // Set default hospitals
      const filteredHospitals = filterHospitals(
        processedPlansRecords,
        planTypes,
        genders,
        newLocation,
        prices
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
      event.target.value,
      prices
    );
    if (filteredHospitals.length === 0) setHospitals([]);
    else {
      setHospitals([filteredHospitals[0]["Hospital"]]);
    }
  };

  // Hospital
  const [hospitals, setHospitals] = useState(() => [DEFAULT_HOSPITAL]);
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
  const [prices, setPrice] = useState(DEFAULT_PRICE_RANGE);
  const debouncedPriceFilter = useDebounce(prices, 800);
  const handlePrice = (event, newPrices) => {
    if (newPrices && newPrices.length) {
      setPrice(newPrices);
    }
  };
  const [priceToggleValues, setPriceToggleValues] = useState(
    DEFAULT_PRICE_TOGGLE
  );
  const handlePriceToggle = (event, newPricesToggleValues) => {
    if (newPricesToggleValues) {
      let newPriceRange = null;
      if (newPricesToggleValues === "Low") {
        newPriceRange = LOW_PRICE_RANGE;
      }
      if (newPricesToggleValues === "Mid") {
        newPriceRange = MID_PRICE_RANGE;
      }
      if (newPricesToggleValues === "High") {
        newPriceRange = HIGH_PRICE_RANGE;
      }
      setPrice(newPriceRange);
      setPriceToggleValues(newPricesToggleValues);

      // Set default hospitals
      const filteredHospitals = filterHospitals(
        processedPlansRecords,
        planTypes,
        genders,
        locations,
        newPriceRange
      );
      if (filteredHospitals.length === 0) {
        setHospitals([]);
        setLocation("");
      } else {
        let newHospitals = hospitals.slice();

        // check each selected hospitals to see if they have been filtered out
        hospitals.forEach((hospitalSelected) => {
          const filtered = filteredHospitals.filter(function (record) {
            return [hospitalSelected].includes(record["Hospital"]);
          });

          if (filtered.length === 0) {
            const index = newHospitals.indexOf(hospitalSelected);
            if (index > -1) {
              newHospitals.splice(index, 1);
            }
          }
        });
        setHospitals(newHospitals);
      }
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
    const searchStringArray = searchString.trim().split(" ").filter(Boolean);

    return array.filter(function (record) {
      return keys.some((key) => {
        // loop through each word of user input
        for (let i = 0; i < searchStringArray.length; i++) {
          const currentSearchString = searchStringArray[i].toLowerCase();
          const recordKeyArray = record[key]
            .toLowerCase()
            .trim()
            .split(" ")
            .filter(Boolean);

          // check if surrounded by quotations for exact match search
          if (
            ['"', "'"].includes(currentSearchString[0]) &&
            ['"', "'"].includes(
              currentSearchString[currentSearchString.length - 1]
            )
          ) {
            // strip quotations for exact match search
            const currentSearchStringExact = currentSearchString.substring(
              1,
              currentSearchString.length - 1
            );

            // loop through each word of the record
            for (let j = 0; j < recordKeyArray.length; j++) {
              if (recordKeyArray[j] === currentSearchStringExact) {
                return true;
              }
            }
          } else {
            for (let k = 0; k < recordKeyArray.length; k++) {
              if (recordKeyArray[k].includes(currentSearchString)) {
                return true;
              }
            }
          }
        }
        return false;
      });
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

  const handleInformationSource = () => {
    trackEvent({
      event: "Page-set",
      page: "hospitalInfo (information source)",
    });
    setPage("hospitalInfo");
  };

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
        handleHospitalInfoClick={handlePage}
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
          minLandscape={minLandscape}
          page={page}
          handleHospitalInfoClick={handlePage}
        />
        {mainPanel}
        <FeedbackForm hospitalInfo={hospitalInfo} language={language} />
        <Footer
          language={language}
          handleInformationSource={handleInformationSource}
          minFooterText={minFooterText}
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

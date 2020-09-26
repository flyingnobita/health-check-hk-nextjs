import Airtable from "airtable";
import track from "react-tracking";
import { MAX_AIRTABLE_RECORDS } from "../components/settings";
import App from "./app";

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

export default TrackedApp;

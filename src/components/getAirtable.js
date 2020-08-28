import Airtable from "airtable";

export function getAirtable(callBack) {
  let tempAirtableRecords = [];
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: "keyWDj3X2WP9zxW7h",
  });
  var base = Airtable.base("appAV9kqsY6WcWOXt");

  base("Service - Plans")
    .select({
      view: "Grid view",
      maxRecords: 10000,
      pageSize: 100,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const pageResult = records.map((record) => record.fields);
        tempAirtableRecords = tempAirtableRecords.concat(pageResult);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        callBack(tempAirtableRecords);
      }
    );
}
